# GuessTheBeta

A TikTok-style climbing app where users guess the beta for board climbs (Kilter, Tension, Moon). See a route photo, guess the beta, then watch videos of people climbing it.

## Tech Stack

- **Frontend**: React + TypeScript + Vite + Tailwind CSS (deployed on Vercel)
- **Backend**: Spring Boot 3 + Java 21 (deployed on Google Cloud Run)
- **Database**: Neon PostgreSQL (managed via Flyway migrations)
- **Auth**: Google OAuth 2.0

## Features

- Pick a board/gym from a list
- TikTok-style vertical swiping for random routes
- Horizontal swiping for different beta videos per route
- Configurable difficulty range (V0-V17)
- Climb history tracking
- Google sign-in

## Local Development

### Prerequisites
- Java 21
- Node.js 20+
- PostgreSQL (or use Docker Compose)

### Database
```bash
docker compose up -d
psql -h localhost -U postgres -d guessthebeta -f seed/seed_data.sql
```

### Backend
```bash
cd backend
./gradlew bootRun
# Runs on http://localhost:8080
```

### Frontend
```bash
cd frontend
npm install
npm run dev
# Runs on http://localhost:5173 (proxies /api to backend)
```

## Environment Variables

### Backend
| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | Neon PostgreSQL JDBC URL |
| `DATABASE_USER` | Database username |
| `DATABASE_PASSWORD` | Database password |
| `GOOGLE_CLIENT_ID` | Google OAuth client ID |
| `JWT_SECRET` | Secret for JWT token signing |
| `CORS_ORIGINS` | Allowed CORS origins (comma-separated) |

### Frontend
| Variable | Description |
|----------|-------------|
| `VITE_API_BASE_URL` | Backend API base URL |
| `VITE_GOOGLE_CLIENT_ID` | Google OAuth client ID |

## Deployment

- **Frontend**: Connect repo to Vercel, set root directory to `frontend/`
- **Backend**: Build Docker image, deploy to Google Cloud Run
- **Database**: Use Neon's managed PostgreSQL
