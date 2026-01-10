import { motion } from "framer-motion";
import { Flame, Clock, Target, Calendar } from "lucide-react";
import { usePracticeStreak, useTodaysPractice, useSadhanaSessions } from "@/hooks/useSadhana";
import { useAuth } from "@/hooks/useAuth";

const PracticeStats = () => {
  const { user } = useAuth();
  const { data: streak = 0 } = usePracticeStreak();
  const { data: todaysPractice } = useTodaysPractice();
  const { data: sessions = [] } = useSadhanaSessions();

  if (!user) {
    return (
      <div className="bg-card border border-border p-6 text-center">
        <p className="font-body text-muted-foreground">
          Sign in to track your sadhana progress
        </p>
      </div>
    );
  }

  const totalJapa = sessions
    .filter((s) => s.session_type === "japa")
    .reduce((sum, s) => sum + (s.count || 0), 0);

  const totalMinutes = Math.floor(
    sessions.reduce((sum, s) => sum + s.duration_seconds, 0) / 60
  );

  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    if (hours > 0) return `${hours}h ${mins}m`;
    return `${mins}m`;
  };

  const stats = [
    {
      icon: Flame,
      label: "Current Streak",
      value: streak,
      suffix: streak === 1 ? "day" : "days",
      color: "text-orange-400",
    },
    {
      icon: Target,
      label: "Total Japa",
      value: totalJapa.toLocaleString(),
      suffix: "mantras",
      color: "text-gold",
    },
    {
      icon: Clock,
      label: "Practice Time",
      value: totalMinutes.toLocaleString(),
      suffix: "minutes",
      color: "text-blue-400",
    },
    {
      icon: Calendar,
      label: "Today",
      value: todaysPractice ? formatDuration(todaysPractice.total_duration_seconds) : "0m",
      suffix: todaysPractice?.practices_completed.length
        ? `${todaysPractice.practices_completed.length} practice${todaysPractice.practices_completed.length > 1 ? "s" : ""}`
        : "No practice yet",
      color: "text-emerald-400",
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-card border border-border p-4 text-center"
        >
          <stat.icon className={`w-6 h-6 mx-auto mb-2 ${stat.color}`} />
          <p className="font-display text-2xl text-foreground">{stat.value}</p>
          <p className="font-body text-xs text-muted-foreground">{stat.suffix}</p>
          <p className="font-body text-xs text-muted-foreground mt-1">{stat.label}</p>
        </motion.div>
      ))}
    </div>
  );
};

export default PracticeStats;
