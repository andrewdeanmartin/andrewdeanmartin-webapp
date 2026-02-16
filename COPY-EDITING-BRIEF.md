# Copy Editing Brief: andrewdeanmartin.com

> **Purpose:** All user-facing text from the portfolio site, organized by section, ready for copy editing review. Each block shows the section name, the current text, and notes on context/intent.
>
> **Live preview:** `http://localhost:8080/` (run `python3 -m http.server 8080` from the `site/` directory)
>
> **Source file:** `site/index.html`
>
> **Last updated:** February 2026. Matches current site: no Journey section, Impact = 3 cards (Weeks→Hours, 90%, 15+ Prototypes), Connect email andrewdeanmartin@gmail.com.

**How to resume work (for Cursor):** Open this file and say: *"I'm back on the portfolio. COPY-EDITING-BRIEF is source of truth for copy; live site is site/index.html. What should we tackle next?"* Or name a section (e.g. "Demos intro", "Impact", "Connect") to edit. Local preview: `python3 -m http.server 8080` from `site/`, then open http://localhost:8080.

**Narrative throughline:** The page is one story: *who* → *how* → *see it* → *proof* → *next*, all driving toward the north star *Turn AI ambition into what actually ships*. See **NARRATIVE-THROUGHLINE.md** for the flow and bridge copy. Bridge sentences (e.g. before Impact, before Connect) link each section to the next; keep them when editing.

---

## Site-Wide Meta

| Field | Current Text |
|-------|-------------|
| **Page title** | Andrew Dean Martin \| Turn AI Ambition into What Actually Ships |
| **Meta description** | I help leaders turn AI investment into solutions that work in their context. Senior Director, Advisory, PwC. A leader who speaks strategy and code, unblocks teams, and enables others so ideas become real, fast. |
| **OG title** | *(same as page title)* |
| **OG description** | *(same as meta description)* |

---

## Navigation

Links: **About** · **What I Do** · **Demos** · **Impact** · **Connect**

Logo text: **ADM**

---

## 1. Hero

**Badge:**
> Senior Director, Advisory, PwC

**Name:**
> Andrew Dean Martin

**Tagline:**
> Turning AI Ambition into
> What Actually Ships

**Description:**
> I help leaders turn AI investment into solutions that work in their context.<br>
> A leader who speaks strategy and code, I unblock teams, build when it matters, and enable others, so ideas become real, fast.

**CTAs:** "See It In Action" · "Connect"

---

## 2. About: "The Short Version"

**Section label:** About
**Section title:** The Short Version

**Paragraph 1:**
> I build something most days (until my Cursor limit hits). I'm the person teams call when AI ambition collides with delivery reality: unclear scope, legacy systems, compliance constraints, and a deadline that won't move.

**Paragraph 2:**
> 18 years in tech, 15 in consulting (PwC since 2010). Startups to Fortune 1; I've worked across the Americas, Asia, and Europe. I work across Salesforce, Microsoft Dynamics 365, Veeva, and Dataverse. I help turn roadmaps into working outcomes (demos, prototypes, use cases), often in the same week. Strategy, architecture, hands-on when it unblocks. The real challenge isn't having good ideas; it's making them real, governed, and scalable. The demos below show how.

**Stats:**
| Value | Label |
|-------|-------|
| 18+ | Years in Technology |
| 15+ | Production Prototypes Shipped |
| 4 | Territories Launched in 6 Months |

---

## 3. What Sets Me Apart: "How I Work"

**Section label:** What Sets Me Apart
**Section title:** How I Work

### Card 1 (featured, full-width):
**Title:** Strategy + Engineering in One Leader
**Body:**
> Unblock teams fast. I present to leadership and can ship the demo that moves the investment forward when it matters: narrative and CI/CD pipeline in the same week. Most people at my level do one or the other. I've been in both and lead teams that deliver.

### Card 2:
**Title:** Prototype-Led Leadership
**Body:**
> Stop debating abstractions. I lead with working demos (built in days, by me or the team) so stakeholders react to something real. A mediocre prototype beats a perfect deck.

### Card 3:
**Title:** AI as Method, Not Magic
**Body:**
> One-off experiments don't scale. Repeatable playbooks, prompt catalogs, and agent libraries so teams can adopt, adapt, and run without me.

