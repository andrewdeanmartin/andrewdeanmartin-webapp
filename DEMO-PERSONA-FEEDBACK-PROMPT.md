# Demo Persona Feedback Prompt

**Goal of the webapp:** Help key visitors (Partners, C-Suite buyers, recruiters, alliance partners) see proof that Andrew can turn AI ambition into what actually ships, so they take the next step — refer, hire, or connect.

**Two questions we want answered:**
1. **Per persona:** Were the demos **useful** to them?
2. **Overall:** Do the demos **help the webapp’s goal**?

**How to use:** Copy from **"INSTRUCTIONS FOR THE AI"** to the end of this file into a **new chat**. The AI will role-play David, Sarah, Rachel, and Marcus and return: for each, “Were the demos useful?” (Yes/Partly/No + why), then overall “Are these demos helpful for the webapp’s goal?”

Optional: run the site locally first (`cd site && python3 -m http.server 8080`, open http://localhost:8080), click through the demos, then paste the prompt so the AI can reason from your experience or the descriptions in the prompt.

---

## INSTRUCTIONS FOR THE AI (copy from here to end of file)

You are evaluating a **portfolio site** (andrewdeanmartin.com).

**Stated goal of the webapp:** Help key visitors (Partners, C-Suite buyers, recruiters, alliance partners) see proof that Andrew can turn AI ambition into what actually ships, so they take the next step — refer him, hire him, or connect.

Answer **two things only**:

1. **For each persona (David, Sarah, Rachel, Marcus):** Were the demos **useful** to this persona? (Useful = helped them decide “this person can do what I need” or “I want to talk to them.”) Give **Yes / Partly / No** and 2–4 sentences *why* for each.
2. **Overall, for the site owner:** Are these demos **helpful for the webapp’s goal**? One short paragraph: do the demos support the goal above, or do they get in the way / fall flat for the people who matter?

If you cannot run the live site, reason from the persona and demo descriptions below. Be specific (e.g. name which demo or element mattered).

---

### The four demos (what’s on the page)

**1. Agent Pipeline** — Replay of a real multi-agent run: schemas analyzed, **human checkpoint** for an edge case (user picks Create Custom Path / Merge / Escalate), then Risk & Compliance, Validation, Documentation. Audit trail and completion stats (847 items, 612 auto-processed, 1 checkpoint, 2–3 wk, 120 hrs). Message: human-in-the-loop and governance are built in.

**2. Prompt Engineering (SharpPrompt)** — Drag rough prompt (e.g. “update leadership on the project”) into Prompt Optimizer; get refined prompt (Role → Task → Context → Requirements → Output); drag that into ChatGPT/Claude panel. Scenarios: Stakeholder Update, Architecture Review, Migration Analysis. Message: vague → useful; methodology is reusable; governance and traceability.

**3. Codebase Assessment** — Walkthrough (no live tool): 8 workstreams (Architecture, Security, Testing, etc.), sample findings with severity and remediation, executive summary (e.g. Health 6.4/10, Critical 3, 8–12 weeks remediation). Message: before you acquire or integrate, you get concrete findings and effort.

**4. Reliability Paradox** — Interactive calculator: “5 agents at 95% each → 77% pipeline success; 2,262 failures/day at 10K runs.” Slider for per-agent reliability, add agents, dashboard (reliability, cost, latency, failures, monthly cost), toggle “Apply Production Mitigations” (retry, caching, parallel, fallback). Message: demos vs production; engineering closes the gap.

---

### The personas

**David (Partner / MD)** — Needs someone who can *build* AI things for clients and give a retellable proof point. Says yes to: specific outcomes, governance, strategy + delivery in one person. Moves on if: vague, too complex, no client-facing evidence.

**Sarah (C-Suite buyer, CDO/CTO)** — Burned by decks that never shipped. Wants a live artifact, governance credibility, enablement (not dependency). Moves on if: consulting-speak, no technical depth.

**Rachel (Executive recruiter)** — Filling VP AI / Head of Digital roles. Needs to grab “strategy + engineering” and 3 proof points in 30 seconds. Says yes to: scannable, specific, named outcomes. Moves on if: generic, no impact visible.

**Marcus (Alliance / GTM)** — Needs PwC people who can co-sell and co-deliver; technical enough to demo, senior enough to influence. Says yes to: platform credibility, reference stories. Moves on if: platform-agnostic, no public link to their stack.

---

### Output format

**Per persona (David, Sarah, Rachel, Marcus):**

- **Were the demos useful to you?** [Yes / Partly / No]. [2–4 sentences why.]

**Then:**

- **Overall: Are these demos helpful for the webapp’s goal?** [One short paragraph for the site owner.]

---

End of instructions. Please run the task above and return the feedback.
