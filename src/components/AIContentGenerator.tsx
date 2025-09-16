import React, { useState, useEffect } from 'react';
import { useAI } from '../hooks/useAI';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Input } from './ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Alert, AlertDescription } from './ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Loader2, Sparkles, FileText, Mic, Image, Video, CheckCircle, AlertCircle, Upload, Youtube, Map } from 'lucide-react';
import { toast } from 'sonner';

interface AIContentGeneratorProps {
  onContentGenerated?: (content: any) => void;
  initialContent?: string;
}

export const AIContentGenerator: React.FC<AIContentGeneratorProps> = ({
  onContentGenerated,
  initialContent = ''
}) => {
  const [inputContent, setInputContent] = useState(initialContent);
  const [selectedTask, setSelectedTask] = useState<string>('generate_notes');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [youtubeLink, setYoutubeLink] = useState('');
  const [customMessage, setCustomMessage] = useState('');
  const [activeTab, setActiveTab] = useState('text');
  
  const { 
    state, 
    generateNotesFromText, 
    generateNotesFromImage,
    generateNotesFromPDF,
    generateNotesFromAudio,
    generateNotesFromYouTube,
    generateRoadmap,
    summarizeText, 
    extractKeyPoints, 
    generateQuestions, 
    checkStatus, 
    reset 
  } = useAI();

  const tasks = [
    { id: 'generate_notes', label: 'Generate Notes', icon: FileText, description: 'Create structured notes from content' },
    { id: 'summarize', label: 'Summarize', icon: FileText, description: 'Create a concise summary' },
    { id: 'extract_key_points', label: 'Key Points', icon: CheckCircle, description: 'Extract main points' },
    { id: 'generate_questions', label: 'Generate Questions', icon: AlertCircle, description: 'Create questions from content' },
  ];

  useEffect(() => {
    // Check AI service status on component mount
    checkStatus();
  }, [checkStatus]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      toast.success(`File selected: ${file.name}`);
    }
  };

  const handleGenerate = async () => {
    if (!inputContent.trim() && !selectedFile && !youtubeLink && activeTab !== 'roadmap') {
      toast.error('Please provide content to process');
      return;
    }

    try {
      let response;
      const options = { task: selectedTask };

      switch (activeTab) {
        case 'text':
          if (!inputContent.trim()) {
            toast.error('Please enter some text to process');
            return;
          }
          switch (selectedTask) {
            case 'generate_notes':
              response = await generateNotesFromText(inputContent, options);
              break;
            case 'summarize':
              response = await summarizeText(inputContent, options);
              break;
            case 'extract_key_points':
              response = await extractKeyPoints(inputContent, options);
              break;
            case 'generate_questions':
              response = await generateQuestions(inputContent, options);
              break;
            default:
              response = await generateNotesFromText(inputContent, options);
          }
          break;

        case 'image':
          if (!selectedFile) {
            toast.error('Please select an image file');
            return;
          }
          response = await generateNotesFromImage(selectedFile, customMessage || "Generate comprehensive notes from this image");
          break;

        case 'pdf':
          if (!selectedFile) {
            toast.error('Please select a PDF file');
            return;
          }
          response = await generateNotesFromPDF(selectedFile, customMessage || "Generate comprehensive notes from this PDF");
          break;

        case 'audio':
          if (!selectedFile) {
            toast.error('Please select an audio file');
            return;
          }
          response = await generateNotesFromAudio(selectedFile, customMessage || "Generate comprehensive notes from this audio");
          break;

        case 'youtube':
          if (!youtubeLink.trim()) {
            toast.error('Please enter a YouTube link');
            return;
          }
          response = await generateNotesFromYouTube(youtubeLink, customMessage || "Generate comprehensive notes from this video");
          break;

        case 'roadmap':
          if (!inputContent.trim()) {
            toast.error('Please describe your background and interests for career roadmap');
            return;
          }
          response = await generateRoadmap(inputContent);
          break;

        default:
          toast.error('Invalid tab selected');
          return;
      }

      if (response.success && onContentGenerated) {
        onContentGenerated(response.data);
      }

      toast.success('Content generated successfully!');
    } catch (error: any) {
      toast.error(error.message || 'Failed to generate content');
    }
  };

  const handleReset = () => {
    reset();
    setInputContent('');
    setSelectedFile(null);
    setYoutubeLink('');
    setCustomMessage('');
    toast.info('Content generator reset');
  };

  const renderGeneratedContent = () => {
    if (!state.data) return null;

    const { data } = state;

    return (
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-purple-500" />
            Generated Content
          </CardTitle>
          <CardDescription>
            AI-powered content based on your input
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {data.generated_text && (
            <div>
              <h4 className="font-semibold mb-2">Generated Text</h4>
              <div className="bg-muted p-4 rounded-lg whitespace-pre-wrap">
                {data.generated_text}
              </div>
            </div>
          )}
          {data.notes && (
            <div>
              <h4 className="font-semibold mb-2">Notes</h4>
              <div className="bg-muted p-4 rounded-lg whitespace-pre-wrap">
                {data.notes}
              </div>
            </div>
          )}
          {data.summary && (
            <div>
              <h4 className="font-semibold mb-2">Summary</h4>
              <div className="bg-muted p-4 rounded-lg whitespace-pre-wrap">
                {data.summary}
              </div>
            </div>
          )}
          {data.key_points && (
            <div>
              <h4 className="font-semibold mb-2">Key Points</h4>
              <div className="bg-muted p-4 rounded-lg">
                <ul className="list-disc list-inside space-y-1">
                  {data.key_points.map((point: string, index: number) => (
                    <li key={index}>{point}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
          {data.questions && (
            <div>
              <h4 className="font-semibold mb-2">Generated Questions</h4>
              <div className="bg-muted p-4 rounded-lg">
                <ol className="list-decimal list-inside space-y-2">
                  {data.questions.map((question: string, index: number) => (
                    <li key={index}>{question}</li>
                  ))}
                </ol>
              </div>
            </div>
          )}
          {data.roadmap && (
            <div>
              <h4 className="font-semibold mb-2">Career Roadmap</h4>
              <div className="bg-muted p-4 rounded-lg whitespace-pre-wrap">
                {data.roadmap}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-purple-500" />
            AI Content Generator
          </CardTitle>
          <CardDescription>
            Generate notes, summaries, and insights from various content types
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* AI Service Status */}
          {state.status && (
            <Alert className={state.status.success ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                AI Service: {state.status.status} - {state.status.message}
              </AlertDescription>
            </Alert>
          )}

          {/* Content Type Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="text">Text</TabsTrigger>
              <TabsTrigger value="image">Image</TabsTrigger>
              <TabsTrigger value="pdf">PDF</TabsTrigger>
              <TabsTrigger value="audio">Audio</TabsTrigger>
              <TabsTrigger value="youtube">YouTube</TabsTrigger>
              <TabsTrigger value="roadmap">Career</TabsTrigger>
            </TabsList>

            {/* Text Processing Tab */}
            <TabsContent value="text" className="space-y-4">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Task Type</label>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {tasks.map((task) => (
                      <Button
                        key={task.id}
                        variant={selectedTask === task.id ? 'default' : 'outline'}
                        onClick={() => setSelectedTask(task.id)}
                        className="justify-start"
                      >
                        <task.icon className="h-4 w-4 mr-2" />
                        {task.label}
                      </Button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium">Content</label>
                  <Textarea
                    placeholder="Enter your text content here..."
                    value={inputContent}
                    onChange={(e) => setInputContent(e.target.value)}
                    className="mt-2 min-h-[120px]"
                  />
                </div>
              </div>
            </TabsContent>

            {/* Image Processing Tab */}
            <TabsContent value="image" className="space-y-4">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Upload Image</label>
                  <div className="mt-2">
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="cursor-pointer"
                    />
                  </div>
                  {selectedFile && (
                    <div className="mt-2 text-sm text-muted-foreground">
                      Selected: {selectedFile.name}
                    </div>
                  )}
                </div>
                <div>
                  <label className="text-sm font-medium">Custom Message (Optional)</label>
                  <Textarea
                    placeholder="Describe what you want to extract from the image..."
                    value={customMessage}
                    onChange={(e) => setCustomMessage(e.target.value)}
                    className="mt-2"
                  />
                </div>
              </div>
            </TabsContent>

            {/* PDF Processing Tab */}
            <TabsContent value="pdf" className="space-y-4">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Upload PDF</label>
                  <div className="mt-2">
                    <Input
                      type="file"
                      accept=".pdf"
                      onChange={handleFileChange}
                      className="cursor-pointer"
                    />
                  </div>
                  {selectedFile && (
                    <div className="mt-2 text-sm text-muted-foreground">
                      Selected: {selectedFile.name}
                    </div>
                  )}
                </div>
                <div>
                  <label className="text-sm font-medium">Custom Message (Optional)</label>
                  <Textarea
                    placeholder="Describe what you want to extract from the PDF..."
                    value={customMessage}
                    onChange={(e) => setCustomMessage(e.target.value)}
                    className="mt-2"
                  />
                </div>
              </div>
            </TabsContent>

            {/* Audio Processing Tab */}
            <TabsContent value="audio" className="space-y-4">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Upload Audio</label>
                  <div className="mt-2">
                    <Input
                      type="file"
                      accept="audio/*"
                      onChange={handleFileChange}
                      className="cursor-pointer"
                    />
                  </div>
                  {selectedFile && (
                    <div className="mt-2 text-sm text-muted-foreground">
                      Selected: {selectedFile.name}
                    </div>
                  )}
                </div>
                <div>
                  <label className="text-sm font-medium">Custom Message (Optional)</label>
                  <Textarea
                    placeholder="Describe what you want to extract from the audio..."
                    value={customMessage}
                    onChange={(e) => setCustomMessage(e.target.value)}
                    className="mt-2"
                  />
                </div>
              </div>
            </TabsContent>

            {/* YouTube Processing Tab */}
            <TabsContent value="youtube" className="space-y-4">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">YouTube Video Link</label>
                  <Input
                    placeholder="https://www.youtube.com/watch?v=..."
                    value={youtubeLink}
                    onChange={(e) => setYoutubeLink(e.target.value)}
                    className="mt-2"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Custom Message (Optional)</label>
                  <Textarea
                    placeholder="Describe what you want to extract from the video..."
                    value={customMessage}
                    onChange={(e) => setCustomMessage(e.target.value)}
                    className="mt-2"
                  />
                </div>
              </div>
            </TabsContent>

            {/* Career Roadmap Tab */}
            <TabsContent value="roadmap" className="space-y-4">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Describe Your Background & Interests</label>
                  <Textarea
                    placeholder="e.g., I'm a 2nd year CSE student with skills: Java, JavaScript, SQL and good understanding in web architecture & web services and I'm interested in web development"
                    value={inputContent}
                    onChange={(e) => setInputContent(e.target.value)}
                    className="mt-2 min-h-[120px]"
                  />
                </div>
              </div>
            </TabsContent>
          </Tabs>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button 
              onClick={handleGenerate} 
              disabled={state.loading}
              className="flex-1"
            >
              {state.loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Generate Content
                </>
              )}
            </Button>
            <Button 
              variant="outline" 
              onClick={handleReset}
              disabled={state.loading}
            >
              Reset
            </Button>
          </div>

          {/* Error Display */}
          {state.error && (
            <Alert className="border-red-200 bg-red-50">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{state.error}</AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Generated Content Display */}
      {renderGeneratedContent()}
    </div>
  );
};
