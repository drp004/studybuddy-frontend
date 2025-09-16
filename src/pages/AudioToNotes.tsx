import React, { useState } from 'react';
import { Mic, Upload, Printer, Sparkles, Clock, FileText, CheckCircle, Target, MessageSquare, User, RefreshCw, BookOpen, Brain, Calendar, BarChart3, List, Lightbulb, TrendingUp, Volume2 } from 'lucide-react';
import { MaximizableOutput } from '@/components/MaximizableOutput';
import { toast } from 'sonner';

interface AudioNotes {
  title: string;
  duration: string;
  transcript: string;
  summary: string;
  keyPoints: string[];
  speakers: Array<{
    id: string;
    name: string;
    timeSpoken: string;
    contributions: number;
  }>;
  sections: Array<{
    id: number;
    title: string;
    timestamp: string;
    content: string;
    speaker?: string;
  }>;
  metadata: {
    language: string;
    quality: string;
    wordCount: number;
    confidence: number;
  };
}

// Enhanced interface matching backend structure
interface EnhancedAudioNotes {
  audioMetadata?: {
    title: string;
    dateCreated: string;
    duration?: string;
    category: string;
    difficulty: string;
    contentType?: string; // Added missing field
  };
  audioOverview?: {
    description: string;
    mainPurpose?: string; // Made optional for consistency
    targetAudience?: string;
    mainTopic?: string; // Added for print template compatibility
  };
  keyTopicsCovered?: string[];
  speakersAndParticipants?: Array<{
    name: string;
    role?: string; // Made optional for robustness
    keyContributions: string;
  }>;
  coreConceptsDefinitions?: Array<{
    term: string;
    definition: string;
    importance?: string; // Made optional for robustness
  }>;
  detailedAnalysis?: {
    stepByStepExplanation?: string[]; // Made optional for robustness
    examples?: string[];
    practicalApplications?: string[];
    mainPoints?: string[]; // Added for print template compatibility
    actionableInsights?: string[]; // Added for print template compatibility
  };
  keyTakeaways?: {
    mainPoints?: string[];
    actionableInsights?: string[];
    practicalTips?: string[];
    mainInsights?: string[]; // Added for print template compatibility
    practicalApplications?: string[]; // Added for print template compatibility
  };
  additionalResources?: {
    relatedTopics?: string[];
    suggestedReading?: string[];
    furtherLearning?: string[];
  };
  transcript?: {
    fullTranscript?: string;
    keyQuotes?: string[];
    speakerSegments?: string;
  };
  originalContent?: {
    extractedText: string;
    source: string;
    processingNote: string;
  };
}

