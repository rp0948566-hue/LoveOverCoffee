import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp, Sparkles } from 'lucide-react';
import gsap from 'gsap';

interface HeroSectionProps {
  onAskMaggie?: () => void;
  onViewMenu?: () => void;
}

interface HeroItem {
  id: number;
  name: string;
  tagline: string;
  image: string;
  bgColor: string;
  accentColor: string;
}

const heroItems: HeroItem[] = [
  {
    id: 1,
    name: 'Cold Coffee',
    tagline: 'Chilled to Perfection',
    image: 'https://www.pngplay.com/wp-content/uploads/6/3D-Coffee-Cup-PNG-Transparent-Image.png',
    bgColor: '#2a1810',
    accentColor: 'rgba(139, 90, 43, 0.4)'
  },
  {
    id: 2,
    name: 'Pizza',
    tagline: 'Cheesy Goodness',
    image: 'https://www.pngplay.com/wp-content/uploads/6/3D-Pizza-PNG-Transparent-Image.png',
    bgColor: '#2d1212',
    accentColor: 'rgba(220, 60, 30, 0.4)'
  },
  {
    id: 3,
    name: 'Mojito',
    tagline: 'Fresh & Minty',
    image: 'https://www.pngplay.com/wp-content/uploads/6/3D-Mojito-PNG-Transparent-Image.png',
    bgColor: '#0d2a1f',
    accentColor: 'rgba(34, 197, 94, 0.4)'
  },
  {
    id: 4,
    name: 'Sandwich',
    tagline: 'Layered with Love',
    image: 'https://www.pngplay.com/wp-content/uploads/6/3D-Sandwich-PNG-Transparent-Image.png',
    bgColor: '#2d2510',
    accentColor: 'rgba(234, 179, 8, 0.4)'
  },
];

