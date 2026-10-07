# RepFlow — Fitness & Workout Tracker

RepFlow is a mobile-first full-stack fitness tracker for logging workouts, tracking body-composition measurements, reviewing history, managing exercises and generating a practical weekly training plan.

## V1 features

- Google authentication with Better Auth
- Dashboard with quick actions
- Workout logging for repetition, duration and distance exercises
- Workout history and editing
- Body-composition metrics and measurements
- Exercise and muscle-group management
- Workout templates / admin tools
- RepFlow Coach: instant goal + schedule based workout-plan generator
- Responsive mobile-first UI and installable web manifest
- PostgreSQL + Drizzle ORM
- TanStack Start / Router / Query
- Tailwind CSS
- Cloudflare deployment configuration
- Automated tests inherited from the underlying workout data layer

## Tech stack

- React 19 + TypeScript
- TanStack Start, Router and Query
- Drizzle ORM + PostgreSQL
- Better Auth
- Tailwind CSS
- Cloudflare Workers
- Vitest

## Local setup

1. Install Node.js 20+ and Docker Desktop.
2. Copy the repository locally.
3. Run `npm install`.
4. Configure the environment variables required by Better Auth / Google OAuth and your PostgreSQL database.
5. Start PostgreSQL using `npm run pg-raw` or your own PostgreSQL instance.
6. Initialize/update the local database with `npm run update-local-db`.
7. Run `npm run dev`.
8. Open `http://localhost:3000`.

## Product direction

V2 can add persistent goals, PR detection, progression recommendations, rest timer, weekly volume analytics, progress charts, exercise media, Apple Health integration and a real model-backed AI coach.

## Credits / provenance

RepFlow V1 was created as a customized derivative of the user-provided `fitness-tracker-main` codebase. The UI branding, dashboard, navigation and Coach experience were adapted for the RepFlow product concept.