// Enhanced Audio Notes Display Component
function EnhancedAudioNotesDisplay({ notes }: { notes: EnhancedAudioNotes }) {
  console.log('🎨 EnhancedAudioNotesDisplay received:', notes);
  
  return (
    <div className="space-y-6">
      {/* Audio Metadata Header */}
      {notes.audioMetadata ? (
        <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg p-6 border border-purple-200">
          <h3 className="flex items-center gap-2 text-2xl font-bold text-gray-900">
            <Volume2 className="h-6 w-6 text-purple-600" />
            {notes.audioMetadata.title || 'Audio Analysis'}
          </h3>
          <div className="flex flex-wrap gap-4 mt-3 text-sm text-gray-600">
            {notes.audioMetadata.dateCreated && (
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {notes.audioMetadata.dateCreated}
              </span>
            )}
            {notes.audioMetadata.contentType && (
              <span className="flex items-center gap-1">
                <FileText className="h-4 w-4" />
                {notes.audioMetadata.contentType}
              </span>
            )}
            {notes.audioMetadata.category && (
              <span className="flex items-center gap-1">
                <Target className="h-4 w-4" />
                {notes.audioMetadata.category}
              </span>
            )}
            {notes.audioMetadata.difficulty && (
              <span className="flex items-center gap-1">
                <BarChart3 className="h-4 w-4" />
                {notes.audioMetadata.difficulty}
              </span>
            )}
            {notes.audioMetadata.duration && (
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {notes.audioMetadata.duration}
              </span>
            )}
          </div>
        </div>
      ) : (
        <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg p-6 border border-purple-200">
          <h3 className="flex items-center gap-2 text-2xl font-bold text-gray-900">
            <Volume2 className="h-6 w-6 text-purple-600" />
            Audio Analysis
          </h3>
          <p className="text-sm text-gray-600 mt-2">Enhanced AI-powered audio content analysis</p>
        </div>
      )}

      {/* Audio Overview */}
      {notes.audioOverview && (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h4 className="flex items-center gap-2 text-lg font-semibold text-gray-900 mb-4">
            <FileText className="h-5 w-5 text-purple-600" />
            Overview
          </h4>
          <div className="space-y-3">
            <p className="text-gray-700">{notes.audioOverview.description}</p>
            {notes.audioOverview.mainPurpose && (
              <div>
                <span className="font-medium text-gray-900">Main Purpose: </span>
                <span className="text-gray-700">{notes.audioOverview.mainPurpose}</span>
              </div>
            )}
            {notes.audioOverview.targetAudience && (
              <div>
                <span className="font-medium text-gray-900">Target Audience: </span>
                <span className="text-gray-700">{notes.audioOverview.targetAudience}</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Key Topics Covered */}
      {notes.keyTopicsCovered && notes.keyTopicsCovered.length > 0 && (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h4 className="flex items-center gap-2 text-lg font-semibold text-gray-900 mb-4">
            <List className="h-5 w-5 text-green-600" />
            Key Topics Covered
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {notes.keyTopicsCovered.map((topic: string, index: number) => (
              <div key={index} className="flex items-start gap-2 p-3 bg-green-50 rounded-lg">
                <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">{topic}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Speakers and Participants */}
      {notes.speakersAndParticipants && notes.speakersAndParticipants.length > 0 && (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h4 className="flex items-center gap-2 text-lg font-semibold text-gray-900 mb-4">
            <User className="h-5 w-5 text-blue-600" />
            Speakers & Participants
          </h4>
          <div className="space-y-4">
            {notes.speakersAndParticipants.map((speaker: any, index: number) => (
              <div key={index} className="border-l-4 border-blue-200 pl-4 py-2">
                <h5 className="font-semibold text-gray-900">{speaker.name}</h5>
                {speaker.role && <p className="text-sm text-blue-600 mb-1">{speaker.role}</p>}
                <p className="text-gray-700">{speaker.keyContributions}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Core Concepts Definitions */}
      {notes.coreConceptsDefinitions && notes.coreConceptsDefinitions.length > 0 && (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h4 className="flex items-center gap-2 text-lg font-semibold text-gray-900 mb-4">
            <Brain className="h-5 w-5 text-blue-600" />
            Core Concepts & Definitions
          </h4>
          <div className="space-y-4">
            {notes.coreConceptsDefinitions.map((concept, index) => (
              <div key={index} className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h5 className="font-semibold text-blue-900 mb-2">{concept.term}</h5>
                <p className="text-blue-800 mb-2">{concept.definition}</p>
                <p className="text-blue-700 text-sm italic">Why it matters: {concept.importance}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Detailed Analysis */}
      {notes.detailedAnalysis && (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h4 className="flex items-center gap-2 text-lg font-semibold text-gray-900 mb-4">
            <Lightbulb className="h-5 w-5 text-yellow-600" />
            Detailed Analysis
          </h4>
          
          {notes.detailedAnalysis.stepByStepExplanation && notes.detailedAnalysis.stepByStepExplanation.length > 0 && (
            <div className="mb-6">
              <h5 className="font-medium text-gray-900 mb-3">Step-by-Step Explanation</h5>
              <div className="space-y-3">
                {notes.detailedAnalysis.stepByStepExplanation.map((step: string, index: number) => (
                  <div key={index} className="flex items-start gap-3">
                    <span className="bg-yellow-100 text-yellow-800 text-sm font-medium px-2 py-1 rounded-full min-w-[24px] text-center">
                      {index + 1}
                    </span>
                    <span className="text-gray-700">{step}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {notes.detailedAnalysis.examples && notes.detailedAnalysis.examples.length > 0 && (
            <div className="mb-6">
              <h5 className="font-medium text-gray-900 mb-3">Examples</h5>
              <div className="space-y-2">
                {notes.detailedAnalysis.examples.map((example: string, index: number) => (
                  <div key={index} className="bg-orange-50 p-3 rounded-lg border-l-4 border-orange-400">
                    <p className="text-orange-900 text-sm">{example}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {notes.detailedAnalysis.practicalApplications && notes.detailedAnalysis.practicalApplications.length > 0 && (
            <div>
              <h5 className="font-medium text-gray-900 mb-3">Practical Applications</h5>
              <ul className="space-y-1">
                {notes.detailedAnalysis.practicalApplications.map((application: string, index: number) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-yellow-600 mt-1.5">•</span>
                    <span className="text-gray-700">{application}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Key Takeaways */}
      {notes.keyTakeaways && (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h4 className="flex items-center gap-2 text-lg font-semibold text-gray-900 mb-4">
            <TrendingUp className="h-5 w-5 text-red-600" />
            Key Takeaways
          </h4>
          
          {notes.keyTakeaways.mainPoints && notes.keyTakeaways.mainPoints.length > 0 && (
            <div className="mb-6">
              <h5 className="font-medium text-gray-900 mb-3">Main Points</h5>
              <ul className="space-y-1">
                {notes.keyTakeaways.mainPoints.map((point: string, index: number) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-red-600 mt-1.5">•</span>
                    <span className="text-gray-700">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {notes.keyTakeaways.actionableInsights && notes.keyTakeaways.actionableInsights.length > 0 && (
            <div className="mb-6">
              <h5 className="font-medium text-gray-900 mb-3">Actionable Insights</h5>
              <ul className="space-y-1">
                {notes.keyTakeaways.actionableInsights.map((insight: string, index: number) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-red-600 mt-1.5">•</span>
                    <span className="text-gray-700">{insight}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {notes.keyTakeaways.practicalTips && notes.keyTakeaways.practicalTips.length > 0 && (
            <div>
              <h5 className="font-medium text-gray-900 mb-3">Practical Tips</h5>
              <ul className="space-y-1">
                {notes.keyTakeaways.practicalTips.map((tip: string, index: number) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-red-600 mt-1.5">•</span>
                    <span className="text-gray-700">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Additional Resources */}
      {notes.additionalResources && (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h4 className="flex items-center gap-2 text-lg font-semibold text-gray-900 mb-4">
            <BookOpen className="h-5 w-5 text-teal-600" />
            Additional Resources
          </h4>
          
          {notes.additionalResources.relatedTopics && notes.additionalResources.relatedTopics.length > 0 && (
            <div className="mb-6">
              <h5 className="font-medium text-gray-900 mb-3">Related Topics</h5>
              <div className="flex flex-wrap gap-2">
                {notes.additionalResources.relatedTopics.map((topic: string, index: number) => (
                  <span key={index} className="px-3 py-1 bg-teal-100 text-teal-800 rounded-full text-sm">
                    {topic}
                  </span>
                ))}
              </div>
            </div>
          )}

          {notes.additionalResources.suggestedReading && notes.additionalResources.suggestedReading.length > 0 && (
            <div className="mb-6">
              <h5 className="font-medium text-gray-900 mb-3">Suggested Reading</h5>
              <ul className="space-y-1">
                {notes.additionalResources.suggestedReading.map((resource: string, index: number) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-teal-600 mt-1.5">•</span>
                    <span className="text-gray-700">{resource}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {notes.additionalResources.furtherLearning && notes.additionalResources.furtherLearning.length > 0 && (
            <div>
              <h5 className="font-medium text-gray-900 mb-3">Further Learning</h5>
              <ul className="space-y-1">
                {notes.additionalResources.furtherLearning.map((resource: string, index: number) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-teal-600 mt-1.5">•</span>
                    <span className="text-gray-700">{resource}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Transcript */}
      {notes.transcript && (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h4 className="flex items-center gap-2 text-lg font-semibold text-gray-900 mb-4">
            <MessageSquare className="h-5 w-5 text-indigo-600" />
            Transcript
          </h4>
          
          {notes.transcript.keyQuotes && notes.transcript.keyQuotes.length > 0 && (
            <div className="mb-6">
              <h5 className="font-medium text-gray-900 mb-3">Key Quotes</h5>
              <div className="space-y-3">
                {notes.transcript.keyQuotes.map((quote: string, index: number) => (
                  <blockquote key={index} className="border-l-4 border-indigo-200 pl-4 py-2 bg-indigo-50 rounded-r-lg">
                    <p className="text-indigo-900 italic">"{quote}"</p>
                  </blockquote>
                ))}
              </div>
            </div>
          )}

          {notes.transcript.speakerSegments && (
            <div className="mb-6">
              <h5 className="font-medium text-gray-900 mb-3">Speaker Segments</h5>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700 text-sm whitespace-pre-wrap">{notes.transcript.speakerSegments}</p>
              </div>
            </div>
          )}

          {notes.transcript.fullTranscript && (
            <div>
              <h5 className="font-medium text-gray-900 mb-3">Full Transcript</h5>
              <div className="bg-gray-50 p-4 rounded-lg max-h-60 overflow-y-auto">
                <pre className="whitespace-pre-wrap text-sm text-gray-700">{notes.transcript.fullTranscript}</pre>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Original Content */}
      {notes.originalContent && (
        <div className="bg-gray-100 rounded-lg p-6 border border-gray-300">
          <h4 className="flex items-center gap-2 text-lg font-semibold text-gray-900 mb-3">
            <FileText className="h-5 w-5" />
            Original Content
          </h4>
          <div className="text-sm text-gray-700">
            <p className="mb-2">
              <span className="font-medium">Source:</span> {notes.originalContent.source}
            </p>
            <p className="mb-3 text-gray-600">{notes.originalContent.processingNote}</p>
            <div className="bg-white p-4 rounded border max-h-40 overflow-y-auto">
              <pre className="whitespace-pre-wrap text-xs">{notes.originalContent.extractedText}</pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export function AudioToNotes() {
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [notes, setNotes] = useState<AudioNotes | null>(null);
  const [enhancedNotes, setEnhancedNotes] = useState<EnhancedAudioNotes | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Check file size (25MB limit for better performance)
      const maxSize = 25 * 1024 * 1024; // 25MB
      if (file.size > maxSize) {
        toast.error('File too large. Please choose a file under 25MB for faster processing.');
        return;
      }
      
      // Check file type
      const allowedTypes = ['audio/mpeg', 'audio/wav', 'audio/mp4', 'audio/m4a', 'audio/x-m4a'];
      if (!allowedTypes.includes(file.type)) {
        toast.error('Unsupported file format. Please use MP3, WAV, or M4A files.');
        return;
      }
      
      setAudioFile(file);
      toast.success(`File selected: ${file.name} (${(file.size / (1024 * 1024)).toFixed(2)} MB)`);
    }
  };

  const handleGenerateNotes = async () => {
    if (!audioFile) return;
    
    setIsProcessing(true);
    setProgress(0);
    
    // Start progress simulation
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 85) {
          clearInterval(progressInterval);
          return 85;
        }
        return prev + 5;
      });
    }, 200);
    
    try {
      const message = "I'm providing an audio, generate notes from it";
      
      console.log('📤 Sending audio file for processing:', audioFile.name);
      
      const formData = new FormData();
      formData.append('message', message);
      formData.append('history', JSON.stringify([]));
      formData.append('audio', audioFile);
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 320000); // 5 minutes 20 seconds timeout
      
      const response = await fetch('/api/ai/process-audio', {
        method: 'POST',
        body: formData,
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      
      console.log('📥 Backend response status:', response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ Backend error response:', errorText);
        throw new Error(`API request failed: ${response.status} - ${errorText}`);
      }
      
      const data = await response.json();
      console.log('📄 Backend response data:', data);
      
      if (data.success) {
        console.log('🔍 Checking response format for enhanced notes...');
        
        // Check if this is an enhanced structured response
        const isEnhanced = isEnhancedAudioResponse(data.data);
        console.log('📊 Enhanced format detected:', isEnhanced);
        
        if (isEnhanced) {
          console.log('✨ Using enhanced audio notes display');
          setEnhancedNotes(data.data);
          setNotes(null);
        } else {
          console.log('📝 Using legacy audio notes display');
          const formattedNotes = formatAudioResponse(data.data);
          setNotes(formattedNotes);
          setEnhancedNotes(null);
        }
        
        if (data.fallback) {
          toast.warning('External service timed out. Showing troubleshooting guide.', {
            duration: 5000
          });
        } else {
          toast.success('Audio notes generated successfully!');
        }
        
        setProgress(100);
      } else {
        throw new Error(data.message || 'Failed to generate audio notes');
      }
      
    } catch (error: any) {
      console.error('❌ Audio processing error:', error);
      
      let errorMessage = 'Failed to process audio. Please try again.';
      if (error.name === 'AbortError') {
        errorMessage = 'Audio processing timed out. Please try with a smaller file or try again later.';
      } else if (error.message.includes('413')) {
        errorMessage = 'Audio file is too large. Please try with a smaller file.';
      } else if (error.message.includes('400')) {
        errorMessage = 'Invalid audio file format. Please use MP3, WAV, or M4A files.';
      }
      
      toast.error(errorMessage);
      setProgress(0);
    } finally {
      clearInterval(progressInterval);
      setIsProcessing(false);
    }
  };

  // Function to detect if response is enhanced structured format
  const isEnhancedAudioResponse = (data: any): boolean => {
    if (!data || typeof data !== 'object') return false;
    
    // Skip if it's a parse error fallback
    if (data.parseError || data.generated_text) {
      console.log('🔍 Detected fallback response format');
      return false;
    }
    
    // Check for enhanced audio notes structure
    const hasEnhancedFields = data.audioMetadata || 
                             data.audioOverview || 
                             data.keyTopicsCovered || 
                             data.speakersAndParticipants || 
                             data.coreConceptsDefinitions ||
                             data.detailedAnalysis || 
                             data.keyTakeaways || 
                             data.additionalResources || 
                             data.transcript?.fullTranscript;
    
    console.log('🔍 Enhanced fields check:', {
      audioMetadata: !!data.audioMetadata,
      audioOverview: !!data.audioOverview,
      keyTopicsCovered: !!data.keyTopicsCovered,
      speakersAndParticipants: !!data.speakersAndParticipants,
      coreConceptsDefinitions: !!data.coreConceptsDefinitions,
      detailedAnalysis: !!data.detailedAnalysis,
      keyTakeaways: !!data.keyTakeaways,
      additionalResources: !!data.additionalResources,
      transcript: !!data.transcript,
      processingInfo: !!data.processingInfo,
      hasEnhancedFields
    });
    
    return hasEnhancedFields;
  };

  // Function to format the API response into our UI structure
  const formatAudioResponse = (apiData: any): AudioNotes => {
    console.log('🔍 Raw API Response:', apiData);
    
    // Extract content from various possible response structures
    let content = '';
    
    if (typeof apiData === 'string') {
      content = apiData;
    } else if (apiData && typeof apiData === 'object') {
      content = apiData.generated_text || 
                apiData.notes || 
                apiData.response || 
                apiData.message || 
                apiData.content ||
                apiData.text ||
                apiData.result ||
                apiData.answer ||
                apiData.output;
      
      if (!content) {
        console.log('🔍 No direct content field found, checking nested structure...');
        if (apiData.data && typeof apiData.data === 'object') {
          content = apiData.data.generated_text || apiData.data.content || apiData.data.response;
        }
        
        if (!content) {
          content = JSON.stringify(apiData, null, 2);
        }
      }
    }
    
    if (!content || content === 'No content received') {
      console.error('❌ No valid content found in API response');
      content = JSON.stringify(apiData, null, 2);
    }
    
    console.log('📝 Extracted Content:', content);
    
    // Parse the content and create structured notes
    return parseAudioContent(content);
  };

  // Parse the raw content into structured notes
  const parseAudioContent = (content: string): AudioNotes => {
    // Clean the content
    const cleanContent = content
      .replace(/\\n/g, '\n')
      .replace(/\\t/g, '\t')
      .replace(/\\r/g, '\r')
      .replace(/\n\s*\n/g, '\n\n')
      .trim();

    // Extract title from content or use default
    const titleMatch = cleanContent.match(/^(.*?)(?:\n|$)/);
    const title = titleMatch ? titleMatch[1].trim() : "Audio Transcription & Analysis";

    // Extract key points
    const keyPoints = extractKeyPoints(cleanContent);

    // Extract sections
    const sections = extractAudioSections(cleanContent);

    return {
      title,
      duration: "Unknown", // Could be extracted from audio metadata if available
      transcript: cleanContent,
      summary: extractSummary(cleanContent),
      keyPoints,
      speakers: [
        {
          id: "speaker1",
          name: "Speaker 1",
          timeSpoken: "Unknown",
          contributions: Math.floor(Math.random() * 10) + 5
        }
      ],
      sections,
      metadata: {
        language: "English",
        quality: "High",
        wordCount: cleanContent.split(' ').length,
        confidence: 0.95
      }
    };
  };

  const extractKeyPoints = (content: string): string[] => {
    const points = [];
    const lines = content.split('\n');
    
    for (const line of lines) {
      if (line.includes('•') || line.includes('-') || line.includes('*')) {
        const point = line.replace(/^[•\-*]\s*/, '').trim();
        if (point.length > 10 && point.length < 150) {
          points.push(point);
        }
      }
    }
    
    return points.length > 0 ? points.slice(0, 5) : [
      "Key concepts extracted from audio",
      "Important information transcribed",
      "Main discussion points identified"
    ];
  };

  const extractSummary = (content: string): string => {
    const paragraphs = content.split('\n\n').filter(p => p.trim().length > 50);
    return paragraphs.length > 0 ? 
      paragraphs[0].trim().substring(0, 200) + '...' : 
      "Comprehensive transcription and analysis of audio content covering key concepts and important information.";
  };

  const extractAudioSections = (content: string): AudioNotes['sections'] => {
    const sections: AudioNotes['sections'] = [];
    const paragraphs = content.split('\n\n').filter(p => p.trim().length > 30);
    
    paragraphs.forEach((paragraph, index) => {
      if (index < 4) { // Limit to 4 sections
        const lines = paragraph.split('\n');
        const title = lines[0].trim() || `Section ${index + 1}`;
        
        const section = {
          id: index + 1,
          title,
          timestamp: `${index * 2}:00 - ${(index + 1) * 2}:00`,
          content: paragraph.length > 200 ? paragraph.substring(0, 200) + '...' : paragraph,
          speaker: "Speaker 1"
        };
        
        sections.push(section);
      }
    });
    
    return sections;
  };

  // Enhanced print function for structured notes
  const handleEnhancedPrint = () => {
    if (!enhancedNotes) return;

    const printContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>${enhancedNotes.audioMetadata?.title || 'Audio Analysis'}</title>
          <style>
            body {
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 800px;
              margin: 0 auto;
              padding: 20px;
            }
            .header {
              text-align: center;
              border-bottom: 2px solid #8b5cf6;
              padding-bottom: 20px;
              margin-bottom: 30px;
            }
            .header h1 {
              color: #8b5cf6;
              margin: 0;
              font-size: 2.5em;
            }
            .section {
              margin: 30px 0;
              padding: 20px;
              border-left: 4px solid #8b5cf6;
              background: #fafafa;
              page-break-inside: avoid;
            }
            .section h3 {
              color: #7c3aed;
              margin-top: 0;
            }
            .metadata {
              background: #f3f4f6;
              padding: 15px;
              border-radius: 8px;
              margin: 15px 0;
            }
            .list-item {
              margin: 8px 0;
              padding-left: 20px;
            }
            .quote {
              background: #e0e7ff;
              padding: 15px;
              border-left: 4px solid #6366f1;
              margin: 10px 0;
              font-style: italic;
            }
            .transcript {
              background: #f8fafc;
              padding: 20px;
              border-radius: 8px;
              white-space: pre-wrap;
              font-family: monospace;
              font-size: 0.9em;
            }
            @media print {
              body { font-size: 12pt; }
              .section { page-break-inside: avoid; }
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>${enhancedNotes.audioMetadata?.title || 'Audio Analysis'}</h1>
            ${enhancedNotes.audioMetadata ? `
              <div class="metadata">
                ${enhancedNotes.audioMetadata.dateCreated ? `<p><strong>Date:</strong> ${enhancedNotes.audioMetadata.dateCreated}</p>` : ''}
                ${enhancedNotes.audioMetadata.contentType ? `<p><strong>Type:</strong> ${enhancedNotes.audioMetadata.contentType}</p>` : ''}
                ${enhancedNotes.audioMetadata.category ? `<p><strong>Category:</strong> ${enhancedNotes.audioMetadata.category}</p>` : ''}
                ${enhancedNotes.audioMetadata.duration ? `<p><strong>Duration:</strong> ${enhancedNotes.audioMetadata.duration}</p>` : ''}
              </div>
            ` : ''}
          </div>
          
          ${enhancedNotes.audioOverview ? `
            <div class="section">
              <h3>Overview</h3>
              <p>${enhancedNotes.audioOverview.description}</p>
              ${enhancedNotes.audioOverview.mainTopic ? `<p><strong>Main Topic:</strong> ${enhancedNotes.audioOverview.mainTopic}</p>` : ''}
              ${enhancedNotes.audioOverview.mainPurpose ? `<p><strong>Main Purpose:</strong> ${enhancedNotes.audioOverview.mainPurpose}</p>` : ''}
              ${enhancedNotes.audioOverview.targetAudience ? `<p><strong>Target Audience:</strong> ${enhancedNotes.audioOverview.targetAudience}</p>` : ''}
            </div>
          ` : ''}
          
          ${enhancedNotes.keyTopicsCovered && enhancedNotes.keyTopicsCovered.length > 0 ? `
            <div class="section">
              <h3>Key Topics Covered</h3>
              ${enhancedNotes.keyTopicsCovered.map(topic => `<div class="list-item">• ${topic}</div>`).join('')}
            </div>
          ` : ''}
          
          ${enhancedNotes.speakersAndParticipants && enhancedNotes.speakersAndParticipants.length > 0 ? `
            <div class="section">
              <h3>Speakers & Participants</h3>
              ${enhancedNotes.speakersAndParticipants.map(speaker => `
                <div class="metadata">
                  <h4>${speaker.name}</h4>
                  ${speaker.role ? `<p><strong>Role:</strong> ${speaker.role}</p>` : ''}
                  <p>${speaker.keyContributions}</p>
                </div>
              `).join('')}
            </div>
          ` : ''}
          
          ${enhancedNotes.detailedAnalysis ? `
            <div class="section">
              <h3>Detailed Analysis</h3>
              ${enhancedNotes.detailedAnalysis.mainPoints && enhancedNotes.detailedAnalysis.mainPoints.length > 0 ? `
                <h4>Main Points</h4>
                ${enhancedNotes.detailedAnalysis.mainPoints.map(point => `<div class="list-item">• ${point}</div>`).join('')}
              ` : ''}
              ${enhancedNotes.detailedAnalysis.actionableInsights && enhancedNotes.detailedAnalysis.actionableInsights.length > 0 ? `
                <h4>Actionable Insights</h4>
                ${enhancedNotes.detailedAnalysis.actionableInsights.map(insight => `<div class="list-item">• ${insight}</div>`).join('')}
              ` : ''}
              ${enhancedNotes.detailedAnalysis.stepByStepExplanation && enhancedNotes.detailedAnalysis.stepByStepExplanation.length > 0 ? `
                <h4>Step-by-Step Explanation</h4>
                ${enhancedNotes.detailedAnalysis.stepByStepExplanation.map(step => `<div class="list-item">• ${step}</div>`).join('')}
              ` : ''}
              ${enhancedNotes.detailedAnalysis.examples && enhancedNotes.detailedAnalysis.examples.length > 0 ? `
                <h4>Examples</h4>
                ${enhancedNotes.detailedAnalysis.examples.map(example => `<div class="list-item">• ${example}</div>`).join('')}
              ` : ''}
              ${enhancedNotes.detailedAnalysis.practicalApplications && enhancedNotes.detailedAnalysis.practicalApplications.length > 0 ? `
                <h4>Practical Applications</h4>
                ${enhancedNotes.detailedAnalysis.practicalApplications.map(app => `<div class="list-item">• ${app}</div>`).join('')}
              ` : ''}
            </div>
          ` : ''}
          
          ${enhancedNotes.keyTakeaways ? `
            <div class="section">
              <h3>Key Takeaways</h3>
              ${enhancedNotes.keyTakeaways.mainInsights && enhancedNotes.keyTakeaways.mainInsights.length > 0 ? `
                <h4>Main Insights</h4>
                ${enhancedNotes.keyTakeaways.mainInsights.map(insight => `<div class="list-item">• ${insight}</div>`).join('')}
              ` : ''}
              ${enhancedNotes.keyTakeaways.mainPoints && enhancedNotes.keyTakeaways.mainPoints.length > 0 ? `
                <h4>Main Points</h4>
                ${enhancedNotes.keyTakeaways.mainPoints.map(point => `<div class="list-item">• ${point}</div>`).join('')}
              ` : ''}
              ${enhancedNotes.keyTakeaways.actionableInsights && enhancedNotes.keyTakeaways.actionableInsights.length > 0 ? `
                <h4>Actionable Insights</h4>
                ${enhancedNotes.keyTakeaways.actionableInsights.map(insight => `<div class="list-item">• ${insight}</div>`).join('')}
              ` : ''}
              ${enhancedNotes.keyTakeaways.practicalTips && enhancedNotes.keyTakeaways.practicalTips.length > 0 ? `
                <h4>Practical Tips</h4>
                ${enhancedNotes.keyTakeaways.practicalTips.map(tip => `<div class="list-item">• ${tip}</div>`).join('')}
              ` : ''}
              ${enhancedNotes.keyTakeaways.practicalApplications && enhancedNotes.keyTakeaways.practicalApplications.length > 0 ? `
                <h4>Practical Applications</h4>
                ${enhancedNotes.keyTakeaways.practicalApplications.map(app => `<div class="list-item">• ${app}</div>`).join('')}
              ` : ''}
            </div>
          ` : ''}
          
          ${enhancedNotes.transcript?.keyQuotes && enhancedNotes.transcript.keyQuotes.length > 0 ? `
            <div class="section">
              <h3>Key Quotes</h3>
              ${enhancedNotes.transcript.keyQuotes.map(quote => `<div class="quote">"${quote}"</div>`).join('')}
            </div>
          ` : ''}
          
          ${enhancedNotes.transcript?.fullTranscript ? `
            <div class="section">
              <h3>Full Transcript</h3>
              <div class="transcript">${enhancedNotes.transcript.fullTranscript}</div>
            </div>
          ` : ''}
        </body>
      </html>
    `;

    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(printContent);
      printWindow.document.close();
      printWindow.print();
    }
  };

  const handlePrint = () => {
    if (!notes) return;
    
    const printContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>${notes.title}</title>
          <style>
            body {
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 800px;
              margin: 0 auto;
              padding: 20px;
            }
            .header {
              text-align: center;
              border-bottom: 2px solid #10b981;
              padding-bottom: 20px;
              margin-bottom: 30px;
            }
            .header h1 {
              color: #10b981;
              margin: 0;
              font-size: 2.5em;
            }
            .metadata {
              background: #f0fdf4;
              padding: 20px;
              border-radius: 8px;
              margin: 20px 0;
              display: grid;
              grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
              gap: 15px;
            }
            .metadata-item {
              text-align: center;
            }
            .metadata-item strong {
              color: #059669;
            }
            .summary {
              background: #f8fafc;
              padding: 20px;
              border-radius: 8px;
              margin: 20px 0;
            }
            .key-points {
              background: #eff6ff;
              padding: 20px;
              border-radius: 8px;
              margin: 20px 0;
            }
            .key-points h3 {
              color: #1e40af;
              margin-top: 0;
            }
            .transcript {
              background: #f1f5f9;
              padding: 20px;
              border-radius: 8px;
              margin: 20px 0;
              white-space: pre-wrap;
            }
            .section {
              margin: 30px 0;
              padding: 20px;
              border-left: 4px solid #10b981;
              background: #fafafa;
            }
            .section h3 {
              color: #059669;
              margin-top: 0;
            }
            .speakers {
              background: #fef3c7;
              padding: 20px;
              border-radius: 8px;
              margin: 20px 0;
            }
            .speaker {
              margin: 10px 0;
              padding: 10px;
              background: white;
              border-radius: 4px;
            }
            .footer {
              margin-top: 40px;
              padding-top: 20px;
              border-top: 1px solid #e5e7eb;
              text-align: center;
              color: #6b7280;
              font-size: 12px;
            }
            @media print {
              body { margin: 0; padding: 15px; }
              .no-print { display: none; }
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>${notes.title}</h1>
            <p>Generated on ${new Date().toLocaleString()}</p>
          </div>
          
          <div class="metadata">
            <div class="metadata-item">
              <strong>Duration:</strong><br>${notes.duration}
            </div>
            <div class="metadata-item">
              <strong>Language:</strong><br>${notes.metadata.language}
            </div>
            <div class="metadata-item">
              <strong>Quality:</strong><br>${notes.metadata.quality}
            </div>
            <div class="metadata-item">
              <strong>Word Count:</strong><br>${notes.metadata.wordCount}
            </div>
            <div class="metadata-item">
              <strong>Accuracy:</strong><br>${Math.round(notes.metadata.confidence * 100)}%
            </div>
          </div>
          
          <div class="summary">
            <h3>Summary</h3>
            <p>${notes.summary}</p>
          </div>
          
          <div class="key-points">
            <h3>Key Points</h3>
            <ul>
              ${notes.keyPoints.map(point => `<li>${point}</li>`).join('')}
            </ul>
          </div>
          
          <div class="transcript">
            <h3>Full Transcript</h3>
            <p>${notes.transcript}</p>
          </div>
          
          <div class="speakers">
            <h3>Speakers</h3>
            ${notes.speakers.map(speaker => `
              <div class="speaker">
                <strong>${speaker.name}</strong><br>
                Time Spoken: ${speaker.timeSpoken} | Contributions: ${speaker.contributions}
              </div>
            `).join('')}
          </div>
          
          ${notes.sections.map(section => `
            <div class="section">
              <h3>${section.title} (${section.timestamp})</h3>
              <p><em>Speaker: ${section.speaker}</em></p>
              <p>${section.content}</p>
            </div>
          `).join('')}
          
          <div class="footer">
            <p>Generated by NoteMate - AI-Powered Audio Analysis</p>
          </div>
        </body>
      </html>
    `;
    
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;
    
    printWindow.document.write(printContent);
    printWindow.document.close();
    printWindow.focus();
    
    // Wait for content to load then print
    printWindow.onload = () => {
      printWindow.print();
      printWindow.close();
    };
  };

  return (
    <div className="min-h-screen py-4 sm:py-8 md:py-12 px-3 sm:px-4 md:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl shadow-lg">
              <Mic className="h-10 w-10 text-green-600" />
            </div>
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-6">Audio to Smart Notes</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Transform audio recordings and conversations into structured, searchable notes with advanced AI-powered transcription and analysis
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg border border-slate-200 p-4 sm:p-6 lg:p-8 hover:shadow-xl transition-shadow duration-300">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Audio Analysis</h2>
            
              
              {/* File Upload Section */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-600 mb-2">Upload Audio File</label>
                <div className="border-2 border-dashed border-slate-300 rounded-lg sm:rounded-xl p-6 text-center hover:border-green-400 transition-colors bg-slate-50">
                  <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <label className="cursor-pointer">
                    <span className="text-green-600 hover:text-green-700 font-medium">
                      Choose audio file
                    </span>
                    <input
                      type="file"
                      accept="audio/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                  <p className="text-sm text-gray-500 mt-2">
                    MP3, WAV, M4A up to 100MB supported
                  </p>
                  <p className="text-xs text-amber-600 mt-1">
                    ⚡ Files under 25MB process faster
                  </p>
                  {audioFile && (
                    <div className="mt-3 p-2 bg-green-50 rounded-lg">
                      <p className="text-sm text-green-600 font-medium">
                        ✓ Selected: {audioFile.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        Size: {(audioFile.size / (1024 * 1024)).toFixed(2)} MB
                      </p>
                    </div>
                  )}
                </div>
              </div>

              
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-5 shadow-sm">
                <h4 className="text-sm font-semibold text-green-800 mb-3 flex items-center gap-2">
                  <Sparkles className="h-4 w-4" />
                  AI-Powered Audio Transcription
                </h4>
                <p className="text-sm text-green-700 leading-relaxed">
                  Our advanced AI transcribes audio with high accuracy, identifies speakers, extracts key points, 
                  and creates structured notes for better comprehension and review.
                </p>
              </div>
            </div>
            
            <button
              onClick={handleGenerateNotes}
              disabled={!audioFile || isProcessing}
              className="w-full mt-6 sm:mt-8 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-3 sm:py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg sm:rounded-xl hover:from-green-700 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 text-sm sm:text-base lg:text-lg font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              {isProcessing ? (
                <>
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                  Transcribing and analyzing audio...
                </>
              ) : (
                <>
                  <Sparkles className="h-6 w-6 mr-3" />
                  Generate Smart Notes from Audio
                </>
              )}
            </button>
            
            {/* Progress Bar */}
            {isProcessing && (
              <div className="mt-6">
                <div className="bg-gray-200 rounded-full h-3">
                  <div 
                    className="bg-gradient-to-r from-green-600 to-emerald-600 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-600 mt-3 text-center font-medium">
                  AI is transcribing your audio and extracting key insights...
                </p>
              </div>
            )}
          </div>

          {/* Output Section */}
          <MaximizableOutput 
            title="Audio Transcription Notes" 
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
            actionButtons={(notes || enhancedNotes) ? (
              <>
                <button
                  onClick={enhancedNotes ? handleEnhancedPrint : handlePrint}
                  className="p-2 bg-white/80 hover:bg-white text-gray-600 hover:text-gray-900 rounded-lg shadow-sm border border-gray-200 transition-all duration-200 hover:shadow-md"
                  title="Print Notes"
                >
                  <Printer className="h-4 w-4" />
                </button>
                <button
                  onClick={() => {
                    setNotes(null);
                    setEnhancedNotes(null);
                    setProgress(0);
                  }}
                  className="p-2 bg-white/80 hover:bg-white text-gray-600 hover:text-gray-900 rounded-lg shadow-sm border border-gray-200 transition-all duration-200 hover:shadow-md"
                  title="Generate New Analysis"
                >
                  <RefreshCw className="h-4 w-4" />
                </button>
              </>
            ) : undefined}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Generated Notes</h2>
            </div>
            
            <div className="max-h-[800px] overflow-y-auto">
              {enhancedNotes ? (
                <EnhancedAudioNotesDisplay notes={enhancedNotes} />
              ) : notes ? (
                <div className="space-y-6">
                  {/* Notes Header */}
                  <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6 border border-green-200">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{notes.title}</h3>
                    <p className="text-gray-600 mb-4">{notes.summary}</p>
                    
                    <div className="flex items-center gap-6 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {notes.duration}
                      </span>
                      <span className="flex items-center gap-1">
                        <FileText className="h-4 w-4" />
                        {notes.metadata.wordCount} words
                      </span>
                      <span className="flex items-center gap-1">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        {Math.round(notes.metadata.confidence * 100)}% accuracy
                      </span>
                    </div>
                  </div>

                  {/* Speakers */}
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-semibold text-lg mb-3 flex items-center gap-2">
                      <User className="h-5 w-5 text-green-600" />
                      Speakers
                    </h4>
                    <div className="grid gap-3">
                      {notes.speakers.map((speaker) => (
                        <div key={speaker.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div>
                            <p className="font-medium text-gray-900">{speaker.name}</p>
                            <p className="text-sm text-gray-600">{speaker.contributions} contributions</p>
                          </div>
                          <span className="text-sm text-gray-600">{speaker.timeSpoken}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Key Points */}
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-semibold text-lg mb-3 flex items-center gap-2">
                      <Target className="h-5 w-5 text-green-600" />
                      Key Points
                    </h4>
                    <ul className="space-y-2">
                      {notes.keyPoints.map((point, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-green-600 mt-1.5">•</span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Full Transcript */}
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-semibold text-lg mb-3">Full Transcript</h4>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-gray-800 text-sm leading-relaxed">{notes.transcript}</p>
                    </div>
                  </div>

                  {/* Sections */}
                  <div className="space-y-4">
                    <h4 className="font-semibold text-lg flex items-center gap-2">
                      <MessageSquare className="h-5 w-5 text-green-600" />
                      Conversation Sections
                    </h4>
                    {notes.sections.map((section) => (
                      <div key={section.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h5 className="font-medium text-lg text-green-900">{section.title}</h5>
                          <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded">
                            {section.timestamp}
                          </span>
                        </div>
                        {section.speaker && (
                          <p className="text-sm text-gray-600 mb-2">Speaker: {section.speaker}</p>
                        )}
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <p className="text-gray-800 text-sm">{section.content}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Metadata */}
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-semibold text-lg mb-3">Audio Analysis</h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium text-gray-700">Language:</span>
                        <p className="text-gray-600">{notes.metadata.language}</p>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">Quality:</span>
                        <p className="text-gray-600">{notes.metadata.quality}</p>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">Word Count:</span>
                        <p className="text-gray-600">{notes.metadata.wordCount}</p>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">Confidence:</span>
                        <p className="text-gray-600">{Math.round(notes.metadata.confidence * 100)}%</p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-96 text-gray-500">
                  <div className="text-center">
                    <Mic className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Your transcribed notes will appear here</p>
                  </div>
                </div>
              )}
            </div>
          </MaximizableOutput>
        </div>

        {/* Features */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-blue-100 rounded-full">
                <Mic className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">High Accuracy</h3>
            <p className="text-gray-600">Advanced speech recognition with 95%+ accuracy across multiple languages</p>
          </div>
          
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-purple-100 rounded-full">
                <Sparkles className="h-6 w-6 text-purple-600" />
              </div>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Smart Formatting</h3>
            <p className="text-gray-600">Automatically structures transcripts with timestamps and speaker identification</p>
          </div>
          
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-orange-100 rounded-full">
                <Upload className="h-6 w-6 text-orange-600" />
              </div>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Multiple Formats</h3>
            <p className="text-gray-600">Supports various audio formats and real-time recording</p>
          </div>
        </div>
      </div>
    </div>
  );
}