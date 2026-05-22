# # 01 — Executive Summary

# 01 — Executive Summary

**One-page version. Read this first.**

---

## The question we set out to answer

> "Do my existing 14 AI use cases for B9 cover most of what a premium event-staffing agency should be doing with AI?"

## The honest answer

**No — they cover ~50-60% of the surface area.** They're a strong **back-office efficiency** portfolio (Sales, Quote, Post-Event, Finance) but under-cover **Talent Experience, RFP/Procurement, Real-Time Event Ops, Client Success/Expansion, and Pre-Event Logistics.** Multi-model research with adversarial validation supports expanding by **8 carefully-chosen additions** and keeping the rest on a watchlist. Expanding to "all 30+ candidates" would be overinvestment relative to B9's scale.

## What changes from your initial direction

| Original framing | Revised position |
|---|---|
| "Target Operating Model" engagement | **Right-sized AI Activation Roadmap** — friend-to-friend advisory, not consulting |
| 14 use cases is the portfolio | **14 + 8 curated additions = 22 use cases**, with explicit Phase 1 / Phase 2 / Watchlist gating |
| 6-step workflow map (Sales → Quote → Staffing → Event Day → Post-Event → Finance) | **8-function operating model + 3 cross-cutting layers** (adds upstream Marketing, parallel Talent Acquisition, distinct Pre-Event Prep; cross-cutting Talent Experience, Client Success, Compliance) |
| Implementation-first | **Discovery-first** — one critical question to Brenda determines whether RFP automation or Talent Experience leads Phase 2 |
| Implicit compliance handling | **Explicit compliance design rules** on 4 affected use cases (NYC LL 144 + IL HB 3773 + DOL NPRM + TCPA) |

## The 8 highest-confidence additions

In Phase 1 priority order — each tightly scoped to a known industry pattern with benchmark evidence:

| # | New Use Case | Category | Why it makes the cut |
|---|---|---|---|
| 1 | **RFP / RFI Auto-Drafter** | Revenue | B9's WBENC+NMSDC certs are a structural moat for Fortune 500 procurement; Loopio benchmarks show 70% efficiency, 415% ROI, 8-month payback. **Gated by Brenda's RFP revenue %.** |
| 2 | **Capability Deck Personalizer** | Revenue | Low-risk extension of #1; multiplies founder leverage in enterprise pitches. |
| 3 | **Tier 1 Spend Reporting Generator** | Revenue | Almost no one does this for clients. Massive renewal-conversation value. Leverages WBENC cert. |
| 4 | **Real-Time No-Show Auto-Replacement** | Quality | Senegal Software pattern; Chromie Dispatch reports <5 min vs ~5 hours manual. Fixes biggest event-day failure mode. |
| 5 | **Client Expansion Signal Detector** | Revenue | Gainsight/ChurnZero pattern; surfaces growth opportunities buried in email threads. Low risk if framed as alerts. |
| 6 | **Pre-QBR Account Brief Generator** | Efficiency | Replaces 2-3h of Brenda's prep per quarterly review. Immediate, no-risk value. |
| 7 | **Multimodal Event Recap Generator** | Quality | Extension of your ROI-03 — adds photo/video to the recap. Snapsight Remix pattern. |
| 8 | **Talent FAQ Chatbot (Supportive)** | Quality | Fountain pattern (98% screening overhead reduction). Supports talent, not surveils them. Compliance-safe if framed correctly. |

## The 4 compliance redesigns

These existing concepts hit regulatory constraints and need design changes BEFORE shipping. None get killed — all get redesigned with guardrails:

| Use Case | Constraint | Fix |
|---|---|---|
| **ROI-08: Talent Matching "Moneyball"** | NYC LL 144 AEDT (annual bias audit, 10-day candidate notice), IL HB 3773 (Jan 2026), CA ADMT (Jan 2027) | Reframe as "decision-support / suggested order" not "ranking"; humans always select final talent; geographic exclusion of NYC talent until bias audit complete |
| **ROI-07: Job Description Writer** | NYC LL 144 if includes screening logic; IL HB 3773 disclosure requirements | No screening logic in this tool; pure drafting + compliance check on classification language (W-2 vs 1099) |
| **"Flake Detector" / Reliability Scoring** (from b9-experience) | DOL NPRM 1099 classification risk (HIGHEST risk in portfolio); NYC LL 144 if used in casting decisions | Reframe as **supportive coaching signals**, never gate access to bookings, never use as sole criteria, never auto-discipline. Or kill. |
| **"Knowledge Check SMS Bot"** (from b9-experience) | TCPA consent requirements; DOL classification risk (looks like mandatory employment training) | Frame as **voluntary brand education** with opt-in consent at talent onboarding; STOP handling in every message; pay for completion if treated as required (suggests employee status) |

## The single most important question for Brenda

> **What percentage of B9's last-12-month pipeline and booked revenue came through formal RFP, procurement portals, or supplier-registration channels?**

If **>20%** → RFP automation cluster (additions 1-3) leads Phase 2 priority.
If **<10%** → RFP becomes lightweight enablement; Talent Experience or Real-Time Ops leads.
If **somewhere between** → split priority.

This one number reshapes the portfolio. Don't sequence the expanded use case roadmap without it.

## Recommended sequence

| Phase | Timing | What |
|---|---|---|
| **Phase 0** | Next 2 weeks | Send Brenda the 8 gating questions ([`07-BRENDA-DISCOVERY-AGENDA.md`](./07-BRENDA-DISCOVERY-AGENDA.md)); 60-90 min conversation; she answers gating Q on RFP % |
| **Phase 1 (Ship-now)** | Month 1-3 | The 14 existing use cases — proceed as planned with the 90-day plan you already have. Apply the 4 compliance fixes BEFORE shipping ROI-07, ROI-08 |
| **Phase 2 (Curated expansion)** | Month 3-6 | The 8 additions, prioritized by Brenda's gating-Q answer |
| **Phase 3 (Watchlist review)** | Month 6+ | Re-evaluate the ~22 watchlist candidates against Phase 1+2 learnings |

## What this package gives you

10 markdown files covering: executive summary, research findings, corrected process map, full 22-use-case portfolio, compliance design rules, the 8 new use case specs, Brenda's discovery agenda, recommended phasing, vendor matrix, next steps.

Plus drop-in TypeScript patches for your `b9-ai-portal` repo.

## Two things to do today

1. **Read this whole package** (~80 min) or skim 01 + 04 + 07 + 10 (~30 min)
2. **Schedule the 60-90 min call with Brenda** using [`07-BRENDA-DISCOVERY-AGENDA.md`](./07-BRENDA-DISCOVERY-AGENDA.md). Don't skip the gating questions.

That's it. Everything else flows from those two decisions.

