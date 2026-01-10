import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

export const useBookmarkedSubhashitas = () => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["bookmarked-subhashitas", user?.id],
    queryFn: async () => {
      if (!user) return [];
      const { data, error } = await supabase
        .from("bookmarked_subhashitas")
        .select("subhashita_id")
        .eq("user_id", user.id);

      if (error) throw error;
      return data.map((b) => b.subhashita_id);
    },
    enabled: !!user,
  });
};

export const useToggleBookmark = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (subhashitaId: string) => {
      if (!user) throw new Error("Must be logged in");

      // Check if already bookmarked
      const { data: existing } = await supabase
        .from("bookmarked_subhashitas")
        .select("id")
        .eq("user_id", user.id)
        .eq("subhashita_id", subhashitaId)
        .maybeSingle();

      if (existing) {
        // Remove bookmark
        const { error } = await supabase
          .from("bookmarked_subhashitas")
          .delete()
          .eq("id", existing.id);

        if (error) throw error;
        return { action: "removed" };
      } else {
        // Add bookmark
        const { error } = await supabase
          .from("bookmarked_subhashitas")
          .insert({
            user_id: user.id,
            subhashita_id: subhashitaId,
          });

        if (error) throw error;
        return { action: "added" };
      }
    },
    onSuccess: (result) => {
      queryClient.invalidateQueries({ queryKey: ["bookmarked-subhashitas"] });
      toast({
        title: result.action === "added" ? "Bookmarked" : "Removed",
        description:
          result.action === "added"
            ? "Subhashita saved to your collection"
            : "Subhashita removed from bookmarks",
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
