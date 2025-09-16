import { create } from 'zustand';
import { notesApi, GenerateNotesResponse } from '@/api/notes';

interface NotesState {
  notes: GenerateNotesResponse[];
  currentNote: GenerateNotesResponse | null;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setCurrentNote: (note: GenerateNotesResponse | null) => void;
  
  // CRUD operations
  generateFromText: (text: string) => Promise<void>;
  generateFromAudio: (audioFile: File) => Promise<void>;
  generateFromVideo: (videoFile: File) => Promise<void>;
  fetchAllNotes: () => Promise<void>;
  fetchNote: (id: string) => Promise<void>;
  deleteNote: (id: string) => Promise<void>;
  clearNotes: () => void;
}

export const useNotesStore = create<NotesState>((set, get) => ({
  notes: [],
  currentNote: null,
  isLoading: false,
  error: null,

  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),
  setCurrentNote: (note) => set({ currentNote: note }),

  generateFromText: async (text: string) => {
    try {
      set({ isLoading: true, error: null });
      const newNote = await notesApi.generateFromText(text);
      set((state) => ({
        notes: [newNote, ...state.notes],
        currentNote: newNote,
        isLoading: false,
      }));
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to generate notes',
        isLoading: false 
      });
    }
  },

  generateFromAudio: async (audioFile: File) => {
    try {
      set({ isLoading: true, error: null });
      const newNote = await notesApi.generateFromAudio(audioFile);
      set((state) => ({
        notes: [newNote, ...state.notes],
        currentNote: newNote,
        isLoading: false,
      }));
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to generate notes from audio',
        isLoading: false 
      });
    }
  },

  generateFromVideo: async (videoFile: File) => {
    try {
      set({ isLoading: true, error: null });
      const newNote = await notesApi.generateFromVideo(videoFile);
      set((state) => ({
        notes: [newNote, ...state.notes],
        currentNote: newNote,
        isLoading: false,
      }));
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to generate notes from video',
        isLoading: false 
      });
    }
  },

  fetchAllNotes: async () => {
    try {
      set({ isLoading: true, error: null });
      const notes = await notesApi.getAllNotes();
      set({ notes, isLoading: false });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to fetch notes',
        isLoading: false 
      });
    }
  },

  fetchNote: async (id: string) => {
    try {
      set({ isLoading: true, error: null });
      const note = await notesApi.getNote(id);
      set({ currentNote: note, isLoading: false });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to fetch note',
        isLoading: false 
      });
    }
  },

  deleteNote: async (id: string) => {
    try {
      set({ isLoading: true, error: null });
      await notesApi.deleteNote(id);
      set((state) => ({
        notes: state.notes.filter(note => note.id !== id),
        currentNote: state.currentNote?.id === id ? null : state.currentNote,
        isLoading: false,
      }));
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to delete note',
        isLoading: false 
      });
    }
  },

  clearNotes: () => set({ notes: [], currentNote: null, error: null }),
})); 