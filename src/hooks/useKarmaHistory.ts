import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

export interface KarmaEntry {
  id: string;
  amount: number;
  reason: string;
  created_at: string;
}

export const useKarmaHistory = () => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["karma-history", user?.id],
    queryFn: async (): Promise<KarmaEntry[]> => {
      if (!user) return [];

      const { data, error } = await supabase
        .from("karma_history")
        .select("id, amount, reason, created_at")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data || [];
    },
    enabled: !!user,
  });
};
