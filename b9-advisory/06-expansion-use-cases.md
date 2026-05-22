# 06 — Expansion Use Case Specs (NEW-01 to NEW-30 with focus on 8 Phase…

06 — Expansion Use Case Specs (NEW-01 to NEW-30 with focus on 8 Phase 2 picks)

**Format:** Matches your existing `UseCase` interface in `~/CursorProjects/b9-ai-portal/src/content/types.ts`
**Drop-in code:** [`patches/use-cases-additions.ts`](./patches/use-cases-additions.ts)
**Process:** Read this doc for context + rationale; use the TS patch for actual portal integration

---

## The 8 Phase 2 picks — detailed specs

Each spec follows the same structure as your existing 14 use cases (problem, objective, inputs, outputs, L0-L3 delivery levels, tools, controls, KPIs, deliverables, risks).

---

### NEW-10 — RFP / RFI Auto-Drafter

**Category:** Revenue
**Phase:** 2-A (Group A: Procurement cluster)
**Process Phase:** [2] Proposal / Quote / Pricing
**Compliance:** None
**Confidence:** HIGH
**Gating dependency:** Brenda's RFP-led revenue share

#### Problem
B9 holds WBENC + NMSDC certifications, which give it qualifying access to Fortune 500 supplier diversity programs (500+ corporate members; 700+ companies/agencies use WBENC certification). But responding to enterprise RFPs is manual, slow, and inconsistent — limiting how many B9 can compete for.

#### Objective
Increase RFP throughput 2-4x and improve win quality by auto-drafting 60-70% of responses from B9's existing case study + capability library, allowing humans to focus on the bespoke 30-40%.

#### Workflow trigger
New RFP / RFI / RFQ document received (PDF or web portal extraction)

#### Inputs
- RFP document (PDF or text)
- B9 capability library (past proposals, case studies, talent pool stats by market, brand experience)
- B9 boilerplate (insurance, COI, certifications, references)
- Client / brand context (if known)

#### Outputs
- First-draft RFP response with all auto-fillable sections complete
- List of bespoke sections requiring human input
- Pricing assumptions list (Brenda confirms or adjusts)
- Completeness checklist vs. RFP requirements

#### Delivery levels
- **L0 (copy-paste):** Upload RFP PDF → AI summarizes requirements + drafts boilerplate sections in ChatGPT
- **L1 (templates):** Structured prompt pack + RFP response template + auto-attach capability deck (paired with NEW-11)
- **L2 (automation):** Make/Zapier flow: RFP arrives by email → triggers OCR → AI drafts → Brenda reviews
- **L3 (integration):** Dedicated RFP tool (Loopio, Responsive, AutoRFP.ai) with B9-specific content library

#### Tools
- ChatGPT Teams (L0-L1)
- Loopio (~$X-XX/user/mo) | Responsive (formerly RFPIO) | AutoRFP.ai (AI-native) (L3)
- Google Drive / SharePoint for content library

#### Data
- 15-25 past B9 proposals (sanitized)
- Capability deck (current version)
- Talent pool snapshot by city / skill / language
- Insurance/COI documents
- Reference list (anonymized if needed)

#### Controls
- Human reviews EVERY response before submission
- Pricing always confirmed manually (math discipline per ROI-02)
- WBENC/NMSDC claims always cite certification numbers
- No fabricated case studies — only real past work

#### KPIs
- RFP throughput (responses sent / month) — target 2-4x baseline
- Win rate (track quarterly)
- Time per response (draft + review)
- $ revenue from RFP wins

#### Deliverables
- Capability library inventory (Week 1)
- RFP intake + draft prompt pack (Week 2)
- First 3 AI-drafted responses (Week 3)
- Win/loss tracking sheet (ongoing)

#### Risks
- Inaccurate boilerplate (mitigate: human review every time)
- Stale capability library (mitigate: quarterly refresh)
- Over-reliance leading to commodity responses (mitigate: 30-40% bespoke per response is the standard)

