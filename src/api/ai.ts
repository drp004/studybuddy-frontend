import apiClient from './client';

export interface AIGenerateRequest {
  content: string;
  type: 'text' | 'audio' | 'image' | 'video';
  options?: Record<string, any>;
}

export interface AIProcessTextRequest {
  content: string;
  options?: Record<string, any>;
}

export interface AIProcessFileRequest {
  message?: string;
  history?: any[];
}

export interface AIProcessYTRequest {
  message: string;
  history?: any[];
}

export interface AIRoadmapRequest {
  message: string;
  history?: any[];
}

export interface AIResponse {
  success: boolean;
  data: any;
  message: string;
  timestamp?: string;
}

export interface AIStatusResponse {
  success: boolean;
  status: 'connected' | 'disconnected';
  message?: string;
  data?: any;
}

class AIService {
  /**
   * Generate AI content
   */
  async generateContent(request: AIGenerateRequest): Promise<AIResponse> {
    try {
      const response = await apiClient.post('/ai/generate', request);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to generate content');
    }
  }

  /**
   * Process text content
   */
  async processText(request: AIProcessTextRequest): Promise<AIResponse> {
    try {
      const response = await apiClient.post('/ai/process-text', request);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to process text');
    }
  }

  /**
   * Process image file and generate notes
   */
  async processImage(imageFile: File, request?: AIProcessFileRequest): Promise<AIResponse> {
    try {
      const formData = new FormData();
      formData.append('image', imageFile);
      
      if (request?.message) {
        formData.append('message', request.message);
      }
      if (request?.history) {
        formData.append('history', JSON.stringify(request.history));
      }

      const response = await apiClient.post('/ai/process-image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to process image');
    }
  }

  /**
   * Process PDF file and generate notes
   */
  async processPDF(pdfFile: File, request?: AIProcessFileRequest): Promise<AIResponse> {
    try {
      const formData = new FormData();
      formData.append('pdf', pdfFile);
      
      if (request?.message) {
        formData.append('message', request.message);
      }
      if (request?.history) {
        formData.append('history', JSON.stringify(request.history));
      }

      const response = await apiClient.post('/ai/process-pdf', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to process PDF');
    }
  }

  /**
   * Process audio file and generate notes
   */
  async processAudio(audioFile: File, request?: AIProcessFileRequest): Promise<AIResponse> {
    try {
      const formData = new FormData();
      formData.append('audio', audioFile);
      
      if (request?.message) {
        formData.append('message', request.message);
      }
      if (request?.history) {
        formData.append('history', JSON.stringify(request.history));
      }

      const response = await apiClient.post('/ai/process-audio', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to process audio');
    }
  }

  /**
   * Process YouTube video and generate notes
   */
  async processYouTube(request: AIProcessYTRequest): Promise<AIResponse> {
    try {
      const response = await apiClient.post('/ai/process-yt', request);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to process YouTube video');
    }
  }

  /**
   * Generate career roadmap
   */
  async generateRoadmap(request: AIRoadmapRequest): Promise<AIResponse> {
    try {
      const response = await apiClient.post('/ai/roadmap', request);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to generate career roadmap');
    }
  }

  /**
   * Check AI service status
   */
  async getStatus(): Promise<AIStatusResponse> {
    try {
      const response = await apiClient.get('/ai/status');
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        status: 'disconnected',
        message: 'AI service is not available'
      };
    }
  }

  /**
   * Generate notes from text
   */
  async generateNotesFromText(content: string, options?: Record<string, any>): Promise<AIResponse> {
    return this.generateContent({
      content,
      type: 'text',
      options: {
        task: 'generate_notes',
        ...options
      }
    });
  }

  /**
   * Generate notes from image
   */
  async generateNotesFromImage(imageFile: File, message?: string): Promise<AIResponse> {
    return this.processImage(imageFile, { message });
  }

  /**
   * Generate notes from PDF
   */
  async generateNotesFromPDF(pdfFile: File, message?: string): Promise<AIResponse> {
    return this.processPDF(pdfFile, { message });
  }

  /**
   * Generate notes from audio
   */
  async generateNotesFromAudio(audioFile: File, message?: string): Promise<AIResponse> {
    return this.processAudio(audioFile, { message });
  }

  /**
   * Generate notes from YouTube video
   */
  async generateNotesFromYouTube(videoLink: string, message?: string): Promise<AIResponse> {
    const fullMessage = message || `I'm providing a YouTube video link, generate notes from this video; link: ${videoLink}`;
    return this.processYouTube({ message: fullMessage });
  }

  /**
   * Generate notes from audio (legacy method)
   */
  async generateNotesFromAudioLegacy(audioFile: File): Promise<AIResponse> {
    return this.processAudio(audioFile);
  }

  /**
   * Summarize text
   */
  async summarizeText(content: string, options?: Record<string, any>): Promise<AIResponse> {
    return this.generateContent({
      content,
      type: 'text',
      options: {
        task: 'summarize',
        ...options
      }
    });
  }

  /**
   * Extract key points from text
   */
  async extractKeyPoints(content: string, options?: Record<string, any>): Promise<AIResponse> {
    return this.generateContent({
      content,
      type: 'text',
      options: {
        task: 'extract_key_points',
        ...options
      }
    });
  }

  /**
   * Generate questions from text
   */
  async generateQuestions(content: string, options?: Record<string, any>): Promise<AIResponse> {
    return this.generateContent({
      content,
      type: 'text',
      options: {
        task: 'generate_questions',
        ...options
      }
    });
  }
}

const aiService = new AIService();
export default aiService;
