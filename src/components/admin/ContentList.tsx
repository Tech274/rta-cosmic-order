import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Edit, Trash2, Eye, MoreVertical, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";

interface ContentListProps {
  type: 'blog' | 'all';
  onEdit: (id: string) => void;
}

interface ContentItem {
  id: string;
  title: string;
  status: string;
  category: string;
  created_at: string;
  type: 'blog' | 'audiobook';
}

const ContentList = ({ type, onEdit }: ContentListProps) => {
  const { toast } = useToast();
  const [items, setItems] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  useEffect(() => {
    fetchContent();
  }, [type]);

  const fetchContent = async () => {
    setLoading(true);
    try {
      let allItems: ContentItem[] = [];

      // Fetch blog posts
      if (type === 'blog' || type === 'all') {
        const { data: posts, error: postsError } = await supabase
          .from('blog_posts')
          .select('id, title, status, category, created_at')
          .order('created_at', { ascending: false });

        if (postsError) throw postsError;
        
        allItems = [
          ...allItems,
          ...(posts || []).map(p => ({ ...p, type: 'blog' as const }))
        ];
      }

      // Fetch audiobooks for 'all' type
      if (type === 'all') {
        const { data: audiobooks, error: audiobooksError } = await supabase
          .from('audiobooks')
          .select('id, title, status, category, created_at')
          .order('created_at', { ascending: false });

        if (audiobooksError) throw audiobooksError;
        
        allItems = [
          ...allItems,
          ...(audiobooks || []).map(a => ({ ...a, type: 'audiobook' as const }))
        ];
      }

      // Sort by date
      allItems.sort((a, b) => 
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );

      setItems(allItems);
    } catch (error) {
      console.error('Error fetching content:', error);
      toast({
        title: "Error",
        description: "Failed to load content",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;

    const item = items.find(i => i.id === deleteId);
    if (!item) return;

    try {
      const table = item.type === 'blog' ? 'blog_posts' : 'audiobooks';
      const { error } = await supabase
        .from(table)
        .delete()
        .eq('id', deleteId);

      if (error) throw error;

      setItems(prev => prev.filter(i => i.id !== deleteId));
      toast({
        title: "Deleted",
        description: "Content has been deleted"
      });
    } catch (error) {
      console.error('Error deleting:', error);
      toast({
        title: "Error",
        description: "Failed to delete content",
        variant: "destructive"
      });
    } finally {
      setDeleteId(null);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'published':
        return <Badge className="bg-green-500/10 text-green-500 border-green-500/20">Published</Badge>;
      case 'draft':
        return <Badge variant="secondary">Draft</Badge>;
      case 'archived':
        return <Badge variant="outline">Archived</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl text-foreground">
          {type === 'blog' ? 'Blog Posts' : 'All Content'}
        </h1>
        <p className="text-muted-foreground">
          {items.length} items total
        </p>
      </div>

      {items.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12 text-muted-foreground"
        >
          No content yet. Create your first post!
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="border border-border rounded-lg overflow-hidden"
        >
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead>Title</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Created</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((item) => (
                <TableRow key={item.id} className="hover:bg-muted/30">
                  <TableCell className="font-medium">{item.title}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="capitalize">
                      {item.type}
                    </Badge>
                  </TableCell>
                  <TableCell>{getStatusBadge(item.status)}</TableCell>
                  <TableCell className="capitalize">{item.category}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {format(new Date(item.created_at), 'MMM d, yyyy')}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => onEdit(item.id)}>
                          <Edit className="w-4 h-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Eye className="w-4 h-4 mr-2" />
                          Preview
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          className="text-destructive"
                          onClick={() => setDeleteId(item.id)}
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </motion.div>
      )}

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete this content.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ContentList;
