<p align="center">
  <img src="https://img.shields.io/badge/Laravel-13-FF2D20?style=for-the-badge&logo=laravel&logoColor=white" alt="Laravel 13" />
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React 19" />
  <img src="https://img.shields.io/badge/TypeScript-6-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS 4" />
  <img src="https://img.shields.io/badge/Inertia.js-3-9553E9?style=for-the-badge&logo=inertia&logoColor=white" alt="Inertia.js 3" />
  <img src="https://img.shields.io/badge/Claude_AI-Opus_4.6-D97706?style=for-the-badge&logoColor=white" alt="Claude AI" />
</p>

<h1 align="center">✈️ Flyone Web</h1>

<p align="center">
  <strong>AI-Powered Multi-Modal Travel Booking Platform for Southeast Asia</strong><br />
  <em>Dark Celestial Theme • Premium SaaS Experience • Built with AI-Assisted Development</em>
</p>

<p align="center">
  <a href="http://flyone-web.test">Live Demo</a> •
  <a href="#features">Features</a> •
  <a href="#tech-stack">Tech Stack</a> •
  <a href="#ai-development-workflow">AI Workflow</a> •
  <a href="#getting-started">Getting Started</a>
</p>

---

## Overview

Flyone Web is a full-stack travel booking SaaS platform that unifies multi-modal transport search, AI-powered recommendations, dynamic pricing, digital ticketing, and a loyalty rewards program into a single, immersive web experience.

The platform features a **dark celestial design theme** — a cinematic, premium visual identity with animated gradient orbs, frosted glass cards, cinematic video backgrounds, and luminous purple/teal accent lighting throughout.

### Who It Serves

- **Travelers** — Search, compare, and book across 800+ routes and 20+ destinations
- **Transport Providers** — Manage routes, pricing, bookings, and revenue
- **Administrators** — Monitor operations, manage users, and analyze business metrics

## Features

| Feature | Description |
|---------|-------------|
| **Multi-Modal Search** | Unified search across flights, trains, buses, and ferries with colorful mode icons |
| **6-Step Booking Flow** | Passengers → Seats → Add-ons → Review → Payment → Confirmation |
| **AI Chat Assistant** | Claude-powered travel assistant with SSE streaming |
| **Stripe Payments** | Secure payment processing with multiple payment methods |
| **Loyalty Program** | Tiered rewards (Bronze / Silver / Gold / Platinum) with points system |
| **E-Tickets** | Digital tickets with QR codes and PDF download |
| **Real-Time Updates** | WebSocket notifications via Laravel Reverb |
| **Provider Portal** | Self-service dashboard for transport providers |
| **Admin Dashboard** | Operations management with analytics and charts |
| **Blog CMS** | Travel guides with featured images and category system |
| **Contact Page** | Contact form with FAQ accordion and business hours |
| **Social Auth** | OAuth login via Google, Apple, and Facebook |
| **Two-Factor Auth** | TOTP-based 2FA with recovery codes |

### Design Highlights

| Element | Implementation |
|---------|----------------|
| **Dark Celestial Theme** | Deep `#08080e` backgrounds with layered gradient orbs |
| **Cinematic Hero** | Background video at 55% opacity with vignette overlay system |
| **Frosted Glass Cards** | `backdrop-blur-2xl` with `bg-white/[0.06]` and gradient glow borders |
| **Mixed Typography** | Playfair Display (serif italic) for hero headlines, Poppins for UI |
| **Custom Logo** | SVG monogram "F" with flight path arc and teal dot |
| **Animated Orbs** | 3 independently animated radial gradients (purple/teal/violet) |
| **Colorful Mode Icons** | Per-mode accent colors (violet/emerald/amber/sky) for transport types |
| **Photo Destination Cards** | Hover glow borders, price badges, explore button reveal |
| **Premium Auth Pages** | Split-layout with video brand panel and dark glass forms |

## Tech Stack

### Backend

