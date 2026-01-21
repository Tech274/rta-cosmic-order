import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Trophy, Crown, Medal, Star, Flame, BookOpen, Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";

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

interface LeaderboardEntry {
  id: string;
  user_id: string;
  display_name: string | null;
  karma: number;
  membership_level: string;
  streak?: number;
  chapters_read?: number;
}

const LeaderboardSection = () => {
  // Karma leaderboard
  const { data: karmaLeaders, isLoading: karmaLoading } = useQuery({
    queryKey: ["leaderboard", "karma"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("id, user_id, display_name, karma, membership_level")
        .order("karma", { ascending: false })
        .limit(10);

      if (error) throw error;
      return data as LeaderboardEntry[];
    },
  });

  // Streaks leaderboard (calculated from daily_practice_logs)
  const { data: streakLeaders, isLoading: streakLoading } = useQuery({
    queryKey: ["leaderboard", "streaks"],
    queryFn: async () => {
      // Get all users with their practice logs
      const { data: profiles, error: profileError } = await supabase
        .from("profiles")
        .select("id, user_id, display_name, karma, membership_level");

      if (profileError) throw profileError;

      // Get practice logs for all users
      const { data: logs, error: logsError } = await supabase
        .from("daily_practice_logs")
        .select("user_id, practice_date")
        .order("practice_date", { ascending: false });

      if (logsError) throw logsError;

      // Calculate streaks for each user
      const userStreaks: Record<string, number> = {};
      const logsByUser: Record<string, string[]> = {};

      logs?.forEach(log => {
        if (!logsByUser[log.user_id]) {
          logsByUser[log.user_id] = [];
        }
        logsByUser[log.user_id].push(log.practice_date);
      });

      Object.entries(logsByUser).forEach(([userId, dates]) => {
        const sortedDates = [...new Set(dates)].sort((a, b) => 
          new Date(b).getTime() - new Date(a).getTime()
        );
        
        let streak = 0;
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        for (let i = 0; i < sortedDates.length; i++) {
          const date = new Date(sortedDates[i]);
          date.setHours(0, 0, 0, 0);
          
          const expectedDate = new Date(today);
          expectedDate.setDate(today.getDate() - i);
          
          if (date.getTime() === expectedDate.getTime()) {
            streak++;
          } else if (i === 0 && date.getTime() === expectedDate.getTime() - 86400000) {
            // Allow for yesterday if today hasn't been logged yet
            streak++;
          } else {
            break;
          }
        }
        
        userStreaks[userId] = streak;
      });

      // Combine with profile data
      const leadersWithStreaks = profiles
        ?.map(profile => ({
          ...profile,
          streak: userStreaks[profile.user_id] || 0,
        }))
        .filter(p => p.streak > 0)
        .sort((a, b) => b.streak - a.streak)
        .slice(0, 10);

      return leadersWithStreaks as LeaderboardEntry[];
    },
  });

  // Scripture reading leaderboard
  const { data: readingLeaders, isLoading: readingLoading } = useQuery({
    queryKey: ["leaderboard", "reading"],
    queryFn: async () => {
      // Get profiles
      const { data: profiles, error: profileError } = await supabase
        .from("profiles")
        .select("id, user_id, display_name, karma, membership_level");

      if (profileError) throw profileError;

      // Get reading progress
      const { data: progress, error: progressError } = await supabase
        .from("scripture_reading_progress")
        .select("user_id, completed")
        .eq("completed", true);

      if (progressError) throw progressError;

      // Count chapters per user
      const chaptersPerUser: Record<string, number> = {};
      progress?.forEach(p => {
        chaptersPerUser[p.user_id] = (chaptersPerUser[p.user_id] || 0) + 1;
      });

      // Combine with profile data
      const leadersWithReading = profiles
        ?.map(profile => ({
          ...profile,
          chapters_read: chaptersPerUser[profile.user_id] || 0,
        }))
        .filter(p => p.chapters_read > 0)
        .sort((a, b) => b.chapters_read! - a.chapters_read!)
        .slice(0, 10);

      return leadersWithReading as LeaderboardEntry[];
    },
  });

  const renderLeaderList = (
    leaders: LeaderboardEntry[] | undefined,
    isLoading: boolean,
    valueKey: "karma" | "streak" | "chapters_read",
    valueLabel: string,
    icon: React.ReactNode
  ) => {
    if (isLoading) {
      return (
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-14 bg-muted animate-pulse rounded-lg" />
          ))}
        </div>
      );
    }

    if (!leaders || leaders.length === 0) {
      return (
        <p className="text-center text-muted-foreground py-8">
          No practitioners yet. Start your journey today!
        </p>
      );
    }

    return (
      <div className="space-y-2">
        {leaders.map((leader, index) => (
          <Link key={leader.id} to={`/profile/${leader.user_id}`}>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`flex items-center gap-4 p-3 rounded-lg transition-colors cursor-pointer ${
                index === 0
                  ? "bg-yellow-50/50 dark:bg-yellow-900/10 border border-yellow-200/50 dark:border-yellow-800/30"
                  : "hover:bg-muted/50"
              }`}
            >
              <div className="flex items-center justify-center w-8">
                <RankIcon rank={index + 1} />
              </div>
              
              <div className="flex-1 min-w-0">
                <p className="font-medium text-foreground truncate hover:text-primary transition-colors">
                  {leader.display_name || "Anonymous Seeker"}
                </p>
                <Badge 
                  variant="secondary" 
                  className={`text-xs ${levelColors[leader.membership_level] || ""}`}
                >
                  {levelLabels[leader.membership_level] || leader.membership_level}
                </Badge>
              </div>
              
              <div className="text-right flex items-center gap-2">
                {icon}
                <div>
                  <p className="font-bold text-foreground">
                    {valueKey === "karma" 
                      ? leader.karma.toLocaleString() 
                      : valueKey === "streak" 
                      ? leader.streak 
                      : leader.chapters_read}
                  </p>
                  <p className="text-xs text-muted-foreground">{valueLabel}</p>
                </div>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>
    );
  };

  return (
    <section className="py-16 px-6 bg-muted/30">
      <div className="max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Trophy className="h-8 w-8 text-primary" />
            <h2 className="text-3xl font-bold text-foreground">Community Leaderboard</h2>
          </div>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Celebrating our dedicated practitioners — those who inspire through their karma, discipline, and wisdom
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
        >
          <Card className="border-border/50 bg-card/80 backdrop-blur">
            <CardHeader className="pb-4">
              <Tabs defaultValue="karma" className="w-full">
                <TabsList className="grid w-full grid-cols-3 mb-4">
                  <TabsTrigger value="karma" className="gap-2">
                    <Sparkles className="h-4 w-4" />
                    <span className="hidden sm:inline">Karma</span>
                  </TabsTrigger>
                  <TabsTrigger value="streaks" className="gap-2">
                    <Flame className="h-4 w-4" />
                    <span className="hidden sm:inline">Streaks</span>
                  </TabsTrigger>
                  <TabsTrigger value="reading" className="gap-2">
                    <BookOpen className="h-4 w-4" />
                    <span className="hidden sm:inline">Reading</span>
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="karma">
                  <CardTitle className="text-lg flex items-center gap-2 mb-4">
                    <Star className="h-5 w-5 text-primary" />
                    Top Karma Earners
                  </CardTitle>
                  {renderLeaderList(
                    karmaLeaders,
                    karmaLoading,
                    "karma",
                    "karma",
                    <Sparkles className="h-4 w-4 text-primary" />
                  )}
                </TabsContent>

                <TabsContent value="streaks">
                  <CardTitle className="text-lg flex items-center gap-2 mb-4">
                    <Flame className="h-5 w-5 text-orange-500" />
                    Longest Practice Streaks
                  </CardTitle>
                  {renderLeaderList(
                    streakLeaders,
                    streakLoading,
                    "streak",
                    "days",
                    <Flame className="h-4 w-4 text-orange-500" />
                  )}
                </TabsContent>

                <TabsContent value="reading">
                  <CardTitle className="text-lg flex items-center gap-2 mb-4">
                    <BookOpen className="h-5 w-5 text-emerald-500" />
                    Most Chapters Completed
                  </CardTitle>
                  {renderLeaderList(
                    readingLeaders,
                    readingLoading,
                    "chapters_read",
                    "chapters",
                    <BookOpen className="h-4 w-4 text-emerald-500" />
                  )}
                </TabsContent>
              </Tabs>
            </CardHeader>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default LeaderboardSection;