### Card 4:
**Title:** Governance Without Bureaucracy
**Body:**
> Compliance blocks shipping unless it's built in from day one. Human-in-the-loop controls, audit trails, trace links. Solutions that survive production.

### Card 5:
**Title:** Startups to Fortune 1
**Body:**
> I've worked across the full spectrum: early-stage and the largest enterprises, in the Americas, Asia, and Europe. I don't need to learn your context from zero.

---

## 4. Demos: "See It In Action"

**Section label:** See It In Action
**Section title:** Demos

**Intro paragraph (starts with bridge from How I Work):**
> One run: 847 items, 612 auto-processed, 1 human checkpoint. Replay it below, then see the methodology, the assessment lens, and the reliability math. Four tools; built to be explored, not just watched.

**Tab names:** Agent Pipeline · Prompt Engineering · Codebase Assessment · Reliability Paradox

---

### Demo 4a: Agent Pipeline

**Intro:**
> From a real multi-agent run (anonymized). Cursor agents analyzed two schemas, hit a human checkpoint, produced a deliverable. Watch it replay.

**Input label:**
> **Input:** `agent-pipeline-run/00-input-schemas.json` (Legacy Order System → Target Commerce Platform).

**Flow description:**
> Flow: Source Analyzer → Recommendation Engine → **Human** → Risk & Compliance → Validation → Documentation

**Button labels:** "Play Replay" · "Reset"

**Pipeline completion heading:**
> ✅ Pipeline Complete: Workflow Analysis

**Completion stats:** 847 Items · 612 Auto-Processed · 202 Validations · 1 Checkpoint · 2–3 wk Timeline · 120 hrs Effort

**Human checkpoint title:**
> Human Decision Required

**Checkpoint context:**
> Item #447 outside standard categories: 3 dependencies, 2 workflow paths.

**Checkpoint question:**
> How should this edge case be handled?

**Decision options:**

| Option | Description |
|--------|-------------|
| Create Custom Path | Define a new category and routing rule for this item type |
| Merge Into Existing | Map to the closest match with manual override flag |
| Escalate for Review | Flag for stakeholder input before proceeding |

**Audit trail heading:** Audit Trail

**Audit trail lines (scripted replay):**
1. `[18:00:00] Pipeline initiated: Workflow Analysis | 847 items | 2 sources`
2. `[18:00:15] Agent: Source Analyzer | Status: Complete | Items: 847 | Sources: 2 | Quality Issues: 28%`
3. `[18:01:42] Agent: Recommendation Engine | Status: Complete | Auto-categorized: 612 | Human Review: 3 edge cases`
4. `[18:01:45] PIPELINE PAUSED: Human decision required (confidence < threshold): Item #447`
5. `[18:02:30] HUMAN DECISION: [user choice]. Pipeline resuming...`
6. `[18:03:15] Agent: Risk & Compliance | Status: Complete | Sensitive Items: 14 | Checklist: 47 | Risk: MEDIUM-HIGH`
7. `[18:04:42] Agent: Validation Generator | Status: Complete | Rules: 202 | Effort: 48 hrs`
8. `[18:05:55] Agent: Documentation Synthesizer | Status: Complete | Follow-ups: 3 | Effort: 120 hrs`
9. `[18:05:58] Pipeline complete: All 5 agents finished. 1 human decision recorded.`

---

### Demo 4b: Prompt Engineering (SharpPrompt)

**Intro:**
> Vague requests → useless output. Transform "I need X" into prompts that actually work. Role → Task → Context → Requirements → Output. Useful output, not garbage.

**Drag source label:**
> Your rough prompt: drag or tap into the Optimizer →

**Scenario hint (default):**
> Typical vague ask from a delivery lead

**Scenario buttons:** Stakeholder Update · Architecture Review · Migration Analysis

**Stage 1 label:**
> Prompt Optimizer: Step 1: Refine

**Stage 1 header:** Prompt Engineer · Meta-Prompt Assistant

**Stage 1 drop hint:**
> Drop or tap your prompt here

**Stage 2 label:**
> ChatGPT / Claude: Step 2: Use in ChatGPT

**Stage 2 header:** ChatGPT · GPT-4

