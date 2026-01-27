import { motion } from "framer-motion";
import InteractiveQuestion from "@/components/questions/InteractiveQuestion";
import { philosophicalQuestions } from "@/data/questionsData";

const QuestionsSection = () => {
  return (
    <section className="py-24 px-6 bg-card">
      <div className="max-w-4xl mx-auto">
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
            Click to unfold the wisdom within.
          </p>
        </motion.div>

        <div className="space-y-4">
          {philosophicalQuestions.map((question, index) => (
            <InteractiveQuestion
              key={question.id}
              question={question}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default QuestionsSection;
