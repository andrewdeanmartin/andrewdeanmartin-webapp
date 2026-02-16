# Demo Concepts — What to Build, Why Each One Matters

> Three interactive demos for your personal site. Each proves a different hard skill. None use PwC IP. All are yours.

---

## Demo 1: Agent Pipeline Visualizer (Hero Demo)

**What it proves:** You understand multi-agent orchestration at an architectural level — how to design agent roles, handoffs, human checkpoints, and trace chains.

**What the visitor experiences:**
1. A scenario selector: "Migration Analysis" / "Content Compliance Review" / "Technical Due Diligence"
2. A visual pipeline appears — 4-6 agents in sequence, each with a defined role
3. The visitor clicks "Run" and watches data flow through the pipeline step by step
4. At the human-in-the-loop checkpoint, the pipeline pauses. The visitor makes a decision (approve / modify / escalate)
5. The pipeline continues based on their choice
6. At the end: a complete audit trail showing every agent's input, output, decision, and timestamp

**What each persona sees:**
- **David:** "This is exactly what I'd show a client. This guy can explain agent pipelines without slides."
- **Sarah:** "He built governance INTO the pipeline. The audit trail is what my compliance team needs."
- **Priya:** "This isn't a toy. The architecture is sound — agent isolation, explicit handoffs, trace links."
- **Rachel:** "This is the most differentiated thing I've seen on any Director-level profile."

**Technical approach:**
- Pure frontend (HTML/CSS/JS). No AI API calls needed.
- Pre-scripted agent outputs for each scenario (the demo shows architecture, not live AI)
- Animated step-through with real data flowing between stages
- Mobile-friendly (simpler layout on small screens)
- The code itself is clean and viewable (Priya will check)

**Build time estimate:** 8-12 hours

---

## Demo 2: SharpPrompt Enterprise (Interactive Tool)

**What it proves:** You've built a repeatable prompt engineering methodology — Role → Task → Context → Requirements → Output → Input — and it works at enterprise scale, not just for "remind customer about invoice."

**What the visitor experiences:**
1. A text input: "Describe what you need in plain language"
2. Category buttons: Architecture Review / Stakeholder Update / Migration Analysis / Governance Assessment / Adoption Plan
3. Visitor types or picks a category
4. The page transforms their vague input into a structured prompt using the methodology, with a smooth before → after animation
5. Pre-built examples available as one-click demos

**Enterprise templates (replacing the SMB ones):**

| Category | Example input | Structured output |
|----------|--------------|-------------------|
| Architecture Review | "check if this system is ready for production" | Role: Senior architect reviewing system readiness. Task: Assess production readiness across reliability, scalability, and security dimensions... |
| Stakeholder Update | "update leadership on the AI project" | Role: Delivery lead providing a structured status update. Task: Summarize current sprint progress, blockers, and next steps for executive audience... |
| Migration Analysis | "analyze this CRM for migration" | Role: Platform analyst evaluating CRM migration complexity. Task: Assess data model, customizations, integrations, and compliance requirements... |
| Governance Assessment | "review this AI deployment for compliance" | Role: AI governance specialist evaluating deployment risk. Task: Assess data handling, model transparency, human oversight, and audit readiness... |
| Adoption Plan | "help teams start using AI tools" | Role: Enablement lead designing a phased adoption program. Task: Create a 30/60/90 day plan with milestones, success metrics, and risk mitigations... |

**Technical approach:**
- Pre-built transformations: Pure frontend, instant, no API cost
- Optional "custom input" mode: Could use a lightweight API call for truly dynamic transformation (add later)
- Styled in brand system — this should feel like a professional tool, not a hackathon project

**Build time estimate:** 4-6 hours

---

## Demo 3: Codebase Health Assessment (Visual Methodology)

**What it proves:** You have a structured, repeatable approach to technical due diligence — the 8-workstream assessment that produces executive-ready findings.

**What the visitor experiences:**
1. An interactive diagram of the 8 workstreams arranged in a radial or grid layout
2. Click on any workstream (Architecture, Code Quality, Security, Dependencies, Testing, Performance, Technical Debt, Documentation)
3. Each workstream expands to show: what it evaluates, sample findings format, severity classification (critical/high/medium/low), and what the remediation roadmap entry looks like
4. A sample "executive summary" output at the bottom — showing what the final deliverable looks like
5. Optional: a "try it" input where the visitor pastes a small code snippet and gets a simplified assessment of 2-3 workstreams

**What each persona sees:**
- **David:** "This is a methodology I can sell. The executive summary format is exactly what a client expects."
- **Sarah:** "He's done this before. The severity classification and remediation roadmap show maturity."
- **Priya:** "The workstreams are comprehensive. This isn't someone who just runs a linter and calls it an assessment."

**Technical approach:**
- Interactive diagram: HTML/CSS/JS with click-to-expand
- Sample outputs: Pre-built content showing real assessment structure (with fictional codebase)
- Optional code snippet analysis: Would need a simple backend or client-side static analysis. Could be v2.
- The diagram itself is the proof — it shows structured thinking

**Build time estimate:** 6-8 hours

---

## What NOT to Build

| Tempting idea | Why it's wrong |
|---------------|----------------|
| A chatbot | Every AI site has one. It doesn't differentiate you. It says "I can call an API." |
| A resume/CV generator | That's a product for job seekers. You're a Director. |
| A generic "AI playground" | Proves nothing specific. "Look, AI can do things" is not a brand statement. |
| Anything requiring user auth | Adds friction, complexity, and maintenance. These demos should be zero-barrier. |
| Anything that needs ongoing cost | No monthly API bills for a personal site. Pre-built demos with optional live features. |

---

## Recommended Build Order

1. **Agent Pipeline Visualizer** — This is the hero. It's the most differentiating and proves the hardest skill. Build it first.
2. **SharpPrompt Enterprise** — Second, because the core logic already exists. Redesign templates, embed in site.
3. **Codebase Health Assessment** — Third, as an interactive methodology explainer. Can start as a visual diagram and add interactivity over time.

All three live on the site as sections or linked pages. The homepage teases them; clicking goes deeper.

---

## How They Fit Into the Site

```
Hero
  → "I turn AI ambition into shipped products"
  → CTA: "See it in action" (scrolls to demos)

About (short version)

What Sets Me Apart (4 pillars)

── Live Demos ──────────────────────
  → Agent Pipeline Visualizer (hero demo, interactive)
  → Prompt Engineering Tool (SharpPrompt Enterprise)
  → Assessment Methodology (8-workstream explorer)
────────────────────────────────────

Impact (generalized metrics)

Journey (Vancouver, WA → now)

Connect (LinkedIn + email)
```

The demos ARE the proof section. They replace the old "Impact" cards with gradient numbers. Instead of saying "10 agents" in a styled box, visitors watch 10 agents work.
