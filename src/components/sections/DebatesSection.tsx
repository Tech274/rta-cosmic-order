import { motion } from "framer-motion";

const debates = [
  {
    title: "Violence vs Ahiṃsā",
    description: "When Arjuna hesitated, Kṛṣṇa spoke of righteous war. When Mahāvīra walked, he swept the ground before him. Hindu thought holds both.",
  },
  {
    title: "Fate vs Free Will",
    description: "Is karma destiny or consequence? Can human effort override cosmic decree? The tension between prārabdha and puruṣakāra.",
  },
  {
    title: "God vs No-God",
    description: "Theistic devotion in Bhakti, atheistic discipline in Sāṅkhya, non-dual transcendence in Advaita. All Hindu. All valid.",
  },
  {
    title: "Ritual vs Knowledge",
    description: "The Mīmāṃsā defended ritual action as the path. The Upaniṣads declared knowledge alone liberates. This debate shaped the tradition.",
  },
];

const DebatesSection = () => {
  return (
    <section className="py-24 px-6 bg-card">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-sm tracking-[0.3em] text-gold uppercase mb-4">
            Civilisational Debates
          </h2>
          <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">
            Hindu thought has never been afraid of contradiction. These are the tensions 
            that have been debated for millennia — without resolution.
          </p>
        </motion.div>

        <div className="space-y-6">
          {debates.map((debate, index) => (
            <motion.div
              key={debate.title}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="group p-8 border border-border hover:border-gold/30 bg-background transition-all duration-500 cursor-pointer">
                <h3 className="font-display text-xl text-foreground mb-3 group-hover:text-gold transition-colors">
                  {debate.title}
                </h3>
                <p className="font-body text-muted-foreground leading-relaxed">
                  {debate.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DebatesSection;
