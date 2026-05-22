# # B9 Advisory Package

# B9 Advisory Package

**For:** Andrew Martin (advisor) → Brenda (B9 Models founder/CEO)
**Created:** 2026-05-22
**Engagement type:** Pro-bono advisory ("want to help — that's it")
**Source of truth:** [Research Brief `rb-488a69b52a6a`](~/research-library/projects/b9-event-staffing-ai-use-case-landscape/deliverables/BRIEF-b9-event-staffing-ai-use-case-landscape.md)

---

## What this package is

A complete delivery kit for an advisor + founder conversation about B9's AI portfolio. It consolidates:

- Your existing **b9-ai-portal** work (14 use cases + workflow + plan + prompts + metrics)
- Your existing **b9-experience** prototype (admin "Trust Operating System" demo)
- **Deep research findings** from a 10-phase research-engine pass (May 22, 2026, 15 corpus docs, multi-model analysis with Red/Blue Team adversarial validation, total cost $0.59)

…into a coherent, decision-safe delivery to Brenda.

## What this package is NOT

- A consulting deliverable. No deck. No "boil the ocean" TOM.
- A pitch for paid work.
- A finished portfolio. **Five of the eight new use case priorities are gated on Brenda's answer to one specific question** (see [`07-BRENDA-DISCOVERY-AGENDA.md`](./07-BRENDA-DISCOVERY-AGENDA.md)).

## How to use this

**Read in this order:**

| File | Purpose | Time |
|---|---|---|
| [`01-EXECUTIVE-SUMMARY.md`](./01-EXECUTIVE-SUMMARY.md) | The one-page version. Read first. | 3 min |
| [`02-RESEARCH-FINDINGS.md`](./02-RESEARCH-FINDINGS.md) | What changed about the analysis vs. your initial portfolio | 8 min |
| [`03-CORRECTED-PROCESS-MAP.md`](./03-CORRECTED-PROCESS-MAP.md) | The validated 8-function + 3 cross-cutting operating model | 5 min |
| [`04-USE-CASE-PORTFOLIO-V2.md`](./04-USE-CASE-PORTFOLIO-V2.md) | All 22 use cases in priority order with rationale | 12 min |
| [`05-COMPLIANCE-DESIGN-RULES.md`](./05-COMPLIANCE-DESIGN-RULES.md) | Redesign guidance for the 4 use cases that hit regulatory constraints | 10 min |
| [`06-EXPANSION-USE-CASES.md`](./06-EXPANSION-USE-CASES.md) | Full specs for the 8 new use cases in the same format as your existing 14 | 15 min |
| [`07-BRENDA-DISCOVERY-AGENDA.md`](./07-BRENDA-DISCOVERY-AGENDA.md) | 8 gating questions + 60-90 min conversation guide | 8 min |
| [`08-RECOMMENDED-PHASING.md`](./08-RECOMMENDED-PHASING.md) | Phase 1 / Phase 2 / Watchlist with decision rules | 6 min |
| [`09-VENDOR-EVALUATION-MATRIX.md`](./09-VENDOR-EVALUATION-MATRIX.md) | Which tools to look at for which use cases | 8 min |
| [`10-NEXT-STEPS.md`](./10-NEXT-STEPS.md) | Concrete moves for the next 2 weeks | 4 min |

**Total read time:** ~80 min for the whole package. **30 min if you skim 01, 04, 07, 10.**

## Patches folder

[`patches/`](./patches/) contains drop-in updates to `~/CursorProjects/b9-ai-portal/src/content/`:

- [`patches/use-cases-additions.ts`](./patches/use-cases-additions.ts) — the 8 new use cases in your existing schema, ready to append to `use-cases.ts`
- [`patches/workflow-v2.ts`](./patches/workflow-v2.ts) — the corrected process map replacing the current 6-step `workflow.ts`
- [`patches/compliance-annotations.md`](./patches/compliance-annotations.md) — additions to make to the 4 compliance-affected use cases (ROI-07, ROI-08, plus the Flake Detector and Knowledge Check SMS concepts from b9-experience)

## Reference folder

[`reference/`](./reference/) contains the raw research artifacts for traceability:

- Cost summary, confidence levels per question, knowledge graph entities, source matrix

## What's deliberately NOT here

These were considered and excluded as scope creep:

- A revised brand / visual design for the portal (kill the Bucs theme — separate work)
- A consolidated codebase merging b9-experience + b9-ai-portal (separate work)
- A pitch deck for Brenda (she doesn't need one)
- Vendor RFI responses or contracts
- Detailed prompt engineering for the 8 new use cases (Phase 2 of advisory)

## Engagement boundaries

This is a friend-to-friend advisory, not a billable engagement. The package is sized accordingly:

- **What you do:** Read package, send Brenda the discovery agenda (07), have the conversation, decide what to add to the portal, share the prioritized use case list with Brenda
- **What Brenda does:** Answer the 8 gating questions, decide which 2-3 use cases to actually pilot
- **What's deferred:** Vendor selection, contracts, build, pilot execution, measurement — all decisions Brenda owns

If after this package Brenda wants to scope a paid engagement, that's a separate conversation.

