# B9 Portal — Deploy guide (Render + Vercel)

Deploy the **static portal** on Vercel (same repo as your portfolio) and the **API** on Render with a small persistent disk for session data.

---

## When to deploy Render

**Deploy after this feature set is pushed to GitHub, before Pete's first live session.**

| Step | When |
|------|------|
| Push code to GitHub | Now (includes shared workspace, exports, PWA) |
| Render Blueprint | Same day as push — ~15 min setup |
| Vercel env vars + redeploy | Immediately after Render gives you `JWT_SECRET` |
| Smoke test | Before sharing `/b9/login` with Pete |
| GitHub keep-warm workflow | After Render URL is known (optional repo var `B9_API_URL`) |

You do **not** need Render for local dev (`USE_JSON_STORE=1` on `:3001`). You **do** need it before Pete/Brenda use Discover, shared workspace, or facilitation pack export in production.

---

## Architecture

| Piece | Host | URL |
|-------|------|-----|
| Portal (`/b9/*`) | Vercel | `https://andrewdeanmartin.com/b9/` |
| Login API | Vercel serverless | `/api/b9-auth` |
| Transform API | Render | `https://b9-transform-api.onrender.com` |
| Browser → API | Vercel rewrite | `/b9-api/*` → Render (same-origin, no CORS hassle) |

---

## Part 1 — Render (API)

### 1. Create a Render account

