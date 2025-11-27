# Love Over Coffee - Premium Coffee Shop Website

## Overview

Love Over Coffee is a Gen-Z style coffee shop website for a cafe in Indore, India. The application features a highly animated, dark-themed premium experience with a unique AI assistant named "Maggie" that helps customers with menu recommendations based on their mood. The site emphasizes visual appeal with liquid motion animations, glassmorphism effects, and interactive elements inspired by modern web design trends.

**Core Features:**
- Interactive hero section with vertical carousel showcasing menu items
- AI-powered chat assistant for personalized menu recommendations
- Comprehensive menu display with categorized items
- Gallery and video sections showcasing the cafe atmosphere
- Interactive location map with cafe details
- Mobile-first responsive design

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build System:**
- React 18 with TypeScript for type-safe component development
- Vite as the build tool and development server
- Wouter for lightweight client-side routing
- Single-page application (SPA) architecture

**UI Component System:**
- shadcn/ui component library with Radix UI primitives
- Tailwind CSS for utility-first styling with custom dark theme configuration
- Design tokens defined via CSS variables for consistent theming
- Glassmorphism-heavy aesthetic with backdrop filters and blur effects

**State Management:**
- TanStack Query (React Query) for server state management
- Local React state for UI interactions and component state
- No global state management library (Redux/Zustand) - intentionally kept simple

**Animation Strategy:**
- GSAP for complex hero section carousel animations
- CSS transitions and animations for glassmorphism effects
- Swiper.js for menu carousel with 3D coverflow effects
- Canvas-based liquid background animations for visual appeal

**Design Philosophy:**
- Dark mode as the primary theme (midnight blues, deep purples, coffee browns)
- Mobile-first responsive design with touch-optimized interactions
- Heavy use of glassmorphism (frosted glass effects) for cards, navigation, and buttons
- Neon glow effects and breathing animations for interactive elements

### Backend Architecture

**Server Framework:**
- Express.js HTTP server with TypeScript
- HTTP server (no WebSocket implementation for real-time features)
- RESTful API design pattern

**AI Integration:**
- Google Generative AI (@google/genai) for the Maggie chatbot
- Fallback response system for when AI is unavailable
- Mood-based menu recommendation logic built into prompts
- Response length limited to 40 words for conversational brevity

**Session Management:**
- In-memory storage implementation for user data
- Interface-based storage abstraction (IStorage) allowing future database integration
- Placeholder authentication structure (username/password schema defined but not fully implemented)

**Asset Serving:**
- Static file serving for images, videos, and other assets
- Organized asset structure: menu-pichers/, Gallery/, Vedio/, AI-BACKGROUND/
- Build process bundles client assets into dist/public directory

**Build Process:**
- Separate build steps for client (Vite) and server (esbuild)
- Server bundling with selective dependency inclusion to reduce cold start times
- Production build creates single-file server output (dist/index.cjs)

### Data Architecture

**Database Schema:**
- Drizzle ORM configured for PostgreSQL
- Minimal schema: users table with id, username, password fields
- Database currently optional - application uses in-memory storage by default
- Database connection via @neondatabase/serverless (prepared for Neon Postgres)

**Data Models:**
- User model with Zod validation schemas
- Menu data hardcoded in server routes (not database-driven)
- No persistent storage for chat messages or user preferences

### Component Architecture

**Key Components:**
- `HeroSection`: GSAP-animated vertical carousel with liquid background
- `MaggieChat`: Side panel AI assistant with speech synthesis capabilities
- `MenuCarousel`: Swiper-based 3D menu item showcase
- `GallerySection`: Lazy-loaded image gallery with lightbox functionality
- `VideoSection`: Video player grid with custom controls
- `LocationMap`: Leaflet.js interactive map with custom dark theme
- `GlassNavbar`: Glassmorphic navigation with scroll-based blur effects

**UI Components:**
- Comprehensive shadcn/ui component library (40+ components)
- Custom variants using class-variance-authority
- Consistent theming via CSS custom properties

### External Dependencies

**AI Services:**
- Google Generative AI (Gemini) for chatbot functionality
- API key required via environment variable

**Database:**
- Neon Postgres (via @neondatabase/serverless)
- Optional - application functions without database connection
- Connection string via DATABASE_URL environment variable

**Maps:**
- Leaflet.js for interactive location mapping
- CartoDB dark theme tiles for map rendering
- No API key required for basic functionality

**Third-Party Libraries:**
- Swiper.js for touch-enabled carousels
- GSAP for advanced animations
- date-fns for date formatting
- Radix UI for accessible component primitives

**Development Tools:**
- Replit-specific plugins for development experience
- TypeScript for type checking
- PostCSS with Tailwind for CSS processing

**Asset Management:**
- Images stored in public directories (Gallery/, menu-pichers/)
- Videos in Vedio/ directory
- Favicon and icons in Icon/ directory
- No CDN or external asset hosting