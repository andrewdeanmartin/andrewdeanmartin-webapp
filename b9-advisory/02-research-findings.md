# # 02 — Research Findings

# 02 — Research Findings

**Source:** Multi-phase research-engine pass on 2026-05-22
**Brief ID:** `rb-488a69b52a6a` (archived)
**Full brief:** `~/research-library/projects/b9-event-staffing-ai-use-case-landscape/deliverables/BRIEF-b9-event-staffing-ai-use-case-landscape.md`
**Corpus:** 15 documents (9 internal B9 artifacts + 6 web research syntheses)
**Models used:** azure.o3 (analyst, synthesizer, blue team), openai.gpt-5.4 (fallback), bedrock.anthropic.claude-opus-4-6 (red team), vertex_ai.gemini-2.5-flash-lite (multimodal), azure.gpt-4.1-mini (extraction, fact-check)
**Total spend:** $0.59 of $50 budget
**Adversarial validation:** Red/Blue Team pass + skeptic critique + fact-check + gap-find

---

## How to read this document

Every claim below carries a **confidence level**, downgraded after the Blue Team review per the standard research-engine 4-tier scheme:

- **HIGH** — Multiple Tier 1-2 sources agree, no unresolved contradictions
- **MEDIUM** — Single authoritative source, or partial agreement
- **LOW-MEDIUM** — Plausible but partial / mostly absence-of-evidence
- **LOW** — Inference or speculative timing claim

Don't treat MEDIUM or below as established fact.

---

## Section 1 — Process Map [LOW-MEDIUM]

### Finding
Your current 6-step workflow (Sales → Quote/Proposal → Staffing/Matching → Event Day Ops → Post-Event Reporting → Finance/Admin) is **too compressed to function as a complete operating model** for a premium event-staffing agency. It works as a simplified execution workflow, but it misses three structural elements:

1. **Upstream Marketing / Demand Generation** — How leads arrive at "Request a Quote" in the first place is unmodeled
2. **Parallel Talent Acquisition / Sourcing / Vetting / Onboarding** — Currently collapsed into "Staffing/Matching" but is its own pipeline with distinct sub-processes
3. **Distinct Pre-Event Prep / Logistics phase** — "The week before makes or breaks the activation" per industry references; currently invisible

Plus three cross-cutting layers that aren't represented:
- **Talent Experience / Retention** — supply-side of the two-sided marketplace
- **Client Success / Account Expansion** — beyond just dormant client win-back
- **Compliance / Risk** — beyond just contract review

### Best-supported model
**8 phases + 3 cross-cutting layers** — see [`03-CORRECTED-PROCESS-MAP.md`](./03-CORRECTED-PROCESS-MAP.md) for the full diagram.

### Confidence caveat (Blue Team)
The word "canonical" overclaims. There is **no Tier 1 industry taxonomy** (no IAEE / ESCA / ANA framework) that validates the exact decomposition. Boutiques may operationalize some of these as embedded activities rather than separate phases. The best support for the broader frame is **B9's own dual public CTAs** ("Request a Quote" / "Become a Model") which directly evidence a two-sided operating reality that a linear 6-step view can't capture.

### Disconfirmation that would change this
If you found a Tier 1 trade-association process model for premium event staffing converging on a 6-step decomposition matching yours, the recommendation would flip to "keep the current map." That source was searched for and not found.

---

## Section 2 — Use Case Portfolio Completeness [MEDIUM]

### Finding
Your 14 use cases cover the **back-office efficiency layer well**, but under-cover:

