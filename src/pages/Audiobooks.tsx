import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Headphones, Clock, Search, Filter, Play, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useAudioPlayer } from "@/contexts/AudioPlayerContext";
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
}

interface AudiobookProgress {
  audiobook_id: string;
  current_chapter: number;
  current_position_seconds: number;
}

const categories = [
  { value: 'all', label: 'All Categories' },
  { value: 'vedanta', label: 'Vedānta' },
  { value: 'purana', label: 'Purāṇa' },
  { value: 'itihasa', label: 'Itihāsa' },
  { value: 'tantra', label: 'Tantra' },
  { value: 'general', label: 'General' }
];

const Audiobooks = () => {
  const { user } = useAuth();
  const { play, audiobook: currentAudiobook } = useAudioPlayer();
  const [audiobooks, setAudiobooks] = useState<Audiobook[]>([]);
  const [progress, setProgress] = useState<AudiobookProgress[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    fetchAudiobooks();
    if (user) {
      fetchProgress();
    }
  }, [user]);

  const fetchAudiobooks = async () => {
    try {
      const { data, error } = await supabase
        .from('audiobooks')
        .select('*')
        .eq('status', 'published')
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      setAudiobooks((data || []).map(book => ({
        ...book,
        chapters: (book.chapters as unknown as Chapter[]) || []
      })));
    } catch (error) {
      console.error('Error fetching audiobooks:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchProgress = async () => {
    try {
      const { data, error } = await supabase
        .from('audiobook_progress')
        .select('audiobook_id, current_chapter, current_position_seconds')
        .eq('user_id', user!.id);

      if (error) throw error;
      setProgress(data || []);
    } catch (error) {
      console.error('Error fetching progress:', error);
    }
  };

  const formatDuration = (seconds: number | null) => {
    if (!seconds) return 'N/A';
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  const getProgress = (audiobookId: string) => {
    return progress.find(p => p.audiobook_id === audiobookId);
  };

  const filteredAudiobooks = audiobooks.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || book.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const continueListening = audiobooks.filter(book => 
    progress.some(p => p.audiobook_id === book.id && p.current_position_seconds > 0)
  );

  const handlePlayAudiobook = (book: Audiobook) => {
    const bookProgress = getProgress(book.id);
    play(book, bookProgress);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-8 pb-16">
        {/* Hero */}
        <section className="px-6 py-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Headphones className="w-12 h-12 text-primary mx-auto mb-4" />
            <h1 className="font-display text-4xl md:text-5xl text-foreground mb-4">
              Sacred Audio Library
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Listen to ancient wisdom. Audiobooks of sacred texts, philosophical discourses, 
              and spiritual teachings, narrated with reverence and clarity.
            </p>
          </motion.div>
        </section>

        {/* Filters */}
        <section className="px-6 max-w-7xl mx-auto mb-12">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search audiobooks..."
                className="pl-10"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-48">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(cat => (
                  <SelectItem key={cat.value} value={cat.value}>{cat.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </section>

        {/* Continue Listening */}
        {continueListening.length > 0 && (
          <section className="px-6 max-w-7xl mx-auto mb-12">
            <h2 className="font-display text-2xl text-foreground mb-6">Continue Listening</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {continueListening.slice(0, 3).map(book => {
                const bookProgress = getProgress(book.id);
                const progressPercent = bookProgress && book.duration_seconds
                  ? (bookProgress.current_position_seconds / book.duration_seconds) * 100
                  : 0;

                return (
                  <motion.button
                    key={book.id}
                    onClick={() => handlePlayAudiobook(book)}
                    className={`flex items-center gap-4 p-4 bg-card border rounded-lg hover:border-primary/50 transition-colors text-left ${
                      currentAudiobook?.id === book.id ? 'border-primary' : 'border-border'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="w-16 h-16 bg-muted rounded flex-shrink-0 flex items-center justify-center">
                      {book.cover_image ? (
                        <img src={book.cover_image} alt={book.title} className="w-full h-full object-cover rounded" />
                      ) : (
                        <Headphones className="w-6 h-6 text-muted-foreground" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-display text-foreground truncate">{book.title}</h3>
                      <p className="text-sm text-muted-foreground">{book.author}</p>
                      <div className="w-full bg-muted rounded-full h-1 mt-2">
                        <div 
                          className="bg-primary h-1 rounded-full" 
                          style={{ width: `${progressPercent}%` }}
                        />
                      </div>
                    </div>
                    <Play className="w-8 h-8 text-primary flex-shrink-0" />
                  </motion.button>
                );
              })}
            </div>
          </section>
        )}

        {/* All Audiobooks */}
        <section className="px-6 max-w-7xl mx-auto">
          <h2 className="font-display text-2xl text-foreground mb-6">
            {selectedCategory === 'all' ? 'All Audiobooks' : categories.find(c => c.value === selectedCategory)?.label}
          </h2>

          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : filteredAudiobooks.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              No audiobooks found matching your criteria.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredAudiobooks.map((book, index) => (
                <motion.div
                  key={book.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <button
                    onClick={() => handlePlayAudiobook(book)}
                    className={`w-full text-left bg-card border rounded-lg overflow-hidden hover:border-primary/50 transition-colors group ${
                      currentAudiobook?.id === book.id ? 'border-primary' : 'border-border'
                    }`}
                  >
                    <div className="aspect-square bg-muted relative">
                      {book.cover_image ? (
                        <img 
                          src={book.cover_image} 
                          alt={book.title} 
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Headphones className="w-16 h-16 text-muted-foreground" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Play className="w-12 h-12 text-white" />
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-display text-foreground line-clamp-1">{book.title}</h3>
                      {book.sanskrit_title && (
                        <p className="font-sanskrit text-sm text-primary/70 line-clamp-1">{book.sanskrit_title}</p>
                      )}
                      <p className="text-sm text-muted-foreground mt-1">{book.author}</p>
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="w-3 h-3" />
                          {formatDuration(book.duration_seconds)}
                        </div>
                        <Badge variant="secondary" className="text-xs capitalize">
                          {book.category}
                        </Badge>
                      </div>
                    </div>
                  </button>
                </motion.div>
              ))}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Audiobooks;
