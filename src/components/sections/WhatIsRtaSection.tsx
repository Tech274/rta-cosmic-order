import { motion } from "framer-motion";

const WhatIsRtaSection = () => {
  return (
    <section className="py-24 px-6 border-t border-border">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-display text-sm tracking-[0.3em] text-gold uppercase mb-8">
            What is ṚTA?
          </h2>
          
          <div className="space-y-6 font-body text-lg leading-relaxed text-muted-foreground">
            <p>
              <span className="text-foreground font-medium">ṚTA</span> is the Vedic concept of cosmic order — 
              the invisible principle that governs the movement of the sun, the rhythm of seasons, 
              the structure of sacrifice, and the moral architecture of human life.
            </p>
            
            <p>
              Before Dharma was codified, there was ṚTA. It is the order behind the order.
            </p>
            
            <p>
              This platform exists not to preach a single truth, but to preserve the plurality of 
              how India has thought about reality, suffering, liberation, and the nature of existence 
              for over three millennia. We curate. We organise. We do not conclude.
            </p>
            
            <blockquote className="border-l-2 border-gold pl-6 my-8 italic text-foreground">
              "That which is, the wise call by many names."
              <footer className="text-sm text-muted-foreground mt-2 not-italic">— Ṛgveda 1.164.46</footer>
            </blockquote>
            
            <p>
              ṚTA is a civilisational archive — a space for serious inquiry into the foundations 
              of Hindu metaphysics, ethics, and spiritual practice across all its contradictions 
              and schools.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhatIsRtaSection;
