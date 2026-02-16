# Strategy to Execution: Interactive Demo Concepts — Deep Research

**Purpose:** Research-backed expansion of Andrew Martin's portfolio demos to showcase the full "AI from Strategy to Execution" narrative. Each concept is grounded in real enterprise data, aligned to Andrew's unique positioning, and designed to use the existing vanilla HTML/CSS/JS stack (no API costs, no auth).

**Core thesis:** Andrew's differentiator is not that he *knows about* AI strategy — it's that he personally bridges the gap from strategy to shipped product. The demos should make that bridge *visible and interactive*.

**Created:** February 2026  
**Last critical review:** February 2026 — statistics verified against primary sources, confidence levels assigned, build estimates adjusted for content creation

---

## Part 1: The Market Context (Why This Matters Now)

### The Pilot-to-Production Crisis

The biggest unsolved problem in enterprise AI is not the technology — it's getting from "approved pilot" to "running in production." The data from multiple independent studies paints a consistent picture, though each measures a different facet of the problem:

**Tier 1 — Strong primary sources (named methodology, large sample, published report):**

| Metric | Value | Source | Methodology | Confidence |
|--------|-------|--------|-------------|------------|
| Organizations classified as AI "Pacesetters" (production-ready) | Only 13% | Cisco AI Readiness Index 2025 | 8,000+ senior leaders, 30 markets, 26 industries | **High** |
| Organizations with Gen AI in production | Only 30% (13% with multiple deployments) | Pacific AI / Gradient Flow 2025 | 351 participants, Apr-May 2025 | **High** |
| Engineering leaders with AI agents live in production | Only 5% (95 of 1,837) | Cleanlab 2025 | 1,837 engineering/AI leaders surveyed | **High** |
| Governance process perceived as "too slow" | 44% | Modelop 2025 | 100 senior AI/data leaders, partnership with Corinium Intelligence | **Moderate** (small sample) |
| Governance perceived as "overwhelming" | 24% | Modelop 2025 | Same survey (n=100) | **Moderate** (small sample) |
| Gen AI projects taking 6-18 months from intake to production | 56% | Modelop 2025 | Same survey (n=100) | **Moderate** (small sample) |

**Tier 2 — Real studies, but requires careful interpretation:**

| Metric | Value | Source | Methodology | Confidence |
|--------|-------|--------|-------------|------------|
| AI projects that never escape pilot stage | 87% | GAIForum Pilot Purgatory Index | Analysis across 5 major industries; methodology details limited | **Moderate** |
| Organizations extracting zero measurable return from AI pilots | 95% | MIT Project NANDA, July 2025 | 300+ disclosed AI initiatives, 52 structured interviews, 153 survey responses | **Moderate** — note: "zero return" is broader than "failed"; includes deployed-but-not-measured |
| Average cost overrun from pilot to production | 280% | Gartner 2024 (cited via Pertama Partners) | Gartner is primary source; Pertama Partners' blog is secondary. Gartner methodology not publicly available | **Moderate** |

**Tier 3 — Widely cited but weak/unverifiable primary source:**

| Metric | Value | Source | Issue |
|--------|-------|--------|-------|
| Successful pilots that never reach production | 73% | Attributed to "MIT Sloan 2024" by Pertama Partners | Secondary citation only; original MIT Sloan publication not independently verified |
| Companies abandoning most AI initiatives by mid-2025 | 42% | Cited in blog posts attributing to "MIT/Playbook analysis" | Third-hand citation from personal blogs; no verifiable primary source found |

> **Important: These statistics measure different things.** 87% (GAIForum) = projects that stay stuck in pilot. 95% (MIT NANDA) = organizations seeing no measurable P&L return (a broader measure that includes deployed but non-value-generating projects). 30% in production (Pacific AI) = organizations that have shipped at least one Gen AI system. They're consistent when read carefully but should not be cited interchangeably.

### Why This Is Andrew's Territory

Andrew Martin operates at exactly the point where most organizations fail: the space between "approved investment" and "shipped product." His career proves this:

- **Investment-to-Delivery Execution** — Turns approved AI/platform investments into staffed, enabled, shipping assets
- **Rapid Prototyping** — Ships working demos in days while others are still debating slide decks
- **Technical Due Diligence** — Conducts AI-augmented codebase assessments (8 workstreams, executive-ready output)
- **Governance Without Bureaucracy** — Human-in-the-loop controls that enable speed, not block it
- **AI as Method** — Repeatable playbooks, prompt catalogs, agent libraries (not one-off experiments)

The portfolio demos should make visitors *feel* what it's like to have someone who does all of this. Not "here's a chatbot" — but "here's the difference between having a plan and having a shipped product."

---

## Part 1b: Constraints & Honest Limitations

Before proposing new demos, these constraints need to be front of mind:

### Visitor attention is the scarcest resource
The RECRUITER-BRUTAL-REVIEW.md establishes a **12-second first scan**. Most portfolio visitors will not play through a 5-decision simulator or answer 7 assessment questions. Every demo must work at three levels:
1. **Glance (3 seconds):** The title and visual state communicate what it is and that it's interactive
2. **Scan (15 seconds):** The resting state shows enough to convey the concept without clicking anything
3. **Engage (2+ minutes):** The full interaction delivers the experience

The document designs each demo for level 3. The actual build must also design for levels 1 and 2.

### Demo fatigue is real
The site currently has 3 demos. Adding 4 more creates 7. No visitor will try all 7. Progressive disclosure is essential — surface 3-4 primary demos, let visitors discover more if interested. Each demo must stand completely alone; the "narrative arc" described later assumes sequential consumption that won't happen.

### The "less is more" question
An honest alternative to adding demos: make the 3 existing demos deeper and more polished, then add 1 new one. The prompt refinement demo could support more scenarios. The codebase assessment could become interactive. The pipeline could add scenario selectors. **Refinement of existing work may be higher-impact than new demos.** This document proposes new concepts but does not claim they're categorically better than deepening existing ones.

### PwC considerations
Andrew is a Director at PwC. Some demo concepts (AI Readiness assessment, Governance framework designer, Investment intake structuring) resemble consulting methodologies. Even if they don't use PwC-specific IP, publishing consulting-grade tools on a personal site could create perception issues. Each concept should be evaluated against this: does it demonstrate *personal expertise* or does it look like a *productized PwC offering*?

