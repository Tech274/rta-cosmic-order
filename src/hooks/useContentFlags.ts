import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

export interface ContentFlag {
  id: string;
  reporter_id: string;
  content_type: string;
  content_id: string;
  reason: string;
  description: string | null;
  status: string;
  reviewed_by: string | null;
  reviewed_at: string | null;
  resolution_notes: string | null;
  created_at: string;
  updated_at: string;
  reporter_name?: string;
  reviewer_name?: string;
}

export const useContentFlags = (status?: string) => {
  return useQuery({
    queryKey: ["content-flags", status],
    queryFn: async () => {
      let query = supabase
        .from("content_flags")
        .select("*")
        .order("created_at", { ascending: false });

      if (status) {
        query = query.eq("status", status);
      }

      const { data, error } = await query;
      if (error) throw error;

      // Enrich with user names
      const enrichedData = await Promise.all(
        (data || []).map(async (flag) => {
          const [reporterRes, reviewerRes] = await Promise.all([
            supabase
              .from("profiles")
              .select("display_name")
              .eq("user_id", flag.reporter_id)
              .maybeSingle(),
            flag.reviewed_by
              ? supabase
                  .from("profiles")
                  .select("display_name")
                  .eq("user_id", flag.reviewed_by)
                  .maybeSingle()
              : Promise.resolve({ data: null }),
          ]);

          return {
            ...flag,
            reporter_name: reporterRes.data?.display_name || "Anonymous",
            reviewer_name: reviewerRes.data?.display_name || null,
          } as ContentFlag;
        })
      );

      return enrichedData;
    },
  });
};

export const useFlagContent = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      content_type,
      content_id,
      reason,
      description,
    }: {
      content_type: string;
      content_id: string;
      reason: string;
      description?: string;
    }) => {
      if (!user) throw new Error("Must be logged in");

      const { error } = await supabase.from("content_flags").insert({
        reporter_id: user.id,
        content_type,
        content_id,
        reason,
        description,
      });

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["content-flags"] });
      toast({
        title: "Content Flagged",
        description: "Thank you for reporting. Our moderators will review this.",
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

export const useReviewFlag = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      flagId,
      status,
      resolution_notes,
    }: {
      flagId: string;
      status: "resolved" | "dismissed" | "action_taken";
      resolution_notes?: string;
    }) => {
      if (!user) throw new Error("Must be logged in as moderator");

      const { error } = await supabase
        .from("content_flags")
        .update({
          status,
          reviewed_by: user.id,
          reviewed_at: new Date().toISOString(),
          resolution_notes,
        })
        .eq("id", flagId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["content-flags"] });
      toast({
        title: "Flag Reviewed",
        description: "The flag has been updated.",
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
