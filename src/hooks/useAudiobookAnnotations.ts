import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

export interface AudiobookAnnotation {
  id: string;
  user_id: string;
  audiobook_id: string;
  chapter_number: number;
  position_seconds: number;
  annotation_type: string;
  content: string;
  highlight_color: string | null;
  created_at: string;
  updated_at: string;
}

export const useAudiobookAnnotations = (audiobookId: string) => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["audiobook-annotations", audiobookId, user?.id],
    queryFn: async () => {
      if (!user) return [];

      const { data, error } = await supabase
        .from("audiobook_annotations")
        .select("*")
        .eq("audiobook_id", audiobookId)
        .eq("user_id", user.id)
        .order("position_seconds", { ascending: true });

      if (error) throw error;
      return data as AudiobookAnnotation[];
    },
    enabled: !!user && !!audiobookId,
  });
};

export const useCreateAnnotation = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      audiobook_id,
      chapter_number,
      position_seconds,
      annotation_type,
      content,
      highlight_color,
    }: {
      audiobook_id: string;
      chapter_number: number;
      position_seconds: number;
      annotation_type: "note" | "highlight";
      content: string;
      highlight_color?: string;
    }) => {
      if (!user) throw new Error("Must be logged in");

      const { data, error } = await supabase
        .from("audiobook_annotations")
        .insert({
          user_id: user.id,
          audiobook_id,
          chapter_number,
          position_seconds,
          annotation_type,
          content,
          highlight_color: highlight_color || "yellow",
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["audiobook-annotations", variables.audiobook_id],
      });
      toast({
        title: variables.annotation_type === "note" ? "Note Added" : "Highlight Added",
        description: "Your annotation has been saved.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });
};

export const useUpdateAnnotation = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      audiobook_id,
      content,
      highlight_color,
    }: {
      id: string;
      audiobook_id: string;
      content?: string;
      highlight_color?: string;
    }) => {
      const updates: Record<string, unknown> = {};
      if (content !== undefined) updates.content = content;
      if (highlight_color !== undefined) updates.highlight_color = highlight_color;

      const { error } = await supabase
        .from("audiobook_annotations")
        .update(updates)
        .eq("id", id);

      if (error) throw error;
      return { audiobook_id };
    },
    onSuccess: (result) => {
      queryClient.invalidateQueries({
        queryKey: ["audiobook-annotations", result.audiobook_id],
      });
      toast({
        title: "Updated",
        description: "Annotation updated successfully.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });
};

export const useDeleteAnnotation = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, audiobook_id }: { id: string; audiobook_id: string }) => {
      const { error } = await supabase
        .from("audiobook_annotations")
        .delete()
        .eq("id", id);

      if (error) throw error;
      return { audiobook_id };
    },
    onSuccess: (result) => {
      queryClient.invalidateQueries({
        queryKey: ["audiobook-annotations", result.audiobook_id],
      });
      toast({
        title: "Deleted",
        description: "Annotation removed.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });
};