| Technology | Purpose |
|-----------|---------|
| **Laravel 13** | PHP framework (modular monolith architecture) |
| **PHP 8.3+** | Server-side language |
| **Inertia.js 3** | SPA bridge (server-side routing, client-side rendering) |
| **Laravel Sanctum** | SPA cookie authentication + API tokens |
| **Laravel Socialite** | OAuth social login (Google, Apple, Facebook) |
| **Laravel Horizon** | Redis queue dashboard and monitoring |
| **Laravel Reverb** | Native WebSocket server |
| **Laravel Pulse** | Application health monitoring |
| **Laravel Scout** | Full-text search (Meilisearch / database driver) |
| **Laravel Cashier** | Stripe payment integration |
| **Laravel Octane** | High-performance application server |
| **Spatie Permission** | Role-based access control (RBAC) |
| **DomPDF** | Server-side PDF ticket generation |

### Frontend

| Technology | Purpose |
|-----------|---------|
| **React 19** | UI framework |
| **TypeScript 6** | Type safety |
| **Tailwind CSS 4** | Utility-first CSS with Oxide engine |
| **Framer Motion 12** | Animations, scroll-triggered reveals, animated counters |
| **Radix UI** | Accessible headless UI primitives (16 packages) |
| **Zustand 5** | Client-side state management |
| **TanStack React Query 5** | Server state management and caching |
| **Recharts 3** | Dashboard charts and analytics |
| **Lucide React** | Icon library |
| **Vite 8** | Frontend build tool with HMR |

### Infrastructure

| Technology | Purpose |
|-----------|---------|
| **PostgreSQL 17** | Primary database |
| **Redis 8** | Sessions, cache, queues, real-time |
| **Meilisearch** | Full-text search engine (optional) |
| **Stripe** | Payment processing |
| **Claude API** | AI chat assistant (Anthropic) |

### Fonts

| Font | Role | Usage |
|------|------|-------|
| **Playfair Display** | Serif display | Hero headline ("*Travel* smarter. *Book* faster.") |
| **Poppins** | Sans display | Section headings, nav, card titles, logo |
| **Inter** | Sans body | Body text, labels, descriptions |

## AI Development Workflow

This project was built using an **AI-assisted development workflow** — a human-led, AI-amplified approach:

| Tool | Role |
|------|------|
| **Claude Opus 4.6** (via Claude Code CLI) | Primary coding agent — architecture, implementation, debugging, refactoring |
| **Superpowers Plugin** | Structured planning, brainstorming, code review, systematic debugging |
| **Google Stitch** | Design system generation (DESIGN.md) for visual direction |
| **OpenAI** | NLP-style prompt engineering for product requirements and design prompts |

### How It Worked

1. **Planning** — AI advisor for architecture decisions, module design, database schema
2. **Design System** — Generated comprehensive DESIGN.md with Google Stitch, then iterated with Claude
3. **Implementation** — Claude Opus 4.6 as coding agent through Claude Code CLI for production-grade code
4. **Design Iteration** — Frontend Design skill for premium UI with dark celestial theme
5. **Review** — Human review of every architectural decision and code change

## Architecture

### Modular Monolith (`app/Modules/`)

```
app/Modules/
├── Booking/       # Booking creation, confirmation, cancellation, tickets
├── Search/        # Route search, destinations, autocomplete, caching
├── Payment/       # Stripe processing, refunds, transactions
├── User/          # Auth, profile, travelers, notifications
├── Loyalty/       # Points, tiers, promo codes, referrals
├── AI/            # Claude chat conversations, SSE streaming
├── Provider/      # Transport providers, gateway adapter pattern
└── Admin/         # Admin dashboard, blog CMS, analytics
```

Each module follows a consistent internal structure:

```
Module/
├── Models/            # Eloquent models
├── Actions/           # Single-responsibility business logic
├── Http/
│   ├── Controllers/   # Request handlers
│   ├── Requests/      # Form validation
│   └── Resources/     # API resources
├── Services/          # Complex business operations
├── Events/            # Domain events
└── Jobs/              # Queued background tasks
```

### Frontend Structure

