import { useState, useRef, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectCoverflow, Navigation } from 'swiper/modules';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Coffee, Pizza, Sandwich, IceCream, Soup } from 'lucide-react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/navigation';

interface MenuItem {
  id: string;
  name: string;
  price: number;
  category: string;
  description: string;
  image?: string;
  isPopular?: boolean;
}

interface MenuCarouselProps {
  onItemClick?: (item: MenuItem) => void;
}

const menuItems: MenuItem[] = [
  { id: '1', name: 'Cappuccino', price: 130, category: 'Hot Coffee', description: 'Rich espresso with creamy steamed milk foam', isPopular: true },
  { id: '2', name: 'Cold Brew', price: 150, category: 'Cold Coffee', description: 'Slow-steeped for 20 hours, smooth & bold' },
  { id: '3', name: 'Paneer Bhurji Pizza', price: 360, category: 'Pizza', description: 'Spicy paneer bhurji on crispy crust', isPopular: true },
  { id: '4', name: 'Alfredo Pasta', price: 280, category: 'Pasta', description: 'Creamy white sauce with herbs' },
  { id: '5', name: 'Maggie Special', price: 120, category: 'Maggie', description: 'Loaded with veggies and cheese', isPopular: true },
  { id: '6', name: 'Club Sandwich', price: 220, category: 'Sandwiches', description: 'Triple-decker with chicken & veggies' },
  { id: '7', name: 'Chocolate Shake', price: 180, category: 'Shakes', description: 'Rich Belgian chocolate blended smooth' },
  { id: '8', name: 'Hazelnut Latte', price: 160, category: 'Hot Coffee', description: 'Aromatic hazelnut with espresso' },
  { id: '9', name: 'Iced Mocha', price: 170, category: 'Cold Coffee', description: 'Espresso meets chocolate over ice' },
  { id: '10', name: 'Veggie Supreme Pizza', price: 340, category: 'Pizza', description: 'Garden fresh veggies with mozzarella' },
];

const categoryIcons: Record<string, typeof Coffee> = {
  'Hot Coffee': Coffee,
  'Cold Coffee': IceCream,
  'Pizza': Pizza,
  'Pasta': Soup,
  'Maggie': Soup,
  'Sandwiches': Sandwich,
  'Shakes': IceCream,
};

const categories = ['All', ...Array.from(new Set(menuItems.map(item => item.category)))];

export default function MenuCarousel({ onItemClick }: MenuCarouselProps) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const swiperRef = useRef<any>(null);

  const filteredItems = activeCategory === 'All' 
    ? menuItems 
    : menuItems.filter(item => item.category === activeCategory);

  const handlePrev = () => {
    swiperRef.current?.slidePrev();
  };

  const handleNext = () => {
    swiperRef.current?.slideNext();
  };

  return (
    <section id="menu" className="py-20 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-purple-950/10 to-background pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4 px-4 py-1 border-purple-500/30 text-purple-300">
            Our Menu
          </Badge>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent">
            Taste the Magic
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            From artisanal coffees to mouthwatering bites, every item is crafted with love
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <Button
              key={category}
              variant={activeCategory === category ? 'default' : 'outline'}
              size="sm"
              onClick={() => setActiveCategory(category)}
              className={`rounded-full transition-all ${
                activeCategory === category 
                  ? 'bg-primary shadow-lg shadow-primary/25' 
                  : 'bg-white/5 border-white/10 hover:bg-white/10'
              }`}
              data-testid={`button-category-${category.toLowerCase().replace(' ', '-')}`}
            >
              {category}
            </Button>
          ))}
        </div>

        <div className="relative">
          <Button
            variant="ghost"
            size="icon"
            onClick={handlePrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-background/50 backdrop-blur-sm border border-white/10 rounded-full hidden md:flex"
            data-testid="button-menu-prev"
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-background/50 backdrop-blur-sm border border-white/10 rounded-full hidden md:flex"
            data-testid="button-menu-next"
          >
            <ChevronRight className="w-5 h-5" />
          </Button>

          <Swiper
            onSwiper={(swiper) => { swiperRef.current = swiper; }}
            modules={[Autoplay, EffectCoverflow, Navigation]}
            effect="coverflow"
            grabCursor
            centeredSlides
            slidesPerView="auto"
            coverflowEffect={{
              rotate: 0,
              stretch: 0,
              depth: 100,
              modifier: 2.5,
              slideShadows: false,
            }}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
            }}
            className="py-8 px-4"
          >
            {filteredItems.map((item) => {
              const IconComponent = categoryIcons[item.category] || Coffee;
              return (
                <SwiperSlide key={item.id} className="!w-72 md:!w-80">
                  <Card
                    className={`relative overflow-visible bg-card/50 backdrop-blur-xl border-white/10 p-6 transition-all duration-500 cursor-pointer group ${
                      hoveredItem === item.id 
                        ? 'scale-105 shadow-2xl shadow-purple-500/20 border-purple-500/30' 
                        : 'hover:border-white/20'
                    }`}
                    onMouseEnter={() => setHoveredItem(item.id)}
                    onMouseLeave={() => setHoveredItem(null)}
                    onClick={() => onItemClick?.(item)}
                    data-testid={`card-menu-item-${item.id}`}
                  >
                    {item.isPopular && (
                      <Badge className="absolute -top-2 -right-2 bg-gradient-to-r from-amber-500 to-orange-500 border-0 shadow-lg">
                        Popular
                      </Badge>
                    )}

                    <div className="relative w-full h-40 mb-4 rounded-lg bg-gradient-to-br from-purple-900/50 to-blue-900/50 flex items-center justify-center overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                      <IconComponent className="w-16 h-16 text-purple-300/50 group-hover:text-purple-300 transition-colors" />
                      
                      <div className={`absolute inset-0 flex items-end p-4 transition-all duration-300 ${
                        hoveredItem === item.id ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                      }`}>
                        <p className="text-sm text-white/80">{item.description}</p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-semibold text-lg">{item.name}</h3>
                        <span className="text-lg font-bold text-primary">₹{item.price}</span>
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {item.category}
                      </Badge>
                    </div>

                    <div className={`absolute inset-0 rounded-lg pointer-events-none transition-opacity duration-300 ${
                      hoveredItem === item.id ? 'opacity-100' : 'opacity-0'
                    }`} style={{
                      background: 'radial-gradient(circle at 50% 50%, rgba(168, 85, 247, 0.1), transparent 70%)'
                    }} />
                  </Card>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
