import { Coffee, Instagram, Facebook, Twitter, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
  ];

  const footerLinks = [
    { label: 'Menu', href: '#menu' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Videos', href: '#videos' },
    { label: 'Location', href: '#location' },
  ];

  return (
    <footer className="relative py-12 md:py-16 border-t border-white/10">
      <div className="absolute inset-0 bg-gradient-to-t from-purple-950/20 to-transparent pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="relative">
                <Coffee className="w-8 h-8 text-primary" />
                <div className="absolute inset-0 bg-primary/30 blur-xl rounded-full" />
              </div>
              <span className="font-display text-xl font-bold bg-gradient-to-r from-purple-400 via-pink-300 to-amber-300 bg-clip-text text-transparent">
                Love Over Coffee
              </span>
            </div>
            <p className="text-muted-foreground text-sm max-w-xs">
              Where every sip tells a story. Premium coffee, artisan food, and an ambiance 
              that feels like a warm hug.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <div className="grid grid-cols-2 gap-2">
              {footerLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                  data-testid={`link-footer-${link.label.toLowerCase()}`}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Connect With Us</h4>
            <div className="flex gap-2">
              {socialLinks.map((social) => (
                <Button
                  key={social.label}
                  variant="ghost"
                  size="icon"
                  asChild
                  className="bg-white/5 hover:bg-white/10 border border-white/10"
                >
                  <a 
                    href={social.href}
                    aria-label={social.label}
                    data-testid={`link-social-${social.label.toLowerCase()}`}
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                </Button>
              ))}
            </div>
            <p className="text-muted-foreground text-sm mt-4">
              PLOT NO 11, Scheme No 51<br />
              Indore, Madhya Pradesh
            </p>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-sm text-center md:text-left">
            © {currentYear} Love Over Coffee. All rights reserved.
          </p>
          <p className="text-muted-foreground text-sm flex items-center gap-1">
            Made with <Heart className="w-4 h-4 text-red-500 fill-red-500" /> in Indore
          </p>
        </div>
      </div>
    </footer>
  );
}
