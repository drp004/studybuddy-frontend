// src/hooks/useApi.tsx
import { useQuery, useMutation, useQueryClient, QueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { notesApi, GenerateNotesResponse } from '@/api/notes';

/* ---------- Types ---------- */

export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt?: string;
  // add other fields if your backend returns more
}

export interface PPTResponse {
  id: string;
  downloadUrl?: string;
  blob?: Blob;
}

/* ---------- Query keys ---------- */

export const queryKeys = {
  notes: ['notes'] as const,
  note: (id: string) => ['notes', id] as const,
  user: ['user'] as const,
  careerAssessment: ['careerAssessment'] as const,
};

/* ---------- Helpers ---------- */

// Safe error message
const getErrorMessage = (err: unknown, fallback: string) =>
  err instanceof Error ? err.message : fallback;

// Update cache after new/updated note
const updateNotesCache = (client: QueryClient, newNote: Note) => {
  client.setQueryData<Note[]>(queryKeys.notes, (old = []) => [newNote, ...old]);
  client.setQueryData(queryKeys.note(newNote.id), newNote);
};

/* ---------- Queries ---------- */

export function useNotes() {
  return useQuery({
    queryKey: queryKeys.notes,
    queryFn: notesApi.getAllNotes,
    staleTime: 5 * 60 * 1000,
    // cacheTime: 10 * 60 * 1000, // Removed as it is not a valid property
  });
}

export function useNote(id: string) {
  return useQuery({
    queryKey: queryKeys.note(id),
    queryFn: () => notesApi.getNote(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
}

/* ---------- Mutations ---------- */

export function useGenerateTextNotes() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (text: string) => {
      const response: GenerateNotesResponse = await notesApi.generateFromText(text);
      return {
        id: response.id,
        title: response.content ? response.content.slice(0, 32) : 'Untitled', // fallback if no title
        content: response.content,
        createdAt: response.createdAt,
        updatedAt: '', // fallback, since updatedAt may not exist
      } as Note;
    },
    onSuccess: (note: Note) => {
      updateNotesCache(qc, note);
      toast.success('Notes generated successfully!');
    },
    onError: (e) => toast.error(getErrorMessage(e, 'Failed to generate notes')),
  });
}

export function useGenerateAudioNotes() {
  const qc = useQueryClient();
  return useMutation({
    // mutationFn: notesApi.generateFromAudio,
    onSuccess: (note: Note) => {
      updateNotesCache(qc, note);
      toast.success('Audio notes generated successfully!');
    },
    onError: (e) => toast.error(getErrorMessage(e, 'Failed to generate audio notes')),
  });
}

export function useGenerateVideoNotes() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (videoFile: File) => {
      const response: GenerateNotesResponse = await notesApi.generateFromVideo(videoFile);
      return {
        id: response.id,
        title: response.content ? response.content.slice(0, 32) : 'Untitled', // fallback if no title
        content: response.content,
        createdAt: response.createdAt,
        updatedAt: '', // fallback, since updatedAt may not exist
      } as Note;
    },
    onSuccess: (note: Note) => {
      updateNotesCache(qc, note);
      toast.success('Video notes generated successfully!');
    },
    onError: (e) => toast.error(getErrorMessage(e, 'Failed to generate video notes')),
  });
}

export function useDeleteNote() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: notesApi.deleteNote,
    onSuccess: (_, deletedId: string) => {
      qc.setQueryData<Note[]>(queryKeys.notes, (old = []) =>
        old.filter((n) => n.id !== deletedId)
      );
      qc.removeQueries({ queryKey: queryKeys.note(deletedId), exact: true });
      toast.success('Note deleted successfully!');
    },
    onError: (e) => toast.error(getErrorMessage(e, 'Failed to delete note')),
  });
}

export function useCreatePPT() {
  return useMutation({
    mutationFn: notesApi.createPPT,
    onSuccess: (ppt: PPTResponse) => {
      toast.success('Presentation created successfully!');
      if (ppt.downloadUrl) {
        const link = document.createElement('a');
        link.href = ppt.downloadUrl;
        link.download = `presentation-${ppt.id}.pptx`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else if (ppt.blob) {
        const url = window.URL.createObjectURL(ppt.blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `presentation-${ppt.id}.pptx`;
        link.click();
        window.URL.revokeObjectURL(url);
      }
    },
    onError: (e) => toast.error(getErrorMessage(e, 'Failed to create presentation')),
  });
}

/* ---------- Generic hooks ---------- */

export function useApiCall<TData, TVariables>(
  queryKey: readonly unknown[],
  queryFn: (variables: TVariables) => Promise<TData>,
  options?: { enabled?: boolean; staleTime?: number; cacheTime?: number }
) {
  return useQuery({
    queryKey,
    queryFn: () => queryFn({} as TVariables),
    enabled: options?.enabled ?? true,
    staleTime: options?.staleTime ?? 5 * 60 * 1000,
    // cacheTime: options?.cacheTime ?? 10 * 60 * 1000,
  });
}

export function useApiMutation<TData, TVariables>(
  mutationFn: (variables: TVariables) => Promise<TData>,
  options?: {
    onSuccess?: (data: TData, variables: TVariables) => void;
    onError?: (error: Error, variables: TVariables) => void;
    invalidateQueries?: readonly unknown[];
  }
) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn,
    onSuccess: (data, variables) => {
      if (options?.invalidateQueries) {
        options.invalidateQueries.forEach((key) => {
          qc.invalidateQueries({ queryKey: key as readonly unknown[] });
        });
      }
      options?.onSuccess?.(data, variables);
    },
    onError: (err, vars) => {
      options?.onError?.(err as Error, vars);
    },
  });
}
