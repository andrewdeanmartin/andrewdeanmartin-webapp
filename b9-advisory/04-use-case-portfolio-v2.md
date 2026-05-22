# # 04 — Use Case Portfolio V2

# 04 — Use Case Portfolio V2

**Total:** 22 use cases (14 existing + 8 curated additions)
**Replaces:** Implicit "all 14 are Phase 1" framing
**Status:** Phase 1 ships now (with 4 compliance redesigns); Phase 2 contingent on Brenda's discovery answers; Phase 3 watchlist

---

## How this is organized

Each use case carries:
- **ID** — your existing ROI-## for current, NEW-## for additions
- **Phase** — Phase 1 (ship now) / Phase 2 (after discovery gates) / Phase 3 (watchlist)
- **Category** — Revenue / Efficiency / Quality / Finance / Risk (matches your existing schema)
- **Compliance flag** — None / Design rules required / High-risk
- **Confidence** — HIGH / MEDIUM / LOW-MEDIUM / LOW (from research brief)
- **Gating dependency** — what would change this use case's priority

---

## PHASE 1 — Ship Now (10 of the existing 14, plus 4 with redesigns)

These are deployable immediately per your existing 90-day plan. **Four require compliance design changes BEFORE shipping** — see [`05-COMPLIANCE-DESIGN-RULES.md`](./05-COMPLIANCE-DESIGN-RULES.md).

### Revenue
| ID | Name | Compliance | Confidence | Notes |
|---|---|---|---|---|
| ROI-01 | Email Triage & Drafting Assistant | None | HIGH | No changes — ship as designed |
| ROI-02 | Quote & Proposal Generator | None | HIGH | No changes — ship as designed |
| ROI-04 | Social Media Content Engine | None | MEDIUM | No changes — ship as designed |
| ROI-05 | Dormant Client Win-Back Campaign | None | HIGH | No changes — ship as designed |

### Efficiency
| ID | Name | Compliance | Confidence | Notes |
|---|---|---|---|---|
| ROI-07 | Job Description Writer | **Design rules required** | HIGH | Strip any screening logic; pure drafting + W-2/1099 classification check |
| ROI-08 | Talent Matching Assistant ("Moneyball") | **HIGH-RISK redesign required** | HIGH | Reframe as decision-support not ranking; humans select; NYC bias audit gate |
| ROI-10 | Conflict Detection (Double-Booking) | None | HIGH | No changes — ship as designed |

### Quality
| ID | Name | Compliance | Confidence | Notes |
|---|---|---|---|---|
| ROI-03 | Automated Post-Event Reporting | None | HIGH | No changes — ship as designed |
| ROI-06 | Training Quiz Creator | **Design rules required** | HIGH | Frame as voluntary brand education (not mandatory training); avoid DOL classification trap |
| ROI-09 | Review / Reputation Responder | None | HIGH | No changes — ship as designed |

### Finance
| ID | Name | Compliance | Confidence | Notes |
|---|---|---|---|---|
| ROI-11 | Cash Crunch Forecaster | None | HIGH | No changes — ship as designed |
| ROI-12 | Invoice vs Timesheet Auditor | None | HIGH | No changes — ship as designed |
| ROI-14 | Receipt & Expense "Digital Shoebox" | None | HIGH | No changes — ship as designed |

### Risk
| ID | Name | Compliance | Confidence | Notes |
|---|---|---|---|---|
| ROI-13 | Contract "Red Flag" Scanner | None | HIGH | No changes — ship as designed |

### Phase 1 summary
- **14 use cases** ship as Phase 1
- **4 require compliance design changes** before shipping (ROI-07, ROI-08, ROI-06, plus the b9-experience "Flake Detector" and "Knowledge Check SMS" concepts if you carry them forward)
- **10 ship as-is**

---

## PHASE 2 — Curated Expansion (8 additions, conditional on discovery)

These are the highest-confidence additions from 30 candidates. Add to portal after Brenda's discovery conversation confirms priority order.

### Group A: Procurement / RFP cluster (3 additions)
**Gating dependency:** Brenda's answer to "% of pipeline from RFP/procurement-led sales"
**If >20% RFP:** ship this group first
**If <10% RFP:** defer to Phase 3, prioritize Groups B or C instead
**If 10-20%:** ship Tier 1 Spend Reporting (NEW-13) regardless; defer NEW-10 and NEW-11

| ID | Name | Category | Confidence | Why |
|---|---|---|---|---|
| **NEW-10** | RFP / RFI Auto-Drafter | Revenue | HIGH | Mature category (Loopio: 70% efficiency, 415% ROI, 8-month payback). Directly leverages B9's WBENC+NMSDC moat. |
| **NEW-11** | Capability Deck Personalizer | Revenue | MEDIUM | Multiplies founder leverage in enterprise pitches. Lower risk extension of NEW-10. |
| **NEW-13** | Tier 1 Spend Reporting Generator | Revenue | HIGH | Almost no boutique does this for clients. Massive renewal value. Ships regardless of RFP %. |

