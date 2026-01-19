import { useState } from "react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import JapaCounter from "@/components/sadhana/JapaCounter";
import MeditationTimer from "@/components/sadhana/MeditationTimer";
import PracticeStats from "@/components/sadhana/PracticeStats";
import RecentSessions from "@/components/sadhana/RecentSessions";
import SankalpaTracker from "@/components/sadhana/SankalpaTracker";
import PanchangCalendar from "@/components/panchang/PanchangCalendar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
const Sadhana = () => {
  const [activeTab, setActiveTab] = useState("japa");

  return (
    <main className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6 relative">
        <div className="absolute inset-0 bg-yantra-pattern opacity-[0.02]" />
        <div className="max-w-4xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <p className="font-sanskrit text-xl text-gold/70 mb-4">साधना</p>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-light tracking-[0.1em] text-foreground mb-6">
              Sadhana Engine
            </h1>
            <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">
              Your daily spiritual practice companion. Count japa, time meditation, 
              and track your progress on the path of dharma.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="px-6 pb-12">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <PracticeStats />
          </motion.div>
        </div>
      </section>

      {/* Practice Tools */}
      <section className="px-6 pb-12">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="w-full mb-8 bg-card border border-border">
                <TabsTrigger
                  value="japa"
                  className="flex-1 data-[state=active]:bg-gold/20 data-[state=active]:text-gold"
                >
                  📿 Japa Counter
                </TabsTrigger>
                <TabsTrigger
                  value="meditation"
                  className="flex-1 data-[state=active]:bg-gold/20 data-[state=active]:text-gold"
                >
                  🧘 Meditation
                </TabsTrigger>
              </TabsList>

              <TabsContent value="japa">
                <JapaCounter />
              </TabsContent>

              <TabsContent value="meditation">
                <MeditationTimer />
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </section>

      {/* Sankalpa & Panchang Section */}
      <section className="px-6 pb-12">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6"
          >
            <SankalpaTracker />
            <PanchangCalendar />
          </motion.div>
        </div>
      </section>

      {/* Recent Sessions */}
      <section className="px-6 pb-20">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <RecentSessions />
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Sadhana;
