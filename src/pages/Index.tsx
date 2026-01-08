import HeroSection from "@/components/sections/HeroSection";
import WhatIsRtaSection from "@/components/sections/WhatIsRtaSection";
import QuestionsSection from "@/components/sections/QuestionsSection";
import SchoolsSection from "@/components/sections/SchoolsSection";
import DebatesSection from "@/components/sections/DebatesSection";
import SabhaSection from "@/components/sections/SabhaSection";
import CuratorSection from "@/components/sections/CuratorSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <HeroSection />
      <WhatIsRtaSection />
      <QuestionsSection />
      <SchoolsSection />
      <DebatesSection />
      <SabhaSection />
      <CuratorSection />
      <Footer />
    </main>
  );
};

export default Index;
