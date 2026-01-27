import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Plus, Edit, Trash2, Headphones, Clock, Loader2, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Chapter {
  number: number;
  title: string;
  startTime: number;
  duration: number;
}

interface Audiobook {
  id: string;
  title: string;
  sanskrit_title: string | null;
  author: string;
  narrator: string | null;
  description: string | null;
  cover_image: string | null;
  audio_url: string | null;
  duration_seconds: number | null;
  chapters: Chapter[] | null;
  category: string;
  status: string;
}

const categories = [
  { value: 'vedanta', label: 'Vedānta' },
  { value: 'purana', label: 'Purāṇa' },
  { value: 'itihasa', label: 'Itihāsa' },
  { value: 'tantra', label: 'Tantra' },
  { value: 'general', label: 'General' }
];

const AudiobookManager = () => {
  const { toast } = useToast();
  const [audiobooks, setAudiobooks] = useState<Audiobook[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    sanskrit_title: '',
    author: '',
    narrator: '',
    description: '',
    cover_image: '',
    audio_url: '',
    duration_seconds: 0,
    category: 'general',
    status: 'draft',
    chapters: '[]'
  });

  useEffect(() => {
    fetchAudiobooks();
  }, []);

  const fetchAudiobooks = async () => {
    try {
      const { data, error } = await supabase
        .from('audiobooks')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      setAudiobooks((data || []).map(book => ({
        ...book,
        chapters: (book.chapters as unknown as Chapter[]) || []
      })));
    } catch (error) {
      console.error('Error fetching audiobooks:', error);
      toast({
        title: "Error",
        description: "Failed to load audiobooks",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const openEditDialog = (audiobook?: Audiobook) => {
    if (audiobook) {
      setEditingId(audiobook.id);
      setFormData({
        title: audiobook.title,
        sanskrit_title: audiobook.sanskrit_title || '',
        author: audiobook.author,
        narrator: audiobook.narrator || '',
        description: audiobook.description || '',
        cover_image: audiobook.cover_image || '',
        audio_url: audiobook.audio_url || '',
        duration_seconds: audiobook.duration_seconds || 0,
        category: audiobook.category,
        status: audiobook.status,
        chapters: JSON.stringify(audiobook.chapters || [], null, 2)
      });
    } else {
      setEditingId(null);
      setFormData({
        title: '',
        sanskrit_title: '',
        author: '',
        narrator: '',
        description: '',
        cover_image: '',
        audio_url: '',
        duration_seconds: 0,
        category: 'general',
        status: 'draft',
        chapters: '[]'
      });
    }
    setDialogOpen(true);
  };

  const handleSave = async () => {
    if (!formData.title || !formData.author) {
      toast({
        title: "Validation Error",
        description: "Title and author are required",
        variant: "destructive"
      });
      return;
    }

    let parsedChapters: Chapter[] = [];
    try {
      parsedChapters = JSON.parse(formData.chapters);
    } catch {
      toast({
        title: "Validation Error",
        description: "Invalid chapters JSON format",
        variant: "destructive"
      });
      return;
    }

    setSaving(true);
    try {
      const audiobookData = {
        title: formData.title,
        sanskrit_title: formData.sanskrit_title || null,
        author: formData.author,
        narrator: formData.narrator || null,
        description: formData.description || null,
        cover_image: formData.cover_image || null,
        audio_url: formData.audio_url || null,
        duration_seconds: formData.duration_seconds || null,
        category: formData.category,
        status: formData.status,
        chapters: parsedChapters as unknown as any
      };

      if (editingId) {
        const { error } = await supabase
          .from('audiobooks')
          .update(audiobookData)
          .eq('id', editingId);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('audiobooks')
          .insert(audiobookData);

        if (error) throw error;
      }

      toast({
        title: "Success",
        description: editingId ? "Audiobook updated" : "Audiobook created"
      });

      setDialogOpen(false);
      fetchAudiobooks();
    } catch (error: any) {
      console.error('Error saving audiobook:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to save audiobook",
        variant: "destructive"
      });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this audiobook?')) return;

    try {
      const { error } = await supabase
        .from('audiobooks')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setAudiobooks(prev => prev.filter(a => a.id !== id));
      toast({
        title: "Deleted",
        description: "Audiobook has been deleted"
      });
    } catch (error) {
      console.error('Error deleting audiobook:', error);
      toast({
        title: "Error",
        description: "Failed to delete audiobook",
        variant: "destructive"
      });
    }
  };

  const formatDuration = (seconds: number | null) => {
    if (!seconds) return 'N/A';
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    return `${hours}h ${mins}m`;
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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl text-foreground">Audiobooks</h1>
          <p className="text-muted-foreground">{audiobooks.length} audiobooks total</p>
        </div>
        <Button onClick={() => openEditDialog()}>
          <Plus className="w-4 h-4 mr-2" />
          Add Audiobook
        </Button>
      </div>

      {audiobooks.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12 text-muted-foreground"
        >
          No audiobooks yet. Add your first audiobook!
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {audiobooks.map((audiobook) => (
            <motion.div
              key={audiobook.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="bg-card border-border overflow-hidden">
                <div className="aspect-square bg-muted relative">
                  {audiobook.cover_image ? (
                    <img 
                      src={audiobook.cover_image} 
                      alt={audiobook.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Headphones className="w-12 h-12 text-muted-foreground" />
                    </div>
                  )}
                  <div className="absolute top-2 right-2">
                    <Badge className={audiobook.status === 'published' ? 'bg-green-500' : ''}>
                      {audiobook.status}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-display text-lg text-foreground line-clamp-1">
                    {audiobook.title}
                  </h3>
                  {audiobook.sanskrit_title && (
                    <p className="font-sanskrit text-sm text-primary/70">{audiobook.sanskrit_title}</p>
                  )}
                  <p className="text-sm text-muted-foreground mt-1">{audiobook.author}</p>
                  <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {formatDuration(audiobook.duration_seconds)}
                    </span>
                    <span>{audiobook.chapters?.length || 0} chapters</span>
                  </div>
                  <div className="flex justify-end mt-4">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => openEditDialog(audiobook)}>
                          <Edit className="w-4 h-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          className="text-destructive"
                          onClick={() => handleDelete(audiobook.id)}
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {/* Edit/Create Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-display">
              {editingId ? 'Edit Audiobook' : 'New Audiobook'}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Title</Label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Audiobook title"
                />
              </div>
              <div className="space-y-2">
                <Label>Sanskrit Title</Label>
                <Input
                  value={formData.sanskrit_title}
                  onChange={(e) => setFormData(prev => ({ ...prev, sanskrit_title: e.target.value }))}
                  placeholder="संस्कृत शीर्षक"
                  className="font-sanskrit"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Author</Label>
                <Input
                  value={formData.author}
                  onChange={(e) => setFormData(prev => ({ ...prev, author: e.target.value }))}
                  placeholder="Author name"
                />
              </div>
              <div className="space-y-2">
                <Label>Narrator</Label>
                <Input
                  value={formData.narrator}
                  onChange={(e) => setFormData(prev => ({ ...prev, narrator: e.target.value }))}
                  placeholder="Narrator name"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Brief description..."
                rows={3}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Cover Image URL</Label>
                <Input
                  value={formData.cover_image}
                  onChange={(e) => setFormData(prev => ({ ...prev, cover_image: e.target.value }))}
                  placeholder="https://..."
                />
              </div>
              <div className="space-y-2">
                <Label>Audio URL</Label>
                <Input
                  value={formData.audio_url}
                  onChange={(e) => setFormData(prev => ({ ...prev, audio_url: e.target.value }))}
                  placeholder="https://..."
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Duration (seconds)</Label>
                <Input
                  type="number"
                  value={formData.duration_seconds}
                  onChange={(e) => setFormData(prev => ({ ...prev, duration_seconds: parseInt(e.target.value) || 0 }))}
                />
              </div>
              <div className="space-y-2">
                <Label>Category</Label>
                <Select 
                  value={formData.category}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(cat => (
                      <SelectItem key={cat.value} value={cat.value}>{cat.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Status</Label>
                <Select 
                  value={formData.status}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, status: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Chapters (JSON)</Label>
              <Textarea
                value={formData.chapters}
                onChange={(e) => setFormData(prev => ({ ...prev, chapters: e.target.value }))}
                placeholder='[{"number": 1, "title": "Introduction", "startTime": 0, "duration": 300}]'
                rows={6}
                className="font-mono text-sm"
              />
              <p className="text-xs text-muted-foreground">
                Format: [{`{number, title, startTime (seconds), duration (seconds)}`}]
              </p>
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={saving}>
              {saving && <Loader2 className="w-4 h-4 animate-spin mr-2" />}
              {editingId ? 'Update' : 'Create'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AudiobookManager;
