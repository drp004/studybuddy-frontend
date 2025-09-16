import React, { useState } from 'react';
import { FileText, Upload, Printer, Copy, Sparkles, Image, File, CheckCircle, Target, RefreshCw, BookOpen, Brain, Calendar, BarChart3, List, Lightbulb, TrendingUp } from 'lucide-react';
import { MaximizableOutput } from '@/components/MaximizableOutput';
import { toast } from 'sonner';

interface ImageNotes {
  title: string;
  extractedText: string;
  summary: string;
  keyPoints: string[];
  sections: Array<{
    id: number;
    title: string;
    content: string;
    type: 'text' | 'table' | 'list' | 'diagram';
  }>;
  metadata: {
    fileType: string;
    pageCount?: number;
    extractedElements: string[];
  };
}

// Enhanced interface matching VideoToNotes structure
interface DocumentNotes {
  documentMetadata?: {
    title: string;
    dateCreated: string;
    documentType: string;
    category: string;
    difficulty: string;
  };
  documentOverview?: {
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
  originalContent?: {
    extractedText: string;
    source: string;
    processingNote: string;
  };
}

// Enhanced Document Notes Display Component
function EnhancedDocumentNotes({ notes }: { notes: DocumentNotes }) {
  console.log('🎨 EnhancedDocumentNotes received:', notes);
  
  return (
    <div className="space-y-6">
      {/* Document Metadata Header */}
      {notes.documentMetadata ? (
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-200">
          <h3 className="flex items-center gap-2 text-2xl font-bold text-gray-900">
            <BookOpen className="h-6 w-6 text-blue-600" />
            {notes.documentMetadata.title || 'Document Analysis'}
          </h3>
          <div className="flex flex-wrap gap-4 mt-3 text-sm text-gray-600">
            {notes.documentMetadata.dateCreated && (
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {notes.documentMetadata.dateCreated}
              </span>
            )}
            {notes.documentMetadata.documentType && (
              <span className="flex items-center gap-1">
                <FileText className="h-4 w-4" />
                {notes.documentMetadata.documentType}
              </span>
            )}
            {notes.documentMetadata.category && (
              <span className="flex items-center gap-1">
                <Target className="h-4 w-4" />
                {notes.documentMetadata.category}
              </span>
            )}
            {notes.documentMetadata.difficulty && (
              <span className="flex items-center gap-1">
                <BarChart3 className="h-4 w-4" />
                {notes.documentMetadata.difficulty}
              </span>
            )}
          </div>
        </div>
      ) : (
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-200">
          <h3 className="flex items-center gap-2 text-2xl font-bold text-gray-900">
            <BookOpen className="h-6 w-6 text-blue-600" />
            Document Analysis
          </h3>
          <p className="text-sm text-gray-600 mt-2">Enhanced AI-powered document analysis</p>
        </div>
      )}

      {/* Document Overview */}
      {notes.documentOverview && (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h4 className="flex items-center gap-2 text-lg font-semibold text-gray-900 mb-4">
            <FileText className="h-5 w-5 text-blue-600" />
            Overview
          </h4>
          <div className="space-y-3">
            <p className="text-gray-700">{notes.documentOverview.description}</p>
            {notes.documentOverview.mainPurpose && (
              <div>
                <span className="font-medium text-gray-900">Purpose: </span>
                <span className="text-gray-700">{notes.documentOverview.mainPurpose}</span>
              </div>
            )}
            {notes.documentOverview.targetAudience && (
              <div>
                <span className="font-medium text-gray-900">Target Audience: </span>
                <span className="text-gray-700">{notes.documentOverview.targetAudience}</span>
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

export function ImageToNotes() {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [notes, setNotes] = useState<ImageNotes | null>(null);
  const [enhancedNotes, setEnhancedNotes] = useState<DocumentNotes | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      setNotes(null);
      setEnhancedNotes(null);
    }
  };

  const handleGenerateNotes = async () => {
    if (!uploadedFile) return;
    
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
    }, 500);

    try {
      const formData = new FormData();
      formData.append(uploadedFile.type === 'application/pdf' ? 'pdf' : 'image', uploadedFile);
      formData.append('message', 'Generate comprehensive notes from this document with detailed analysis, key points, and structured sections');
      formData.append('history', JSON.stringify([]));

      // Determine API endpoint based on file type
      const endpoint = uploadedFile.type === 'application/pdf' ? '/api/ai/process-pdf' : '/api/ai/process-image';
      const fileTypeText = uploadedFile.type === 'application/pdf' ? 'PDF' : 'image';
      
      console.log(`🚀 Processing ${fileTypeText} with endpoint:`, endpoint);
      console.log('📁 File info:', {
        name: uploadedFile.name,
        size: uploadedFile.size,
        type: uploadedFile.type
      });

      const response = await fetch(endpoint, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      
      if (result.success && result.data) {
        console.log('🔍 Full API result:', result);
        console.log('📄 Result data:', result.data);
        
        // Check if we have enhanced structured response
        let responseText = result.data.generated_text || result.data;
        console.log('📝 Response text type:', typeof responseText);
        console.log('📝 Response text content:', responseText);
        
        try {
          let parsedResponse;
          
          // Handle different response formats
          if (typeof responseText === 'string') {
            // Clean up the JSON string - remove any markdown formatting
            let cleanedText = responseText.trim();
            
            // Remove markdown code blocks if present
            if (cleanedText.startsWith('```json')) {
              cleanedText = cleanedText.replace(/^```json\s*/, '').replace(/\s*```$/, '');
            } else if (cleanedText.startsWith('```')) {
              cleanedText = cleanedText.replace(/^```\s*/, '').replace(/\s*```$/, '');
            }
            
            console.log('🧹 Cleaned text for parsing:', cleanedText.substring(0, 200) + '...');
            
            // Try to parse JSON string
            parsedResponse = JSON.parse(cleanedText);
          } else if (typeof responseText === 'object') {
            // Already an object, use directly
            parsedResponse = responseText;
          } else {
            throw new Error('Invalid response format');
          }
          
          console.log('✅ Parsed response structure:', {
            hasMetadata: !!parsedResponse.documentMetadata,
            hasOverview: !!parsedResponse.documentOverview,
            hasTopics: !!parsedResponse.keyTopicsCovered,
            hasConcepts: !!parsedResponse.coreConceptsDefinitions,
            hasAnalysis: !!parsedResponse.detailedAnalysis,
            hasTakeaways: !!parsedResponse.keyTakeaways,
            hasResources: !!parsedResponse.additionalResources,
            hasOriginal: !!parsedResponse.originalContent
          });
          
          if (parsedResponse.documentMetadata || parsedResponse.documentOverview) {
            // Enhanced structured response
            console.log('🚀 Using enhanced notes display');
            setEnhancedNotes(parsedResponse);
            setNotes(null);
            clearInterval(progressInterval);
            setProgress(100);
            toast.success('Enhanced notes generated successfully!');
          } else {
            // Legacy response format
            console.log('📋 Using legacy notes display');
            const processedNotes = formatDocumentResponse(result.data);
            setNotes(processedNotes);
            setEnhancedNotes(null);
            clearInterval(progressInterval);
            setProgress(100);
            toast.success('Notes generated successfully!');
          }
        } catch (parseError) {
          console.error('❌ JSON parsing failed:', parseError);
          console.log('🔄 Falling back to legacy processing');
          // Fallback to legacy processing if JSON parsing fails
          const processedNotes = formatDocumentResponse(result.data);
          setNotes(processedNotes);
          setEnhancedNotes(null);
          clearInterval(progressInterval);
          setProgress(100);
          toast.success('Notes generated successfully!');
        }
      } else {
        throw new Error(result.message || 'Failed to process file');
      }

    } catch (error: any) {
      console.error('❌ Document processing error:', error);
      clearInterval(progressInterval);
      toast.error(`Failed to process ${uploadedFile.type === 'application/pdf' ? 'PDF' : 'image'}. Please try again.`);
      
      // Provide fallback notes
      const fileTypeText = uploadedFile.type === 'application/pdf' ? 'PDF' : 'image';
      const fallbackNotes: ImageNotes = {
        title: `${fileTypeText.charAt(0).toUpperCase() + fileTypeText.slice(1)} Analysis Notes`,
        extractedText: `Error processing ${fileTypeText}: ${error.message}. Please try again with a different file or check your connection.`,
        summary: `Unable to process the ${fileTypeText} at this time. The service may be temporarily unavailable.`,
        keyPoints: [
          `${fileTypeText.charAt(0).toUpperCase() + fileTypeText.slice(1)} processing service temporarily unavailable`,
          "Please try again later",
          "Check your internet connection",
          uploadedFile.type === 'application/pdf' ? "Ensure the PDF is not password protected" : "Ensure the image is clear and readable"
        ],
        sections: [
          {
            id: 1,
            title: "Error Information",
            content: error.message,
            type: "text" as const
          }
        ],
        metadata: {
          fileType: uploadedFile.type,
          pageCount: uploadedFile.type === 'application/pdf' ? 1 : 1,
          extractedElements: ['Error occurred during processing']
        }
      };
      setNotes(fallbackNotes);
      setProgress(0);
    } finally {
      setIsProcessing(false);
    }
  };

  // Function to format the API response into our UI structure
  const formatDocumentResponse = (apiData: any): ImageNotes => {
    console.log('🔍 Raw API Response:', apiData);
    
    // Check if we have the new structured format with proper document structure
    if (apiData && typeof apiData === 'object' && 
        (apiData.documentMetadata || apiData.title || apiData.sections)) {
      console.log('✅ Structured format detected');
      return apiData as ImageNotes;
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
      console.log('🔍 Available keys in apiData:', Object.keys(apiData || {}));
      content = JSON.stringify(apiData, null, 2);
    }
    
    console.log('📝 Extracted Content:', content);
    
    // Try to parse JSON first if it looks like structured JSON response
    if (typeof content === 'string') {
      // Check if content contains JSON structure from Gemini API
      if (content.includes('documentMetadata') || content.includes('documentOverview') || 
          content.includes('keyTopicsCovered') || content.includes('title') || 
          content.includes('sections') || content.includes('keyPoints')) {
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
          if (parsedJson && typeof parsedJson === 'object') {
            console.log('✅ Successfully parsed structured JSON from Gemini API');
            return formatStructuredDocumentData(parsedJson);
          }
        } catch (parseError) {
          console.log('⚠️ JSON parsing failed:', parseError);
          console.log('🔍 Content preview that failed to parse:', content.substring(0, 500) + '...');
        }
      }
    }
    
    // Parse the content and create structured notes (legacy format)
    return parseDocumentContent(content);
  };

  // Format structured document data similar to video notes
  const formatStructuredDocumentData = (data: any): ImageNotes => {
    console.log('🔧 Formatting structured document data:', data);
    
    // Clean title - remove "reply:" or similar prefixes
    let title = data.documentMetadata?.title || 
                data.title || 
                data.documentOverview?.title ||
                "Document Analysis Notes";
    
    // Remove common prefixes that might appear
    title = title.replace(/^(reply:|response:|answer:|result:)\s*/i, '').trim();
    
    const summary = data.documentOverview?.description || 
                    data.summary || 
                    data.documentOverview?.mainPurpose ||
                    "Comprehensive analysis of the document covering key concepts and information.";
    
    const keyPoints = data.keyTopicsCovered || 
                      data.keyPoints || 
                      data.mainPoints ||
                      ["Key information extracted from document"];
    
    // Extract sections from structured data - avoid duplication
    let sections = [];
    const processedContent = new Set(); // Track processed content to avoid duplicates
    
    if (data.sections && Array.isArray(data.sections)) {
      sections = data.sections
        .filter((section: any) => {
          const content = section.content || section.description || section.text || "";
          const contentKey = content.substring(0, 100); // Use first 100 chars as key
          if (processedContent.has(contentKey)) return false;
          processedContent.add(contentKey);
          return content.trim().length > 0;
        })
        .map((section: any, index: number) => ({
          id: index + 1,
          title: section.title || section.heading || `Section ${index + 1}`,
          content: section.content || section.description || section.text || "",
          type: section.type || 'text' as const
        }));
    } else if (data.detailedAnalysis) {
      // Handle detailed analysis structure
      let sectionId = 1;
      
      if (data.detailedAnalysis.stepByStepExplanation) {
        const content = Array.isArray(data.detailedAnalysis.stepByStepExplanation) 
          ? data.detailedAnalysis.stepByStepExplanation.join('\n\n')
          : data.detailedAnalysis.stepByStepExplanation;
        
        if (content.trim().length > 0) {
          sections.push({
            id: sectionId++,
            title: "Step-by-Step Analysis",
            content,
            type: 'text' as const
          });
        }
      }
      
      if (data.detailedAnalysis.examples) {
        const content = Array.isArray(data.detailedAnalysis.examples)
          ? data.detailedAnalysis.examples.join('\n\n')
          : data.detailedAnalysis.examples;
        
        if (content.trim().length > 0) {
          sections.push({
            id: sectionId++,
            title: "Examples",
            content,
            type: 'text' as const
          });
        }
      }
      
      if (data.detailedAnalysis.comparisons) {
        const content = Array.isArray(data.detailedAnalysis.comparisons)
          ? data.detailedAnalysis.comparisons.join('\n\n')
          : data.detailedAnalysis.comparisons;
        
        if (content.trim().length > 0) {
          sections.push({
            id: sectionId++,
            title: "Comparisons",
            content,
            type: 'text' as const
          });
        }
      }
    } else {
      // Fallback: parse content as markdown but avoid the full JSON
      const cleanContent = typeof data === 'string' ? data : 
        (data.content || data.text || data.description || '');
      if (cleanContent.trim().length > 0) {
        sections = extractSectionsMarkdown(cleanContent);
      }
    }
    
    return {
      title,
      extractedText: typeof data === 'string' ? data : JSON.stringify(data, null, 2),
      summary,
      keyPoints: Array.isArray(keyPoints) ? keyPoints : [keyPoints],
      sections: sections.length > 0 ? sections : [{
        id: 1,
        title: "Document Content",
        content: summary,
        type: 'text' as const
      }],
      metadata: {
        fileType: uploadedFile?.type || 'unknown',
        pageCount: data.documentMetadata?.pageCount || 1,
        extractedElements: data.documentMetadata?.extractedElements || ['Structured Content']
      }
    };
  };

  // Parse the raw content into structured notes with markdown conventions
  const parseDocumentContent = (content: string): ImageNotes => {
    // Clean the content and preserve markdown formatting
    const cleanContent = content
      .replace(/\\n/g, '\n')
      .replace(/\\t/g, '\t')
      .replace(/\\r/g, '\r')
      .replace(/\n\s*\n/g, '\n\n')
      .trim();

    // Extract title from ## Main Heading, ignore content starting with { and remove prefixes
    let title = "Document Analysis Notes";
    const lines = cleanContent.split('\n');
    
    for (const line of lines) {
      // Skip lines starting with { (JSON content)
      if (line.trim().startsWith('{')) continue;
      
      // Look for ## Main Heading
      const mainHeadingMatch = line.match(/^##\s+(.+)$/);
      if (mainHeadingMatch) {
        title = mainHeadingMatch[1].trim();
        break;
      }
      
      // Fallback to first non-empty, non-JSON line
      if (line.trim() && !line.includes('content:') && !line.startsWith('#')) {
        title = line.replace(/[#*\-]/g, '').trim();
        break;
      }
    }
    
    // Remove common prefixes from title
    title = title.replace(/^(reply:|response:|answer:|result:)\s*/i, '').trim();

    // Extract key points with markdown parsing
    const keyPoints = extractKeyPointsMarkdown(cleanContent);

    // Extract sections with markdown structure - avoid repetition
    const sections = extractSectionsMarkdown(cleanContent);

    // Generate comprehensive summary
    const summary = extractSummaryMarkdown(cleanContent);

    return {
      title,
      extractedText: cleanContent,
      summary,
      keyPoints,
      sections,
      metadata: {
        fileType: uploadedFile?.type || 'unknown',
        pageCount: uploadedFile?.type === 'application/pdf' ? 1 : 1,
        extractedElements: determineExtractedElements(cleanContent)
      }
    };
  };

  const determineExtractedElements = (content: string): string[] => {
    const elements = [];
    if (content.includes('•') || content.includes('-') || content.includes('*')) {
      elements.push('Bullet Points');
    }
    if (content.match(/\d+\./)) {
      elements.push('Numbered Lists');
    }
    if (content.includes('\n\n')) {
      elements.push('Paragraphs');
    }
    if (content.match(/[A-Z][^.!?]*[.!?]/)) {
      elements.push('Sentences');
    }
    if (content.match(/\b[A-Z]{2,}\b/)) {
      elements.push('Acronyms');
    }
    return elements.length > 0 ? elements : ['Text Content'];
  };

  const extractKeyPointsMarkdown = (content: string): string[] => {
    const points = [];
    const lines = content.split('\n');
    
    for (const line of lines) {
      // Look for markdown bullet points: *, **, or traditional bullets
      if (line.match(/^\s*\*\s+/) || line.includes('•') || line.includes('-') || line.includes('→')) {
        let point = line.replace(/^\s*[•\-*→]\s*/, '').trim();
        // Handle **bold** formatting in bullet points
        point = point.replace(/\*\*(.*?)\*\*/g, '$1');
        if (point.length > 10 && point.length < 200) {
          points.push(point);
        }
      }
    }
    
    return points.length > 0 ? points.slice(0, 8) : [
      "Key information extracted from document",
      "Important concepts and ideas",
      "Main topics covered",
      "Notable details and facts"
    ];
  };

  const extractSummaryMarkdown = (content: string): string => {
    // Look for content after main heading but before first subheading
    const lines = content.split('\n');
    let summaryLines = [];
    let foundMainHeading = false;
    
    for (const line of lines) {
      if (line.match(/^##\s+/)) {
        foundMainHeading = true;
        continue;
      }
      if (foundMainHeading && line.match(/^###\s+/)) {
        break; // Stop at first subheading
      }
      if (foundMainHeading && line.trim() && !line.match(/^[#*]/)) {
        summaryLines.push(line.trim());
      }
    }
    
    if (summaryLines.length > 0) {
      const summary = summaryLines.join(' ').replace(/\*\*(.*?)\*\*/g, '$1');
      return summary.length > 300 ? summary.substring(0, 300) + '...' : summary;
    }
    
    // Fallback to first meaningful paragraph
    const paragraphs = content.split('\n\n').filter(p => p.trim().length > 50);
    if (paragraphs.length > 0) {
      const firstParagraph = paragraphs[0].replace(/^##\s+/, '').replace(/\*\*(.*?)\*\*/g, '$1').trim();
      return firstParagraph.length > 300 ? firstParagraph.substring(0, 300) + '...' : firstParagraph;
    }
    return "Comprehensive analysis of the document covering key concepts, important information, and main topics.";
  };

  const extractSectionsMarkdown = (content: string): ImageNotes['sections'] => {
    const sections: ImageNotes['sections'] = [];
    const lines = content.split('\n');
    let currentSection: any = null;
    let sectionId = 1;
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      
      // Skip lines starting with { (JSON content) or content: prefix
      if (line.startsWith('{') || line.startsWith('content:')) continue;
      
      // Check for ### subheadings - extract title directly
      if (line.match(/^###\s+/)) {
        // Save previous section if exists
        if (currentSection) {
          sections.push({
            id: sectionId++,
            title: currentSection.title,
            content: currentSection.content.join('\n').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>'),
            type: 'text' as const
          });
        }
        
        // Start new section - extract title directly (e.g., "### Introduction" -> "Introduction")
        currentSection = {
          title: line.replace(/^###\s+/, '').trim(),
          content: []
        };
      } else if (currentSection && line && !line.match(/^##\s+/) && !line.startsWith('{')) {
        // Add content to current section (skip main headings and JSON)
        currentSection.content.push(line);
      } else if (!currentSection && line && !line.match(/^##\s+/) && !line.startsWith('{') && sections.length === 0) {
        // Handle content before any subheadings
        currentSection = {
          title: "Introduction",
          content: [line]
        };
      }
    }
    
    // Add the last section
    if (currentSection) {
      sections.push({
        id: sectionId,
        title: currentSection.title,
        content: currentSection.content.join('\n').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>'),
        type: 'text' as const
      });
    }
    
    // Fallback if no sections found
    if (sections.length === 0) {
      // Filter out JSON content and content: prefixes
      const cleanLines = lines.filter(line => {
        const trimmed = line.trim();
        return trimmed && !trimmed.startsWith('{') && !trimmed.startsWith('content:');
      });
      
      if (cleanLines.length > 0) {
        const cleanContent = cleanLines.join('\n');
        const paragraphs = cleanContent.split('\n\n').filter(p => p.trim().length > 30);
        paragraphs.slice(0, 3).forEach((paragraph, index) => {
          sections.push({
            id: index + 1,
            title: `Section ${index + 1}`,
            content: paragraph.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>'),
            type: 'text' as const
          });
        });
      }
    }
    
    return sections.length > 0 ? sections : [
      {
        id: 1,
        title: "Document Content",
        content: content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>'),
        type: 'text' as const
      }
    ];
  };

  const handleCopyNotes = () => {
    if (!notes) return;
    const notesText = `${notes.title}\n\n${notes.summary}\n\nKey Points:\n${notes.keyPoints.map(point => `• ${point}`).join('\n')}\n\nSections:\n${notes.sections.map(section => `${section.title}\n${section.content}`).join('\n\n')}`;
    navigator.clipboard.writeText(notesText);
    toast.success('Notes copied to clipboard!');
  };

  const handlePrint = () => {
    if (!notes) return;
    
    const printContent = `
      <html>
        <head>
          <title>${notes.title}</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; margin: 20px; }
            h1 { color: #2563eb; border-bottom: 2px solid #2563eb; padding-bottom: 10px; }
            h2 { color: #1e40af; margin-top: 30px; }
            .summary { background: #f8fafc; padding: 15px; border-radius: 8px; margin: 20px 0; }
            .key-points { margin: 20px 0; }
            .key-points li { margin: 8px 0; }
            .section { margin: 25px 0; padding: 15px; border-left: 4px solid #3b82f6; }
            .metadata { font-size: 12px; color: #64748b; margin-top: 30px; }
          </style>
        </head>
        <body>
          <h1>${notes.title}</h1>
          <div class="summary">
            <h2>Summary</h2>
            <p>${notes.summary}</p>
          </div>
          <div class="key-points">
            <h2>Key Points</h2>
            <ul>
              ${notes.keyPoints.map(point => `<li>${point}</li>`).join('')}
            </ul>
          </div>
          <div class="sections">
            <h2>Detailed Analysis</h2>
            ${notes.sections.map(section => `
              <div class="section">
                <h3>${section.title}</h3>
                <p>${section.content}</p>
              </div>
            `).join('')}
          </div>
          <div class="metadata">
            <p><strong>File Type:</strong> ${notes.metadata.fileType}</p>
            <p><strong>Extracted Elements:</strong> ${notes.metadata.extractedElements.join(', ')}</p>
          </div>
        </body>
      </html>
    `;
    
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
    if (uploadedFile) {
      setNotes(null);
      setEnhancedNotes(null);
      handleGenerateNotes();
    }
  };

  // Enhanced print function for structured notes
  const handlePrintEnhanced = () => {
    if (!enhancedNotes) return;

    const printContent = `
      <html>
        <head>
          <title>Document Analysis Notes</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; line-height: 1.6; }
            .header { text-align: center; margin-bottom: 30px; }
            .section { margin-bottom: 25px; }
            .section-title { color: #2563eb; font-size: 18px; font-weight: bold; margin-bottom: 10px; }
            .metadata { background: #f8fafc; padding: 15px; border-radius: 8px; margin-bottom: 20px; }
            .key-point { margin: 8px 0; padding-left: 20px; }
            .concept { margin: 15px 0; padding: 10px; border-left: 4px solid #6366f1; background: #f8fafc; }
            .concept-term { font-weight: bold; color: #1e40af; }
            ul { padding-left: 20px; }
            li { margin: 5px 0; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>${enhancedNotes.documentMetadata?.title || 'Document Analysis Notes'}</h1>
            <p>Generated on ${new Date().toLocaleDateString()}</p>
          </div>
          
          ${enhancedNotes.documentMetadata ? `
            <div class="metadata">
              <strong>Document Type:</strong> ${enhancedNotes.documentMetadata.documentType}<br>
              <strong>Category:</strong> ${enhancedNotes.documentMetadata.category}<br>
              <strong>Difficulty:</strong> ${enhancedNotes.documentMetadata.difficulty}
            </div>
          ` : ''}
          
          ${enhancedNotes.documentOverview ? `
            <div class="section">
              <div class="section-title">Overview</div>
              <p>${enhancedNotes.documentOverview.description}</p>
              ${enhancedNotes.documentOverview.mainPurpose ? `<p><strong>Purpose:</strong> ${enhancedNotes.documentOverview.mainPurpose}</p>` : ''}
            </div>
          ` : ''}
          
          ${enhancedNotes.keyTopicsCovered?.length ? `
            <div class="section">
              <div class="section-title">Key Topics Covered</div>
              <ul>
                ${enhancedNotes.keyTopicsCovered.map(topic => `<li>${topic}</li>`).join('')}
              </ul>
            </div>
          ` : ''}
          
          ${enhancedNotes.coreConceptsDefinitions?.length ? `
            <div class="section">
              <div class="section-title">Core Concepts & Definitions</div>
              ${enhancedNotes.coreConceptsDefinitions.map(concept => `
                <div class="concept">
                  <div class="concept-term">${concept.term}</div>
                  <p>${concept.definition}</p>
                  ${concept.importance ? `<p><em>Why it matters: ${concept.importance}</em></p>` : ''}
                </div>
              `).join('')}
            </div>
          ` : ''}
          
          ${enhancedNotes.keyTakeaways?.mainPoints?.length ? `
            <div class="section">
              <div class="section-title">Key Takeaways</div>
              <ul>
                ${enhancedNotes.keyTakeaways.mainPoints.map(point => `<li>${point}</li>`).join('')}
              </ul>
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

  // Action buttons for MaximizableOutput
  const actionButtons = (notes || enhancedNotes) ? (
    <>
      <button
        onClick={handleCopyNotes}
        className="p-2 bg-white/80 hover:bg-white text-gray-600 hover:text-gray-900 rounded-lg shadow-sm border border-gray-200 transition-all duration-200 hover:shadow-md"
        title="Copy Notes"
      >
        <Copy className="h-4 w-4" />
      </button>
      <button
        onClick={enhancedNotes ? handlePrintEnhanced : handlePrint}
        className="p-2 bg-white/80 hover:bg-white text-gray-600 hover:text-gray-900 rounded-lg shadow-sm border border-gray-200 transition-all duration-200 hover:shadow-md"
        title="Print Notes"
      >
        <Printer className="h-4 w-4" />
      </button>
      <button
        onClick={handleGenerateNewAnalysis}
        className="p-2 bg-white/80 hover:bg-white text-gray-600 hover:text-gray-900 rounded-lg shadow-sm border border-gray-200 transition-all duration-200 hover:shadow-md"
        title="Generate New Analysis"
      >
        <RefreshCw className="h-4 w-4" />
      </button>
    </>
  ) : null;

  return (
    <div className="min-h-screen py-8 sm:py-12 md:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-8">
            <div className="p-4 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-2xl shadow-lg">
              <FileText className="h-12 w-12 text-blue-600" />
            </div>
          </div>
          <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Document to <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Notes</span>
          </h1>
          <p className="text-xl sm:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-medium">
            Upload images or PDF documents and get comprehensive, structured notes with key insights and analysis using advanced AI technology
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Input Section */}
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Document Input</h2>
            
            {/* File Upload Section */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-700 mb-6">Upload Document</h3>
              <div className="flex items-center justify-center p-10 border-2 border-dashed border-gray-300 rounded-xl hover:border-blue-400 transition-colors duration-300">
                <div className="text-center">
                  {uploadedFile?.type === 'application/pdf' ? (
                    <File className="h-16 w-16 text-gray-400 mx-auto mb-6" />
                  ) : (
                    <Image className="h-16 w-16 text-gray-400 mx-auto mb-6" />
                  )}
                  <label className="cursor-pointer">
                    <span className="text-blue-600 hover:text-blue-700 font-semibold text-lg">
                      Choose document file
                    </span>
                    <input
                      type="file"
                      accept="image/*,.pdf"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                  <p className="text-lg text-gray-500 mt-3">
                    Images (PNG, JPG, JPEG) and PDF documents
                  </p>
                  {uploadedFile && (
                    <p className="text-lg text-blue-600 mt-3 font-medium">
                      Selected: {uploadedFile.name}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Document Preview */}
            {uploadedFile && (
              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-700 mb-4">Preview</h3>
                <div className="bg-gray-100 rounded-lg p-4 text-center">
                  {uploadedFile.type === 'application/pdf' ? (
                    <File className="h-16 w-16 text-gray-400 mx-auto mb-2" />
                  ) : (
                    <Image className="h-16 w-16 text-gray-400 mx-auto mb-2" />
                  )}
                  <p className="text-sm text-gray-600">
                    {uploadedFile.name}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {uploadedFile.type === 'application/pdf' ? 'PDF Document' : 'Image File'}
                  </p>
                </div>
              </div>
            )}

            {/* Progress Bar */}
            {isProcessing && (
              <div className="mb-4">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Processing document...</span>
                  <span>{progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {uploadedFile?.type === 'application/pdf' ? 'Analyzing PDF content...' : 'Processing image content...'}
                </p>
              </div>
            )}

            <button
              onClick={handleGenerateNotes}
              disabled={!uploadedFile || isProcessing}
              className="w-full mt-6 sm:mt-8 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg sm:rounded-xl hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 text-sm sm:text-base lg:text-lg font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              {isProcessing ? (
                <>
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                  Analyzing Document...
                </>
              ) : (
                <>
                  <Sparkles className="h-6 w-6 mr-3" />
                  {uploadedFile?.type === 'application/pdf' ? 'Generate Notes from PDF' : 'Generate Notes from Document'}
                </>
              )}
            </button>
          </div>

          {/* Output Section */}
          <MaximizableOutput 
            title="Document Analysis Notes" 
            actionButtons={actionButtons}
            className="bg-white rounded-2xl shadow-xl border border-slate-200 p-8">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Generated Notes</h2>
            </div>
            
            <div className="max-h-[800px] overflow-y-auto">
              {enhancedNotes ? (
                <EnhancedDocumentNotes notes={enhancedNotes} />
              ) : notes ? (
                <div className="space-y-6">
                  {/* Title and Summary */}
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                      <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full"></div>
                      {notes.title}
                    </h3>
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 mb-6 border-l-4 border-blue-500 shadow-sm">
                      <h4 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
                        <FileText className="h-5 w-5 text-blue-600" />
                        Executive Summary
                      </h4>
                      <p className="text-blue-800 leading-relaxed">{notes.summary}</p>
                    </div>
                  </div>

                  {/* Key Points */}
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border-l-4 border-green-500 shadow-sm">
                    <h4 className="font-semibold text-green-900 mb-4 flex items-center gap-2">
                      <Target className="h-5 w-5 text-green-600" />
                      Key Insights
                    </h4>
                    <ul className="space-y-3">
                      {notes.keyPoints.map((point, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
                            <CheckCircle className="h-4 w-4 text-green-600" />
                          </div>
                          <span className="text-green-800 leading-relaxed">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Sections */}
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <div className="w-6 h-6 bg-purple-100 rounded-lg flex items-center justify-center">
                        <FileText className="h-4 w-4 text-purple-600" />
                      </div>
                      Detailed Analysis
                    </h4>
                    <div className="space-y-4">
                      {notes.sections.map((section, index) => {
                        const colors = [
                          { bg: 'from-purple-50 to-violet-50', border: 'border-purple-400', text: 'text-purple-900', accent: 'text-purple-600' },
                          { bg: 'from-orange-50 to-amber-50', border: 'border-orange-400', text: 'text-orange-900', accent: 'text-orange-600' },
                          { bg: 'from-teal-50 to-cyan-50', border: 'border-teal-400', text: 'text-teal-900', accent: 'text-teal-600' },
                          { bg: 'from-rose-50 to-pink-50', border: 'border-rose-400', text: 'text-rose-900', accent: 'text-rose-600' },
                          { bg: 'from-indigo-50 to-blue-50', border: 'border-indigo-400', text: 'text-indigo-900', accent: 'text-indigo-600' },
                          { bg: 'from-emerald-50 to-green-50', border: 'border-emerald-400', text: 'text-emerald-900', accent: 'text-emerald-600' }
                        ];
                        const colorScheme = colors[index % colors.length];
                        
                        return (
                          <div key={section.id} className={`bg-gradient-to-r ${colorScheme.bg} rounded-xl p-6 border-l-4 ${colorScheme.border} shadow-sm`}>
                            <h5 className={`font-semibold text-lg mb-3 ${colorScheme.text} flex items-center gap-2`}>
                              <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${colorScheme.border.replace('border-', 'from-')} to-transparent`}></div>
                              {section.title}
                            </h5>
                            <div 
                              className={`${colorScheme.text} leading-relaxed prose prose-sm max-w-none`}
                              dangerouslySetInnerHTML={{ __html: section.content.replace(/\n/g, '<br>') }}
                            />
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Metadata */}
                  <div className="bg-gradient-to-r from-gray-50 to-slate-50 rounded-xl p-6 border-l-4 border-gray-400 shadow-sm">
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <div className="w-5 h-5 bg-gray-100 rounded flex items-center justify-center">
                        <FileText className="h-3 w-3 text-gray-600" />
                      </div>
                      Document Metadata
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-gray-700">File Type:</span>
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-md text-xs font-medium">
                          {notes.metadata.fileType}
                        </span>
                      </div>
                      {notes.metadata.pageCount && (
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-gray-700">Pages:</span>
                          <span className="px-2 py-1 bg-green-100 text-green-800 rounded-md text-xs font-medium">
                            {notes.metadata.pageCount}
                          </span>
                        </div>
                      )}
                      <div className="md:col-span-2">
                        <span className="font-medium text-gray-700">Extracted Elements:</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {notes.metadata.extractedElements.map((element, idx) => (
                            <span key={idx} className="px-2 py-1 bg-purple-100 text-purple-800 rounded-md text-xs font-medium">
                              {element}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-96 text-gray-500">
                  <div className="text-center">
                    <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Your document analysis notes will appear here</p>
                  </div>
                </div>
              )}
            </div>
          </MaximizableOutput>
        </div>

        {/* Features */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="text-center bg-white rounded-2xl p-8 shadow-lg border border-slate-200 hover:shadow-xl transition-shadow duration-300">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl shadow-lg">
                <FileText className="h-8 w-8 text-white" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Smart Analysis</h3>
            <p className="text-lg text-gray-600 leading-relaxed">Extracts key information from images and PDFs with advanced AI-powered analysis</p>
          </div>
          
          <div className="text-center bg-white rounded-2xl p-8 shadow-lg border border-slate-200 hover:shadow-xl transition-shadow duration-300">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl shadow-lg">
                <Sparkles className="h-8 w-8 text-white" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Structured Notes</h3>
            <p className="text-lg text-gray-600 leading-relaxed">Automatically organizes content into sections with key points and comprehensive summaries</p>
          </div>
          
          <div className="text-center bg-white rounded-2xl p-8 shadow-lg border border-slate-200 hover:shadow-xl transition-shadow duration-300">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl shadow-lg">
                <Upload className="h-8 w-8 text-white" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Multiple Formats</h3>
            <p className="text-lg text-gray-600 leading-relaxed">Supports various image formats and PDF documents for flexible input options</p>
          </div>
        </div>
      </div>
    </div>
  );
}