#### Owner
TBD (likely Brenda + recruiter / account manager pair)

#### Timeline
2-3 weeks to L1; 6-8 weeks to L3

#### Effort
2-3 weeks initial (library curation is the heavy lift); 30-60 min per RFP after that vs 4-8 hours manual

#### Benchmark evidence
- Loopio 2026 report: 70% efficiency, 415% ROI, 50% annual time savings, 25% more RFPs completed, 8-month payback
- Responsive: 35-50% time savings per project, 80% faster responses
- 80% of teams used GenAI in RFP responses over past 12 months
- 61% of companies achieve ROI within 1 year of RFP software

---

### NEW-11 — Capability Deck Personalizer

**Category:** Revenue
**Phase:** 2-A (Group A: Procurement cluster)
**Process Phase:** [2] Proposal / Quote / Pricing
**Compliance:** None
**Confidence:** MEDIUM
**Gating dependency:** Volume of enterprise pitches

#### Problem
When Brenda gets a meeting with a Fortune 500 brand, the standard capability deck is generic. Custom decks take 4-8 hours and don't always get done in time.

#### Objective
Generate personalized capability decks in 30-45 minutes for any enterprise meeting — pulling relevant case studies, regional presence proof, talent pool stats, and brand-experience signals tailored to that buyer.

#### Workflow trigger
Confirmed meeting with enterprise prospect (or RFP requiring capability deck attachment)

#### Inputs
- Brand name + industry + meeting context (event type, geography, headcount, dates if known)
- B9 case study library (categorized by event type, brand vertical, geography)
- Talent pool snapshot (by market, skill set, languages)
- B9 standard slides (about-us, certs, process, testimonials)

#### Outputs
- Personalized 8-12 slide capability deck (PDF + editable Google Slides)
- Speaker notes per slide
- 1-page leave-behind summary

#### Delivery levels
- **L0:** Brenda copy-pastes brand context into ChatGPT, asks for relevant case study selection + slide outline; manually populates Google Slides
- **L1:** Structured prompt + slide template library + auto-selection rubric
- **L2:** Google Apps Script that generates deck from structured input
- **L3:** Tome / Gamma / Decktopus auto-generation with B9 brand system

#### Tools
- ChatGPT Teams (L0-L1)
- Google Slides + Apps Script (L2)
- Tome / Gamma (L3, $20-30/mo)

#### Data
- 30-50 past case studies (tagged by vertical, geography, event type)
- Talent pool by market (CSV or DB extract)
- Brand testimonials (with permission)

#### Controls
- Brenda reviews every deck before sending
- No fabricated metrics — all numbers traceable to real events
- Client logos used only with permission

#### KPIs
- Time per custom deck (target: <45 min vs 4-8 hours)
- Deck → meeting conversion
- Meeting → opportunity conversion

#### Deliverables
- Case study library + tagging schema (Week 1)
- Deck generation prompt + template (Week 2)
- First 5 personalized decks (Week 3-4)

#### Risks
- Sloppy personalization that backfires (mitigate: human review)
- Cherry-picking case studies misleadingly (mitigate: factual review)

#### Owner
TBD (Brenda)

#### Timeline
1-2 weeks to L1; 4-6 weeks to L2

#### Effort
1-2 weeks initial (library curation); 30-45 min per deck after

---

### NEW-13 — Tier 1 Spend Reporting Generator

**Category:** Revenue
**Phase:** 2-A (Group A: Procurement cluster) — **ship regardless of RFP %**
**Process Phase:** Cross-cutting B: Client Success / Account Expansion
**Compliance:** None
**Confidence:** HIGH

#### Problem
Fortune 500 clients track Tier 1 diverse-supplier spend for their sustainability/DEI reporting. B9's WBENC + NMSDC certifications make B9's spend count. But B9 doesn't proactively report this to clients — clients have to chase the numbers, or worse, B9's spend gets aggregated without attribution.

