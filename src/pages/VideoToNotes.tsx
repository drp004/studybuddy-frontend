import React, { useState } from 'react';
import { Video, Printer, Sparkles, Clock, FileText, CheckCircle, Target, List, Lightbulb, BookOpen, Brain, Calendar, BarChart3, RefreshCw, TrendingUp } from 'lucide-react';
import { MaximizableOutput } from '@/components/MaximizableOutput';
import { toast } from 'sonner';

interface VideoNotes {
  videoMetadata?: {
    title: string;
    dateCreated: string;
    duration: string;
    category: string;
    difficulty: string;
  };
  videoOverview?: {
    description: string;
    mainPurpose: string;
    targetAudience: string;
  };
  keyTopicsCovered?: string[];
  coreConceptsDefinitions?: Array<{
    term: string;
    definition: string;
    importance?: string;
  }>;
  detailedAnalysis?: {
    stepByStepExplanation: string[];
    examples: string[];
    practicalApplications: string[];
  };
  keyTakeaways?: {
    mainPoints: string[];
    actionableInsights: string[];
    practicalTips: string[];
  };
  additionalResources?: {
    relatedTopics: string[];
    suggestedReading: string[];
    furtherLearning: string[];
  };
  originalTranscript?: {
    rawContent: string;
    source: string;
    processingNote: string;
  };
  transcriptStatus?: {
    available: boolean;
    reason: string;
    note: string;
  };
}