| Coverage area | Current state | Gap severity |
|---|---|---|
| Inbound email / lead drafting (ROI-01) | Solid | None |
| Quote/Proposal generation (ROI-02) | Solid | Missing: capability deck personalization, RFP automation |
| Job posting (ROI-07) | Solid | Compliance redesign needed |
| Talent matching (ROI-08) | Solid framework | Compliance redesign needed |
| Post-event recap (ROI-03) | Solid | Missing: multimodal (photo/video) extension |
| Reviews (ROI-09) | Solid | None |
| Cash flow (ROI-11) | Solid | None |
| Invoice audit (ROI-12) | Solid | None |
| Contract review (ROI-13) | Solid | Missing: pre-negotiation analyzer |
| Schedule conflict (ROI-10) | Batch only | Missing: real-time no-show replacement |
| Dormant client win-back (ROI-05) | Solid | Missing: account expansion signals, QBR prep, account health |
| Social content (ROI-04) | Solid | None |
| Training quiz (ROI-06) | Solid | Compliance design rules needed |
| Receipt OCR (ROI-14) | Solid | None |
| **Marketing / Demand Gen** | None | **Missing entire category** |
| **Pre-Event Prep / Logistics** | None | **Missing entire category** |
| **Talent Experience / Retention** | None | **Missing entire category** |
| **RFP / Procurement / Diversity Reporting** | None | **Missing entire category** |
| **Voice / Conversation Intelligence** | None | **Missing entire category** |
| **Real-Time Event Day Ops** | None (only batch ROI-10) | **Missing entire category** |

### Sizing the expansion
**30 candidate additions** were surfaced across these gap areas:
- Talent Experience / Supply-Side: 9 candidates (NEW-01 to NEW-09)
- RFP / Procurement: 6 candidates (NEW-10 to NEW-15)
- Account Expansion / Client Success: 4 candidates (NEW-16 to NEW-19)
- Real-Time Event Day: 4 candidates (NEW-20 to NEW-23)
- Multimodal Recap: 3 candidates (NEW-24 to NEW-26)
- Voice / Conversation: 4 candidates (NEW-27 to NEW-30)

### Blue Team caveat
**Do not interpret "30 additions" as "30 actively-deployed industry use cases."** The evidence base is mixed:
- **Stronger:** RFP automation, AI talent engagement at gig scale (Fountain), real-time dispatch in adjacent labor markets
- **Weaker:** Premium boutique event-staffing-specific deployment

The right framing: your 14 are a **credible Phase 1 portfolio**; the 30 additions are a **validated set of expansion candidates for B9 evaluation**, not proof of widespread production use in the segment.

### Curated subset = 8
After pressure-testing all 30 against B9's actual scale (~20-50 internal, 1099 marketplace, premium positioning, two-sided), **8 additions** rise to "Phase 2 immediate candidate" status. See [`06-EXPANSION-USE-CASES.md`](./06-EXPANSION-USE-CASES.md) for full specs.

---

## Section 3 — Vendor Landscape [LOW-MEDIUM]

