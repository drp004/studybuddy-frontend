import { useState, useEffect } from 'react';
import { Sparkles, FileText, Presentation, CheckCircle, Clock, List, Play, X, ChevronLeft, ChevronRight, Expand, Minimize, Printer, Eye, Image } from 'lucide-react';
import { toast } from 'sonner';
import { MaximizableOutput } from '../components/MaximizableOutput';

// Utility function to remove markdown formatting
const cleanMarkdown = (text: string): string => {
  if (!text) return '';
  return text
    .replace(/\*\*(.*?)\*\*/g, '$1') // Remove **bold**
    .replace(/\*(.*?)\*/g, '$1')     // Remove *italic*
    .replace(/##\s*(.*?)$/gm, '$1') // Remove ## headers
    .replace(/#\s*(.*?)$/gm, '$1')  // Remove # headers
    .replace(/`(.*?)`/g, '$1')      // Remove `code`
    .replace(/\[(.*?)\]\(.*?\)/g, '$1') // Remove [links](url)
    .trim();
};

export function CreatePPT() {
  const [topic, setTopic] = useState('');
  const [tone, setTone] = useState('professional');
  const [maxSlides, setMaxSlides] = useState(10);
  const [presentationData, setPresentationData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showSlideViewer, setShowSlideViewer] = useState(false);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handleGeneratePresentation = async () => {
    if (!topic.trim()) return;
    
    setIsLoading(true);
    
    try {
      console.log('📤 Sending PPT generation request:', { topic, tone, maxSlides });
      
      const response = await fetch('/api/ai/generate-ppt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic, tone, maxSlides })
      });
      
      console.log('📥 Backend response status:', response.status);
      console.log('Response text:', response.text());
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ Backend error response:', errorText);
        throw new Error(`API request failed: ${response.status} - ${errorText}`);
      }
      
      const data = await response.json();
      console.log('📄 Backend response data:', data);
      
      if (data.success) {
        setPresentationData(data.data);
        
        if (data.fallback) {
          // Show warning for fallback mode
          console.warn('⚠️ Using fallback mode');
        }
      } else {
        throw new Error(data.message || 'Failed to generate presentation');
      }
    } catch (error: any) {
      console.error('❌ PPT generation error:', error);
      // Show error to user but don't break the UI
      toast.error(error.message || 'Failed to generate presentation. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Keyboard navigation for presentation mode
  useEffect(() => {
    if (!showSlideViewer || !presentationData) return;

    const handleKeyPress = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'Escape':
          setShowSlideViewer(false);
          setIsFullscreen(false);
          break;
        case 'ArrowLeft':
        case 'ArrowUp':
          event.preventDefault();
          setCurrentSlideIndex(prev => Math.max(0, prev - 1));
          break;
        case 'ArrowRight':
        case 'ArrowDown':
        case ' ': // Spacebar
          event.preventDefault();
          setCurrentSlideIndex(prev => Math.min(presentationData.slides.length - 1, prev + 1));
          break;
        case 'F11':
          event.preventDefault();
          setIsFullscreen(prev => !prev);
          break;
        case 'Home':
          event.preventDefault();
          setCurrentSlideIndex(0);
          break;
        case 'End':
          event.preventDefault();
          setCurrentSlideIndex(presentationData.slides.length - 1);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [showSlideViewer, presentationData, currentSlideIndex]);

  const handlePrint = () => {
    if (!presentationData) return;
    
    const printContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>${presentationData.title}</title>
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
              border-bottom: 3px solid #1e40af;
              padding: 40px;
              margin-bottom: 40px;
              background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
              border-radius: 16px;
              box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
            }
            .header h1 {
              color: #1e40af;
              margin: 0 0 10px 0;
              font-size: 3.2em;
              font-weight: 800;
              text-shadow: 0 2px 4px rgba(30, 64, 175, 0.1);
              letter-spacing: -0.02em;
            }
            .header .subtitle {
              color: #475569;
              font-size: 1.1em;
              font-weight: 500;
              margin-top: 8px;
            }
            .metadata {
              background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%);
              padding: 25px;
              border-radius: 12px;
              margin: 25px 0;
              display: grid;
              grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
              gap: 20px;
              border: 1px solid #cbd5e1;
              box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
            }
            .metadata-item {
              text-align: center;
              background: white;
              padding: 15px;
              border-radius: 8px;
              box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
            }
            .metadata-item strong {
              color: #1e40af;
              font-weight: 600;
            }
            .slide {
              margin: 40px 0;
              padding: 0;
              background: #ffffff;
              page-break-inside: avoid;
              border-radius: 16px;
              box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08);
              border: 1px solid #e2e8f0;
              overflow: hidden;
            }
            .slide-header {
              background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%);
              padding: 24px 32px;
              border-bottom: 3px solid #3b82f6;
            }
            .slide h3 {
              color: #1e40af;
              margin: 0;
              font-size: 1.8em;
              font-weight: 700;
              letter-spacing: -0.01em;
            }
            .slide-type {
              display: inline-block;
              background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%);
              color: #1e40af;
              padding: 6px 12px;
              border-radius: 6px;
              font-size: 0.85em;
              margin-bottom: 12px;
              font-weight: 500;
              border: 1px solid #93c5fd;
            }
            .slide-content {
              background: #ffffff;
              padding: 32px;
              white-space: pre-line;
              line-height: 1.8;
              font-size: 1.1em;
              color: #374151;
            }
            .slide-points {
              margin-top: 24px;
            }
            .slide-points h4 {
              color: #1e40af;
              font-size: 1.2em;
              font-weight: 600;
              margin-bottom: 16px;
              display: flex;
              align-items: center;
              gap: 8px;
            }
            .slide-points ul {
              list-style: none;
              padding: 0;
              margin: 0;
            }
            .slide-points li {
              background: #f8fafc;
              margin: 8px 0;
              padding: 12px 16px;
              border-radius: 8px;
              border-left: 4px solid #3b82f6;
              position: relative;
            }
            .slide-points li::before {
              content: counter(item);
              counter-increment: item;
              position: absolute;
              left: -20px;
              top: 50%;
              transform: translateY(-50%);
              background: #3b82f6;
              color: white;
              width: 24px;
              height: 24px;
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 0.8em;
              font-weight: bold;
            }
            .slide-points ul {
              counter-reset: item;
            }
            .stats {
              background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);
              padding: 25px;
              border-radius: 12px;
              margin: 25px 0;
              border: 1px solid #bfdbfe;
              box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
            }
            .stats h3 {
              color: #1e40af;
              margin-top: 0;
              font-weight: 600;
            }
            .stats-grid {
              display: grid;
              grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
              gap: 15px;
              margin-top: 15px;
            }
            .stat-item {
              text-align: center;
              padding: 10px;
              background: white;
              border-radius: 4px;
              border: 1px solid #e5e7eb;
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
              .slide { page-break-inside: avoid; }
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>${presentationData.title}</h1>
            <div class="subtitle">Professional Business Presentation</div>
            <p style="margin-top: 16px; color: #64748b; font-size: 0.95em;">Generated on ${new Date().toLocaleString()}</p>
          </div>
          
          <div class="metadata">
            <div class="metadata-item">
              <strong>Total Slides:</strong><br>${presentationData.totalSlides}
            </div>
            <div class="metadata-item">
              <strong>Theme:</strong><br>${presentationData.theme}
            </div>
            <div class="metadata-item">
              <strong>Duration:</strong><br>${presentationData.totalSlides * 2} minutes
            </div>
            <div class="metadata-item">
              <strong>Type:</strong><br>AI-Generated
            </div>
          </div>
          
          <div class="stats">
            <h3>Presentation Statistics</h3>
            <div class="stats-grid">
              <div class="stat-item">
                <strong>Total Slides</strong><br>${presentationData.totalSlides}
              </div>
              <div class="stat-item">
                <strong>Theme</strong><br>${presentationData.theme}
              </div>
              <div class="stat-item">
                <strong>Duration</strong><br>${presentationData.totalSlides * 2} min
              </div>
              <div class="stat-item">
                <strong>Content Type</strong><br>AI-Generated
              </div>
            </div>
          </div>
          
          ${presentationData.slides.map((slide: any) => `
            <div class="slide">
              <div class="slide-header">
                <div class="slide-type">${slide.type}</div>
                <h3>${slide.title}</h3>
              </div>
              <div class="slide-content">
                ${slide.content}
                ${slide.keyPoints ? `
                  <div class="slide-points">
                    <h4>🔑 Key Points</h4>
                    <ul>
                      ${slide.keyPoints.map((point: string) => `<li>${point}</li>`).join('')}
                    </ul>
                  </div>
                ` : ''}
                ${slide.examples ? `
                  <div class="slide-points">
                    <h4>💡 Examples</h4>
                    <ul>
                      ${slide.examples.map((example: string) => `<li>${example}</li>`).join('')}
                    </ul>
                  </div>
                ` : ''}
                ${slide.actionItems ? `
                  <div class="slide-points">
                    <h4>✅ Action Items</h4>
                    <ul>
                      ${slide.actionItems.map((item: string) => `<li>${item}</li>`).join('')}
                    </ul>
                  </div>
                ` : ''}
              </div>
            </div>
          `).join('')}
          
          <div class="footer">
            <p>Generated by NoteMate - AI-Powered Presentation Creator</p>
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


  return (
    <div className="min-h-screen py-4 sm:py-8 md:py-12 px-3 sm:px-4 md:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl shadow-lg">
              <Presentation className="h-10 w-10 text-blue-600" />
            </div>
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-6">Create Professional PPT</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Generate stunning, business-standard presentations with calm, professional aesthetics using AI-powered content creation
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
          {/* Input Section */}
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg border border-slate-200 p-4 sm:p-6 lg:p-8 hover:shadow-xl transition-shadow duration-300">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Presentation Topic</h2>
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="Enter your presentation topic (e.g., 'Machine Learning Fundamentals', 'Digital Marketing Strategy')..."
                className="w-full p-3 sm:p-4 border border-slate-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base lg:text-lg transition-all duration-200 bg-slate-50 hover:bg-white"
              />
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-700">Presentation Settings</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">Presentation Tone</label>
                  <select 
                    value={tone}
                    onChange={(e) => setTone(e.target.value)}
                    className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  >
                    <option value="professional">Professional</option>
                    <option value="casual">Casual</option>
                    <option value="academic">Academic</option>
                    <option value="creative">Creative</option>
                    <option value="technical">Technical</option>
                    <option value="business">Business</option>
                  </select>
                  <p className="text-xs text-gray-500 mt-1">Choose the tone that best fits your audience</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">Maximum Slides</label>
                  <select 
                    value={maxSlides}
                    onChange={(e) => setMaxSlides(parseInt(e.target.value))}
                    className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  >
                    <option value={5}>5 slides</option>
                    <option value={7}>7 slides</option>
                    <option value={10}>10 slides</option>
                  </select>
                  <p className="text-xs text-gray-500 mt-1">AI will generate up to this many slides</p>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-5 shadow-sm">
                <h4 className="text-sm font-semibold text-blue-800 mb-3 flex items-center gap-2">
                  <Sparkles className="h-4 w-4" />
                  AI-Powered Professional Design
                </h4>
                <p className="text-sm text-blue-700 leading-relaxed">
                  Our advanced AI creates visually appealing presentations with calm, professional aesthetics, 
                  structured content, and business-standard formatting tailored to your audience.
                </p>
              </div>
            </div>
            
            <button
              onClick={handleGeneratePresentation}
              disabled={!topic.trim() || isLoading}
              className="w-full mt-6 sm:mt-8 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg sm:rounded-xl hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 text-sm sm:text-base lg:text-lg font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                  Generating {tone} presentation...
                </>
              ) : (
                <>
                  <Sparkles className="h-6 w-6 mr-3" />
                  Generate AI Presentation
                </>
              )}
            </button>
          </div>

          {/* Output Section */}
          <MaximizableOutput title="Generated Presentation" className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Generated Presentation</h2>
              {presentationData && (
                <div className="flex space-x-2">
                  <button className="flex items-center text-sm text-blue-600 hover:text-blue-700">
                    <Eye className="h-4 w-4 mr-1" />
                    Preview
                  </button>
                  <button 
                    onClick={handlePrint}
                    className="flex items-center text-sm text-blue-600 hover:text-blue-700"
                  >
                    <Printer className="h-4 w-4 mr-1" />
                    Print
                  </button>
                </div>
              )}
            </div>
            
            <div className="max-h-[800px] overflow-y-auto">
              {presentationData ? (
                <div className="space-y-6">
                  {/* Presentation Header */}
                  <div className="bg-gradient-to-r from-slate-50 to-blue-50 rounded-xl p-8 border border-slate-200 shadow-sm">
                    <h3 className="text-3xl font-bold text-slate-800 mb-4">{presentationData.title}</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div className="flex items-center gap-2 bg-white p-3 rounded-lg border border-slate-200">
                        <Presentation className="h-5 w-5 text-blue-600" />
                        <div>
                          <div className="font-semibold text-slate-700">Total Slides</div>
                          <div className="text-blue-600 font-bold">{presentationData.totalSlides}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 bg-white p-3 rounded-lg border border-slate-200">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <div>
                          <div className="font-semibold text-slate-700">Theme</div>
                          <div className="text-green-600 font-bold capitalize">{presentationData.theme}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 bg-white p-3 rounded-lg border border-slate-200">
                        <Clock className="h-5 w-5 text-indigo-600" />
                        <div>
                          <div className="font-semibold text-slate-700">Duration</div>
                          <div className="text-indigo-600 font-bold">{presentationData.totalSlides * 2} min</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Slides Preview */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold text-xl flex items-center gap-2 text-slate-800">
                        <List className="h-6 w-6 text-blue-600" />
                        Presentation Slides ({presentationData.slides.length})
                      </h4>
                      <button
                        onClick={() => {
                          setCurrentSlideIndex(0);
                          setShowSlideViewer(true);
                        }}
                        className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg font-semibold"
                      >
                        <Play className="h-5 w-5" />
                        Start Presentation
                      </button>
                    </div>
                    
                    {/* Slide Grid Preview */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-1 2xl:grid-cols-2 gap-3 sm:gap-4 lg:gap-6">
                      {presentationData.slides.map((slide: any, index: number) => (
                        <div 
                          key={slide.id} 
                          className="bg-white border border-slate-200 rounded-xl overflow-hidden hover:shadow-lg hover:border-blue-300 transition-all duration-300 cursor-pointer group"
                          onClick={() => {
                            setCurrentSlideIndex(index);
                            setShowSlideViewer(true);
                          }}
                        >
                          <div className="bg-gradient-to-r from-slate-50 to-blue-50 px-5 py-4 border-b border-slate-200">
                            <div className="flex items-center justify-between mb-2">
                              <h5 className="font-semibold text-sm text-slate-800 group-hover:text-blue-700 transition-colors">
                                Slide {slide.id}: {cleanMarkdown(slide.title)}
                              </h5>
                              <div className="flex items-center gap-2">
                                {slide.hasImage && (
                                  <Image className="h-3 w-3 text-blue-600" />
                                )}
                                <span className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-medium">
                                  {slide.type}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="p-3 sm:p-4 lg:p-5">
                            <div className="bg-slate-50 p-3 sm:p-4 rounded-lg border border-slate-100">
                              {slide.hasImage && (
                                <div className="mb-3">
                                  <img 
                                    src={slide.imageUrl}
                                    alt={slide.title}
                                    className="w-full h-24 object-cover rounded-md"
                                    onError={(e) => {
                                      e.currentTarget.style.display = 'none';
                                    }}
                                  />
                                </div>
                              )}
                              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed line-clamp-3 sm:line-clamp-4">
                                {cleanMarkdown(slide.content).length > 150 ? cleanMarkdown(slide.content).substring(0, 150) + '...' : cleanMarkdown(slide.content)}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="border border-slate-200 rounded-xl p-6 bg-gradient-to-r from-slate-50 to-blue-50 shadow-sm">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold text-lg text-gray-900">Ready to Present</h4>
                      <div className="flex gap-2">
                        <button
                          onClick={handlePrint}
                          className="flex items-center gap-2 px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors text-sm font-medium"
                        >
                          <Printer className="h-4 w-4" />
                          Print
                        </button>
                        <button
                          onClick={() => {
                            setCurrentSlideIndex(0);
                            setShowSlideViewer(true);
                            setIsFullscreen(true);
                          }}
                          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg font-semibold"
                        >
                          <Play className="h-4 w-4" />
                          Full Screen Presentation
                        </button>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4 text-xs sm:text-sm">
                      <div className="text-center">
                        <span className="font-medium text-gray-700">Slides</span>
                        <p className="text-xl font-bold text-blue-600">{presentationData.totalSlides}</p>
                      </div>
                      <div className="text-center">
                        <span className="font-medium text-gray-700">Theme</span>
                        <p className="text-sm text-gray-600 capitalize">{presentationData.theme}</p>
                      </div>
                      <div className="text-center">
                        <span className="font-medium text-gray-700">Duration</span>
                        <p className="text-xl font-bold text-green-600">{presentationData.totalSlides * 2}m</p>
                      </div>
                      <div className="text-center">
                        <span className="font-medium text-gray-700">Type</span>
                        <p className="text-sm text-gray-600">AI-Generated</p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-96 text-gray-500">
                  <div className="text-center">
                    <Presentation className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Your generated presentation will appear here</p>
                  </div>
                </div>
              )}
            </div>
          </MaximizableOutput>
        </div>

        {/* Features */}
        <div className="mt-8 sm:mt-12 lg:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="p-2 sm:p-3 bg-blue-100 rounded-full">
                <Sparkles className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">AI-Powered Design</h3>
            <p className="text-sm sm:text-base text-gray-600">Automatically creates visually appealing slides with professional layouts</p>
          </div>
          
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-green-100 rounded-full">
                <FileText className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Content Optimization</h3>
            <p className="text-gray-600">Structures your notes into clear, engaging presentation content</p>
          </div>
          
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-purple-100 rounded-full">
                <Printer className="h-6 w-6 text-purple-600" />
              </div>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Print Ready</h3>
            <p className="text-gray-600">Print or save as PDF directly from your browser</p>
          </div>
        </div>

        {/* Slide Viewer Popup */}
        {showSlideViewer && presentationData && (
          <div className={`fixed inset-0 z-50 bg-black/90 flex items-center justify-center ${isFullscreen ? '' : 'p-2 sm:p-4'}`}>
            <div className={`${isFullscreen ? 'w-full h-full' : 'w-full h-full max-w-7xl max-h-[95vh]'} bg-white ${isFullscreen ? '' : 'rounded-lg sm:rounded-xl shadow-2xl'} flex flex-col`}>
              {/* Header */}
              <div className="flex items-center justify-between p-3 sm:p-4 border-b border-slate-200 bg-gradient-to-r from-slate-50 to-blue-50">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900">
                    Slide {currentSlideIndex + 1} of {presentationData.slides.length}
                  </h3>
                  <span className="text-xs sm:text-sm bg-blue-100 text-blue-700 px-2 sm:px-3 py-1 rounded-full font-medium w-fit">
                    {presentationData.slides[currentSlideIndex]?.type}
                  </span>
                </div>
                <div className="flex items-center gap-1 sm:gap-2">
                  <button
                    onClick={() => setCurrentSlideIndex(prev => Math.max(0, prev - 1))}
                    disabled={currentSlideIndex === 0}
                    className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    title="Previous Slide"
                  >
                    <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
                  </button>
                  <button
                    onClick={() => setCurrentSlideIndex(prev => Math.min(presentationData.slides.length - 1, prev + 1))}
                    disabled={currentSlideIndex === presentationData.slides.length - 1}
                    className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    title="Next Slide"
                  >
                    <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
                  </button>
                  <button
                    onClick={() => setIsFullscreen(!isFullscreen)}
                    className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
                    title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
                  >
                    {isFullscreen ? <Minimize className="h-4 w-4 sm:h-5 sm:w-5" /> : <Expand className="h-4 w-4 sm:h-5 sm:w-5" />}
                  </button>
                  <button
                    onClick={() => {
                      setShowSlideViewer(false);
                      setIsFullscreen(false);
                    }}
                    className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
                    title="Close Presentation"
                  >
                    <X className="h-4 w-4 sm:h-5 sm:w-5" />
                  </button>
                </div>
              </div>

              {/* Slide Content */}
              <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100 relative">
                {/* Responsive Slide Container */}
                <div className={`w-full h-full flex items-center justify-center ${
                  isFullscreen ? 'p-2 sm:p-4 md:p-6' : 'p-4 sm:p-6 md:p-8'
                }`}>
                  <div className="bg-white rounded-xl shadow-2xl border border-slate-300" style={{ 
                    width: isFullscreen ? '95vw' : '100%', 
                    height: isFullscreen ? '85vh' : '75vh',
                    aspectRatio: '16/9',
                    maxWidth: isFullscreen ? 'none' : '1100px',
                    maxHeight: isFullscreen ? 'none' : '620px'
                  }}>
                    <div className={`h-full flex flex-col overflow-hidden ${
                      isFullscreen ? 'p-2 sm:p-3 md:p-4 lg:p-6' : 'p-3 sm:p-4 md:p-5 lg:p-6'
                    }`}>
                      {/* Slide Header */}
                      <div className={`flex-shrink-0 border-b-3 border-blue-200 pb-3 sm:pb-4 mb-4 sm:mb-6 bg-gradient-to-r from-slate-50 to-blue-50 ${isFullscreen ? '-mx-2 sm:-mx-3 md:-mx-4 lg:-mx-6 -mt-2 sm:-mt-3 md:-mt-4 lg:-mt-6 px-2 sm:px-3 md:px-4 lg:px-6 pt-2 sm:pt-3 md:pt-4 lg:pt-6' : '-mx-3 sm:-mx-4 md:-mx-5 lg:-mx-6 -mt-3 sm:-mt-4 md:-mt-5 lg:-mt-6 px-3 sm:px-4 md:px-5 lg:px-6 pt-3 sm:pt-4 md:pt-5 lg:pt-6'} rounded-t-xl`}>
                        <h2 className={`font-bold text-slate-800 text-center leading-tight ${
                          isFullscreen 
                            ? 'text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl' 
                            : 'text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl'
                        }`}>
                          {cleanMarkdown(presentationData.slides[currentSlideIndex]?.title)}
                        </h2>
                        <div className="text-center mt-2">
                          <span className={`inline-block bg-blue-100 text-blue-700 px-2 sm:px-3 py-1 rounded-full font-medium ${
                            isFullscreen ? 'text-xs sm:text-sm' : 'text-xs'
                          }`}>
                            {presentationData.slides[currentSlideIndex]?.type}
                          </span>
                        </div>
                      </div>
                      
                      {/* Scrollable Content */}
                      <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-blue-300 scrollbar-track-blue-100">
                        <div className="space-y-4 sm:space-y-6">
                          {/* Main Content */}
                          {/* Slide Image */}
                          {presentationData.slides[currentSlideIndex]?.hasImage && (
                            <div className="mb-3 sm:mb-4">
                              <img 
                                src={presentationData.slides[currentSlideIndex]?.imageUrl}
                                alt={presentationData.slides[currentSlideIndex]?.title}
                                className={`w-full object-cover rounded-lg shadow-md ${
                                  isFullscreen 
                                    ? 'h-32 sm:h-48 md:h-64 lg:h-72 xl:h-80' 
                                    : 'h-28 sm:h-40 md:h-48 lg:h-56'
                                }`}
                                onError={(e) => {
                                  e.currentTarget.style.display = 'none';
                                }}
                              />
                            </div>
                          )}
                          
                          {/* Main Content */}
                          <div className={`text-slate-700 leading-relaxed whitespace-pre-line bg-slate-50 p-3 sm:p-4 rounded-lg border border-slate-200 ${
                            isFullscreen 
                              ? 'text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl' 
                              : 'text-xs sm:text-sm md:text-base lg:text-lg'
                          }`}>
                            {cleanMarkdown(presentationData.slides[currentSlideIndex]?.content)}
                          </div>
                          
                          {/* Key Points */}
                          {presentationData.slides[currentSlideIndex]?.keyPoints && (
                            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 sm:p-6 rounded-xl border border-blue-200 shadow-sm">
                              <h4 className={`font-bold text-blue-800 mb-4 flex items-center gap-3 ${
                                isFullscreen 
                                  ? 'text-base sm:text-lg md:text-xl' 
                                  : 'text-base sm:text-lg'
                              }`}>
                                <span className="bg-blue-100 p-2 rounded-lg text-blue-600">🔑</span> Key Points
                              </h4>
                              <ul className={`space-y-2 text-blue-700 ${
                                isFullscreen 
                                  ? 'text-sm sm:text-base md:text-lg' 
                                  : 'text-sm sm:text-base'
                              }`}>
                                {presentationData.slides[currentSlideIndex].keyPoints.map((point: string, index: number) => (
                                  <li key={index} className="flex items-start gap-3 leading-relaxed">
                                    <span className="bg-blue-200 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mt-0.5 flex-shrink-0">{index + 1}</span>
                                    <span>{point}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                          
                          {/* Examples */}
                          {presentationData.slides[currentSlideIndex]?.examples && (
                            <div className="bg-gradient-to-r from-emerald-50 to-green-50 p-4 sm:p-6 rounded-xl border border-emerald-200 shadow-sm">
                              <h4 className={`font-bold text-emerald-800 mb-4 flex items-center gap-3 ${
                                isFullscreen 
                                  ? 'text-base sm:text-lg md:text-xl' 
                                  : 'text-base sm:text-lg'
                              }`}>
                                <span className="bg-emerald-100 p-2 rounded-lg text-emerald-600">💡</span> Examples
                              </h4>
                              <div className={`space-y-3 text-emerald-700 ${
                                isFullscreen 
                                  ? 'text-sm sm:text-base md:text-lg' 
                                  : 'text-sm sm:text-base'
                              }`}>
                                {presentationData.slides[currentSlideIndex].examples.map((example: string, index: number) => (
                                  <div key={index} className="bg-white p-3 rounded-lg border border-emerald-100 leading-relaxed">
                                    <span className="font-semibold text-emerald-800">Example {index + 1}:</span> {example}
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                          
                          {/* Action Items */}
                          {presentationData.slides[currentSlideIndex]?.actionItems && (
                            <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-4 sm:p-6 rounded-xl border border-amber-200 shadow-sm">
                              <h4 className={`font-bold text-amber-800 mb-4 flex items-center gap-3 ${
                                isFullscreen 
                                  ? 'text-base sm:text-lg md:text-xl' 
                                  : 'text-base sm:text-lg'
                              }`}>
                                <span className="bg-amber-100 p-2 rounded-lg text-amber-600">✅</span> Action Items
                              </h4>
                              <ol className={`space-y-2 text-amber-700 ${
                                isFullscreen 
                                  ? 'text-sm sm:text-base md:text-lg' 
                                  : 'text-sm sm:text-base'
                              }`}>
                                {presentationData.slides[currentSlideIndex].actionItems.map((item: string, index: number) => (
                                  <li key={index} className="flex items-start gap-3 leading-relaxed">
                                    <span className="bg-amber-200 text-amber-800 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mt-0.5 flex-shrink-0">{index + 1}</span>
                                    <span>{item}</span>
                                  </li>
                                ))}
                              </ol>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Mobile-Friendly Fullscreen Toggle */}
                {isFullscreen && (
                  <div className="absolute top-2 right-2 sm:top-4 sm:right-4 z-10">
                    <button
                      onClick={() => setIsFullscreen(false)}
                      className="p-2 sm:p-3 bg-black bg-opacity-60 text-white rounded-full hover:bg-opacity-80 transition-all shadow-lg"
                      title="Exit Fullscreen (ESC)"
                    >
                      <Minimize className="h-4 w-4 sm:h-5 sm:w-5" />
                    </button>
                  </div>
                )}
              </div>

            </div>
          </div>
        )}
      </div>
    </div>
  );
}