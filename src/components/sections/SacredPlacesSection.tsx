import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { temples } from "@/data/temples";

const SacredPlacesSection = () => {
  // Show first 3 temples as featured
  const featuredTemples = temples.slice(0, 3);

  return (
    <section id="sacred-places" className="py-20 px-6 relative">
      <div className="absolute inset-0 bg-yantra-pattern opacity-[0.02]" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="font-sanskrit text-lg text-gold/70 mb-3">तीर्थयात्रा</p>
          <h2 className="font-display text-3xl md:text-4xl font-light tracking-[0.1em] text-foreground mb-4">
            Sacred Places
          </h2>
          <p className="font-body text-muted-foreground max-w-xl mx-auto">
            Journey through the divine geography of Bharat — temples where the eternal meets the earthly
          </p>
        </motion.div>

        {/* Featured Temples Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {featuredTemples.map((temple, index) => (
            <motion.div
              key={temple.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              viewport={{ once: true }}
            >
              <Link
                to={`/temples/${temple.id}`}
                className="group block bg-card border border-border hover:border-gold/50 transition-all duration-300"
              >
                {/* Image placeholder */}
                <div className="aspect-[4/3] bg-muted relative overflow-hidden">
                  <div className="absolute inset-0 bg-yantra-pattern opacity-10" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <p className="font-sanskrit text-xl text-gold/50">{temple.sanskritName}</p>
                  </div>
                  <div className="absolute inset-0 bg-gold/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="font-display text-lg text-foreground group-hover:text-gold transition-colors mb-1">
                    {temple.name}
                  </h3>
                  <p className="font-body text-sm text-muted-foreground">
                    {temple.location.city}, {temple.location.state}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Button variant="sacred" asChild>
            <Link to="/temples" className="inline-flex items-center gap-2">
              Explore All Sacred Places
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default SacredPlacesSection;
