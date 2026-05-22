# # 05 — Compliance Design Rules

# 05 — Compliance Design Rules

**Status:** HIGH confidence (Tier 1 regulatory sources)
**Scope:** Design rules for 4 affected use cases — does NOT replace legal review
**Applicability:** US-only (EU AI Act adds requirements if B9 ever takes EU work)

> **This document is not legal advice.** It identifies design constraints based on regulatory research and recommends defensive patterns. Brenda should run any AEDT-flagged use case past employment counsel before deployment, especially any use case scored "HIGH-RISK" below.

---

## The 4 in-force / imminent regulations that hit B9

### 1. NYC Local Law 144 — Automated Employment Decision Tools (AEDT)
- **Effective:** January 1, 2023 | **Enforcement since:** July 5, 2023
- **Penalty:** $500 first violation + **$1,500 per day** ongoing
- **2026 update:** DCWP committed to proactive (not complaint-driven) investigation
- **Scope:** Any AI scoring/ranking/recommending **NYC-resident candidates** triggers:
  - Annual independent bias audit (4/5ths rule across EEO-1 categories)
  - Public posting of audit results on website
  - 10-business-day pre-notice to candidates with right to alternative selection process

### 2. Illinois HB 3773 — AI in Employment Act
- **Effective:** **January 1, 2026** (recent)
- **Applies to:** Any employer with ≥1 Illinois employee for ≥20 calendar weeks
- **Critical:** "Use" = AI **influences or facilitates** a decision (human-in-loop does NOT exempt)
- **Penalty:** Private right of action through Illinois Human Rights Act; damages recoverable
- **Required:** Disclosure in job postings + annual notice to all affected employees + non-discrimination
- **Public comment period through June 10, 2026** for implementation rules

### 3. DOL Independent Contractor NPRM
- **Status:** Proposed Feb 26, 2026; final expected late summer/fall 2026
- **Test:** "Economic reality" with 2 core factors:
  - Worker's control over the work (schedule, project selection, exclusivity, workload)
  - Worker's opportunity for profit/loss based on initiative/investment
- **Critical:** **Actual practice beats contract labels.** "Compliance with regs ≠ control."
- **B9 impact:** ANY AI-based scheduling, auto-dispatch, or talent dispatch system could be cited as exercising "control" → collapse 1099 classification
- **Doesn't preempt state ABC tests** (CA, NJ, MA, IL, VT, CT etc. stricter)

### 4. TCPA — Telephone Consumer Protection Act
- **In effect** (federal)
- **Penalty:** $500-$1,500 per unsolicited message
- **Required:** Prior express written consent for marketing SMS + STOP handling in every message + opt-out honor <24h
- **B9 impact:** Any SMS to talent or clients (Knowledge Check, re-engagement campaigns, shift reminders if framed as marketing)

### Other relevant (not deep-dived but flag-worthy)
- **California ADMT** — Eff. Jan 1, 2027 (Privacy Risk Assessment rules Jan 1, 2026). Pre-use notice + opt-out + right to access for AI-affected employment/contracting decisions.
- **NJ ABC Test Final Rule** — Eff. Oct 1, 2026. All-3-prongs; AI scheduling intensifies prong A failure.
- **Illinois AIVIA** — 2020 in effect; video interview AI requires notice + consent + demographic reporting.
- **EU AI Act** — Phased 2026-2027; "high-risk" AI for recruitment/performance/task allocation. Only relevant if B9 takes EU work.

---

## The 4 affected B9 use cases — design rules

### USE CASE 1: ROI-08 Talent Matching Assistant ("Moneyball")

**Risk profile:** HIGH — direct AEDT under NYC LL 144, IL HB 3773, CA ADMT 2027

#### Why it's affected
The use case as written produces "ranked candidate lists" and "match scores" — that's the textbook AEDT definition under NYC LL 144 ("computational process … that issues a simplified output — a score, classification, or recommendation — used to substantially assist or replace discretionary decision-making").

#### Design rule: Reframe as decision-support, not ranking

**Forbidden patterns:**
- Output that orders candidates from best-to-worst
- Output that includes a numeric "match score" per candidate
- Output presented as "AI recommends Sarah > Maria > James"
- Auto-filtering candidates below a score threshold
- Anything that can be characterized as "AI selected the top 10 for you"

**Allowed patterns:**
- Output that surfaces relevant candidate attributes ("these 15 talent have prior auto-show experience in Austin")
- Output presented as filter results, not rankings
- Human selects which candidates to call/book from the surfaced set
- Augmentation of search ("show me bilingual Spanish, available March 14-16") not selection

