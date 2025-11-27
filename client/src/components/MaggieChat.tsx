import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { X, Send, Mic, Volume2, VolumeX, Sparkles, Coffee, Loader2 } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface MaggieChatProps {
  isOpen: boolean;
  onClose: () => void;
}

const MENU_DB: Record<string, number> = {
  "Cappuccino": 160,
  "Espresso": 110,
  "Americano": 150,
  "Hot Chocolate": 180,
  "Cafe Frappe": 190,
  "Tiramisu Frappe": 240,
  "Dark Choco Frappe": 200,
  "Nutella Frappe": 300,
  "Cheese Margarita": 310,
  "Paneer Bhurji Pizza": 400,
  "Farm Fresh Pizza": 330,
  "Pesto Grilled Sandwich": 330,
  "Veg Club Sandwich": 260,
  "Tandoori Paneer Sandwich": 270,
  "Peri Peri Fries": 220,
  "Cheese Nachos": 270,
  "Pao Bhaji Fondue": 350,
  "Virgin Mojito": 170,
  "Blueberry Ice Tea": 200
};

const CAFE_INFO = {
  address: 'PLOT NO 11, Scheme No 51, Scheme No 113, Indore',
  phone: '093296 97769',
  hours: '8 AM - 11 PM daily',
};

function findItemByKeyword(text: string): { name: string; price: number } | null {
  const lowerText = text.toLowerCase();
  for (const [name, price] of Object.entries(MENU_DB)) {
    if (lowerText.includes(name.toLowerCase())) {
      return { name, price };
    }
  }
  const keywords: Record<string, string> = {
    'cappuccino': 'Cappuccino',
    'espresso': 'Espresso',
    'americano': 'Americano',
    'hot chocolate': 'Hot Chocolate',
    'chocolate': 'Hot Chocolate',
    'frappe': 'Cafe Frappe',
    'tiramisu': 'Tiramisu Frappe',
    'dark choco': 'Dark Choco Frappe',
    'nutella': 'Nutella Frappe',
    'margarita': 'Cheese Margarita',
    'pizza': 'Paneer Bhurji Pizza',
    'paneer pizza': 'Paneer Bhurji Pizza',
    'farm fresh': 'Farm Fresh Pizza',
    'pesto': 'Pesto Grilled Sandwich',
    'club sandwich': 'Veg Club Sandwich',
    'sandwich': 'Veg Club Sandwich',
    'tandoori': 'Tandoori Paneer Sandwich',
    'fries': 'Peri Peri Fries',
    'peri peri': 'Peri Peri Fries',
    'nachos': 'Cheese Nachos',
    'pao bhaji': 'Pao Bhaji Fondue',
    'fondue': 'Pao Bhaji Fondue',
    'mojito': 'Virgin Mojito',
    'ice tea': 'Blueberry Ice Tea',
    'blueberry': 'Blueberry Ice Tea'
  };
  for (const [keyword, itemName] of Object.entries(keywords)) {
    if (lowerText.includes(keyword)) {
      return { name: itemName, price: MENU_DB[itemName] };
    }
  }
  return null;
}

