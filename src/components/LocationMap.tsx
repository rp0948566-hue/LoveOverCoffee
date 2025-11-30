import { useState, useEffect, useRef } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { MapPin, Clock, Phone, Navigation, ExternalLink } from 'lucide-react';

const CAFE_LOCATION = {
  lat: 22.7244,
  lng: 75.8456,
  address: 'PLOT NO 11, Scheme No 51, Scheme No 113',
  city: 'Indore, Madhya Pradesh',
  phone: '093296 97769',
  hours: '8:00 AM - 11:00 PM',
};

export default function LocationMap() {
  const handleGetDirections = () => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${CAFE_LOCATION.lat},${CAFE_LOCATION.lng}`;
    window.open(url, '_blank');
  };

  return (
    <section id="location" className="py-20 md:py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-amber-950/5 to-background pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4 px-4 py-1 border-amber-500/30 text-amber-300">
            Find Us
          </Badge>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white via-amber-200 to-white bg-clip-text text-transparent">
            Visit Us Today
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Come experience the warmth and flavors that make Love Over Coffee special
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 items-stretch">
          <div className="lg:col-span-2">
            <div className="relative h-full min-h-[400px] md:min-h-[500px] rounded-[20px] overflow-hidden border border-white/10 glassmorphism shadow-[0_0_20px_rgba(147,51,234,0.5)]">
              <iframe
                src="https://maps.google.com/maps?q=Plot+No+11,+Scheme+No+51,+Indore&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'invert(100%) hue-rotate(180deg)' }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Google Map of Love Over Coffee"
              ></iframe>

              <div className="absolute top-4 left-4 z-[1000]">
                <Card className="bg-background/80 backdrop-blur-xl border-white/10 p-3 glassmorphism">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-sm font-medium">Open Now</span>
                  </div>
                </Card>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <Card className="bg-card/50 backdrop-blur-xl border-white/10 p-6 glassmorphism">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Address</h3>
                  <p className="text-muted-foreground text-sm">{CAFE_LOCATION.address}</p>
                  <p className="text-muted-foreground text-sm">{CAFE_LOCATION.city}</p>
                </div>
              </div>
            </Card>

            <Card className="bg-card/50 backdrop-blur-xl border-white/10 p-6 glassmorphism">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Hours</h3>
                  <p className="text-muted-foreground text-sm">{CAFE_LOCATION.hours}</p>
                  <p className="text-muted-foreground text-sm">Open 7 days a week</p>
                </div>
              </div>
            </Card>

            <Card className="bg-card/50 backdrop-blur-xl border-white/10 p-6 glassmorphism">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Contact</h3>
                  <p className="text-muted-foreground text-sm">{CAFE_LOCATION.phone}</p>
                  <a 
                    href={`tel:${CAFE_LOCATION.phone.replace(/\s/g, '')}`}
                    className="text-amber-400 text-sm hover:underline"
                    data-testid="link-call-now"
                  >
                    Call Now
                  </a>
                </div>
              </div>
            </Card>

            <Button
              onClick={handleGetDirections}
              className="w-full bg-gradient-to-r from-purple-600 to-amber-600 hover:from-purple-500 hover:to-amber-500 text-white py-6 rounded-lg shadow-lg shadow-purple-500/25 transition-all duration-300 hover:shadow-amber-500/40"
              data-testid="button-get-directions"
            >
              <Navigation className="w-5 h-5 mr-2" />
              Get Directions
              <ExternalLink className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