### Group B: Real-Time + Multimodal Ops (2 additions)
**Gating dependency:** Brenda's event volume + delivery quality pain
**Default:** ship if no-show rate or recap turnaround is a named pain point

| ID | Name | Category | Confidence | Why |
|---|---|---|---|---|
| **NEW-20** | Real-Time No-Show Auto-Replacement | Quality | HIGH | Senegal Software pattern (event-staffing-specific); Chromie healthcare: <5 min vs ~5 hrs. Fixes biggest event-day failure mode. |
| **NEW-24** | Multimodal Event Recap Generator | Quality | HIGH | Extension of ROI-03 — adds photo/video. Snapsight Remix pattern. Same risks as ROI-03 (none). |

### Group C: Client Success / Account Expansion (2 additions)
**Gating dependency:** Brenda's existing account expansion motion + email/meeting volume
**Default:** ship NEW-17 always; ship NEW-16 if she has 15+ retained clients

| ID | Name | Category | Confidence | Why |
|---|---|---|---|---|
| **NEW-16** | Client Expansion Signal Detector | Revenue | MEDIUM | Gainsight Expansion Analyst pattern. Detects buried opportunity signals. Low risk if framed as alerts not decisions. |
| **NEW-17** | Pre-QBR Account Brief Generator | Efficiency | HIGH | Replaces 2-3h prep per quarterly review. Immediate, no-risk value. |

### Group D: Talent Experience (1 addition)
**Gating dependency:** Brenda's talent volume + her tolerance for AI talent comms
**Default:** ship only if she affirms talent-side AI is acceptable

| ID | Name | Category | Compliance | Confidence | Why |
|---|---|---|---|---|---|
| **NEW-02** | Talent FAQ Chatbot (Supportive) | Quality | **TCPA consent + careful design** | MEDIUM | Fountain pattern (98% screening overhead reduction). MUST be framed as supportive service to talent, not surveillance. |

