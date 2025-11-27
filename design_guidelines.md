# Love Over Coffee - Design Guidelines

## Design Approach
**Reference-Based:** Gen-Z aesthetic inspired by Revocalize.ai with liquid motion, dark premium theme, and heavy glassmorphism. This is a **highly animated, interactive** coffee shop experience targeting Gen-Z users.

## Visual Theme & Aesthetic

### Color Palette
- **Primary:** Midnight Blues and Deep Purples (dark theme foundation)
- **Accent:** Coffee Browns for warmth and brand connection
- **Highlights:** Gold/Purple gradients for liquid animations
- **Effects:** Neon glow for text, breathing glow for interactive elements

### Design System
**Glassmorphism-Heavy:** Extensive use of frosted glass effects (backdrop-filter blur) on:
- Navigation bar
- All cards (menu items, gallery overlays)
- Buttons and interactive elements
- AI chat panel

## Typography
- **Hero Title:** Large, glowing neon text effect - "Wake Up to Love Over Coffee"
- **Body Text:** Clean, readable fonts optimized for dark backgrounds
- **AI Chat:** Warm, conversational styling for Maggie's responses
- Font sizing: Auto-responsive (larger on desktop, thumb-friendly on mobile)

## Layout & Spacing
- **Desktop:** Wide layouts with parallax scrolling effects
- **Mobile:** Vertical stack, optimized for touch interactions
- **Spacing:** Generous padding around glassmorphic cards for depth perception

## Hero Section - "WOW" Factor
- **Background:** Continuous liquid wave/smoke animation using CSS/Canvas
- **Animation:** Slow-flowing purple/blue/gold gradients creating "alive" feeling
- **Interaction:** 3D parallax effect - elements tilt subtly on mouse movement
- **Content:** Centered neon-glow title with glassmorphic CTA buttons

## AI Assistant "Maggie" - Core Feature

### Trigger Button
- **Position:** Floating bottom-right corner
- **Style:** Glassmorphic button with breathing glow animation
- **Text:** "Ask Maggie ✨"
- **Mobile:** Transforms to thumb-friendly FAB (Floating Action Button)

### Side Panel UI
- **Entry:** Slides in from right (smooth drawer animation)
- **Background:** AI-BACKGROUND/Ai.jpg with floating particle effects overlay
- **Style:** Full glassmorphism treatment
- **Features:** 
  - Text input with glassmorphic styling
  - Microphone button for voice input simulation
  - Mute toggle icon for voice output
  - Chat bubbles with soft rounded corners

### AI Personality
- **Tone:** Warm, Gen-Z, Hinglish-friendly
- **Context-Aware:** Suggests items based on mood (heartbroken → chocolate, date → sharing platters)
- **Response Length:** Under 40 words, concise and friendly

## Menu Section - Smart Carousel

### Layout
- Swiper.js infinite loop slider
- Smooth horizontal scrolling experience

### Menu Cards
- **Base State:** Glassmorphic cards with product images
- **Hover Animation:** 
  - Scale up (1.05x)
  - Glow effect intensifies
  - Price/details slide up from bottom
- **Content:** Menu images from menu-pichers/ directory (2023-09-03 series)

## Gallery Section
- **Images:** 49 images from Gallery/ directory (1.webp - 49.webp)
- **Loading:** Lazy load for performance
- **Layout:** Responsive grid with smooth transitions
- **Interaction:** Subtle hover effects, possible lightbox overlay

## Video Showcase
- **Content:** 5 videos from Vedio/ directory (1.mp4 - 5.mp4)
- **Layout:** Elegant grid layout
- **Style:** Glassmorphic video containers

## Location Map
- **Integration:** Leaflet.js interactive map
- **Address:** PLOT NO 11, Scheme No 51, Indore
- **Style:** Dark theme map with glassmorphic overlay panel

## Animation Strategy

### GSAP Scroll Triggers
- Section entrance animations as user scrolls
- Staggered element reveals
- Smooth parallax effects

### Background Animations
- **Hero & AI Chat:** Continuous liquid wave motion
- **Particles:** Floating particle effects on AI background
- **Glow Effects:** Breathing animations on interactive elements

## Responsive Intelligence

### Desktop (>1024px)
- Full-width parallax layouts
- Multi-column grids for gallery/menu
- Mouse-tracking 3D effects on hero

### Tablet (768-1023px)
- 2-column layouts for menu/gallery
- Reduced animation intensity
- Touch-optimized interactions

### Mobile (<768px)
- Single-column vertical stacks
- FAB-style "Ask Maggie" button
- Larger touch targets (min 44px)
- Simplified animations for performance

## Images
- **Hero:** Use liquid wave CSS/Canvas animation (no static image)
- **Menu Cards:** Product photos from menu-pichers/ directory
- **Gallery:** Full collection from Gallery/ directory (1-49.webp)
- **AI Background:** AI-BACKGROUND/Ai.jpg with particle overlay
- **Icon:** Icon/faverat.ico for favicon

## Performance Optimizations
- Lazy load all images (loading="lazy")
- Optimize liquid animations for 60fps
- Device detection for appropriate animation levels
- Efficient glassmorphism (backdrop-filter) usage