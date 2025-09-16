import apiClient from './client';

export interface GenerateNotesRequest {
  text?: string;
  audioFile?: File;
  videoFile?: File;
  type: 'text' | 'audio' | 'video';
}

export interface GenerateNotesResponse {
  id: string;
  content: string;
  summary: string;
  keyPoints: string[];
  createdAt: string;
  type: 'text' | 'audio' | 'video';
}

export interface CreatePPTRequest {
  notesId: string;
  title: string;
  template?: string;
}

export interface CreatePPTResponse {
  id: string;
  downloadUrl: string;
  slides: number;
}

export const notesApi = {
  // Generate notes from text
  generateFromText: async (text: string): Promise<GenerateNotesResponse> => {
    const response = await apiClient.post('/notes/text', { text });
    return response.data;
  },

  // Generate notes from audio
  generateFromAudio: async (audioFile: File): Promise<GenerateNotesResponse> => {
    const formData = new FormData();
    formData.append('audio', audioFile);
    
    const response = await apiClient.post('/notes/audio', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // Generate notes from video
  generateFromVideo: async (videoFile: File): Promise<GenerateNotesResponse> => {
    const formData = new FormData();
    formData.append('video', videoFile);
    
    const response = await apiClient.post('/notes/video', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // Get all notes for user
  getAllNotes: async (): Promise<GenerateNotesResponse[]> => {
    const response = await apiClient.get('/notes');
    return response.data;
  },

  // Get specific note
  getNote: async (id: string): Promise<GenerateNotesResponse> => {
    const response = await apiClient.get(`/notes/${id}`);
    return response.data;
  },

  // Delete note
  deleteNote: async (id: string): Promise<void> => {
    await apiClient.delete(`/notes/${id}`);
  },

  // Create PPT from notes
  createPPT: async (request: CreatePPTRequest): Promise<CreatePPTResponse> => {
    const response = await apiClient.post('/notes/create-ppt', request);
    return response.data;
  },
}; 