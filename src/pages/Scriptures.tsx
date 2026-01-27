import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScriptureCard from "@/components/scriptures/ScriptureCard";
import { scriptures } from "@/data/scriptures";
import { tantraCategories } from "@/data/tantraScriptures";
import { Sparkles } from "lucide-react";

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

      {/* Main Scriptures */}
      <section className="px-6 pb-12">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="font-display text-sm tracking-[0.3em] text-gold uppercase mb-6">
              Vedānta & Itihāsa
            </h2>
            <p className="font-body text-sm text-muted-foreground mb-8">
              {scriptures.length} {scriptures.length === 1 ? "scripture" : "scriptures"} available
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {scriptures.map((scripture, index) => (
                <ScriptureCard key={scripture.id} scripture={scripture} index={index} />
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Tantra Section */}
      <section className="px-6 py-12 bg-card">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <Sparkles className="w-5 h-5 text-gold" />
              <h2 className="font-display text-sm tracking-[0.3em] text-gold uppercase">
                Tantra
              </h2>
            </div>
            <p className="font-body text-muted-foreground mb-8 max-w-2xl">
              The esoteric traditions of Shakta worship, exploring the divine feminine 
              through the Mahavidyas and sacred practices.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tantraCategories.map((category, index) => (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Link
                    to={`/scriptures/tantra/${category.id}`}
                    className="group block bg-background border border-border hover:border-gold/50 transition-all duration-300"
                  >
                    <div className="aspect-[16/9] bg-gradient-to-br from-muted to-background relative overflow-hidden">
                      <div className="absolute inset-0 bg-yantra-pattern opacity-20" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                          <p className="font-sanskrit text-2xl text-gold/70 mb-2">
                            {category.sanskritName}
                          </p>
                          <p className="font-display text-lg text-foreground">
                            {category.name}
                          </p>
                        </div>
                      </div>
                      <div className="absolute inset-0 bg-gold/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    <div className="p-4">
                      <p className="font-body text-sm text-muted-foreground line-clamp-2">
                        {category.description}
                      </p>
                      <p className="text-xs text-gold mt-3">
                        {category.articles.length} articles →
                      </p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Coming Soon */}
      <section className="px-6 py-12">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="p-8 border border-dashed border-border text-center"
          >
            <p className="font-sanskrit text-xl text-gold/50 mb-2">आगामी</p>
            <p className="font-display text-lg text-muted-foreground mb-2">More Scriptures Coming Soon</p>
            <p className="font-body text-sm text-muted-foreground/70">
              Ramayana • Mahabharata • Upanishads • Vedas • Puranas
            </p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Scriptures;
