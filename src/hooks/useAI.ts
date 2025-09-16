import { useState, useCallback } from 'react';
import aiService, { AIGenerateRequest, AIProcessTextRequest, AIResponse, AIStatusResponse } from '../api/ai';

interface UseAIState {
  loading: boolean;
  error: string | null;
  data: any | null;
  status: AIStatusResponse | null;
}

interface UseAI {
  state: UseAIState;
  generateContent: (request: AIGenerateRequest) => Promise<AIResponse>;
  processText: (request: AIProcessTextRequest) => Promise<AIResponse>;
  processAudio: (audioFile: File, message?: string) => Promise<AIResponse>;
  processImage: (imageFile: File, message?: string) => Promise<AIResponse>;
  processPDF: (pdfFile: File, message?: string) => Promise<AIResponse>;
  processYouTube: (videoLink: string, message?: string) => Promise<AIResponse>;
  generateRoadmap: (message: string) => Promise<AIResponse>;
  checkStatus: () => Promise<AIStatusResponse>;
  generateNotesFromText: (content: string, options?: Record<string, any>) => Promise<AIResponse>;
  generateNotesFromAudio: (audioFile: File, message?: string) => Promise<AIResponse>;
  generateNotesFromImage: (imageFile: File, message?: string) => Promise<AIResponse>;
  generateNotesFromPDF: (pdfFile: File, message?: string) => Promise<AIResponse>;
  generateNotesFromYouTube: (videoLink: string, message?: string) => Promise<AIResponse>;
  summarizeText: (content: string, options?: Record<string, any>) => Promise<AIResponse>;
  extractKeyPoints: (content: string, options?: Record<string, any>) => Promise<AIResponse>;
  generateQuestions: (content: string, options?: Record<string, any>) => Promise<AIResponse>;
  reset: () => void;
}

