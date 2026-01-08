import { motion } from "framer-motion";

const schools = [
  { name: "Advaita Vedānta", description: "Non-dual reality — Brahman alone is real" },
  { name: "Dvaita Vedānta", description: "Eternal distinction between soul and God" },
  { name: "Yoga", description: "Discipline of mind, body, and liberation" },
  { name: "Sāṅkhya", description: "Dualism of consciousness and matter" },
  { name: "Nyāya", description: "Logic, epistemology, and valid knowledge" },
  { name: "Vaiśeṣika", description: "Atomism and categories of reality" },
  { name: "Mīmāṃsā", description: "Ritual hermeneutics and Vedic interpretation" },
  { name: "Tantra", description: "Sacred technology and embodied liberation" },
];

const SchoolsSection = () => {
  return (
    <section className="py-24 px-6 border-t border-border">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-sm tracking-[0.3em] text-gold uppercase mb-4">
            Schools of Thought
          </h2>
          <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">
            Hindu philosophy is not monolithic. It is a constellation of rigorous, often contradictory, 
            systems of thought.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {schools.map((school, index) => (
            <motion.div
              key={school.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="group"
            >
              <div className="p-6 border border-border hover:border-gold/30 hover:bg-card transition-all duration-500 cursor-pointer">
                <h3 className="font-display text-lg text-foreground mb-2 group-hover:text-gold transition-colors">
                  {school.name}
                </h3>
                <p className="font-body text-sm text-muted-foreground leading-relaxed">
                  {school.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SchoolsSection;
