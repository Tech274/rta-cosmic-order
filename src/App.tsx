import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { SearchProvider } from "@/contexts/SearchContext";
import Index from "./pages/Index";
import KarmaHistory from "./pages/KarmaHistory";
import Temples from "./pages/Temples";
import TempleDetail from "./pages/TempleDetail";
import Scriptures from "./pages/Scriptures";
import ScriptureDetail from "./pages/ScriptureDetail";
import ChapterDetail from "./pages/ChapterDetail";
import TantraDetail from "./pages/TantraDetail";
import Sadhana from "./pages/Sadhana";
import DailyDharma from "./pages/DailyDharma";
import DharmaPath from "./pages/DharmaPath";
import Profile from "./pages/Profile";
import Meditation from "./pages/Meditation";
import Philosophy from "./pages/Philosophy";
import Blog from "./pages/Blog";
import Admin from "./pages/Admin";
import Audiobooks from "./pages/Audiobooks";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <SearchProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/karma-history" element={<KarmaHistory />} />
              <Route path="/temples" element={<Temples />} />
              <Route path="/temples/:id" element={<TempleDetail />} />
              <Route path="/scriptures" element={<Scriptures />} />
              <Route path="/scriptures/:id" element={<ScriptureDetail />} />
              <Route path="/scriptures/:scriptureId/chapters/:chapterId" element={<ChapterDetail />} />
              <Route path="/scriptures/tantra/:categoryId" element={<TantraDetail />} />
              <Route path="/scriptures/tantra/:categoryId/:articleId" element={<TantraDetail />} />
              <Route path="/sadhana" element={<Sadhana />} />
              <Route path="/daily-dharma" element={<DailyDharma />} />
              <Route path="/dharma-path" element={<DharmaPath />} />
              <Route path="/profile/:userId" element={<Profile />} />
              <Route path="/meditation" element={<Meditation />} />
              <Route path="/philosophy" element={<Philosophy />} />
              <Route path="/philosophy/:articleId" element={<Philosophy />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<Blog />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/audiobooks" element={<Audiobooks />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </SearchProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