1. Go to [render.com](https://render.com) and sign up (GitHub login is easiest).
2. Connect your GitHub account when prompted.

### 2. Deploy from Blueprint

1. In Render dashboard: **New** → **Blueprint**.
2. Select this repo: `andrew-martin-portfolio` (or whatever the GitHub name is).
3. Render reads `backend/render.yaml` and proposes:
   - **Web service:** `b9-transform-api`
   - **Plan:** Starter (~$7/mo — needed for persistent disk)
   - **Disk:** 1 GB mounted at `/data` for `store.json`
4. Click **Apply**.

### 3. Set environment variables

After the service is created, open **b9-transform-api** → **Environment**:

| Variable | Action |
|----------|--------|
| `JWT_SECRET` | Render auto-generated one — **copy this value** (you'll paste the same string into Vercel as `B9_JWT_SECRET`) |
| `ADMIN_API_KEY` | Auto-generated — save somewhere safe for curl/admin scripts |
| `ALLOWED_ORIGINS` | Should already be `https://andrewdeanmartin.com,https://www.andrewdeanmartin.com` |
| `ANTHROPIC_API_KEY` | Optional — enables LLM learning extraction on Discover answers |
| `USE_JSON_STORE` | `1` (set by blueprint) |
| `DATA_DIR` | `/data` (set by blueprint) |

**Important:** Do not change `JWT_SECRET` after Vercel is configured unless you update Vercel too.

### 4. Confirm the API is live

1. Wait for deploy to finish (first deploy ~2–5 min).
2. Open: `https://b9-transform-api.onrender.com/health`
3. Expect: `{"ok":true}` (or similar JSON).

If health fails, check **Logs** in Render for startup errors.

### 5. Note your service URL

Default URL pattern:

`https://b9-transform-api.onrender.com`

You'll use this in `site/vercel.json` (next section).

---

## Part 2 — Vercel (portal + proxy)

### 1. Wire the API proxy

Edit `site/vercel.json` and set the rewrite destination to your **actual** Render URL:

```json
{
  "rewrites": [
    {
      "source": "/b9-api/:path*",
      "destination": "https://b9-transform-api.onrender.com/:path*"
    }
  ],
  "cleanUrls": true
}
```

Commit and push — Vercel redeploys automatically if the project is connected.

The browser calls `/b9-api/v1/...` on your domain; Vercel forwards to Render.

### 2. Environment variables (Vercel project settings)

**Settings → Environment Variables** (Production + Preview if you use previews):

| Variable | Value |
|----------|--------|
| `B9_JWT_SECRET` | **Same string** as Render `JWT_SECRET` |
| `B9_ACCESS_PASSWORD` | Shared portal password for Pete/Brenda/staff |
| `B9_PETE_PASSWORD` | Optional role-specific password |
| `B9_BRENDA_PASSWORD` | Optional |
| `B9_STAFF_PASSWORD` | Optional |
| `B9_ADMIN_PASSWORD` | Your admin password for `/b9/admin` |

Redeploy after adding env vars (Vercel → Deployments → ⋮ → Redeploy).

### 3. Smoke test production

1. `https://andrewdeanmartin.com/b9/login` — sign in with `B9_ACCESS_PASSWORD`.
2. **Discover** — start a session, answer one question (checks JWT + API).
3. **Tools** — fill stack survey, **Save** (checks `PUT /v1/client/stack-profile`).
4. **Admin** — sign in as admin; confirm sessions list and stack profile appear.

---

## Part 3 — Secrets checklist

```
Render JWT_SECRET  ═══════════════════  Vercel B9_JWT_SECRET
         (must match exactly)
```

If Discover works but API calls return 401, these secrets are out of sync.

---

## Part 4 — Local dev (reference)

```bash
# Terminal 1 — site with clean URLs
python3 scripts/serve-site.py
# → http://localhost:8080/b9/

# Terminal 2 — API
cd backend && USE_JSON_STORE=1 npm start
# → http://localhost:3001

# site/.env.local
B9_JWT_SECRET=change-me-local-dev-secret
B9_ACCESS_PASSWORD=b9local
```

Local dev uses `http://localhost:3001` directly (see `b9-config.js`), not the `/b9-api` proxy.

Backend `.env` should use the **same** `JWT_SECRET` as `B9_JWT_SECRET` locally.

---

## Part 5 — Operations

### Cold starts (Render Starter)

After ~15 min idle, the first request may take 30–60s. Subsequent requests are fast. For a client demo, hit `/health` a minute before the session.

### Backups

Session data lives in `/data/store.json` on the Render disk. For MVP, occasionally download via a future admin export or SSH/shell if you add it. Upgrading to Postgres is optional (Prisma schema exists but is not wired for MVP).

### Updating content

Knowledge JSON source of truth: `b9-advisory/knowledge/`. Copy to:

- `site/b9/knowledge/` (static fetch)
- `backend/src/knowledge/` (API branch engine)

Then push — Vercel redeploys static files; Render redeploys if backend changed.

### Logs

- **Render:** Service → Logs
- **Vercel:** Deployment → Functions / Runtime logs (for `/api/b9-auth`)

---

## Part 6 — PWA (install on phone / tablet)

The B9 guide is a scoped Progressive Web App under `/b9/`:

- **Install:** On supported browsers, use **Add to home screen** (button appears in the B9 subnav when available).
- **Offline:** Knowledge JSON and static pages cache after first visit; API calls still need network.
- **Files:** `manifest.webmanifest`, `service-worker.js`, registered via `b9-pwa.js`.

After deploy, open `/b9/` on mobile → browser menu → **Add to Home Screen** for a standalone app icon.

---

## Troubleshooting

| Symptom | Likely fix |
|---------|------------|
| 401 on Discover/API | Match `JWT_SECRET` ↔ `B9_JWT_SECRET` |
| CORS errors | Should not happen with `/b9-api` proxy; if calling Render directly, check `ALLOWED_ORIGINS` |
| Stack save 501 | `USE_JSON_STORE=1` not set on Render |
| Empty sessions after redeploy | Disk not mounted — verify Starter plan + disk in `render.yaml` |
| `/b9/processes` 404 locally | Use `scripts/serve-site.py`, not plain `python -m http.server` |

---

## Cost snapshot (MVP)

- **Render Starter** web service + 1 GB disk: ~$7/mo + disk (~$0.25/GB)
- **Vercel:** existing portfolio plan
- **Anthropic API:** pay-as-you-go if key is set (optional)

---

## First session with Pete (after deploy)

1. Process Map → pick 3 processes at Low maturity → export TOM.
2. Tools → complete **Current stack survey**.
3. Discover → `setup` track, then 1–2 workflow tracks.
4. Your Plan → review branch + 90-day checklist.
5. Admin → Andrew reviews before sharing externally.

See `HANDOFF.md` for facilitation notes.
