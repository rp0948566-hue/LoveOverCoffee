import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import path from "path";
import express from "express";

const MENU_DATA = `
LOVE OVER COFFEE INDORE - COMPLETE MENU:

HOT COFFEE: Cappuccino (₹130), Latte (₹140), Americano (₹110), Espresso (₹90), Hazelnut Latte (₹160), Mocha (₹150), Irish Coffee (₹180)
COLD COFFEE: Cold Brew (₹150), Iced Latte (₹140), Iced Mocha (₹170), Frappe (₹160), Cold Coffee Classic (₹120), Caramel Cold Coffee (₹165)
PIZZA: Paneer Bhurji Pizza (₹360), Veggie Supreme (₹340), Margherita (₹280), Cheese Burst (₹380), Peppy Paneer (₹320), Farm Fresh (₹300)
PASTA: Alfredo (₹280), Arrabiata (₹250), Pesto (₹290), Mac & Cheese (₹270), Pink Sauce (₹260), White Sauce Pasta (₹265)
MAGGIE: Classic Maggie (₹80), Cheese Maggie (₹100), Veggie Maggie (₹90), Maggie Special (₹120), Masala Maggie (₹95)
SANDWICHES: Club Sandwich (₹220), Grilled Cheese (₹180), Paneer Tikka (₹200), Veggie Delight (₹170), Bombay Toast (₹150)
SHAKES: Chocolate Shake (₹180), Oreo Shake (₹190), Cold Coffee Shake (₹170), Mango Shake (₹160), Strawberry Shake (₹175), KitKat Shake (₹200)
MOJITO: Virgin Mojito (₹120), Blue Lagoon (₹140), Mint Mojito (₹130), Watermelon Mojito (₹145)
FRIES: Classic Fries (₹100), Peri Peri Fries (₹130), Cheese Fries (₹150), Loaded Fries (₹180)
BROWNIE: Classic Brownie (₹120), Brownie with Ice Cream (₹180), Sizzling Brownie (₹200)
`;

const SYSTEM_PROMPT = `You are Maggie, the friendly AI Waiter for 'Love Over Coffee' cafe in Indore.
Location: PLOT NO 11, Scheme No 51, Indore, Madhya Pradesh.
Hours: 8 AM - 11 PM daily.

PERSONALITY: Warm, Gen-Z friendly, use Hinglish naturally. Be enthusiastic about food!
RULES: Keep answers under 40 words. Be helpful and suggest menu items based on mood.

${MENU_DATA}

MOOD-BASED SUGGESTIONS:
- Heartbreak/Sad: Chocolate items (Chocolate Shake ₹180, Sizzling Brownie ₹200)
- Date/Romantic: Sharing items (Cheese Burst Pizza ₹380, two Hazelnut Lattes ₹160 each)
- Tired/Work: Strong coffee (Americano ₹110, Espresso ₹90)
- Celebration: Premium items (Oreo Shake ₹190, Loaded Fries ₹180)
- Hungry: Filling items (Pizza, Pasta, Club Sandwich ₹220)

Be cheerful, use light humor, end with a relevant suggestion!`;

