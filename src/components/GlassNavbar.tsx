import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Coffee, Menu, X, Sparkles } from 'lucide-react';

interface NavItem {
  label: string;
  href: string;
}

interface GlassNavbarProps {
  onNavigate?: (section: string) => void;
  onAskMaggie?: () => void;
}

const navItems: NavItem[] = [
  { label: 'Home', href: 'hero' },
  { label: 'Menu', href: 'menu' },
  { label: 'Gallery', href: 'gallery' },
  { label: 'Videos', href: 'videos' },
  { label: 'Location', href: 'location' },
];

export default function GlassNavbar({ onNavigate, onAskMaggie }: GlassNavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    onNavigate?.(href);
    setIsMobileMenuOpen(false);
    const element = document.getElementById(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'backdrop-blur-xl bg-background/60 border-b border-white/10 shadow-lg shadow-purple-500/5'
            : 'backdrop-blur-sm bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            <button
              onClick={() => handleNavClick('hero')}
              className="flex items-center gap-2 group"
              data-testid="link-home"
            >
              <div className="relative">
                <Coffee className="w-8 h-8 text-primary transition-transform group-hover:scale-110" />
                <div className="absolute inset-0 bg-primary/30 blur-xl rounded-full animate-pulse-glow" />
              </div>
              <span className="font-display text-xl font-bold bg-gradient-to-r from-purple-400 via-pink-300 to-amber-300 bg-clip-text text-transparent">
                Love Over Coffee
              </span>
            </button>

            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <Button
                  key={item.href}
                  variant="ghost"
                  onClick={() => handleNavClick(item.href)}
                  className="text-muted-foreground hover:text-foreground transition-colors px-4"
                  data-testid={`link-nav-${item.href}`}
                >
                  {item.label}
                </Button>
              ))}
              
              <Button
                onClick={onAskMaggie}
                className="ml-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white rounded-full px-5 shadow-lg shadow-purple-500/25 transition-all duration-300 hover:shadow-purple-500/40 hover:scale-105 animate-breathing-glow"
                data-testid="button-ask-maggie-nav"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Ask Maggie
              </Button>
            </div>

            <div className="flex items-center gap-2 md:hidden">
              <Button
                onClick={onAskMaggie}
                size="sm"
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white rounded-full px-4 shadow-lg shadow-purple-500/25 animate-breathing-glow"
                data-testid="button-ask-maggie-mobile"
              >
                <Sparkles className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                data-testid="button-mobile-menu"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div 
            className="absolute inset-0 bg-background/80 backdrop-blur-xl"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="absolute top-20 left-4 right-4 p-4 rounded-lg bg-card/90 backdrop-blur-xl border border-white/10 shadow-2xl animate-fade-in-up">
            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                <Button
                  key={item.href}
                  variant="ghost"
                  onClick={() => handleNavClick(item.href)}
                  className="w-full justify-start text-lg py-6"
                  data-testid={`link-mobile-nav-${item.href}`}
                >
                  {item.label}
                </Button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
