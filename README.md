<p align="center">
  <img src="https://img.shields.io/badge/Laravel-13-FF2D20?style=for-the-badge&logo=laravel&logoColor=white" alt="Laravel 13" />
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React 19" />
  <img src="https://img.shields.io/badge/TypeScript-6-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS 4" />
  <img src="https://img.shields.io/badge/Inertia.js-3-9553E9?style=for-the-badge&logo=inertia&logoColor=white" alt="Inertia.js 3" />
</p>

<h1 align="center">Flyone Web</h1>

<p align="center">
  <strong>AI-Powered Multi-Modal Travel Booking Platform for Southeast Asia</strong>
</p>

<img width="1696" height="1259" alt="CleanShot 2026-03-28 at 3  40 45" src="https://github.com/user-attachments/assets/196480b4-78a2-4c33-a4d3-7f11a2fa1660" />


<p align="center">
  Compare and book flights, trains, buses, and ferries across Southeast Asia — all in one search.<br />
  Built as a modular monolith with Laravel 13, React 19, Inertia.js 3, and Tailwind CSS 4.
</p>

---

## Overview

Flyone Web is a full-stack travel booking platform that unifies multi-modal transport search, AI-powered recommendations, dynamic pricing, digital ticketing, and a loyalty rewards program into a single, responsive web experience.

The platform serves three audiences:
- **Travelers** — Search, compare, and book across 500+ routes and 20+ destinations
- **Transport Providers** — Manage routes, pricing, bookings, and revenue
- **Administrators** — Monitor operations, manage users, and analyze business metrics

## Key Features

| Feature | Description |
|---------|-------------|
| **Multi-Modal Search** | Unified search across flights, trains, buses, and ferries |
| **6-Step Booking Flow** | Passengers, seat selection, add-ons, review, payment, confirmation |
| **AI Chat Assistant** | Claude-powered travel assistant with SSE streaming |
| **Stripe Payments** | Secure payment processing with multiple payment methods |
| **Loyalty Program** | Tiered rewards (Bronze / Silver / Gold / Platinum) with points system |
| **E-Tickets** | Digital tickets with QR codes and PDF download |
| **Real-Time Updates** | WebSocket notifications via Laravel Reverb |
| **Provider Portal** | Self-service dashboard for transport providers |
| **Admin Dashboard** | Operations management with analytics |
| **Blog CMS** | Travel guides and destination content |
| **Social Auth** | OAuth login via Google, Apple, and Facebook |
| **Two-Factor Auth** | TOTP-based 2FA with recovery codes |

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
| **Spatie Permission** | Role-based access control (RBAC) |
| **DomPDF** | Server-side PDF ticket generation |

### Frontend

| Technology | Purpose |
|-----------|---------|
| **React 19** | UI framework |
| **TypeScript 6** | Type safety |
| **Tailwind CSS 4** | Utility-first CSS with Oxide engine |
| **Framer Motion 12** | Animations and page transitions |
| **Radix UI** | Accessible headless UI primitives (16 packages) |
| **Zustand 5** | Client-side state management |
| **TanStack React Query 5** | Server state management and caching |
| **Recharts 3** | Dashboard charts and analytics |
| **Lucide React** | Icon library |
| **Vite 8** | Frontend build tool with HMR |

### Infrastructure