**Stage 2 drop hint:**
> Drop or tap refined prompt here

**Play button:** "▶ Or Play to watch"
**Reset button:** "↻ Reset & try again"

**Overlay instructions:**
> Drag your prompt into the left panel to refine it, then drag the result into the right panel.
> On mobile, tap instead of drag.

**Info card title:** Why Structured Prompts Matter

**Info card body:**
> **The problem:** Vague prompts like "update leadership on the project" produce inconsistent, low-quality outputs. No repeatability, no audit trail, no governance.
>
> **The solution:** Structured prompts using Role → Task → Context → Requirements → Output eliminate ambiguity and produce consistent, professional results. Part of the methodology I use with delivery teams and AI Champions.
>
> **Governance:** Structured prompts enable traceability and reuse. In delivery we pair this with change tracking (who refined what, when). Teams adopt templates that survive production.

**Scenario rough prompts:**

| Scenario | Rough Prompt |
|----------|-------------|
| Stakeholder Update | "update leadership on the project" |
| Architecture Review | "check if this system is ready for production" |
| Migration Analysis | "analyze this for migration" |

> *Note: The refined prompts and final answers for each scenario are long-form content (30-60 lines each) stored in `site/prompt-demo.js` in the `scenarios` object. They contain detailed structured prompt templates and sample outputs. If the copy editor wants to review those, they should open that file directly.*

---

### Demo 4c: Codebase Assessment

**Intro:**
> Representative of engagements across enterprise codebases. Before you acquire or integrate: know exactly what needs fixing and how long it'll take. 8 workstreams: architecture, security, testing, performance, and more.

**Walkthrough step 1 label:** 8 Workstreams
**Walkthrough step 1 body:**
> Architecture, Code Quality, Security, Dependencies, Testing, Performance, Technical Debt, Documentation. Each evaluates specific dimensions and produces findings with severity and remediation estimates.

**Walkthrough step 2 label:** Sample findings

**Finding 1:**
> **[High] Architecture**: Monolithic backend with 47 direct database connections across 12 services. No API gateway or service mesh. Any schema change risks cascading failures.
> *Remediation:* Introduce API gateway. Prioritize extraction of highest-traffic services. Estimated effort: 120 hours.

**Finding 2:**
> **[Critical] Security**: 3 API endpoints accept unvalidated user input passed directly to database queries. SQL injection confirmed in staging.
> *Remediation:* Parameterized queries, input validation middleware, penetration test. Estimated effort: 24 hours.

**Finding 3:**
> **[Medium] Testing**: 23% overall coverage. Integration tests absent for 8 of 12 API endpoints. 14 flaky tests.
> *Remediation:* Prioritize integration tests for payment and auth. Target 60% coverage for critical paths. Estimated effort: 80 hours.

**Walkthrough step 3 label:** Executive Summary

| Metric | Value |
|--------|-------|
| Overall Health Score | 6.4 / 10 |
| Critical Findings | 3 |
| High Priority | 7 |
| Medium Priority | 12 |
| Estimated Remediation | 8–12 weeks (phased) |

---

### Demo 4d: Reliability Paradox Calculator

**Intro:**
> Every agent you add multiplies risk. A 5-agent pipeline at 95% per-agent reliability succeeds only 77% of the time. The same mitigations we use to harden pipelines like the one in the first tab. Explore the math, then toggle production mitigations to see how engineering closes the gap.

**Calculator title:** The Reliability Paradox

**Calculator subtitle:**
> Add agents, watch reliability degrade, then apply mitigations to see the difference.

**Hook stat:**
> **77%**: If each agent succeeds 95% of the time, a 5-agent pipeline succeeds only **77% of the time**. At 10,000 daily runs, that's **2,262 failures per day**.

**Slider label:**
> Per-agent reliability: 95%

**Button labels:** "+ Add Agent" · "Reset" · "Max 10 Agents" (disabled state)

**Dashboard metric labels:**
- Pipeline Reliability
- Cost per Run
- Latency
- Daily Failures (10K runs)
- Monthly Cost (10K/day)

**Warning messages (triggered dynamically):**
> Reliability below 90%. At enterprise scale, this means unpredictable failures across the pipeline.

