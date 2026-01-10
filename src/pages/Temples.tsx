import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TempleCard from "@/components/temples/TempleCard";
import TempleFilters from "@/components/temples/TempleFilters";
import { temples } from "@/data/temples";

const Temples = () => {
  const [selectedState, setSelectedState] = useState("all");
  const [selectedDeity, setSelectedDeity] = useState("all");

  const filteredTemples = useMemo(() => {
    return temples.filter((temple) => {
      const stateMatch =
        selectedState === "all" || temple.location.state === selectedState;
      const deityMatch =
        selectedDeity === "all" ||
        temple.deity.toLowerCase().includes(selectedDeity.toLowerCase());
      return stateMatch && deityMatch;
    });
  }, [selectedState, selectedDeity]);

  return (
    <main className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6 relative">
        <div className="absolute inset-0 bg-yantra-pattern opacity-[0.02]" />
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <p className="font-sanskrit text-xl text-gold/70 mb-4">
              तीर्थयात्रा
            </p>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-light tracking-[0.1em] text-foreground mb-6">
              Sacred Places
            </h1>
            <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore the divine geography of Bharat — temples, tirthas, and holy sites 
              where the eternal intersects with the earthly realm.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters & Grid */}
      <section className="px-6 pb-20">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-10"
          >
            <TempleFilters
              selectedState={selectedState}
              selectedDeity={selectedDeity}
              onStateChange={setSelectedState}
              onDeityChange={setSelectedDeity}
            />
          </motion.div>

          {/* Results count */}
          <p className="font-body text-sm text-muted-foreground mb-8">
            Showing {filteredTemples.length} sacred {filteredTemples.length === 1 ? "place" : "places"}
          </p>

          {/* Temple Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTemples.map((temple, index) => (
              <TempleCard key={temple.id} temple={temple} index={index} />
            ))}
          </div>

          {/* Empty state */}
          {filteredTemples.length === 0 && (
            <div className="text-center py-20">
              <p className="font-display text-xl text-muted-foreground">
                No temples found for the selected filters
              </p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Temples;