function getFallbackResponse(userMessage: string): string {
  const lowerMsg = userMessage.toLowerCase();
  
  if (lowerMsg.includes('heartbr') || lowerMsg.includes('sad') || lowerMsg.includes('breakup')) {
    return "Aww yaar, heartbreaks are tough! 💔 Our Chocolate Shake (₹180) is like a warm hug! Pair it with Sizzling Brownie for comfort food goals. You got this! ✨";
  }
  if (lowerMsg.includes('date') || lowerMsg.includes('romantic')) {
    return "Date night at LOC? 😍 Try Cheese Burst Pizza (₹380) - perfect for sharing! Add two Hazelnut Lattes for that cozy vibe. Impress guaranteed! 💕";
  }
  if (lowerMsg.includes('tired') || lowerMsg.includes('work') || lowerMsg.includes('sleepy')) {
    return "Thaka hua lag raha hai? ☕ Our Americano (₹110) is the ultimate energy booster! Pair with Club Sandwich (₹220) to power through! 💪";
  }
  if (lowerMsg.includes('hungry') || lowerMsg.includes('starving')) {
    return "Bhook lagi hai? 🍕 Paneer Bhurji Pizza (₹360) is a bestseller! Or try Alfredo Pasta (₹280) for creamy goodness. Add Cold Coffee (₹120) on the side! 😋";
  }
  if (lowerMsg.includes('coffee')) {
    return "Coffee lover spotted! ☕ Cappuccino (₹130) is crowd favorite. Feeling fancy? Hazelnut Latte (₹160) is like coffee went to spa! What's your vibe? ✨";
  }
  if (lowerMsg.includes('hi') || lowerMsg.includes('hello') || lowerMsg.includes('hey')) {
    return "Hey there! 👋 Welcome to Love Over Coffee! I'm Maggie, your AI buddy. Tell me your mood and I'll find the perfect order! Hungry, thirsty, or just vibing? 😊";
  }
  if (lowerMsg.includes('menu')) {
    return "We've got everything! ☕ Hot & Cold Coffee, 🍕 Pizzas, 🍝 Pasta, 🥪 Sandwiches, legendary Maggie varieties, and amazing Shakes! What's your mood? ✨";
  }
  if (lowerMsg.includes('pizza')) {
    return "Pizza time! 🍕 Paneer Bhurji Pizza (₹360) is desi meets Italian! Veggie Supreme (₹340) is loaded with toppings. Cheese Burst for extra ₹40? 🧀";
  }
  if (lowerMsg.includes('shake') || lowerMsg.includes('drink')) {
    return "Shake it up! 🥤 Chocolate Shake (₹180) is pure happiness! Oreo Shake (₹190) is Insta-worthy. KitKat Shake (₹200) for the adventurous! 🌟";
  }
  if (lowerMsg.includes('recommend') || lowerMsg.includes('suggest') || lowerMsg.includes('best')) {
    return "Our bestsellers? 🏆 Cappuccino (₹130), Paneer Bhurji Pizza (₹360), and Maggie Special (₹120)! Can't go wrong with these. What's your mood? 😊";
  }
  return "I'm here to help! 😊 Tell me - Coffee ☕, Pizza 🍕, Pasta 🍝, or something sweet? Share your mood and I'll work my magic! ✨";
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  // Serve the single-file standalone HTML at /standalone.html
  app.get('/standalone.html', (req, res) => {
    res.sendFile(path.join(process.cwd(), 'public', 'index.html'));
  });
  
  // Serve gallery images
  app.use('/gallery', express.static(path.join(process.cwd(), 'public', 'gallery')));
  
  // Serve videos
  app.use('/videos', express.static(path.join(process.cwd(), 'public', 'videos')));
  
  app.post('/api/chat', async (req, res) => {
    try {
      const { messages } = req.body;
      
      if (!messages || !Array.isArray(messages)) {
        return res.status(400).json({ error: 'Messages array required' });
      }

      const lastMessage = messages[messages.length - 1];
      const userMessage = lastMessage?.content || '';

      const apiKey = process.env.GEMINI_API_KEY;
      
      if (!apiKey) {
        const response = getFallbackResponse(userMessage);
        return res.json({ response });
      }

      try {
        const conversationHistory = messages.map((m: any) => 
          `${m.role === 'user' ? 'Customer' : 'Maggie'}: ${m.content}`
        ).join('\n');

        const apiResponse = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [{
                parts: [{
                  text: `${SYSTEM_PROMPT}\n\nConversation so far:\n${conversationHistory}\n\nRespond as Maggie (keep it under 40 words, be fun and helpful):`
                }]
              }],
              generationConfig: {
                temperature: 0.9,
                maxOutputTokens: 150,
              }
            })
          }
        );

        if (!apiResponse.ok) {
          throw new Error('API request failed');
        }

        const data = await apiResponse.json();
        const response = data.candidates?.[0]?.content?.parts?.[0]?.text || getFallbackResponse(userMessage);
        
        return res.json({ response });
      } catch (apiError) {
        console.error('Gemini API error:', apiError);
        const response = getFallbackResponse(userMessage);
        return res.json({ response });
      }
    } catch (error) {
      console.error('Chat error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  return httpServer;
}