export const useAI = (): UseAI => {
  const [state, setState] = useState<UseAIState>({
    loading: false,
    error: null,
    data: null,
    status: null,
  });

  const setLoading = useCallback((loading: boolean) => {
    setState(prev => ({ ...prev, loading, error: loading ? null : prev.error }));
  }, []);

  const setError = useCallback((error: string) => {
    setState(prev => ({ ...prev, error, loading: false }));
  }, []);

  const setData = useCallback((data: any) => {
    setState(prev => ({ ...prev, data, loading: false, error: null }));
  }, []);

  const reset = useCallback(() => {
    setState({
      loading: false,
      error: null,
      data: null,
      status: null,
    });
  }, []);

  const generateContent = useCallback(async (request: AIGenerateRequest): Promise<AIResponse> => {
    setLoading(true);
    try {
      const response = await aiService.generateContent(request);
      setData(response.data);
      return response;
    } catch (error: any) {
      const errorMessage = error.message || 'Failed to generate content';
      setError(errorMessage);
      throw error;
    }
  }, [setLoading, setData, setError]);

  const processText = useCallback(async (request: AIProcessTextRequest): Promise<AIResponse> => {
    setLoading(true);
    try {
      const response = await aiService.processText(request);
      setData(response.data);
      return response;
    } catch (error: any) {
      const errorMessage = error.message || 'Failed to process text';
      setError(errorMessage);
      throw error;
    }
  }, [setLoading, setData, setError]);

  const processAudio = useCallback(async (audioFile: File, message?: string): Promise<AIResponse> => {
    setLoading(true);
    try {
      const response = await aiService.processAudio(audioFile, message);
      setData(response.data);
      return response;
    } catch (error: any) {
      const errorMessage = error.message || 'Failed to process audio';
      setError(errorMessage);
      throw error;
    }
  }, [setLoading, setData, setError]);

  const processImage = useCallback(async (imageFile: File, message?: string): Promise<AIResponse> => {
    setLoading(true);
    try {
      const response = await aiService.processImage(imageFile, message);
      setData(response.data);
      return response;
    } catch (error: any) {
      const errorMessage = error.message || 'Failed to process image';
      setError(errorMessage);
      throw error;
    }
  }, [setLoading, setData, setError]);

  const processPDF = useCallback(async (pdfFile: File, message?: string): Promise<AIResponse> => {
    setLoading(true);
    try {
      const response = await aiService.processPDF(pdfFile, message);
      setData(response.data);
      return response;
    } catch (error: any) {
      const errorMessage = error.message || 'Failed to process PDF';
      setError(errorMessage);
      throw error;
    }
  }, [setLoading, setData, setError]);

  const processYouTube = useCallback(async (videoLink: string, message?: string): Promise<AIResponse> => {
    setLoading(true);
    try {
      const response = await aiService.processYouTube({ message: message || `Generate notes from this video: ${videoLink}` });
      setData(response.data);
      return response;
    } catch (error: any) {
      const errorMessage = error.message || 'Failed to process YouTube video';
      setError(errorMessage);
      throw error;
    }
  }, [setLoading, setData, setError]);

  const generateRoadmap = useCallback(async (message: string): Promise<AIResponse> => {
    setLoading(true);
    try {
      const response = await aiService.generateRoadmap({ message });
      setData(response.data);
      return response;
    } catch (error: any) {
      const errorMessage = error.message || 'Failed to generate career roadmap';
      setError(errorMessage);
      throw error;
    }
  }, [setLoading, setData, setError]);

  const checkStatus = useCallback(async (): Promise<AIStatusResponse> => {
    try {
      const status = await aiService.getStatus();
      setState(prev => ({ ...prev, status }));
      return status;
    } catch (error: any) {
      const errorMessage = error.message || 'Failed to check AI service status';
      setError(errorMessage);
      throw error;
    }
  }, [setError]);

  const generateNotesFromText = useCallback(async (content: string, options?: Record<string, any>): Promise<AIResponse> => {
    return processText({ content, options });
  }, [processText]);

  const generateNotesFromAudio = useCallback(async (audioFile: File, message?: string): Promise<AIResponse> => {
    return processAudio(audioFile, message);
  }, [processAudio]);

  const generateNotesFromImage = useCallback(async (imageFile: File, message?: string): Promise<AIResponse> => {
    return processImage(imageFile, message);
  }, [processImage]);

  const generateNotesFromPDF = useCallback(async (pdfFile: File, message?: string): Promise<AIResponse> => {
    return processPDF(pdfFile, message);
  }, [processPDF]);

  const generateNotesFromYouTube = useCallback(async (videoLink: string, message?: string): Promise<AIResponse> => {
    return processYouTube(videoLink, message);
  }, [processYouTube]);

  const summarizeText = useCallback(async (content: string, options?: Record<string, any>): Promise<AIResponse> => {
    return generateContent({
      content,
      type: 'text',
      options: {
        task: 'summarize',
        ...options
      }
    });
  }, [generateContent]);

  const extractKeyPoints = useCallback(async (content: string, options?: Record<string, any>): Promise<AIResponse> => {
    return generateContent({
      content,
      type: 'text',
      options: {
        task: 'extract_key_points',
        ...options
      }
    });
  }, [generateContent]);

  const generateQuestions = useCallback(async (content: string, options?: Record<string, any>): Promise<AIResponse> => {
    return generateContent({
      content,
      type: 'text',
      options: {
        task: 'generate_questions',
        ...options
      }
    });
  }, [generateContent]);

  return {
    state,
    generateContent,
    processText,
    processAudio,
    processImage,
    processPDF,
    processYouTube,
    generateRoadmap,
    checkStatus,
    generateNotesFromText,
    generateNotesFromAudio,
    generateNotesFromImage,
    generateNotesFromPDF,
    generateNotesFromYouTube,
    summarizeText,
    extractKeyPoints,
    generateQuestions,
    reset,
  };
};