export default function HeroSection({ onAskMaggie, onViewMenu }: HeroSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const bgRef = useRef<HTMLDivElement>(null);

  const currentItem = heroItems[currentIndex];

  const animateToIndex = (newIndex: number) => {
    if (isAnimating || newIndex === currentIndex) return;
    setIsAnimating(true);

    const currentEl = itemRefs.current[currentIndex];
    const nextEl = itemRefs.current[newIndex];
    const nextItem = heroItems[newIndex];

    if (!currentEl || !nextEl) return;

    const tl = gsap.timeline({
      onComplete: () => {
        setCurrentIndex(newIndex);
        setIsAnimating(false);
      }
    });

    gsap.set(nextEl, { 
      visibility: 'visible',
      y: '100%',
      opacity: 0,
      filter: 'blur(15px)',
      scale: 0.9
    });

    tl.to(bgRef.current, {
      background: `linear-gradient(180deg, ${nextItem.bgColor} 0%, #050511 40%, ${nextItem.accentColor} 100%)`,
      duration: 0.8,
      ease: 'power2.inOut'
    }, 0);

    tl.to(currentEl, {
      y: '120%',
      opacity: 0,
      filter: 'blur(20px)',
      scale: 0.85,
      duration: 0.7,
      ease: 'power3.in'
    }, 0);

    tl.to(nextEl, {
      y: '0%',
      opacity: 1,
      filter: 'blur(0px)',
      scale: 1,
      duration: 0.7,
      ease: 'power3.out'
    }, 0.2);
  };

  const goNext = () => {
    const nextIndex = (currentIndex + 1) % heroItems.length;
    animateToIndex(nextIndex);
  };

  const goPrev = () => {
    const prevIndex = currentIndex === 0 ? heroItems.length - 1 : currentIndex - 1;
    animateToIndex(prevIndex);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isAnimating) {
        goNext();
      }
    }, 3500);

    return () => clearInterval(interval);
  }, [currentIndex, isAnimating]);

  useEffect(() => {
    itemRefs.current.forEach((el, idx) => {
      if (el) {
        gsap.set(el, {
          visibility: idx === 0 ? 'visible' : 'hidden',
          y: idx === 0 ? '0%' : '100%',
          opacity: idx === 0 ? 1 : 0,
          filter: idx === 0 ? 'blur(0px)' : 'blur(15px)',
          scale: idx === 0 ? 1 : 0.9
        });
      }
    });
  }, []);

  const handleScrollDown = () => {
    const menuSection = document.getElementById('menu');
    if (menuSection) {
      menuSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <div 
        ref={bgRef}
        className="absolute inset-0 transition-all duration-1000"
        style={{
          background: `linear-gradient(180deg, ${currentItem.bgColor} 0%, #050511 40%, ${currentItem.accentColor} 100%)`
        }}
      />

      <div className="absolute inset-0 liquid-wave-bg opacity-30" />

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(25)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-amber-400/20 rounded-full animate-particle-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 20}s`,
              animationDuration: `${15 + Math.random() * 10}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-8 items-center min-h-[60vh]">
          <div className="text-center lg:text-left order-2 lg:order-1">
            <div className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 glassmorphism">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span className="text-sm text-muted-foreground">Indore's Premium Cafe</span>
            </div>

            <h1 className="font-display text-5xl md:text-7xl font-bold mb-6 leading-tight tracking-wide">
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-amber-400 animate-text-glow">
                LOVE OVER
              </span>
              <span className="block text-white mt-2">
                COFFEE
              </span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-lg mb-10">
              Where every sip tells a story. Experience the perfect blend of premium coffee, 
              artisan food, and an ambiance that feels like a warm hug.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
              <Button
                size="lg"
                onClick={onViewMenu}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white px-8 py-6 text-lg rounded-full shadow-lg shadow-purple-500/25 transition-all duration-300 hover:shadow-purple-500/40 hover:scale-105"
                data-testid="button-explore-menu"
              >
                Explore Menu
              </Button>
            </div>

            <div className="mt-12 flex items-center justify-center lg:justify-start gap-8 text-muted-foreground">
              <div className="text-center">
                <div className="text-3xl font-bold text-amber-400">50+</div>
                <div className="text-sm">Menu Items</div>
              </div>
              <div className="w-px h-10 bg-white/10" />
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-400">5K+</div>
                <div className="text-sm">Happy Customers</div>
              </div>
              <div className="w-px h-10 bg-white/10" />
              <div className="text-center">
                <div className="text-3xl font-bold text-pink-400">4.9</div>
                <div className="text-sm">Rating</div>
              </div>
            </div>
          </div>

          <div className="relative order-1 lg:order-2 h-[400px] md:h-[500px]">
            <div className="absolute inset-0 flex items-center justify-center">
              {heroItems.map((item, idx) => (
                <div
                  key={item.id}
                  ref={el => { itemRefs.current[idx] = el; }}
                  className="absolute inset-0 flex flex-col items-center justify-center"
                  style={{ visibility: idx === 0 ? 'visible' : 'hidden' }}
                >
                  <div className="relative w-64 h-64 md:w-80 md:h-80 mb-6">
                    <div
                      className="absolute inset-0 rounded-full blur-3xl opacity-70 animate-pulse"
                      style={{ backgroundColor: item.accentColor }}
                    />
                    <div className={`relative w-full h-full rounded-full overflow-hidden border-4 border-white/10 shadow-2xl backdrop-blur-sm hero-item ${idx === currentIndex ? 'active' : ''}`}>
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover hero-image-container"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400"><rect fill="%23050511" width="400" height="400"/><text fill="%23666" x="50%" y="50%" text-anchor="middle" dy=".3em" font-size="20">' + item.name + '</text></svg>';
                        }}
                      />
                    </div>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-2 font-display tracking-wide">{item.name}</h2>
                  <p className="text-lg text-amber-300/80">{item.tagline}</p>
                </div>
              ))}
            </div>

            <div className="absolute right-0 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-20">
              <Button
                variant="ghost"
                size="icon"
                onClick={goPrev}
                disabled={isAnimating}
                className="bg-white/10 backdrop-blur-xl border border-white/10 hover:bg-white/20 rounded-full glassmorphism"
                data-testid="button-hero-prev"
              >
                <ChevronUp className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={goNext}
                disabled={isAnimating}
                className="bg-white/10 backdrop-blur-xl border border-white/10 hover:bg-white/20 rounded-full glassmorphism"
                data-testid="button-hero-next"
              >
                <ChevronDown className="w-5 h-5" />
              </Button>
            </div>

            <div className="absolute left-1/2 -translate-x-1/2 bottom-0 flex gap-2">
              {heroItems.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => !isAnimating && animateToIndex(idx)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    idx === currentIndex 
                      ? 'bg-amber-400 w-6' 
                      : 'bg-white/30 hover:bg-white/50'
                  }`}
                  data-testid={`button-hero-dot-${idx}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={handleScrollDown}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground hover:text-foreground transition-colors animate-float"
        data-testid="button-scroll-down"
      >
        <ChevronDown className="w-8 h-8" />
      </button>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  );
}