### Content writing is invisible in build estimates
Code is half the work. Each demo needs enterprise-grade written content: realistic scenarios, nuanced decision options, authentic executive summaries. The existing prompt-demo.js is 648 lines, much of which is scenario content. **Content creation adds 4-8 hours per demo on top of coding estimates.** All build times in this document are adjusted to include content.

---

## Part 2: Evaluation Framework

Before diving into concepts, here's how to evaluate each one:

| Criterion | Strong fit | Weak fit |
|-----------|------------|----------|
| **Shows the gap** | Makes the strategy→execution gap tangible | Only shows one side (pure strategy or pure engineering) |
| **User participates** | Visitor makes decisions, drags, clicks — feels the challenge | Passive watching or reading |
| **Transformation visible** | Clear before/after or input/output | No visible change |
| **Teaches a methodology** | The interaction mirrors a real workflow Andrew uses | Arbitrary interaction |
| **Data-grounded** | Uses only Tier 1/2 statistics or realistic scenarios | Relies on unverifiable numbers |
| **Works at a glance** | The resting/empty state communicates value without interaction | Requires full engagement to understand |
| **Build feasibility** | Vanilla JS, no API costs, pre-scripted data | Needs backend, live API, complex state |
| **Mobile viable** | Tap/click works as well as drag; layout works at 375px | Requires precision drag, wide layout, or multi-column |
| **PwC-safe** | Demonstrates personal expertise and thinking | Could be perceived as productized consulting IP |

> **Note on persona validation:** This document includes hypothesized reactions from the brand personas (David/Partner, Sarah/CDO, Priya/Technical, Rachel/Recruiter). These are the author's predictions, not tested reactions. They should be treated as design hypotheses to validate, not evidence of fit.

---

## Part 3: The Demo Concepts (Ranked by Impact)

---

### Concept 1: "Pilot Purgatory" — The AI Investment Escape Simulator

**The hook:** *"87% of AI pilots never reach production. Can you beat the odds?"*

**What it proves:** Andrew understands *why* AI projects fail and has a methodology to prevent it. This is a highly differentiated demo concept — uncommon (possibly unique) at the Director/VP portfolio level, though this claim hasn't been exhaustively verified.

**What the visitor experiences:**

