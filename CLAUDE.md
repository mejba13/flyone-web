# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Flyone is a multi-modal travel booking platform (flights, trains, buses, ferries) built as a modular monolith targeting Southeast Asia. It uses Laravel 13 with React 19 via Inertia.js 2.

## Tech Stack

- **Backend:** Laravel 13, PHP 8.3+, Inertia.js server-side adapter
- **Frontend:** React 19, TypeScript 5, Inertia.js 2, Tailwind CSS 4 (Oxide), shadcn/ui-style components with Radix UI
- **State:** Zustand (client state), TanStack React Query (server state)
- **Database:** PostgreSQL 17, Redis 8 (sessions, cache, queues)
- **Payments:** Stripe via Laravel Cashier
- **Search:** Laravel Scout with Meilisearch
- **Real-time:** Laravel Reverb (WebSockets)
- **Queue:** Laravel Horizon (Redis-backed)
- **Testing:** Pest PHP (backend), Vitest (frontend), Playwright (E2E)
- **AI:** Claude API for chat assistant (SSE streaming)

## Common Commands

```bash
# Development (runs server, queue, logs, vite concurrently)
composer dev

# Individual services
php artisan serve              # Laravel dev server
npm run dev                    # Vite dev server
php artisan queue:work         # Queue worker
php artisan horizon            # Horizon dashboard
php artisan reverb:start       # WebSocket server

# Build
npm run build

# Testing
php artisan test               # Run all Pest tests
php artisan test --filter=BookingTest  # Single test file
npx vitest                     # Frontend unit tests
npx playwright test            # E2E tests

# Database
php artisan migrate            # Run migrations
php artisan migrate:fresh --seed  # Reset and seed
php artisan db:seed            # Seed only

# Code quality
./vendor/bin/pint              # PHP code formatting (Laravel Pint)
npx tsc --noEmit               # TypeScript type checking

# Artisan helpers
php artisan tinker             # REPL
php artisan route:list         # Show all routes
php artisan pulse              # Pulse monitoring dashboard
```

## Architecture

### Modular Monolith (`app/Modules/`)

Eight domain modules, each self-contained:

| Module | Responsibility |
|--------|---------------|
| `Booking` | Booking creation, confirmation, cancellation, tickets |
| `Search` | Route search, destinations, autocomplete, caching |
| `Payment` | Stripe payment processing, refunds, transactions |
| `User` | Auth, profile, travelers, notifications |
| `Loyalty` | Points, tiers, promo codes, referrals |
| `AI` | Claude chat conversations, SSE streaming |
| `Provider` | Transport providers, gateway adapter pattern |
| `Admin` | Admin dashboard, blog CMS, analytics |

Each module follows: `Models/`, `Actions/`, `Http/Controllers/`, `Http/Requests/`, `Http/Resources/`, `Services/`, `Events/`, `Jobs/`, `Policies/`

### Key Patterns

- **Action classes** for business logic (`app/Modules/*/Actions/`) — single-responsibility, injected into controllers
- **Provider Gateway** with adapter pattern (`Provider/Services/ProviderGateway.php`) for GDS/carrier API abstraction
- **Redis caching** with tiered TTLs: search results (5min), routes (1hr), destinations (24hr)
- **Events + Broadcasting** for real-time updates (BookingConfirmed broadcasts via Reverb)
- **Bridge User model** at `app/Models/User.php` extends `app/Modules/User/Models/User.php` so Laravel auth config works

### Frontend Structure (`resources/js/`)

```
Pages/          # Inertia pages (Public/, Auth/, Dashboard/, Booking/, Chat/, Blog/, Admin/, Provider/)
Components/     # ui/ (shadcn-style), layout/ (Navbar, Footer), shared/, search/, booking/, dashboard/
Layouts/        # MainLayout, DashboardLayout, AuthLayout
Stores/         # Zustand stores (searchStore, bookingStore, uiStore)
Hooks/          # useAuth, useFlash
Types/          # TypeScript interfaces for all models
Lib/            # utils.ts (cn, formatCurrency, formatDate, etc.)
```

### Design System (Tailwind 4 Theme in `resources/css/app.css`)

- **Colors:** Primary Lilac `#D6CCFF` (scale 50-600), Deep Purple `#1A1A2E`, Teal `#5BCFCF`, Soft White `#F8F9FC`
- **Fonts:** `font-display` = Poppins (headings), `font-sans` = Inter (body)
- **Components:** Cards use `rounded-2xl shadow-card`, Buttons use `rounded-xl`, Badges use `rounded-full`
- **Motion:** Framer Motion for page transitions, staggered reveals, animated counters

### Auth Flow

- Sanctum SPA cookie auth (CSRF-based)
- OAuth via Socialite (Google, Apple, Facebook)
- TOTP 2FA with encrypted secrets and recovery codes
- RBAC via spatie/laravel-permission: `user`, `provider`, `admin`, `super_admin`
- Progressive lockout after 5 failed login attempts (15min)

### Routes

All web routes in `routes/web.php`. Key route groups:
- Public: `/`, `/search`, `/search/results`, `/destinations/{slug}`, `/blog`
- Auth: `/login`, `/register`, `/auth/{provider}/redirect`
- Dashboard: `/dashboard/*` (trips, profile, loyalty, notifications)
- Booking: `/booking/passengers` through `/booking/confirmation/{ref}`
- Chat: `/chat`, `/chat/{conversation}/message` (SSE endpoint)
- Admin: `/admin/*` (role-gated)
- Provider: `/provider/*` (role-gated)

## Database

18 migrations covering: users (extended), travelers, providers, routes, bookings, booking_segments, tickets, transactions, loyalty_points, promo_codes, reviews, notifications, destinations, chat_conversations, chat_messages, permission_tables, blog_posts.

Bookings table uses `booking_ref` (8-char random) as public identifier.

## Seeded Data

- 10 transport providers (5 airlines, 2 railways, 2 bus operators, 1 ferry)
- 20 destinations across Southeast Asia with descriptions, weather, tips
- 200+ routes with realistic pricing over 60 days
- 50 users (admin, provider, demo + 47 generated)
- 5 active promo codes
- Sample bookings with tickets
- 5 blog posts

Demo accounts: `admin@flyone.com`, `provider@flyone.com`, `demo@flyone.com` (password: `password`)

## Environment

Copy `.env.example` to `.env`. Key settings:
- `DB_CONNECTION=pgsql` with database `flyone`
- `CACHE_STORE=redis`, `SESSION_DRIVER=redis`, `QUEUE_CONNECTION=redis`
- `STRIPE_KEY`, `STRIPE_SECRET` for payments
- `ANTHROPIC_API_KEY` for AI chat
- `REVERB_*` for WebSocket config
- Social OAuth: `GOOGLE_*`, `APPLE_*`, `FACEBOOK_*`
