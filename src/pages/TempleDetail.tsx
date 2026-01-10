import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  MapPin, 
  Clock, 
  Calendar, 
  BookOpen, 
  ArrowLeft,
  Plane,
  Train,
  Car,
  Shirt
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { getTempleById } from "@/data/temples";

const TempleDetail = () => {
  const { id } = useParams<{ id: string }>();
  const temple = id ? getTempleById(id) : undefined;

  if (!temple) {
    return (
      <main className="min-h-screen bg-background">
        <Header />
        <div className="pt-32 pb-20 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-display text-3xl text-foreground mb-4">Temple Not Found</h1>
            <p className="font-body text-muted-foreground mb-8">
              The sacred place you're looking for doesn't exist in our records.
            </p>
            <Button variant="sacred" asChild>
              <Link to="/temples">View All Temples</Link>
            </Button>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6 relative">
        <div className="absolute inset-0 bg-yantra-pattern opacity-[0.02]" />
        <div className="max-w-4xl mx-auto relative z-10">
          {/* Back link */}
          <Link 
            to="/temples" 
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-gold transition-colors mb-8 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="font-display text-sm tracking-[0.1em] uppercase">All Temples</span>
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="font-sanskrit text-2xl text-gold/70 mb-4">
              {temple.sanskritName}
            </p>
            <h1 className="font-display text-4xl md:text-5xl font-light tracking-[0.05em] text-foreground mb-4">
              {temple.name}
            </h1>
            
            <div className="flex flex-wrap items-center gap-6 text-muted-foreground mb-8">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-gold" />
                <span className="font-body">
                  {temple.location.city}, {temple.location.state}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-gold" />
                <span className="font-body">{temple.timings}</span>
              </div>
            </div>

            <p className="font-body text-lg text-foreground/90 leading-relaxed">
              {temple.description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="px-6 pb-20">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left Column - Main content */}
            <div className="lg:col-span-2 space-y-12">
              {/* History */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h2 className="font-display text-2xl text-foreground mb-4 flex items-center gap-3">
                  <span className="w-8 h-px bg-gold" />
                  History
                </h2>
                <p className="font-body text-foreground/80 leading-relaxed">
                  {temple.history}
                </p>
              </motion.div>

              {/* Architecture */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h2 className="font-display text-2xl text-foreground mb-4 flex items-center gap-3">
                  <span className="w-8 h-px bg-gold" />
                  Architecture
                </h2>
                <p className="font-body text-foreground/80 leading-relaxed">
                  {temple.architecture}
                </p>
              </motion.div>

              {/* Legends */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h2 className="font-display text-2xl text-foreground mb-4 flex items-center gap-3">
                  <span className="w-8 h-px bg-gold" />
                  Legends & Lore
                </h2>
                <ul className="space-y-4">
                  {temple.legends.map((legend, index) => (
                    <li key={index} className="flex gap-3">
                      <span className="text-gold font-display text-lg">•</span>
                      <p className="font-body text-foreground/80 leading-relaxed">
                        {legend}
                      </p>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Festivals */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h2 className="font-display text-2xl text-foreground mb-6 flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-gold" />
                  Festivals
                </h2>
                <div className="space-y-6">
                  {temple.festivals.map((festival, index) => (
                    <div 
                      key={index} 
                      className="border-l-2 border-gold/30 pl-6 hover:border-gold transition-colors"
                    >
                      <div className="flex items-baseline gap-3 mb-2">
                        <h3 className="font-display text-lg text-foreground">
                          {festival.name}
                        </h3>
                        <span className="text-sm text-gold/70 font-body">
                          {festival.month}
                        </span>
                      </div>
                      <p className="font-body text-muted-foreground text-sm">
                        {festival.description}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* How to Reach */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h2 className="font-display text-2xl text-foreground mb-6 flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-gold" />
                  How to Reach
                </h2>
                <div className="space-y-4">
                  <div className="flex gap-4 items-start">
                    <Plane className="w-5 h-5 text-gold/70 mt-1" />
                    <div>
                      <p className="font-display text-sm tracking-[0.1em] uppercase text-muted-foreground mb-1">
                        By Air
                      </p>
                      <p className="font-body text-foreground/80">{temple.howToReach.byAir}</p>
                    </div>
                  </div>
                  <div className="flex gap-4 items-start">
                    <Train className="w-5 h-5 text-gold/70 mt-1" />
                    <div>
                      <p className="font-display text-sm tracking-[0.1em] uppercase text-muted-foreground mb-1">
                        By Train
                      </p>
                      <p className="font-body text-foreground/80">{temple.howToReach.byTrain}</p>
                    </div>
                  </div>
                  <div className="flex gap-4 items-start">
                    <Car className="w-5 h-5 text-gold/70 mt-1" />
                    <div>
                      <p className="font-display text-sm tracking-[0.1em] uppercase text-muted-foreground mb-1">
                        By Road
                      </p>
                      <p className="font-body text-foreground/80">{temple.howToReach.byRoad}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right Column - Sidebar */}
            <div className="space-y-8">
              {/* Quick Info Card */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="bg-card border border-border p-6 sticky top-24"
              >
                <h3 className="font-display text-lg text-foreground mb-6 pb-4 border-b border-border">
                  Visitor Information
                </h3>

                <div className="space-y-5">
                  {/* Deity */}
                  <div>
                    <p className="font-display text-xs tracking-[0.15em] uppercase text-muted-foreground mb-1">
                      Presiding Deity
                    </p>
                    <p className="font-body text-foreground">{temple.deity}</p>
                  </div>

                  {/* Significance */}
                  <div>
                    <p className="font-display text-xs tracking-[0.15em] uppercase text-muted-foreground mb-1">
                      Significance
                    </p>
                    <p className="font-body text-foreground text-sm">{temple.significance}</p>
                  </div>

                  {/* Timings */}
                  <div>
                    <p className="font-display text-xs tracking-[0.15em] uppercase text-muted-foreground mb-1">
                      Temple Timings
                    </p>
                    <p className="font-body text-foreground">{temple.timings}</p>
                  </div>

                  {/* Dress Code */}
                  <div className="flex items-start gap-2">
                    <Shirt className="w-4 h-4 text-gold/70 mt-0.5" />
                    <div>
                      <p className="font-display text-xs tracking-[0.15em] uppercase text-muted-foreground mb-1">
                        Dress Code
                      </p>
                      <p className="font-body text-foreground text-sm">{temple.dressCode}</p>
                    </div>
                  </div>
                </div>

                {/* Linked Scriptures */}
                <div className="mt-8 pt-6 border-t border-border">
                  <div className="flex items-center gap-2 mb-4">
                    <BookOpen className="w-4 h-4 text-gold" />
                    <p className="font-display text-xs tracking-[0.15em] uppercase text-muted-foreground">
                      Linked Scriptures
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {temple.linkedScriptures.map((scripture, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-muted text-muted-foreground text-xs font-body border border-border"
                      >
                        {scripture}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default TempleDetail;
