# Quick Start Guide - Next.js DineSpark

## Prerequisites
- Node.js 18+ installed
- PostgreSQL running locally (or remote DB connection)
- Environment variables set in `.env`

## Step 1: Install Dependencies
```bash
npm install
```

## Step 2: Verify Database Connection
Make sure `.env` has correct DATABASE_URL:
```
DATABASE_URL="postgresql://postgres:password@localhost:5432/restaurant_db"
NEXT_PUBLIC_API_URL="http://localhost:3000"
```

## Step 3: Set up Database (if new)
```bash
npm run db:push
```

## Step 4: Start Development Server
```bash
npm run dev
```
Open http://localhost:3000 in your browser

## Step 5: Seed Database with Sample Data
```bash
curl http://localhost:3000/api/seed
```

## Troubleshooting

### Port 3000 already in use?
```bash
npm run dev -- -p 3001
```

### Database connection error?
- Check `DATABASE_URL` in `.env`
- Ensure PostgreSQL is running
- Verify database name and credentials

### Missing dependencies?
```bash
npm install
```

### Type errors?
```bash
npm run check
```

### Build fails?
```bash
npm run build
```

## Common Tasks

### View Type Errors
```bash
npm run check
```

### Build for Production
```bash
npm run build
```

### Start Production Server
```bash
npm start
```

### Reset Database
```bash
npm run db:push
curl http://localhost:3000/api/seed
```

## Project Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server (http://localhost:3000) |
| `npm run build` | Build for production |
| `npm start` | Start production server |
| `npm run check` | TypeScript type checking |
| `npm run db:push` | Push database migrations |

## Key Files to Know

- **`app/`** - All routes and pages
- **`src/`** - Components, hooks, utilities
- **`lib/`** - Database connection & storage
- **`shared/`** - Database schema

## Next.js Features Used

✅ App Router (file-based routing)
✅ API Routes
✅ Server Components (ready)
✅ Client Components (interactive pages)
✅ TypeScript
✅ Tailwind CSS
✅ Image Optimization (ready)
✅ Built-in middleware support

## Pages Available

- Home: http://localhost:3000/
- Menu: http://localhost:3000/menu
- Reservations: http://localhost:3000/reservations
- Contact: http://localhost:3000/contact

## Need Help?

- See `NEXTJS_MIGRATION.md` for detailed migration info
- See `CONVERSION_SUMMARY.md` for what changed
- Check Next.js docs: https://nextjs.org/docs

## Happy Coding! 🚀
