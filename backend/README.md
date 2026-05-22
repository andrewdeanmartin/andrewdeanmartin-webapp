# B9 Transform API

Render Web Service for B9 Transformation Guide Q&A and outcome generation.

## Quick start (local)

```bash
cp .env.example .env
# USE_JSON_STORE=1 for file-based persistence without Postgres
npm install
npm run dev
curl http://localhost:3001/health
```

## Tests

```bash
npm test
```

## Production (Render)

1. Connect repo; set root directory to `backend/`.  
2. Apply `render.yaml` or create Web Service + Postgres manually.  
3. Set env vars from `.env.example`.  
4. Set `USE_JSON_STORE=0` when using Postgres (Prisma path — extend `jsonStore` swap for production DB when ready).

## API

| Method | Path | Auth |
|--------|------|------|
| GET | `/health` | None |
| POST | `/v1/sessions` | Bearer JWT |
| GET | `/v1/sessions/:id/next-question` | Bearer JWT |
| POST | `/v1/sessions/:id/answers` | Bearer JWT |
| POST | `/v1/sessions/:id/synthesize` | Bearer JWT |
| GET | `/v1/admin/sessions` | JWT + admin role |

JWT is issued by Vercel `/api/b9-auth` on login.
