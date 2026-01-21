import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { 
  User, Calendar, Flame, BookOpen, Target, MessageCircle, 
  Sparkles, Award, Brain, CircleDot, Crown, ArrowLeft
} from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { usePublicProfile, useProfileStats, useRecentActivity } from "@/hooks/usePublicProfile";
import { useUserAchievements, RARITY_COLORS } from "@/hooks/useAchievements";
import AchievementBadge from "@/components/achievements/AchievementBadge";

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

const Profile = () => {
  const { userId } = useParams<{ userId: string }>();
  const { data: profile, isLoading: profileLoading } = usePublicProfile(userId!);
  const { data: stats, isLoading: statsLoading } = useProfileStats(userId!);
  const { data: achievements, isLoading: achievementsLoading } = useUserAchievements(userId);
  const { data: activity, isLoading: activityLoading } = useRecentActivity(userId!);

  if (profileLoading) {
    return (
      <main className="min-h-screen bg-background">
        <Header />
        <div className="max-w-5xl mx-auto px-6 py-12">
          <Skeleton className="h-48 w-full rounded-xl mb-6" />
          <div className="grid md:grid-cols-3 gap-6">
            <Skeleton className="h-64 rounded-xl" />
            <Skeleton className="h-64 rounded-xl md:col-span-2" />
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  if (!profile) {
    return (
      <main className="min-h-screen bg-background">
        <Header />
        <div className="max-w-5xl mx-auto px-6 py-24 text-center">
          <User className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">Profile Not Found</h1>
          <p className="text-muted-foreground mb-6">
            The user you're looking for doesn't exist or has been removed.
          </p>
          <Link to="/">
            <Button>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>
        <Footer />
      </main>
    );
  }

  const recentAchievements = achievements?.slice(0, 6) || [];

  return (
    <main className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-primary/5 via-background to-background pt-24 pb-12">
        <div className="max-w-5xl mx-auto px-6">
          <Link to="/" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row gap-6 items-start"
          >
            {/* Avatar */}
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary/30 to-primary/10 border-4 border-background shadow-xl flex items-center justify-center">
              <User className="w-12 h-12 text-primary" />
            </div>

            {/* Info */}
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold text-foreground">
                  {profile.display_name || "Anonymous Seeker"}
                </h1>
                <Badge className={levelColors[profile.membership_level]}>
                  {levelLabels[profile.membership_level]}
                </Badge>
              </div>
              
              {profile.bio && (
                <p className="text-muted-foreground mb-4 max-w-2xl">{profile.bio}</p>
              )}

              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  Joined {format(new Date(profile.joined_at), "MMM yyyy")}
                </div>
                <div className="flex items-center gap-1">
                  <Sparkles className="w-4 h-4 text-primary" />
                  {profile.karma.toLocaleString()} karma
                </div>
                {profile.ishta_devata && (
                  <div className="flex items-center gap-1">
                    <Crown className="w-4 h-4 text-gold" />
                    {profile.ishta_devata}
                  </div>
                )}
              </div>

              {profile.spiritual_goals && profile.spiritual_goals.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {profile.spiritual_goals.map((goal, i) => (
                    <Badge key={i} variant="outline" className="text-xs">
                      {goal}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Grid */}
      <section className="py-8 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {statsLoading ? (
              [...Array(4)].map((_, i) => (
                <Skeleton key={i} className="h-24 rounded-xl" />
              ))
            ) : (
              <>
                <Card className="bg-card/50">
                  <CardContent className="p-4 text-center">
                    <Flame className="w-6 h-6 text-orange-500 mx-auto mb-2" />
                    <p className="text-2xl font-bold">{stats?.currentStreak || 0}</p>
                    <p className="text-xs text-muted-foreground">Day Streak</p>
                  </CardContent>
                </Card>
                <Card className="bg-card/50">
                  <CardContent className="p-4 text-center">
                    <BookOpen className="w-6 h-6 text-emerald-500 mx-auto mb-2" />
                    <p className="text-2xl font-bold">{stats?.chaptersRead || 0}</p>
                    <p className="text-xs text-muted-foreground">Chapters Read</p>
                  </CardContent>
                </Card>
                <Card className="bg-card/50">
                  <CardContent className="p-4 text-center">
                    <Brain className="w-6 h-6 text-purple-500 mx-auto mb-2" />
                    <p className="text-2xl font-bold">{stats?.totalMeditations || 0}</p>
                    <p className="text-xs text-muted-foreground">Meditations</p>
                  </CardContent>
                </Card>
                <Card className="bg-card/50">
                  <CardContent className="p-4 text-center">
                    <CircleDot className="w-6 h-6 text-blue-500 mx-auto mb-2" />
                    <p className="text-2xl font-bold">{(stats?.totalJapa || 0).toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground">Japa Count</p>
                  </CardContent>
                </Card>
              </>
            )}
          </motion.div>
        </div>
      </section>

      {/* Achievements & Activity */}
      <section className="py-8 px-6">
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6">
          {/* Achievements */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="md:col-span-2"
          >
            <Card>
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-primary" />
                    Achievements
                  </CardTitle>
                  <Badge variant="outline">
                    {achievements?.length || 0} earned
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                {achievementsLoading ? (
                  <div className="flex gap-3">
                    {[...Array(6)].map((_, i) => (
                      <Skeleton key={i} className="w-14 h-14 rounded-full" />
                    ))}
                  </div>
                ) : recentAchievements.length > 0 ? (
                  <div className="flex flex-wrap gap-3">
                    {recentAchievements.map((ua) => (
                      <AchievementBadge
                        key={ua.id}
                        achievement={ua.achievement}
                        earnedAt={ua.earned_at}
                      />
                    ))}
                    {achievements && achievements.length > 6 && (
                      <div className="w-14 h-14 rounded-full bg-muted flex items-center justify-center text-muted-foreground text-sm font-medium">
                        +{achievements.length - 6}
                      </div>
                    )}
                  </div>
                ) : (
                  <p className="text-muted-foreground text-center py-6">
                    No achievements yet
                  </p>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="w-5 h-5 text-primary" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                {activityLoading ? (
                  <div className="space-y-3">
                    {[...Array(5)].map((_, i) => (
                      <Skeleton key={i} className="h-12" />
                    ))}
                  </div>
                ) : activity && activity.length > 0 ? (
                  <div className="space-y-3">
                    {activity.map((item) => (
                      <div 
                        key={item.id}
                        className="flex items-start gap-3 p-2 rounded-lg hover:bg-muted/50"
                      >
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                          {item.type === "discussion" && <MessageCircle className="w-4 h-4 text-primary" />}
                          {item.type === "achievement" && <Award className="w-4 h-4 text-gold" />}
                          {item.type === "sankalpa" && <Target className="w-4 h-4 text-emerald-500" />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-foreground truncate">{item.title}</p>
                          <p className="text-xs text-muted-foreground">
                            {format(new Date(item.date), "MMM d, yyyy")}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground text-center py-6">
                    No recent activity
                  </p>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* More Stats */}
      <section className="py-8 px-6 pb-16">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Community Contributions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="text-center p-4 rounded-lg bg-muted/30">
                    <Target className="w-6 h-6 text-emerald-500 mx-auto mb-2" />
                    <p className="text-2xl font-bold">{stats?.sankalpasCompleted || 0}</p>
                    <p className="text-sm text-muted-foreground">Sankalpas Completed</p>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-muted/30">
                    <MessageCircle className="w-6 h-6 text-blue-500 mx-auto mb-2" />
                    <p className="text-2xl font-bold">{stats?.discussionsStarted || 0}</p>
                    <p className="text-sm text-muted-foreground">Discussions Started</p>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-muted/30">
                    <MessageCircle className="w-6 h-6 text-purple-500 mx-auto mb-2" />
                    <p className="text-2xl font-bold">{stats?.repliesPosted || 0}</p>
                    <p className="text-sm text-muted-foreground">Replies Posted</p>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-muted/30">
                    <Award className="w-6 h-6 text-gold mx-auto mb-2" />
                    <p className="text-2xl font-bold">{achievements?.length || 0}</p>
                    <p className="text-sm text-muted-foreground">Achievements</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Profile;