| Technology | Purpose |
|-----------|---------|
| **PostgreSQL 17 / MySQL 8+** | Primary database |
| **Redis 8** | Sessions, cache, queues, real-time |
| **Meilisearch** | Full-text search engine (optional) |
| **Stripe** | Payment processing |
| **Claude API** | AI chat assistant |

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
├── Pages/             # 25 Inertia page components
│   ├── Public/        #   Landing, Search, Destinations, SearchResults
│   ├── Auth/          #   Login, Register
│   ├── Dashboard/     #   Trips, Profile, Loyalty, Notifications, Ticket
│   ├── Booking/       #   Passengers, SeatSelection, Addons, Review, Payment, Confirmation
│   ├── Chat/          #   AI conversation interface
│   ├── Blog/          #   Blog listing and posts
│   ├── Admin/         #   Admin dashboard
│   └── Provider/      #   Provider dashboard
├── Components/        # Reusable UI components (shadcn/ui style)
│   ├── ui/            #   Button, Card, Badge, Input, Dialog, Select, etc.
│   └── layout/        #   Navbar, Footer
├── Layouts/           # MainLayout, DashboardLayout, AuthLayout
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
| `reviews` | Provider reviews with ratings breakdown |
| `notifications` | In-app notification system |
| `destinations` | SEO-optimized destination pages |
| `chat_conversations` | AI chat history with messages |
| `blog_posts` | CMS blog content with tags |
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
DB_CONNECTION=pgsql          # or mysql
DB_HOST=127.0.0.1
DB_PORT=5432                 # 3306 for MySQL
DB_DATABASE=flyone
DB_USERNAME=your_user
DB_PASSWORD=your_password

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
# Run migrations and seed with sample data
php artisan migrate:fresh --seed
```

This creates:
- **10** transport providers (5 airlines, 2 railways, 2 bus operators, 1 ferry)
- **20** Southeast Asian destinations with descriptions, weather, and tips
- **800+** routes with realistic pricing over 60 days
- **50** users across all roles (admin, provider, demo + generated)
- **5** active promo codes
- Sample bookings with tickets, reviews, loyalty points, and notifications

### Run the Application

```bash
# All services at once (recommended)
composer dev

# Or run individually:
php artisan serve          # Laravel dev server (port 8000)
npm run dev                # Vite HMR dev server (port 5173)
php artisan queue:work     # Queue worker
```

Visit `http://localhost:8000` or your Herd domain (e.g., `http://flyone-web.test`).

### Demo Accounts

| Role | Email | Password |
|------|-------|----------|
| **Admin** | `admin@flyone.com` | `password` |
| **Provider** | `provider@flyone.com` | `password` |
| **User** | `demo@flyone.com` | `password` |

## Development

### Common Commands

```bash
# Build for production
npm run build

# Testing
php artisan test                          # All Pest PHP tests
php artisan test --filter=BookingTest     # Single test
npx vitest                                # Frontend unit tests
npx playwright test                       # E2E tests

# Code quality
./vendor/bin/pint                         # PHP formatting (Laravel Pint)
npx tsc --noEmit                          # TypeScript type checking

# Database
php artisan migrate                       # Run pending migrations
php artisan db:seed                       # Re-seed data
php artisan tinker                        # Interactive REPL

# Monitoring & services
php artisan horizon                       # Queue dashboard
php artisan reverb:start                  # WebSocket server
php artisan pulse                         # Health monitoring dashboard

# Utilities
php artisan route:list                    # Show all routes (39 total)
php artisan config:clear                  # Clear cached config
php artisan view:clear                    # Clear compiled views
```

### Route Groups

| Group | Prefix | Description |
|-------|--------|-------------|
| Public | `/` | Landing, Search, Results, Destinations, Blog |
| Auth | `/login`, `/register` | Login, Register, Social OAuth callbacks |
| Dashboard | `/dashboard/*` | Trips, Profile, Loyalty, Notifications |
| Booking | `/booking/*` | 6-step booking flow |
| Chat | `/chat` | AI travel assistant (SSE streaming) |
| Admin | `/admin/*` | Operations dashboard (role-gated) |
| Provider | `/provider/*` | Provider portal (role-gated) |

### Design System

Built on Tailwind CSS 4 with custom theme tokens defined in `resources/css/app.css`:

| Token | Value | Usage |
|-------|-------|-------|
| Primary | `#D6CCFF` → `#7C3AED` | Lilac scale (buttons, accents, links) |
| Teal | `#5BCFCF` | Secondary accent |
| Deep | `#1A1A2E` | Dark backgrounds, text |
| Soft | `#F8F9FC` | Light backgrounds |
| Display Font | Poppins | Headings |
| Body Font | Inter | Body text |

## Project Stats

| Metric | Count |
|--------|-------|
| Domain modules | 8 |
| PHP source files | 60 |
| React/TSX components | 41 |
| Inertia pages | 25 |
| Database migrations | 18 |
| Web routes | 39 |
| Database seeders | 9 |
| Seeded routes | 800+ |
| Seeded destinations | 20 |

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
