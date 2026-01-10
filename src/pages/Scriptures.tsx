import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScriptureCard from "@/components/scriptures/ScriptureCard";
import { scriptures } from "@/data/scriptures";

const Scriptures = () => {
  return (
    <main className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6 relative">
        <div className="absolute inset-0 bg-yantra-pattern opacity-[0.02]" />
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <p className="font-sanskrit text-xl text-gold/70 mb-4">
              शास्त्र
            </p>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-light tracking-[0.1em] text-foreground mb-6">
              Scripture Library
            </h1>
            <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore the eternal wisdom of Sanātana Dharma through structured, searchable 
              texts with Sanskrit, transliteration, and profound meanings.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Scripture Grid */}
      <section className="px-6 pb-20">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="font-body text-sm text-muted-foreground mb-8">
              {scriptures.length} {scriptures.length === 1 ? "scripture" : "scriptures"} available
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {scriptures.map((scripture, index) => (
                <ScriptureCard key={scripture.id} scripture={scripture} index={index} />
              ))}
            </div>

            {/* Coming Soon */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-12 p-8 border border-dashed border-border text-center"
            >
              <p className="font-sanskrit text-xl text-gold/50 mb-2">आगामी</p>
              <p className="font-display text-lg text-muted-foreground mb-2">More Scriptures Coming Soon</p>
              <p className="font-body text-sm text-muted-foreground/70">
                Ramayana • Mahabharata • Upanishads • Vedas • Puranas
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Scriptures;
