import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AuthModal = ({ isOpen, onClose }: AuthModalProps) => {
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { signIn, signUp } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (mode === "signin") {
        const { error } = await signIn(email, password);
        if (error) {
          toast({
            title: "Error signing in",
            description: error.message,
            variant: "destructive",
          });
        } else {
          toast({
            title: "Welcome back",
            description: "You have entered the Sabhā.",
          });
          onClose();
        }
      } else {
        const { error } = await signUp(email, password, displayName);
        if (error) {
          toast({
            title: "Error creating account",
            description: error.message,
            variant: "destructive",
          });
        } else {
          toast({
            title: "Welcome, Seeker",
            description: "Your journey in the Sabhā begins.",
          });
          onClose();
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setEmail("");
    setPassword("");
    setDisplayName("");
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="bg-card border-border max-w-md">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl text-center text-foreground">
            {mode === "signin" ? "Enter the Sabhā" : "Join the Sabhā"}
          </DialogTitle>
        </DialogHeader>

        <div className="flex justify-center gap-4 mb-6">
          <button
            onClick={() => {
              setMode("signin");
              resetForm();
            }}
            className={`font-display text-sm tracking-wide transition-colors ${
              mode === "signin"
                ? "text-gold"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Sign In
          </button>
          <span className="text-muted-foreground">|</span>
          <button
            onClick={() => {
              setMode("signup");
              resetForm();
            }}
            className={`font-display text-sm tracking-wide transition-colors ${
              mode === "signup"
                ? "text-gold"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Create Account
          </button>
        </div>

        <AnimatePresence mode="wait">
          <motion.form
            key={mode}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            {mode === "signup" && (
              <div className="space-y-2">
                <Label htmlFor="displayName" className="font-body text-foreground">
                  Display Name
                </Label>
                <Input
                  id="displayName"
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  placeholder="Your name in the Sabhā"
                  className="bg-background border-border font-body"
                />
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email" className="font-body text-foreground">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="bg-background border-border font-body"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="font-body text-foreground">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                minLength={6}
                className="bg-background border-border font-body"
              />
            </div>

            <Button
              type="submit"
              variant="sacred"
              size="lg"
              className="w-full mt-6"
              disabled={isLoading}
            >
              {isLoading
                ? "..."
                : mode === "signin"
                ? "Enter"
                : "Begin Journey"}
            </Button>
          </motion.form>
        </AnimatePresence>

        <p className="text-center text-xs text-muted-foreground font-body mt-4">
          {mode === "signup"
            ? "By joining, you agree to uphold the Four Laws of the Sabhā."
            : "Speak from knowledge. Dharma above ego."}
        </p>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
