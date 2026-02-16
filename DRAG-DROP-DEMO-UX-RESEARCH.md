# Drag-and-Drop Demo UX — Research & Expansion Brief

**Purpose:** Document the Prompt Refinement demo's drag-and-drop UX as a reusable pattern and research other portfolio demos that could use it.  
**Reference implementation:** Prompt Engineering tab (`site/index.html` #demo-prompt, `site/prompt-demo.js`)  
**Created:** February 2025  

---

## 1. Why This UX Works

The drag-and-drop flow in the Prompt Refinement demo creates a **"you have to do something"** feeling—unlike passive click-through or auto-play, the user participates in the transformation.

| Benefit | What it does |
|---------|--------------|
| **Engagement** | User initiates each step; feels like driving, not watching |
| **Teaching** | The action (drag rough → refine → drag refined → answer) mirrors the real workflow |
| **Memory** | Physical interaction aids recall ("I dragged the prompt into the optimizer") |
| **Credibility** | Demonstrates the flow, not just the outcome |
| **Mobile parity** | Tap = drag; same mental model, different input |

---

## 2. The Pattern (Extracted)

### Core elements

```
┌─────────────────────────────────────────────────────────────────────┐
│  DRAG SOURCE                                                        │
│  • Draggable/tappable item (card, chip, bubble)                     │
│  • Clear label: "Your X — drag or tap into Y"                       │
│  • Optional: scenario/context selector that changes source content  │
└─────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────┐
│  DROP ZONE 1 (Stage 1)                                              │
│  • Empty state: "Drop or tap X here"                                │
│  • On drop: process input → show output                             │
│  • Output may become new drag source for next zone                  │
└─────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────┐
│  DROP ZONE 2 (Stage 2) — optional chaining                          │
│  • Same pattern                                                     │
│  • On drop: process → final outcome                                 │
└─────────────────────────────────────────────────────────────────────┘

FALLBACK: "Or Play to watch" — auto-runs for passive users
```

### Technical components

| Component | Role | Implementation note |
|-----------|------|---------------------|
| Drag source | `draggable="true"`, `ondragstart`, `onclick` (tap fallback) | `dataTransfer.setData('text/plain', payload)` |
| Drop zone | `ondragover`, `ondragleave`, `ondrop` | `preventDefault()`; use `relatedTarget` in dragleave to avoid child flicker |
| Drop hint | Empty state text | Hidden when zone has content (`.has-messages`) |
| Feedback | Drop-landed animation, drag-over highlight | Brief scale/pulse on drop; border/background on dragover |
| Play fallback | Button triggers same logic | Calls same handlers without user drag |

### What makes it reusable

- **Payload is abstract** — Can be text, JSON string, or data URI (e.g. for images)
- **Stages are sequential** — Stage N output can become Stage N+1 input
- **Tap = drag** — Same `onDropStage(payload)` handler for both
- **Scenarios** — Selector changes source content; reset clears state

---

## 3. Candidate Demos for This UX

Ideas for other portfolio demos that could use drag-and-drop.

### 3.1 Migration Mapping

**Concept:** Drag source system objects into a "migration planner" → get mapping recommendations.

| Element | Description |
|---------|-------------|
| **Drag source** | Cards: "Legacy Order Table", "Custom Pricing Logic", "ERP Integration" |
| **Drop zone** | "Migration Planner" panel |
| **On drop** | Show: target platform equivalent, effort estimate, risks |
| **Chain?** | Could add second zone: "Drop for detailed migration steps" |

**Why it fits:** Physical metaphor (moving objects between systems); aligns with Codebase Assessment / migration work.

---

### 3.2 Prompt → Output Comparison

**Concept:** Same as current demo but with a twist—drag the *same* rough prompt into two different "refinement styles" and compare outputs side by side.

| Element | Description |
|---------|-------------|
| **Drag source** | Rough prompt (e.g. "summarize this") |
| **Drop zone 1** | "Structured (Role/Task/Context)" refinement |
| **Drop zone 2** | "Minimal (bullet points only)" refinement |
| **On drop** | Both run in parallel; user compares outputs |

**Why it fits:** Extends current demo; teaches "structure matters" by showing contrast.

---

### 3.3 Risk/Compliance Checklist

**Concept:** Drag checklist items (e.g. "Data residency", "Audit trail") into "Assessed" vs "Pending" columns.

| Element | Description |
|---------|-------------|
| **Drag source** | Chips: risk/compliance items for a given scenario |
| **Drop zone 1** | "✓ Assessed" |
| **Drop zone 2** | "⏳ Pending" |
| **On drop** | Item moves; optional: show "why" or recommendation |

**Why it fits:** Governance theme; demonstrates due-diligence workflow.

---

### 3.4 Architecture Decision Flow

**Concept:** Drag a decision card (e.g. "Monolith vs microservices") into outcome zones.

| Element | Description |
|---------|-------------|
| **Drag source** | Decision card: "How should we deploy this?" |
| **Drop zone 1** | "Lift-and-shift" |
| **Drop zone 2** | "Re-platform" |
| **Drop zone 3** | "Re-architect" |
| **On drop** | Show pros/cons, effort, recommendation for that path |

**Why it fits:** Decision-making; shows structured evaluation.

---

### 3.5 User Story → Test Case

**Concept:** Drag a user story into a "Test Generator" → get test cases.

| Element | Description |
|---------|-------------|
| **Drag source** | User story card (e.g. "As a buyer I want to...") |
| **Drop zone** | "Test Case Generator" |
| **On drop** | Typing → list of test cases (happy path, edge cases, negative) |

**Why it fits:** QA/engineering workflow; connects to Agent Pipeline (user stories phase).

---

### 3.6 Schema Snippet → Validation Rules

**Concept:** Drag a schema field (e.g. "email", "order_total") into a validator → get validation rules.

| Element | Description |
|---------|-------------|
| **Drag source** | Schema field chips from a sample JSON schema |
| **Drop zone** | "Validation Rule Generator" |
| **On drop** | Show: format, constraints, error messages |

**Why it fits:** Technical; aligns with integration/migration work.

---

## 4. Evaluation Framework

Use this to decide if a demo is a good fit for the drag-and-drop pattern.

| Criterion | Strong fit | Weak fit |
|-----------|------------|----------|
| **Transformation** | Input clearly transforms into different output | Static display or no clear before/after |
| **Sequential stages** | 2+ stages with handoff between them | Single step |
| **Tangible input** | User has a concrete "thing" to move | Abstract or complex input |
| **Learning moment** | The act of moving teaches the workflow | Movement is arbitrary |
| **Portfolio relevance** | Demonstrates Andrew's methodology/work | Off-topic for Director/CT&I narrative |
| **Mobile viability** | Tap makes sense as fallback | Drag metaphor doesn't map to tap |

### Research questions for each candidate

1. What is the "thing" the user drags? (Must be simple and recognizable)
2. What happens when they drop it? (Transformation must be obvious)
3. Does a second stage add value, or is one sufficient?
4. How does this align with "strategy + engineering" or "AI as method"?
5. Can we pre-script the outputs (no API) or do we need live calls?

---

## 5. Implementation Notes

### Reusable code from Prompt Demo

| Pattern | File | Reusable? | Notes |
|---------|------|-----------|-------|
| `setupDropZone(zone, handler)` | prompt-demo.js | Yes | Generic; pass payload to handler |
| `addDropLandedFeedback(zone)` | prompt-demo.js | Yes | Adds `.drop-landed` class |
| Drag source wiring | prompt-demo.js | Partial | Custom per demo; same `dataTransfer` pattern |
| Tap fallback (`onclick` → handler) | prompt-demo.js | Yes | Always provide for mobile |
| Overlay (first-time instructions) | index.html + JS | Yes | localStorage key per demo |
| CSS: `.drag-source`, `.drop-zone`, `.drop-hint` | styles.css | Yes | Namespace with demo class |

### Suggested abstraction (future)

A small `drag-drop-demo.js` utility could provide:

```javascript
// Pseudocode
createDragSource(element, getPayload)
createDropZone(element, onDrop, options)
wireTapFallback(source, targetZone, getPayload)
```

---

## 6. Next Steps for Research

1. **Prioritize** — Rank candidates by portfolio fit and implementation effort  
2. **Prototype** — Sketch one candidate (e.g. Migration Mapping) to validate pattern transfer  
3. **User test** — Run a quick test: "What do you think you're supposed to do?"  
4. **Document** — Add a "Demo concepts" section to the portfolio docs  

---

## 7. Reference: Prompt Demo File Map

| What | Where |
|------|-------|
| HTML structure | `site/index.html` (lines ~266–348, inside #demo-prompt) |
| JS logic | `site/prompt-demo.js` |
| CSS | `site/styles.css` (`.prompt-demo-inline`) |
| Scenarios data | `site/prompt-demo.js` (scenarios object) |

---

**Owner:** Andrew Dean Martin  
**Related:** PROMPT-REFINEMENT-DEMO-README.md, PROMPT-REFINEMENT-UX-RESEARCH.md, DEMO-CONCEPTS.md