1. A scenario card appears: "Your organization just approved a $200K AI pilot. Your goal: get it to production in 90 days."
2. The visitor faces 5-6 decision points, each representing a real failure mode:
   - **Staffing:** "Your pilot team has 2 data scientists but no integration engineer. What do you do?" → Options: Hire (adds time), Upskill (risky), Bring in platform lead (Andrew's approach)
   - **Governance:** "Legal wants a 6-month compliance review before any data touches the model. What do you do?" → Options: Wait (pilot dies), Skip (production blocked later), Build governance into the pipeline (Andrew's approach)
   - **Data:** "Production data is 10x messier than your pilot data. Accuracy dropped from 95% to 82%. What do you do?" → Options: Retrain (cost overrun), Lower expectations (stakeholders lose faith), Stage data quality gates at each pipeline step
   - **Integration:** "The pilot runs on a laptop. Production needs to integrate with 3 enterprise systems. What do you do?" → Options: Build from scratch (18 months), Use middleware (partial), Design for integration from day one
   - **Cost:** "Your $200K pilot is now projected at $560K for production (280% overrun). Leadership is nervous." → Options: Cut scope (value drops), Ask for more budget (hard sell), Show ROI trajectory with phased rollout
3. Each decision updates a visual dashboard: timeline, budget, risk score, production readiness
4. At the end: the visitor sees their outcome vs. the "Pacesetter" path (the 13% who succeed)
5. A summary card: "Here's what Pacesetters do differently" — maps to Andrew's methodology

**Hypothesized persona reactions** *(untested — treat as design hypotheses):*
- **David (Partner):** Likely finds this useful as a client conversation tool
- **Sarah (CDO):** Governance decision point addresses a documented pain point (44% say governance is too slow — Modelop)
- **Priya (Technical Peer):** Integration and data quality scenarios must be technically specific to hold up
- **Rachel (Recruiter):** Novel interaction for a portfolio site; question is whether the "game" framing feels appropriate at Director level

**Tone risk:** The "Can you beat the odds?" framing has gamification energy that could land well (engaging, memorable) or poorly (trivializing, BuzzFeed-quiz feel) depending on the visitor. Consider a more neutral alternative framing: *"Walk through the 5 decisions that determine whether an AI pilot reaches production."* This reframes from "game" to "guided walkthrough" while preserving interactivity.

**Technical approach:**
- Pure JavaScript state machine: 5-6 nodes, 2-3 options each
- Pre-scripted outcomes (no AI needed)
- Visual dashboard: animated counters (budget, timeline, risk)
- Responsive: card-based decisions work well on mobile (vertical card stack)
- Final summary: generates a "your path vs. Pacesetter path" comparison

**Interaction pattern:** Decision cards (click/tap) → dashboard updates → final comparison. Could incorporate drag-and-drop for a "prioritize your actions" step.

**Build time estimate:** 16-22 hours (code: 10-14 hours + content: 6-8 hours for 5-6 realistic decision scenarios with nuanced options and outcome text)

**Statistics it uses (verified):**
- 87% never escape pilot — GAIForum Pilot Purgatory Index (Tier 2: real study, methodology details limited) ✓
- 280% cost overrun — Gartner 2024 via Pertama Partners (Tier 2: Gartner is primary source, methodology not public) ✓
- 13% Pacesetter model — Cisco AI Readiness Index 2025 (Tier 1: 8,000+ respondents, 30 markets) ✓
- 44% "governance too slow" — Modelop 2025 (Tier 1, but n=100) ✓
- 40-60% of effort is integration — Pertama Partners (Tier 3: their analysis, no cited primary source for this specific range)

---

### Concept 2: "The Reliability Paradox" — Multi-Agent Cost & Risk Calculator

**The hook:** *"Add agents. Watch reliability drop. See why architecture matters."*

**What it proves:** Andrew understands the production realities of multi-agent AI — not just the architecture diagram, but the math that breaks in production.

**What the visitor experiences:**

1. A clean interface with a "pipeline builder" feel
2. Start with 1 agent (95% reliability, $5/run, 2s latency)
3. Click "Add Agent" — a second agent appears in the chain
4. The dashboard updates in real-time:
   - **Reliability:** 95% × 95% = 90.25%
   - **Cost per run:** $5 + $5 = $10
   - **Latency:** 2s + 3s = 5s
   - **Monthly cost at 10,000 runs/day:** calculated live
5. Keep adding agents. Watch the numbers deteriorate:
   - 3 agents: 85.7% reliability
   - 5 agents: 77.4% reliability ("1 in 4 requests fails")
   - 7 agents: 69.8% reliability
6. At 5 agents, a warning appears: "At 10,000 daily users, 2,260 requests fail per day"
7. Toggle: "Apply mitigations" — shows Andrew's approach:
   - Circuit breakers → reliability recovers
   - Caching → cost drops
   - Parallel execution → latency drops
   - Single-agent fallback → reliability floor
8. Final insight card: "This is why multi-agent architecture requires production engineering, not just prompt engineering."

**Hypothesized persona reactions** *(untested):*
- **David:** Could use this to explain production scaling challenges to clients
- **Sarah:** Risk numbers support the case for governance and architecture review
- **Priya:** **This is the persona most likely to scrutinize the math.** The model must be transparent about its assumptions or it will backfire. See honesty note below.
- **Rachel:** Teaching tool aspect is engaging and memorable

**Honesty note — the math is illustrative, not measured:**
The 95% per-agent reliability figure comes from TechAhead's blog post, where it's used as an illustrative assumption to explain the compound reliability principle. It is not a measured production baseline. Real agent reliability varies wildly by task, model, prompt, and error handling. The compound formula (P^n) assumes independent, sequential failures with no retries — which is a simplification.

**The demo should be transparent about this.** Best approach: let users **set their own per-agent reliability** via a slider (default 95%, range 80-99%). This is more honest, more interactive, and actually more educational — visitors see that even at 99% per-agent, a 10-agent chain drops to 90.4%. The principle holds regardless of the baseline assumption.

**Technical approach:**
- JavaScript: simple multiplication and formatting
- Interactive sliders (per-agent reliability as user input) or "+" buttons
- Animated counters (GSAP)
- Toggle for mitigations with smooth transitions
- Pre-calculated data; no API needed
- Small footprint; could live within the existing demo tab system

**Interaction pattern:** Set reliability baseline → add/remove agents → real-time dashboard → toggle mitigations → compare.

**Build time estimate:** 10-12 hours (code: 6-8 hours + content: 3-4 hours for mitigation descriptions, insight cards, and educational copy)

**Statistics it uses:**
- 95-98% pilot accuracy vs. 80-87% production accuracy — TechAhead (Tier 3: blog post from a software dev agency, illustrative ranges not measured data) — **used as default slider value with clear "illustrative" labeling**
- Compound reliability math (P^n) — mathematical principle, universally valid ✓
- $5-50/run demo cost → $18K-90K/month at scale — TechAhead (Tier 3: estimated ranges, not from a specific system)
- 53% user abandonment after 3s — originally from Google/Akamai web performance research, applied to AI context by TechAhead. **The original stat is about web page load times, not AI agent responses.** Should be cited as "web performance research" or dropped.
- Circuit breaker, caching, fallback patterns — standard SRE practices, no citation needed ✓

---

### Concept 3: "Investment Intake" — The AI Project Structuring Tool

**The hook:** *"Turn a vague AI idea into a staffed, governed, shipping plan."*

**What it proves:** Andrew's core daily work — taking an approved investment and structuring it for delivery. This is the "strategy + engineering in one person" demo.

**What the visitor experiences:**

1. A "submit your AI idea" card with 3 pre-built scenarios:
   - "We want to use AI to automate our pricing decisions"
   - "We need to migrate our CRM and add AI capabilities"
   - "Our survey analysis takes too long — can AI help?"
2. User drags (or taps) a scenario into the "Intake Engine"
3. The engine processes it in 4 animated stages:

   **Stage 1 — Scope & Structure** (2s)
   - Input: vague idea
   - Output: Structured problem statement, business value hypothesis, ROI archetype
   - Visual: the vague text transforms into a structured card

   **Stage 2 — Delivery Blueprint** (2s)
   - Output: Phased plan (30/60/90 days), required roles, key milestones
   - Visual: a mini-timeline appears with phases color-coded

   **Stage 3 — Governance & Risk** (2s)
   - Output: Risk assessment, compliance requirements, human-in-the-loop checkpoints
   - Visual: governance gates appear on the timeline

   **Stage 4 — Executive Summary** (2s)
   - Output: One-page executive summary with: problem, approach, timeline, investment, expected ROI, risks, next steps
   - Visual: a polished "deliverable" card that looks like a real exec summary

4. A "Download PDF" button (generates a styled summary) — optional stretch goal
5. Reset and try another scenario

**Hypothesized persona reactions** *(untested):*
- **David:** Demonstrates the pre-staffing structuring work he needs
- **Sarah:** Governance built into the process, not added after
- **Priya:** 30/60/90 plans and milestones must be technically realistic or this falls flat
- **Rachel:** Shows actual daily work, not abstract capabilities

**PwC consideration:** This concept is the closest to resembling an internal PwC process (investment intake, work package structuring). The scenarios and output format should demonstrate *Andrew's personal thinking methodology*, not mirror PwC-specific templates. Use generic enterprise terminology, avoid PwC-specific terms (e.g., don't use "work package" if that's PwC-internal nomenclature).

**Technical approach:**
- Drag-and-drop (reuses existing `setupDropZone` pattern from prompt-demo.js)
- Pre-scripted outputs for each scenario (rich, realistic content)
- Staged reveal with typing animation (reuses `addTypingIndicator` pattern)
- Responsive card layout
- Optional: PDF generation with `html2canvas` or `jsPDF` (stretch)

**Interaction pattern:** Drag-and-drop (same pattern as Prompt Refinement demo) → staged transformation → executive summary output. Directly extends the existing UX pattern.

**Build time estimate:** 14-20 hours (code: 8-12 hours + content: 6-8 hours for 3 realistic scenarios × 4 stages of structured output including executive summaries)

---

### Concept 4: "AI Readiness Radar" — Interactive Maturity Assessment

**The hook:** *"Answer 7 questions. See where your AI initiative stands."*

**What it proves:** Andrew has a diagnostic methodology — he doesn't guess, he assesses. This positions him as the person you call *before* you've wasted 18 months.

**What the visitor experiences:**

1. A clean, card-based assessment with 7 questions (one per dimension):
   - **Strategy:** "How clearly is your AI initiative tied to a business outcome?" (1-5 scale)
   - **Data:** "How would you rate your training data quality and accessibility?" (1-5)
   - **Governance:** "Do you have human-in-the-loop controls designed into your AI workflows?" (1-5)
   - **Integration:** "How prepared are your existing systems to integrate with AI outputs?" (1-5)
   - **Team:** "Does your team include both strategy leads AND hands-on engineers?" (1-5)
   - **Production Readiness:** "Have you planned for monitoring, drift detection, and rollback?" (1-5)
   - **Timeline:** "Is your timeline based on similar past deployments or aspirational targets?" (1-5)

2. As the user answers each question, a radar/spider chart builds in real-time (7 axes)

3. After all 7: a score appears with a category:
   - **28-35:** "Pacesetter" (top 13%) — "You're in the minority. Let's make sure execution matches ambition."
   - **18-27:** "Progressing" — "Solid foundation. The gaps are in [weakest dimensions]. Here's what to focus on."
   - **7-17:** "At Risk" — "87% of pilots with this profile don't reach production. Here's why and what to change."

4. Below the score: a personalized "Focus Areas" card highlighting the 2-3 lowest dimensions with:
   - What the gap means in practice
   - What a Pacesetter organization does differently
   - A one-line recommendation

5. A subtle CTA: "This is the kind of assessment I run at the start of every engagement."

**Hypothesized persona reactions** *(untested):*
- **David:** Could use in client pitches to frame conversations
- **Sarah:** Governance and production readiness questions address her concerns
- **Priya:** Integration and data questions must be substantive, not surface-level
- **Rachel:** High engagement time (2+ minutes interacting)

**PwC consideration: ELEVATED RISK.** An AI maturity/readiness assessment is a core consulting deliverable. ServiceNow, IBM, and Credera all offer these as branded enterprise tools. Putting one on a personal portfolio site could look like Andrew is offering PwC-grade consulting for free, or worse, productizing a methodology that belongs to his employer. **Mitigation:** Frame explicitly as "the kind of thinking I bring" rather than "use this tool for your assessment." Keep it lightweight (7 questions, no downloadable report) so it's clearly a demo of thinking, not a substitute for an engagement.

**Technical approach:**
- JavaScript: 7-question state machine with score calculation
- SVG or Canvas radar chart (lightweight; many vanilla JS examples)
- Pre-computed recommendations per dimension and score range
- No API; all logic client-side
- Mobile: vertical card stack instead of side-by-side layout

**Interaction pattern:** Slider/select per question → real-time radar chart → score reveal → personalized recommendations.

**Build time estimate:** 14-16 hours (code: 8-10 hours + content: 4-6 hours for dimension-specific recommendations across 3 score tiers × 7 dimensions = 21 recommendation blocks + radar chart implementation)

**Market precedent:** ServiceNow (8,000+ survey basis), Credera, Deimos, and IBM all offer similar tools. This validates the format but also means it's not differentiated — it's an established pattern. The differentiation would come from the specific dimensions Andrew chooses and the quality of recommendations, not the interaction pattern itself.

---

### Concept 5: "Governance Gate Designer" — Build Your Own Control Framework

**The hook:** *"Where would you put the human checkpoint? Drag to find out."*

**What it proves:** Andrew's "governance without bureaucracy" philosophy isn't a slogan — it's a design discipline. This demo teaches visitors the tradeoff between speed and control.

**What the visitor experiences:**

1. A horizontal pipeline appears with 6 stages of an AI workflow:
   - Data Ingestion → Model Processing → Output Generation → Quality Check → Delivery → Monitoring
2. Below the pipeline: 3 draggable "governance gate" chips:
   - "Human Review" (high control, adds 2 days)
   - "Automated Validation" (medium control, adds 2 hours)
   - "Audit Log Only" (low control, adds 0 time)
3. The user drags gates onto the pipeline between any stages
4. A real-time scoreboard updates:
   - **Speed Score:** How fast the pipeline runs (degrades with more gates)
   - **Risk Score:** How protected against errors/compliance issues (improves with gates)
   - **Bureaucracy Score:** Whether gates are proportionate to risk at each stage
5. After placing all 3 gates, a "Compare" button shows:
   - **Your design** vs. **Andrew's recommendation** (the "governance without bureaucracy" approach)
   - Explanation: "Human review at output generation (highest-risk stage). Automated validation at data ingestion (catches bad input early). Audit log at delivery (traceability without delay)."
6. Insight: "The goal isn't maximum control — it's the right control at the right point."

**Hypothesized persona reactions** *(untested):*
- **David:** Workshop exercise format is familiar and useful
- **Sarah:** Validates that governance doesn't have to mean slow
- **Priya:** Tradeoff visualization must be technically honest
- **Rachel:** Novel governance angle is differentiated

**The "right answer" problem:** If there's clearly one best gate placement, visitors who chose differently feel scolded. If there's no clear best answer, the "compare with Andrew's recommendation" lacks authority. **Mitigation options:**
1. Frame Andrew's placement as "one proven approach" rather than "the right answer"
2. Show that multiple valid configurations exist with different tradeoff profiles
3. Explain the *reasoning* behind each placement rather than scoring it right/wrong

**Mobile concern:** A horizontal pipeline with drag targets between stages requires precision that's hard on a 375px screen. The vertical "tap-to-place" fallback needs to be the *primary* mobile design, not an afterthought.

**Technical approach:**
- Drag-and-drop (extends existing pattern)
- Simple scoring algorithm (pre-defined risk/speed weights per stage)
- Comparison reveal with animation
- Mobile: must be designed vertical-first with tap-to-place as primary interaction

**Interaction pattern:** Drag gates onto pipeline → real-time scoring → compare with expert approach (framed as "one proven configuration").

**Build time estimate:** 14-16 hours (code: 8-10 hours + content: 4-6 hours for scoring rationale, comparison explanations, and multiple valid configuration descriptions + mobile layout engineering)

---

### Concept 6: "The Translator" — Strategy-to-Technical Spec Converter

**The hook:** *"Give me executive speak. I'll give you a technical plan. Or vice versa."*

**What it proves:** Andrew's rarest skill — translating between executive language and technical reality. This is the "bridge" demo.

**What the visitor experiences:**

1. Two panels side by side: "Executive View" and "Technical View"
2. Three scenario cards to choose from:
   - "We need AI-powered customer insights"
   - "Our deployment pipeline is too slow"
   - "We want to scale our AI pilot to production"
3. User drags a scenario card into either panel:

   **If dropped in "Executive View":**
   - Shows the strategic framing: business case, stakeholder impact, ROI narrative, risk summary
   - A glowing bridge arrow points to the Technical View
   - User taps "Translate" → the Technical View fills in: architecture diagram, tech stack, sprint plan, integration requirements, monitoring strategy

   **If dropped in "Technical View":**
   - Shows the technical spec: architecture, APIs, data flows, infrastructure
   - Bridge arrow to Executive View
   - User taps "Translate" → Executive View fills in: business case, stakeholder talking points, risk narrative, timeline for leadership

4. Both panels are now filled. A center card appears: "This is what it means to have strategy and engineering in one person."

**Hypothesized persona reactions** *(untested):*
- **David:** Directly addresses the skill he needs — bilingual strategy + technical communication
- **Sarah:** Executive-to-technical translation is a recognized organizational gap
- **Priya:** Technical specs must be specific and realistic (architecture decisions, named tech stack choices) or this backfires as surface-level
- **Rachel:** Directly demonstrates the "bridge" positioning from the brand

**Content risk:** This concept lives or dies on the quality of the pre-scripted translations. If the "technical view" is generic ("use microservices and cloud") it proves nothing. If the "executive view" is jargon soup ("leverage synergies") it feels fake. Each translation must be specific enough that a real Partner would nod at the executive side AND a real engineer would nod at the technical side. This is the hardest content to write well of any concept in this document.

**Mobile concern:** Dual side-by-side panels don't work below ~768px. On mobile, this becomes a sequential reveal (executive first, then technical, or vice versa). The "bridge" visual metaphor is lost. This concept is weakest on mobile.

**Technical approach:**
- Dual-panel layout (flexbox/grid)
- Drag-and-drop or click to place
- Pre-scripted translations (3 scenarios × 2 directions = 6 content blocks)
- Typing animation for the "translation" reveal
- Mobile: sequential vertical layout (loses the dual-panel visual)

**Interaction pattern:** Choose scenario → drop in one panel → "Translate" to fill the other → both views revealed.

**Build time estimate:** 16-20 hours (code: 8-10 hours + content: 8-10 hours — this concept requires the most content and the hardest content to write well: 6 detailed content blocks that must satisfy both executive and technical audiences simultaneously)

---

### Concept 7: "Before & After" — The Assessment Transformation

**The hook:** *"Drag a messy codebase into the assessment engine. See what comes out."*

**What it proves:** Andrew's 8-workstream assessment methodology produces structured, actionable output from chaotic input. This extends the existing Codebase Assessment demo from static to interactive.

**What the visitor experiences:**

1. A "messy codebase snapshot" card with realistic problems:
   - "47 npm packages with known vulnerabilities"
   - "No test coverage on payment processing"
   - "3 hardcoded API keys in source"
   - "Docker config last updated 18 months ago"
   - "No CI/CD pipeline — manual deployments"
2. User drags the snapshot into the "Assessment Engine"
3. The 8 workstreams activate sequentially (2-3 second each):
   - Each workstream "scans" and produces a finding card with severity (Critical/High/Medium/Low)
   - Findings accumulate in a prioritized list
4. After all 8 workstreams complete:
   - An "Executive Summary" card generates with:
     - Total findings: X (Y critical, Z high)
     - Estimated remediation: XX hours
     - Priority 1 items (must fix before production)
     - Recommended timeline
5. Comparison: "Before" (chaotic, unstructured) vs. "After" (prioritized, actionable, executive-ready)

**Hypothesized persona reactions** *(untested):*
- **David:** Methodology is sellable; executive summary format matches client expectations
- **Sarah:** Severity classification and security findings signal maturity
- **Priya:** Workstreams must be comprehensive and technically credible
- **Rachel:** Chaos-to-structure transformation is visually impressive

**Overlap note:** This concept upgrades the existing Codebase Assessment demo from static to interactive. It should **replace** the current static demo, not exist alongside it. This reduces the demo count by keeping the total the same rather than adding another tab.

**Technical approach:**
- Drag-and-drop (extends existing pattern)
- Pre-scripted findings per workstream (realistic content)
- Sequential reveal with progress indicator
- Summary generation from pre-computed data
- Responsive: card stack on mobile

**Interaction pattern:** Drag messy input → 8-workstream sequential processing → prioritized findings → executive summary. Replaces/upgrades existing Codebase Assessment demo.

**Build time estimate:** 14-18 hours (code: 8-10 hours + content: 6-8 hours for 8 workstreams × realistic findings with severity levels, remediation estimates, and executive summary)

---

### Concept 8: "Sprint Zero" — The 90-Day AI Delivery Planner

**The hook:** *"Drag capabilities into a 30/60/90 day plan. See what a real AI delivery sprint looks like."*

**What it proves:** Andrew doesn't just assess — he plans and executes. This shows the transition from assessment to action.

**What the visitor experiences:**

1. A pool of capability cards on the left:
   - "Data Quality Gates"
   - "Human-in-the-Loop Checkpoints"
   - "Integration Testing"
   - "Model Monitoring"
   - "CI/CD Pipeline"
   - "Compliance Documentation"
   - "Stakeholder Alignment"
   - "Team Enablement (AI Champions)"
   - "Cost Governance"
   - "Production Rollout (Shadow → Canary → Full)"
2. A 3-column timeline on the right: "Days 1-30" / "Days 31-60" / "Days 61-90"
3. User drags capabilities into the timeline columns
4. Real-time feedback:
   - **Green:** Good placement ("Stakeholder Alignment in Days 1-30 ✓ — align before build")
   - **Yellow:** Suboptimal ("CI/CD Pipeline in Days 61-90 ⚠ — too late, should be in first 30 days")
   - **Red:** Risky ("Production Rollout in Days 1-30 ✗ — rushing to production without testing")
5. After all cards placed: "Compare with expert plan" reveals Andrew's recommended 30/60/90 layout with rationale for each placement
6. Score: "Your plan matches X% of the Pacesetter approach"

**Hypothesized persona reactions** *(untested):*
- **David:** Workshop exercise in demo format — familiar and useful
- **Sarah:** Governance and compliance timing is realistic
- **Priya:** CI/CD and monitoring placement must make technical sense
- **Rachel:** Gamification (score, comparison) creates engagement

**Mobile concern: HIGH.** 3 columns + 10 draggable cards = a mess at 375px width. This requires a fundamentally different mobile design (possibly sequential "which phase?" selection per card instead of drag). The desktop version is strong; the mobile version needs significant rethinking.

**Same "right answer" issue as Governance Gate Designer.** Multiple valid 30/60/90 configurations exist in practice. The scoring must accommodate valid alternatives rather than penalizing any deviation from Andrew's preferred sequence.

**Technical approach:**
- Multi-column drag-and-drop (extends existing pattern)
- Pre-defined scoring rules per card per column
- Comparison reveal with explanation cards
- Mobile: fundamentally different interaction (card-by-card "which phase?" selector)

**Interaction pattern:** Drag cards into timeline columns → real-time feedback → compare with expert → score.

**Build time estimate:** 18-22 hours (code: 10-12 hours including significant mobile layout engineering + content: 6-8 hours for 10 capability cards × placement rationale × alternative valid configurations + mobile redesign)

---

## Part 4: How These Concepts Map to Andrew's Brand Pillars

| Demo Concept | Strategy + Engineering | Prototype-Led | AI as Method | Governance w/o Bureaucracy |
|---|:---:|:---:|:---:|:---:|
| 1. Pilot Purgatory Escape | ★★★ | ★★ | ★★★ | ★★★ |
| 2. Reliability Paradox Calculator | ★★ | ★ | ★★★ | ★★ |
| 3. Investment Intake Structuring | ★★★ | ★★★ | ★★★ | ★★ |
| 4. AI Readiness Radar | ★★ | ★★ | ★★★ | ★★ |
| 5. Governance Gate Designer | ★★ | ★ | ★★ | ★★★ |
| 6. The Translator | ★★★ | ★★ | ★★ | ★ |
| 7. Assessment Before/After | ★★ | ★★ | ★★★ | ★★ |
| 8. Sprint Zero Planner | ★★★ | ★★★ | ★★★ | ★★★ |

---

## Part 5: Recommended Implementation Priority

> **Reminder:** The site currently has 3 demos. The realistic max for a portfolio without overwhelming visitors is 4-5, with progressive disclosure for any beyond that. The recommendation below assumes adding 1-2 new demos and upgrading 1 existing demo, not building all 8.

### Tier 1 — Build First (Highest Impact, Highest Differentiation)

**1. Pilot Purgatory Escape Simulator**
- Why first: Highly differentiated. Directly addresses the pilot-to-production problem documented by GAIForum, Cisco, and MIT. Positions Andrew as the person who navigates this exact gap.
- Interaction: Decision-card flow → dashboard → comparison
- Statistics: Uses Tier 1 and Tier 2 sources (Cisco, GAIForum, Modelop, Gartner via Pertama)
- Estimated build: **16-22 hours** (including content)
- PwC risk: Low — demonstrates personal expertise in a well-documented industry problem

**2. The Reliability Paradox Calculator**
- Why second: Relatively fast to build, highly visual, immediately educational. Complements the existing Agent Pipeline demo by showing *why* architecture matters. The math is universally valid even when the specific numbers are illustrative.
- Interaction: Set baseline → add/remove agents → real-time dashboard → toggle mitigations
- Statistics: Uses mathematical principle (P^n) with transparent "illustrative" framing + user-adjustable inputs
- Estimated build: **10-12 hours** (including content)
- PwC risk: Low — educational tool, not a consulting deliverable

### Tier 2 — Build Next or Upgrade Existing

**3. Assessment Before/After (upgrade, not new)**
- Why: Transforms the existing static Codebase Assessment demo into an interactive version. **Replaces** a current demo rather than adding a new tab. Net demo count stays at 3+1 = 4 total with Tier 1.
- Extends: Existing Codebase Assessment demo
- Estimated build: **14-18 hours** (including content)
- PwC risk: Moderate — assessment methodology could look like a consulting tool. Keep it clearly a "methodology preview"

**4. Governance Gate Designer**
- Why: Makes "governance without bureaucracy" interactive and teachable. Unique concept.
- Risk: "Right answer" UX problem; mobile layout challenges; needs careful framing
- Extends: Drag-and-drop pattern
- Estimated build: **14-16 hours** (including content and mobile engineering)
- PwC risk: Moderate — governance framework could look like a consulting deliverable

### Tier 3 — Build Later (Valuable but Lower Urgency or Higher Risk)

**5. Investment Intake Structuring Tool** — Strong concept, but highest PwC sensitivity. Defer until confidence in framing.
**6. Sprint Zero Planner** — Good but complex, mobile-challenging, and has the "right answer" problem. Save for later.
**7. AI Readiness Radar** — Proven format but least differentiated. Every major consultancy and vendor already offers one. Highest PwC risk (consulting tool on personal site).
**8. The Translator** — Strong concept but requires the most content investment (16-20 hours) and loses its core visual metaphor on mobile.

---

## Part 6: Technical Implementation Strategy

### Reusable Infrastructure from Existing Demos

All new demos should leverage the patterns already built:

| Existing Pattern | Source File | Reusable For |
|---|---|---|
| `setupDropZone(zone, handler)` | prompt-demo.js | Concepts 3, 5, 7, 8 |
| `addDropLandedFeedback(zone)` | prompt-demo.js | All drag-and-drop concepts |
| `addMessage(container, text, type)` | prompt-demo.js | Concepts 1, 3, 6 |
| `addTypingIndicator(container)` | prompt-demo.js | Concepts 3, 6, 7 |
| Staged pipeline animation | script.js (runPipeline) | Concepts 1, 7 |
| Human checkpoint decision | script.js (waitForHumanDecision) | Concept 1 |
| GSAP scroll reveals | script.js | All new demos |
| Tab system (CSS `:target`) | index.html + styles.css | New demo tabs |
| `delay()` utility | script.js | All animated concepts |
| `escapeHtml()` utility | script.js | All content-rendering concepts |

### New Components Needed

| Component | Used By | Complexity |
|---|---|---|
| **Decision card selector** (click/tap, multi-option) | Concepts 1, 4 | Low |
| **Real-time dashboard** (animated counters, gauges) | Concepts 1, 2, 5 | Medium |
| **Radar/spider chart** (SVG) | Concept 4 | Medium |
| **Multi-column drop zones** (timeline) | Concept 8 | Medium |
| **Comparison reveal** (side-by-side with animation) | Concepts 1, 5, 8 | Low |
| **Scoring algorithm** (weighted, multi-dimension) | Concepts 4, 5, 8 | Low |
| **Toggle with state change** (mitigations on/off) | Concept 2 | Low |

### Suggested File Architecture

```
site/
├── pilot-purgatory.js          # Concept 1
├── reliability-calc.js         # Concept 2
├── investment-intake.js        # Concept 3
├── ai-readiness.js             # Concept 4
├── governance-designer.js      # Concept 5
├── drag-drop-utils.js          # Shared utilities (extracted from prompt-demo.js)
└── demo-dashboard.js           # Shared dashboard/counter components
```

### CSS Strategy

Extend existing design system with:
- `.demo-decision-card` — for Concept 1 decision cards
- `.demo-dashboard` — real-time counter/gauge component
- `.demo-radar-chart` — SVG radar chart styling
- `.demo-timeline-columns` — multi-column drop zone layout
- `.demo-comparison` — side-by-side before/after reveal

Namespace all new demo styles under their demo class (e.g., `.pilot-purgatory .decision-card`) to avoid conflicts.

---

## Part 7: Content Depth — What Makes Each Demo Feel Real

### The difference between a toy and a tool

The existing demos succeed because they use real terminology, realistic data, and authentic workflows. Every new demo must meet this bar:

| Demo | Must Include | Must Avoid |
|---|---|---|
| Pilot Purgatory | Real failure statistics, realistic decision options with nuance, non-obvious best answers | Binary "right/wrong" choices, oversimplified scenarios |
| Reliability Calculator | Correct math (compound reliability), realistic cost ranges, named mitigation patterns | Made-up numbers, vague "it gets worse" messaging |
| Investment Intake | Real enterprise terminology (ROI archetype, work package, offshore pod), realistic timelines | Startup jargon, unrealistic timelines |
| AI Readiness | Questions that a CDO would actually answer, recommendations that are specific and actionable | Generic "do more AI" advice, questions that are too easy |
| Governance Gate | Real pipeline stages, honest tradeoff math, non-trivial optimal placement | "More governance = better" framing, trivially obvious answers |

---

## Part 8: The Narrative Arc — How Demos Tell a Story (With Caveats)

If a visitor explores multiple demos, the ideal sequence tells a progression:

```
Current Demos (already built):
  1. Agent Pipeline Visualizer — "I architect multi-agent systems"
  2. Prompt Refinement — "I build repeatable AI methodologies"
  3. Codebase Assessment — "I diagnose technical health"

Proposed additions (realistic: add 1-2, upgrade 1):
  4. Pilot Purgatory — "I know why AI projects fail"
  5. Reliability Calculator — "I understand production math"
  (Codebase Assessment upgraded to interactive Before/After)
```

**Reality check:** Most visitors will try 1, maybe 2 demos. The narrative arc is an internal design principle for ensuring each demo complements the others — it is NOT a user journey that will actually happen sequentially. Each demo must convey Andrew's positioning independently.

**The positioning each demo conveys on its own:**
- Agent Pipeline → "I build production-grade AI systems with governance"
- Prompt Refinement → "I have repeatable methodology, not ad hoc prompts"
- Codebase Assessment → "I diagnose and produce executive-ready output"
- Pilot Purgatory → "I know why most AI projects fail and how to prevent it"
- Reliability Calculator → "I understand the production math that breaks demos"

Any single one should prompt: *"This person thinks differently and builds things. I should reach out."*

---

## Part 9: Competitive Differentiation

### What others in this space typically show

| Profile Type | Typical Demo | How Andrew's Approach Differs | Caveat |
|---|---|---|---|
| **AI Engineer** | Chatbot, fine-tuned model, Jupyter notebook | Andrew shows *the system around the model* — governance, pipeline, delivery | Not a verified survey; based on general observation of portfolio sites |
| **Consultant** | Case study slides, methodology diagrams | Andrew shows *working interactive tools*, not static descriptions | Same — anecdotal observation |
| **Product Manager** | Wireframes, user flows, metrics dashboards | Andrew shows *both the strategy AND the code* — same person | Same |
| **Director/VP** | LinkedIn posts, conference talks, resume | Andrew shows *proof of execution* — you can interact with his methodology | Same |

> **Honesty note:** This competitive analysis is based on general patterns observed across portfolio sites, not a systematic review of Director/VP portfolios. The claim "no one else has this" is plausible but not verified. It's possible other Directors have interactive demos we haven't found.

### The "see6" insight

see6's "Brewery on Mars" simulation (200+ decisions, 7 meetings, 365 simulated days) proves that decision-based simulations work for enterprise AI education. Andrew's Pilot Purgatory concept borrows the same mechanism:
- Shorter (2-3 minutes vs. 6 hours)
- Self-service (no facilitator needed)
- Personal (on a portfolio site, not behind a sales wall)
- Pointed (specific to the pilot→production problem)

The key difference: see6's simulations are team-based workshops. Andrew's would be solo, self-guided. This means the social/competitive dynamics that drive engagement in see6 are absent. The demo must sustain engagement through scenario quality alone.

### The Infinidatum insight

Infinidatum offers 20+ free interactive AI decision tools (ROI calculator, readiness assessment, build-vs-buy). This validates the format — but Infinidatum is a platform brand with a team behind it, not a personal portfolio. Having tools like these on a Director's personal site signals: "I don't just advise on these frameworks — I build them." The risk is that a solo effort can't match the polish of a funded platform; the demos must be scoped tightly enough to be excellent rather than spread thin.

---

## Part 10: Measurement — How to Know If the Demos Work

For a personal portfolio site (no analytics backend), measurement is lightweight:

| Signal | How to Detect | What It Means |
|---|---|---|
| **Time on demos section** | Google Analytics event tracking (free) | Visitors are engaging, not bouncing |
| **Demo completion rate** | localStorage flag when demo reaches end state | The interaction is compelling enough to finish |
| **Scenario selection distribution** | localStorage counter per scenario | Which topics resonate most |
| **LinkedIn/email CTAs after demo** | Click tracking on CTA buttons | Demos are driving conversion |
| **Qualitative** | "How did you find me?" in initial conversations | Did they mention the demos? |

---

## Appendix A: Statistics Reference Sheet (Verified)

All statistics organized by source confidence. **Only Tier 1 and Tier 2 statistics should be displayed in demos.** Tier 3 can inform design decisions but should not be cited to visitors.

### Tier 1 — High confidence (named methodology, large/adequate sample, published report)

| Statistic | Value | Primary Source | Sample/Method | Used In |
|---|---|---|---|---|
| Pacesetters (AI-ready orgs) | 13% of organizations | Cisco AI Readiness Index 2025 | 8,000+ senior leaders, 30 markets, 26 industries | Concepts 1, 4 |
| Gen AI deployed to production | Only 30% (13% multiple) | Pacific AI / Gradient Flow 2025 | 351 participants, Apr-May 2025 | Concept 4 |
| AI agents live in production | Only 5% (95 of 1,837) | Cleanlab 2025 | 1,837 engineering/AI leaders | Concept 2 |
| Regulated enterprises rebuilding AI stack quarterly | 70% | Cleanlab 2025 | Same survey (subset with agents in production) | Concept 2 |
| Observability/guardrail satisfaction | <1 in 3 teams | Cleanlab 2025 | Same survey | Concept 2 |
| Governance "too slow" | 44% | Modelop 2025 (w/ Corinium Intelligence) | 100 senior AI/data leaders | Concepts 1, 5 |
| Governance "overwhelming" | 24% | Modelop 2025 | Same survey (n=100) | Concept 5 |
| Time intake to production | 6-18 months for 56% | Modelop 2025 | Same survey (n=100) | Concept 3 |

### Tier 2 — Moderate confidence (real study, but methodology details limited or secondary citation)

| Statistic | Value | Primary Source | Caveat | Used In |
|---|---|---|---|---|
| Projects stuck in pilot purgatory | 87% | GAIForum Pilot Purgatory Index | Analysis across 5 industries; full methodology not published | Concept 1 |
| Organizations with zero measurable AI return | 95% | MIT Project NANDA, July 2025 | 300+ initiatives, 52 interviews, 153 surveys. Note: "zero return" ≠ "technical failure" — includes deployed-but-not-measured | Concept 1 |
| Cost overrun pilot→production | 280% | Gartner 2024 (cited via Pertama Partners) | Gartner is primary source but full methodology not publicly available | Concept 1 |
| Multi-agent pilot failure within 6 months | 40% | Markets & Markets (cited via TechAhead) | Secondary citation | Concept 2 |
| Compound reliability math (P^n) | 95%^5 = 77.4% | Mathematical principle | Universally valid math; the 95% baseline is illustrative, not measured | Concept 2 |

### Tier 3 — Low confidence (blog posts, secondary citations, unverifiable) — DO NOT cite in demos

| Statistic | Value | Source | Issue |
|---|---|---|---|
| Successful pilots never reaching production | 73% | "MIT Sloan 2024" via Pertama Partners blog | Cannot independently verify the MIT Sloan publication |
| Companies abandoning AI initiatives | 42% | Blog posts attributing to "MIT/Playbook" | Third-hand citation; no primary source found |
| Planned vs actual timeline | 6 months → 18 months | Pertama Partners blog | No cited primary source for these specific numbers |
| Integration effort share | 40-60% of total | Pertama Partners blog | No cited primary source |
| Demo cost → production cost | $5-50 → $18K-90K/month | TechAhead blog | Estimated ranges from a software dev agency blog, not measured |
| Per-agent pilot accuracy | 95-98% → 80-87% production | TechAhead blog | Illustrative ranges, not from a specific system |
| User abandonment after 3s | 53% | Originally Google/Akamai web performance research | TechAhead applied a web page stat to AI agent response times — different context |

---

## Appendix B: Quick Reference — Existing vs. Proposed Demo Map

```
EXISTING (3 demos, built and live):
┌─────────────────────────────────────────────────────┐
│ Agent Pipeline Visualizer                            │
│ → Multi-agent orchestration, human checkpoint,       │
│   audit trail, 5-agent replay                        │
│ → Interaction: Play/replay with decision point       │
│ → File: script.js (lines 303-544)                    │
├─────────────────────────────────────────────────────┤
│ Prompt Refinement (Drag-and-Drop)                    │
│ → 2-stage prompt engineering, Role→Task→Context      │
│ → Interaction: Drag/tap through optimizer + AI       │
│ → File: prompt-demo.js (648 lines)                   │
├─────────────────────────────────────────────────────┤
│ Codebase Assessment (Static)                         │
│ → 8-workstream methodology walkthrough               │
│ → Interaction: Click-to-expand cards                 │
│ → File: index.html (inline)                          │
└─────────────────────────────────────────────────────┘

PROPOSED (Tier 1 — build first):
┌─────────────────────────────────────────────────────┐
│ 1. Pilot Purgatory Escape Simulator                  │
│ → Decision-based AI project survival game            │
│ → NEW interaction: Decision cards → dashboard        │
│ → Est: 10-14 hours                                   │
├─────────────────────────────────────────────────────┤
│ 2. Reliability Paradox Calculator                    │
│ → Multi-agent cost/reliability math tool             │
│ → NEW interaction: Add agents → live dashboard       │
│ → Est: 6-8 hours                                     │
└─────────────────────────────────────────────────────┘

PROPOSED (Tier 2 — build next):
┌─────────────────────────────────────────────────────┐
│ 3. Investment Intake Structuring Tool                │
│ → Vague idea → executive delivery plan               │
│ → EXTENDS: Drag-and-drop pattern                     │
│ → Est: 8-12 hours                                    │
├─────────────────────────────────────────────────────┤
│ 4. Governance Gate Designer                          │
│ → Drag governance controls onto pipeline             │
│ → EXTENDS: Drag-and-drop pattern                     │
│ → Est: 8-10 hours                                    │
└─────────────────────────────────────────────────────┘
```

---

**Owner:** Andrew Dean Martin  
**Related:** DRAG-DROP-DEMO-UX-RESEARCH.md, DEMO-CONCEPTS.md, ANDREW-MARTIN-PROFILE.md, RESEARCH-MISSIONS.md  
**Status:** Research complete, critically reviewed. Statistics verified against primary sources with confidence tiers. Build estimates adjusted for content creation. Ready for discussion on what to build.

---

*Last updated: February 2026*  
*Critical review completed: February 2026 — source verification, build estimate correction, constraint analysis added*
