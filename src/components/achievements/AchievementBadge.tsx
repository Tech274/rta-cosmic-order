import { motion } from "framer-motion";
import { 
  Flame, Sparkles, BookOpen, Brain, CircleDot, Target, 
  MessageCircle, MessageSquare, Trophy, Crown, Award
} from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Achievement, RARITY_COLORS } from "@/hooks/useAchievements";
import { format } from "date-fns";

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  flame: Flame,
  sparkles: Sparkles,
  "book-open": BookOpen,
  brain: Brain,
  "circle-dot": CircleDot,
  target: Target,
  "message-circle": MessageCircle,
  "message-square": MessageSquare,
  trophy: Trophy,
  crown: Crown,
  award: Award,
};

interface AchievementBadgeProps {
  achievement: Achievement;
  earnedAt?: string;
  locked?: boolean;
  size?: "sm" | "md" | "lg";
  showTooltip?: boolean;
}

const AchievementBadge = ({
  achievement,
  earnedAt,
  locked = false,
  size = "md",
  showTooltip = true,
}: AchievementBadgeProps) => {
  const IconComponent = ICON_MAP[achievement.icon] || Trophy;
  
  const sizeClasses = {
    sm: "w-10 h-10",
    md: "w-14 h-14",
    lg: "w-20 h-20",
  };
  
  const iconSizes = {
    sm: "w-5 h-5",
    md: "w-7 h-7",
    lg: "w-10 h-10",
  };

  const badge = (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: locked ? 0.4 : 1 }}
      whileHover={locked ? {} : { scale: 1.1, rotate: 5 }}
      className={`
        ${sizeClasses[size]} 
        rounded-full 
        border-2 
        flex items-center justify-center
        transition-all
        ${locked 
          ? "bg-muted border-muted-foreground/20 grayscale" 
          : RARITY_COLORS[achievement.rarity]
        }
        ${achievement.rarity === "legendary" && !locked ? "animate-pulse shadow-lg shadow-amber-500/20" : ""}
      `}
    >
      <IconComponent className={`${iconSizes[size]} ${locked ? "text-muted-foreground/50" : ""}`} />
    </motion.div>
  );

  if (!showTooltip) return badge;

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        {badge}
      </TooltipTrigger>
      <TooltipContent className="max-w-xs p-3">
        <div className="space-y-1">
          <p className="font-semibold text-foreground">{achievement.name}</p>
          <p className="text-sm text-muted-foreground">{achievement.description}</p>
          {earnedAt && (
            <p className="text-xs text-primary">
              Earned {format(new Date(earnedAt), "MMM d, yyyy")}
            </p>
          )}
          {locked && (
            <p className="text-xs text-muted-foreground italic">
              Not yet unlocked
            </p>
          )}
          {achievement.karma_reward > 0 && (
            <p className="text-xs text-gold">
              +{achievement.karma_reward} karma reward
            </p>
          )}
        </div>
      </TooltipContent>
    </Tooltip>
  );
};

export default AchievementBadge;
