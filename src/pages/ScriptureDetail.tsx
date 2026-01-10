import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, BookOpen, Layers, MapPin } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ChapterCard from "@/components/scriptures/ChapterCard";
import { getScriptureById } from "@/data/scriptures";
import { temples } from "@/data/temples";

const ScriptureDetail = () => {
  const { scriptureId } = useParams<{ scriptureId: string }>();
  const scripture = scriptureId ? getScriptureById(scriptureId) : undefined;

  if (!scripture) {
    return (
      <main className="min-h-screen bg-background">
        <Header />
        <div className="pt-32 pb-20 px-6 text-center">
          <h1 className="font-display text-3xl text-foreground mb-4">Scripture Not Found</h1>
          <Link to="/scriptures" className="text-gold hover:underline">
            Return to Scripture Library
          </Link>
        </div>
        <Footer />
      </main>
    );
  }

  const linkedTempleData = temples.filter(t => scripture.linkedTemples.includes(t.id));
  const totalVerses = scripture.chapters.reduce((sum, ch) => sum + ch.verseCount, 0);

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
          >
            {/* Back Link */}
            <Link
              to="/scriptures"
              className="inline-flex items-center gap-2 text-gold hover:text-gold/80 transition-colors mb-8 font-body text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              Scripture Library
            </Link>

            {/* Title */}
            <div className="text-center mb-10">
              <p className="font-sanskrit text-2xl text-gold/70 mb-4">{scripture.sanskritName}</p>
              <h1 className="font-display text-4xl md:text-5xl font-light tracking-[0.1em] text-foreground mb-6">
                {scripture.name}
              </h1>
              <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">
                {scripture.description}
              </p>
            </div>

            {/* Stats */}
            <div className="flex justify-center gap-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-gold/60" />
                <span>{scripture.chapters.length} Chapters</span>
              </div>
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-gold/60" />
                <span>{totalVerses} Verses</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Chapters Grid */}
      <section className="px-6 pb-16">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="font-display text-2xl text-foreground mb-6 tracking-[0.05em]">
              Chapters
            </h2>
            <div className="grid grid-cols-1 gap-4">
              {scripture.chapters.map((chapter, index) => (
                <ChapterCard
                  key={chapter.number}
                  chapter={chapter}
                  scriptureId={scripture.id}
                  index={index}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Philosophy Tags */}
      <section className="px-6 pb-16">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <h2 className="font-display text-2xl text-foreground mb-6 tracking-[0.05em]">
              Philosophy & Themes
            </h2>
            <div className="flex flex-wrap gap-3">
              {scripture.philosophyTags.map((tag, i) => (
                <span
                  key={i}
                  className="px-4 py-2 text-sm bg-gold/10 text-gold border border-gold/20 font-body"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Linked Temples */}
      {linkedTempleData.length > 0 && (
        <section className="px-6 pb-20">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <h2 className="font-display text-2xl text-foreground mb-6 tracking-[0.05em]">
                Linked Sacred Places
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {linkedTempleData.map((temple) => (
                  <Link
                    key={temple.id}
                    to={`/temples/${temple.id}`}
                    className="group flex items-center gap-4 p-4 bg-card border border-border hover:border-gold/50 transition-all"
                  >
                    <div className="w-12 h-12 bg-gold/10 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-gold/70" />
                    </div>
                    <div>
                      <h3 className="font-display text-lg text-foreground group-hover:text-gold transition-colors">
                        {temple.name}
                      </h3>
                      <p className="font-body text-sm text-muted-foreground">
                        {temple.location.city}, {temple.location.state}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      )}

      <Footer />
    </main>
  );
};

export default ScriptureDetail;