```
resources/js/
├── Pages/             # Inertia page components
│   ├── Public/        #   Landing, Search, SearchResults, Destinations, Contact
│   ├── Auth/          #   Login, Register
│   ├── Dashboard/     #   Trips, Profile, Loyalty, Notifications, Ticket
│   ├── Booking/       #   Passengers, SeatSelection, Addons, Review, Payment, Confirmation
│   ├── Chat/          #   AI conversation interface
│   ├── Blog/          #   Blog listing and article detail
│   ├── Admin/         #   Admin dashboard
│   └── Provider/      #   Provider dashboard
├── Components/
│   ├── ui/            #   Button, Card, Badge, Input, Dialog, Select, Tabs, etc.
│   └── layout/        #   Navbar (scroll-aware), Footer (dark theme)
├── Layouts/           # MainLayout (dark), DashboardLayout, AuthLayout (split video)
├── Stores/            # Zustand stores (search, booking, UI)
├── Hooks/             # useAuth, useFlash
├── Types/             # TypeScript interfaces for all models
└── Lib/               # Utility functions (cn, formatCurrency, etc.)
```

### Database Schema (18 Migrations)

| Table | Description |
|-------|-------------|
| `users` | Extended user model with preferences, tier, points |
| `travelers` | Passenger profiles linked to users |
| `providers` | Transport companies (airlines, railways, bus, ferry) |
| `routes` | Searchable routes with pricing and availability |
| `bookings` | Booking records with 8-char public reference |
| `booking_segments` | Individual journey segments per booking |
| `tickets` | E-tickets with QR codes per traveler per segment |
| `transactions` | Payment records linked to bookings |
| `loyalty_points` | Points ledger (earned, redeemed, expired, bonus) |
| `promo_codes` | Discount codes with validation rules |
| `reviews` | Provider reviews with ratings |
| `notifications` | In-app notification system |
| `destinations` | Destination pages with images, weather, tips |
| `chat_conversations` | AI chat history with messages |
| `blog_posts` | CMS blog content with featured images and tags |
| `permission_tables` | RBAC roles and permissions (Spatie) |

## Getting Started

### Prerequisites

