import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import VerseCard from "@/components/scriptures/VerseCard";
import { getScriptureById, getChapterByNumber } from "@/data/scriptures";

const ChapterDetail = () => {
  const { scriptureId, chapterNumber } = useParams<{ scriptureId: string; chapterNumber: string }>();
  const scripture = scriptureId ? getScriptureById(scriptureId) : undefined;
  const chapter = scriptureId && chapterNumber 
    ? getChapterByNumber(scriptureId, parseInt(chapterNumber)) 
    : undefined;

  if (!scripture || !chapter) {
    return (
      <main className="min-h-screen bg-background">
        <Header />
        <div className="pt-32 pb-20 px-6 text-center">
          <h1 className="font-display text-3xl text-foreground mb-4">Chapter Not Found</h1>
          <Link to="/scriptures" className="text-gold hover:underline">
            Return to Scripture Library
          </Link>
        </div>
        <Footer />
      </main>
    );
  }

  const prevChapter = chapter.number > 1 ? chapter.number - 1 : null;
  const nextChapter = chapter.number < scripture.chapters.length ? chapter.number + 1 : null;

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
          >
            {/* Back Link */}
            <Link
              to={`/scriptures/${scripture.id}`}
              className="inline-flex items-center gap-2 text-gold hover:text-gold/80 transition-colors mb-8 font-body text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              {scripture.name}
            </Link>

            {/* Title */}
            <div className="text-center mb-8">
              <p className="font-display text-sm text-gold tracking-[0.2em] uppercase mb-3">
                Chapter {chapter.number}
              </p>
              <p className="font-sanskrit text-xl text-gold/70 mb-3">{chapter.sanskritName}</p>
              <h1 className="font-display text-3xl md:text-4xl font-light tracking-[0.1em] text-foreground mb-6">
                {chapter.name}
              </h1>
              <p className="font-body text-muted-foreground max-w-2xl mx-auto">
                {chapter.summary}
              </p>
            </div>

            {/* Themes */}
            <div className="flex flex-wrap justify-center gap-2">
              {chapter.themes.map((theme, i) => (
                <span
                  key={i}
                  className="px-3 py-1 text-xs bg-gold/10 text-gold/80 border border-gold/20 font-body"
                >
                  {theme}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Verses */}
      <section className="px-6 pb-12">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="font-body text-sm text-muted-foreground mb-6">
              Showing {chapter.verses.length} of {chapter.verseCount} verses
            </p>
            <div className="space-y-4">
              {chapter.verses.map((verse, index) => (
                <VerseCard
                  key={verse.number}
                  verse={verse}
                  chapterNumber={chapter.number}
                  index={index}
                />
              ))}
            </div>

            {chapter.verses.length < chapter.verseCount && (
              <div className="mt-8 p-6 border border-dashed border-border text-center">
                <p className="font-body text-muted-foreground">
                  More verses coming soon...
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Chapter Navigation */}
      <section className="px-6 pb-20">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center border-t border-border pt-8">
            {prevChapter ? (
              <Link
                to={`/scriptures/${scripture.id}/chapter/${prevChapter}`}
                className="flex items-center gap-2 text-gold hover:text-gold/80 transition-colors font-body text-sm"
              >
                <ChevronLeft className="w-4 h-4" />
                Chapter {prevChapter}
              </Link>
            ) : (
              <div />
            )}
            
            {nextChapter && (
              <Link
                to={`/scriptures/${scripture.id}/chapter/${nextChapter}`}
                className="flex items-center gap-2 text-gold hover:text-gold/80 transition-colors font-body text-sm"
              >
                Chapter {nextChapter}
                <ChevronRight className="w-4 h-4" />
              </Link>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default ChapterDetail;
