# Quick Start Guide — Prompt Refinement Demo

> **For the next agent:** This is a quick reference. Full documentation is in `PROMPT-REFINEMENT-DEMO.md`.

---

## What Is This?

An interactive demo showing how **structured prompts** (Role → Task → Context → Requirements → Output) produce better LLM outputs than vague prompts. **Embedded in the portfolio** under Demos → Prompt Engineering tab.

**Primary implementation:** `site/index.html` (Prompt panel) + `site/prompt-demo.js` + `site/styles.css`  
**Standalone page:** `site/prompt-refinement-demo.html` (legacy iPhone-style, for direct linking)  
**Stack:** Pure frontend—no dependencies, no build step, no API calls  
**Purpose:** Portfolio demo proving Andrew's prompt engineering methodology

---

## The Demo Flow

### Interactive (drag or tap)
1. **User drags or taps rough prompt** (e.g. "update leadership on the project") into left panel
2. **Stage 1 (Prompt Optimizer):** AI refines it → structured prompt appears
3. **User drags or taps refined prompt** into right panel
4. **Stage 2 (ChatGPT/Claude):** Refined prompt → high-quality answer
5. **Copy to clipboard** — Refined prompt is copied when used (desktop + mobile)

### Watch mode
- Click **"▶ Or Play to watch"** to auto-run the full flow

**3 scenarios:** Stakeholder Update, Architecture Review, Migration Analysis

---

## Quick Commands

```bash
# Serve the portfolio (demo is in Demos → Prompt Engineering tab)
cd site && python3 -m http.server 8080
# Open http://localhost:8080 → Demos → Prompt Engineering

# Or open standalone page
open site/prompt-refinement-demo.html
```

---

## File Structure

```
site/
├── index.html              # Portfolio; demo embedded in #demo-prompt panel
├── prompt-demo.js          # Demo logic: scenarios, drag-and-drop, tap, play
├── prompt-refinement-demo.html  # Standalone page (legacy, separate design)
└── styles.css              # Includes .prompt-demo-inline styles
```

**Key files:**
- `prompt-demo.js` — Scenarios data, onDropStage1/2, attachRefinedDragListeners, playDemo, resetDemo
- `styles.css` — Search for `.prompt-demo-inline` (PC panels, drag source, drop zones)

---

## How to Add a New Scenario

1. **Add data** in `site/prompt-demo.js`:

```javascript
const scenarios = {
    // ... existing ...
    newScenario: {
        roughPrompt: "your rough prompt",
        scenarioHint: "Brief rationale for this scenario",
        refinedPrompt: `**Role:** ...
**Task:** ...
**Context:** ...
**Requirements:** ...
**Output:** ...`,
        finalAnswer: `High-quality answer here`
    }
};
```

2. **Add button** in `site/index.html` (inside `.scenario-selector`):

```html
<button class="scenario-btn" data-scenario="newScenario">New Scenario Name</button>
```

3. **Test:** Refresh, select scenario, drag/tap or play

---

## Features (Current Implementation)

- **PC conversational panels** — Desktop-style chat windows (not iPhones)
- **Drag-and-drop** — Rough prompt → Stage 1, refined prompt → Stage 2
- **Tap/click fallback** — Works on iPhone and touch devices
- **Real copy to clipboard** — Refined prompt copied when used
- **First-time overlay** — Brief instructions; dismissed on first interaction (localStorage)
- **Scenario hints** — Context under each rough prompt
- **Step indicators** — "Step 1: Refine" / "Step 2: Use in ChatGPT"

---

## Testing Checklist

- [ ] Drag rough prompt into left panel → refined prompt appears
- [ ] Drag refined prompt into right panel → final answer appears
- [ ] Tap rough prompt (mobile) → same flow
- [ ] Tap refined prompt (mobile) → same flow
- [ ] Play button runs full flow
- [ ] Reset clears both panels
- [ ] Scenario switch resets and updates rough prompt
- [ ] Copy indicator shows; refined prompt in clipboard
- [ ] First-time overlay shows, then dismisses
- [ ] No console errors

---

## Research Foundation

- **PROMPT-REFINEMENT-UX-RESEARCH.md** — Two-stage meta-prompting, user journey
- **PROMPT-REFINEMENT-DEMO.md** — Full technical documentation
- **RESEARCH-OUTPUT-MISSION-4-ENTERPRISE-PROMPT-ENGINEERING.md** — SharpPrompt framework

---

## File Relationships

```
Portfolio (site/index.html)
├── Demos → Prompt Engineering tab
│   └── Inline demo (prompt-demo.js, styles.css)
├── site/prompt-refinement-demo.html  ← Standalone page (legacy)
├── PROMPT-REFINEMENT-DEMO.md        ← Full technical docs
├── PROMPT-REFINEMENT-DEMO-README.md ← You are here
└── PROMPT-REFINEMENT-UX-RESEARCH.md  ← Research foundation
```

---

**Last updated:** February 15, 2025  
**Status:** Production-ready ✅