### Finding
The market is **fragmented by function**. No clearly-proven end-to-end AI-native platform for boutique premium event staffing surfaced in the corpus scan. The supportable conclusion: **augment existing tools with targeted AI overlays**, anchored on StaffConnect (or whatever B9's actual system-of-record is) as the operational backbone.

### Blue Team caveat
"No platform exists" was too strong. Tightened to: **"The corpus did not identify a clearly proven end-to-end AI-native platform for boutique premium event staffing."** Absence-of-evidence applies.

### Mature buy-side categories (clearest ROI)
| Category | Leading vendors | Evidence |
|---|---|---|
| **RFP automation** | Loopio, Responsive (formerly RFPIO), AutoRFP.ai | Loopio: 70% efficiency, 415% ROI, 8-month payback; Responsive: 35-50% time savings per project |
| **Cash flow forecasting (project-based)** | Dryrun, Float, FlowSense ($179/mo "AI CFO") | Direct fit for event-based revenue; "82% of small businesses fail due to cash flow problems" |
| **Conversation intelligence** | Avoma ($60-128/user/mo for SMB), Gong (enterprise) | Payback in 1-2 quarters via improved quota attainment |
| **Talent engagement (omnichannel)** | Whippy, StarsHunt Emma (via Avionté), Fountain Cue | Fountain: 98% screening overhead reduction, 50% faster time-to-hire, **16% LONGER retention with AI** vs human |
| **Real-time dispatch** | Senegal Software (event-staffing-specific), Skedulo, Chromie Dispatch (healthcare) | Chromie: <5 min vs ~5 hours manual nurse shift fill |
| **Supplier diversity tracking (buyer-side)** | TealBook (500K+ diverse supplier profiles), ProcureInsights.ai, Lyzr | Validates that buyers expect WBENC-cert suppliers to be easy to find + report on |

### Build vs buy guidance
For a 20-50 person boutique:
- **Buy** for mature categories (RFP, cash flow, conversation intelligence, dispatch)
- **Augment + light custom** for B9-specific workflows (talent matching with WBENC angle, multimodal recap with B9 brand voice, capability deck personalization)
- **Avoid** any all-in-one platform that doesn't have B9-comparable customer logos

---

## Section 4 — Industry Benchmarks [HIGH]

### Bullhorn GRID 2026 (Tier 1, ~2,300 respondents, Feb 2026)
The strongest single data point we have:

- **Staffing firms using AI at any stage are 3.5-4.5x more likely to have grown revenue** vs non-AI firms (up from 25-40% advantage last year — gap is widening)
- **Top-performing firms are 4x more likely to use AI** than peers
- **56% of top performers place candidates in under 10 days**
- **78% of firms that grew revenue 25%+** use AI tools embedded in their ATS, vs only 51% of firms whose revenue declined 10%+
- **AI-embedded-in-workflow firms have >2x chance of fill rates above 75%**
- **55% of firms report AI screening alone improved KPIs by >25%**
- **46% say AI cut screening time in half or better**
- Adoption maturity shift: 52% basic genAI (2025) → 29% (2026); **30% on agentic AI (2026)**
- Only **10-12% have agentic AI embedded throughout workflow** — large headroom remains

### Premium boutique benchmarks (most B9-comparable)
Three small-services-firm case studies surfaced (12-person, 8-person, 15-person) — all reported ~3x output with stable team, +5-10pts gross margin, +0.3-0.5 CSAT improvement, retainer pricing power +10-20% on renewal.

### Realistic 12-18 month range for B9
| Dimension | Range |
|---|---|
| Throughput / projects per period | **+50% to +200%** (3x is high end) |
| Gross margin expansion | **+5 to +10 pts** |
| Client CSAT improvement | **+0.3 to +0.5** (5-pt scale) |
| Employee/talent attrition | **-10 to -20 pts** if AI replaces tedious work |
| Per-engagement pricing power | **+10 to +20%** on renewal |
| Production time share | **-30 to -40 pts** (frees time for strategy) |

### Blue Team caveat
**These are creative/digital agency benchmarks, not event-staffing.** Directionality should hold but absolute numbers won't transfer 1:1. B9 has higher in-person delivery share that limits some upside. **Treat as directional, use pilot baselines for actual decisions.**

---

## Section 5 — Compliance Constraints [HIGH]

This is the strongest, most actionable section of the research. The constraints are real, current, and have specific implications for 4 of your use cases plus 2 from b9-experience. See [`05-COMPLIANCE-DESIGN-RULES.md`](./05-COMPLIANCE-DESIGN-RULES.md) for full design implications.

### Summary of in-force / imminent regulations

| Regulation | Effective | What it constrains |
|---|---|---|
| **NYC Local Law 144 (AEDT)** | Jan 2023 (enforcement Jul 2023) | Any AI scoring/ranking/recommending NYC-resident candidates: annual bias audit + public posting + 10-day candidate notice. **$1,500/day per violation.** |
| **Illinois HB 3773 (AI in Employment)** | **Jan 1, 2026** | Notice + non-discrimination + record-keeping for AI in employment decisions; **private right of action**; covers AI that *influences* not just decides (human-in-loop doesn't exempt) |
| **Illinois AIVIA (Video Interview)** | 2020 (in effect) | Notice + consent + demographic reporting if AI sole basis for in-person interview selection |
| **DOL Independent Contractor NPRM** | Proposed Feb 26, 2026; final expected late 2026 | "Economic reality" test with 2 core factors (control + opportunity for profit/loss). **Any AI-based scheduling, auto-dispatch, or talent dispatch could be cited as exercising control → collapse 1099 classification.** Highest-risk legal exposure. |
| **NJ ABC Test Final Rule** | Oct 1, 2026 | All-3-prongs ABC test; AI scheduling intensifies prong A failure risk |
| **California ADMT (CCPA)** | Jan 1, 2027 (Privacy Risk Assessments Jan 1, 2026) | Pre-use notice + opt-out + right to access for "significant decisions" affecting employment / contracting / compensation |
| **TCPA (federal)** | In effect | $500-$1,500 per unsolicited SMS; written consent + STOP handling required for marketing comms |
| **EU AI Act** | Phased 2026-2027 | Hits if any EU talent or EU client; AI for recruitment/performance/task allocation is "high-risk" |

### B9-specific implications
Compliance does **NOT** eliminate any of your 14 use cases. It does require design changes on **4** of them:

1. **ROI-08 (Talent Matching "Moneyball")** — Direct AEDT hit. Reframe as decision-support, not ranking. Annual bias audit if applied to NYC talent.
2. **ROI-07 (Job Description Writer)** — IL HB 3773 disclosure if includes screening logic. Strip screening; keep pure drafting + classification language compliance check.
3. **"Flake Detector" / Reliability Scoring** (from b9-experience) — Highest 1099 classification risk. Reframe as supportive coaching, never gate booking access, OR kill.
4. **"Knowledge Check SMS"** (from b9-experience) — TCPA consent + DOL classification ("mandatory training" looks like employment). Make voluntary brand education, opt-in, STOP handling.

---

## Section 6 — Strategic / Future-State Forecast [LOW]

The corpus supports broad market movement toward voice intelligence, real-time event ops, multimodal recap, agentic RFP. **Segment-specific timing for boutique premium event staffing is too speculative to call.** Treat as Phase 2 watchlist, contingent on B9's actual communication volume, manager workflow pain, and customer demand.

---

## Section 7 — Key Evidence Gaps

The research surfaced 8 gaps that limit confidence. The single most decision-critical:

> **B9's revenue share from RFP / procurement-led sales is unknown.** Certifications are confirmed; sales-mix impact is unmeasured.

This is the gating question that determines whether RFP automation leads Phase 2. See [`07-BRENDA-DISCOVERY-AGENDA.md`](./07-BRENDA-DISCOVERY-AGENDA.md).

Other significant gaps:
- Talent preference for AI-mediated vs human interaction — **untested**
- B9 baseline ROI metrics for AI pilots — **none exist**
- B9's actual current system stack (StaffConnect role, integration readiness) — **inferred, not confirmed**
- Segment-specific proof that talent-experience AI is white space — **not proven** (just plausible)

These should be flagged as "evidence we don't have" in any communication with Brenda. Don't dress them up.

---

## What this research does NOT settle

Per the Blue Team verdict, the research **does not**:
- Definitively prove that the 6-step map is wrong (only that it's too compressed for a full capability map)
- Prove that 30 use cases are actively deployed in this segment
- Prove that no AI-native platform exists (only that none surfaced)
- Prove that talent-experience AI is uncontested white space
- Generate hard ROI numbers for B9 (only directional benchmarks)
- Replace legal review for the 4 compliance-affected use cases

What it DOES settle:
- Your 14 is incomplete as the full surface area
- Compliance is the most actionable design constraint
- The two-sided operating reality (clients + talent) is structurally important
- A curated expansion of ~8 use cases is defensible
- RFP/procurement is mature enough to be a serious Phase 2 candidate (conditional on revenue mix)

---

## Where to go next

- [`03-CORRECTED-PROCESS-MAP.md`](./03-CORRECTED-PROCESS-MAP.md) for the validated operating model
- [`04-USE-CASE-PORTFOLIO-V2.md`](./04-USE-CASE-PORTFOLIO-V2.md) for the full 22-use-case portfolio with priorities
- [`07-BRENDA-DISCOVERY-AGENDA.md`](./07-BRENDA-DISCOVERY-AGENDA.md) for the question set that resolves the gaps

