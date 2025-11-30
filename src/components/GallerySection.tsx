import { useState, useEffect, useRef } from 'react';

const Badge = ({ children, className, variant }: { children: React.ReactNode; className?: string; variant?: string }) => (
  <span className={`inline-flex items-center rounded-full ${className || ''}`}>
    {children}
  </span>
);

const galleryImages = [
  { id: 1, src: '/gallery/1_1764235228906.webp', alt: 'Love Over Coffee Gallery Image 1' },
  { id: 2, src: '/gallery/2_1764235241663.webp', alt: 'Love Over Coffee Gallery Image 2' },
  { id: 3, src: '/gallery/3_1764235241664.webp', alt: 'Love Over Coffee Gallery Image 3' },
  { id: 4, src: '/gallery/4_1764235241666.jpg', alt: 'Love Over Coffee Gallery Image 4' },
  { id: 5, src: '/gallery/5_1764235272760.jpg', alt: 'Love Over Coffee Gallery Image 5' },
  { id: 6, src: '/gallery/6_1764235272768.jpg', alt: 'Love Over Coffee Gallery Image 6' },
  { id: 7, src: '/gallery/7_1764235272770.webp', alt: 'Love Over Coffee Gallery Image 7' },
  { id: 8, src: '/gallery/12_1764235272771.webp', alt: 'Love Over Coffee Gallery Image 8' },
  { id: 9, src: '/gallery/18_1764235304205.webp', alt: 'Love Over Coffee Gallery Image 9' },
  { id: 10, src: '/gallery/19_1764235304207.webp', alt: 'Love Over Coffee Gallery Image 10' },
  { id: 11, src: '/gallery/22_1764235292088.webp', alt: 'Love Over Coffee Gallery Image 11' },
  { id: 12, src: '/gallery/23_1764235292092.webp', alt: 'Love Over Coffee Gallery Image 12' },
  { id: 13, src: '/gallery/24_1764235292095.webp', alt: 'Love Over Coffee Gallery Image 13' },
  { id: 14, src: '/gallery/28_1764235304208.webp', alt: 'Love Over Coffee Gallery Image 14' },
];

export default function GallerySection() {
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());
  const [isVisible, setIsVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

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
      <div className="absolute inset-0 bg-gradient-to-b from-background via-purple-950/10 to-background pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4 px-4 py-1 border-purple-500/30 text-purple-300">
            Moments at LOC
          </Badge>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent">
            Moments at LOC
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Peek into the cozy vibes and delicious moments our customers share
          </p>
        </div>

        <div className="columns-2 md:columns-4 lg:columns-5 gap-4 space-y-4">
          {galleryImages.map((image, index) => (
            <div
              key={image.id}
              className={`relative break-inside-avoid overflow-hidden cursor-pointer group transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{
                transitionDelay: `${(index % 9) * 50}ms`,
                borderRadius: '16px'
              }}
              onClick={() => setSelectedImage(index)}
              data-testid={`gallery-image-${image.id}`}
            >
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
                className={`w-full h-auto object-cover transition-all duration-500 group-hover:scale-110 ${
                  loadedImages.has(image.id) ? 'opacity-100' : 'opacity-0'
                }`}
                style={{
                  borderRadius: '16px',
                  border: '2px solid transparent',
                  boxShadow: '0 0 0 0 rgba(168, 85, 247, 0.5)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 0 20px rgba(168, 85, 247, 0.5)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = '0 0 0 0 rgba(168, 85, 247, 0.5)';
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl max-h-[90vh] w-full mx-4">
            <img
              src={galleryImages[selectedImage].src}
              alt={galleryImages[selectedImage].alt}
              className="w-full h-auto max-h-[90vh] object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />

            {/* Close Button */}
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 text-white hover:text-purple-300 transition-colors duration-200"
              aria-label="Close lightbox"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Previous Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePrevImage();
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-purple-300 transition-colors duration-200"
              aria-label="Previous image"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Next Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleNextImage();
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-purple-300 transition-colors duration-200"
              aria-label="Next image"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Image Counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-sm bg-black/50 px-3 py-1 rounded-full">
              {selectedImage + 1} / {galleryImages.length}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
