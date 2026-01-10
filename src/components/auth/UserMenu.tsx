import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { History, LogOut } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const levelLabels: Record<string, string> = {
  seeker: "Seeker",
  questioner: "Questioner",
  reader: "Reader",
  debater: "Debater",
  interpreter: "Interpreter",
  scholar: "Scholar",
  guardian: "Guardian",
};

const UserMenu = () => {
  const { user, profile, signOut } = useAuth();

  if (!user) return null;

  const displayName = profile?.display_name || user.email?.split("@")[0] || "Seeker";
  const level = profile?.membership_level || "seeker";
  const karma = profile?.karma || 0;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center gap-3 px-4 py-2 border border-border hover:border-gold/50 transition-colors"
        >
          <div className="text-right">
            <p className="font-display text-sm text-foreground">{displayName}</p>
            <p className="font-body text-xs text-gold">{levelLabels[level]}</p>
          </div>
          <div className="w-8 h-8 border border-gold/30 flex items-center justify-center">
            <span className="font-display text-gold text-sm">
              {displayName.charAt(0).toUpperCase()}
            </span>
          </div>
        </motion.button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="bg-card border-border min-w-[200px]"
      >
        <div className="px-3 py-2">
          <p className="font-display text-sm text-foreground">{displayName}</p>
          <p className="font-body text-xs text-muted-foreground">{user.email}</p>
        </div>
        <DropdownMenuSeparator className="bg-border" />
        <div className="px-3 py-2 flex justify-between items-center">
          <span className="font-body text-xs text-muted-foreground">Karma</span>
          <span className="font-display text-sm text-gold">{karma}</span>
        </div>
        <div className="px-3 py-2 flex justify-between items-center">
          <span className="font-body text-xs text-muted-foreground">Level</span>
          <span className="font-display text-sm text-foreground">
            {levelLabels[level]}
          </span>
        </div>
        <DropdownMenuSeparator className="bg-border" />
        <DropdownMenuItem asChild>
          <Link
            to="/karma-history"
            className="font-body text-sm cursor-pointer text-muted-foreground hover:text-foreground flex items-center gap-2"
          >
            <History className="h-4 w-4" />
            Karma History
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => signOut()}
          className="font-body text-sm cursor-pointer text-muted-foreground hover:text-foreground flex items-center gap-2"
        >
          <LogOut className="h-4 w-4" />
          Leave the Sabhā
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;
