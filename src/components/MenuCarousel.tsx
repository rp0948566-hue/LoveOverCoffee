import { useState, useRef, useEffect } from 'react';
import { Card } from '@/components/ui/card';

const Badge = ({ children, className, variant }: { children: React.ReactNode; className?: string; variant?: string }) => (
  <span className={`inline-flex items-center rounded-full ${className || ''}`}>
    {children}
  </span>
);

interface MenuItem {
  id: string;
  name: string;
  price: string;
}

interface MenuCarouselProps {
  onItemClick?: (item: MenuItem) => void;
}

const menuImageMap: Record<string, string> = {
  'Cappuccino': 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&w=600',
  'Lotus Biscoff Coffee': 'https://images.unsplash.com/photo-1619158403521-ed9335091380?auto=format&fit=crop&w=600', // Caramel Frappe look
  'Tiramisu Frappe': 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=600',
  'Dark Chocolate Frappe': 'https://images.unsplash.com/photo-1577805947697-89e18249d767?auto=format&fit=crop&w=600',
  'Pao Bhaji Fondue': 'https://images.unsplash.com/photo-1606491956689-2ea28c674675?auto=format&fit=crop&w=600', // Indian Curry look
  'Mango Mojito': 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=600',
  'Cafe Frappe': 'https://images.unsplash.com/photo-1461023058943-48dbf1399f98?auto=format&fit=crop&w=600',
  'Espresso': 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&w=600',
  'Lemon Mint Ice Tea': 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=600',
  'Classic Margarita Pizza': 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=600',
  'Paneer Bhurji Pizza': 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=600',
  'Baked Nachos': 'https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?auto=format&fit=crop&w=600',
  'Cheese Maggi': 'https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?auto=format&fit=crop&w=600', // Noodles
  'Alfredo Pasta (White)': 'https://images.unsplash.com/photo-1645112416940-9c6af7bd8166?auto=format&fit=crop&w=600',
  'Peri Peri Fries': 'https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?auto=format&fit=crop&w=600',
  'Cheese Garlic Bread': 'https://images.unsplash.com/photo-1573140247632-f84660f67627?auto=format&fit=crop&w=600',
  'Paneer Bhurji Pao': 'https://images.unsplash.com/photo-1626074353765-517a681e40be?auto=format&fit=crop&w=600', // Indian Spicy Pao
  'default': 'https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?auto=format&fit=crop&w=600'
};

const menuHighlights: MenuItem[] = [
  { id: '1', name: 'Cappuccino', price: '₹160' },
  { id: '2', name: 'Lotus Biscoff Coffee', price: 'Price: Check details' },
  { id: '3', name: 'Tiramisu Frappe', price: '₹240' },
  { id: '4', name: 'Dark Chocolate Frappe', price: '₹200' },
  { id: '5', name: 'Pao Bhaji Fondue', price: '₹350' },
  { id: '6', name: 'Mango Mojito', price: '₹180' },
  { id: '7', name: 'Cafe Frappe', price: '₹190' },
  { id: '8', name: 'Espresso', price: '₹110' },
  { id: '9', name: 'Lemon Mint Ice Tea', price: '₹160' },
  { id: '10', name: 'Classic Margarita Pizza', price: '₹310' },
  { id: '11', name: 'Paneer Bhurji Pizza', price: '₹400' },
  { id: '12', name: 'Baked Nachos', price: '₹300' },
  { id: '13', name: 'Cheese Maggi', price: '₹190' },
  { id: '14', name: 'Alfredo Pasta (White)', price: '₹400' },
  { id: '15', name: 'Peri Peri Fries', price: '₹220' },
  { id: '16', name: 'Cheese Garlic Bread', price: '₹220' },
  { id: '17', name: 'Paneer Bhurji Pao', price: '₹270' },
];

const getFoodName = (name: string): string => {
  const lowerName = name.toLowerCase();
  if (lowerName.includes('coffee') || lowerName.includes('cappuccino') || lowerName.includes('espresso') || lowerName.includes('frappe') || lowerName.includes('latte')) return 'coffee';
  if (lowerName.includes('pizza')) return 'pizza';
  if (lowerName.includes('pasta')) return 'pasta';
  if (lowerName.includes('maggi') || lowerName.includes('noodles')) return 'noodles';
  if (lowerName.includes('sandwich') || lowerName.includes('pao')) return 'sandwich';
  if (lowerName.includes('shake') || lowerName.includes('mojito') || lowerName.includes('tea')) return 'drink';
  if (lowerName.includes('nachos') || lowerName.includes('fries') || lowerName.includes('bread')) return 'snack';
  return 'food';
};

export default function MenuCarousel({ onItemClick }: MenuCarouselProps) {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [paused, setPaused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (containerRef.current && !paused) {
        containerRef.current.scrollLeft += 0.5; // Slower, smoother scrolling
      }
    }, 16); // ~60fps for smoother animation
    return () => clearInterval(interval);
  }, [paused]);

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

        <div className="relative">
          <div
            ref={containerRef}
            className="flex gap-4 overflow-x-auto py-8 px-4"
            style={{ whiteSpace: 'nowrap', scrollbarWidth: 'none' }}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onTouchStart={() => setPaused(true)}
            onTouchEnd={() => setPaused(false)}
          >
            {menuHighlights.map((item) => (
              <Card
                key={item.id}
                className={`flex-shrink-0 w-72 md:w-80 relative overflow-visible p-6 transition-all duration-500 cursor-pointer group ${
                  hoveredItem === item.id
                    ? 'scale-105 shadow-2xl shadow-purple-500/50'
                    : ''
                }`}
                style={{
                  background: 'rgba(26, 16, 37, 0.8)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: '20px',
                  border: '1px solid rgba(168, 85, 247, 0.3)',
                  boxShadow: hoveredItem === item.id ? '0 0 20px rgba(168, 85, 247, 0.5)' : '0 0 10px rgba(168, 85, 247, 0.2)'
                }}
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
                onClick={() => onItemClick?.(item)}
                data-testid={`card-menu-item-${item.id}`}
              >
                <img
                  src={menuImageMap[item.name as keyof typeof menuImageMap] || menuImageMap['default']}
                  alt={item.name}
                  className="w-full h-[150px] object-cover rounded-t-[20px] mb-4"
                />

                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-semibold text-lg">{item.name}</h3>
                    <span className="text-lg font-bold text-primary">{item.price}</span>
                  </div>
                </div>

                <div className={`absolute inset-0 rounded-[20px] pointer-events-none transition-opacity duration-300 ${
                  hoveredItem === item.id ? 'opacity-100' : 'opacity-0'
                }`} style={{
                  background: 'radial-gradient(circle at 50% 50%, rgba(168, 85, 247, 0.1), transparent 70%)'
                }} />
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
