import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Flame, Calendar, TrendingUp, Award } from "lucide-react";
import { Link } from "react-router-dom";

interface StreakTrackerProps {
  currentStreak: number;
  longestStreak: number;
  lastPracticeDate?: string;
}

const streakMilestones = [
  { days: 7, name: "Week Warrior", reward: "🔥", description: "7 days of consistent practice" },
  { days: 21, name: "Habit Former", reward: "⭐", description: "21 days - habit established" },
  { days: 40, name: "Mandala Complete", reward: "🕉️", description: "40-day spiritual cycle complete" },
  { days: 108, name: "Sacred Number", reward: "💎", description: "108 days - divine alignment" },
  { days: 365, name: "Year of Devotion", reward: "👑", description: "One year of unbroken practice" },
];

export const StreakTracker = ({ currentStreak, longestStreak, lastPracticeDate }: StreakTrackerProps) => {
  // Find next milestone
  const nextMilestone = streakMilestones.find((m) => m.days > currentStreak) || streakMilestones[streakMilestones.length - 1];
  const progressToNext = nextMilestone ? Math.min((currentStreak / nextMilestone.days) * 100, 100) : 100;
  
  // Get achieved milestones
  const achievedMilestones = streakMilestones.filter((m) => longestStreak >= m.days);

  // Calculate streak status
  const isActiveToday = lastPracticeDate 
    ? new Date(lastPracticeDate).toDateString() === new Date().toDateString()
    : false;

  const formatStreakMessage = () => {
    if (currentStreak === 0) return "Start your streak today!";
    if (currentStreak === 1) return "Day 1 — The journey begins!";
    if (currentStreak < 7) return `${currentStreak} days — Building momentum!`;
    if (currentStreak < 21) return `${currentStreak} days — Keep going!`;
    if (currentStreak < 40) return `${currentStreak} days — Habit forming!`;
    return `${currentStreak} days — Unstoppable!`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <Card className="bg-card/50 border-primary/20 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-xl text-primary flex items-center gap-2">
            <Flame className="h-5 w-5 text-orange-500" />
            Practice Streak
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Main Streak Display */}
          <div className="relative">
            <div className="flex items-center justify-center">
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, type: "spring" }}
                className="relative"
              >
                <div className={`w-32 h-32 rounded-full flex items-center justify-center ${
                  currentStreak > 0 
                    ? "bg-gradient-to-br from-orange-500/30 to-red-500/20 border-2 border-orange-500/50" 
                    : "bg-muted/30 border-2 border-muted"
                }`}>
                  <div className="text-center">
                    <span className="text-4xl font-bold text-foreground">{currentStreak}</span>
                    <p className="text-xs text-muted-foreground">day{currentStreak !== 1 ? "s" : ""}</p>
                  </div>
                </div>
                {currentStreak > 0 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute -top-2 -right-2"
                  >
                    <Flame className="h-8 w-8 text-orange-500 animate-pulse" />
                  </motion.div>
                )}
              </motion.div>
            </div>
            <p className="text-center text-sm text-muted-foreground mt-4">
              {formatStreakMessage()}
            </p>
          </div>

          {/* Progress to Next Milestone */}
          {nextMilestone && currentStreak < nextMilestone.days && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Next: {nextMilestone.name}</span>
                <span className="text-primary">{nextMilestone.days - currentStreak} days to go</span>
              </div>
              <div className="h-2 bg-muted/30 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progressToNext}%` }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="h-full bg-gradient-to-r from-orange-500 to-red-500 rounded-full"
                />
              </div>
            </div>
          )}

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-3">
            <div className="p-3 rounded-lg bg-muted/20 border border-border/50 text-center">
              <Calendar className="h-4 w-4 mx-auto text-muted-foreground mb-1" />
              <p className="text-lg font-semibold text-foreground">{longestStreak}</p>
              <p className="text-[10px] text-muted-foreground">Best Streak</p>
            </div>
            <div className="p-3 rounded-lg bg-muted/20 border border-border/50 text-center">
              <TrendingUp className="h-4 w-4 mx-auto text-muted-foreground mb-1" />
              <p className="text-lg font-semibold text-foreground">{achievedMilestones.length}</p>
              <p className="text-[10px] text-muted-foreground">Milestones</p>
            </div>
            <div className="p-3 rounded-lg bg-muted/20 border border-border/50 text-center">
              <Award className="h-4 w-4 mx-auto text-muted-foreground mb-1" />
              <p className="text-lg font-semibold text-foreground">
                {isActiveToday ? "✓" : "—"}
              </p>
              <p className="text-[10px] text-muted-foreground">Today</p>
            </div>
          </div>

          {/* Milestone Badges */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-muted-foreground">Streak Milestones</h4>
            <div className="flex flex-wrap gap-2">
              {streakMilestones.map((milestone) => {
                const isAchieved = longestStreak >= milestone.days;
                return (
                  <div
                    key={milestone.days}
                    className={`px-3 py-2 rounded-lg text-center transition-all ${
                      isAchieved
                        ? "bg-primary/10 border border-primary/30"
                        : "bg-muted/20 border border-border/30 opacity-50"
                    }`}
                    title={milestone.description}
                  >
                    <span className="text-lg">{isAchieved ? milestone.reward : "🔒"}</span>
                    <p className="text-[10px] text-muted-foreground mt-1">{milestone.days}d</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* CTA */}
          <div className="pt-4 border-t border-border/50 text-center">
            <Link
              to="/sadhana"
              className="text-primary hover:underline inline-flex items-center gap-1 text-sm"
            >
              {currentStreak > 0 ? "Continue your Sadhana" : "Start practicing"} →
            </Link>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
