import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import AuthModal from "@/components/auth/AuthModal";
import UserMenu from "@/components/auth/UserMenu";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const { user, loading } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <AnimatePresence>
        {isScrolled && (
          <motion.header
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border"
          >
            <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
              <div className="flex items-center gap-8">
                <a href="#" className="font-display text-xl text-gold">
                  ṚTA
                </a>
                <nav className="hidden md:flex items-center gap-6">
                  <a href="#what-is-rta" className="font-body text-sm text-muted-foreground hover:text-foreground transition-colors">Philosophy</a>
                  <a href="#schools" className="font-body text-sm text-muted-foreground hover:text-foreground transition-colors">Schools</a>
                  <a href="#debates" className="font-body text-sm text-muted-foreground hover:text-foreground transition-colors">Debates</a>
                  <a href="#sabha" className="font-body text-sm text-muted-foreground hover:text-foreground transition-colors">Sabhā</a>
                </nav>
              </div>

              <div className="flex items-center gap-4">
                {!loading && (
                  <>
                    {user ? (
                      <UserMenu />
                    ) : (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setAuthModalOpen(true)}
                        className="font-display"
                      >
                        Enter Sabhā
                      </Button>
                    )}
                  </>
                )}
              </div>
            </div>
          </motion.header>
        )}
      </AnimatePresence>

      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
      />
    </>
  );
};

export default Header;
