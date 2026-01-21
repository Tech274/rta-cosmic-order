import { useMemo } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  useAllAchievements, 
  useUserAchievements,
  useAchievementProgress,
  CATEGORY_LABELS,
  type Achievement
} from "@/hooks/useAchievements";
import AchievementBadge from "./AchievementBadge";

interface AchievementsGridProps {
  userId?: string;
  showProgress?: boolean;
}

const AchievementsGrid = ({ userId, showProgress = true }: AchievementsGridProps) => {
  const { data: allAchievements, isLoading: achievementsLoading } = useAllAchievements();
  const { data: userAchievements, isLoading: userLoading } = useUserAchievements(userId);
  const { data: progress } = useAchievementProgress();

  const earnedIds = useMemo(() => 
    new Set(userAchievements?.map(ua => ua.achievement_id) || []),
    [userAchievements]
  );

  const earnedMap = useMemo(() => {
    const map: Record<string, string> = {};
    userAchievements?.forEach(ua => {
      map[ua.achievement_id] = ua.earned_at;
    });
    return map;
  }, [userAchievements]);

  const groupedAchievements = useMemo(() => {
    if (!allAchievements) return {};
    
    const groups: Record<string, Achievement[]> = {};
    allAchievements.forEach(achievement => {
      if (!groups[achievement.category]) {
        groups[achievement.category] = [];
      }
      groups[achievement.category].push(achievement);
    });
    return groups;
  }, [allAchievements]);

  const getProgressForType = (requirementType: string): number => {
    if (!progress) return 0;
    return progress[requirementType as keyof typeof progress] || 0;
  };

  const getProgressPercentage = (achievement: Achievement): number => {
    const current = getProgressForType(achievement.requirement_type);
    return Math.min(100, (current / achievement.requirement_value) * 100);
  };

  if (achievementsLoading || userLoading) {
    return (
      <div className="grid grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-3">
        {[...Array(20)].map((_, i) => (
          <div key={i} className="w-14 h-14 rounded-full bg-muted animate-pulse" />
        ))}
      </div>
    );
  }

  const categories = Object.keys(groupedAchievements);
  const earnedCount = earnedIds.size;
  const totalCount = allAchievements?.length || 0;

  return (
    <div className="space-y-6">
      {/* Summary */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Achievements</h3>
          <p className="text-sm text-muted-foreground">
            {earnedCount} of {totalCount} unlocked
          </p>
        </div>
        <Badge variant="outline" className="text-primary">
          {Math.round((earnedCount / totalCount) * 100)}% Complete
        </Badge>
      </div>

      <Tabs defaultValue={categories[0]} className="w-full">
        <TabsList className="flex flex-wrap h-auto gap-1 bg-transparent justify-start">
          {categories.map(category => (
            <TabsTrigger 
              key={category} 
              value={category}
              className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary"
            >
              {CATEGORY_LABELS[category] || category}
            </TabsTrigger>
          ))}
        </TabsList>

        {categories.map(category => (
          <TabsContent key={category} value={category} className="mt-6">
            <div className="grid gap-4 md:grid-cols-2">
              {groupedAchievements[category]?.map((achievement, index) => {
                const isEarned = earnedIds.has(achievement.id);
                const progressPct = getProgressPercentage(achievement);
                const currentValue = getProgressForType(achievement.requirement_type);

                return (
                  <motion.div
                    key={achievement.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Card className={`${isEarned ? "border-primary/30" : "opacity-60"}`}>
                      <CardContent className="p-4">
                        <div className="flex items-start gap-4">
                          <AchievementBadge
                            achievement={achievement}
                            earnedAt={earnedMap[achievement.id]}
                            locked={!isEarned}
                            showTooltip={false}
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-medium text-foreground truncate">
                                {achievement.name}
                              </h4>
                              <Badge 
                                variant="outline" 
                                className={`text-xs capitalize ${
                                  achievement.rarity === "legendary" 
                                    ? "bg-gradient-to-r from-amber-500/20 to-yellow-500/20 text-amber-600 border-amber-500/30" 
                                    : ""
                                }`}
                              >
                                {achievement.rarity}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">
                              {achievement.description}
                            </p>
                            {showProgress && !isEarned && (
                              <div className="space-y-1">
                                <Progress value={progressPct} className="h-1.5" />
                                <p className="text-xs text-muted-foreground">
                                  {currentValue} / {achievement.requirement_value}
                                </p>
                              </div>
                            )}
                            {isEarned && earnedMap[achievement.id] && (
                              <p className="text-xs text-primary">
                                Earned {new Date(earnedMap[achievement.id]).toLocaleDateString()}
                              </p>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default AchievementsGrid;
