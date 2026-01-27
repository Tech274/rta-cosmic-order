import { useState, useEffect } from "react";
import { Bookmark, Plus, Trash2, Clock, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

interface BookmarkData {
  id: string;
  position_seconds: number;
  chapter_number: number;
  title: string | null;
  note: string | null;
  created_at: string;
}

interface BookmarksPanelProps {
  audiobookId: string;
  currentTime: number;
  currentChapter: number;
  onSeek: (seconds: number) => void;
}

const BookmarksPanel = ({ audiobookId, currentTime, currentChapter, onSeek }: BookmarksPanelProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [bookmarks, setBookmarks] = useState<BookmarkData[]>([]);
  const [loading, setLoading] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newNote, setNewNote] = useState("");

  useEffect(() => {
    if (user && audiobookId) {
      fetchBookmarks();
    }
  }, [user, audiobookId]);

  const fetchBookmarks = async () => {
    try {
      const { data, error } = await supabase
        .from('audiobook_bookmarks')
        .select('*')
        .eq('audiobook_id', audiobookId)
        .eq('user_id', user!.id)
        .order('position_seconds', { ascending: true });

      if (error) throw error;
      setBookmarks(data || []);
    } catch (error) {
      console.error('Error fetching bookmarks:', error);
    }
  };

  const addBookmark = async () => {
    if (!user) {
      toast({
        title: "Sign in required",
        description: "Please sign in to save bookmarks",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase
        .from('audiobook_bookmarks')
        .insert({
          user_id: user.id,
          audiobook_id: audiobookId,
          position_seconds: Math.floor(currentTime),
          chapter_number: currentChapter,
          title: newTitle || `Bookmark at ${formatTime(currentTime)}`,
          note: newNote || null
        });

      if (error) throw error;

      toast({
        title: "Bookmark saved",
        description: "You can return to this position anytime"
      });

      setNewTitle("");
      setNewNote("");
      setShowAddForm(false);
      fetchBookmarks();
    } catch (error) {
      console.error('Error adding bookmark:', error);
      toast({
        title: "Error",
        description: "Failed to save bookmark",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const deleteBookmark = async (id: string) => {
    try {
      const { error } = await supabase
        .from('audiobook_bookmarks')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Bookmark removed"
      });

      fetchBookmarks();
    } catch (error) {
      console.error('Error deleting bookmark:', error);
    }
  };

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    if (hrs > 0) {
      return `${hrs}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="sm" className="relative">
          <Bookmark className="w-4 h-4" />
          {bookmarks.length > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-primary-foreground text-[10px] rounded-full flex items-center justify-center">
              {bookmarks.length}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-80 sm:w-96">
        <SheetHeader>
          <SheetTitle className="font-display flex items-center gap-2">
            <Bookmark className="w-5 h-5" />
            Bookmarks
          </SheetTitle>
        </SheetHeader>

        <div className="mt-6 space-y-4">
          {/* Add Bookmark */}
          {showAddForm ? (
            <div className="space-y-3 p-4 bg-muted/50 rounded-lg">
              <p className="text-sm text-muted-foreground">
                Bookmark at {formatTime(currentTime)} (Chapter {currentChapter})
              </p>
              <Input
                placeholder="Title (optional)"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
              />
              <Textarea
                placeholder="Add a note... (optional)"
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                rows={2}
              />
              <div className="flex gap-2">
                <Button 
                  size="sm" 
                  onClick={addBookmark}
                  disabled={loading}
                >
                  Save
                </Button>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => {
                    setShowAddForm(false);
                    setNewTitle("");
                    setNewNote("");
                  }}
                >
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <Button 
              onClick={() => setShowAddForm(true)} 
              className="w-full"
              variant="outline"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Bookmark Here
            </Button>
          )}

          {/* Bookmarks List */}
          <div className="space-y-2 max-h-[60vh] overflow-y-auto">
            {bookmarks.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Bookmark className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">No bookmarks yet</p>
                <p className="text-xs">Save positions you want to return to</p>
              </div>
            ) : (
              bookmarks.map((bookmark) => (
                <div
                  key={bookmark.id}
                  className="p-3 bg-card border border-border rounded-lg hover:border-primary/50 transition-colors"
                >
                  <div className="flex items-start justify-between gap-2">
                    <button
                      onClick={() => onSeek(bookmark.position_seconds)}
                      className="flex-1 text-left"
                    >
                      <p className="font-medium text-sm text-foreground">
                        {bookmark.title || `Bookmark`}
                      </p>
                      <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        <span>{formatTime(bookmark.position_seconds)}</span>
                        <span>·</span>
                        <span>Ch. {bookmark.chapter_number}</span>
                      </div>
                      {bookmark.note && (
                        <div className="flex items-start gap-1 mt-2 text-xs text-muted-foreground">
                          <MessageSquare className="w-3 h-3 mt-0.5 flex-shrink-0" />
                          <p className="line-clamp-2">{bookmark.note}</p>
                        </div>
                      )}
                    </button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0 text-muted-foreground hover:text-destructive"
                      onClick={() => deleteBookmark(bookmark.id)}
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default BookmarksPanel;
