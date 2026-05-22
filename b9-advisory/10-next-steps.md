# # 10 — Next Steps

# 10 — Next Steps

**For:** Andrew (advisor)
**Timeframe:** Next 2 weeks
**Goal:** Get from "research complete" to "Brenda has a focused recommendation"

---

## This week (Week of May 25, 2026)

### Monday-Tuesday — Read + decide
- [ ] **Read this package end-to-end** (~80 min) OR speed-read 01 + 04 + 07 + 10 (~30 min)
- [ ] **Decide whether you agree with the package** — push back on anything that doesn't feel right
- [ ] **Decide if you're sending the discovery email this week or next**

### Tuesday-Wednesday — Repo cleanup (5-10 minutes each)
These are blockers if you're going to show anything to Brenda. Do them before any client interaction.

- [ ] **Kill the Bucs theme on `b9-ai-portal`** — swap `#D50A0A` (red) / `#FF7900` (orange) / `#34302B` (brown) for the black/gold from b9-experience (`#000` / `#C5A059`). 5-minute design token edit. Find/replace in:
  - `src/app/page.tsx` (multiple instances)
  - `src/app/globals.css` (if defined there)
  - Any other component using those hex values
- [ ] **Watermark or remove the fake demo metrics** in `b9-experience/src/app/admin/page.tsx` ("94% pass rate", "37% no-show reduction", "Active Events: 23", "Staff on Assignment: 147"). Either add prominent "DEMO DATA — REPLACE BEFORE CLIENT USE" banner OR remove and leave the layout with placeholder text.
- [ ] **Decide which codebase you'll show** (if any) to Brenda:
  - **Option 1:** Show neither. The discovery conversation is enough.
  - **Option 2:** Show the b9-ai-portal **after** the theme fix. Frame as "concepts I worked through to think about this."
  - **Option 3:** Show the b9-experience admin **after** demo data fix. Frame as "what L3 could look like for some of these — illustrative."
  - **Recommended:** Option 1 for first call. Show portal only if she explicitly asks "can I see what you built?"

### Wednesday — Send Brenda's email
- [ ] **Send the pre-meeting email** from [`07-BRENDA-DISCOVERY-AGENDA.md`](./07-BRENDA-DISCOVERY-AGENDA.md) (the boxed quote)
- [ ] **Attach** [`01-EXECUTIVE-SUMMARY.md`](./01-EXECUTIVE-SUMMARY.md) as optional pre-read
- [ ] **Propose 3 time slots** within next 2-3 weeks (90 min preferred, 60 min acceptable)

