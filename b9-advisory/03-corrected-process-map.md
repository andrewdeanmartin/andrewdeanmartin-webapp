# # 03 — Corrected Process Map

# 03 — Corrected Process Map

**Status:** Validated against industry research with LOW-MEDIUM confidence on exact decomposition
**Replaces:** The current 6-step `workflow.ts` in b9-ai-portal
**Implementation:** See [`patches/workflow-v2.ts`](./patches/workflow-v2.ts) for the drop-in replacement

---

## Headline: stop calling this "canonical"

Per the Blue Team review, **there is no Tier 1 industry taxonomy** for premium event-staffing operations. What follows is a **broader operating model** synthesized from industry sources and B9's own public footprint — useful for completeness analysis, not authoritative as "the" industry standard.

The single strongest piece of evidence that the 6-step view is too compressed: **B9's own public site has two front-door CTAs** ("Request a Quote" for clients, "Become a Model" for talent). That's a two-sided business, not a linear service workflow.

---

## The 8 + 3 Operating Model

```
                    ┌──────────────────────────────────────────────────────────────┐
                    │  CROSS-CUTTING LAYER A: Talent Experience / Retention         │
                    │  (serves the supply side throughout every phase)              │
                    └──────────────────────────────────────────────────────────────┘
                    ┌──────────────────────────────────────────────────────────────┐
                    │  CROSS-CUTTING LAYER B: Client Success / Account Expansion    │
                    │  (post-sale, post-event, renewal, growth)                     │
                    └──────────────────────────────────────────────────────────────┘
                    ┌──────────────────────────────────────────────────────────────┐
                    │  CROSS-CUTTING LAYER C: Compliance / Risk                     │
                    │  (TCPA, AEDT, 1099 classification, contracts, COIs)           │
                    └──────────────────────────────────────────────────────────────┘

CLIENT-FACING PIPELINE:                          TALENT-FACING PIPELINE:

[0] Marketing / Demand Gen                       [3a] Talent Sourcing / Recruitment
       │                                              │
       ▼                                              ▼
[1] Discovery / Scoping                          [3b] Vetting / Onboarding
       │                                              │
       ▼                                              ▼
[2] Proposal / Quote / Pricing                   [3c] Talent Profile / Roster mgmt
       │                                              │
       └──────────────┬───────────────────────────────┘
                      ▼
              [3] Casting / Matching / Booking
                      │
                      ▼
              [4] Pre-Event Prep / Logistics
                      │
                      ▼
              [5] Event Day / Execution
                      │
                      ▼
              [6] Post-Event / Recap
                      │
                      ▼
              [7] Finance / Invoicing / Payroll
```

### Compare to your current 6-step map

| Your current 6-step | New 8-phase + 3 cross-cutting | What's different |
|---|---|---|
| (none) | **[0] Marketing / Demand Gen** | NEW — upstream demand generation, content, partner channels, RFP visibility |
| Sales | [1] Discovery / Scoping | Renamed; covers initial inquiry handling, qualification, briefing intake |
| Quote / Proposal | [2] Proposal / Quote / Pricing | Same; expanded to include RFP responses, capability decks |
| Staffing / Matching | [3] Casting / Matching / Booking | Split — the *casting* is here; *sourcing/vetting/onboarding* moves to parallel talent pipeline |
| (collapsed into Staffing) | **[3a/3b/3c] Talent Sourcing / Vetting / Roster mgmt** | NEW parallel pipeline — these are upstream of Casting, not part of it |
| (collapsed into Event Day) | **[4] Pre-Event Prep / Logistics** | NEW distinct phase — call sheets, briefing books, travel, COIs, equipment, "the week before" |
| Event Day Ops | [5] Event Day / Execution | Same; should include real-time issue management, check-in, replacement |
| Post-Event Reporting | [6] Post-Event / Recap | Same; should be multimodal (photos, video, talent feedback) |
| Finance / Admin | [7] Finance / Invoicing / Payroll | Same |
| (implicit) | **Cross-cutting A: Talent Experience / Retention** | NEW — supply-side service layer |
| (implicit, partial via ROI-05) | **Cross-cutting B: Client Success / Account Expansion** | NEW — beyond just dormant client win-back |
| (implicit, partial via ROI-13) | **Cross-cutting C: Compliance / Risk** | NEW — beyond just contract review |

### Net change
- **2 entirely missing phases added** (Marketing, Pre-Event Prep)
- **1 phase split** into client-facing Casting + parallel Talent pipeline
- **3 cross-cutting layers added** (Talent Experience, Client Success, Compliance)
- **Total: 8 sequenced phases + 3 cross-cutting = 11 functions** vs. your current 6

---

## What this changes for the use case portfolio

Each phase / cross-cutting layer should have at least one AI use case. The Phase 1 / Phase 2 mapping looks like this:

