import { useState } from 'react';
import GlassNavbar from '@/components/GlassNavbar';
import HeroSection from '@/components/HeroSection';
import MenuCarousel from '@/components/MenuCarousel';
import GallerySection from '@/components/GallerySection';
import VideoSection from '@/components/VideoSection';
import LocationMap from '@/components/LocationMap';
import MaggieChat from '@/components/MaggieChat';
import Footer from '@/components/Footer';

export default function Home() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const handleViewMenu = () => {
    const menuSection = document.getElementById('menu');
    if (menuSection) {
      menuSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <GlassNavbar onAskMaggie={() => setIsChatOpen(true)} />
      
      <main>
        <HeroSection 
          onAskMaggie={() => setIsChatOpen(true)}
          onViewMenu={handleViewMenu}
        />
        <MenuCarousel onItemClick={(item) => console.log('Selected:', item)} />
        <GallerySection imageCount={24} />
        <VideoSection />
        <LocationMap />
      </main>
      
      <Footer />
      
      <MaggieChat isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </div>
  );
}
