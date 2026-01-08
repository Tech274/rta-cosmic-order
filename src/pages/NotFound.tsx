import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import RtaLogo from "@/components/RtaLogo";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-6">
      <RtaLogo size={80} className="text-gold mb-8" />
      
      <h1 className="font-display text-6xl font-light text-foreground mb-4">404</h1>
      <p className="font-body text-lg text-muted-foreground mb-8">
        This path does not exist within the order.
      </p>
      
      <Link 
        to="/" 
        className="font-display text-sm tracking-[0.15em] uppercase text-gold hover:text-foreground transition-colors"
      >
        Return to ṚTA
      </Link>
    </div>
  );
};

export default NotFound;
