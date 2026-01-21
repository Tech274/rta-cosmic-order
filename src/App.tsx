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
import Sadhana from "./pages/Sadhana";
import DailyDharma from "./pages/DailyDharma";
import DharmaPath from "./pages/DharmaPath";
import Profile from "./pages/Profile";
import Meditation from "./pages/Meditation";
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
              <Route path="/sadhana" element={<Sadhana />} />
              <Route path="/daily-dharma" element={<DailyDharma />} />
              <Route path="/dharma-path" element={<DharmaPath />} />
              <Route path="/profile/:userId" element={<Profile />} />
              <Route path="/meditation" element={<Meditation />} />
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