| Phase / Layer | Existing use cases | Proposed additions | Coverage |
|---|---|---|---|
| **[0] Marketing / Demand Gen** | ROI-04 (Social) | (none in Phase 2 — Phase 3 watchlist) | LIGHT |
| **[1] Discovery / Scoping** | ROI-01 (Email Triage) | — | OK |
| **[2] Proposal / Quote / Pricing** | ROI-02 (Quote Gen), ROI-13 (Contract Scan) | **NEW-10 (RFP Auto-Drafter)**, **NEW-11 (Capability Deck Personalizer)**, **NEW-13 (Tier 1 Spend Reporting)** | STRONG after additions |
| **[3a/3b/3c] Talent Sourcing / Vetting / Roster** | ROI-07 (Job Desc) [compliance redesign] | (Phase 3 watchlist) | LIGHT |
| **[3] Casting / Matching / Booking** | ROI-08 (Matching) [compliance redesign] | — | OK after redesign |
| **[4] Pre-Event Prep / Logistics** | ROI-06 (Brand Quiz) | (Phase 3 watchlist — briefing book generator, COI tracker) | LIGHT |
| **[5] Event Day / Execution** | ROI-10 (Conflict Detection, batch) | **NEW-20 (Real-Time No-Show Replacement)** | OK after addition |
| **[6] Post-Event / Recap** | ROI-03 (Recap), ROI-09 (Reviews) | **NEW-24 (Multimodal Recap)** | STRONG after addition |
| **[7] Finance / Invoicing / Payroll** | ROI-11 (Cash Flow), ROI-12 (Invoice Audit), ROI-14 (Receipts) | — | STRONG |
| **Cross-cut A: Talent Experience** | (none currently) | **NEW-02 (Talent FAQ Chatbot)** | NEW |
| **Cross-cut B: Client Success / Expansion** | ROI-05 (Dormant Win-Back) | **NEW-16 (Expansion Signal Detector)**, **NEW-17 (Pre-QBR Brief)** | STRONG after additions |
| **Cross-cut C: Compliance / Risk** | ROI-13 (Contract Scan) | (built into design rules) | OK |

### Coverage after additions
| Layer | Before (14) | After (22) | Notes |
|---|---|---|---|
| Marketing / Demand Gen | 1 | 1 | Still LIGHT — Phase 3 candidates exist (case study auto-drafter, blog content) |
| Discovery / Scoping | 1 | 1 | OK |
| Proposal / Quote / Pricing | 2 | 5 | STRONG — RFP cluster makes this category lead |
| Talent Sourcing / Vetting | 1 | 1 | Still LIGHT — Phase 3 candidates exist (resume parsing, video screen) |
| Casting / Matching | 1 | 1 | OK after compliance redesign |
| Pre-Event Prep / Logistics | 1 | 1 | Still LIGHT — Phase 3 candidates exist (call sheet gen, COI tracker) |
| Event Day / Execution | 1 (batch) | 2 (batch + real-time) | OK |
| Post-Event / Recap | 2 | 3 | STRONG with multimodal |
| Finance | 3 | 3 | STRONG |
| Talent Experience | 0 | 1 | NEW — supportive entry only |
| Client Success / Expansion | 1 | 3 | STRONG with signals + QBR |
| Compliance / Risk | 1 | 1 (+ design rules across all use cases) | OK |

**Conclusion:** 22 use cases covers ~75-80% of the surface area defensibly. Phase 3 watchlist fills the remaining ~20-25% as B9 matures.

---

## Honest caveats

1. **Boutiques may collapse some of these.** B9 might effectively run [3a], [3b], and [3c] as "Brenda + a recruiter does it all." That's fine — the *model* exists to identify where AI can plug in, not to dictate org structure.
2. **The cross-cutting layers are the squishiest part.** Where does "Talent Experience" stop and "Casting" start? Practical answer: don't fight the boundary, treat them as analytical lenses not org boxes.
3. **Phase 0 (Marketing) is intentionally light in this portfolio.** Demand gen is its own discipline. The one existing use case (ROI-04 Social) covers the minimum. Don't expand here in Phase 1.
4. **The diagram is for analysis, not for Brenda's wall.** She doesn't need to see "8 + 3" — she needs to see the use cases that improve specific moments in her business. Use this model to organize *your* thinking; show her [`04-USE-CASE-PORTFOLIO-V2.md`](./04-USE-CASE-PORTFOLIO-V2.md).

---

## Implementation in b9-ai-portal

Drop-in replacement TypeScript file in [`patches/workflow-v2.ts`](./patches/workflow-v2.ts). To deploy:

```bash
# Backup current workflow
cp ~/CursorProjects/b9-ai-portal/src/content/workflow.ts \
   ~/CursorProjects/b9-ai-portal/src/content/workflow.v1.backup.ts

# Replace with v2
cp ~/CursorProjects/b9-advisory-package/patches/workflow-v2.ts \
   ~/CursorProjects/b9-ai-portal/src/content/workflow.ts

# Type-check
cd ~/CursorProjects/b9-ai-portal && npx tsc --noEmit
```

Note: The v2 file extends the existing `WorkflowStep` interface with optional `phase` and `crossCutting` fields. The current `WorkflowMap.tsx` component will render the additional steps without changes; the layout may need a visual update to show the 3 cross-cutting bars but that's a separate UI concern.