#### Compliance gates by geography
| Talent state of residence | Action required before deployment |
|---|---|
| NYC residents | **Annual bias audit by independent auditor** + public posting + 10-day notice in any role posting that AI assists evaluation; OR exclude NYC talent from AEDT scope entirely |
| Illinois residents | Disclosure in job postings + non-discrimination compliance + record-keeping per IDHR rules (in public comment Q2 2026) |
| California residents (from Jan 1, 2027) | Pre-use notice + opt-out + right-to-access |
| All other US states | No specific AEDT obligations; design rules above still apply for forward-compatibility |

#### Recommended rollout
1. **Phase 1A (immediate):** Reframe outputs to filter-not-rank pattern. Ship to non-NYC/IL/CA talent first.
2. **Phase 1B (60 days):** Commission bias audit if NYC talent represents ≥15% of bookings.
3. **Phase 1C (90 days):** Add candidate notice flow if NYC bias audit complete.

#### Honest signal to Brenda
"This is the use case where 'AI ranking talent' becomes a real legal exposure. We can keep all the value by reframing the output. The original framing was unwitting AEDT — easy to fix in code, but worth understanding."

---

### USE CASE 2: ROI-07 Job Description Writer

**Risk profile:** MEDIUM — IL HB 3773 if posting reaches IL applicants; AEDT only if includes screening logic

#### Why it's affected
The use case includes "compliance check on classification language (W-2/1099)" — that's the right safety control. But if you add screening logic (e.g., "auto-filter applicants who don't match the requirements"), it becomes an AEDT.

#### Design rule: Drafting only, no screening logic

**Allowed:**
- Generate job description text from inputs
- Surface compliance flags on classification language ("you wrote 'must attend mandatory weekly training' — this could trigger employee classification under DOL economic reality test")
- Suggest SEO/keyword improvements
- Suggest pay range based on B9 historical data

**Forbidden:**
- Auto-rejecting applicants based on resume parse
- Auto-ranking applicants who apply
- Pre-screening questions whose answers trigger automated reject

#### Required disclosure (Illinois)
For job postings reaching IL residents, add language: *"This position may involve evaluation processes that use artificial intelligence."* Per IL HB 3773 effective Jan 1, 2026.

#### Recommended rollout
Ship immediately with drafting-only scope. Add the disclosure boilerplate to the prompt's output for IL postings.

---

### USE CASE 3: "Flake Detector" / Reliability Scoring (from b9-experience admin)

**Risk profile:** HIGHEST — DOL 1099 classification + AEDT + NJ ABC + IL HB 3773

#### Why it's affected
This is the single most legally exposed concept in the portfolio. Three independent risk vectors:

1. **DOL 1099 classification (highest):** A reliability score that gates future booking eligibility looks exactly like employer discipline. Under the proposed economic reality test, "control over the work" includes scheduling + project selection + exclusivity. A score that determines who gets future bookings is direct control → collapses 1099 status.
2. **NYC LL 144 AEDT:** "Reliability score" applied to candidates for booking decisions = scoring + recommendation = textbook AEDT.
3. **NJ ABC test prong A:** AI scoring talent for future booking eligibility = "control or direction over work" prong failure.

#### Three options, in increasing order of risk:

**Option A (safest): Kill the concept**
Remove from portfolio. Replace with manual coaching by Brenda / talent coordinators.

**Option B (safe with discipline): Reframe as supportive coaching signals**
- Score NEVER used to gate future bookings
- Score visible ONLY to talent (their own data) and Brenda — not to anyone making booking decisions
- Framed as "your reliability is 90 — great work" or "your reliability has dropped — let's talk"
- No automated impact on booking flow
- Talent can request their data + correction

**Option C (HIGH-RISK, not recommended): The original framing**
Score informs casting decisions, ranks talent, affects future eligibility. Triggers all 3 risk vectors. Requires:
- Annual bias audit (NYC residents)
- IL notice and disclosure
- DOL classification audit per worker
- Counsel review per state
- Plus you have to defend the practice in any DOL audit

#### Recommendation
Default to Option A or B. If Brenda loves the concept, scope as Option B with explicit rules in the system that the score is **never used for booking decisions**.

#### Honest signal to Brenda
"This is the concept where I'd push back hardest. The DOL is actively rewriting independent contractor rules in 2026, and AI-driven 'reliability scoring' that affects future work is the textbook example of 'control' that collapses the 1099 classification you depend on. We can get most of the value by treating it as a talent-facing coaching signal instead of a casting gate."

---

### USE CASE 4: "Knowledge Check SMS Bot" (from b9-experience admin) AND any SMS workflows

**Risk profile:** MEDIUM-HIGH — TCPA + DOL 1099 classification

#### Why it's affected
Two independent risks:

1. **TCPA:** SMS to talent without prior express written consent + STOP handling + opt-out registry = $500-$1,500 per message liability.
2. **DOL classification:** "Mandatory training quizzes before each shift" looks like employer-directed training, not work-product purchasing. Strengthens "control" prong → collapses 1099.

#### Design rules

