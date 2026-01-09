import { useState } from "react";
import { Search, Sparkles, X, MessageSquare, Reply, Loader2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";

interface SearchResult {
  type: "discussion" | "reply";
  id: string;
  relevance_score: number;
  reason: string;
  data: {
    id: string;
    title?: string;
    content: string;
    hall?: string;
    upvotes: number;
    views?: number;
  };
  parent_discussion?: {
    id: string;
    title: string;
  };
}

interface SearchResponse {
  query: string;
  results: SearchResult[];
  summary: string;
  related_concepts: string[];
}

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectDiscussion?: (discussionId: string) => void;
}

const SearchModal = ({ isOpen, onClose, onSelectDiscussion }: SearchModalProps) => {
  const [query, setQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchResponse, setSearchResponse] = useState<SearchResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    if (!query.trim()) return;

    setIsSearching(true);
    setError(null);
    setSearchResponse(null);

    try {
      const { data, error: fnError } = await supabase.functions.invoke("semantic-search", {
        body: { query: query.trim() },
      });

      if (fnError) throw fnError;
      setSearchResponse(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Search failed");
    } finally {
      setIsSearching(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleResultClick = (result: SearchResult) => {
    const discussionId = result.type === "discussion" 
      ? result.id 
      : result.parent_discussion?.id;
    
    if (discussionId && onSelectDiscussion) {
      onSelectDiscussion(discussionId);
      onClose();
    }
  };

  const hallLabels: Record<string, string> = {
    tattva: "तत्त्व",
    dharma: "धर्म",
    samvada: "संवाद",
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 font-display text-gold">
            <Sparkles className="h-5 w-5" />
            AI-Powered Search
          </DialogTitle>
        </DialogHeader>

        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search philosophical discussions..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              className="pl-10 font-body"
              autoFocus
            />
          </div>
          <Button 
            onClick={handleSearch} 
            disabled={isSearching || !query.trim()}
            className="bg-gold hover:bg-gold/90 text-background"
          >
            {isSearching ? <Loader2 className="h-4 w-4 animate-spin" /> : "Search"}
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto space-y-4 min-h-0">
          {error && (
            <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
              <p className="text-sm text-destructive">{error}</p>
            </div>
          )}

          {searchResponse && (
            <>
              {searchResponse.summary && (
                <div className="p-4 bg-gold/5 border border-gold/20 rounded-lg">
                  <p className="text-sm text-muted-foreground font-body italic">
                    {searchResponse.summary}
                  </p>
                  {searchResponse.related_concepts.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {searchResponse.related_concepts.map((concept) => (
                        <Badge 
                          key={concept} 
                          variant="outline" 
                          className="text-xs border-gold/30 text-gold"
                        >
                          {concept}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {searchResponse.results.length > 0 ? (
                <div className="space-y-2">
                  {searchResponse.results.map((result) => (
                    <button
                      key={`${result.type}-${result.id}`}
                      onClick={() => handleResultClick(result)}
                      className="w-full text-left p-4 bg-card hover:bg-accent/50 border border-border rounded-lg transition-colors"
                    >
                      <div className="flex items-start gap-3">
                        <div className="mt-1">
                          {result.type === "discussion" ? (
                            <MessageSquare className="h-4 w-4 text-gold" />
                          ) : (
                            <Reply className="h-4 w-4 text-muted-foreground" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            {result.type === "discussion" && result.data.title && (
                              <h4 className="font-display text-sm text-foreground truncate">
                                {result.data.title}
                              </h4>
                            )}
                            {result.type === "reply" && result.parent_discussion && (
                              <h4 className="font-display text-sm text-foreground truncate">
                                Re: {result.parent_discussion.title}
                              </h4>
                            )}
                            {result.data.hall && (
                              <Badge variant="outline" className="text-xs shrink-0">
                                {hallLabels[result.data.hall] || result.data.hall}
                              </Badge>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground line-clamp-2 font-body">
                            {result.data.content}
                          </p>
                          <p className="text-xs text-gold/70 mt-2 font-body">
                            {result.reason}
                          </p>
                        </div>
                        <div className="text-xs text-muted-foreground shrink-0">
                          {Math.round(result.relevance_score * 100)}%
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground font-body">No matching discussions found</p>
                </div>
              )}
            </>
          )}

          {!searchResponse && !isSearching && !error && (
            <div className="text-center py-12">
              <Sparkles className="h-12 w-12 text-gold/30 mx-auto mb-4" />
              <p className="text-muted-foreground font-body">
                Search for philosophical concepts, Sanskrit terms, or questions
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SearchModal;
