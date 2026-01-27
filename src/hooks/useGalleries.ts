import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

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
}

export const useGalleries = (contentType?: string, contentId?: string) => {
  const [galleries, setGalleries] = useState<Gallery[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGalleries = async () => {
      setLoading(true);
      setError(null);

      try {
        let query = supabase
          .from('content_galleries')
          .select('*')
          .order('created_at', { ascending: false });

        if (contentType) {
          query = query.eq('content_type', contentType);
        }

        if (contentId) {
          query = query.eq('content_id', contentId);
        }

        const { data, error: fetchError } = await query;

        if (fetchError) throw fetchError;

        setGalleries((data || []).map(g => ({
          ...g,
          images: (g.images as unknown as GalleryImage[]) || []
        })));
      } catch (err: any) {
        console.error('Error fetching galleries:', err);
        setError(err.message || 'Failed to load galleries');
      } finally {
        setLoading(false);
      }
    };

    fetchGalleries();
  }, [contentType, contentId]);

  const getGalleryForContent = (type: string, id: string) => {
    return galleries.find(g => g.content_type === type && g.content_id === id);
  };

  return {
    galleries,
    loading,
    error,
    getGalleryForContent
  };
};

export default useGalleries;