**For TCPA:**
- Consent captured at talent onboarding (separate checkbox, not buried in TOS)
- Every SMS includes "Reply STOP to opt out"
- Opt-out registry honored within 24h
- Separate consent for marketing vs operational comms (shift confirmations are operational, win-back is marketing)

**For DOL classification:**
- Frame quizzes as **voluntary brand education**, not mandatory training
- Don't penalize non-completion (no booking decline based on quiz score)
- If you treat completion as required, pay for completion time (which itself suggests employee status — opens different exposure)
- Avoid language like "training," "course," "certified" — use "brand familiarization," "context," "info pack"

#### Recommendation
Ship the SMS infrastructure with full TCPA compliance. Make the brand quizzes voluntary and brand-familiarization-framed. Track completion as a positive signal Brenda uses for casting confidence, not as a gate.

#### Honest signal to Brenda
"This is fine if we frame it as 'voluntary brand context the talent can review on their phone' rather than 'mandatory training they must pass.' The wording is the legal control."

---

## Cross-cutting design rules (apply to ALL use cases)

These rules apply across the portfolio, not just the 4 above:

### 1. Talent must AFFIRMATIVELY ACCEPT every booking
No auto-confirm, no auto-dispatch. Talent receives offer, taps Accept (or Decline). Prevents "control over schedule" prong failure.

### 2. AI never produces ranked outputs for employment-significant decisions
Reframe "top 10" as "10 matching" with explicit instruction that order is alphabetical/recency/proximity, not ranking.

### 3. Reliability / quality data is informational only, never gating
No use case may use any quality signal (rating, reliability score, no-show count) as automated criteria for future eligibility. Brenda or a coordinator makes that call manually.

### 4. PII never goes in LLM prompts
You already have this in your usage policy. Maintain it. Use [TALENT] / [CLIENT] / [STAFF] placeholders.

### 5. Annual compliance review
Even if you ship Phase 1 cleanly, regulations change quarterly. Schedule a Q3 2026 review (after IL implementation rules finalize) and a Q1 2027 review (after CA ADMT effective + DOL rule final).

### 6. Bias audit budget
If you commission NYC LL 144 bias audits, budget **$5,000-$20,000 per audit per AEDT per year**. Independent auditors must not be the vendor or have financial interest.

### 7. Counsel review threshold
Any AI use case that produces outputs influencing employment/contracting decisions on identifiable workers gets counsel review BEFORE pilot launch. Use B9's existing employment attorney; budget 2-4 hours of review per use case.

### 8. Documentation discipline
Maintain a register of every AI tool used, what it does, when it was last audited, what decisions it influences. NYC LL 144 + IL HB 3773 both require this — start now even if not required at B9's current geographic scope.

---

## Compliance posture summary

| Risk level | Use case | Action |
|---|---|---|
| **HIGHEST** | "Flake Detector" / Reliability Scoring | Default to kill. If kept, reframe as Option B (supportive only, never gates) |
| **HIGH** | ROI-08 Talent Matching | Reframe as filter not rank; NYC bias audit if ≥15% NYC talent |
| **MEDIUM-HIGH** | ROI-06 Quiz / Knowledge Check SMS | Voluntary brand education framing; TCPA consent + STOP; no booking penalty |
| **MEDIUM** | ROI-07 Job Description Writer | Drafting only, no screening; IL disclosure on postings reaching IL |
| **LOW** | ROI-01 Email Triage, ROI-02 Quote Gen, ROI-03 Recap, ROI-09 Reviews, ROI-11/12/14 Finance, ROI-13 Contract, ROI-04 Social, ROI-05 Win-Back, ROI-10 Conflict | Ship as designed (standard PII discipline applies) |
| **LOW** | ALL 8 NEW additions (with one exception) | Design rules below built into the use case specs |
| **MEDIUM-HIGH** | NEW-02 Talent FAQ Chatbot, NEW-20 Real-Time No-Show Replacement | TCPA on chatbot; DOL on auto-dispatch — see [`06-EXPANSION-USE-CASES.md`](./06-EXPANSION-USE-CASES.md) for design |

---

## What to do in code

The annotations to add to your `use-cases.ts` schema are in [`patches/compliance-annotations.md`](./patches/compliance-annotations.md). The schema currently has `controls` and `risks` arrays — extend each affected use case with the design-rule additions, and consider adding a new optional `complianceNotes` field to the `UseCase` interface for narrative regulatory context.

---

## What to do legally

**Before any pilot of the 4 affected use cases:**

1. Schedule 1-2 hour conversation with B9's employment counsel
2. Walk through the 4 use cases and the design rules above
3. Confirm NYC talent volume + IL talent volume + CA talent volume
4. Get sign-off on the redesigned approach for each
5. Document the sign-off + design choices in a compliance register

This is real but not expensive. It's a few hours of counsel time. The cost of getting it wrong (DOL audit, NYC LL 144 enforcement, IL private suit) is materially higher.

