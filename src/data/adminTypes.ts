export interface ContentItem {
  id: string;
  type: 'article' | 'audiobook' | 'scripture' | 'philosophy' | 'blog';
  title: string;
  status: 'draft' | 'published' | 'archived';
  author?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AdminStats {
  totalArticles: number;
  totalAudiobooks: number;
  totalScriptures: number;
  totalUsers: number;
  pendingContent: number;
}

// Content types that admins can manage
export const contentTypes = [
  { id: 'blog', label: 'Blog Posts', icon: 'Feather', description: 'Journal articles and insights' },
  { id: 'philosophy', label: 'Philosophy', icon: 'BookOpen', description: 'Vedic philosophy articles' },
  { id: 'audiobooks', label: 'Audiobooks', icon: 'Headphones', description: 'Audio content library' },
  { id: 'scriptures', label: 'Scriptures', icon: 'Scroll', description: 'Sacred texts and verses' },
  { id: 'galleries', label: 'Galleries', icon: 'Image', description: 'Image collections' },
] as const;

export type ContentType = typeof contentTypes[number]['id'];
