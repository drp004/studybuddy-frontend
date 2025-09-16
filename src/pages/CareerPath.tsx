import { useState } from 'react';
import { TrendingUp, User, Target, BookOpen, Briefcase, Award, ArrowRight, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

export function CareerPath() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    skills: '',
    interests: '',
    experience: '',
    goals: ''
  });
  const [careerRecommendations, setCareerRecommendations] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    try {
      const combinedMessage = `I'm a student/professional with the following background:\n\nSkills: ${formData.skills}\n\nInterests: ${formData.interests}\n\nExperience: ${formData.experience}\n\nCareer Goals: ${formData.goals}\n\nPlease provide a comprehensive career roadmap based on this information.`;
      console.log('📤 Sending request to backend with message:', combinedMessage);
      
      const response = await fetch('/api/ai/roadmap', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: combinedMessage, history: [] })
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
        const formattedResponse = formatCareerResponse(data.data);
        console.log('✅ Setting career recommendations:', formattedResponse);
        setCareerRecommendations(formattedResponse);
        
        // Show appropriate message based on response type
        if (data.fallback) {
          toast.warning('AI service temporarily unavailable. Showing fallback recommendations.');
        } else {
          toast.success('Career analysis completed successfully!');
        }
      } else {
        console.error('❌ Backend returned error:', data);
        throw new Error(data.message || 'Failed to generate career roadmap');
      }
    } catch (error: any) {
      console.error('❌ Career analysis error:', error);
      toast.error(error.message || 'Failed to analyze career path. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Function to format the API response into our UI structure
  const formatCareerResponse = (apiData: any) => {
    console.log('🔍 Raw API Response:', apiData);
    
    // Handle structured JSON response from enhanced API
    if (apiData && typeof apiData === 'object') {
      // Check if it's the new structured format
      if (apiData.careerRecommendation || apiData.skillsRequirements || apiData.learningPath) {
        return {
          structuredData: apiData,
          rawContent: JSON.stringify(apiData, null, 2),
          isStructured: true,
          processingInfo: apiData.processingInfo || null
        };
      }
      
      // Handle legacy format
      const content = apiData.generated_text || apiData.roadmap || apiData.response || 
                     apiData.message || apiData.content || apiData.text || 
                     apiData.result || apiData.answer || apiData.output || 
                     JSON.stringify(apiData);
      
      return {
        rawContent: content,
        isStructured: false,
        processingInfo: apiData.processingInfo || null
      };
    }
    
    // Handle string response
    const content = typeof apiData === 'string' ? apiData : JSON.stringify(apiData, null, 2);
    return {
      rawContent: content,
      isStructured: false
    };
  };



  // Intelligent content extraction functions with better chunking
  const extractCareerSection = (content: string) => {
    if (!content) return null;
    
    // Clean escape sequences and normalize content
    const cleanContent = content
      .replace(/\\n/g, '\n')
      .replace(/\\t/g, '\t')
      .replace(/\\r/g, '\r')
      .replace(/\n\s*\n/g, '\n\n')
      .trim();
    
    // Look for career path recommendation section
    if (cleanContent.includes('Career Path Recommendation:')) {
      const startIndex = cleanContent.indexOf('Career Path Recommendation:');
      const nextSectionIndex = cleanContent.indexOf('Skills & Requirements:');
      
      if (nextSectionIndex > startIndex) {
        const careerSection = cleanContent.substring(startIndex, nextSectionIndex).trim();
        return createContentChunk(careerSection, 400);
      }
    }
    
    // Fallback: look for career-related content
    const careerPatterns = [
      /(?:career|job|role|position|profession).*?(?=\n\n|\n[A-Z][a-z]|$)/is,
      /(?:you should|consider|pursue|aim for|become).*?(?=\n\n|\n[A-Z][a-z]|$)/is,
      /(?:recommended|suggested|ideal).*?(?=\n\n|\n[A-Z][a-z]|$)/is
    ];
    
    for (const pattern of careerPatterns) {
      const match = cleanContent.match(pattern);
      if (match && match[0].trim().length > 50) {
        return createContentChunk(match[0], 400);
      }
    }
    
    // Fallback: first meaningful paragraph
    const paragraphs = cleanContent.split('\n\n').filter(p => p.trim().length > 100);
    return paragraphs.length > 0 ? createContentChunk(paragraphs[0], 400) : null;
  };

  const extractSkillsSection = (content: string) => {
    if (!content) return null;
    
    const cleanContent = content
      .replace(/\\n/g, '\n')
      .replace(/\\t/g, '\t')
      .replace(/\\r/g, '\r')
      .replace(/\n\s*\n/g, '\n\n')
      .trim();
    
    // Look for skills & requirements section
    if (cleanContent.includes('Skills & Requirements:')) {
      const startIndex = cleanContent.indexOf('Skills & Requirements:');
      const nextSectionIndex = cleanContent.indexOf('Learning Path:');
      
      if (nextSectionIndex > startIndex) {
        const skillsSection = cleanContent.substring(startIndex, nextSectionIndex).trim();
        return createContentChunk(skillsSection, 500);
      }
    }
    
    // Fallback: look for skills-related content
    const skillsPatterns = [
      /(?:skills|competencies|requirements|capabilities|abilities).*?(?=\n\n|\n[A-Z][a-z]|$)/is,
      /(?:you need|required|essential|important).*?(?=\n\n|\n[A-Z][a-z]|$)/is,
      /(?:technical|soft skills|knowledge).*?(?=\n\n|\n[A-Z][a-z]|$)/is
    ];
    
    for (const pattern of skillsPatterns) {
      const match = cleanContent.match(pattern);
      if (match && match[0].trim().length > 50) {
        return createContentChunk(match[0], 500);
      }
    }
    
    return null;
  };

  const extractLearningSection = (content: string) => {
    if (!content) return null;
    
    const cleanContent = content
      .replace(/\\n/g, '\n')
      .replace(/\\t/g, '\t')
      .replace(/\\r/g, '\r')
      .replace(/\n\s*\n/g, '\n\n')
      .trim();
    
    // Look for learning path section
    if (cleanContent.includes('Learning Path:')) {
      const startIndex = cleanContent.indexOf('Learning Path:');
      const nextSectionIndex = cleanContent.indexOf('Timeline & Milestones:');
      
      if (nextSectionIndex > startIndex) {
        const learningSection = cleanContent.substring(startIndex, nextSectionIndex).trim();
        return createContentChunk(learningSection, 500);
      }
    }
    
    // Fallback: look for learning-related content
    const learningPatterns = [
      /(?:learning|education|development|training|courses).*?(?=\n\n|\n[A-Z][a-z]|$)/is,
      /(?:study|learn|acquire|develop).*?(?=\n\n|\n[A-Z][a-z]|$)/is,
      /(?:curriculum|syllabus|program).*?(?=\n\n|\n[A-Z][a-z]|$)/is
    ];
    
    for (const pattern of learningPatterns) {
      const match = cleanContent.match(pattern);
      if (match && match[0].trim().length > 50) {
        return createContentChunk(match[0], 500);
      }
    }
    
    return null;
  };

  const extractTimelineSection = (content: string) => {
    if (!content) return null;
    
    const cleanContent = content
      .replace(/\\n/g, '\n')
      .replace(/\\t/g, '\t')
      .replace(/\\r/g, '\r')
      .replace(/\n\s*\n/g, '\n\n')
      .trim();
    
    // Look for timeline & milestones section
    if (cleanContent.includes('Timeline & Milestones:')) {
      const startIndex = cleanContent.indexOf('Timeline & Milestones:');
      const nextSectionIndex = cleanContent.indexOf('Resources & Recommendations:');
      
      if (nextSectionIndex > startIndex) {
        const timelineSection = cleanContent.substring(startIndex, nextSectionIndex).trim();
        return createContentChunk(timelineSection, 600);
      }
    }
    
    // Fallback: look for timeline-related content
    const timelinePatterns = [
      /(?:timeline|duration|phases|stages|milestones).*?(?=\n\n|\n[A-Z][a-z]|$)/is,
      /(?:months|years|weeks|phases|goals).*?(?=\n\n|\n[A-Z][a-z]|$)/is,
      /(?:short-term|long-term|immediate|future).*?(?=\n\n|\n[A-Z][a-z]|$)/is
    ];
    
    for (const pattern of timelinePatterns) {
      const match = cleanContent.match(pattern);
      if (match && match[0].trim().length > 50) {
        return createContentChunk(match[0], 600);
      }
    }
    
    return null;
  };

  const extractResourcesSection = (content: string) => {
    if (!content) return null;
    
    const cleanContent = content
      .replace(/\\n/g, '\n')
      .replace(/\\t/g, '\t')
      .replace(/\\r/g, '\r')
      .replace(/\n\s*\n/g, '\n\n')
      .trim();
    
    // Look for resources & recommendations section
    if (cleanContent.includes('Resources & Recommendations:')) {
      const startIndex = cleanContent.indexOf('Resources & Recommendations:');
      const nextSectionIndex = cleanContent.indexOf('Additional Insights & Tips:');
      
      if (nextSectionIndex > startIndex) {
        const resourcesSection = cleanContent.substring(startIndex, nextSectionIndex).trim();
        return createContentChunk(resourcesSection, 500);
      }
    }
    
    // Fallback: look for resources-related content
    const resourcesPatterns = [
      /(?:resources|tools|platforms|websites|courses).*?(?=\n\n|\n[A-Z][a-z]|$)/is,
      /(?:recommended|suggested|useful).*?(?=\n\n|\n[A-Z][a-z]|$)/is,
      /(?:books|articles|videos|tutorials).*?(?=\n\n|\n[A-Z][a-z]|$)/is
    ];
    
    for (const pattern of resourcesPatterns) {
      const match = cleanContent.match(pattern);
      if (match && match[0].trim().length > 50) {
        return createContentChunk(match[0], 500);
      }
    }
    
    return null;
  };

  const extractAdditionalSection = (content: string) => {
    if (!content) return null;
    
    const cleanContent = content
      .replace(/\\n/g, '\n')
      .replace(/\\t/g, '\t')
      .replace(/\\r/g, '\r')
      .replace(/\n\s*\n/g, '\n\n')
      .trim();
    
    // Look for additional insights & tips section
    if (cleanContent.includes('Additional Insights & Tips:')) {
      const startIndex = cleanContent.indexOf('Additional Insights & Tips:');
      const insightsSection = cleanContent.substring(startIndex).trim();
      return createContentChunk(insightsSection, 500);
    }
    
    // Fallback: look for additional content
    const additionalPatterns = [
      /(?:tips|advice|insights|recommendations|suggestions).*?(?=\n\n|\n[A-Z][a-z]|$)/is,
      /(?:important|key|crucial|essential).*?(?=\n\n|\n[A-Z][a-z]|$)/is,
      /(?:remember|note|consider|keep in mind).*?(?=\n\n|\n[A-Z][a-z]|$)/is
    ];
    
    for (const pattern of additionalPatterns) {
      const match = cleanContent.match(pattern);
      if (match && match[0].trim().length > 50) {
        return createContentChunk(match[0], 500);
      }
    }
    
    return null;
  };

  // Create content chunks with smart truncation
  const createContentChunk = (content: string, maxLength: number) => {
    if (!content) return '';
    
    // Clean the content
    let cleanContent = content
      .replace(/\\n/g, '\n')
      .replace(/\\t/g, '\t')
      .replace(/\\r/g, '\r')
      .replace(/\n\s*\n/g, '\n\n')
      .replace(/\s+/g, ' ')
      .trim();
    
    // If content is short enough, return as is
    if (cleanContent.length <= maxLength) {
      return cleanContent;
    }
    
    // Find a good breaking point
    const sentences = cleanContent.split(/[.!?]+/).filter(s => s.trim().length > 0);
    let result = '';
    
    for (const sentence of sentences) {
      if ((result + sentence).length <= maxLength) {
        result += sentence + '. ';
      } else {
        break;
      }
    }
    
    // If we couldn't fit any complete sentences, truncate at word boundary
    if (!result) {
      const words = cleanContent.split(' ');
      for (const word of words) {
        if ((result + word + ' ').length <= maxLength) {
          result += word + ' ';
        } else {
          break;
        }
      }
      result = result.trim() + '...';
    }
    
    return result.trim();
  };



  const formatCompactContent = (content: string) => {
    if (!content) return null;
    
    // Clean escape sequences and normalize content
    const cleanContent = content
      .replace(/\\n/g, '\n')
      .replace(/\\t/g, '\t')
      .replace(/\\r/g, '\r')
      .replace(/\n\s*\n/g, '\n\n')
      .trim();
    
    // Split into paragraphs and format each one
    const paragraphs = cleanContent.split('\n\n').filter(p => p.trim().length > 0);
    
    if (paragraphs.length === 0) return null;
    
    return (
      <div className="space-y-3">
        {paragraphs.map((paragraph, index) => {
          // Check if paragraph contains bullet points or numbered lists
          if (paragraph.includes('•') || paragraph.includes('-') || paragraph.includes('*') || /^\d+\./.test(paragraph)) {
            const items = paragraph.split(/(?:•|-|\*|\d+\.)/).filter(item => item.trim().length > 0);
            return (
              <div key={index} className="space-y-2">
                <ul className="space-y-1">
                  {items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start text-sm leading-relaxed text-gray-700">
                      <span className="w-1.5 h-1.5 bg-pink-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                      <span>{item.trim()}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          }
          
          // Check if paragraph is a heading
          if (paragraph.length < 80 && (paragraph.includes(':') || /^[A-Z][^a-z]*$/.test(paragraph))) {
            return (
              <h4 key={index} className="text-base font-semibold text-gray-900 border-b border-pink-200 pb-1 mb-2">
                {paragraph}
              </h4>
            );
          }
          
          // Regular paragraph - limit length for compact display
          const displayText = paragraph.length > 300 ? paragraph.substring(0, 300) + '...' : paragraph;
          return (
            <p key={index} className="text-sm leading-relaxed text-gray-700">
              {displayText}
            </p>
          );
        })}
      </div>
    );
  };

  const createTimelineSteps = (content: string) => {
    if (!content) return null;

    // Clean escape sequences and normalize content
    const cleanContent = content
      .replace(/\\n/g, '\n')
      .replace(/\\t/g, '\t')
      .replace(/\\r/g, '\r')
      .replace(/\n\s*\n/g, '\n\n')
      .trim();

    // Extract timeline sections based on the structured content
    const timelineSections = [];
    
    // Look for specific timeline sections
    if (cleanContent.includes('Short-term Goals')) {
      const shortTermMatch = cleanContent.match(/Short-term Goals \(([^)]+)\): ([^]+?)(?=Medium-term Goals|Long-term Goals|$)/);
      if (shortTermMatch) {
        timelineSections.push({
          title: `Short-term Goals (${shortTermMatch[1]})`,
          content: shortTermMatch[2].trim(),
          type: 'short-term',
          icon: '🎯'
        });
      }
    }
    
    if (cleanContent.includes('Medium-term Goals')) {
      const mediumTermMatch = cleanContent.match(/Medium-term Goals \(([^)]+)\): ([^]+?)(?=Long-term Goals|$)/);
      if (mediumTermMatch) {
        timelineSections.push({
          title: `Medium-term Goals (${mediumTermMatch[1]})`,
          content: mediumTermMatch[2].trim(),
          type: 'medium-term',
          icon: '🚀'
        });
      }
    }
    
    if (cleanContent.includes('Long-term Goals')) {
      const longTermMatch = cleanContent.match(/Long-term Goals \(([^)]+)\): ([^]+?)(?=Resources|Additional|$)/);
      if (longTermMatch) {
        timelineSections.push({
          title: `Long-term Goals (${longTermMatch[1]})`,
          content: longTermMatch[2].trim(),
          type: 'long-term',
          icon: '🏆'
        });
      }
    }
    
    // If no structured sections found, create fallback sections
    if (timelineSections.length === 0) {
      const paragraphs = cleanContent.split('\n\n').filter(p => p.trim().length > 30);
      
      if (paragraphs.length === 0) {
        // Create default phases if no content
        timelineSections.push(
          {
            title: 'Phase 1: Foundation Building (0-6 months)',
            content: 'Focus on building fundamental skills and knowledge in your chosen field. Start with basic concepts and gradually progress to more advanced topics.',
            type: 'short-term',
            icon: '🎯'
          },
          {
            title: 'Phase 2: Skill Development (6-18 months)',
            content: 'Develop specialized skills and gain practical experience through projects, internships, or entry-level positions. Build a portfolio showcasing your abilities.',
            type: 'medium-term',
            icon: '🚀'
          }
        );
      } else {
        // Use existing content and ensure minimum 2 phases
        const phases = Math.max(2, Math.min(3, paragraphs.length));
        
        for (let i = 0; i < phases; i++) {
          const content = paragraphs[i] || paragraphs[paragraphs.length - 1];
          timelineSections.push({
            title: `Phase ${i + 1}: ${i === 0 ? 'Foundation (0-6 months)' : i === 1 ? 'Development (6-18 months)' : 'Mastery (18+ months)'}`,
            content: content.trim(),
            type: i === 0 ? 'short-term' : i === 1 ? 'medium-term' : 'long-term',
            icon: i === 0 ? '🎯' : i === 1 ? '🚀' : '🏆'
          });
        }
      }
    }
    
    // Ensure minimum 2 phases even if structured sections were found
    if (timelineSections.length === 1) {
      timelineSections.push({
        title: 'Phase 2: Advanced Development (6+ months)',
        content: 'Continue building on your foundation with advanced skills, real-world projects, and professional networking opportunities.',
        type: 'medium-term',
        icon: '🚀'
      });
    }

    // Color scheme based on timeline type
    const colorScheme: Record<string, { bg: string; border: string; text: string; accent: string }> = {
      'short-term': { bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-800', accent: 'bg-green-500' },
      'medium-term': { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-800', accent: 'bg-blue-500' },
      'long-term': { bg: 'bg-purple-50', border: 'border-purple-200', text: 'text-purple-800', accent: 'bg-purple-500' }
    };

    return (
      <div className="space-y-6">
        {timelineSections.map((section, index) => {
          const colors = colorScheme[section.type] || colorScheme['short-term'];
          
          return (
            <div key={index} className={`border ${colors.border} rounded-xl ${colors.bg} p-4 sm:p-6 hover:shadow-lg transition-all duration-200`}>
              <div className="flex items-start">
                <div className="relative flex-shrink-0 mr-4">
                  <div className={`w-12 h-12 ${colors.accent} rounded-full flex items-center justify-center text-white text-lg font-bold shadow-md`}>
                    {section.icon}
                  </div>
                  {index < timelineSections.length - 1 && (
                    <div className="absolute top-12 left-6 w-0.5 h-12 bg-gray-300"></div>
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <h4 className={`text-lg font-bold ${colors.text} mb-3`}>
                    {section.title}
                  </h4>
                  <div className="text-gray-700 leading-relaxed">
                    {formatCompactContent(section.content)}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const steps = [
    { id: 1, title: "Skills Assessment", icon: User },
    { id: 2, title: "Interest Analysis", icon: Target },
    { id: 3, title: "Experience Review", icon: Briefcase },
    { id: 4, title: "Goal Setting", icon: Award }
  ];

  return (
    <div className="min-h-screen py-8 sm:py-12 md:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-8">
            <div className="p-4 bg-gradient-to-r from-pink-100 to-purple-100 rounded-2xl shadow-lg">
              <TrendingUp className="h-12 w-12 text-pink-600" />
            </div>
          </div>
          <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Career Path <span className="bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">Guidance</span>
          </h1>
          <p className="text-xl sm:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-medium">
            Get personalized career recommendations based on your skills, interests, and goals using advanced AI analysis
          </p>
        </div>


        {/* Multi-step form */}
        {!careerRecommendations ? (
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-8 sm:p-10 md:p-12">
            {/* Progress Steps */}
            <div className="flex justify-center mb-12 sm:mb-16 overflow-x-auto">
              <div className="flex items-center space-x-4 sm:space-x-6 min-w-max px-4">
                {steps.map((step, index) => (
                  <div key={step.id} className="flex items-center">
                    <div className={`flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-xl transition-all duration-300 ${
                      currentStep >= step.id ? 'bg-pink-600 text-white' : 'bg-gray-200 text-gray-600'
                    }`}>
                      <step.icon className="h-6 w-6 sm:h-7 sm:w-7" />
                    </div>
                    {index < steps.length - 1 && (
                      <div className={`w-12 sm:w-20 h-1 transition-colors duration-300 ${
                        currentStep > step.id ? 'bg-pink-600' : 'bg-gray-200'
                      }`} />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Form Steps */}
            <div className="max-w-3xl mx-auto px-2 sm:px-0">
              {currentStep === 1 && (
                <div>
                  <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6 sm:mb-8">What are your key skills?</h2>
                  <textarea
                    value={formData.skills}
                    onChange={(e) => handleInputChange('skills', e.target.value)}
                    placeholder="List your technical skills, soft skills, certifications, and areas of expertise..."
                    className="w-full h-36 sm:h-40 p-6 text-lg border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-pink-100 focus:border-pink-500 transition-all duration-300 bg-gray-50 placeholder-gray-500 leading-relaxed"
                  />
                </div>
              )}

              {currentStep === 2 && (
                <div>
                  <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6 sm:mb-8">What interests you most?</h2>
                  <textarea
                    value={formData.interests}
                    onChange={(e) => handleInputChange('interests', e.target.value)}
                    placeholder="Describe your passions, hobbies, and what motivates you professionally..."
                    className="w-full h-36 sm:h-40 p-6 text-lg border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-pink-100 focus:border-pink-500 transition-all duration-300 bg-gray-50 placeholder-gray-500 leading-relaxed"
                  />
                </div>
              )}

              {currentStep === 3 && (
                <div>
                  <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6 sm:mb-8">Tell us about your experience</h2>
                  <textarea
                    value={formData.experience}
                    onChange={(e) => handleInputChange('experience', e.target.value)}
                    placeholder="Share your work experience, projects, achievements, and relevant background..."
                    className="w-full h-36 sm:h-40 p-6 text-lg border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-pink-100 focus:border-pink-500 transition-all duration-300 bg-gray-50 placeholder-gray-500 leading-relaxed"
                  />
                </div>
              )}

              {currentStep === 4 && (
                <div>
                  <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6 sm:mb-8">What are your career goals?</h2>
                  <textarea
                    value={formData.goals}
                    onChange={(e) => handleInputChange('goals', e.target.value)}
                    placeholder="Describe your short-term and long-term career aspirations, desired work environment, and success metrics..."
                    className="w-full h-36 sm:h-40 p-6 text-lg border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-pink-100 focus:border-pink-500 transition-all duration-300 bg-gray-50 placeholder-gray-500 leading-relaxed"
                  />
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex flex-col sm:flex-row justify-between gap-6 mt-12 sm:mt-16">
                <button
                  onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                  disabled={currentStep === 1}
                  className="w-full sm:w-auto px-8 py-4 border-2 border-gray-300 text-gray-700 font-semibold text-lg rounded-xl hover:bg-gray-50 hover:border-gray-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                >
                  Previous
                </button>
                
                {currentStep < 4 ? (
                  <button
                    onClick={() => setCurrentStep(Math.min(4, currentStep + 1))}
                    className="w-full sm:w-auto px-8 py-4 bg-pink-600 text-white font-semibold text-lg rounded-xl hover:bg-pink-700 transition-colors duration-300 shadow-lg hover:shadow-xl"
                  >
                    Next
                  </button>
                ) : (
                  <button
                    onClick={handleAnalyze}
                    disabled={isAnalyzing || !Object.values(formData).every(value => value.trim())}
                    className="w-full sm:w-auto flex items-center justify-center px-8 py-4 bg-pink-600 text-white font-semibold text-lg rounded-xl hover:bg-pink-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300 shadow-lg hover:shadow-xl"
                  >
                    {isAnalyzing ? (
                      <>
                        <Loader2 className="animate-spin h-5 w-5 mr-3" />
                        <span>Analyzing Career Path...</span>
                      </>
                    ) : (
                      <>
                        <span>Analyze Career Path</span>
                        <ArrowRight className="ml-3 h-5 w-5" />
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6">

            {/* Dynamic Content Display */}
            {careerRecommendations && (
              careerRecommendations.isStructured ? (
                /* Enhanced Structured Display */
                <div className="space-y-6">
                  {/* Career Recommendation */}
                  {careerRecommendations.structuredData?.careerRecommendation && (
                    <div className="bg-white rounded-xl shadow-md border border-gray-200 p-4 sm:p-6">
                      <div className="flex items-center mb-4">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                          <TrendingUp className="h-5 w-5 text-blue-600" />
                        </div>
                        <h4 className="text-lg font-semibold text-gray-900">{careerRecommendations.structuredData.careerRecommendation.title}</h4>
                      </div>
                      <p className="text-gray-700 mb-4">{careerRecommendations.structuredData.careerRecommendation.description}</p>
                      {careerRecommendations.structuredData.careerRecommendation.reasoning && (
                        <div className="mb-4">
                          <h5 className="font-semibold text-gray-800 mb-2">Why This Path:</h5>
                          <ul className="list-disc list-inside space-y-1 text-gray-700">
                            {careerRecommendations.structuredData.careerRecommendation.reasoning.map((reason: string, idx: number) => (
                              <li key={idx}>{reason}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {careerRecommendations.structuredData.careerRecommendation.salaryRange && (
                          <div className="bg-green-50 p-3 rounded-lg">
                            <span className="font-semibold text-green-800">💰 Salary Range:</span>
                            <p className="text-green-700">{careerRecommendations.structuredData.careerRecommendation.salaryRange}</p>
                          </div>
                        )}
                        {careerRecommendations.structuredData.careerRecommendation.jobOutlook && (
                          <div className="bg-blue-50 p-3 rounded-lg">
                            <span className="font-semibold text-blue-800">📈 Job Outlook:</span>
                            <p className="text-blue-700">{careerRecommendations.structuredData.careerRecommendation.jobOutlook}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Skills & Requirements */}
                  {careerRecommendations.structuredData?.skillsRequirements && (
                    <div className="bg-white rounded-xl shadow-md border border-gray-200 p-4 sm:p-6">
                      <div className="flex items-center mb-4">
                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                          <BookOpen className="h-5 w-5 text-green-600" />
                        </div>
                        <h4 className="text-lg font-semibold text-gray-900">🛠️ Skills & Requirements</h4>
                      </div>
                      {careerRecommendations.structuredData.skillsRequirements.technicalSkills && (
                        <div className="mb-4">
                          <h5 className="font-semibold text-gray-800 mb-3">Technical Skills:</h5>
                          <div className="grid gap-3">
                            {careerRecommendations.structuredData.skillsRequirements.technicalSkills.slice(0, 3).map((skill: any, idx: number) => (
                              <div key={idx} className="border border-gray-100 rounded-lg p-3">
                                <div className="flex items-center justify-between mb-2">
                                  <span className="font-medium text-gray-800">{skill.skill}</span>
                                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                    skill.importance === 'High' ? 'bg-red-100 text-red-800' :
                                    skill.importance === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                                    'bg-green-100 text-green-800'
                                  }`}>
                                    {skill.importance}
                                  </span>
                                </div>
                                <p className="text-gray-600 text-sm">{skill.description}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Learning Path */}
                  {careerRecommendations.structuredData?.learningPath && (
                    <div className="bg-white rounded-xl shadow-md border border-gray-200 p-4 sm:p-6">
                      <div className="flex items-center mb-4">
                        <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center mr-3">
                          <Target className="h-5 w-5 text-yellow-600" />
                        </div>
                        <h4 className="text-lg font-semibold text-gray-900">📚 Learning Path</h4>
                      </div>
                      <div className="space-y-4">
                        {['beginner', 'intermediate', 'advanced'].map((level) => {
                          const levelData = careerRecommendations.structuredData.learningPath[level];
                          if (!levelData) return null;
                          return (
                            <div key={level} className="border border-gray-100 rounded-lg p-4">
                              <div className="flex items-center justify-between mb-2">
                                <h5 className="font-semibold text-gray-800 capitalize">{level} Level</h5>
                                <span className="text-sm text-gray-600">{levelData.duration}</span>
                              </div>
                              <p className="text-gray-700 mb-2">{levelData.focus}</p>
                              <div className="text-sm text-gray-600">
                                <strong>Topics:</strong> {levelData.topics?.slice(0, 2).join(', ')}...
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                /* Legacy Display with Colored Containers */
                <div className="space-y-6">
                  {/* Career Path Card */}
                  {extractCareerSection(careerRecommendations.rawContent) && (
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-500 rounded-xl shadow-md p-4 sm:p-6 hover:shadow-lg transition-all duration-200">
                      <div className="flex items-center mb-3 sm:mb-4">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-500 rounded-full flex items-center justify-center mr-2 sm:mr-3 shadow-md">
                          <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                        </div>
                        <h3 className="text-lg sm:text-xl font-bold text-blue-900">🎯 Career Path Recommendation</h3>
                      </div>
                      <div className="text-blue-800 leading-relaxed bg-white/50 rounded-lg p-4">
                        {formatCompactContent(extractCareerSection(careerRecommendations.rawContent) || '')}
                      </div>
                    </div>
                  )}

                  {/* Skills & Requirements Card */}
                  {extractSkillsSection(careerRecommendations.rawContent) && (
                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-l-4 border-green-500 rounded-xl shadow-md p-4 sm:p-6 hover:shadow-lg transition-all duration-200">
                      <div className="flex items-center mb-3 sm:mb-4">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-500 rounded-full flex items-center justify-center mr-2 sm:mr-3 shadow-md">
                          <User className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                        </div>
                        <h3 className="text-lg sm:text-xl font-bold text-green-900">🛠️ Skills & Requirements</h3>
                      </div>
                      <div className="text-green-800 leading-relaxed bg-white/50 rounded-lg p-4">
                        {formatCompactContent(extractSkillsSection(careerRecommendations.rawContent) || '')}
                      </div>
                    </div>
                  )}

                  {/* Learning Path Card */}
                  {extractLearningSection(careerRecommendations.rawContent) && (
                    <div className="bg-gradient-to-r from-purple-50 to-violet-50 border-l-4 border-purple-500 rounded-xl shadow-md p-4 sm:p-6 hover:shadow-lg transition-all duration-200">
                      <div className="flex items-center mb-3 sm:mb-4">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-purple-500 rounded-full flex items-center justify-center mr-2 sm:mr-3 shadow-md">
                          <BookOpen className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                        </div>
                        <h3 className="text-lg sm:text-xl font-bold text-purple-900">📚 Learning Path</h3>
                      </div>
                      <div className="text-purple-800 leading-relaxed bg-white/50 rounded-lg p-4">
                        {formatCompactContent(extractLearningSection(careerRecommendations.rawContent) || '')}
                      </div>
                    </div>
                  )}

                  {/* Timeline Card */}
                  {extractTimelineSection(careerRecommendations.rawContent) && (
                    <div className="bg-gradient-to-r from-orange-50 to-amber-50 border-l-4 border-orange-500 rounded-xl shadow-md p-4 sm:p-6 hover:shadow-lg transition-all duration-200">
                      <div className="flex items-center mb-3 sm:mb-4">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-orange-500 rounded-full flex items-center justify-center mr-2 sm:mr-3 shadow-md">
                          <Target className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                        </div>
                        <h3 className="text-lg sm:text-xl font-bold text-orange-900">⏰ Career Timeline</h3>
                      </div>
                      <div className="text-orange-800 leading-relaxed bg-white/50 rounded-lg p-4">
                        {formatCompactContent(extractTimelineSection(careerRecommendations.rawContent) || '')}
                      </div>
                    </div>
                  )}
              </div>
            )
            )}

            {/* Timeline Visualization */}
            {careerRecommendations && extractTimelineSection(careerRecommendations.rawContent) && (
              <div className="bg-white rounded-xl shadow-md border border-gray-200 p-4 sm:p-6">
                <div className="flex items-center mb-4 sm:mb-6">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-indigo-100 rounded-full flex items-center justify-center mr-2 sm:mr-3">
                    <Target className="h-4 w-4 sm:h-5 sm:w-5 text-indigo-600" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900">Career Journey Timeline</h3>
                </div>
                <div className="relative">
                  {createTimelineSteps(extractTimelineSection(careerRecommendations.rawContent) || '')}
                </div>
              </div>
            )}

            {/* Resources & Additional Insights in Accordion */}
            {careerRecommendations && (
              <div className="bg-white rounded-xl shadow-md border border-gray-200 p-4 sm:p-6">
                <div className="flex items-center mb-4 sm:mb-6">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-teal-100 rounded-full flex items-center justify-center mr-2 sm:mr-3">
                    <Award className="h-4 w-4 sm:h-5 sm:w-5 text-teal-600" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900">Resources & Insights</h3>
                </div>
                <div className="space-y-6">
                  {/* Resources Section */}
                  {extractResourcesSection(careerRecommendations.rawContent) && (
                    <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 sm:p-6 hover:shadow-lg transition-all duration-200">
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mr-4">
                          <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-white text-lg font-bold shadow-md">
                            📚
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-lg font-bold text-orange-800 mb-3">Recommended Resources & Tools</h4>
                          <div className="text-gray-700 leading-relaxed">
                            {formatCompactContent(extractResourcesSection(careerRecommendations.rawContent) || '')}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Additional Insights Section */}
                  {extractAdditionalSection(careerRecommendations.rawContent) && (
                    <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-4 sm:p-6 hover:shadow-lg transition-all duration-200">
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mr-4">
                          <div className="w-12 h-12 bg-indigo-500 rounded-full flex items-center justify-center text-white text-lg font-bold shadow-md">
                            💡
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-lg font-bold text-indigo-800 mb-3">Additional Insights & Tips</h4>
                          <div className="text-gray-700 leading-relaxed">
                            {formatCompactContent(extractAdditionalSection(careerRecommendations.rawContent) || '')}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="text-center space-y-4">
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <button
                  onClick={() => {
                    setCareerRecommendations(null);
                    setFormData({ skills: '', interests: '', experience: '', goals: '' });
                    setCurrentStep(1);
                  }}
                  className="w-full sm:w-auto px-6 sm:px-8 py-3 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors font-medium text-sm sm:text-base"
                >
                  Generate New Analysis
                </button>
                
                <button
                  onClick={() => window.print()}
                  className="w-full sm:w-auto px-4 sm:px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium text-sm sm:text-base"
                >
                  📄 Print Roadmap
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}