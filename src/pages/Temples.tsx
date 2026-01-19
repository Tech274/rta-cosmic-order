import { useState, useMemo, Suspense, lazy } from "react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TempleCard from "@/components/temples/TempleCard";
import TempleFilters from "@/components/temples/TempleFilters";
import { temples } from "@/data/temples";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Map, Grid3X3, Loader2 } from "lucide-react";

// Lazy load the map component to avoid SSR issues with Leaflet
const TempleMap = lazy(() => import("@/components/temples/TempleMap"));

const Temples = () => {
  const [selectedState, setSelectedState] = useState("all");
  const [selectedDeity, setSelectedDeity] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "map">("grid");

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

      {/* Filters & Content */}
      <section className="px-6 pb-20">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8"
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
              <TempleFilters
                selectedState={selectedState}
                selectedDeity={selectedDeity}
                onStateChange={setSelectedState}
                onDeityChange={setSelectedDeity}
              />
              
              {/* View Toggle */}
              <Tabs value={viewMode} onValueChange={(v) => setViewMode(v as "grid" | "map")} className="w-auto">
                <TabsList className="bg-muted/30">
                  <TabsTrigger value="grid" className="gap-2">
                    <Grid3X3 className="h-4 w-4" />
                    <span className="hidden sm:inline">Grid</span>
                  </TabsTrigger>
                  <TabsTrigger value="map" className="gap-2">
                    <Map className="h-4 w-4" />
                    <span className="hidden sm:inline">Map</span>
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            {/* Results count */}
            <p className="font-body text-sm text-muted-foreground">
              Showing {filteredTemples.length} sacred {filteredTemples.length === 1 ? "place" : "places"}
            </p>
          </motion.div>

          {/* Content based on view mode */}
          {viewMode === "map" ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Suspense
                fallback={
                  <div className="w-full h-[500px] rounded-lg border border-border/50 flex items-center justify-center bg-muted/10">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  </div>
                }
              >
                <TempleMap selectedState={selectedState} selectedDeity={selectedDeity} />
              </Suspense>
            </motion.div>
          ) : (
            <>
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
            </>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Temples;
