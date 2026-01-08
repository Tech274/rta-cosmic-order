import { motion } from "framer-motion";

const CuratorSection = () => {
  return (
    <section className="py-24 px-6 bg-card border-t border-border">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-display text-sm tracking-[0.3em] text-gold uppercase mb-8">
            Curator's Note
          </h2>
          
          <div className="space-y-6 font-body text-lg leading-relaxed text-muted-foreground">
            <p>
              I am not a guru. I am not an ācārya. I do not possess the truth, 
              nor do I claim lineage or authority.
            </p>
            
            <p>
              I am a <span className="text-foreground">curator</span> — one who selects, 
              organises, and preserves. My role is to hold space for the plurality of 
              Hindu thought without collapsing it into a single narrative.
            </p>
            
            <p>
              ṚTA exists because the intellectual tradition of Dharma deserves a 
              home that is neither political nor devotional, neither academic nor populist — 
              but deeply serious about the questions that have shaped a civilisation.
            </p>
            
            <p className="text-foreground italic">
              May this archive serve those who seek.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CuratorSection;
