import { useState, useEffect, useRef } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';

interface GallerySectionProps {
  imageCount?: number;
}

export default function GallerySection({ imageCount = 24 }: GallerySectionProps) {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const galleryImages = Array.from({ length: Math.min(imageCount, 49) }, (_, i) => ({
    id: i + 1,
    src: `/Gallery/${i + 1}.webp`,
    alt: `Love Over Coffee Gallery Image ${i + 1}`,
  }));

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleImageLoad = (id: number) => {
    setLoadedImages(prev => new Set(Array.from(prev).concat(id)));
  };

  const handlePrevImage = () => {
    if (selectedImage !== null) {
      setSelectedImage(selectedImage === 0 ? galleryImages.length - 1 : selectedImage - 1);
    }
  };

  const handleNextImage = () => {
    if (selectedImage !== null) {
      setSelectedImage(selectedImage === galleryImages.length - 1 ? 0 : selectedImage + 1);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImage === null) return;
      if (e.key === 'Escape') setSelectedImage(null);
      if (e.key === 'ArrowLeft') handlePrevImage();
      if (e.key === 'ArrowRight') handleNextImage();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage]);

  return (
    <section id="gallery" ref={sectionRef} className="py-20 md:py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-blue-950/5 to-background pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4 px-4 py-1 border-blue-500/30 text-blue-300">
            Gallery
          </Badge>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white via-blue-200 to-white bg-clip-text text-transparent">
            Moments at LOC
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Peek into the cozy vibes and delicious moments our customers share
          </p>
        </div>

        <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
          {galleryImages.map((image, index) => (
            <div
              key={image.id}
              className={`relative break-inside-avoid rounded-lg overflow-hidden cursor-pointer group transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${(index % 9) * 50}ms` }}
              onClick={() => setSelectedImage(index)}
              data-testid={`gallery-image-${image.id}`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-blue-900/20 z-10 opacity-0 group-hover:opacity-100 transition-opacity" />
              
              {!loadedImages.has(image.id) && (
                <div className="aspect-square bg-card animate-pulse flex items-center justify-center">
                  <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                </div>
              )}
              
              <img
                src={image.src}
                alt={image.alt}
                loading="lazy"
                onLoad={() => handleImageLoad(image.id)}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  const parent = target.parentElement;
                  if (parent) parent.style.display = 'none';
                }}
                className={`w-full h-auto object-cover transition-all duration-500 ${
                  loadedImages.has(image.id) ? 'opacity-100' : 'opacity-0'
                } group-hover:scale-105`}
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
              
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <Maximize2 className="w-5 h-5 text-white" />
                </div>
              </div>
              
              <div className="absolute inset-0 border border-white/0 group-hover:border-white/20 rounded-lg transition-colors duration-300 z-10 pointer-events-none" />
            </div>
          ))}
        </div>
      </div>

      {selectedImage !== null && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => { e.stopPropagation(); setSelectedImage(null); }}
            className="absolute top-4 right-4 text-white hover:bg-white/10 z-10"
            data-testid="button-close-lightbox"
          >
            <X className="w-6 h-6" />
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => { e.stopPropagation(); handlePrevImage(); }}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/10"
            data-testid="button-lightbox-prev"
          >
            <ChevronLeft className="w-8 h-8" />
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => { e.stopPropagation(); handleNextImage(); }}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/10"
            data-testid="button-lightbox-next"
          >
            <ChevronRight className="w-8 h-8" />
          </Button>
          
          <img
            src={galleryImages[selectedImage].src}
            alt={galleryImages[selectedImage].alt}
            className="max-w-full max-h-[85vh] object-contain rounded-lg animate-fade-in-up"
            onClick={(e) => e.stopPropagation()}
          />
          
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/60 text-sm">
            {selectedImage + 1} / {galleryImages.length}
          </div>
        </div>
      )}
    </section>
  );
}
