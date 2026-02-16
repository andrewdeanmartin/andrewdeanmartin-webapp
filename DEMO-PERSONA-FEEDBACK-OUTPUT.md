# Demo Persona Feedback — Output

Generated from DEMO-PERSONA-FEEDBACK-PROMPT.md (two questions: useful to persona? helpful for webapp goal?).  
Date: February 2026.

---

## Per persona

### David (Partner / MD)

**Were the demos useful to you?** **Yes.** The Agent Pipeline is the anchor—real numbers (847 items, 612 auto-processed, human checkpoint, 2–3 wk → 120 hrs) and a retellable story: “human-in-the-loop and governance are built in.” The Reliability Paradox calculator gives a one-liner (95%^5 → 77%, then mitigations close the gap) that shows you think about production, not just demos. Codebase Assessment adds a clean M&A/integration story. SharpPrompt is more methodology than client proof for me, but the set together says strategy + delivery in one person with concrete evidence.

### Sarah (C-Suite buyer, CDO/CTO)

**Were the demos useful to you?** **Yes.** The Agent Pipeline is exactly what I look for: a live artifact with an audit trail and a real human checkpoint (Create Custom Path / Merge / Escalate), not a deck. That signals governance isn’t an afterthought. Reliability Paradox speaks to “what happens after the pilot”—compound risk and production mitigations—so it doesn’t feel like consulting-speak. Prompt Engineering’s Role → Task → Context → Requirements → Output and Codebase Assessment’s 8 workstreams and severity/remediation show technical depth. I’d want to click through to confirm it’s interactive and not a static walkthrough, but the descriptions point to someone who builds and governs.

### Rachel (Executive recruiter)

**Were the demos useful to you?** **Partly.** I need “strategy + engineering” and 3 proof points in 30 seconds. The four demos give that: Pipeline (real run, human gate, stats), SharpPrompt (vague → useful), Codebase Assessment (findings + effort), Reliability Paradox (demos vs production). The *labels* are scannable and the outcomes are named (847 items, 6.4/10 health, 77% pipeline success). What’s missing in the descriptions is how fast I can *see* that—if the tabs and copy make the proof obvious in one scroll, that’s a Yes. If I have to dig into each tab to get it, I might move on. So: useful content, but usefulness depends on how quickly the page surfaces it.

### Marcus (Alliance / GTM)

**Were the demos useful to you?** **Partly.** The demos show someone technical enough to build (Pipeline, SharpPrompt, Reliability calculator) and senior enough to talk governance and production—good for co-sell and co-deliver. Codebase Assessment and Pipeline replay are reference-able. The gap is platform linkage: the descriptions don’t call out Salesforce, Dynamics, Veeva, or a specific stack, so I can’t yet say “this person fits our PwC–[platform] motion.” If the site or copy elsewhere ties Andrew to our stack or named alliances, that would push this to Yes. As-is: strong technical and governance signal; I’d still need one clear “here’s how this maps to your platform” hook.

---

## Overall: Are these demos helpful for the webapp’s goal?

**Yes.** The webapp’s goal is to help Partners, C-Suite, recruiters, and alliance partners see proof that Andrew turns AI ambition into what actually ships, so they refer, hire, or connect. The four demos support that: they’re concrete (real run, real numbers, human checkpoint, production mitigations, 8 workstreams, severity/remediation), they show both strategy and hands-on delivery, and they’re differentiated—Pipeline and Reliability Paradox in particular are not generic. They don’t get in the way. The main risks are (1) recruiters need the proof to be scannable in seconds, and (2) alliance/GTM may want a clearer platform or stack link. Tightening the Demos intro or tab labels for speed-to-proof, and adding a single platform/alliance cue somewhere, would make the demos even more helpful for the goal.

---

## Critical take: why they suck

**1. Nothing is actually live.** Agent Pipeline is a *replay* — predetermined path, scripted checkpoint. Codebase Assessment is explicitly "no live tool," i.e. a walkthrough with sample findings. So two of four demos are not systems you can use; they're stories. Sarah (burned by decks that never shipped) is right to be suspicious: "live artifact" in the description doesn't mean the thing is running in production. It means "we replayed a run." That's one step above a slide.

**2. The numbers might be theater.** 847 items, 612 auto-processed, Health 6.4/10, 2,262 failures/day — if those aren't tied to a real engagement (even anonymized), they're placeholders. "Real run" is claimed; "which client, which codebase, which pipeline in production" isn't. A skeptical Partner or CTO can dismiss the whole set as illustrative. Proof requires provenance. Right now it's optional.

