import { Search, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SearchButtonProps {
  onClick: () => void;
  variant?: "default" | "compact";
}

const SearchButton = ({ onClick, variant = "default" }: SearchButtonProps) => {
  if (variant === "compact") {
    return (
      <Button
        variant="ghost"
        size="icon"
        onClick={onClick}
        className="text-muted-foreground hover:text-foreground"
      >
        <Search className="h-4 w-4" />
      </Button>
    );
  }

  return (
    <Button
      variant="outline"
      onClick={onClick}
      className="gap-2 border-gold/30 hover:border-gold hover:bg-gold/5 text-muted-foreground hover:text-foreground"
    >
      <Sparkles className="h-4 w-4 text-gold" />
      <span className="font-body">AI Search</span>
      <kbd className="hidden sm:inline-flex ml-2 px-1.5 py-0.5 text-xs bg-muted rounded border border-border">
        ⌘K
      </kbd>
    </Button>
  );
};

export default SearchButton;
