# CLAUDE.md

## Project Overview

Flyone is a multi-modal travel booking platform (flights, trains, buses, ferries) built as a modular monolith targeting Southeast Asia. Laravel 13 + React 19 via Inertia.js 2.

## Tech Stack

- **Backend:** Laravel 13, PHP 8.3+, Inertia.js 3 server-side adapter
- **Frontend:** React 19, TypeScript 6, Inertia.js 3, Tailwind CSS 4, shadcn/ui-style components with Radix UI
- **State:** Zustand (client), TanStack React Query (server)
- **Database:** PostgreSQL, Redis (sessions, cache, queues)
- **Other:** Stripe (Laravel Cashier), Laravel Scout + Meilisearch, Laravel Reverb (WebSockets), Laravel Horizon (queues), Framer Motion (animations)
- **Testing:** Pest PHP, Vitest, Playwright
- **AI:** Claude API for chat assistant (SSE streaming)

## Commands

```bash
composer dev                   # Runs server, queue, logs, vite concurrently
npm run build                  # Production build
php artisan test               # Pest tests
npx vitest                     # Frontend unit tests
npx playwright test            # E2E tests
./vendor/bin/pint              # PHP formatting
npx tsc --noEmit               # TypeScript type checking
php artisan migrate:fresh --seed  # Reset DB with seed data
```

## Architecture

### Modular Monolith (`app/Modules/`)

Eight domain modules: `Booking`, `Search`, `Payment`, `User`, `Loyalty`, `AI`, `Provider`, `Admin`

Each module follows: `Models/`, `Actions/`, `Http/Controllers/`, `Http/Requests/`, `Http/Resources/`, `Services/`, `Events/`, `Jobs/`, `Policies/`

### Key Patterns

- **Action classes** for business logic (`app/Modules/*/Actions/`) — single-responsibility, injected into controllers
- **Provider Gateway** adapter pattern (`Provider/Services/ProviderGateway.php`) for GDS/carrier API abstraction
- **Redis caching** with tiered TTLs: search results (5min), routes (1hr), destinations (24hr)
- **Bridge User model** at `app/Models/User.php` extends `app/Modules/User/Models/User.php` for Laravel auth compatibility
- **RBAC** via spatie/laravel-permission: `user`, `provider`, `admin`, `super_admin`

### Design System (Tailwind 4 theme in `resources/css/app.css`)

- **Colors:** Primary Lilac `#D6CCFF` (scale 50-600), Deep Purple `#1A1A2E`, Teal `#5BCFCF`, Soft White `#F8F9FC`
- **Fonts:** `font-display` = Poppins (headings), `font-sans` = Inter (body)
- **Components:** Cards `rounded-2xl shadow-card`, Buttons `rounded-xl`, Badges `rounded-full`

## Demo Accounts

`admin@flyone.com`, `provider@flyone.com`, `demo@flyone.com` (password: `password`)
