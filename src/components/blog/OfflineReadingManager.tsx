import { useState, useEffect } from "react";
import { Download, Trash2, WifiOff, Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { BlogPost } from "@/data/blogPosts";

const STORAGE_KEY = "rta_offline_posts";

interface SavedPost extends BlogPost {
  savedAt: string;
}

interface OfflineReadingManagerProps {
  post: BlogPost;
}

// Utility functions for managing offline posts
export const getOfflinePosts = (): SavedPost[] => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

export const isPostSaved = (postId: string): boolean => {
  const posts = getOfflinePosts();
  return posts.some(p => p.id === postId);
};

export const savePostOffline = (post: BlogPost): boolean => {
  try {
    const posts = getOfflinePosts();
    if (posts.some(p => p.id === post.id)) {
      return true; // Already saved
    }
    const savedPost: SavedPost = {
      ...post,
      savedAt: new Date().toISOString()
    };
    posts.push(savedPost);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
    return true;
  } catch (error) {
    console.error("Failed to save post:", error);
    return false;
  }
};

export const removePostOffline = (postId: string): boolean => {
  try {
    const posts = getOfflinePosts();
    const filtered = posts.filter(p => p.id !== postId);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    return true;
  } catch {
    return false;
  }
};

export const getOfflinePost = (slug: string): SavedPost | undefined => {
  const posts = getOfflinePosts();
  return posts.find(p => p.slug === slug);
};

// Main component for saving/removing posts
const OfflineReadingManager = ({ post }: OfflineReadingManagerProps) => {
  const [isSaved, setIsSaved] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsSaved(isPostSaved(post.id));
  }, [post.id]);

  const handleSave = async () => {
    setIsLoading(true);
    // Small delay for UX
    await new Promise(r => setTimeout(r, 300));
    
    const success = savePostOffline(post);
    if (success) {
      setIsSaved(true);
      toast.success("Article saved for offline reading", {
        description: "You can read this even without internet."
      });
    } else {
      toast.error("Failed to save article", {
        description: "Please try again."
      });
    }
    setIsLoading(false);
  };

  const handleRemove = async () => {
    setIsLoading(true);
    await new Promise(r => setTimeout(r, 200));
    
    const success = removePostOffline(post.id);
    if (success) {
      setIsSaved(false);
      toast.success("Article removed from offline reading");
    } else {
      toast.error("Failed to remove article");
    }
    setIsLoading(false);
  };

  if (isLoading) {
    return (
      <Button variant="outline" size="sm" disabled className="gap-2">
        <Loader2 className="w-4 h-4 animate-spin" />
        {isSaved ? "Removing..." : "Saving..."}
      </Button>
    );
  }

  if (isSaved) {
    return (
      <Button variant="outline" size="sm" onClick={handleRemove} className="gap-2">
        <Check className="w-4 h-4 text-green-500" />
        Saved Offline
      </Button>
    );
  }

  return (
    <Button variant="outline" size="sm" onClick={handleSave} className="gap-2">
      <Download className="w-4 h-4" />
      Save Offline
    </Button>
  );
};

// Component to display saved posts list
export const OfflinePostsList = () => {
  const [posts, setPosts] = useState<SavedPost[]>([]);

  useEffect(() => {
    setPosts(getOfflinePosts());
  }, []);

  const handleRemove = (postId: string) => {
    removePostOffline(postId);
    setPosts(getOfflinePosts());
    toast.success("Article removed from offline reading");
  };

  if (posts.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <WifiOff className="w-8 h-8 mx-auto mb-3 opacity-50" />
        <p>No articles saved for offline reading</p>
        <p className="text-sm mt-1">Save articles to read them without internet</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="font-medium flex items-center gap-2">
        <WifiOff className="w-4 h-4" />
        Saved for Offline ({posts.length})
      </h3>
      <div className="space-y-2">
        {posts.map(post => (
          <div 
            key={post.id}
            className="flex items-center justify-between p-3 border border-border rounded-lg bg-card"
          >
            <div className="flex-1 min-w-0">
              <p className="font-medium truncate">{post.title}</p>
              <p className="text-xs text-muted-foreground">
                Saved {new Date(post.savedAt).toLocaleDateString()}
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleRemove(post.id)}
              className="flex-shrink-0 ml-2"
            >
              <Trash2 className="w-4 h-4 text-destructive" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OfflineReadingManager;