### Phase 2 summary
- **8 additions** to consider
- **Sequencing depends on Brenda's discovery answers** (see [`07-BRENDA-DISCOVERY-AGENDA.md`](./07-BRENDA-DISCOVERY-AGENDA.md))
- **Realistic Phase 2 = 4-6 of these 8** (don't try to ship all 8 — pick the strongest signals)

---

## PHASE 3 — Watchlist (the remaining ~22 candidates)

Surfaced in research, NOT recommended for Phase 1 or Phase 2 due to:
- Lower B9 fit at current scale
- Higher build complexity vs current need
- Speculative timing (segment-specific table-stakes claims weak)
- Adjacent-industry evidence only (not boutique premium event staffing specifically)

| Category | Watchlist candidates | Re-evaluate when |
|---|---|---|
| **Talent Experience (other 8)** | NEW-01 (Application Triage), NEW-03 (Multi-Channel Inbox), NEW-04 (Self-Service Portal), NEW-05 (Opportunity Recommender), NEW-06 (Engagement Health Scoring), NEW-07 (Dormant Talent Re-Engagement), NEW-08 (Sentiment Synthesis), NEW-09 (Stay-Conversation Coach) | After Phase 2 NEW-02 chatbot tests well + talent ≥200 active |
| **RFP / Procurement (other 3)** | NEW-12 (WBENCLink Optimizer), NEW-14 (Procurement Portal Watcher), NEW-15 (MSA/SOW Pre-Negotiator) | After NEW-10 RFP throughput proves out |
| **Account Expansion (other 2)** | NEW-18 (Client Health Scoring), NEW-19 (Renewal Deck Personalizer) | After NEW-16 + NEW-17 establish data flow |
| **Real-Time Event Ops (other 3)** | NEW-21 (Day-Of Issue Triage), NEW-22 (Live Event Status Dashboard), NEW-23 (Geofenced Check-In + Photo) | After NEW-20 no-show replacement validates |
| **Multimodal Recap (other 2)** | NEW-25 (Live Activation Content), NEW-26 (Case Study Auto-Drafter) | After NEW-24 multimodal recap validates |
| **Voice / Conversation (all 4)** | NEW-27 (Sales Call → CRM), NEW-28 (Client Debrief Synthesis), NEW-29 (Internal Meeting Summaries), NEW-30 (Talent Interview Analysis) | When B9's communication volume justifies $60-200/user/mo (Avoma, Gong); after 6-12 mo with Phase 1+2 |
| **Pre-Event Prep (no candidates surfaced yet)** | Briefing book generator, COI tracker, travel coordinator, equipment list generator | When Phase 2 frees up bandwidth |
| **Marketing / Demand Gen (no candidates surfaced beyond ROI-04)** | SEO content production, case study automation, podcast/thought leadership, partnership channel intelligence | After basic AI literacy lands |

### Phase 3 summary
- **~22 watchlist candidates**
- **Do not commit to any in Phase 1 or 2**
- **Re-evaluate after 6 months of Phase 2 learnings**

---

## The full 22 portfolio at a glance

| ID | Name | Phase | Category | Compliance | Process Phase |
|---|---|---|---|---|---|
| ROI-01 | Email Triage & Drafting Assistant | 1 | Efficiency | None | [1] Discovery |
| ROI-02 | Quote & Proposal Generator | 1 | Revenue | None | [2] Proposal |
| ROI-03 | Automated Post-Event Reporting | 1 | Quality | None | [6] Post-Event |
| ROI-04 | Social Media Content Engine | 1 | Revenue | None | [0] Marketing |
| ROI-05 | Dormant Client Win-Back Campaign | 1 | Revenue | None | XB Client Success |
| ROI-06 | Training Quiz Creator | 1 | Quality | Design rules | [4] Pre-Event Prep |
| ROI-07 | Job Description Writer | 1 | Efficiency | Design rules | [3a] Talent Sourcing |
| ROI-08 | Talent Matching Assistant ("Moneyball") | 1 | Efficiency | **HIGH-RISK redesign** | [3] Casting |
| ROI-09 | Review / Reputation Responder | 1 | Quality | None | [6] Post-Event |
| ROI-10 | Conflict Detection (Double-Booking) | 1 | Efficiency | None | [5] Event Day |
| ROI-11 | Cash Crunch Forecaster | 1 | Finance | None | [7] Finance |
| ROI-12 | Invoice vs Timesheet Auditor | 1 | Finance | None | [7] Finance |
| ROI-13 | Contract "Red Flag" Scanner | 1 | Risk | None | XC Compliance |
| ROI-14 | Receipt & Expense "Digital Shoebox" | 1 | Finance | None | [7] Finance |
| **NEW-10** | RFP / RFI Auto-Drafter | 2-A | Revenue | None | [2] Proposal |
| **NEW-11** | Capability Deck Personalizer | 2-A | Revenue | None | [2] Proposal |
| **NEW-13** | Tier 1 Spend Reporting Generator | 2-A | Revenue | None | XB Client Success |
| **NEW-20** | Real-Time No-Show Auto-Replacement | 2-B | Quality | **DOL classification — careful design** | [5] Event Day |
| **NEW-24** | Multimodal Event Recap Generator | 2-B | Quality | None | [6] Post-Event |
| **NEW-16** | Client Expansion Signal Detector | 2-C | Revenue | None | XB Client Success |
| **NEW-17** | Pre-QBR Account Brief Generator | 2-C | Efficiency | None | XB Client Success |
| **NEW-02** | Talent FAQ Chatbot (Supportive) | 2-D | Quality | **TCPA + careful design** | XA Talent Experience |

---

## Sequencing recommendation

```
Month 0       Discovery call with Brenda (07-BRENDA-DISCOVERY-AGENDA.md)
              + answers gating questions
              ↓
Month 1-3     PHASE 1 — Ship the 14 (with 4 compliance redesigns)
              Per your existing 90-day plan in plan.ts
              Apply compliance design rules to ROI-07, ROI-08, ROI-06 first
              ↓
Month 3-4     Discovery answers determine Phase 2 sequencing:
              Branch A (high RFP %): ship Group A first, then C, then B
              Branch B (low RFP %):  ship Group C first, then B, then defer A
              Branch D (high talent volume): ship NEW-02 alongside main branch
              ↓
Month 4-6     PHASE 2 — Ship 4-6 of the 8 additions per branch above
              ↓
Month 6+      PHASE 3 — Re-evaluate watchlist (~22 candidates) against learnings
              Promote the ones that match real Phase 1+2 pain
```

---

## Implementation in b9-ai-portal

The 8 new use cases are written as TypeScript matching your existing schema in [`patches/use-cases-additions.ts`](./patches/use-cases-additions.ts). To deploy:

```bash
# Append the new use cases to the existing array
cat ~/CursorProjects/b9-advisory-package/patches/use-cases-additions.ts \
  >> ~/CursorProjects/b9-ai-portal/src/content/use-cases.ts.appendix

# Manually merge the new array entries into the `useCases` const in use-cases.ts
# (The patch file contains the entries to splice in before the closing `];`)

# Type-check
cd ~/CursorProjects/b9-ai-portal && npx tsc --noEmit
```

The compliance-affected use cases (ROI-07, ROI-08, ROI-06) get annotations per [`patches/compliance-annotations.md`](./patches/compliance-annotations.md) — these go in the `controls`, `risks`, and a new `complianceNotes` field.

---

## What to show Brenda

**Don't show her this file directly.** Show her [`01-EXECUTIVE-SUMMARY.md`](./01-EXECUTIVE-SUMMARY.md) or a derivative. This file is for *your* sequencing decisions. Brenda needs to see:

1. "Here are 22 use cases you could pursue"
2. "Here's the 8 I'd start with after the 14 we already discussed"
3. "Here's the one question that decides which of those 8 go first"

That's the conversation. Don't dump the full matrix on her.

