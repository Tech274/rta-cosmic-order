import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import AuthModal from "@/components/auth/AuthModal";
import UserMenu from "@/components/auth/UserMenu";
import { Menu, X, BookOpen, Sun, MapPin, Compass, Users, Flame, Headphones } from "lucide-react";

const navLinks = [
  { href: "/scriptures", label: "Scriptures", icon: BookOpen },
  { href: "/daily-dharma", label: "Daily Dharma", icon: Sun },
  { href: "/temples", label: "Sacred Places", icon: MapPin },
  { href: "/audiobooks", label: "Audiobooks", icon: Headphones },
  { href: "/sadhana", label: "Sadhana", icon: Flame },
  { href: "/dharma-path", label: "My Path", icon: Compass },
  { href: "/#sabha", label: "Sabhā", icon: Users, isHash: true },
];

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, loading } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const NavLinks = ({ mobile = false }: { mobile?: boolean }) => (
    <>
      {navLinks.map((link) => {
        const Icon = link.icon;
        const isActive = location.pathname === link.href;
        
        if (link.isHash) {
          return (
            <a
              key={link.href}
              href={link.href}
              onClick={() => mobile && setMobileMenuOpen(false)}
              className={`font-body text-sm transition-colors flex items-center gap-2 ${
                mobile
                  ? "py-3 px-4 hover:bg-primary/10 rounded-lg"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {mobile && <Icon className="w-4 h-4 text-primary/60" />}
              {link.label}
            </a>
          );
        }
        
        return (
          <Link
            key={link.href}
            to={link.href}
            onClick={() => mobile && setMobileMenuOpen(false)}
            className={`font-body text-sm transition-colors flex items-center gap-2 ${
              mobile
                ? `py-3 px-4 hover:bg-primary/10 rounded-lg ${isActive ? "bg-primary/10 text-primary" : ""}`
                : `${isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"}`
            }`}
          >
            {mobile && <Icon className={`w-4 h-4 ${isActive ? "text-primary" : "text-primary/60"}`} />}
            {link.label}
          </Link>
        );
      })}
    </>
  );

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
            <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 flex items-center justify-between">
              <div className="flex items-center gap-4 md:gap-8">
                <Link to="/" className="font-display text-xl text-gold">
                  ṚTA
                </Link>
                <nav className="hidden md:flex items-center gap-6">
                  <NavLinks />
                </nav>
              </div>

              <div className="flex items-center gap-3">
                {!loading && (
                  <>
                    {user ? (
                      <UserMenu />
                    ) : (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setAuthModalOpen(true)}
                        className="font-display hidden md:inline-flex"
                      >
                        Enter Sabhā
                      </Button>
                    )}
                  </>
                )}

                {/* Mobile Menu Button */}
                <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                  <SheetTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="md:hidden"
                      aria-label="Open menu"
                    >
                      <Menu className="w-5 h-5" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="right" className="w-[280px] bg-background border-border">
                    <div className="flex flex-col h-full">
                      <div className="flex items-center justify-between mb-8">
                        <Link to="/" className="font-display text-xl text-gold" onClick={() => setMobileMenuOpen(false)}>
                          ṚTA
                        </Link>
                      </div>

                      <nav className="flex flex-col gap-1 flex-1">
                        <NavLinks mobile />
                      </nav>

                      <div className="pt-6 border-t border-border">
                        {!loading && !user && (
                          <Button
                            variant="default"
                            className="w-full font-display"
                            onClick={() => {
                              setMobileMenuOpen(false);
                              setAuthModalOpen(true);
                            }}
                          >
                            Enter Sabhā
                          </Button>
                        )}
                        {user && (
                          <div className="text-center">
                            <p className="text-sm text-muted-foreground">Signed in</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>
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
