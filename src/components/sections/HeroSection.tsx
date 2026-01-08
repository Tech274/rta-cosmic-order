import { motion } from "framer-motion";
import RtaLogo from "@/components/RtaLogo";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-6 py-20 relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-yantra-pattern opacity-[0.03]" />
      
      <motion.div
        className="text-center max-w-3xl mx-auto relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <RtaLogo className="text-gold mx-auto mb-10" size={160} />
        
        <motion.h1
          className="font-display text-5xl md:text-7xl lg:text-8xl font-light tracking-[0.25em] mb-4 text-foreground"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          ṚTA
        </motion.h1>
        
        <motion.p
          className="font-display text-lg md:text-xl tracking-[0.15em] text-gold mb-6 uppercase"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7 }}
        >
          The Order Behind Dharma
        </motion.p>
        
        <motion.p
          className="font-body text-base md:text-lg text-muted-foreground max-w-lg mx-auto mb-10 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9 }}
        >
          A curated archive of Hindu philosophy, paradox, and civilisational memory
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.1 }}
        >
          <Button variant="sacred" size="lg">
            Begin Exploring
          </Button>
        </motion.div>
      </motion.div>

      {/* Decorative scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ duration: 1, delay: 2 }}
      >
        <div className="w-px h-12 bg-gradient-to-b from-gold to-transparent" />
      </motion.div>
    </section>
  );
};

export default HeroSection;
