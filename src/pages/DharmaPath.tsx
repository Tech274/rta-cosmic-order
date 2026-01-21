import { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SpiritualProfile } from "@/components/dharmapath/SpiritualProfile";
import { ReadingProgress } from "@/components/dharmapath/ReadingProgress";
import { PracticeAchievements } from "@/components/dharmapath/PracticeAchievements";
import { StreakTracker } from "@/components/dharmapath/StreakTracker";
import SankalpaTracker from "@/components/sadhana/SankalpaTracker";
import UpcomingEvents from "@/components/panchang/UpcomingEvents";
import SpiritualReportCard from "@/components/report/SpiritualReportCard";
import AchievementsGrid from "@/components/achievements/AchievementsGrid";
import { useDharmaPath } from "@/hooks/useDharmaPath";
import { useAuth } from "@/hooks/useAuth";
import { useCheckAchievements } from "@/hooks/useAchievements";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Compass, Loader2, LogIn, Award } from "lucide-react";

const DharmaPath = () => {
  const { user, loading: authLoading } = useAuth();
  const { dharmaPath, loading, updateSpiritualProfile } = useDharmaPath();
  const checkAchievements = useCheckAchievements();

  // Check for new achievements when the page loads
  useEffect(() => {
    if (user && !loading) {
      checkAchievements.mutate();
    }
  }, [user, loading]);

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-md mx-auto text-center"
          >
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center">
              <Compass className="h-10 w-10 text-primary" />
            </div>
            <h1 className="text-3xl font-serif text-primary mb-4">
              Your Dharma Path
            </h1>
            <p className="text-muted-foreground mb-8">
              Sign in to track your spiritual journey, reading progress, and practice achievements.
            </p>
            <Button asChild size="lg">
              <Link to="/">
                <LogIn className="h-4 w-4 mr-2" />
                Sign In to Continue
              </Link>
            </Button>
          </motion.div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Compass className="h-4 w-4 text-primary" />
            <span className="text-sm text-primary font-medium">Personal Dashboard</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-serif text-primary mb-4">
            Your Dharma Path
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Track your spiritual journey, scripture reading, and sadhana practice in one place.
          </p>
        </motion.div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {/* Streak Tracker */}
          <StreakTracker
            currentStreak={dharmaPath?.currentStreak || 0}
            longestStreak={dharmaPath?.longestStreak || 0}
          />

          {/* Spiritual Profile */}
          <SpiritualProfile
            ishtaDevata={dharmaPath?.ishta_devata || null}
            spiritualGoals={dharmaPath?.spiritual_goals || []}
            bio={dharmaPath?.bio || null}
            onUpdate={updateSpiritualProfile}
          />

          {/* Practice Achievements */}
          <PracticeAchievements
            totalPracticeMinutes={dharmaPath?.totalPracticeMinutes || 0}
            totalMantras={dharmaPath?.totalMantras || 0}
            currentStreak={dharmaPath?.currentStreak || 0}
            longestStreak={dharmaPath?.longestStreak || 0}
          />

          {/* Sankalpa Tracker */}
          <SankalpaTracker />

          {/* Upcoming Events */}
          <UpcomingEvents />

          {/* Spiritual Report Card */}
          <SpiritualReportCard />

          {/* Achievements Grid - Full Width */}
          <div className="lg:col-span-2 xl:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-primary" />
                  Your Achievements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <AchievementsGrid />
              </CardContent>
            </Card>
          </div>

          {/* Reading Progress - Full Width */}
          <div className="lg:col-span-2 xl:col-span-3">
            <ReadingProgress progress={dharmaPath?.readingProgress || []} />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default DharmaPath;
