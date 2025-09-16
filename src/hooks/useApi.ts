import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { notesApi } from '@/api/notes';

// Query keys for caching
export const queryKeys = {
  notes: ['notes'] as const,
  note: (id: string) => ['notes', id] as const,
  user: ['user'] as const,
  careerAssessment: ['careerAssessment'] as const,
};

// Custom hook for fetching all notes
export function useNotes() {
  return useQuery({
    queryKey: queryKeys.notes,
    queryFn: notesApi.getAllNotes,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
}

// Custom hook for fetching a single note
export function useNote(id: string) {
  return useQuery({
    queryKey: queryKeys.note(id),
    queryFn: () => notesApi.getNote(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
}

// Custom hook for generating notes from text
export function useGenerateTextNotes() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: notesApi.generateFromText,
    onSuccess: (newNote) => {
      // Update the notes list
      queryClient.setQueryData(queryKeys.notes, (oldNotes: any) => {
        return oldNotes ? [newNote, ...oldNotes] : [newNote];
      });
      
      // Set the current note
      queryClient.setQueryData(queryKeys.note(newNote.id), newNote);
      
      toast.success('Notes generated successfully!');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to generate notes');
    },
  });
}

// Custom hook for generating notes from audio
export function useGenerateAudioNotes() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: notesApi.generateFromAudio,
    onSuccess: (newNote) => {
      queryClient.setQueryData(queryKeys.notes, (oldNotes: any) => {
        return oldNotes ? [newNote, ...oldNotes] : [newNote];
      });
      queryClient.setQueryData(queryKeys.note(newNote.id), newNote);
      toast.success('Audio notes generated successfully!');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to generate audio notes');
    },
  });
}

// Custom hook for generating notes from video
export function useGenerateVideoNotes() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: notesApi.generateFromVideo,
    onSuccess: (newNote) => {
      queryClient.setQueryData(queryKeys.notes, (oldNotes: any) => {
        return oldNotes ? [newNote, ...oldNotes] : [newNote];
      });
      queryClient.setQueryData(queryKeys.note(newNote.id), newNote);
      toast.success('Video notes generated successfully!');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to generate video notes');
    },
  });
}

// Custom hook for deleting notes
export function useDeleteNote() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: notesApi.deleteNote,
    onSuccess: (_, deletedId) => {
      // Remove from notes list
      queryClient.setQueryData(queryKeys.notes, (oldNotes: any) => {
        return oldNotes ? oldNotes.filter((note: any) => note.id !== deletedId) : [];
      });
      
      // Remove individual note cache
      queryClient.removeQueries({ queryKey: queryKeys.note(deletedId) });
      
      toast.success('Note deleted successfully!');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to delete note');
    },
  });
}

// Custom hook for creating PPT
export function useCreatePPT() {
  return useMutation({
    mutationFn: notesApi.createPPT,
    onSuccess: (pptResponse) => {
      toast.success('Presentation created successfully!');
      // Trigger download
      if (pptResponse.downloadUrl) {
        const link = document.createElement('a');
        link.href = pptResponse.downloadUrl;
        link.download = `presentation-${pptResponse.id}.pptx`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to create presentation');
    },
  });
}

// Generic API hook for any API call
export function useApiCall<TData, TVariables>(
  queryKey: readonly unknown[],
  queryFn: (variables: TVariables) => Promise<TData>,
  options?: {
    enabled?: boolean;
    staleTime?: number;
    gcTime?: number;
  }
) {
  return useQuery({
    queryKey,
    queryFn: () => queryFn({} as TVariables),
    enabled: options?.enabled ?? true,
    staleTime: options?.staleTime ?? 5 * 60 * 1000,
    gcTime: options?.gcTime ?? 10 * 60 * 1000,
  });
}

// Generic mutation hook
export function useApiMutation<TData, TVariables>(
  mutationFn: (variables: TVariables) => Promise<TData>,
  options?: {
    onSuccess?: (data: TData, variables: TVariables) => void;
    onError?: (error: Error, variables: TVariables) => void;
    invalidateQueries?: readonly unknown[];
  }
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn,
    onSuccess: (data, variables) => {
      if (options?.invalidateQueries) {
        options.invalidateQueries.forEach((queryKey) => {
          queryClient.invalidateQueries({ queryKey });
        });
      }
      options?.onSuccess?.(data, variables);
    },
    onError: (error, variables) => {
      options?.onError?.(error, variables);
    },
  });
} 