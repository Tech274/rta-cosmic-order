import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { 
  Plus, 
  Upload, 
  Trash2, 
  Image as ImageIcon, 
  Loader2, 
  X,
  FolderOpen
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface GalleryImage {
  url: string;
  caption: string;
  alt: string;
}

interface Gallery {
  id: string;
  title: string;
  description: string | null;
  content_type: string;
  content_id: string;
  images: GalleryImage[];
  created_at: string;
}

const contentTypes = [
  { value: 'tantra', label: 'Tantra Articles' },
  { value: 'philosophy', label: 'Philosophy' },
  { value: 'temple', label: 'Temples' },
  { value: 'blog', label: 'Blog Posts' },
  { value: 'general', label: 'General' }
];

const GalleryManager = () => {
  const { toast } = useToast();
  const [galleries, setGalleries] = useState<Gallery[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    content_type: 'general',
    content_id: '',
    images: [] as GalleryImage[]
  });

  const [newImage, setNewImage] = useState({
    url: '',
    caption: '',
    alt: ''
  });

  useEffect(() => {
    fetchGalleries();
  }, []);

  const fetchGalleries = async () => {
    try {
      const { data, error } = await supabase
        .from('content_galleries')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      setGalleries((data || []).map(g => ({
        ...g,
        images: (g.images as unknown as GalleryImage[]) || []
      })));
    } catch (error) {
      console.error('Error fetching galleries:', error);
      toast({
        title: "Error",
        description: "Failed to load galleries",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const openDialog = (gallery?: Gallery) => {
    if (gallery) {
      setEditingId(gallery.id);
      setFormData({
        title: gallery.title,
        description: gallery.description || '',
        content_type: gallery.content_type,
        content_id: gallery.content_id,
        images: gallery.images
      });
    } else {
      setEditingId(null);
      setFormData({
        title: '',
        description: '',
        content_type: 'general',
        content_id: '',
        images: []
      });
    }
    setNewImage({ url: '', caption: '', alt: '' });
    setDialogOpen(true);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid file",
        description: "Please upload an image file",
        variant: "destructive"
      });
      return;
    }

    setUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${formData.content_type}/${formData.content_id || 'general'}/${Date.now()}.${fileExt}`;

      const { data, error } = await supabase.storage
        .from('gallery-images')
        .upload(fileName, file);

      if (error) throw error;

      const { data: publicUrl } = supabase.storage
        .from('gallery-images')
        .getPublicUrl(fileName);

      setNewImage(prev => ({
        ...prev,
        url: publicUrl.publicUrl
      }));

      toast({
        title: "Uploaded",
        description: "Image uploaded successfully"
      });
    } catch (error: any) {
      console.error('Upload error:', error);
      toast({
        title: "Upload failed",
        description: error.message || "Failed to upload image",
        variant: "destructive"
      });
    } finally {
      setUploading(false);
    }
  };

  const addImage = () => {
    if (!newImage.url) {
      toast({
        title: "Error",
        description: "Please provide an image URL",
        variant: "destructive"
      });
      return;
    }

    setFormData(prev => ({
      ...prev,
      images: [...prev.images, { ...newImage }]
    }));
    setNewImage({ url: '', caption: '', alt: '' });
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleSave = async () => {
    if (!formData.title || !formData.content_id) {
      toast({
        title: "Validation Error",
        description: "Title and content ID are required",
        variant: "destructive"
      });
      return;
    }

    setSaving(true);
    try {
      const galleryData = {
        title: formData.title,
        description: formData.description || null,
        content_type: formData.content_type,
        content_id: formData.content_id,
        images: formData.images as unknown as any
      };

      if (editingId) {
        const { error } = await supabase
          .from('content_galleries')
          .update(galleryData)
          .eq('id', editingId);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('content_galleries')
          .insert(galleryData);

        if (error) throw error;
      }

      toast({
        title: "Success",
        description: editingId ? "Gallery updated" : "Gallery created"
      });

      setDialogOpen(false);
      fetchGalleries();
    } catch (error: any) {
      console.error('Error saving gallery:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to save gallery",
        variant: "destructive"
      });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this gallery?')) return;

    try {
      const { error } = await supabase
        .from('content_galleries')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setGalleries(prev => prev.filter(g => g.id !== id));
      toast({
        title: "Deleted",
        description: "Gallery has been deleted"
      });
    } catch (error) {
      console.error('Error deleting gallery:', error);
      toast({
        title: "Error",
        description: "Failed to delete gallery",
        variant: "destructive"
      });
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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl text-foreground">Galleries</h1>
          <p className="text-muted-foreground">{galleries.length} galleries total</p>
        </div>
        <Button onClick={() => openDialog()}>
          <Plus className="w-4 h-4 mr-2" />
          New Gallery
        </Button>
      </div>

      {galleries.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <FolderOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">No galleries yet. Create your first gallery!</p>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {galleries.map((gallery) => (
            <motion.div
              key={gallery.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="bg-card border-border overflow-hidden">
                <div className="aspect-video bg-muted relative grid grid-cols-2 gap-0.5 p-0.5">
                  {gallery.images.slice(0, 4).map((img, i) => (
                    <div key={i} className="bg-muted-foreground/10">
                      {img.url ? (
                        <img src={img.url} alt={img.alt} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <ImageIcon className="w-6 h-6 text-muted-foreground" />
                        </div>
                      )}
                    </div>
                  ))}
                  {gallery.images.length === 0 && (
                    <div className="col-span-2 row-span-2 flex items-center justify-center">
                      <ImageIcon className="w-12 h-12 text-muted-foreground" />
                    </div>
                  )}
                </div>
                <CardContent className="p-4">
                  <h3 className="font-display text-lg text-foreground">{gallery.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {gallery.images.length} images • {gallery.content_type}
                  </p>
                  <div className="flex justify-end gap-2 mt-4">
                    <Button variant="ghost" size="sm" onClick={() => openDialog(gallery)}>
                      Edit
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-destructive"
                      onClick={() => handleDelete(gallery.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {/* Gallery Editor Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-display">
              {editingId ? 'Edit Gallery' : 'New Gallery'}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Title</Label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Gallery title"
                />
              </div>
              <div className="space-y-2">
                <Label>Content ID</Label>
                <Input
                  value={formData.content_id}
                  onChange={(e) => setFormData(prev => ({ ...prev, content_id: e.target.value }))}
                  placeholder="e.g., kali, sri-vidya"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Content Type</Label>
                <Select 
                  value={formData.content_type}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, content_type: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {contentTypes.map(type => (
                      <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Input
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Brief description"
                />
              </div>
            </div>

            {/* Add Image Section */}
            <Card className="bg-muted/50">
              <CardHeader className="py-3">
                <CardTitle className="text-sm font-medium">Add Image</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex gap-2">
                  <Input
                    value={newImage.url}
                    onChange={(e) => setNewImage(prev => ({ ...prev, url: e.target.value }))}
                    placeholder="Image URL"
                    className="flex-1"
                  />
                  <div className="relative">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      disabled={uploading}
                    />
                    <Button variant="outline" disabled={uploading}>
                      {uploading ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Upload className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <Input
                    value={newImage.caption}
                    onChange={(e) => setNewImage(prev => ({ ...prev, caption: e.target.value }))}
                    placeholder="Caption"
                  />
                  <Input
                    value={newImage.alt}
                    onChange={(e) => setNewImage(prev => ({ ...prev, alt: e.target.value }))}
                    placeholder="Alt text"
                  />
                </div>
                <Button onClick={addImage} size="sm" className="w-full">
                  <Plus className="w-4 h-4 mr-2" />
                  Add to Gallery
                </Button>
              </CardContent>
            </Card>

            {/* Image Grid */}
            {formData.images.length > 0 && (
              <div>
                <Label className="mb-2 block">Gallery Images ({formData.images.length})</Label>
                <div className="grid grid-cols-3 gap-2">
                  {formData.images.map((img, index) => (
                    <div key={index} className="relative group aspect-square bg-muted rounded overflow-hidden">
                      {img.url ? (
                        <img src={img.url} alt={img.alt} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <ImageIcon className="w-8 h-8 text-muted-foreground" />
                        </div>
                      )}
                      <button
                        onClick={() => removeImage(index)}
                        className="absolute top-1 right-1 p-1 bg-destructive rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-3 h-3 text-white" />
                      </button>
                      <div className="absolute bottom-0 left-0 right-0 p-1 bg-black/50 text-xs text-white truncate">
                        {img.caption || 'No caption'}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
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

export default GalleryManager;
