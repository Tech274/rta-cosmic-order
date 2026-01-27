import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAdmin } from "@/hooks/useAdmin";
import { useAuth } from "@/hooks/useAuth";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminOverview from "@/components/admin/AdminOverview";
import BlogEditor from "@/components/admin/BlogEditor";
import ContentList from "@/components/admin/ContentList";
import AudiobookManager from "@/components/admin/AudiobookManager";
import GalleryManager from "@/components/admin/GalleryManager";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Loader2, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";

type AdminView = 'overview' | 'blog-list' | 'blog-editor' | 'audiobooks' | 'galleries' | 'content';

const Admin = () => {
  const { user, loading: authLoading } = useAuth();
  const { isAdmin, isModerator, isLoading: roleLoading } = useAdmin();
  const navigate = useNavigate();
  const [currentView, setCurrentView] = useState<AdminView>('overview');
  const [editingPostId, setEditingPostId] = useState<string | null>(null);

  const isLoading = authLoading || roleLoading;

  useEffect(() => {
    if (!isLoading && !user) {
      navigate('/');
    }
  }, [user, isLoading, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAdmin && !isModerator) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center p-8"
          >
            <ShieldAlert className="w-16 h-16 text-destructive mx-auto mb-4" />
            <h1 className="font-display text-2xl text-foreground mb-2">Access Denied</h1>
            <p className="text-muted-foreground mb-6">
              You do not have permission to access the admin dashboard.
            </p>
            <Button onClick={() => navigate('/')}>Return Home</Button>
          </motion.div>
        </div>
        <Footer />
      </div>
    );
  }

  const handleEditPost = (postId: string) => {
    setEditingPostId(postId);
    setCurrentView('blog-editor');
  };

  const handleBackToList = () => {
    setEditingPostId(null);
    setCurrentView('blog-list');
  };

  const renderContent = () => {
    switch (currentView) {
      case 'overview':
        return <AdminOverview />;
      case 'blog-list':
        return <ContentList type="blog" onEdit={handleEditPost} />;
      case 'blog-editor':
        return <BlogEditor postId={editingPostId} onBack={handleBackToList} />;
      case 'audiobooks':
        return <AudiobookManager />;
      case 'galleries':
        return <GalleryManager />;
      case 'content':
        return <ContentList type="all" onEdit={handleEditPost} />;
      default:
        return <AdminOverview />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="flex min-h-[calc(100vh-200px)]">
        <AdminSidebar 
          currentView={currentView} 
          onViewChange={setCurrentView}
          onNewPost={() => {
            setEditingPostId(null);
            setCurrentView('blog-editor');
          }}
        />
        
        <main className="flex-1 p-6 lg:p-8 pt-20 lg:pt-8">
          <motion.div
            key={currentView}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            {renderContent()}
          </motion.div>
        </main>
      </div>
      
      <Footer />
    </div>
  );
};

export default Admin;