// Enhanced Video Notes Display Component
function EnhancedVideoNotes({ notes }: { notes: VideoNotes }) {
  return (
    <div className="space-y-6">
      {/* Video Metadata Header */}
      {notes.videoMetadata && (
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-6 border border-purple-200">
          <h3 className="flex items-center gap-2 text-2xl font-bold text-gray-900">
            <BookOpen className="h-6 w-6 text-purple-600" />
            {notes.videoMetadata.title}
          </h3>
          <div className="flex flex-wrap gap-4 mt-3 text-sm text-gray-600">
            <span className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              {notes.videoMetadata.dateCreated}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {notes.videoMetadata.duration}
            </span>
            <span className="flex items-center gap-1">
              <Target className="h-4 w-4" />
              {notes.videoMetadata.category}
            </span>
            <span className="flex items-center gap-1">
              <BarChart3 className="h-4 w-4" />
              {notes.videoMetadata.difficulty}
            </span>
          </div>
        </div>
      )}

      {/* Video Overview */}
      {notes.videoOverview && (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h4 className="flex items-center gap-2 text-lg font-semibold text-gray-900 mb-4">
            <FileText className="h-5 w-5 text-blue-600" />
            Overview
          </h4>
          <div className="space-y-3">
            <p className="text-gray-700">{notes.videoOverview.description}</p>
            {notes.videoOverview.mainPurpose && (
              <div>
                <span className="font-medium text-gray-900">Purpose: </span>
                <span className="text-gray-700">{notes.videoOverview.mainPurpose}</span>
              </div>
            )}
            {notes.videoOverview.targetAudience && (
              <div>
                <span className="font-medium text-gray-900">Target Audience: </span>
                <span className="text-gray-700">{notes.videoOverview.targetAudience}</span>
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

      {/* Core Concepts & Definitions */}
      {notes.coreConceptsDefinitions && notes.coreConceptsDefinitions.length > 0 && (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h4 className="flex items-center gap-2 text-lg font-semibold text-gray-900 mb-4">
            <Brain className="h-5 w-5 text-indigo-600" />
            Core Concepts & Definitions
          </h4>
          <div className="space-y-4">
            {notes.coreConceptsDefinitions.map((concept: any, index: number) => (
              <div key={index} className="border-l-4 border-indigo-200 pl-4 py-2">
                <h5 className="font-semibold text-gray-900">{concept.term}</h5>
                <p className="text-gray-700 mt-1">{concept.definition}</p>
                {concept.importance && (
                  <p className="text-sm text-indigo-600 mt-2 italic">
                    <strong>Why it matters:</strong> {concept.importance}
                  </p>
                )}
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
                    <span className="flex-shrink-0 w-6 h-6 bg-yellow-100 text-yellow-800 rounded-full flex items-center justify-center text-sm font-medium">
                      {index + 1}
                    </span>
                    <p className="text-gray-700">{step}</p>
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

      {/* Original Transcript */}
      {notes.originalTranscript && (
        <div className="bg-gray-100 rounded-lg p-6 border border-gray-300">
          <h4 className="flex items-center gap-2 text-lg font-semibold text-gray-900 mb-3">
            <FileText className="h-5 w-5" />
            Original Transcript
          </h4>
          <div className="text-sm text-gray-700">
            <p className="mb-2">
              <span className="font-medium">Source:</span> {notes.originalTranscript.source}
            </p>
            <p className="mb-3 text-gray-600">{notes.originalTranscript.processingNote}</p>
            <div className="bg-white p-4 rounded border max-h-40 overflow-y-auto">
              <pre className="whitespace-pre-wrap text-xs">{notes.originalTranscript.rawContent}</pre>
            </div>
          </div>
        </div>
      )}

      {/* Transcript Status (when not available) */}
      {notes.transcriptStatus && !notes.transcriptStatus.available && (
        <div className="bg-yellow-50 rounded-lg p-6 border border-yellow-200">
          <h4 className="flex items-center gap-2 text-lg font-semibold text-yellow-900 mb-3">
            <FileText className="h-5 w-5" />
            Transcript Status
          </h4>
          <div className="text-sm text-yellow-800">
            <p className="mb-2">
              <span className="font-medium">Status:</span> Not Available
            </p>
            <p className="mb-2">
              <span className="font-medium">Reason:</span> {notes.transcriptStatus.reason}
            </p>
            <p className="text-yellow-700">{notes.transcriptStatus.note}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export function VideoToNotes() {
  const [videoUrl, setVideoUrl] = useState('');
  const [notes, setNotes] = useState<VideoNotes | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleGenerateNotes = async () => {
    if (!videoUrl) {
      toast.error('Please enter a YouTube video URL');
      return;
    }
    
    // Validate YouTube URL
    if (!isValidYouTubeUrl(videoUrl)) {
      toast.error('Please enter a valid YouTube URL');
      return;
    }
    
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
      const message = `I'm providing a youtube video link generate notes from this video; link: ${videoUrl}`;
      
      console.log('📤 Sending YouTube video request:', message);
      
      const response = await fetch('/api/ai/process-yt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, history: [] })
      });
      
      console.log('📥 Backend response status:', response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ Backend error response:', errorText);
        throw new Error(`API request failed: ${response.status} - ${errorText}`);
      }
      
      const data = await response.json();
      console.log('📄 Backend response data:', data);
      
      if (data.success) {
        const formattedNotes = formatVideoResponse(data.data);
        setNotes(formattedNotes);
        
        if (data.fallback) {
          toast.warning('AI service temporarily unavailable. Showing fallback recommendations.');
        } else {
          toast.success('Video notes generated successfully!');
        }
        
        setProgress(100);
      } else {
        throw new Error(data.message || 'Failed to generate video notes');
      }
      
    } catch (error: any) {
      console.error('❌ Video processing error:', error);
      toast.error(error.message || 'Failed to process video. Please try again.');
      setProgress(0);
    } finally {
      clearInterval(progressInterval);
      setIsProcessing(false);
    }
  };

  // Function to format the API response into our UI structure
  const formatVideoResponse = (apiData: any) => {
    console.log('🔍 Raw API Response:', apiData);
    
    // Check if we have the structured format from Gemini
    if (apiData && typeof apiData === 'object' && apiData.videoMetadata) {
      console.log('✅ Structured format detected');
      return apiData as VideoNotes;
    }
    
    // Try multiple possible response structures from FastAPI
    let content = '';
    
    if (typeof apiData === 'string') {
      content = apiData;
    } else if (apiData && typeof apiData === 'object') {
      // Try different possible response structures - prioritize generated_text from Gemini
      content = apiData.generated_text || 
                apiData.notes || 
                apiData.response || 
                apiData.message || 
                apiData.content ||
                apiData.text ||
                apiData.result ||
                apiData.answer ||
                apiData.output;
      
      // If still no content found, try to stringify but ensure it's meaningful
      if (!content) {
        console.log('🔍 No direct content field found, checking nested structure...');
        // Check if there's meaningful nested content
        if (apiData.data && typeof apiData.data === 'object') {
          content = apiData.data.generated_text || apiData.data.content || apiData.data.response;
        }
        
        // Last resort: stringify but only if it contains meaningful data
        if (!content) {
          content = JSON.stringify(apiData, null, 2);
        }
      }
    }
    
    if (!content || content === 'No content received') {
      console.error('❌ No valid content found in API response');
      console.log('🔍 Available keys in apiData:', Object.keys(apiData || {}));
      // Use the entire response as fallback
      content = JSON.stringify(apiData, null, 2);
    }
    
    console.log('📝 Extracted Content:', content);
    
    // Try to parse JSON first if it looks like structured JSON response
    if (typeof content === 'string') {
      // Check if content contains JSON structure from Gemini API
      if (content.includes('videoMetadata') || content.includes('videoOverview') || content.includes('keyTopicsCovered')) {
        try {
          console.log('🔍 Attempting to extract JSON from content...');
          let jsonString = content;
          
          // Strategy 1: Extract from ```json code blocks
          const codeBlockMatch = content.match(/```json\s*(\{[\s\S]*?\})\s*```/i);
          if (codeBlockMatch) {
            jsonString = codeBlockMatch[1].trim();
            console.log('✅ Found JSON in code blocks');
          } else {
            // Strategy 2: Look for the first complete JSON object
            const startIndex = content.indexOf('{');
            if (startIndex !== -1) {
              let braceCount = 0;
              let endIndex = -1;
              
              for (let i = startIndex; i < content.length; i++) {
                if (content[i] === '{') {
                  braceCount++;
                } else if (content[i] === '}') {
                  braceCount--;
                  if (braceCount === 0) {
                    endIndex = i;
                    break;
                  }
                }
              }
              
              if (endIndex !== -1) {
                jsonString = content.substring(startIndex, endIndex + 1);
                console.log('✅ Extracted JSON object from content');
              }
            }
          }
          
          // Clean up the JSON string
          jsonString = jsonString
            .replace(/```json/gi, '')
            .replace(/```/g, '')
            .replace(/^\s*```json\s*/i, '')
            .replace(/\s*```\s*$/i, '')
            .trim();
          
          console.log('🧹 Cleaned JSON preview:', jsonString.substring(0, 200) + '...');
          
          const parsedJson = JSON.parse(jsonString);
          
          // Check if it's a valid structured format
          if (parsedJson && typeof parsedJson === 'object' && 
              (parsedJson.videoMetadata || parsedJson.videoOverview || parsedJson.keyTopicsCovered)) {
            console.log('✅ Successfully parsed structured JSON from Gemini API');
            return parsedJson as VideoNotes;
          }
        } catch (parseError) {
          console.log('⚠️ JSON parsing failed:', parseError);
          console.log('🔍 Content preview that failed to parse:', content.substring(0, 500) + '...');
        }
      }
    }
    
    // Parse the content and create structured notes (legacy format)
    return parseVideoContent(content);
  };

  // Parse the raw content into structured notes
  const parseVideoContent = (content: string): VideoNotes => {
    // Clean the content
    const cleanContent = content
      .replace(/\\n/g, '\n')
      .replace(/\\t/g, '\t')
      .replace(/\\r/g, '\r')
      .replace(/\n\s*\n/g, '\n\n')
      .trim();

    // Extract title from content or use default
    const titleMatch = cleanContent.match(/^(.*?)(?:\n|$)/);
    const title = titleMatch ? titleMatch[1].trim() : "Video Analysis Notes";

    // Create a simple structured response from the content
    return {
      videoMetadata: {
        title: title,
        dateCreated: new Date().toISOString().split('T')[0],
        duration: "Unknown",
        category: "Educational",
        difficulty: "Intermediate"
      },
      videoOverview: {
        description: extractOverview(cleanContent),
        mainPurpose: "Educational content analysis",
        targetAudience: "General audience"
      },
      keyTopicsCovered: extractKeyTopics(cleanContent),
      coreConceptsDefinitions: [],
      detailedAnalysis: {
        stepByStepExplanation: [],
        examples: [],
        practicalApplications: []
      },
      keyTakeaways: {
        mainPoints: extractKeyPoints(cleanContent),
        actionableInsights: [],
        practicalTips: []
      },
      additionalResources: {
        relatedTopics: [],
        suggestedReading: [],
        furtherLearning: []
      },
      originalTranscript: {
        rawContent: cleanContent,
        source: "StudyBuddy API",
        processingNote: "Processed with AI enhancement"
      }
    };
  };

  const extractOverview = (content: string): string => {
    const paragraphs = content.split('\n\n').filter(p => p.trim().length > 50);
    return paragraphs.length > 0 ? paragraphs[0].trim() : "Comprehensive notes generated from video analysis covering key concepts and important information.";
  };

  const extractKeyTopics = (content: string): string[] => {
    const topics = [];
    const lines = content.split('\n');
    
    for (const line of lines) {
      if (line.includes('•') || line.includes('-') || line.includes('*')) {
        const topic = line.replace(/^[•\-*]\s*/, '').trim();
        if (topic.length > 10 && topic.length < 100) {
          topics.push(topic);
        }
      }
    }
    
    return topics.length > 0 ? topics.slice(0, 5) : ["Key concepts", "Main points", "Important information"];
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
    
    return points.length > 0 ? points.slice(0, 5) : ["Key insights from video content"];
  };

  // YouTube URL validation
  const isValidYouTubeUrl = (url: string): boolean => {
    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+/;
    return youtubeRegex.test(url);
  };

  const handlePrint = () => {
    if (!notes) return;
    
    // Create print content
    const printContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>${notes.videoMetadata?.title || 'Video Analysis Notes'}</title>
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
            .section {
              margin: 30px 0;
              padding: 20px;
              border-left: 4px solid #8b5cf6;
              background: #fafafa;
            }
            .section h3 {
              color: #7c3aed;
              margin-top: 0;
            }
            @media print {
              body { margin: 0; padding: 15px; }
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>${notes.videoMetadata?.title || 'Video Analysis Notes'}</h1>
            <p>Generated on ${new Date().toLocaleString()}</p>
            <p>Duration: ${notes.videoMetadata?.duration || 'Unknown'} | Difficulty: ${notes.videoMetadata?.difficulty || 'Unknown'}</p>
          </div>
          
          ${notes.videoOverview ? `
            <div class="section">
              <h3>Video Overview</h3>
              <p>${notes.videoOverview.description}</p>
              <p><strong>Purpose:</strong> ${notes.videoOverview.mainPurpose}</p>
              <p><strong>Target Audience:</strong> ${notes.videoOverview.targetAudience}</p>
            </div>
          ` : ''}
          
          ${notes.keyTopicsCovered ? `
            <div class="section">
              <h3>Key Topics Covered</h3>
              <ul>
                ${notes.keyTopicsCovered.map(topic => `<li>${topic}</li>`).join('')}
              </ul>
            </div>
          ` : ''}
          
          ${notes.coreConceptsDefinitions ? `
            <div class="section">
              <h3>Core Concepts & Definitions</h3>
              ${notes.coreConceptsDefinitions.map(concept => `
                <div style="margin: 15px 0; padding: 10px; background: white; border-radius: 4px;">
                  <strong>${concept.term}:</strong> ${concept.definition}
                  ${concept.importance ? `<br><em>Why it matters: ${concept.importance}</em>` : ''}
                </div>
              `).join('')}
            </div>
          ` : ''}
          
          <div style="margin-top: 40px; text-align: center; color: #6b7280; font-size: 12px;">
            <p>Generated by NoteMate - AI-Powered Video Analysis</p>
          </div>
        </body>
      </html>`;
    
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(printContent);
      printWindow.document.close();
      printWindow.focus();
      
      // Wait for content to load then print
      printWindow.onload = () => {
        printWindow.print();
        printWindow.close();
      };
    }
  };

  const handleGenerateNewAnalysis = () => {
    setNotes(null);
    setVideoUrl('');
    setProgress(0);
    toast.success('Ready for new video analysis!');
  };

  // Create action buttons for MaximizableOutput
  const actionButtons = notes ? (
    <div className="flex gap-2">
      <button
        onClick={handlePrint}
        className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
      >
        <Printer className="h-4 w-4 mr-2" />
        Print
      </button>
      <button
        onClick={handleGenerateNewAnalysis}
        className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
      >
        <RefreshCw className="h-4 w-4 mr-2" />
        Generate New Analysis
      </button>
    </div>
  ) : null;

  return (
    <div className="min-h-screen py-4 sm:py-8 md:py-12 px-3 sm:px-4 md:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-2xl shadow-lg">
              <Video className="h-10 w-10 text-purple-600" />
            </div>
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-6">Video to Smart Notes</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Extract key insights and create comprehensive study notes from YouTube videos using AI-powered analysis
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg border border-slate-200 p-4 sm:p-6 lg:p-8 hover:shadow-xl transition-shadow duration-300">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Video Analysis</h2>
              
              {/* URL Input Section */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-600 mb-2">YouTube Video URL</label>
                <input
                  type="url"
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                  placeholder="Paste YouTube URL here (e.g., https://youtube.com/watch?v=...)"
                  className="w-full p-3 sm:p-4 border border-slate-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm sm:text-base lg:text-lg transition-all duration-200 bg-slate-50 hover:bg-white"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Supports YouTube videos with automatic transcription and AI enhancement
                </p>
              </div>

              <div className="bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200 rounded-xl p-5 shadow-sm">
                <h4 className="text-sm font-semibold text-purple-800 mb-3 flex items-center gap-2">
                  <Sparkles className="h-4 w-4" />
                  AI-Powered Video Analysis
                </h4>
                <p className="text-sm text-purple-700 leading-relaxed">
                  Our advanced AI extracts transcripts using StudyBuddy API, then enhances them with Gemini AI to create 
                  structured notes with key concepts, takeaways, and actionable insights.
                </p>
              </div>
            </div>

            {/* Video Preview */}
            {videoUrl && (
              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-700 mb-4">Preview</h3>
                <div className="bg-gray-100 rounded-lg p-4 text-center">
                  <Video className="h-16 w-16 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">YouTube Video</p>
                  <p className="text-xs text-gray-500 mt-1 break-all">
                    {videoUrl}
                  </p>
                </div>
              </div>
            )}

            {/* Progress Bar */}
            {isProcessing && (
              <div className="mb-4">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Processing video...</span>
                  <span>{progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Getting transcript from StudyBuddy API and enhancing with Gemini AI...
                </p>
              </div>
            )}

            <button
              onClick={handleGenerateNotes}
              disabled={!videoUrl || isProcessing}
              className="w-full mt-6 sm:mt-8 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-3 sm:py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg sm:rounded-xl hover:from-purple-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 text-sm sm:text-base lg:text-lg font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              {isProcessing ? (
                <>
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                  Analyzing video content... ({progress}%)
                </>
              ) : (
                <>
                  <Brain className="h-6 w-6 mr-3" />
                  Analyze Video with AI
                </>
              )}
            </button>
          </div>

          {/* Output Section */}
          <MaximizableOutput 
            title="Video Analysis Notes" 
            actionButtons={actionButtons}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            <div className="mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Generated Notes</h2>
            </div>
            
            <div className="max-h-[800px] overflow-y-auto">
              {notes ? (
                <div className="space-y-6">
                  <EnhancedVideoNotes notes={notes} />
                </div>
              ) : (
                <div className="flex items-center justify-center h-96 text-gray-500">
                  <div className="text-center">
                    <Video className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Your video analysis notes will appear here</p>
                    <p className="text-sm mt-2">Enter a YouTube URL and click "Analyze Video with AI"</p>
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
                <Video className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">YouTube Integration</h3>
            <p className="text-gray-600">Seamlessly processes YouTube videos using StudyBuddy API for transcription</p>
          </div>
          
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-green-100 rounded-full">
                <Sparkles className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">AI Enhancement</h3>
            <p className="text-gray-600">Gemini AI creates structured notes with key concepts and takeaways</p>
          </div>
          
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-orange-100 rounded-full">
                <Printer className="h-6 w-6 text-orange-600" />
              </div>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Print & Export</h3>
            <p className="text-gray-600">Print formatted notes or generate new analysis with action buttons</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VideoToNotes;
