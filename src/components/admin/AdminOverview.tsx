import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FileText, Headphones, Image, Users, TrendingUp, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";

interface Stats {
  totalPosts: number;
  totalAudiobooks: number;
  totalGalleries: number;
  totalUsers: number;
  publishedPosts: number;
  draftPosts: number;
}

const AdminOverview = () => {
  const [stats, setStats] = useState<Stats>({
    totalPosts: 0,
    totalAudiobooks: 0,
    totalGalleries: 0,
    totalUsers: 0,
    publishedPosts: 0,
    draftPosts: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [postsRes, audiobooksRes, galleriesRes, profilesRes] = await Promise.all([
          supabase.from('blog_posts').select('id, status'),
          supabase.from('audiobooks').select('id'),
          supabase.from('content_galleries').select('id'),
          supabase.from('profiles').select('id')
        ]);

        const posts = postsRes.data || [];
        
        setStats({
          totalPosts: posts.length,
          totalAudiobooks: audiobooksRes.data?.length || 0,
          totalGalleries: galleriesRes.data?.length || 0,
          totalUsers: profilesRes.data?.length || 0,
          publishedPosts: posts.filter(p => p.status === 'published').length,
          draftPosts: posts.filter(p => p.status === 'draft').length
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statCards = [
    { label: 'Total Posts', value: stats.totalPosts, icon: FileText, color: 'text-blue-500' },
    { label: 'Audiobooks', value: stats.totalAudiobooks, icon: Headphones, color: 'text-purple-500' },
    { label: 'Galleries', value: stats.totalGalleries, icon: Image, color: 'text-green-500' },
    { label: 'Total Users', value: stats.totalUsers, icon: Users, color: 'text-amber-500' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl text-foreground mb-2">Dashboard Overview</h1>
        <p className="text-muted-foreground">Monitor and manage your content</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="bg-card border-border">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                      <p className="text-3xl font-display text-foreground mt-1">
                        {loading ? '...' : stat.value}
                      </p>
                    </div>
                    <div className={`p-3 rounded-full bg-muted ${stat.color}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Content Status */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="font-display text-lg flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              Blog Post Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Published</span>
                <span className="font-display text-foreground">{stats.publishedPosts}</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className="bg-green-500 h-2 rounded-full transition-all"
                  style={{ 
                    width: stats.totalPosts > 0 
                      ? `${(stats.publishedPosts / stats.totalPosts) * 100}%` 
                      : '0%' 
                  }}
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Drafts</span>
                <span className="font-display text-foreground">{stats.draftPosts}</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className="bg-amber-500 h-2 rounded-full transition-all"
                  style={{ 
                    width: stats.totalPosts > 0 
                      ? `${(stats.draftPosts / stats.totalPosts) * 100}%` 
                      : '0%' 
                  }}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="font-display text-lg flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground">
                Welcome to the ṚTA Admin Dashboard. From here you can:
              </p>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  Create and publish blog posts
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  Manage audiobook content
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  Upload and organize image galleries
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  Review all content in one place
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminOverview;