**3. SharpPrompt is a commodity.** Every AI workshop has a "bad prompt → good prompt" bit. Role, Task, Context, Requirements, Output is standard structure. Drag-and-drop into ChatGPT/Claude is expected. So what's the differentiator? "Governance and traceability" — is there an actual audit trail in the demo or just copy? If there's no artifact that shows who changed what when, it's methodology theater. Doesn't prove you *shipped* anything; proves you know the framework.

**4. Reliability Paradox is a single-idea widget.** The math (95%^5 → 77%) is correct and well known. The calculator is nice. But it doesn't connect to the Agent Pipeline. If the Pipeline demo doesn't show retry, caching, fallback, or circuit breakers in action, then "production mitigations" is a separate lesson, not proof that *your* pipeline uses them. So you have two demos that could be one story — or the Reliability demo floats as generic education, not evidence.

**5. Four tabs is a lot for 30 seconds.** Recruiters and busy C-Suite don't click four tabs. They skim one. If the first tab (Pipeline) doesn't land, or if the section doesn't surface one killer line above the fold ("We ran 847 items through a multi-agent pipeline with a human gate — here's the replay"), the rest might as well not exist. The demos may be too heavy for the attention they'll get. Design restraint can backfire: calm reads as low energy when someone's scanning.

**6. No platform, no alliance hook.** Marcus can't use this page to slot Andrew into a PwC–Salesforce or PwC–Veeva narrative. The demos are platform-agnostic. For alliance/GTM, that's a miss. The content says "technical, governance, delivery"; it doesn't say "this person fits *your* stack." So for one of the four key audiences, the demos are partly irrelevant.

**7. Same story, four wrappers.** Governance, human-in-the-loop, production readiness, methodology — every demo hits the same notes. A skeptic could say: one message, repeated. Differentiation (Pipeline = scale + gate, SharpPrompt = repeatability, Assessment = M&A, Reliability = compound risk) exists but isn't forced. If the visitor doesn't read the labels, it blurs.

**Bottom line:** The demos don't suck as *content* — they're specific and technically credible. They suck *relative to the claim* ("turn AI ambition into what actually ships") because (a) most of it isn't provably *shipped* in the sense of "running for a client," (b) the numbers lack provenance, (c) one demo is a walkthrough and one is a replay, and (d) for recruiters and alliance, the format and missing hooks make the proof easy to miss or hard to use. Fix: tie numbers to real (anonymized) engagements, make the Pipeline/Reliability link explicit, surface one killer proof line before the tabs, and add one platform/alliance cue.

---

## What we can do about it (within constraints)

**Constraints:** Vanilla HTML/CSS/JS only; no backend, no live pipeline or real assessment tool; no client names (NDA); design stays restrained. So: **copy, structure, and one-line proof** — no new systems.

| Priority | Action | Why it helps |
|----------|--------|---------------|
| **1** | **One killer line before the tabs** — Put the proof in the first sentence of the Demos section: e.g. *"One run: 847 items, 612 auto-processed, 1 human checkpoint. Replay it below, then see the methodology, the assessment lens, and the reliability math."* | 30-second scanners (recruiters, busy C-Suite) get the headline without clicking. Reduces "four tabs is too much." |
| **2** | **Provenance in copy** — In the Pipeline panel: add *"From a real multi-agent run (anonymized)."* In Codebase Assessment intro: add *"Representative of engagements across enterprise codebases."* | Doesn't name clients but signals "not placeholder numbers." Addresses "numbers might be theater." |
| **3** | **Pipeline–Reliability link** — In the Reliability Paradox panel intro, add one sentence: *"The same mitigations we use to harden pipelines like the one in the first tab."* | Makes the calculator evidence about *your* pipeline, not generic education. |
| **4** | **Platform / alliance cue** — One line in About (e.g. after "Americas, Asia, and Europe"): *"I work across Salesforce, Microsoft Dynamics 365, Veeva, and Dataverse."* | Gives Marcus (and GTM) a stack hook without changing design or tech. |
| **5** | **SharpPrompt: set expectation** — In the info card or intro, add: *"In delivery we pair this with change tracking (who refined what, when)."* | Clarifies the demo is methodology; full traceability is in delivery. Avoids overselling. |

**What we're *not* doing (out of scope):** Making the Pipeline live; turning Codebase Assessment into a real tool; naming clients; adding a new backend or framework. Those would fix the "nothing is live" critique but break the constraints. The above actions improve credibility and scannability within the current stack.
