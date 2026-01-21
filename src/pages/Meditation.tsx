import { useState } from "react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MeditationLibrary from "@/components/meditation/MeditationLibrary";
import GuidedMeditationSession from "@/components/meditation/GuidedMeditationSession";
import { type MeditationTechnique } from "@/data/meditationTechniques";

const Meditation = () => {
  const [selectedTechnique, setSelectedTechnique] = useState<MeditationTechnique | null>(null);

  return (
    <main className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-12 px-6 relative">
        <div className="absolute inset-0 bg-yantra-pattern opacity-[0.02]" />
        <div className="max-w-4xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-8"
          >
            <p className="font-sanskrit text-xl text-gold/70 mb-4">ध्यान</p>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-light tracking-[0.1em] text-foreground mb-6">
              {selectedTechnique ? selectedTechnique.name : 'Meditation Library'}
            </h1>
            <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">
              {selectedTechnique 
                ? selectedTechnique.description 
                : 'Explore sacred meditation techniques from the Yogic and Vedantic traditions. Each practice is a doorway to inner stillness and self-realization.'
              }
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="px-6 pb-20">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {selectedTechnique ? (
              <GuidedMeditationSession
                technique={selectedTechnique}
                onBack={() => setSelectedTechnique(null)}
                onComplete={() => {}}
              />
            ) : (
              <MeditationLibrary onSelectTechnique={setSelectedTechnique} />
            )}
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Meditation;
