import { motion } from "framer-motion";
import { useSadhanaSessions } from "@/hooks/useSadhana";
import { useAuth } from "@/hooks/useAuth";
import { formatDistanceToNow } from "date-fns";

const sessionTypeLabels: Record<string, { label: string; emoji: string }> = {
  japa: { label: "Japa", emoji: "📿" },
  meditation: { label: "Meditation", emoji: "🧘" },
  puja: { label: "Puja", emoji: "🪔" },
  reading: { label: "Reading", emoji: "📖" },
};

const RecentSessions = () => {
  const { user } = useAuth();
  const { data: sessions = [], isLoading } = useSadhanaSessions();

  if (!user) return null;

  if (isLoading) {
    return (
      <div className="bg-card border border-border p-6">
        <div className="animate-pulse space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-16 bg-muted rounded" />
          ))}
        </div>
      </div>
    );
  }

  if (sessions.length === 0) {
    return (
      <div className="bg-card border border-border p-6 text-center">
        <p className="font-sanskrit text-xl text-gold/50 mb-2">अभ्यास</p>
        <p className="font-body text-muted-foreground">
          No sessions yet. Begin your sadhana practice above.
        </p>
      </div>
    );
  }

  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) return `${hours}h ${mins}m`;
    if (mins > 0) return `${mins}m ${secs}s`;
    return `${secs}s`;
  };

  return (
    <div className="bg-card border border-border">
      <div className="p-4 border-b border-border">
        <h3 className="font-display text-lg">Recent Sessions</h3>
      </div>
      <div className="divide-y divide-border">
        {sessions.slice(0, 10).map((session, index) => {
          const typeInfo = sessionTypeLabels[session.session_type] || {
            label: session.session_type,
            emoji: "🕉️",
          };

          return (
            <motion.div
              key={session.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="p-4 flex items-center gap-4"
            >
              <span className="text-2xl">{typeInfo.emoji}</span>
              <div className="flex-1 min-w-0">
                <p className="font-body text-foreground">
                  {typeInfo.label}
                  {session.mantra && (
                    <span className="text-muted-foreground ml-2">— {session.mantra}</span>
                  )}
                </p>
                <p className="font-body text-sm text-muted-foreground">
                  {formatDistanceToNow(new Date(session.completed_at), { addSuffix: true })}
                </p>
              </div>
              <div className="text-right">
                <p className="font-display text-foreground">
                  {formatDuration(session.duration_seconds)}
                </p>
                {session.count && (
                  <p className="font-body text-sm text-gold">{session.count} mantras</p>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default RecentSessions;
