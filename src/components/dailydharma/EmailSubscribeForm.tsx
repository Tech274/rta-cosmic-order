import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Loader2, Check, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const EmailSubscribeForm = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes("@")) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { data, error } = await supabase.functions.invoke("subscribe-digest", {
        body: { email },
      });

      if (error) throw error;

      setIsSubscribed(true);
      setEmail("");
      
      toast({
        title: "🙏 Welcome, Seeker!",
        description: "You'll receive daily Sanskrit wisdom in your inbox.",
      });
    } catch (error) {
      console.error("Subscription error:", error);
      toast({
        title: "Subscription failed",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubscribed) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-gradient-to-br from-primary/10 via-card to-card border border-primary/30 p-6 text-center"
      >
        <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 rounded-full bg-primary/20">
          <Check className="w-6 h-6 text-primary" />
        </div>
        <h3 className="font-display text-lg text-foreground mb-2">
          You're Subscribed!
        </h3>
        <p className="font-body text-sm text-muted-foreground">
          Check your inbox for a welcome message. Daily wisdom awaits!
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-gradient-to-br from-primary/5 via-card to-card border border-border p-6"
    >
      <div className="flex items-center gap-2 mb-3">
        <Sparkles className="w-5 h-5 text-primary" />
        <h3 className="font-display text-lg text-foreground">
          Daily Dharma Digest
        </h3>
      </div>
      
      <p className="font-body text-sm text-muted-foreground mb-4">
        Receive ancient Sanskrit wisdom in your inbox every morning. 
        Start your day with timeless teachings.
      </p>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <div className="relative flex-1">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="pl-10 bg-background"
            disabled={isSubmitting}
          />
        </div>
        <Button 
          type="submit" 
          disabled={isSubmitting}
          className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span className="hidden sm:inline">Subscribing...</span>
            </>
          ) : (
            <>
              <span>Subscribe</span>
            </>
          )}
        </Button>
      </form>

      <p className="font-body text-xs text-muted-foreground/60 mt-3">
        Unsubscribe anytime. We respect your inbox.
      </p>
    </motion.div>
  );
};

export default EmailSubscribeForm;
