import Header from "@/components/Header";
import HeroSection from "@/components/sections/HeroSection";
import WhatIsRtaSection from "@/components/sections/WhatIsRtaSection";
import SacredPlacesSection from "@/components/sections/SacredPlacesSection";
import QuestionsSection from "@/components/sections/QuestionsSection";
import SchoolsSection from "@/components/sections/SchoolsSection";
import DebatesSection from "@/components/sections/DebatesSection";
import SabhaSection from "@/components/sections/SabhaSection";
import ForumSection from "@/components/forum/ForumSection";
import LeaderboardSection from "@/components/sections/LeaderboardSection";
import CuratorSection from "@/components/sections/CuratorSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <WhatIsRtaSection />
      <SacredPlacesSection />
      <QuestionsSection />
      <SchoolsSection />
      <DebatesSection />
      <SabhaSection />
      <ForumSection />
      <LeaderboardSection />
      <CuratorSection />
      <Footer />
    </main>
  );
};

export default Index;