> At 10,000 daily requests, **[X] fail per day**. That's [Y] failed requests per month.

> Monthly cost exceeds **$[Z]** at scale. Production mitigations can reduce this significantly.

**Mitigation toggle label:**
> Apply Production Mitigations

**Mitigation items:**

| Name | Description |
|------|-------------|
| Circuit Breakers & Retry | Catch failures early with automatic retry. Effective reliability improves significantly |
| Response Caching | Cache common reads. Reduces cost by ~40% |
| Parallel Execution | Run independent agents concurrently. Reduces latency by ~35% |
| Single-Agent Fallback | Floor pipeline reliability at 90% with graceful degradation |

**Insight card title:** Why This Matters

**Insight card body:**
> The compound reliability formula (P^n) illustrates why multi-agent architectures need production engineering (retries, circuit breakers, fallbacks), not just prompt engineering. The gap between "works in demo" and "works at scale" is where most AI initiatives stall.

**Transparency note:**
> *This model uses simplified compound reliability (P^n) to illustrate the principle. Real systems have retries, parallel paths, and correlated failures. Adjust the slider to explore different baselines.*

**Agent names (rendered by JS):**
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

---

## 5. Impact: "Results That Speak"

**Section label:** Impact
**Section title:** Results That Speak

**Bridge (handoff from Demos):**
> This way of working has produced measurable results.

**Intro paragraph:**
> Three things that matter most: take the full cycle (assessment, recommendations, and a real prototype) from weeks to hours; cut cycle time by orders of magnitude; and ship demos that move decisions.

| Metric | Label | Context |
|--------|-------|---------|
| Weeks → Hours | Full Cycle to Artifact | From assessment through recommendations to something you can actually run. What used to take weeks now happens in hours. Real artifact, not just a deck. |
| 90% | Cycle Time Cut | Built a GenAI-powered tool that compressed survey and assessment cycles by up to 90%. |
| 15+ | Prototypes Shipped | Working demos that accelerated investment decisions and unblocked client conversations. |

---

## 6. Connect: "Let's Compare Notes"

**Section label:** Connect
**Section title:** Let's Compare Notes

**Bridge (handoff from Impact):**
> If that sounds like the partnership you need, let's talk.

**Body:**
> Working on AI delivery, enterprise modernization, or making agentic systems work in regulated environments? I'd like to hear about it.

**CTAs:** LinkedIn · Email (andrewdeanmartin@gmail.com)

---

## 7. Footer

**CTA text:**
> Working on AI delivery or enterprise modernization? Let's talk.

**CTA button:** "Get in Touch"

**Copyright:** © 2026 Andrew Dean Martin

**Disclaimer:**
> Views and projects on this site are my own and do not represent PwC.

**Easter egg hint:** Hand-built. Vanilla. ▲▲▼▼◄►◄►

---

## Console Easter Egg (for developers who View Source)

```
Andrew Dean Martin
AI Delivery Leader | Strategy + Engineering + Execution
View source? You get it. Let's talk: linkedin.com/in/andrewdeanmartin
```

---

## Files for Full Review

| File | What it contains |
|------|-----------------|
| `site/index.html` | All section text, demo content, meta tags |
| `site/prompt-demo.js` | Three scenario prompts, refined outputs, and final answers (~340 lines of copy in the `scenarios` object) |
| `site/reliability-calc.js` | Agent names, warning message templates, mitigation descriptions |
| `site/script.js` | Audit trail lines, human checkpoint text, console easter egg |

---

## Key Context for the Copy Editor

- **Primary audience:** Partners, C-suite buyers, recruiters, and technical peers (see `BRAND-PERSONAS.md` for detailed persona breakdowns)
- **Tone target:** Confident but not arrogant. Direct. Data-driven. Conversational with peers, more formal for analysis. Avoids jargon-for-jargon's-sake.
- **Brand voice phrases Andrew uses naturally:** "Happy to lean in here and help", "POC", "bias for action"
- **Key narrative:** "Strategy AND code in one person": this is the differentiator
- **PwC sensitivity:** The disclaimer in the footer is important. Content should not make claims on behalf of PwC or reference specific client names.
- **Full profile reference:** See `ANDREW-MARTIN-PROFILE.md` for complete professional context
