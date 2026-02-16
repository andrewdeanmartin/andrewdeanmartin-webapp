# Demo Build Plan — Full Implementation Roadmap

**Purpose:** Phased plan to build all portfolio demos (Implementation Brief + Drag-Drop expansion).  
**Source:** DEMO-IMPLEMENTATION-BRIEF.md, DRAG-DROP-DEMO-UX-RESEARCH.md  
**Created:** February 2025  

---

## Executive Summary

| Phase | Demos | Est. Hours | Outcome |
|-------|-------|------------|---------|
| **Phase 1** | Reliability Paradox, Pilot Purgatory, Codebase Assessment upgrade | 26-34 | Core 3 from Implementation Brief |
| **Phase 2** | Migration Mapping, Risk/Compliance, Architecture Decision | 18-24 | Drag-drop expansion (high-persona impact) |
| **Phase 3** | Prompt Comparison, User Story→Test Case, Schema→Validation | 12-18 | Nice-to-have demos |
| **Total** | 9 demos | 56-76 hrs | Full demo suite |

**Final portfolio:** Agent Pipeline + Prompt Engineering + Codebase Assessment + Reliability Paradox + Pilot to Production + (up to 5 more tabs)

---

## Table of Contents

1. [Phase 1: Core Demos](#phase-1-core-demos)
2. [Phase 2: Drag-Drop Expansion (High Impact)](#phase-2-drag-drop-expansion-high-impact)
3. [Phase 3: Drag-Drop Expansion (Nice-to-Have)](#phase-3-drag-drop-expansion-nice-to-have)
4. [Pre-Build: Shared Infrastructure](#pre-build-shared-infrastructure)
5. [Integration Checklist (Per Demo)](#integration-checklist-per-demo)
6. [Quality Gates](#quality-gates)
7. [Timeline & Dependencies](#timeline--dependencies)

---

## Pre-Build: Shared Infrastructure

**Do once before starting any demo.** Est: 2-3 hours.

| Task | Description | Files |
|------|-------------|-------|
| Extract drop-zone utility | Create `site/drag-drop-utils.js` with `setupDropZone()`, `addDropLandedFeedback()` | New file |
| Verify tab switching | Ensure `syncDemoTabFromHash()` handles new panels | script.js |
| Add demo tab container space | Verify `.demo-tabs` scrolls or wraps on mobile with 6+ tabs | styles.css |
| Statistics reference | Print Section 8 from DEMO-IMPLEMENTATION-BRIEF.md for copy-paste | — |

**Optional:** Create a small `createDragSource(element, getPayload)` helper if building 3+ drag-drop demos.

---

## Phase 1: Core Demos

**Goal:** Ship the 3 prioritized demos from the Implementation Brief.  
**Order:** Reliability → Pilot → Codebase (each builds on patterns from the previous).

---

### 1.1 Reliability Paradox Calculator

**Type:** Slider + Add Agent (no drag-drop)  
**Est:** 8-12 hours  
**File:** `site/reliability-calc.js`

| Step | Task | Est. |
|------|------|------|
| 1 | Add tab + panel to index.html | 0.5h |
| 2 | Build HTML structure: slider, agent chain, dashboard, toggle, insight card | 1.5h |
| 3 | Implement calculation logic (P^n, cost, latency, mitigations) | 2h |
| 4 | Wire slider → update metrics (debounced) | 0.5h |
| 5 | Wire + Add Agent button → append agent card, cap at 10 | 1h |
| 6 | Implement mitigations toggle → apply formula adjustments | 1h |
| 7 | Add warning thresholds (3/5/7 agents) → .warning, .danger classes | 0.5h |
| 8 | Add transparency label (P^n disclaimer) | 0.25h |
| 9 | Mobile: horizontal scroll or wrap for agent chain, stack dashboard | 1h |
| 10 | Dark mode, accessibility, reset | 1h |
| 11 | Add reliability-calc.css or append to styles.css | 0.75h |

**Deliverables:**
- [ ] Tab "Reliability Paradox" in Demo section
- [ ] Slider 80-99%, default 95%
- [ ] 10 agent names from Implementation Brief
- [ ] Mitigations toggle with explanation
- [ ] Reset button

---

### 1.2 Pilot Purgatory Walkthrough ("From Pilot to Production")

**Type:** 5 decision cards, option selection, dashboard, results comparison  
**Est:** 10-14 hours  
**File:** `site/pilot-purgatory.js`

| Step | Task | Est. |
|------|------|------|
| 1 | Add tab + panel to index.html | 0.5h |
| 2 | Build HTML: intro card, progress dots, dashboard, decision card template | 2h |
| 3 | Create decisions data structure (5 decisions × 3 options each) | 1.5h |
| 4 | Implement state machine: intro → D1 → D2 → … → D5 → results | 2h |
| 5 | Wire option click → update state, apply impacts, show explanation | 2h |
| 6 | Build results view: Your Path vs Pacesetter (C,C,C,C,C) side-by-side | 1.5h |
| 7 | Add Pacesetter insight text | 0.25h |
| 8 | Mobile: stack results vertically, ensure option cards tappable | 1h |
| 9 | Tone check: walkthrough, NOT game (no "Your score!" language) | 0.5h |
| 10 | Dark mode, accessibility, reset | 1h |
| 11 | Add pilot-walkthrough.css or append to styles.css | 0.75h |

**Deliverables:**
- [ ] Tab "Pilot to Production" in Demo section
- [ ] 5 decisions with full content from Implementation Brief
- [ ] Live dashboard (timeline, budget, risk, readiness)
- [ ] Pacesetter comparison at end
- [ ] Reset button

---

### 1.3 Codebase Assessment Upgrade

**Type:** Drag-and-drop (reuses prompt-demo pattern)  
**Est:** 6-8 hours  
**File:** `site/assessment-demo.js`

| Step | Task | Est. |
|------|------|------|
| 1 | Replace contents of existing `#demo-assessment` panel (keep id) | 0.5h |
| 2 | Add drag source: "messy codebase" card | 0.5h |
| 3 | Add drop zone: "Assessment Engine" with empty-state hint | 0.5h |
| 4 | Implement onDrop: run 8 workstreams sequentially (1.5s each) | 2h |
| 5 | Create findings array (8 items) from Implementation Brief | 0.5h |
| 6 | Render finding cards with severity styling (critical/high/medium/low) | 1h |
| 7 | Generate executive summary card after workstreams complete | 0.5h |
| 8 | Reuse .drag-source, .drop-zone, .drop-hint from prompt-demo | 0h |
| 9 | Add tap fallback for mobile | 0.25h |
| 10 | Reset, accessibility | 0.75h |

**Deliverables:**
- [ ] Same tab (Codebase Assessment), now interactive
- [ ] Drag/tap messy codebase → 8 workstreams animate → findings + exec summary
- [ ] Pre-scripted findings from Implementation Brief

---

## Phase 2: Drag-Drop Expansion (High Impact)

**Goal:** Add 3 demos that scored high on persona impact (Marcus, Sarah, etc.).  
**Prerequisite:** Phase 1 complete; drag-drop patterns proven.

---

### 2.1 Migration Mapping

**Type:** Drag-drop  
**Est:** 6-8 hours  
**File:** `site/migration-demo.js`

| Step | Task | Est. |
|------|------|------|
| 1 | Add tab + panel | 0.5h |
| 2 | Drag sources: 3-5 cards (Legacy Order Table, Custom Pricing Logic, ERP Integration, etc.) | 1h |
| 3 | Single drop zone: "Migration Planner" | 0.5h |
| 4 | On drop: show target equivalent, effort estimate, risks (pre-scripted per source) | 2h |
| 5 | Optional: scenario selector (e.g., Salesforce→HubSpot vs legacy→cloud) | 1h |
| 6 | Styling, mobile tap, reset | 1h |
| 7 | Info card: why migration mapping matters | 0.5h |

**Deliverables:**
- [ ] Tab "Migration Mapping"
- [ ] 3-5 draggable source objects
- [ ] Pre-scripted mapping output per object

---

### 2.2 Risk/Compliance Checklist

**Type:** Drag-drop (two zones: Assessed / Pending)  
**Est:** 5-7 hours  
**File:** `site/compliance-demo.js`

| Step | Task | Est. |
|------|------|------|
| 1 | Add tab + panel | 0.5h |
| 2 | Drag sources: 5-6 chips (Data residency, Audit trail, Access controls, etc.) | 1h |
| 3 | Drop zone 1: "✓ Assessed" | 0.5h |
| 4 | Drop zone 2: "⏳ Pending" | 0.5h |
| 5 | On drop: move chip to zone; optionally show brief "why" tooltip | 1.5h |
| 6 | Scenario selector: e.g., "AI in Healthcare" vs "AI in Financial Services" | 1h |
| 7 | Styling, mobile, reset | 1h |
| 8 | Governance framing in intro | 0.5h |

**Deliverables:**
- [ ] Tab "Governance Checklist"
- [ ] 5-6 compliance/risk items
- [ ] Two-column layout (Assessed | Pending)

---

### 2.3 Architecture Decision Flow

**Type:** Drag-drop (3 zones: lift-shift, re-platform, re-architect)  
**Est:** 6-8 hours  
**File:** `site/architecture-demo.js`

| Step | Task | Est. |
|------|------|------|
| 1 | Add tab + panel | 0.5h |
| 2 | Drag source: 1 decision card ("How should we deploy this system?") | 0.5h |
| 3 | Drop zones: Lift-and-shift | Re-platform | Re-architect | 1h |
| 4 | On drop: show pros/cons, effort, recommendation for that path | 2h |
| 5 | Pre-script 3 outcome cards | 1h |
| 6 | Styling, mobile (tap to select path?), reset | 1.5h |
| 7 | Intro: decision-making framing | 0.5h |

**Deliverables:**
- [ ] Tab "Architecture Decisions"
- [ ] 1 decision card → 3 outcome zones
- [ ] Pre-scripted pros/cons/effort per path

---

## Phase 3: Drag-Drop Expansion (Nice-to-Have)

**Goal:** Additional demos if bandwidth allows. Lower persona breadth.  
**Prerequisite:** Phase 2 complete.

---

### 3.1 Prompt → Output Comparison

**Type:** Drag-drop (2 zones, parallel output)  
**Est:** 4-5 hours  
**File:** Extend `site/prompt-demo.js` or new `site/prompt-comparison.js`

| Step | Task | Est. |
|------|------|------|
| 1 | New tab OR add "Compare" mode to existing Prompt tab | 0.5h |
| 2 | Single drag source: rough prompt | 0.25h |
| 3 | Two drop zones side-by-side: "Structured" vs "Minimal" | 0.5h |
| 4 | On drop: trigger both refinements in parallel, show outputs | 2h |
| 5 | Reuse existing scenario/refined content; add "minimal" variant | 1h |
| 6 | Styling, mobile | 0.75h |

**Deliverables:**
- [ ] Same rough prompt → two refinement styles → compare outputs

---

### 3.2 User Story → Test Case

**Type:** Drag-drop (single zone)  
**Est:** 4-5 hours  
**File:** `site/userstory-demo.js`

| Step | Task | Est. |
|------|------|------|
| 1 | Add tab + panel | 0.5h |
| 2 | Drag source: 1-2 user story cards | 0.5h |
| 3 | Drop zone: "Test Case Generator" | 0.5h |
| 4 | On drop: typing indicator → list of test cases (happy, edge, negative) | 2h |
| 5 | Pre-script 2-3 user stories with test case outputs | 1h |
| 6 | Styling, mobile, reset | 0.5h |

**Deliverables:**
- [ ] Tab "User Story to Test Cases"
- [ ] Connects to Agent Pipeline narrative (user stories phase)

---

### 3.3 Schema → Validation Rules

**Type:** Drag-drop (single zone)  
**Est:** 4-6 hours  
**File:** `site/schema-demo.js`

| Step | Task | Est. |
|------|------|------|
| 1 | Add tab + panel | 0.5h |
| 2 | Drag sources: 4-5 schema field chips (email, order_total, created_at, etc.) | 1h |
| 3 | Drop zone: "Validation Rule Generator" | 0.5h |
| 4 | On drop: show format, constraints, error messages per field | 2h |
| 5 | Pre-script validation rules for each field | 1h |
| 6 | Styling, mobile, reset | 0.5h |

**Deliverables:**
- [ ] Tab "Schema Validation"
- [ ] Technical, integration-focused

---

## Integration Checklist (Per Demo)

For each new demo, before marking complete:

| # | Task | Done |
|---|------|------|
| 1 | Add `<a href="#demo-xxx" class="demo-tab" role="tab" id="tab-xxx">Label</a>` to .demo-tabs | |
| 2 | Add `<div class="demo-panel" id="demo-xxx" role="tabpanel" aria-labelledby="tab-xxx">...</div>` to .demo-panels | |
| 3 | Add `<script src="xxx.js"></script>` before `</body>` | |
| 4 | Verify tab order matches DEMO-IMPLEMENTATION-BRIEF (existing 3 first, then new) | |
| 5 | Run Quality Checklist (Section 9 of Implementation Brief) | |
| 6 | Test in Chrome, Firefox, Safari, mobile 375px | |
| 7 | Verify dark mode | |
| 8 | Verify reset clears state | |

---

## Quality Gates

**Before shipping any phase:**

### Functionality
- [ ] All demos work without console errors
- [ ] Reset restores initial state
- [ ] Tab switching doesn't break or leave orphan state
- [ ] Mobile: all touch targets ≥ 44px

### Accessibility
- [ ] Keyboard navigable (Tab, Enter, Space)
- [ ] `role` and `aria-label` on interactive elements
- [ ] `@media (prefers-reduced-motion)` reduces or disables animations

### Content
- [ ] Stats use Verified Statistics Reference only (DEMO-IMPLEMENTATION-BRIEF Section 8)
- [ ] Compound reliability (Reliability Paradox) has transparency label
- [ ] No gamification language in Pilot walkthrough
- [ ] No PwC branding or internal terminology

### Design
- [ ] CSS custom properties (no hardcoded colors)
- [ ] Fraunces / IBM Plex Sans / JetBrains Mono
- [ ] Spacing and radius match site

---

## Timeline & Dependencies

```
Week 1–2: Phase 1
├── Pre-build (shared infra)     [2–3h]
├── Reliability Paradox         [8–12h]
├── Pilot Purgatory             [10–14h]
└── Codebase Assessment upgrade [6–8h]
    → CHECKPOINT: Ship Phase 1

Week 3–4: Phase 2
├── Migration Mapping           [6–8h]
├── Risk/Compliance Checklist   [5–7h]
└── Architecture Decision       [6–8h]
    → CHECKPOINT: Ship Phase 2

Week 5 (optional): Phase 3
├── Prompt Comparison           [4–5h]
├── User Story → Test Case      [4–5h]
└── Schema → Validation         [4–6h]
    → Ship Phase 3
```

**Dependencies:**
- Phase 2 requires Phase 1 (drag-drop patterns proven in Codebase Assessment)
- Phase 3 requires Phase 2 (optional; can skip if time-constrained)
- Reliability and Pilot have no cross-demo dependencies; can be built in parallel by different people

---

## File Manifest (Final State)

| File | Phase | Purpose |
|------|-------|---------|
| `site/reliability-calc.js` | 1 | Reliability Paradox |
| `site/pilot-purgatory.js` | 1 | Pilot to Production walkthrough |
| `site/assessment-demo.js` | 1 | Codebase Assessment (drag-drop upgrade) |
| `site/migration-demo.js` | 2 | Migration Mapping |
| `site/compliance-demo.js` | 2 | Risk/Compliance Checklist |
| `site/architecture-demo.js` | 2 | Architecture Decision Flow |
| `site/prompt-comparison.js` or extension | 3 | Prompt output comparison |
| `site/userstory-demo.js` | 3 | User Story → Test Case |
| `site/schema-demo.js` | 3 | Schema → Validation Rules |
| `site/drag-drop-utils.js` | Pre | Optional shared utility |
| `site/index.html` | All | Tab links + panel markup |
| `site/styles.css` | All | Demo-specific styles |

---

## Reference Documents

| Doc | Use for |
|-----|---------|
| DEMO-IMPLEMENTATION-BRIEF.md | Specs, math, decisions content, integration, quality checklist |
| DRAG-DROP-DEMO-UX-RESEARCH.md | Drag-drop pattern, candidate demos, evaluation criteria |
| BRAND-PERSONAS.md | Tone, audience, what to emphasize |

---

*Last updated: February 2025*
