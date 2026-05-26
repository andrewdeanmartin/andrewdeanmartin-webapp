# B9 Transformation Guide — Handoff

Private guide at **`/b9/`** on andrewdeanmartin.com. Pre-integrator discovery: map operations → target maturity → validate with Q&A → phased plan.

**Deploy first:** See [`DEPLOY.md`](./DEPLOY.md). Render goes live **after you push this repo** and before Pete's first session.

---

## What Pete / Brenda / team see

| Step | Page | Purpose |
|------|------|---------|
| 1 | **Process Map** | Tech-agnostic steps; AI overlay; edit notes; set Low/Med/High maturity per process |
| 2 | **Tools** | Baseline metrics + current stack survey (syncs to server) |
| 3 | **Discover** | Optional workflow Q&A (not job-title tracks) |
| 4 | **Your Plan** | Branch, 3 starters, 90-day checklist — **pick one pilot for 30 days** |

Background: **Learn** (AI basics), **Decide** (tradeoff cards).

**Shared workspace:** TOM, process edits, baselines, and compliance gates sync to the API — Pete and Brenda see the same data on any device.

---

## First facilitated session (~60 min)

1. Sign in at **`https://www.andrewdeanmartin.com/b9/login`** (always include `www`; share this exact link with Pete — not the bare domain).
2. **Process Map** — walk client journey; toggle AI overlay; fix wrong steps; set **3 processes at Low** maturity; apply **Balanced** or **Pete wiring** preset if helpful.
3. **Export TOM** (copy or download from Process Map).
4. **Tools** — fill **baseline metrics** and **stack survey** together.
5. Optional **Discover** — 1–2 workflow tracks where pain is highest.
6. **Your Plan** if enough context; otherwise **Download facilitation pack** from Start Here for Brenda.
7. Agree **one pilot** this week: ROI-01 (email triage) or ROI-02 (quotes) — not WhatsApp/CRM.

Andrew reviews in **Admin**; refine before anything goes external.

---

## 30-day success checklist

- [ ] Process map validated; TOM exported
- [ ] Baselines captured on Tools page
- [ ] Stack survey complete
- [ ] Discover run on ≥1 workflow (optional but valuable)
- [ ] Plan reviewed OR facilitation pack shared with Brenda
- [ ] Compliance gates checked on Plan page before talent-facing work
- [ ] **One pilot running** (ROI-01 or ROI-02)
- [ ] ChatGPT Teams (or equivalent) with usage policy
- [ ] 30-day checkpoint scheduled

---

## Passwords & access

Use **separate passwords per role** in Vercel when possible:

| Variable | Who |
|----------|-----|
| `B9_PETE_PASSWORD` | Pete |
| `B9_BRENDA_PASSWORD` | Brenda |
| `B9_STAFF_PASSWORD` | Coordinators |
| `B9_ADMIN_PASSWORD` | Andrew |
| `B9_ACCESS_PASSWORD` | Shared fallback |

Login shows a confidentiality notice. Do not email passwords — use 1Password or similar.

**Portal link for Pete (copy exactly):** `https://www.andrewdeanmartin.com/b9/login`  
The `www` prefix is required — bare `andrewdeanmartin.com` breaks sign-in in Safari (including Private Browsing).

---

## Exports

| Export | Where |
|--------|--------|
| Target Operating Model | Process Map → Copy / Download |
| Facilitation pack (TOM summary + stack + baselines + plan) | Start Here or Plan → **Download facilitation pack** |
| Plan markdown | Your Plan → Download Markdown |
| Full API backup | Admin → Download backup JSON |

Forward the **facilitation pack** to Brenda if she won't log in.

---

## Positioning (for Pete)

This portal is **map → target state → phased plan** — so B9 can hire WhatsApp/automation integrators with a spec, not a blank slate. It is not a vendor pitch and not a commitment to build everything listed.

---

## Andrew — facilitated session script

1. "This isn't a pitch — it's a guide to help you drive this before hiring integrators."
2. Process Map together (25 min) — assist vs automate; edit what's wrong.
3. Tools — baselines + stack (10 min).
4. Optional Discover aloud (15 min).
5. Review Plan or export pack — **one pilot**, not three.
6. Schedule **30-day checkpoint** before ending.

---

## Environment & deploy

Full steps: [`DEPLOY.md`](./DEPLOY.md)

**When to turn on Render:** After this code is pushed to GitHub, **before** Pete's first session — same day is fine. Order: Render Blueprint → copy `JWT_SECRET` to Vercel → push `vercel.json` if needed → redeploy Vercel → smoke test.

**Keep-warm:** GitHub Action `.github/workflows/b9-api-keep-warm.yml` pings `/health` every 14 min (set repo variable `B9_API_URL` if URL differs).

---

## Local development

```bash
# Terminal 1
python3 scripts/serve-site.py

# Terminal 2
cd backend && USE_JSON_STORE=1 JWT_SECRET=change-me-local-dev-secret npm start
```

Use matching `B9_JWT_SECRET` in `site/.env.local`. Login password: `b9local`.

---

## Technical notes

- Discover learning extraction uses LLM when `ANTHROPIC_API_KEY` is set; heuristics otherwise.
- Plan synthesis is rule-based — validate before client-facing use.
- PWA: install from `/b9/` → Add to Home Screen; knowledge caches offline after first visit.
