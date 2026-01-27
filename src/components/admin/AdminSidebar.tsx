import { motion } from "framer-motion";
import { 
  LayoutDashboard, 
  FileText, 
  Headphones, 
  Image, 
  BookOpen, 
  Plus,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type AdminView = 'overview' | 'blog-list' | 'blog-editor' | 'audiobooks' | 'galleries' | 'content';

interface AdminSidebarProps {
  currentView: AdminView;
  onViewChange: (view: AdminView) => void;
  onNewPost: () => void;
}

const menuItems = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'blog-list', label: 'Blog Posts', icon: FileText },
  { id: 'audiobooks', label: 'Audiobooks', icon: Headphones },
  { id: 'galleries', label: 'Galleries', icon: Image },
  { id: 'content', label: 'All Content', icon: BookOpen },
] as const;

const AdminSidebar = ({ currentView, onViewChange, onNewPost }: AdminSidebarProps) => {
  return (
    <aside className="w-64 bg-card border-r border-border min-h-full hidden lg:block">
      <div className="p-6">
        <h2 className="font-display text-lg text-foreground mb-1">Admin Dashboard</h2>
        <p className="text-sm text-muted-foreground">Content Management</p>
      </div>

      <div className="px-4 mb-4">
        <Button 
          onClick={onNewPost}
          className="w-full justify-start gap-2"
          size="sm"
        >
          <Plus className="w-4 h-4" />
          New Blog Post
        </Button>
      </div>

      <nav className="px-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id || 
            (item.id === 'blog-list' && currentView === 'blog-editor');
          
          return (
            <motion.button
              key={item.id}
              onClick={() => onViewChange(item.id as AdminView)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors mb-1",
                isActive 
                  ? "bg-primary/10 text-primary" 
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
              whileHover={{ x: 2 }}
              whileTap={{ scale: 0.98 }}
            >
              <Icon className="w-5 h-5" />
              <span className="font-body text-sm">{item.label}</span>
              {isActive && (
                <ChevronRight className="w-4 h-4 ml-auto" />
              )}
            </motion.button>
          );
        })}
      </nav>

      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-border">
        <p className="text-xs text-muted-foreground text-center">
          ṚTA Admin v1.0
        </p>
      </div>
    </aside>
  );
};

export default AdminSidebar;
