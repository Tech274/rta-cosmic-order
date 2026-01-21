import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { RefreshCw, BookOpen, Share2, Volume2, Copy, Check } from "lucide-react";
import { getVerseOfDay, getRandomVerse, type VerseOfDay } from "@/data/verseOfDay";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const VerseOfDaySection = () => {
  const [verse, setVerse] = useState<VerseOfDay>(getVerseOfDay());
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setVerse(getRandomVerse());
      setIsRefreshing(false);
    }, 500);
  };

  const handleCopy = async () => {
    const text = `${verse.verse.sanskrit}\n\n${verse.verse.transliteration}\n\n"${verse.verse.meaning}"\n\n— ${verse.source}`;
    await navigator.clipboard.writeText(text);
    setCopied(true);
    toast.success("Verse copied to clipboard");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = async () => {
    const text = `"${verse.verse.meaning}"\n\n— ${verse.source}\n\nFrom ṚTA: The Order Behind Dharma`;
    
    if (navigator.share) {
      try {
        await navigator.share({ text, title: "Verse of the Day" });
      } catch (err) {
        handleCopy();
      }
    } else {
      handleCopy();
    }
  };

  const handleSpeak = () => {
    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(verse.verse.meaning);
    utterance.rate = 0.85;
    utterance.onend = () => setIsPlaying(false);
    setIsPlaying(true);
    window.speechSynthesis.speak(utterance);
  };

  useEffect(() => {
    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  return (
    <section className="py-20 px-6 relative overflow-hidden">
      {/* Subtle background */}
      <div className="absolute inset-0 bg-yantra-pattern opacity-[0.02]" />
      
      <div className="max-w-4xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-10"
        >
          <p className="font-sanskrit text-lg text-gold/70 mb-2">श्लोक</p>
          <h2 className="font-display text-3xl md:text-4xl font-light tracking-[0.1em] text-foreground">
            Verse of the Day
          </h2>
        </motion.div>

        {/* Verse Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          {/* Decorative corner elements */}
          <div className="absolute -top-2 -left-2 w-8 h-8 border-l-2 border-t-2 border-gold/30" />
          <div className="absolute -top-2 -right-2 w-8 h-8 border-r-2 border-t-2 border-gold/30" />
          <div className="absolute -bottom-2 -left-2 w-8 h-8 border-l-2 border-b-2 border-gold/30" />
          <div className="absolute -bottom-2 -right-2 w-8 h-8 border-r-2 border-b-2 border-gold/30" />

          <div className="bg-card border border-border p-8 md:p-12">
            {/* Scripture Source */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="font-sanskrit text-sm text-gold/70">{verse.scriptureSanskrit}</p>
                <p className="font-display text-sm text-muted-foreground">{verse.source}</p>
              </div>
              <motion.button
                onClick={handleRefresh}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                animate={{ rotate: isRefreshing ? 360 : 0 }}
                transition={{ duration: 0.5 }}
                className="p-2 text-muted-foreground hover:text-gold transition-colors"
                title="Get another verse"
              >
                <RefreshCw className="w-5 h-5" />
              </motion.button>
            </div>

            {/* Sanskrit Verse */}
            <motion.div
              key={verse.id + "-sanskrit"}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-6"
            >
              <p className="font-sanskrit text-xl md:text-2xl text-gold leading-relaxed text-center">
                {verse.verse.sanskrit}
              </p>
            </motion.div>

            {/* Transliteration */}
            <motion.div
              key={verse.id + "-trans"}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-6"
            >
              <p className="font-body text-sm md:text-base text-muted-foreground italic text-center leading-relaxed">
                {verse.verse.transliteration}
              </p>
            </motion.div>

            {/* Divider */}
            <div className="flex items-center justify-center gap-4 my-8">
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-gold/30" />
              <span className="text-gold/50">॥</span>
              <div className="h-px w-16 bg-gradient-to-l from-transparent to-gold/30" />
            </div>

            {/* Meaning */}
            <motion.div
              key={verse.id + "-meaning"}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-6"
            >
              <p className="font-body text-lg md:text-xl text-foreground text-center leading-relaxed">
                "{verse.verse.meaning}"
              </p>
            </motion.div>

            {/* Commentary */}
            {verse.verse.commentary && (
              <motion.div
                key={verse.id + "-commentary"}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="mt-6 pt-6 border-t border-border"
              >
                <p className="font-body text-sm text-muted-foreground text-center italic">
                  {verse.verse.commentary}
                </p>
              </motion.div>
            )}

            {/* Actions */}
            <div className="flex items-center justify-center gap-3 mt-8">
              <Button
                variant="outline"
                size="sm"
                onClick={handleSpeak}
                className={`gap-2 ${isPlaying ? 'text-gold border-gold/50' : ''}`}
              >
                <Volume2 className="w-4 h-4" />
                {isPlaying ? 'Stop' : 'Listen'}
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={handleCopy}
                className="gap-2"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied ? 'Copied' : 'Copy'}
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={handleShare}
                className="gap-2"
              >
                <Share2 className="w-4 h-4" />
                Share
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Link to scriptures */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mt-8"
        >
          <a 
            href="/scriptures" 
            className="inline-flex items-center gap-2 font-display text-sm tracking-wider text-muted-foreground hover:text-gold transition-colors"
          >
            <BookOpen className="w-4 h-4" />
            Explore Scripture Library
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default VerseOfDaySection;
