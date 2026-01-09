import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Trophy, Crown, Medal, Star } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const levelLabels: Record<string, string> = {
  seeker: "Seeker",
  questioner: "Questioner",
  reader: "Reader",
  debater: "Debater",
  interpreter: "Interpreter",
  scholar: "Scholar",
  guardian: "Guardian",
};

const levelColors: Record<string, string> = {
  seeker: "bg-muted text-muted-foreground",
  questioner: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300",
  reader: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300",
  debater: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
  interpreter: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300",
  scholar: "bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-300",
  guardian: "bg-gradient-to-r from-amber-200 to-yellow-400 text-amber-900 dark:from-amber-600 dark:to-yellow-500 dark:text-white",
};

const RankIcon = ({ rank }: { rank: number }) => {
  if (rank === 1) return <Crown className="h-5 w-5 text-yellow-500" />;
  if (rank === 2) return <Medal className="h-5 w-5 text-gray-400" />;
  if (rank === 3) return <Medal className="h-5 w-5 text-amber-600" />;
  return <span className="text-sm text-muted-foreground font-medium w-5 text-center">{rank}</span>;
};

const LeaderboardSection = () => {
  const { data: leaders, isLoading } = useQuery({
    queryKey: ["leaderboard"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("id, display_name, karma, membership_level")
        .order("karma", { ascending: false })
        .limit(10);

      if (error) throw error;
      return data;
    },
  });

  return (
    <section className="py-16 px-6 bg-muted/30">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Trophy className="h-8 w-8 text-primary" />
            <h2 className="text-3xl font-bold text-foreground">Top Contributors</h2>
          </div>
          <p className="text-muted-foreground">
            Members who have earned the most karma through their philosophical contributions
          </p>
        </div>

        <Card className="border-border/50 bg-card/80 backdrop-blur">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg flex items-center gap-2">
              <Star className="h-5 w-5 text-primary" />
              Leaderboard
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-3">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="h-14 bg-muted animate-pulse rounded-lg" />
                ))}
              </div>
            ) : leaders && leaders.length > 0 ? (
              <div className="space-y-2">
                {leaders.map((leader, index) => (
                  <div
                    key={leader.id}
                    className={`flex items-center gap-4 p-3 rounded-lg transition-colors ${
                      index === 0
                        ? "bg-yellow-50/50 dark:bg-yellow-900/10 border border-yellow-200/50 dark:border-yellow-800/30"
                        : "hover:bg-muted/50"
                    }`}
                  >
                    <div className="flex items-center justify-center w-8">
                      <RankIcon rank={index + 1} />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-foreground truncate">
                        {leader.display_name || "Anonymous Philosopher"}
                      </p>
                      <Badge 
                        variant="secondary" 
                        className={`text-xs ${levelColors[leader.membership_level] || ""}`}
                      >
                        {levelLabels[leader.membership_level] || leader.membership_level}
                      </Badge>
                    </div>
                    
                    <div className="text-right">
                      <p className="font-bold text-foreground">{leader.karma.toLocaleString()}</p>
                      <p className="text-xs text-muted-foreground">karma</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-muted-foreground py-8">
                No contributors yet. Be the first to earn karma!
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default LeaderboardSection;