function getMaggieResponse(text: string): string {
  const lowerText = text.toLowerCase();

  if (lowerText.includes('price') || lowerText.includes('cost') || lowerText.includes('how much') || lowerText.includes('kitna')) {
    const item = findItemByKeyword(text);
    if (item) {
      return `${item.name} costs just ₹${item.price}! It's absolutely amazing - you gotta try it! 😋☕`;
    }
    return "Which item's price do you wanna know? Just tell me - Cappuccino, Pizza, Mojito, anything! 💫";
  }

  if (lowerText.includes('sad') || lowerText.includes('breakup') || lowerText.includes('heartbroken') || lowerText.includes('cry') || lowerText.includes('upset')) {
    return `Aww babe 🥺💔 You need some comfort! Dark Choco Frappe (₹${MENU_DB["Dark Choco Frappe"]}) is literally a hug in a cup! Or try Hot Chocolate (₹${MENU_DB["Hot Chocolate"]}) with a side of Cheese Nachos (₹${MENU_DB["Cheese Nachos"]}). Chocolate heals everything! 🍫✨`;
  }

  if (lowerText.includes('date') || lowerText.includes('girlfriend') || lowerText.includes('boyfriend') || lowerText.includes('romantic') || lowerText.includes('impress')) {
    return `Ooh date night! 💕✨ Share a Paneer Bhurji Pizza (₹${MENU_DB["Paneer Bhurji Pizza"]}) - it's our bestseller! Add two Cappuccinos (₹${MENU_DB["Cappuccino"]} each) and finish with Cheese Nachos (₹${MENU_DB["Cheese Nachos"]}). Total couple goals! 🍕❤️`;
  }

  if (lowerText.includes('tired') || lowerText.includes('sleepy') || lowerText.includes('energy') || lowerText.includes('work') || lowerText.includes('thak')) {
    return `Need a boost? ⚡ Double Espresso (₹${MENU_DB["Espresso"]}) will wake you UP! Or go for Tiramisu Frappe (₹${MENU_DB["Tiramisu Frappe"]}) - coffee + dessert vibes! Hustle mode: ON! 🚀💪`;
  }

  if (lowerText.includes('hungry') || lowerText.includes('starving') || lowerText.includes('bhook') || lowerText.includes('khana')) {
    return `Bhook lagi? 🍽️ Paneer Bhurji Pizza (₹${MENU_DB["Paneer Bhurji Pizza"]}) is FIRE! Add Peri Peri Fries (₹${MENU_DB["Peri Peri Fries"]}) and you're sorted! Or try Pao Bhaji Fondue (₹${MENU_DB["Pao Bhaji Fondue"]}) for desi fusion! 🔥`;
  }

  if (lowerText.includes('birthday') || lowerText.includes('celebrate') || lowerText.includes('party')) {
    return `Yayyy celebrations! 🎉🎂 Nutella Frappe (₹${MENU_DB["Nutella Frappe"]}) is the party in a glass! Add Cheese Nachos (₹${MENU_DB["Cheese Nachos"]}) to share! We'll make it special! 🥳✨`;
  }

  if (lowerText.includes('cold') || lowerText.includes('thanda') || lowerText.includes('chill')) {
    return `Cold vibes incoming! 🧊 Tiramisu Frappe (₹${MENU_DB["Tiramisu Frappe"]}) is chef's kiss! Virgin Mojito (₹${MENU_DB["Virgin Mojito"]}) for refreshing feels, or Blueberry Ice Tea (₹${MENU_DB["Blueberry Ice Tea"]}) for fruity! 🍹`;
  }

  if (lowerText.includes('hot') || lowerText.includes('garam') || lowerText.includes('warm')) {
    return `Hot drinks loading... ☕ Cappuccino (₹${MENU_DB["Cappuccino"]}) is classic love! Americano (₹${MENU_DB["Americano"]}) for strong vibes, or Hot Chocolate (₹${MENU_DB["Hot Chocolate"]}) for cozy feels! 🔥`;
  }

  if (lowerText.includes('menu') || lowerText.includes('what do you have') || lowerText.includes('options') || lowerText.includes('kya hai')) {
    return `Here's the magic menu! ✨\n\n☕ HOT: Cappuccino ₹160, Espresso ₹110, Americano ₹150\n🧊 COLD: Tiramisu Frappe ₹240, Nutella Frappe ₹300\n🍕 FOOD: Paneer Bhurji Pizza ₹400, Farm Fresh ₹330\n🥪 SNACKS: Pesto Sandwich ₹330, Nachos ₹270\n🍹 DRINKS: Virgin Mojito ₹170, Ice Tea ₹200\n\nWhat's calling you? 😊`;
  }

  if (lowerText.includes('coffee')) {
    return `Coffee lover spotted! ☕ Cappuccino (₹${MENU_DB["Cappuccino"]}) is classic! Tiramisu Frappe (₹${MENU_DB["Tiramisu Frappe"]}) for cold coffee lovers! What's your mood - hot or cold? ✨`;
  }

  if (lowerText.includes('best') || lowerText.includes('recommend') || lowerText.includes('popular') || lowerText.includes('famous')) {
    return `Our legendary items? 🏆 Cappuccino (₹${MENU_DB["Cappuccino"]}), Paneer Bhurji Pizza (₹${MENU_DB["Paneer Bhurji Pizza"]}), Tiramisu Frappe (₹${MENU_DB["Tiramisu Frappe"]}), and Cheese Nachos (₹${MENU_DB["Cheese Nachos"]})! Can't go wrong with these! ✨`;
  }

  if (lowerText.includes('cheap') || lowerText.includes('budget') || lowerText.includes('sasta')) {
    return `Budget-friendly picks! 💰 Espresso ₹${MENU_DB["Espresso"]}, Virgin Mojito ₹${MENU_DB["Virgin Mojito"]}, Blueberry Ice Tea ₹${MENU_DB["Blueberry Ice Tea"]}! Great taste, wallet happy! 😊`;
  }

  if (lowerText.includes('address') || lowerText.includes('location') || lowerText.includes('where') || lowerText.includes('kahan')) {
    return `Find us at: ${CAFE_INFO.address} 📍\nCall: ${CAFE_INFO.phone} 📞\nOpen ${CAFE_INFO.hours}! Come vibe with us! 👋✨`;
  }

  if (lowerText.includes('timing') || lowerText.includes('hours') || lowerText.includes('open') || lowerText.includes('close') || lowerText.includes('time')) {
    return `We're open ${CAFE_INFO.hours}! ⏰ Best time? Evenings for that golden hour aesthetic! 🌅☕`;
  }

  if (lowerText.includes('hi') || lowerText.includes('hello') || lowerText.includes('hey') || lowerText.includes('hii') || lowerText.includes('namaste')) {
    return "Heyyy! 👋✨ Welcome to Love Over Coffee! I'm Maggie, your cafe bestie! Tell me your mood or ask about our menu - I got you! 😊☕";
  }

  if (lowerText.includes('thank') || lowerText.includes('thanks') || lowerText.includes('dhanyawad') || lowerText.includes('shukriya')) {
    return "Aww you're welcome! 🥰 Come visit soon - the vibes are immaculate! See you at LOC! ☕💕";
  }

  if (lowerText.includes('bye') || lowerText.includes('later') || lowerText.includes('tata') || lowerText.includes('chal')) {
    return "Byeee! 👋 Don't forget us! Hot coffee and warm hearts always waiting! See ya! ☕💕✨";
  }

  const item = findItemByKeyword(text);
  if (item) {
    return `${item.name}? Amazing choice! It's ₹${item.price}! Want me to tell you more or suggest something to pair with it? 😊✨`;
  }

  return "I'm Maggie! 💫 Your cafe BFF! Ask me prices, tell me your mood (sad? celebrating? date night?), or just say what you're craving! I know EVERYTHING about Love Over Coffee! ☕🍕✨";
}

