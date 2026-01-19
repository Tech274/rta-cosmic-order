import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Flame, Clock, Hash, Target, Star, Zap, Mountain } from "lucide-react";
import { Link } from "react-router-dom";

interface PracticeAchievementsProps {
  totalPracticeMinutes: number;
  totalMantras: number;
  currentStreak: number;
  longestStreak: number;
}

const achievements = [
  { id: "first-japa", name: "First Japa", description: "Complete your first japa session", icon: Hash, requirement: (data: PracticeAchievementsProps) => data.totalMantras >= 1 },
  { id: "century", name: "Century", description: "Chant 100 mantras", icon: Star, requirement: (data: PracticeAchievementsProps) => data.totalMantras >= 100 },
  { id: "mala-master", name: "Mala Master", description: "Complete 1,008 mantras", icon: Zap, requirement: (data: PracticeAchievementsProps) => data.totalMantras >= 1008 },
  { id: "lakh-lord", name: "Lakh Lord", description: "Chant 100,000 mantras", icon: Mountain, requirement: (data: PracticeAchievementsProps) => data.totalMantras >= 100000 },
  { id: "first-hour", name: "Dedicated Hour", description: "Practice for 60 minutes total", icon: Clock, requirement: (data: PracticeAchievementsProps) => data.totalPracticeMinutes >= 60 },
  { id: "ten-hours", name: "Committed Seeker", description: "Practice for 10 hours total", icon: Clock, requirement: (data: PracticeAchievementsProps) => data.totalPracticeMinutes >= 600 },
  { id: "week-streak", name: "Week Warrior", description: "Maintain a 7-day streak", icon: Flame, requirement: (data: PracticeAchievementsProps) => data.longestStreak >= 7 },
  { id: "month-streak", name: "Monthly Master", description: "Maintain a 30-day streak", icon: Flame, requirement: (data: PracticeAchievementsProps) => data.longestStreak >= 30 },
];

export const PracticeAchievements = ({
  totalPracticeMinutes,
  totalMantras,
  currentStreak,
  longestStreak,
}: PracticeAchievementsProps) => {
  const data = { totalPracticeMinutes, totalMantras, currentStreak, longestStreak };
  const earnedAchievements = achievements.filter(a => a.requirement(data));
  const lockedAchievements = achievements.filter(a => !a.requirement(data));

  const formatTime = (minutes: number) => {
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Card className="bg-card/50 border-primary/20 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-xl text-primary flex items-center gap-2">
            <Trophy className="h-5 w-5" />
            Practice Achievements
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Stats Overview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 rounded-lg bg-gradient-to-br from-orange-500/20 to-orange-600/10 border border-orange-500/30 text-center">
              <Flame className="h-6 w-6 mx-auto text-orange-400 mb-2" />
              <p className="text-2xl font-bold text-foreground">{currentStreak}</p>
              <p className="text-xs text-muted-foreground">Day Streak</p>
            </div>
            <div className="p-4 rounded-lg bg-gradient-to-br from-purple-500/20 to-purple-600/10 border border-purple-500/30 text-center">
              <Clock className="h-6 w-6 mx-auto text-purple-400 mb-2" />
              <p className="text-2xl font-bold text-foreground">{formatTime(totalPracticeMinutes)}</p>
              <p className="text-xs text-muted-foreground">Total Practice</p>
            </div>
            <div className="p-4 rounded-lg bg-gradient-to-br from-blue-500/20 to-blue-600/10 border border-blue-500/30 text-center">
              <Hash className="h-6 w-6 mx-auto text-blue-400 mb-2" />
              <p className="text-2xl font-bold text-foreground">{totalMantras.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground">Mantras</p>
            </div>
            <div className="p-4 rounded-lg bg-gradient-to-br from-amber-500/20 to-amber-600/10 border border-amber-500/30 text-center">
              <Target className="h-6 w-6 mx-auto text-amber-400 mb-2" />
              <p className="text-2xl font-bold text-foreground">{longestStreak}</p>
              <p className="text-xs text-muted-foreground">Best Streak</p>
            </div>
          </div>

          {/* Earned Achievements */}
          {earnedAchievements.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-sm font-medium text-muted-foreground">Earned</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {earnedAchievements.map(achievement => (
                  <div
                    key={achievement.id}
                    className="flex items-center gap-3 p-3 rounded-lg bg-primary/10 border border-primary/30"
                  >
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                      <achievement.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground text-sm">{achievement.name}</p>
                      <p className="text-xs text-muted-foreground">{achievement.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Locked Achievements */}
          {lockedAchievements.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-sm font-medium text-muted-foreground">
                Locked ({lockedAchievements.length})
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {lockedAchievements.slice(0, 4).map(achievement => (
                  <div
                    key={achievement.id}
                    className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 border border-border/50 opacity-60"
                  >
                    <div className="w-10 h-10 rounded-full bg-muted/50 flex items-center justify-center">
                      <achievement.icon className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="font-medium text-muted-foreground text-sm">{achievement.name}</p>
                      <p className="text-xs text-muted-foreground">{achievement.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CTA */}
          <div className="pt-4 border-t border-border/50 text-center">
            <Link
              to="/sadhana"
              className="text-primary hover:underline inline-flex items-center gap-1 text-sm"
            >
              Continue your Sadhana →
            </Link>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
