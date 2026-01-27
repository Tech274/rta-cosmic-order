import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

export interface ActivityLog {
  id: string;
  admin_id: string;
  action_type: string;
  target_type: string;
  target_id: string | null;
  details: Record<string, unknown>;
  created_at: string;
  admin_name?: string;
}

export const useActivityLogs = (limit = 50) => {
  return useQuery({
    queryKey: ["activity-logs", limit],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("admin_activity_logs")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(limit);

      if (error) throw error;

      // Enrich with admin names
      const enrichedData = await Promise.all(
        (data || []).map(async (log) => {
          const { data: profile } = await supabase
            .from("profiles")
            .select("display_name")
            .eq("user_id", log.admin_id)
            .maybeSingle();

          return {
            ...log,
            admin_name: profile?.display_name || "Unknown Admin",
          } as ActivityLog;
        })
      );

      return enrichedData;
    },
  });
};

export const useLogActivity = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      action_type,
      target_type,
      target_id,
      details,
    }: {
      action_type: string;
      target_type: string;
      target_id?: string;
      details?: Record<string, string | number | boolean | null>;
    }) => {
      if (!user) throw new Error("Must be logged in as admin");

      const { error } = await supabase.from("admin_activity_logs").insert([{
        admin_id: user.id,
        action_type,
        target_type,
        target_id: target_id || null,
        details: details ? JSON.parse(JSON.stringify(details)) : {},
      }]);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["activity-logs"] });
    },
  });
};