export default function MaggieChat({ isOpen, onClose }: MaggieChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Heyyy! 👋✨ I'm Maggie, your AI bestie at Love Over Coffee! Tell me your mood - happy, sad, hungry, romantic? Or ask about menu prices! I got ALL the answers! 😊☕",
      timestamp: new Date(),
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const speak = (text: string) => {
    if (isMuted || typeof window === 'undefined') return;
    
    const cleanText = text.replace(/[✨💕☕🍕🍝🥪🧀🌟😊😋👋💔😍💪🧊🍜🥤🏆🎉🎂🥳🔥⚡🚀🍽️🍟🍫🥰📍📞⏰🌅💫🥺🍰💰🍹]/g, '');
    
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.rate = 1.0;
      utterance.pitch = 1.1;
      utterance.volume = 0.8;
      
      const voices = window.speechSynthesis.getVoices();
      const femaleVoice = voices.find(v => 
        v.name.toLowerCase().includes('female') || 
        v.name.toLowerCase().includes('samantha') ||
        v.name.toLowerCase().includes('victoria') ||
        v.name.includes('Google UK English Female')
      );
      if (femaleVoice) utterance.voice = femaleVoice;
      
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    setTimeout(() => {
      const response = getMaggieResponse(userMessage.content);
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, assistantMessage]);
      setIsLoading(false);
      speak(response);
    }, 400 + Math.random() * 400);
  };

  const handleMicClick = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      setInput("I'm feeling hungry, what should I order?");
      return;
    }

    setIsListening(!isListening);
    if (!isListening) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.lang = 'en-IN';
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        setIsListening(false);
      };
      recognition.onerror = () => setIsListening(false);
      recognition.onend = () => setIsListening(false);
      recognition.start();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      <div className="relative w-full max-w-md h-full bg-background/95 backdrop-blur-xl border-l border-white/10 animate-slide-in-right flex flex-col overflow-hidden glassmorphism">
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: 'url(/AI-BACKGROUND/Ai.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/90 to-background pointer-events-none" />

        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-purple-400/40 rounded-full animate-particle-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 20}s`,
                animationDuration: `${15 + Math.random() * 10}s`,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 flex items-center justify-between p-4 border-b border-white/10 bg-background/50 backdrop-blur-xl glassmorphism">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-amber-500 flex items-center justify-center">
                <Coffee className="w-5 h-5 text-white" />
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-background" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-semibold">Maggie</h3>
                <Sparkles className="w-4 h-4 text-amber-400" />
              </div>
              <p className="text-xs text-muted-foreground">Your AI Cafe Bestie</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMuted(!isMuted)}
              className="text-muted-foreground hover:text-foreground"
              data-testid="button-toggle-mute"
            >
              {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="text-muted-foreground hover:text-foreground"
              data-testid="button-close-chat"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>

        <ScrollArea className="flex-1 relative z-10" ref={scrollRef}>
          <div className="p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                    message.role === 'user'
                      ? 'bg-gradient-to-r from-purple-600 to-amber-600 text-white rounded-br-sm'
                      : 'bg-white/10 backdrop-blur-xl border border-white/10 rounded-bl-sm glassmorphism'
                  }`}
                  data-testid={`message-${message.role}-${message.id}`}
                >
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  <p className={`text-xs mt-1 ${
                    message.role === 'user' ? 'text-white/60' : 'text-muted-foreground'
                  }`}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl rounded-bl-sm px-4 py-3 glassmorphism">
                  <div className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin text-amber-400" />
                    <span className="text-sm text-muted-foreground">Maggie is typing...</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        <div className="relative z-10 p-4 border-t border-white/10 bg-background/50 backdrop-blur-xl glassmorphism">
          <form 
            onSubmit={(e) => { e.preventDefault(); handleSend(); }}
            className="flex items-center gap-2"
          >
            <div className="relative flex-1">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask Maggie anything..."
                className="bg-white/5 border-white/10 pr-10 focus:border-amber-400/50 backdrop-blur-xl"
                data-testid="input-chat-message"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={handleMicClick}
                className={`absolute right-1 top-1/2 -translate-y-1/2 w-8 h-8 ${
                  isListening ? 'text-red-500 animate-pulse' : 'text-muted-foreground'
                }`}
                data-testid="button-voice-input"
              >
                <Mic className="w-4 h-4" />
              </Button>
            </div>
            <Button
              type="submit"
              size="icon"
              disabled={!input.trim() || isLoading}
              className="bg-gradient-to-r from-purple-600 to-amber-600 hover:from-purple-500 hover:to-amber-500"
              data-testid="button-send-message"
            >
              <Send className="w-4 h-4" />
            </Button>
          </form>
          
          <div className="flex flex-wrap gap-2 mt-3">
            {['Show menu', "I'm sad", "Best coffee?", "Date night"].map((quick) => (
              <Button
                key={quick}
                variant="outline"
                size="sm"
                onClick={() => { setInput(quick); }}
                className="text-xs bg-white/5 border-white/10 hover:bg-white/10 backdrop-blur-sm"
                data-testid={`button-quick-${quick.toLowerCase().replace(/\s/g, '-').replace(/[?']/g, '')}`}
              >
                {quick}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