### Thursday-Friday — Prep
- [ ] **Prep your own notes** for the conversation (don't bring a deck)
- [ ] **Re-read** [`07-BRENDA-DISCOVERY-AGENDA.md`](./07-BRENDA-DISCOVERY-AGENDA.md) before the call
- [ ] **Set up the answer-capture template**: one Google Doc with the 8 questions, room to note Brenda's answers, plus the "implication" decision matrices from question 1 ready to reference

---

## Next week (Week of June 1, 2026)

### When Brenda's call happens
- [ ] **Take notes during the call** — verbatim where possible on Q1, Q4, Q7
- [ ] **Don't promise vendor recommendations on the call** — these need post-call review
- [ ] **Confirm next-steps boundary at the close** — you'll send revised recommendation within a week

### Within 24 hours of the call
- [ ] **Document Brenda's 8 answers** with explicit notes
- [ ] **Identify which Branch** (A/B/C/D) her answers pattern to — see [`08-RECOMMENDED-PHASING.md`](./08-RECOMMENDED-PHASING.md)
- [ ] **Update** [`04-USE-CASE-PORTFOLIO-V2.md`](./04-USE-CASE-PORTFOLIO-V2.md) with the new sequencing
- [ ] **Flag any compliance-relevant geography answers** that affect ROI-08 / ROI-07 / ROI-06 redesigns

### Within 3 days of the call
- [ ] **Draft "3 to Start With" recommendation** for Brenda — 1-page focused doc:
  - The 1-2 sentences of context she gave that justify this priority
  - 3 specific use cases (could be from existing 14 + 1-2 new additions, or 3 new additions)
  - For each: what it does, what it costs (time + $), what success looks like at 90 days
  - One paragraph of "what I'd not start with and why"
  - The 1-2 compliance items that need her legal counsel before any pilot
- [ ] **Confirm with yourself**: is this realistic given Brenda's bandwidth + her team's bandwidth? Push back on your own recommendation if it's too much.

### Within 1 week of the call
- [ ] **Send Brenda the focused 1-page recommendation**
- [ ] **Loop in any team members** Brenda mentioned (coordinator, ops lead) for short follow-up if appropriate
- [ ] **Set expectation**: "If you want to pilot anything, here's roughly what it takes. If you want to think about it for a while, also fine — I'll check back in a month."

---

## Two weeks out and beyond

### If Brenda says yes to piloting something
- [ ] **Decide your role going forward**:
  - **Option A:** Continue as friend-advisor for setup of 1-2 use cases (10-20 hours over a month). Unpaid.
  - **Option B:** Hand off to a contractor or internal B9 person Brenda trusts. Provide intro + setup notes.
  - **Option C:** Scope a paid engagement (week-long sprint, defined deliverable). Quote it transparently.
- [ ] **Honest read on your own bandwidth** — don't over-commit. The hardest part of friend-favor work is graceful boundary-setting.

### If Brenda says "let me think about it"
- [ ] **Close the loop graciously** — "Take your time, no pressure"
- [ ] **Add a 30-day check-in to your calendar** — light touch follow-up email
- [ ] **Add a 90-day check-in** — if no response, drop it. Don't badger.
- [ ] **Move on** — most of the personal benefit you wanted (taste development, AI advisory practice, firm-promotion case study) is already captured in the work itself

### If Brenda says no or doesn't respond
- [ ] **No follow-up beyond the 30/90-day check-ins**
- [ ] **You've still gained**: deep familiarity with event-staffing AI landscape, a tested research-engine workflow for client-facing advisory, a portfolio of artifacts you can show as past work
- [ ] **Consider** writing this up as a firm-level case study per the `craft-self-review` skill — patterns from this engagement are reusable for any small services firm

---

## Things to NOT do

### Do not
- ❌ Send Brenda the full 10-document package as the pre-read — overwhelming
- ❌ Bring a deck to the discovery call — it's a conversation, not a presentation
- ❌ Name-drop vendor tools at the call — talk in capabilities
- ❌ Quote specific ROI numbers for B9 — use industry directional language
- ❌ Pitch paid work in the discovery conversation — separate concern
- ❌ Show her the Bucs-themed portal — fix the theme first, or skip showing entirely
- ❌ Lecture her on compliance — one mention, then move on
- ❌ Promise to build anything in the call — that's a post-call decision
- ❌ Bring the research brief verbatim — it's too dense for any client

### Do
- ✅ Listen more than you talk during the call (target: she talks 70% of the time)
- ✅ Acknowledge the work is incomplete and conditional on her answers
- ✅ Push back on yourself if any recommendation feels too consultant-y
- ✅ Be transparent about uncertainty (confidence levels are MEDIUM for a reason)
- ✅ Honor the friend-favor nature — bring expertise, not consulting clothes
- ✅ Set clear next-step boundaries
- ✅ Take care of your own time budget — don't burn 100 hours on this

---

## Personal craft notes (for Andrew)

This engagement is a useful case study for your own development. Things to capture for future reuse:

### What worked in this advisory pattern
- **Discovery-first, build-second** — even on a "we already built two prototypes" starting point, sliding back to discovery is the right move
- **Research-engine as scoping accelerator** — produced 22 use cases worth of structured thinking in <2 hours of agent time
- **Adversarial validation** — Red Team caught real overclaims; Blue Team softened wording without losing direction
- **Branch-based phasing** — replaces the "here's the roadmap" trap with "here's the decision logic"

### What you'd do differently next time
- **Talk to Brenda before building anything next time** — the two prototypes were valuable as exploration but the research could have been done first
- **Resolve the "what is this" question earlier** — paid engagement / friend-favor / firm-positioning artifact all imply different sizing
- **Don't carry forward Bucs theme** — basic hygiene; would have been embarrassing if Brenda had asked to see it earlier

### What's reusable for the next small-services-firm friend
- The barrel-delivery-workflow methodology (engagement-hypothesis → feature-spec → review-pipeline → production-gap-brief)
- The 8-question discovery agenda template (substitute industry-specific questions)
- The Branch-based phasing structure
- The compliance design-rules pattern (US labor law is the same across industries; specific regs vary)
- The vendor matrix scaffolding

### Promotion candidates for the firm
Per `craft-self-review` skill output, things from this engagement worth promoting up at PwC:
- **"AI Activation Roadmap for sub-50-person services firms"** — repeatable framework
- **"Compliance design-rules pattern for AI in 1099 staffing"** — pre-built artifact
- **"Discovery-first vs build-first for AI advisories"** — methodology note

---

## How you'll know this worked

In 6 months, you'll know this engagement worked if any of:
- Brenda has piloted 1-2 use cases and is seeing measurable improvement (best outcome)
- Brenda has tried to pilot something and learned what doesn't work for B9 (also good — learning)
- Brenda used the package to think about her business differently, even if she didn't pilot anything (acceptable outcome)
- You've used the methodology for another small-services-firm friend (compounding personal benefit)
- The firm-promotion candidates landed (compounding professional benefit)

In 6 months, you'll know it failed if:
- Brenda ghosted and you can't tell why (recoverable — ask)
- You spent >100 hours on follow-up and got nothing (avoidable — set the boundary now)
- Anything you recommended created compliance exposure for B9 (mitigate via mandatory counsel review on the 4 affected use cases)
- The package became shelfware (likely if the discovery conversation was skipped — don't skip)

---

## Final check

Before you send Brenda's email, ask yourself one question:

> **If I imagine Brenda 6 months from now telling me what was most useful about this whole exchange, what's she most likely to say?**

If your honest answer is "the specific use case ideas" or "the vendor recommendations" — you're probably wrong, and the package is too consulting-y. **Revise toward listening.**

If your honest answer is "the focused 3-thing recommendation that fit my actual business" — you're on track. The package is built to produce exactly that focused output.

If your honest answer is "you helped me think more clearly about what to do" — you're nailing it. That's the best outcome for friend-favor advisory.

---

## End state of this package

After this work, you should have:

| Artifact | Owner | Status |
|---|---|---|
| 10-file advisory package | Andrew (this folder) | ✅ Complete |
| Research brief `rb-488a69b52a6a` | Archived | ✅ Complete |
| Discovery email sent to Brenda | Andrew → Brenda | ⬜ Week 1 |
| Discovery call held | Both | ⬜ Week 1-2 |
| Portfolio V2 updated with Brenda's answers | Andrew | ⬜ Week 2-3 |
| Focused 3-thing recommendation sent | Andrew → Brenda | ⬜ Week 3 |
| Brenda's decision | Brenda | ⬜ Week 3-4 |
| Bucs theme fixed in b9-ai-portal | Andrew | ⬜ Week 1 (blocker if showing portal) |
| Compliance counsel review of 4 use cases | Brenda + B9 counsel | ⬜ If any pilot starts |
| Phase 1 pilot ships | Brenda's team | ⬜ Month 1+ |
| Phase 2 use cases selected | Brenda + Andrew (advisory) | ⬜ Month 3-4 |

---

That's it. **Read 01 + 04 + 07. Send the email. Hold the call. Send the focused recommendation. Stop.**

The package exists to make that arc easy. Don't over-build.

