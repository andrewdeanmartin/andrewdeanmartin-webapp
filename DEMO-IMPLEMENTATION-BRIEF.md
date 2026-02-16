# Demo Implementation Brief — For Building Agent

**What this is:** Everything needed to build new interactive demos for Andrew Martin's portfolio site. This document is self-contained — the building agent should not need to re-research anything.

**What to build (prioritized):**
1. **Reliability Paradox Calculator** — Multi-agent cost/reliability math tool
2. **Pilot Purgatory Walkthrough** — AI investment decision simulator
3. **Codebase Assessment upgrade** — Make existing static demo interactive (optional, if time permits)

**Tech stack:** Pure vanilla HTML, CSS, JavaScript. No frameworks, no build tools, no APIs. GSAP 3.12.5 available via CDN (already loaded). Site served with `python3 -m http.server`.

---

## Table of Contents

1. [Codebase Context](#1-codebase-context)
2. [Design System Reference](#2-design-system-reference)
3. [Reusable Patterns](#3-reusable-patterns)
4. [Demo 1: Reliability Paradox Calculator](#4-demo-1-reliability-paradox-calculator)
5. [Demo 2: Pilot Purgatory Walkthrough](#5-demo-2-pilot-purgatory-walkthrough)
6. [Demo 3: Codebase Assessment Upgrade](#6-demo-3-codebase-assessment-upgrade-optional)
7. [Integration Instructions](#7-integration-instructions)
8. [Verified Statistics Reference](#8-verified-statistics-reference)
9. [Quality Checklist](#9-quality-checklist)

---

## 1. Codebase Context

### File structure

```
site/
├── index.html                  # Main page (580 lines). Demos live in #demos section.
├── styles.css                  # Complete design system (2,752 lines)
├── script.js                   # Main interactivity (548 lines) — theme, nav, pipeline demo, GSAP
├── prompt-demo.js              # Prompt refinement demo (648 lines) — drag-and-drop, scenarios
├── space-invaders.js           # Easter egg (1,411 lines) — ignore
├── prompt-refinement-demo.html # Standalone demo page — ignore
└── agent-pipeline-run/         # Pipeline demo artifacts — ignore
```

### How demos are structured

Demos live inside `<section class="demo-section" id="demos">` in index.html. They use a tab system:

**Tab navigation (lines ~230-245 of index.html):**
```html
<div class="demo-tabs" role="tablist">
  <a href="#demo-pipeline" class="demo-tab active" role="tab" id="tab-pipeline">Agent Pipeline</a>
  <a href="#demo-prompt" class="demo-tab" role="tab" id="tab-prompt">Prompt Engineering</a>
  <a href="#demo-assessment" class="demo-tab" role="tab" id="tab-assessment">Codebase Assessment</a>
</div>
```

**Tab panels:**
```html
<div class="demo-panels">
  <div class="demo-panel active" id="demo-pipeline" role="tabpanel" aria-labelledby="tab-pipeline">...</div>
  <div class="demo-panel" id="demo-prompt" role="tabpanel" aria-labelledby="tab-prompt">...</div>
  <div class="demo-panel" id="demo-assessment" role="tabpanel" aria-labelledby="tab-assessment">...</div>
</div>
```

Tab switching uses CSS `:target` with JS sync (script.js lines 268-300). New demos need a new tab link and panel div.

### Scripts loaded at bottom of index.html (order matters):
```html
<script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/ScrollTrigger.min.js"></script>
<script src="script.js"></script>
<script src="space-invaders.js"></script>
<script src="prompt-demo.js"></script>
<!-- ADD NEW DEMO SCRIPTS HERE -->
```

---

## 2. Design System Reference

### CSS Custom Properties (from styles.css)

**Colors (light theme — dark theme auto-switches via `[data-theme="dark"]`):**
```css
--color-bg: #f7f5f2;           /* Paper-like base */
--color-bg-secondary: #edeae6;
--color-text: #1e3a5f;         /* Navy */
--color-text-muted: #5a6e82;
--color-warm: #c2410c;         /* Copper accent */
--color-border: #d1cdc8;
--color-accent: #4338ca;       /* Indigo for interactive */
```

**Dark theme overrides:**
```css
[data-theme="dark"] {
  --color-bg: #0c0d0e;
  --color-bg-secondary: #18191b;
  --color-text: #e8e6e3;
  --color-warm: #f97316;
  --color-border: #2a2b2d;
  --color-accent: #60a5fa;
}
```

**Typography:**
```css
--font-display: 'Fraunces', serif;    /* Headings */
--font-body: 'IBM Plex Sans', sans-serif;  /* Body text */
--font-mono: 'JetBrains Mono', monospace;  /* Code, stats, audit trails */
```

**Spacing & Radius:**
```css
--radius-sm: 6px;
--radius-md: 10px;
--radius-lg: 16px;
```

### Component patterns to match

**Cards:** `border-radius: var(--radius-lg)`, `padding: 1.5rem`, `background: var(--color-bg-secondary)`, subtle hover transform
**Buttons:** Primary uses `background: var(--color-warm)` with white text. Secondary uses outline style.
**Section layout:** `max-width: 1100px` centered container, `padding: 6rem 0` for sections.
**Stats/numbers:** Use `font-family: var(--font-mono)` for any metrics or counters.
**Animations:** Subtle. Use `transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1)`. GSAP for scroll reveals.

### Responsive breakpoints
```css
@media (max-width: 768px) { /* Tablet */ }
@media (max-width: 640px) { /* Mobile */ }
```
Touch targets: minimum 44x44px.

---

## 3. Reusable Patterns

### From script.js — available globally (inside the IIFE but accessible via DOM):

```javascript
// Utility helpers (inside script.js IIFE — recreate in new files)
function debounce(fn, wait) { /* ... */ }
function delay(ms) { return new Promise(resolve => setTimeout(resolve, ms)); }
function $(sel, parent) { return (parent || document).querySelector(sel); }
function $$(sel, parent) { return Array.from((parent || document).querySelectorAll(sel)); }
function escapeHtml(str) { /* ... */ }
```

### From prompt-demo.js — patterns to replicate:

**Drop zone setup:**
```javascript
function setupDropZone(zone, handler) {
    zone.addEventListener('dragover', (e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'copy';
        zone.classList.add('drag-over');
    });
    zone.addEventListener('dragleave', (e) => {
        if (!zone.contains(e.relatedTarget)) zone.classList.remove('drag-over');
    });
    zone.addEventListener('drop', (e) => {
        e.preventDefault();
        zone.classList.remove('drag-over');
        const payload = e.dataTransfer.getData('text/plain');
        if (payload) handler(payload);
    });
}
```

**Drop landed feedback:**
```javascript
function addDropLandedFeedback(zone) {
    zone.classList.add('drop-landed');
    setTimeout(() => zone.classList.remove('drop-landed'), 400);
}
```

**Typing indicator:**
```javascript
function addTypingIndicator(container) {
    const msg = document.createElement('div');
    msg.className = 'message ai';
    msg.id = 'typing-indicator';
    const bubble = document.createElement('div');
    bubble.className = 'message-bubble typing';
    bubble.innerHTML = '<div class="typing-dot"></div><div class="typing-dot"></div><div class="typing-dot"></div>';
    msg.appendChild(bubble);
    container.appendChild(msg);
    container.scrollTop = container.scrollHeight;
}
```

**Pipeline agent state management (from script.js):**
```javascript
function setAgentState(agentId, state) {
    var step = $('[data-agent="' + agentId + '"]');
    if (!step) return;
    step.className = 'pipeline-step ' + state;
    // Updates status text and indicator icon
}
```

### IIFE pattern — all new demo JS files MUST use this:
```javascript
(function() {
    'use strict';
    // All demo code here
    function init() {
        // Setup code
    }
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
```

---

## 4. Demo 1: Reliability Paradox Calculator

### What it is
An interactive tool where users add agents to a pipeline and watch reliability, cost, and latency degrade in real-time. They can adjust per-agent reliability via a slider and toggle mitigations to see recovery.

### Interaction flow

```
1. User sees: single agent card, dashboard showing 95% reliability / $5 cost / 2s latency
2. User adjusts per-agent reliability slider (range: 80-99%, default: 95%)
3. User clicks "+ Add Agent" — second agent appears, dashboard updates:
   - Reliability: 95% × 95% = 90.25%
   - Cost: $5 + $5 = $10
   - Latency: 2s + 3s = 5s
   - Monthly cost at 10K runs/day: $300K
4. Keep adding (max 10). Watch numbers deteriorate.
5. At 5 agents: warning card appears with failure count per day
6. Toggle "Apply Mitigations" — numbers recover with explanations
7. Reset button
```

### Visual design

```
┌─────────────────────────────────────────────────────────────┐
│  THE RELIABILITY PARADOX                                     │
│  Add agents. Watch reliability drop. See why architecture    │
│  matters.                                                    │
│                                                              │
│  Per-agent reliability: [====●=====] 95%                    │
│                                                              │
│  ┌──────┐  →  ┌──────┐  →  ┌──────┐  →  [+ Add Agent]     │
│  │Agent1│     │Agent2│     │Agent3│                          │
│  └──────┘     └──────┘     └──────┘                          │
│                                                              │
│  ┌────────────────────────────────────────────────────────┐  │
│  │  Pipeline Reliability    85.7%  ▼                      │  │
│  │  Cost per Run            $15                           │  │
│  │  Latency                 8s                            │  │
│  │  Daily Failures (10K)    1,426                         │  │
│  │  Monthly Cost            $450K                         │  │
│  └────────────────────────────────────────────────────────┘  │
│                                                              │
│  [  Toggle: Apply Mitigations  ]                            │
│                                                              │
│  ┌─ Insight ─────────────────────────────────────────────┐  │
│  │ The compound reliability formula (P^n) illustrates     │  │
│  │ why multi-agent architectures need production          │  │
│  │ engineering — retries, circuit breakers, fallbacks —   │  │
│  │ not just prompt engineering.                           │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

### Math (all calculations)

```javascript
// Core formula — compound reliability for sequential independent agents
reliability = Math.pow(perAgentReliability, agentCount);

// Cost — varies per agent (not all equal)
const agentCosts = [5, 5, 8, 8, 12, 12, 15, 15, 20, 20]; // $/run
totalCost = agentCosts.slice(0, agentCount).reduce((a, b) => a + b, 0);

// Latency — varies per agent
const agentLatencies = [2, 3, 2.5, 4, 3, 3.5, 2, 4, 3, 5]; // seconds
totalLatency = agentLatencies.slice(0, agentCount).reduce((a, b) => a + b, 0);

// Daily failures at scale
const dailyRuns = 10000;
dailyFailures = Math.round(dailyRuns * (1 - reliability));

// Monthly cost
monthlyCost = totalCost * dailyRuns * 30;
```

**Mitigations (when toggled on):**
```javascript
// Circuit breakers: improve effective reliability by catching failures early
mitigatedReliability = 1 - Math.pow(1 - reliability, 2); // roughly: retry once

// Caching: reduce cost by 40% (common reads cached)
mitigatedCost = totalCost * 0.6;

// Parallel execution: reduce latency by 35% (some agents run concurrently)
mitigatedLatency = totalLatency * 0.65;

// Single-agent fallback: floor reliability at 90%
mitigatedReliability = Math.max(mitigatedReliability, 0.90);
```

### Important: transparency label

The demo MUST include this text somewhere visible (e.g., a small info tooltip or footer note):
> "This model uses simplified compound reliability (P^n) to illustrate the principle. Real systems have retries, parallel paths, and correlated failures. Adjust the slider to explore different baselines."

### Agent card names (themed to enterprise AI)
1. Data Ingestion Agent
2. Classification Agent
3. Enrichment Agent
4. Validation Agent
5. Routing Agent
6. Compliance Agent
7. Summarization Agent
8. Quality Check Agent
9. Delivery Agent
10. Monitoring Agent

### Warning thresholds
- At 3+ agents: show "Reliability below 90%"
- At 5+ agents: show "At 10,000 daily requests, {X} fail per day"
- At 7+ agents: show "Monthly cost exceeds ${X}" with red styling

### CSS classes needed
```css
.reliability-calc { /* wrapper */ }
.reliability-slider { /* custom range input */ }
.agent-chain { /* horizontal flex container for agent cards */ }
.agent-card { /* individual agent in chain */ }
.reliability-dashboard { /* metrics grid */ }
.reliability-metric { /* individual metric with label + value */ }
.reliability-metric.warning { /* yellow/orange state */ }
.reliability-metric.danger { /* red state */ }
.mitigation-toggle { /* toggle switch */ }
.mitigation-detail { /* explanation card for each mitigation */ }
.reliability-insight { /* bottom insight card */ }
```

### Mobile layout
- Agent chain scrolls horizontally or wraps to 2 rows
- Dashboard metrics stack vertically (2-column grid → 1-column)
- Slider is full-width
- All touch targets ≥ 44px

### File: `site/reliability-calc.js`

---

## 5. Demo 2: Pilot Purgatory Walkthrough

### What it is
A guided decision walkthrough where users face 5 real decisions that determine whether an AI pilot reaches production. Each choice updates a live dashboard. At the end, their path is compared to the "Pacesetter" approach.

### Framing — use "walkthrough" tone, NOT "game"
Title: **"From Pilot to Production"**
Subtitle: "Walk through the 5 decisions that separate the 13% who ship from the 87% who don't."
This avoids BuzzFeed-quiz energy while preserving interactivity.

### Interaction flow

```
1. Intro card: scenario description + "Start" button
2. Decision 1 → user picks option → dashboard updates → brief explanation
3. Decision 2 → same
4. Decision 3 → same
5. Decision 4 → same
6. Decision 5 → same
7. Results: user's outcome vs. Pacesetter path, side by side
8. Reset button
```

### Visual design

```
┌─────────────────────────────────────────────────────────────┐
│  FROM PILOT TO PRODUCTION                                    │
│  5 decisions. The same ones that separate the 13% who ship   │
│  from the 87% who don't.                                     │
│                                                              │
│  ┌─ Progress ─────────────────────────────────────────────┐  │
│  │  ● ● ○ ○ ○   Decision 2 of 5                          │  │
│  └────────────────────────────────────────────────────────┘  │
│                                                              │
│  ┌─ Dashboard ────────────────────────────────────────────┐  │
│  │  Timeline: 47 days     Budget: $238K    Risk: Medium   │  │
│  └────────────────────────────────────────────────────────┘  │
│                                                              │
│  ┌─ Decision ─────────────────────────────────────────────┐  │
│  │  GOVERNANCE                                             │  │
│  │  Legal requires a compliance review before any data     │  │
│  │  touches the model. Their current backlog: 14 weeks.    │  │
│  │                                                         │  │
│  │  ┌─────────────────────────────────────────────────┐   │  │
│  │  │ A) Wait for full review                          │   │  │
│  │  │    Safe but adds 14 weeks to timeline            │   │  │
│  │  ├─────────────────────────────────────────────────┤   │  │
│  │  │ B) Skip compliance — ship now, fix later         │   │  │
│  │  │    Fast but creates production risk              │   │  │
│  │  ├─────────────────────────────────────────────────┤   │  │
│  │  │ C) Build compliance checks into the pipeline     │   │  │
│  │  │    Parallel path — governance runs with dev      │   │  │
│  │  └─────────────────────────────────────────────────┘   │  │
│  └────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

### The 5 decisions (full content)

**Initial state:** Timeline: 90 days | Budget: $200K | Risk: Low | Readiness: 0%

---

**Decision 1: TEAM COMPOSITION**

*"Your pilot was built by 2 data scientists. Production needs integration with Salesforce, an internal API, and a compliance reporting system. Your team has no integration engineer."*

| Option | Label | Timeline Impact | Budget Impact | Risk Impact | Readiness |
|--------|-------|-----------------|---------------|-------------|-----------|
| A | Hire an integration engineer | +30 days (recruiting) | +$45K | Risk stays Low | +10% |
| B | Train a data scientist on integration | +0 days now, +15 days later (learning curve) | +$5K training | Risk → Medium (skill gap) | +5% |
| C | Bring in someone who bridges strategy and engineering | +5 days (onboarding) | +$25K | Risk stays Low | +20% |

*After choosing, show brief explanation:*
- A: "Recruiting takes time. 67% of orgs report deployment delays while waiting for the right talent."
- B: "Upskilling is cheaper but integration is where 40-60% of production effort lives. This is a high-stakes learning curve."
- C: "The Pacesetter approach: find someone who can scope integration alongside the build, not after it."

---

**Decision 2: GOVERNANCE**

*"Legal requires a compliance review before any data touches the model. Their current backlog: 14 weeks. Your deadline is in {remaining_days} days."*

| Option | Label | Timeline Impact | Budget Impact | Risk Impact | Readiness |
|--------|-------|-----------------|---------------|-------------|-----------|
| A | Wait for the full review | +98 days | +$0 | Risk stays same | +5% |
| B | Skip compliance — ship now, fix later | +0 days | +$0 now | Risk → High | +10% |
| C | Build compliance checks into the pipeline | +10 days | +$15K | Risk improves by 1 level | +20% |

*After choosing:*
- A: "44% of organizations say governance is too slow (Modelop 2025). Waiting 14 weeks often means the pilot loses executive support."
- B: "Skipping governance creates a ticking clock. 67% of deployments are delayed by security issues discovered post-launch (Anaconda)."
- C: "Governance by design. Automated compliance checks run in parallel with development. This is how the 13% operate (Cisco AI Readiness Index)."

---

**Decision 3: DATA QUALITY**

*"You move to production data. It's messier than your pilot data — duplicates, missing fields, inconsistent formats. Model accuracy drops from 94% to 81%."*

| Option | Label | Timeline Impact | Budget Impact | Risk Impact | Readiness |
|--------|-------|-----------------|---------------|-------------|-----------|
| A | Retrain the model on production data | +21 days | +$40K | Risk → Medium if not already | +10% |
| B | Lower the accuracy threshold and ship | +0 days | +$0 | Risk → High | +5% |
| C | Stage data quality gates at each pipeline step | +14 days | +$20K | Risk improves by 1 level | +20% |

*After choosing:*
- A: "Retraining helps but costs more than expected. Organizations see 280% average cost overruns scaling from pilot to production (Gartner 2024)."
- B: "Production users notice. At 81% accuracy with 10,000 daily inputs, 1,900 outputs are wrong. Stakeholder trust erodes fast."
- C: "Data quality gates catch problems at ingestion, not at output. Cheaper to fix upstream. This is a standard production engineering pattern."

---

**Decision 4: INTEGRATION**

*"The pilot runs standalone. Production needs it connected to {2-3 enterprise systems based on earlier choices}. Each integration has its own authentication, data format, and rate limits."*

| Option | Label | Timeline Impact | Budget Impact | Risk Impact | Readiness |
|--------|-------|-----------------|---------------|-------------|-----------|
| A | Build each integration custom | +45 days | +$60K | Risk stays same | +15% |
| B | Use an integration platform (MuleSoft, etc.) | +20 days | +$35K + licensing | Risk stays same | +15% |
| C | Design an API layer that abstracts integrations | +25 days | +$30K | Risk improves by 1 level | +25% |

*After choosing:*
- A: "Custom integrations work but create maintenance debt. Every API change upstream breaks your pipeline."
- B: "Integration platforms reduce build time but add dependency and licensing cost. Viable for teams with existing licenses."
- C: "An abstraction layer means changing one integration doesn't break the pipeline. More upfront work, less production fire-fighting."

---

**Decision 5: COST & STAKEHOLDERS**

*"Your budget has grown to ${current_budget}. Original estimate was $200K. Leadership asks: 'Is this still worth it?'"*

| Option | Label | Timeline Impact | Budget Impact | Risk Impact | Readiness |
|--------|-------|-----------------|---------------|-------------|-----------|
| A | Cut scope to fit original budget | -15 days | Reduce to $200K | Risk → High (reduced value) | -10% |
| B | Request additional budget with detailed justification | +10 days (approval cycle) | Current budget + 10% buffer | Risk stays same | +5% |
| C | Present a phased rollout with ROI milestones at each phase | +5 days | Current budget, spent in phases | Risk improves by 1 level | +15% |

*After choosing:*
- A: "Cutting scope to fit the original number often removes the features that made the pilot valuable. You ship something nobody needs."
- B: "Budget requests without ROI evidence stall. Only 5% of organizations report extracting measurable value from AI investments (MIT Project NANDA)."
- C: "Phased rollout: shadow mode (week 1-2), 10% traffic (week 3-4), full production (week 5+). Each phase has a measurable gate. This is how Pacesetters de-risk."

---

### Dashboard calculation logic

```javascript
const state = {
    timeline: 90,      // days remaining (starts at 90)
    budget: 200000,    // total budget used
    risk: 'Low',       // Low / Medium / High / Critical
    readiness: 0       // percentage toward production (0-100)
};

// After each decision, apply the chosen option's impacts
// Risk levels: Low → Medium → High → Critical (or can improve)
// At the end, calculate outcome:
//   - If timeline > 180: "Pilot expired — leadership pulled funding"
//   - If risk === 'Critical': "Production blocked — compliance/security failure"
//   - If readiness < 50: "Pilot stayed in pilot — not enough production preparation"
//   - If readiness >= 70 && risk !== 'Critical' && timeline <= 150: "Production reached!"
```

### Pacesetter path comparison (shown at end)

The "Pacesetter" always picks: C, C, C, C, C (the third option each time). Show side-by-side:

```
YOUR PATH                          PACESETTER PATH
Timeline: X days                   Timeline: 135 days
Budget: $XXX,XXX                   Budget: $290,000
Risk: [level]                      Risk: Low
Readiness: X%                      Readiness: 100%

[Insight: what Pacesetters do differently]
```

Pacesetter insight text: "The 13% of organizations that consistently ship AI to production (Cisco AI Readiness Index, 8,000+ leaders surveyed) share a pattern: they invest more upfront in integration, governance, and data quality — and spend less fixing problems in production. They plan for phased rollouts with measurable gates rather than big-bang launches."

### CSS classes needed
```css
.pilot-walkthrough { /* wrapper */ }
.pilot-progress { /* step indicator dots */ }
.pilot-dashboard { /* live metrics bar */ }
.pilot-decision { /* decision card */ }
.pilot-option { /* clickable option card */ }
.pilot-option:hover { /* hover state */ }
.pilot-option.selected { /* after selection */ }
.pilot-explanation { /* post-decision explanation */ }
.pilot-results { /* final comparison view */ }
.pilot-results-column { /* side-by-side columns */ }
.pilot-insight { /* bottom insight card */ }
```

### Mobile layout
- Decision options stack vertically (already card-based, works naturally)
- Dashboard metrics wrap to 2x2 grid
- Progress dots stay horizontal
- Results comparison stacks vertically (your path above, pacesetter below)

### File: `site/pilot-purgatory.js`

---

## 6. Demo 3: Codebase Assessment Upgrade (Optional)

### What it is
Upgrade the existing static Codebase Assessment demo to use drag-and-drop. User drags a "messy codebase" card into an assessment engine, watches 8 workstreams scan sequentially, and gets a prioritized findings list + executive summary.

### This REPLACES the existing demo — same tab, same id (`demo-assessment`)

### Current HTML to replace (index.html lines ~353-397)
The existing `<div class="demo-panel" id="demo-assessment">` contains static walkthrough cards. Replace the contents with the interactive version. Keep the same `id` and `role="tabpanel"`.

### Interaction flow

```
1. User sees: "messy codebase" draggable card + empty "Assessment Engine" drop zone
2. User drags/taps card into drop zone
3. 8 workstreams activate sequentially (1.5s each = 12s total):
   - Architecture → finding card appears
   - Code Quality → finding card appears
   - Security → finding card appears (Critical!)
   - Dependencies → finding card appears
   - Testing → finding card appears
   - Performance → finding card appears
   - Technical Debt → finding card appears
   - Documentation → finding card appears
4. Executive Summary card generates
5. Reset button
```

### Pre-scripted findings (one per workstream)

```javascript
const findings = [
    { workstream: 'Architecture', severity: 'high', finding: 'Monolithic backend with 47 direct database connections across 12 services. No API gateway.', remediation: 'Introduce API gateway. Extract highest-traffic services. Est: 120 hours.' },
    { workstream: 'Code Quality', severity: 'medium', finding: 'Cyclomatic complexity > 25 in 14 functions. 3 god classes exceeding 800 lines.', remediation: 'Refactor top 5 complex functions. Apply single-responsibility. Est: 40 hours.' },
    { workstream: 'Security', severity: 'critical', finding: '3 API endpoints accept unvalidated input passed directly to DB queries. SQL injection confirmed in staging.', remediation: 'Parameterized queries, input validation middleware, pen test. Est: 24 hours.' },
    { workstream: 'Dependencies', severity: 'high', finding: '47 npm packages with known vulnerabilities. 12 packages 3+ major versions behind.', remediation: 'Automated dependency scanning in CI. Update critical packages. Est: 16 hours.' },
    { workstream: 'Testing', severity: 'medium', finding: '23% overall coverage. Integration tests absent for 8 of 12 API endpoints.', remediation: 'Prioritize integration tests for payment and auth paths. Target 60%. Est: 80 hours.' },
    { workstream: 'Performance', severity: 'medium', finding: 'P95 response time: 4.2s (target: <1s). No caching layer. N+1 queries on 3 endpoints.', remediation: 'Add Redis caching, fix N+1 queries, add performance monitoring. Est: 32 hours.' },
    { workstream: 'Technical Debt', severity: 'high', finding: 'Docker config 18 months stale. No CI/CD pipeline — manual deployments. 340 TODO comments.', remediation: 'Containerize with current base images. Implement GitHub Actions CI/CD. Est: 48 hours.' },
    { workstream: 'Documentation', severity: 'low', finding: 'README last updated 2023. No API documentation. Onboarding guide missing.', remediation: 'Generate API docs from code. Create onboarding guide. Est: 16 hours.' }
];
```

### Executive summary (calculated from findings)

```javascript
const summary = {
    healthScore: '4.2 / 10',
    critical: 1,   // count from findings
    high: 3,
    medium: 3,
    low: 1,
    totalRemediation: '376 hours',
    timeline: '10-14 weeks (phased)',
    priority1: 'SQL injection fix (24 hours) — blocks production'
};
```

### Reuses existing drag-and-drop CSS classes
`.drag-source`, `.drop-zone`, `.drop-hint`, `.drag-over`, `.drop-landed` — all already in styles.css.

### File: Modify `site/index.html` (replace demo-assessment contents) + create `site/assessment-demo.js`

---

## 7. Integration Instructions

### Adding new tabs to the demo section

1. **Add tab link** in the `.demo-tabs` div:
```html
<a href="#demo-reliability" class="demo-tab" role="tab" id="tab-reliability">Reliability Paradox</a>
<a href="#demo-pilot" class="demo-tab" role="tab" id="tab-pilot">Pilot to Production</a>
```

2. **Add panel div** in `.demo-panels`:
```html
<div class="demo-panel" id="demo-reliability" role="tabpanel" aria-labelledby="tab-reliability">
  <!-- Demo HTML here -->
</div>
<div class="demo-panel" id="demo-pilot" role="tabpanel" aria-labelledby="tab-pilot">
  <!-- Demo HTML here -->
</div>
```

3. **Add script tags** before `</body>`:
```html
<script src="reliability-calc.js"></script>
<script src="pilot-purgatory.js"></script>
```

4. **Tab switching** is handled by existing JS in script.js (lines 268-300). It uses `syncDemoTabFromHash()` which reads the URL hash and activates the matching panel. New panels with `id="demo-*"` will work automatically as long as the tab `href` matches the panel `id`.

### Tab ordering recommendation
Keep existing 3 tabs first, add new ones after:
1. Agent Pipeline (existing)
2. Prompt Engineering (existing)
3. Codebase Assessment (existing, upgraded)
4. Reliability Paradox (new)
5. Pilot to Production (new)

### CSS — add to styles.css or create separate files
New demo styles should be namespaced:
```css
/* Reliability Calculator */
.reliability-calc .agent-card { /* ... */ }
.reliability-calc .dashboard { /* ... */ }

/* Pilot Walkthrough */
.pilot-walkthrough .decision-card { /* ... */ }
.pilot-walkthrough .dashboard { /* ... */ }
```

---

## 8. Verified Statistics Reference

**Use ONLY these in demo content. All verified against primary sources.**

### Tier 1 — Safe to display prominently

| Stat | Value | Source | Citation for demo |
|------|-------|--------|-------------------|
| Pacesetters | 13% | Cisco AI Readiness Index 2025 | "Only 13% of organizations are fully AI-ready (Cisco, 8,000+ leaders surveyed)" |
| Gen AI in production | 30% | Pacific AI / Gradient Flow 2025 | "Only 30% of organizations have shipped Gen AI to production (Pacific AI 2025)" |
| Governance too slow | 44% | Modelop 2025 | "44% of leaders say governance is too slow (Modelop 2025)" |
| AI agents in production | 5% | Cleanlab 2025 | "Only 5% of engineering leaders have AI agents in production (Cleanlab, 1,837 surveyed)" |
| Stack rebuilds quarterly | 70% | Cleanlab 2025 | "70% of regulated enterprises rebuild their AI stack every 3 months (Cleanlab 2025)" |

### Tier 2 — Safe to use with context

| Stat | Value | Source | How to cite |
|------|-------|--------|-------------|
| Pilot purgatory | 87% | GAIForum | "87% of enterprise AI projects never escape the pilot stage (GAIForum Pilot Purgatory Index)" |
| Zero measurable return | 95% | MIT Project NANDA 2025 | "95% of organizations report zero measurable return from AI pilots (MIT Project NANDA, 300+ initiatives reviewed)" — note: "zero return" means no measured P&L impact, not technical failure |
| Cost overrun | 280% | Gartner 2024 | "Average 280% cost overrun from pilot to production (Gartner 2024)" |
| Compound reliability | P^n | Mathematical principle | "If each agent succeeds 95% of the time, 5 agents in sequence succeed only 77% of the time" — label as illustrative model |

### DO NOT use (unverifiable)
- "73% of successful pilots never reach production" — cannot verify MIT Sloan source
- "42% abandoned AI initiatives" — blog-only source
- "53% abandon after 3s" — web page stat applied to AI out of context
- "$5-50 per run" and "$18K-90K/month" — TechAhead blog estimates, not measured

---

## 9. Quality Checklist

Before shipping, verify each demo against:

### Functionality
- [ ] Works in Chrome, Firefox, Safari (latest)
- [ ] Works on mobile (375px width minimum)
- [ ] All touch targets ≥ 44px
- [ ] Reset button works cleanly (no stale state)
- [ ] Tab switching doesn't break demo state
- [ ] Dark mode: all elements readable, no contrast issues

### Accessibility
- [ ] All interactive elements have `role` and `aria-label`
- [ ] Keyboard navigable (Tab, Enter, Space)
- [ ] Focus states visible
- [ ] Reduced motion: `@media (prefers-reduced-motion: reduce)` disables animations
- [ ] Screen reader: meaningful content without visual cues

### Code quality
- [ ] Wrapped in IIFE — no global pollution
- [ ] `'use strict'` at top
- [ ] All user-facing text uses `escapeHtml()` where content is dynamic
- [ ] No `innerHTML` with unsanitized content
- [ ] `console.log` statements removed

### Design consistency
- [ ] Uses CSS custom properties (no hardcoded colors)
- [ ] Typography matches: Fraunces for headings, IBM Plex Sans for body, JetBrains Mono for stats
- [ ] Spacing and radius match existing patterns
- [ ] Cards use `var(--color-bg-secondary)` background
- [ ] Animations use `cubic-bezier(0.4, 0, 0.2, 1)` timing

### Content accuracy
- [ ] All statistics cite source in small text
- [ ] Compound reliability labeled as "illustrative model"
- [ ] No Tier 3 statistics displayed to users
- [ ] No PwC-specific terminology

---

## Appendix: Andrew Martin Context (for tone)

The site's voice is: confident but not arrogant, specific but not jargon-heavy, practical not theoretical. The tagline is "Turning AI Ambition into Shipped Products." The demos should feel like tools built by someone who actually does this work, not academic exercises.

**Who visits:** Partners evaluating capability, CDOs worried about governance, technical peers assessing depth, recruiters doing due diligence. The demos need to hold up under scrutiny from all four.

**What NOT to do:**
- No chatbot ("every AI site has one")
- No generic "AI playground"
- No gamification language ("beat the odds!", "your score is!")
- No PwC branding or PwC-specific process names
- No emoji in professional demo content

---

**Files to create:**
1. `site/reliability-calc.js` — Reliability Paradox Calculator
2. `site/pilot-purgatory.js` — Pilot to Production Walkthrough
3. `site/assessment-demo.js` — Codebase Assessment upgrade (optional)
4. Modifications to `site/index.html` — new tabs + panel HTML
5. Additions to `site/styles.css` — new demo component styles (or separate CSS files)

**Estimated total build:** 26-34 hours across all three demos (including content, mobile, and polish)

---

*Source document: STRATEGY-TO-EXECUTION-DEMO-RESEARCH.md*
*Profile reference: ANDREW-MARTIN-PROFILE.md*
*Existing demo patterns: prompt-demo.js, script.js*
