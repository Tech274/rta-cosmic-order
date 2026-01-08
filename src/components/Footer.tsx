import RtaLogo from "@/components/RtaLogo";

const Footer = () => {
  return (
    <footer className="py-16 px-6 border-t border-border">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col items-center text-center">
          <RtaLogo size={60} className="text-gold/60 mb-6" />
          
          <p className="font-display text-sm tracking-[0.2em] text-muted-foreground uppercase mb-8">
            A civilisational archive
          </p>
          
          <nav className="flex flex-wrap justify-center gap-8 mb-8">
            {["Philosophy", "Schools", "Debates", "Sabhā", "Archive"].map((item) => (
              <a
                key={item}
                href="#"
                className="font-body text-sm text-muted-foreground hover:text-gold transition-colors"
              >
                {item}
              </a>
            ))}
          </nav>
          
          <p className="font-body text-xs text-muted-foreground/60">
            ṚTA — The Order Behind Dharma
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
