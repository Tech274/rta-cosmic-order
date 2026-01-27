import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface GalleryImage {
  url: string;
  caption: string;
  alt: string;
}

interface ImageGalleryProps {
  images: GalleryImage[];
  title?: string;
}

const ImageGallery = ({ images, title }: ImageGalleryProps) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handlePrevious = () => {
    if (selectedIndex !== null) {
      setSelectedIndex(selectedIndex === 0 ? images.length - 1 : selectedIndex - 1);
    }
  };

  const handleNext = () => {
    if (selectedIndex !== null) {
      setSelectedIndex(selectedIndex === images.length - 1 ? 0 : selectedIndex + 1);
    }
  };

  if (images.length === 0) return null;

  return (
    <div>
      {title && (
        <h3 className="font-display text-lg text-foreground mb-4 flex items-center gap-2">
          <ZoomIn className="w-5 h-5 text-gold" />
          Gallery
        </h3>
      )}

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((image, index) => (
          <motion.button
            key={index}
            onClick={() => setSelectedIndex(index)}
            className="group relative aspect-square bg-muted border border-border overflow-hidden hover:border-gold/50 transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="absolute inset-0 bg-yantra-pattern opacity-20" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-sanskrit text-2xl text-gold/40">ॐ</span>
            </div>
            <div className="absolute inset-0 bg-gold/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <ZoomIn className="w-6 h-6 text-white" />
            </div>
            <p className="absolute bottom-0 left-0 right-0 p-2 bg-background/80 text-xs text-muted-foreground truncate">
              {image.caption}
            </p>
          </motion.button>
        ))}
      </div>

      {/* Lightbox Modal */}
      <Dialog open={selectedIndex !== null} onOpenChange={() => setSelectedIndex(null)}>
        <DialogContent className="max-w-4xl bg-background/95 backdrop-blur border-gold/20 p-0">
          <AnimatePresence mode="wait">
            {selectedIndex !== null && (
              <motion.div
                key={selectedIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="relative"
              >
                {/* Close button */}
                <button
                  onClick={() => setSelectedIndex(null)}
                  className="absolute top-4 right-4 z-10 p-2 bg-background/50 hover:bg-background/80 rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-foreground" />
                </button>

                {/* Navigation arrows */}
                {images.length > 1 && (
                  <>
                    <button
                      onClick={handlePrevious}
                      className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 bg-background/50 hover:bg-background/80 rounded-full transition-colors"
                    >
                      <ChevronLeft className="w-6 h-6 text-foreground" />
                    </button>
                    <button
                      onClick={handleNext}
                      className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 bg-background/50 hover:bg-background/80 rounded-full transition-colors"
                    >
                      <ChevronRight className="w-6 h-6 text-foreground" />
                    </button>
                  </>
                )}

                {/* Image placeholder */}
                <div className="aspect-video bg-muted flex items-center justify-center relative">
                  <div className="absolute inset-0 bg-yantra-pattern opacity-10" />
                  <span className="font-sanskrit text-4xl text-gold/50">ॐ</span>
                </div>

                {/* Caption */}
                <div className="p-6 bg-card">
                  <p className="font-body text-foreground">{images[selectedIndex].caption}</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {selectedIndex + 1} of {images.length}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ImageGallery;
