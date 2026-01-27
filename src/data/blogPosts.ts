export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage?: string;
  category: string;
  tags: string[];
  author: {
    name: string;
    avatar?: string;
  };
  publishedAt: string;
  readTime: number; // minutes
}

export const blogCategories = [
  { id: 'insights', label: 'Insights', description: 'Deep dives into Dharmic wisdom' },
  { id: 'practices', label: 'Practices', description: 'Spiritual practices and techniques' },
  { id: 'philosophy', label: 'Philosophy', description: 'Philosophical explorations' },
  { id: 'culture', label: 'Culture', description: 'Hindu culture and traditions' },
  { id: 'festivals', label: 'Festivals', description: 'Sacred celebrations and observances' },
];

export const sampleBlogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Understanding the Concept of Ṛta in Daily Life',
    slug: 'understanding-rta-in-daily-life',
    excerpt: 'How the ancient Vedic principle of cosmic order can guide our modern decisions and bring harmony to everyday existence.',
    content: `The concept of Ṛta (ऋत) represents one of the most profound insights of Vedic philosophy...`,
    featuredImage: '/placeholder.svg',
    category: 'philosophy',
    tags: ['Ṛta', 'Vedic', 'Daily Practice', 'Cosmic Order'],
    author: { name: 'RTA Editorial' },
    publishedAt: '2025-01-15',
    readTime: 8
  },
  {
    id: '2',
    title: 'The Sacred Geography of Bharat: Pilgrimage as Spiritual Practice',
    slug: 'sacred-geography-pilgrimage',
    excerpt: 'Exploring how the land itself becomes a teacher through the ancient tradition of tīrtha-yātrā.',
    content: `In Sanātana Dharma, the physical landscape is inseparable from the spiritual...`,
    featuredImage: '/placeholder.svg',
    category: 'culture',
    tags: ['Pilgrimage', 'Sacred Places', 'Tīrtha', 'Spiritual Practice'],
    author: { name: 'RTA Editorial' },
    publishedAt: '2025-01-10',
    readTime: 12
  },
  {
    id: '3',
    title: 'Mahāśivarātri: The Great Night of Consciousness',
    slug: 'mahashivaratri-consciousness',
    excerpt: 'The cosmic significance of Śivarātri and practices for spiritual awakening during this sacred night.',
    content: `Mahāśivarātri marks the convergence of cosmic energies...`,
    featuredImage: '/placeholder.svg',
    category: 'festivals',
    tags: ['Śiva', 'Festivals', 'Meditation', 'Consciousness'],
    author: { name: 'RTA Editorial' },
    publishedAt: '2025-01-05',
    readTime: 10
  }
];

export const getBlogPostBySlug = (slug: string): BlogPost | undefined => {
  return sampleBlogPosts.find(post => post.slug === slug);
};