- PHP 8.3+
- Node.js 22+
- Composer 2+
- PostgreSQL 17 or MySQL 8+
- Redis 8+
- [Laravel Herd](https://herd.laravel.com/) (recommended for macOS) or Laravel Valet

### Installation

```bash
# Clone the repository
git clone https://github.com/mejba13/flyone-web.git
cd flyone-web

# Install dependencies
composer install
npm install

# Environment setup
cp .env.example .env
php artisan key:generate
```

### Configure `.env`

```env
DB_CONNECTION=pgsql
DB_DATABASE=flyone

CACHE_STORE=redis
SESSION_DRIVER=redis
QUEUE_CONNECTION=redis

STRIPE_KEY=pk_test_...
STRIPE_SECRET=sk_test_...

ANTHROPIC_API_KEY=sk-ant-...    # For AI chat assistant

SCOUT_DRIVER=database           # or meilisearch
```

### Database Setup

```bash
php artisan migrate:fresh --seed
```

This creates:
- **10** transport providers (5 airlines, 2 railways, 2 bus operators, 1 ferry)
- **20** Southeast Asian destinations with Unsplash photography
- **800+** routes with realistic pricing over 60 days
- **50** users across all roles
- **5** blog posts with featured images
- **5** active promo codes
- Sample bookings, tickets, reviews, and loyalty points

### Run the Application

```bash
# All services at once (recommended)
composer dev

# Or run individually:
php artisan serve          # Laravel dev server (port 8000)
npm run dev                # Vite HMR dev server (port 5173)
php artisan queue:work     # Queue worker
```

### Demo Accounts

| Role | Email | Password |
|------|-------|----------|
| **Admin** | `admin@flyone.com` | `password` |
| **Provider** | `provider@flyone.com` | `password` |
| **User** | `demo@flyone.com` | `password` |

## Pages

| Page | Route | Description |
|------|-------|-------------|
| Homepage | `/` | Cinematic video hero, search card, destinations, deals, stats |
| Search | `/search` | Full search interface with mode selector and trip types |
| Search Results | `/search/results` | Route cards with filters, sorting, pagination |
| Destinations | `/destinations` | Photo grid with search, badges, price highlights |
| Destination Detail | `/destinations/{slug}` | Destination page with weather, tips, routes |
| Blog | `/blog` | Featured post + article grid with categories |
| Blog Post | `/blog/{slug}` | Full article with related posts |
| Contact | `/contact` | Contact form, FAQ accordion, business hours |
| Login | `/login` | Split-layout with video panel |
| Register | `/register` | Split-layout with video panel |
| Dashboard | `/dashboard` | User overview with stats |
| My Trips | `/dashboard/trips` | Booking history and management |
| AI Chat | `/chat` | Claude-powered travel assistant |
| Admin | `/admin` | Operations dashboard (role-gated) |
| Provider | `/provider` | Provider portal (role-gated) |

## Development

### Common Commands

```bash
npm run build                             # Production build
php artisan test                          # Run all Pest tests
npx vitest                                # Frontend unit tests
./vendor/bin/pint                         # PHP formatting
npx tsc --noEmit                          # TypeScript type checking
php artisan migrate:fresh --seed          # Reset database
php artisan horizon                       # Queue dashboard
php artisan reverb:start                  # WebSocket server
```

### Design System

Dark celestial theme defined in `resources/css/app.css`:

| Token | Value | Usage |
|-------|-------|-------|
| Base Background | `#08080e` | Page background |
| Section Alt | `#0c0b18` | Alternating section background |
| Primary Scale | `#F5F3FF` → `#7C3AED` | Lilac (buttons, accents, glows) |
| Teal | `#5BCFCF` | Secondary accent, flight path |
| Card Background | `white/[0.03]` | Frosted glass cards |
| Card Border | `white/[0.06]` | Subtle definition |
| Text Primary | `white` | Headings |
| Text Secondary | `white/50` | Labels, descriptions |
| Text Muted | `white/25-35` | Captions, hints |

## Project Stats

| Metric | Count |
|--------|-------|
| Domain modules | 8 |
| Inertia pages | 26 |
| React/TSX components | 42+ |
| Database migrations | 18 |
| Web routes | 40+ |
| Database seeders | 9 |
| Seeded routes | 800+ |
| Seeded destinations | 20 (with Unsplash images) |
| Seeded blog posts | 5 (with featured images) |

## License

This project is proprietary software developed by Ramlit Limited. All rights reserved.

---

## Developed By

<div align="center">

<img width="380" height="420" alt="engr-mejba-ahmed" src="https://github.com/user-attachments/assets/83e72c39-5eaa-428a-884b-cb4714332487" />


### **Engr Mejba Ahmed**

**AI Developer | Software Engineer | Entrepreneur**

[![Portfolio](https://img.shields.io/badge/Portfolio-mejba.me-10B981?style=for-the-badge&logo=google-chrome&logoColor=white)](https://www.mejba.me)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/mejba)
[![GitHub](https://img.shields.io/badge/GitHub-Follow-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/mejba13)

</div>

---

## Hire / Work With Me

I build AI-powered applications, mobile apps, and enterprise solutions. Let's bring your ideas to life!

| Platform | Description | Link |
|----------|-------------|------|
| **Fiverr** | Custom builds, integrations, performance optimization | [fiverr.com/s/EgxYmWD](https://www.fiverr.com/s/EgxYmWD) |
| **Mejba Personal Portfolio** | Full portfolio & contact | [mejba.me](https://www.mejba.me) |
| **Ramlit Limited** | Software development company | [ramlit.com](https://www.ramlit.com) |
| **ColorPark Creative Agency** | UI/UX & creative solutions | [colorpark.io](https://www.colorpark.io) |
| **xCyberSecurity** | Global cybersecurity services | [xcybersecurity.io](https://www.xcybersecurity.io) |
