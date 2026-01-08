import { motion } from "framer-motion";

const questions = [
  { question: "Who am I?", sanskrit: "कोऽहम्", description: "The inquiry into Self, Ātman, and identity" },
  { question: "What is Dharma?", sanskrit: "धर्मः किम्", description: "Cosmic law, ethics, and righteous conduct" },
  { question: "What is Moksha?", sanskrit: "मोक्षः किम्", description: "Liberation from the cycle of existence" },
  { question: "What is Karma?", sanskrit: "कर्म किम्", description: "Action, consequence, and cosmic justice" },
  { question: "What is Suffering?", sanskrit: "दुःखम् किम्", description: "The nature of pain and its transcendence" },
  { question: "What is Reality?", sanskrit: "सत्यं किम्", description: "The metaphysics of existence and illusion" },
];

const QuestionsSection = () => {
  return (
    <section className="py-24 px-6 bg-card">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-sm tracking-[0.3em] text-gold uppercase mb-4">
            Explore by Questions
          </h2>
          <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">
            Philosophy begins with inquiry. Enter through the questions that have shaped Hindu thought.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {questions.map((item, index) => (
            <motion.div
              key={item.question}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="group p-8 border border-border hover:border-gold/50 transition-all duration-500 cursor-pointer h-full bg-background">
                <p className="font-sanskrit text-2xl text-gold/70 mb-3">{item.sanskrit}</p>
                <h3 className="font-display text-xl text-foreground mb-3 group-hover:text-gold transition-colors">
                  {item.question}
                </h3>
                <p className="font-body text-sm text-muted-foreground">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default QuestionsSection;
