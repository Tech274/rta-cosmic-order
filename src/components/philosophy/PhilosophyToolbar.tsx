import { useState } from "react";
import { Search, Network, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import PhilosophySearch from "./PhilosophySearch";
import ConceptMap from "./ConceptMap";

interface PhilosophyToolbarProps {
  currentArticleId?: string;
}

const PhilosophyToolbar = ({ currentArticleId }: PhilosophyToolbarProps) => {
  const [showSearch, setShowSearch] = useState(false);
  const [showConceptMap, setShowConceptMap] = useState(false);

  return (
    <>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowSearch(true)}
          className="gap-2 border-gold/30 hover:border-gold hover:bg-gold/5"
        >
          <Search className="h-4 w-4" />
          <span className="hidden sm:inline">Search</span>
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowConceptMap(true)}
          className="gap-2 border-gold/30 hover:border-gold hover:bg-gold/5"
        >
          <Network className="h-4 w-4" />
          <span className="hidden sm:inline">Concept Map</span>
        </Button>
      </div>

      {/* Search Modal */}
      <Dialog open={showSearch} onOpenChange={setShowSearch}>
        <DialogContent className="sm:max-w-xl">
          <DialogHeader>
            <DialogTitle className="font-display text-gold flex items-center gap-2">
              <Search className="h-5 w-5" />
              Search Philosophy Articles
            </DialogTitle>
          </DialogHeader>
          <PhilosophySearch onClose={() => setShowSearch(false)} />
        </DialogContent>
      </Dialog>

      {/* Concept Map Modal */}
      <Dialog open={showConceptMap} onOpenChange={setShowConceptMap}>
        <DialogContent className="sm:max-w-5xl max-h-[90vh] overflow-auto">
          <ConceptMap
            onClose={() => setShowConceptMap(false)}
            highlightedArticle={currentArticleId}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PhilosophyToolbar;