#### Objective
At quarter-end and year-end, automatically generate client-side Tier 1 diverse-spend reports for each enterprise client, formatted to their reporting standard (SAP Ariba, Supplier.io, internal templates). Massive value-add for renewal conversations.

#### Workflow trigger
Quarter-end / year-end (cron); ad-hoc for specific client requests

#### Inputs
- Client list (with their preferred reporting format if known)
- B9 invoice data (client × period × amount)
- B9 certifications (current WBENC + NMSDC docs with cert numbers + expiry)
- Past client report templates (collected from RFPs and procurement portal experience)

#### Outputs
- Per-client quarterly + annual Tier 1 spend report (PDF + CSV)
- Cover note quantifying B9's contribution to their diverse-supplier KPIs
- Renewal conversation talking points

#### Delivery levels
- **L0:** Excel template; AI drafts cover note from invoice data
- **L1:** Standard PDF template; AI generates per-client
- **L2:** QuickBooks → automated report generation pipeline
- **L3:** Direct integration with client procurement portals (TealBook, Supplier.io, SAP Ariba)

#### Tools
- ChatGPT Teams (L0-L1)
- Google Sheets + Apps Script (L1-L2)
- TealBook / Supplier.io (L3 — for portal submission)

#### Data
- Invoice history by client × period
- WBENC + NMSDC cert numbers + expiry dates
- Client reporting format preferences (build over time)

#### Controls
- Brenda confirms numbers before client send
- No client-comparative data (don't share Client A's data with Client B)
- PII discipline maintained (no individual talent names in client reports)

#### KPIs
- # clients receiving quarterly reports
- Renewal mention rate (does the report come up in renewal convos?)
- Client retention rate (did proactive reporting affect renewal?)

#### Deliverables
- First quarter-end report cycle (delivered to top 10 retained clients)
- Renewal conversation talking points
- Client reporting format library (built over time)

#### Risks
- Cert expiry not tracked (mitigate: calendar alert + auto-renewal reminder)
- Numbers wrong (mitigate: Brenda confirms; sanity-check vs QuickBooks)
- Sharing across competing clients (mitigate: per-client isolation rule)

#### Owner
TBD (likely Finance + Brenda)

#### Timeline
3-4 weeks to L1

#### Effort
3-4 weeks initial; 30-60 min per quarter per client after (or fully automated at L2-L3)

#### Strategic note
**This is one of the most-differentiating use cases in the entire portfolio.** Almost no boutique competitor does this proactively. WBENC-certified firms typically wait for clients to ask. Brenda showing up to a renewal with a polished quarterly Tier 1 report is a *significant* signal of premium operation.

---

### NEW-20 — Real-Time No-Show Auto-Replacement

**Category:** Quality
**Phase:** 2-B (Group B: Real-Time + Multimodal)
**Process Phase:** [5] Event Day / Execution
**Compliance:** **DOL classification risk — design carefully**
**Confidence:** HIGH (industry-proven pattern)

#### Problem
No-shows happen. Today, when talent doesn't check in 15 min before shift, a coordinator manually texts/calls backup talent. Takes 30-90 min. Sometimes the shift starts uncovered.

#### Objective
When a no-show is detected (no GPS check-in 15 min before call time), automatically text top-3 standby talent (ranked by proximity, prior performance on this brand, availability), wait for accept, confirm to client. <10 min vs 30-90 min.

#### Workflow trigger
No talent check-in 15 minutes before scheduled call time (GPS-based)

#### Inputs
- Event roster (assigned talent + scheduled shift times)
- GPS check-in data (live)
- Standby talent pool (opted-in, available, geo-proximate)
- Past performance data (this brand, this venue, last 12 mo)

#### Outputs
- Outbound SMS to top-3 standby (with shift details + accept link)
- Client notification of replacement
- Updated roster + payroll adjustments
- Audit log of incident + resolution

