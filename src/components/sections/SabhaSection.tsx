import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import AuthModal from "@/components/auth/AuthModal";

const halls = [
  { name: "Tattva", description: "Metaphysics and the nature of reality" },
  { name: "Dharma", description: "Ethics, duty, and righteous living" },
  { name: "Saṃvāda", description: "Debate, dialogue, and contradictions" },
];

const levels = [
  { name: "Seeker", karma: 0 },
  { name: "Questioner", karma: 100 },
  { name: "Reader", karma: 300 },
  { name: "Debater", karma: 800 },
  { name: "Interpreter", karma: 2000 },
  { name: "Scholar", karma: 5000 },
  { name: "Guardian", karma: 10000 },
];

const SabhaSection = () => {
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const { user, profile } = useAuth();

  const currentLevelIndex = levels.findIndex(
    (l) => l.name.toLowerCase() === profile?.membership_level
  );

  return (
    <section id="sabha" className="py-24 px-6 border-t border-border">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-sm tracking-[0.3em] text-gold uppercase mb-4">
            The Sabhā
          </h2>
          <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">
            A moderated assembly for philosophical discourse. Not a forum for opinions — 
            a space for knowledge-rooted dialogue.
          </p>
          {user && profile && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 inline-flex items-center gap-4 px-6 py-3 border border-gold/30"
            >
              <span className="font-body text-sm text-muted-foreground">Your Status:</span>
              <span className="font-display text-gold">{levels[currentLevelIndex]?.name || "Seeker"}</span>
              <span className="text-muted-foreground">|</span>
              <span className="font-body text-sm text-muted-foreground">Karma:</span>
              <span className="font-display text-foreground">{profile.karma}</span>
            </motion.div>
          )}
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 mb-16">
          {/* Three Halls */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="font-display text-xs tracking-[0.2em] text-muted-foreground uppercase mb-6">
              Three Halls
            </h3>
            <div className="space-y-4">
              {halls.map((hall) => (
                <div key={hall.name} className="p-4 border border-border">
                  <h4 className="font-display text-lg text-foreground mb-1">{hall.name}</h4>
                  <p className="font-body text-sm text-muted-foreground">{hall.description}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Seven Levels */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3 className="font-display text-xs tracking-[0.2em] text-muted-foreground uppercase mb-6">
              Seven Levels of Membership
            </h3>
            <div className="space-y-2">
              {levels.map((level, index) => {
                const isCurrentLevel = index === currentLevelIndex;
                const isUnlocked = user && index <= currentLevelIndex;

                return (
                  <div 
                    key={level.name} 
                    className={`flex items-center gap-4 p-3 border transition-colors ${
                      isCurrentLevel
                        ? "border-gold bg-gold/5"
                        : isUnlocked
                        ? "border-border"
                        : "border-border opacity-50"
                    }`}
                  >
                    <span className={`font-display text-sm w-6 ${isCurrentLevel ? "text-gold" : "text-gold/50"}`}>
                      {index + 1}
                    </span>
                    <span className={`font-body flex-1 ${isCurrentLevel ? "text-foreground" : "text-foreground/70"}`}>
                      {level.name}
                    </span>
                    <span className="font-body text-xs text-muted-foreground">
                      {level.karma}+ karma
                    </span>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* Four Laws */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <h3 className="font-display text-xs tracking-[0.2em] text-muted-foreground uppercase mb-6 text-center">
            Four Laws of the Sabhā
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              "Speak from knowledge",
              "Disagree without contempt",
              "No identity politics",
              "Dharma above ego",
            ].map((law, index) => (
              <div key={law} className="p-4 border border-border text-center">
                <span className="font-display text-gold text-lg block mb-2">{index + 1}</span>
                <p className="font-body text-sm text-foreground">{law}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center"
        >
          {user ? (
            <p className="font-body text-muted-foreground">
              Welcome to the Sabhā, {profile?.display_name || "Seeker"}.
            </p>
          ) : (
            <Button variant="outline" size="lg" onClick={() => setAuthModalOpen(true)}>
              Enter the Sabhā
            </Button>
          )}
        </motion.div>
      </div>

      <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />
    </section>
  );
};

export default SabhaSection;
