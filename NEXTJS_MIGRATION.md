# DineSpark - Next.js Project

This project has been converted from a Vite + Express setup to a pure Next.js full-stack application.

## Project Structure

### New Structure
```
app/
├── (pages)/           # Page routes with shared layout
│   ├── layout.tsx     # Pages layout with Navigation & Footer
│   ├── page.tsx       # Home page
│   ├── menu/
│   ├── reservations/
│   ├── contact/
│   └── not-found.tsx
├── api/               # Next.js API routes
│   ├── menu/
│   ├── reservations/
│   ├── contact/
│   └── seed/
├── layout.tsx         # Root layout
└── providers.tsx      # React Query setup

src/
├── components/        # React components
│   ├── Navigation.tsx
│   ├── Footer.tsx
│   ├── MenuCard.tsx
│   └── ui/           # shadcn/ui components
├── hooks/            # Custom React hooks
│   ├── use-restaurant.ts
│   ├── use-toast.ts
│   └── use-mobile.tsx
├── lib/              # Utility functions
│   ├── db.ts         # Drizzle ORM setup
│   ├── storage.ts    # Database storage layer
│   ├── seed.ts       # Database seeding
│   ├── utils.ts
│   └── queryClient.ts
└── styles/
    └── globals.css

shared/
├── schema.ts         # Drizzle schema & types
└── routes.ts         # API route definitions

lib/
├── db.ts             # Database connection
└── storage.ts        # Storage implementation
```

## Key Changes

### 1. **Removed Vite Setup**
   - Removed `vite.config.ts`
   - Removed Vite plugins
   - No longer using Vite dev server

### 2. **Next.js Integration**
   - Created `next.config.ts` for Next.js configuration
   - Updated `tsconfig.json` for Next.js
   - All pages now use Next.js App Router (not Wouter)
   - Navigation uses `next/link` and `usePathname()`

### 3. **Express → API Routes**
   - All Express routes moved to `app/api/*/route.ts`
   - Database seeding via `app/api/seed/route.ts`
   - No separate server needed

### 4. **Full-Stack Capabilities**
   - Can use server components in `app/` directory
   - API routes in same repository
   - Built-in middleware support
   - Environment variables handled by Next.js

## Getting Started

### Prerequisites
- Node.js 18+ 
- PostgreSQL database running
- Environment variables configured

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   ```bash
   # .env file already configured
   DATABASE_URL="postgresql://postgres:abdullah@localhost:5432/restaurant_db"
   NEXT_PUBLIC_API_URL="http://localhost:3000"
   ```

3. **Push database schema:**
   ```bash
   npm run db:push
   ```

4. **Seed the database:**
   ```bash
   curl http://localhost:3000/api/seed
   ```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm start
```

## API Endpoints

All endpoints are accessible at the base URL:

- `GET /api/menu` - Get all menu items
- `GET /api/menu/categories` - Get all categories
- `POST /api/reservations` - Create a reservation
- `GET /api/reservations/:id` - Get reservation details
- `POST /api/contact` - Send a contact message
- `GET /api/seed` - Seed the database

## Database

Uses Drizzle ORM with PostgreSQL. Schema defined in `shared/schema.ts`.

### Tables
- `categories` - Menu categories (Starters, Mains, etc.)
- `menu_items` - Individual menu items
- `reservations` - Restaurant reservations
- `messages` - Contact form messages

### Run migrations
```bash
npm run db:push
```

## Client-Server Rendering

### Client Components
- Use `"use client"` directive for interactivity
- Handle forms, navigation, state management
- React Query for data fetching

### Server Components
- Can access database directly
- Secure API operations
- Better SEO

## TypeScript

Full TypeScript support throughout:
- Strict mode enabled
- Type-safe database queries with Drizzle
- Type-safe API routes
- Type-safe components

## Styling

- Tailwind CSS for styling
- CSS variables for theming
- Dark mode support (class-based)
- Custom color palette (Gold & Charcoal)

## Key Libraries

- **Next.js** - React framework
- **React** - UI library
- **React Query** - Data fetching
- **Drizzle ORM** - Database ORM
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **React Hook Form** - Form handling
- **Zod** - Schema validation

## Migration Notes

### What Changed
1. **Routing**: Wouter → Next.js Link & usePathname()
2. **Server**: Express.js removed → Next.js API Routes
3. **Structure**: `/client/src` → `/app` and `/src`
4. **Config**: Vite → Next.js
5. **Build**: `tsx` → `next build`

### What Stayed the Same
- Component structure (mostly)
- Database schema
- Styling (Tailwind + custom CSS)
- UI components (shadcn/ui)
- Business logic

## Deployment

Can be deployed to:
- Vercel (recommended for Next.js)
- Any Node.js hosting
- Docker containers
- Traditional VPS

## Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a PR

## License

MIT