#### Delivery levels
- **L0:** Manual coordinator workflow with AI-generated SMS draft
- **L1:** Spreadsheet of standby pool + SMS templates + manual trigger
- **L2:** StaffConnect + Twilio integration with automated trigger
- **L3:** Senegal Software (event-staffing-specific) or custom build with one-tap accept

#### Tools
- StaffConnect (system of record)
- Twilio (SMS) (~$0.01/SMS)
- Senegal Software (~$X/mo) | Skedulo (~$X/mo per user) (L3)

#### Data
- Active roster with shift times
- Talent GPS opt-in + last location (only at shift time)
- Standby pool eligibility (active opt-in)
- Past event performance (no-show rate, brand experience)

#### Controls (compliance-critical)
- **Talent must AFFIRMATIVELY ACCEPT** replacement offer (no auto-assign) — preserves 1099 control prong
- Standby pool is **opt-in** (talent chooses to be on standby for short-notice work)
- "Top 3" output is not ranked, just filtered by proximity + brand match
- No automated discipline of the no-show (separate process, human-driven)
- TCPA: SMS uses pre-consented operational channel (not marketing)

#### KPIs
- % no-shows replaced before shift start (target: 80%+)
- Avg time-to-replace (target: <10 min)
- Standby pool engagement rate
- Client complaints about uncovered shifts (target: 0)

#### Deliverables
- Standby pool opt-in flow (Week 1)
- No-show detection logic (Week 2)
- SMS templates + accept flow (Week 3)
- Pilot on 5-10 events (Week 4-6)
- Full rollout (Week 7+)

#### Risks
- DOL classification challenge if auto-dispatch perceived as control (mitigate: affirmative-accept design; talent always chooses)
- Standby talent fatigue if over-pinged (mitigate: rate limits per talent per period)
- False no-show triggers (mitigate: 15-min grace window + call attempt before SMS)

#### Owner
TBD (Operations + Brenda)

#### Timeline
6-8 weeks to L2

#### Effort
6-8 weeks initial; <5 min per incident after

#### Benchmark evidence
- Chromie Health Dispatch (healthcare): fills nurse shift gaps in **<5 min vs ~5 hours manual**
- Senegal Software (event staffing): "within minutes" via auto-replace button → prioritized backup → one-tap accept → GPS verification

---

### NEW-24 — Multimodal Event Recap Generator

**Category:** Quality
**Phase:** 2-B (Group B: Real-Time + Multimodal)
**Process Phase:** [6] Post-Event / Recap
**Compliance:** None (extension of ROI-03)
**Confidence:** HIGH

#### Problem
ROI-03 produces text-based recaps. But premium experiential clients want visual recaps with curated photos, key moments, talent highlights, engagement metrics — branded for sharing internally. Today: 4-8 hours of manual design per event.

#### Objective
Generate branded multimodal recaps (photos + video clips + metrics + narrative) within 24 hours of event end. Matches premium positioning. Becomes a leave-behind that drives renewal conversations.

#### Workflow trigger
Event end + photos/video uploaded

#### Inputs
- Event photos (typically 50-200 per event)
- Video clips (if captured)
- On-site coordinator notes
- Shift logs (hours, headcount, locations)
- Survey responses (talent + attendees)
- Client brand guidelines (logos, colors, fonts)

#### Outputs
- Branded PDF recap (8-15 pages with curated photos, metrics, narrative)
- Optional: branded short video (30-60 sec)
- Social-ready snippets (LinkedIn carousel, Instagram story)
- Email cover note

#### Delivery levels
- **L0:** Upload photos to ChatGPT, ask for curation/captions; manually populate Canva template
- **L1:** Canva template + AI curation prompt + photo-tagging discipline
- **L2:** Snapsight Remix (multimodal AI + brand systems + layout) or custom Apps Script
- **L3:** Full automated pipeline from event-end trigger → recap delivery to client within 24h

#### Tools
- ChatGPT (multimodal — image understanding) (L0-L1)
- Canva Pro (~$15/mo) (L1)
- Snapsight Remix (~$X/mo) (L2-L3)
- Adobe Premiere / Descript (for video) (L3)

#### Data
- Approved photo library per event
- Brand guidelines per client
- Recap template (B9-branded version)

#### Controls
- Photo permissions confirmed (no talent or attendee unhappy with use)
- Client NDA respected (no unreleased product details surface)
- Brenda reviews before client delivery
- No fabricated metrics

#### KPIs
- Recap delivery time post-event (target: <24h)
- Client engagement with recap (open rate, share rate)
- Renewal conversation mentions of recap quality
- % events with multimodal recap (target: top 30 clients)

#### Deliverables
- Branded recap template (Week 1-2)
- Photo curation prompt pack (Week 2)
- First 5 multimodal recaps (Week 3-4)

#### Risks
- AI hallucinated captions (mitigate: human review)
- Photo permission issues (mitigate: opt-in at event)
- Heavy file sizes (mitigate: compression + delivery via secure link)

#### Owner
TBD (Operations + Marketing)

#### Timeline
3-4 weeks to L1; 8-10 weeks to L3

#### Effort
3-4 weeks initial; 60-90 min per recap after (vs 4-8 hours manual)

---

### NEW-16 — Client Expansion Signal Detector

**Category:** Revenue
**Phase:** 2-C (Group C: Client Success)
**Process Phase:** Cross-cutting B: Client Success / Account Expansion
**Compliance:** None (data is B9's own client comms)
**Confidence:** MEDIUM
**Gating dependency:** Brenda's retained-client count (15+ for value)

#### Problem
Expansion opportunities are buried in email threads ("we might do this in Austin next quarter"), meeting notes ("they mentioned a sister brand launch"), post-event surveys ("we're considering a quarterly cadence"). B9 doesn't have systematic surfacing of these signals.

#### Objective
AI scans email threads + meeting notes + post-event surveys with each retained client and surfaces signals: new event mentioned, new market mentioned, budget increase signals, new stakeholder appearing. Brenda gets weekly "expansion opportunities" digest.

#### Workflow trigger
Weekly cadence (every Monday morning); ad-hoc for specific account review

#### Inputs
- Email history per retained client (last 90 days)
- Meeting notes (if logged in Notion / Google Docs)
- Post-event surveys
- CRM notes (if any)

#### Outputs
- Weekly digest: per-client expansion signals with strength rating
- Account-specific deep dive (on demand)
- Direct quotes from signals (with source links)
- Suggested outreach action per signal

#### Delivery levels
- **L0:** Brenda copy-pastes recent client emails into ChatGPT weekly, asks for expansion signals
- **L1:** Structured prompt + weekly review template + signal taxonomy
- **L2:** Gmail/Outlook API + scheduled job → AI extraction → digest email
- **L3:** Gainsight Expansion Analyst | ChurnZero Beacon (purpose-built CS platforms)

#### Tools
- ChatGPT Teams (L0-L1)
- Gmail/Outlook API + Apps Script (L2)
- Gainsight (enterprise — likely too heavy for B9) | ChurnZero (mid-market) (L3)

#### Data
- Email history per retained client (with consent / standard business communication scope)
- Meeting notes archive
- Post-event survey responses
- Past expansion outcomes (for AI calibration)

#### Controls
- No client data leaves B9 systems (use ChatGPT Enterprise or on-prem)
- Digest goes only to Brenda (and named account leads) — not shared externally
- Signals are alerts, not decisions — Brenda decides outreach
- Privacy maintained per B9 usage policy (no individual names of client employees in summaries beyond direct quotes)

#### KPIs
- # expansion opportunities surfaced per quarter
- # opportunities converted to actual booked work
- $ revenue from surfaced expansion
- Time-to-action on hot signals

#### Deliverables
- Signal taxonomy (week 1)
- Weekly digest prompt + template (week 2)
- First 4 weekly digests (week 3-6)
- Calibration (month 3 — what signals actually convert?)

#### Risks
- Over-alerting (mitigate: signal strength thresholds)
- False positives that lead to awkward outreach (mitigate: Brenda's judgment gate)
- Privacy concerns from client team if data scope unclear (mitigate: scope to legitimate business comms only)

#### Owner
TBD (Brenda)

#### Timeline
3-4 weeks to L1

#### Effort
3-4 weeks initial; 30-60 min per week to review digest after

#### Benchmark evidence
- Gainsight Expansion Analyst (Staircase AI): 3-agent system (Detection / Scoring / Action), 90 days of email/meeting/ticket data, ARR potential + readiness score + customer quotes
- ChurnZero Beacon: prebuilt signals with type/timing/impact + prescriptive next steps

---

### NEW-17 — Pre-QBR Account Brief Generator

**Category:** Efficiency
**Phase:** 2-C (Group C: Client Success) — **ship always**
**Process Phase:** Cross-cutting B: Client Success / Account Expansion
**Compliance:** None
**Confidence:** HIGH

#### Problem
Before any quarterly business review (QBR) with a key client, Brenda spends 2-3 hours pulling: events delivered last quarter, hours, talent ratings, issues raised, $$$ spent, year-over-year trends. Most of this data exists in StaffConnect + QuickBooks but is fragmented.

#### Objective
Generate per-client QBR brief in 5 minutes: events delivered, hours, talent ratings, issues, financial trend, expansion signals (paired with NEW-16). Brenda reads + adds judgment, doesn't dig.

#### Workflow trigger
Scheduled QBR (cron 1 week before); ad-hoc for any client review

#### Inputs
- Client's event history (last 4 quarters)
- StaffConnect shift data
- QuickBooks invoice + payment data
- Post-event survey data
- Issue/incident log
- Talent ratings on this client's events

#### Outputs
- 2-page QBR brief: events summary, hours, ratings, financials, trends, issues, expansion signals
- Conversation talking points
- Year-over-year comparison

#### Delivery levels
- **L0:** Brenda exports each data source manually, asks ChatGPT to synthesize into brief
- **L1:** Standardized export queries + AI synthesis prompt + brief template
- **L2:** Scheduled job pulls data + generates brief + emails Brenda 7 days pre-QBR
- **L3:** CRM integration with auto-brief feature

#### Tools
- ChatGPT Teams (L0-L1)
- Google Sheets / Looker Studio (L1-L2)
- HubSpot / Salesforce (L3)

#### Data
- StaffConnect event history per client
- QuickBooks AR per client
- Post-event survey responses
- Talent rating data
- Issue/incident log

#### Controls
- Numbers cross-checked before client meeting
- No client-comparative data in brief (don't show Client A how they compare to Client B)
- Brenda owns the narrative — brief is preparation, not the meeting

#### KPIs
- QBR prep time (target: <30 min vs 2-3 hours)
- Brenda's pre-meeting confidence (qualitative)
- QBR outcomes (renewal commitments, expansion discussed)

#### Deliverables
- Data export discipline + queries (Week 1)
- Brief template + synthesis prompt (Week 2)
- First 5 QBR briefs (Week 3-6)

#### Risks
- Stale data (mitigate: refresh window <7 days)
- Numerical errors (mitigate: sanity check against source systems)

#### Owner
TBD (Brenda)

#### Timeline
2-3 weeks to L1

#### Effort
2-3 weeks initial; 5-10 min per brief after (vs 2-3 hours manual)

---

### NEW-02 — Talent FAQ Chatbot (Supportive)

**Category:** Quality
**Phase:** 2-D (Group D: Talent Experience) — **ship only with affirmative consent path**
**Process Phase:** Cross-cutting A: Talent Experience / Retention
**Compliance:** **TCPA consent + supportive framing** (see [`05-COMPLIANCE-DESIGN-RULES.md`](./05-COMPLIANCE-DESIGN-RULES.md))
**Confidence:** MEDIUM

#### Problem
Talent has predictable questions ("when do I get paid for the Nike event?" "what's the dress code for tomorrow?" "where do I park?" "is my W-9 on file?") that today route through Brenda or coordinators — 30-60 min/day across the team. Talent often waits hours for answers, hurting experience.

#### Objective
24/7 talent FAQ chatbot that answers operational questions (payment status, shift details, FAQ, profile updates, training/brand context) without coordinator involvement. Frees Brenda + coordinators for higher-value work; improves talent experience.

#### Workflow trigger
Talent texts chatbot number with question (or opens talent portal chat)

#### Inputs
- Talent identity (verified via SMS number or login)
- Question text
- Talent profile data (StaffConnect)
- Shift schedule data
- Payment status data (QuickBooks)
- FAQ knowledge base
- Brand context for upcoming events

#### Outputs
- Direct answer to common questions
- Escalation to human for novel/sensitive questions
- Profile update if requested
- Confirmation receipt

#### Delivery levels
- **L0:** Manual coordinator answers; AI drafts the response in chat
- **L1:** Twilio + ChatGPT API; structured FAQ knowledge base; simple intent classification
- **L2:** Whippy (unified inbox: SMS + email + voice + WhatsApp) or Sense (staffing-specific)
- **L3:** Custom agent with StaffConnect + QuickBooks integration for live data answers

#### Tools
- ChatGPT API (L0-L1)
- Twilio (L1)
- Whippy (~$X/mo) | Sense (~$X/mo) (L2)
- Custom build (L3)

#### Data
- Talent FAQ knowledge base (B9-specific)
- StaffConnect API access (shift data, profile)
- QuickBooks API access (payment status)
- Brand context per active event

#### Controls (compliance-critical)
- **Opt-in consent at talent onboarding** (separate from TOS, checkbox)
- **STOP handling in every message** + opt-out registry honored <24h
- Frame as **support, not surveillance** — chatbot is talent-facing service, not data extraction
- Sensitive questions auto-escalate to human (anything mentioning injury, dispute, dissatisfaction)
- No predictive scoring of talent based on chatbot interactions
- No automated discipline / no "if you ask too many questions, fewer bookings" logic
- Privacy: talent can request all their chat history; request deletion

#### KPIs
- % FAQ questions answered without human (target: 70-80%)
- Avg response time (target: <5 min for FAQ; <30 min for escalations)
- Coordinator time saved per week
- Talent NPS impact (specifically: "easy to get info")
- Opt-in rate of talent (signals trust)

#### Deliverables
- FAQ knowledge base (Week 1-2)
- Consent + opt-in flow (Week 2)
- Pilot with 20-30 talent (Week 3-4)
- Full rollout if pilot positive (Month 2-3)

#### Risks
- TCPA violations if consent sloppy (mitigate: clear opt-in + STOP handling)
- DOL classification if framed as employer-required service (mitigate: opt-in, supportive framing)
- Talent feels surveilled → supply collapse (mitigate: never use chat data for casting decisions)
- Hallucinated answers about payment or shifts (mitigate: live data API integration, not generative answers, for factual queries)

#### Owner
TBD (Operations + Brenda)

#### Timeline
4-6 weeks to L1; 10-12 weeks to L3

#### Effort
4-6 weeks initial; minimal ongoing (knowledge base refresh quarterly)

#### Benchmark evidence
- Fountain Cue (Anthropic Claude): 98% reduction in screening overhead, 50% cut in time-to-hire, **16% LONGER retention** for AI-interacted candidates
- 70% of 70,000 applicants in field experiment **preferred AI** to human
- "Speed and clarity matter more to frontline workers than whether human or system sent the message"

#### Honest signal to Brenda
"This is the talent-side use case that could redefine B9's premium positioning — not by replacing the human touch, but by making the routine touchpoints *better* than the human touch typically is. Done right, talent loves it. Done wrong, it collapses supply. The design rules are non-negotiable."

---

## The other 22 candidates (Phase 3 watchlist) — summary specs

These are documented in less detail since they're not Phase 2. Full specs live in the research corpus at `~/research-library/projects/b9-event-staffing-ai-use-case-landscape/corpus/raw/web-research/` (talent-experience-ai-supply-side.md, rfp-and-procurement-ai.md, peer-firm-benchmarks-and-other-gaps.md).

### Talent Experience watchlist (NEW-01, NEW-03 to NEW-09)
| ID | Name | Why deferred |
|---|---|---|
| NEW-01 | Talent Application Triage Bot | Lower volume justifies waiting; FAQ chatbot (NEW-02) covers some |
| NEW-03 | Unified Talent Comms Inbox | Phase 3 — needs FAQ chatbot first to validate channel value |
| NEW-04 | Talent Self-Service Portal | Heavier build; needs StaffConnect deep integration |
| NEW-05 | Talent-Facing Opportunity Recommender | AEDT exposure if scored; depends on Brenda's appetite for talent-side scoring |
| NEW-06 | Talent Engagement Health Scoring | Reframing required (supportive vs surveillance); design after NEW-02 lands |
| NEW-07 | Dormant Talent Re-Engagement | Useful but lower priority than client-side win-back; defer |
| NEW-08 | Post-Event Talent Sentiment Synthesis | Pair with NEW-24 multimodal recap in Phase 3 |
| NEW-09 | Brenda's Talent Stay-Conversation Coach | Niche; defer |

### RFP / Procurement watchlist (NEW-12, NEW-14, NEW-15)
| ID | Name | Why deferred |
|---|---|---|
| NEW-12 | WBENCLink Profile Optimizer | One-time + quarterly refresh; lighter than NEW-10/11 |
| NEW-14 | Procurement Portal Watcher | Requires NEW-10 throughput proof first |
| NEW-15 | MSA / SOW Pre-Negotiation Analyzer | Extension of ROI-13; defer to Phase 3 |

### Account Expansion watchlist (NEW-18, NEW-19)
| ID | Name | Why deferred |
|---|---|---|
| NEW-18 | Client Health Scoring | Requires data flow from NEW-16 + NEW-17 first |
| NEW-19 | Past-Event Personalization for Renewal Decks | Pair with NEW-24 multimodal recap |

### Real-Time Event Day watchlist (NEW-21, NEW-22, NEW-23)
| ID | Name | Why deferred |
|---|---|---|
| NEW-21 | Day-Of Issue Triage | After NEW-20 no-show replacement validates the SMS channel |
| NEW-22 | Live Event Status Dashboard | Visual/UI heavy; lower urgency |
| NEW-23 | Geofenced Check-In + Photo Verification | Already partially in b9-experience admin; refine when integrating |

### Multimodal Recap watchlist (NEW-25, NEW-26)
| ID | Name | Why deferred |
|---|---|---|
| NEW-25 | Live Activation Content (Snapsight pattern) | Premium feature; defer until base recap (NEW-24) is solid |
| NEW-26 | Case Study Auto-Drafter | Feeds demand gen flywheel; defer to Phase 3 |

### Voice / Conversation watchlist (NEW-27 to NEW-30)
| ID | Name | Why deferred |
|---|---|---|
| NEW-27 | Sales Call → CRM Update | Depends on call volume; cost ~$60-200/user/mo (Avoma, Gong) |
| NEW-28 | Client Debrief Synthesis | Pair with NEW-17 QBR brief |
| NEW-29 | Internal Meeting Summaries | Org-readiness; defer |
| NEW-30 | Talent Interview Transcription + Analysis | Requires NEW-02 base; AEDT exposure if scored |

---

## How to use this document with the b9-ai-portal

The 8 Phase 2 picks are ready to append to your `use-cases.ts`. See [`patches/use-cases-additions.ts`](./patches/use-cases-additions.ts) for drop-in TypeScript.

For the watchlist 22, **don't add them to the portal yet.** Keep them in this advisory package as Phase 3 candidates. If you add them to the portal prematurely, the portfolio looks bloated and Brenda gets overwhelmed.
