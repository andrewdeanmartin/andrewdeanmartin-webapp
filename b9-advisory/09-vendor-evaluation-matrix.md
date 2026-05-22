# # 09 — Vendor Evaluation Matrix

# 09 — Vendor Evaluation Matrix

**Frame:** Which tools to look at for which use cases, with honest fit assessment for a 20-50 person boutique premium event-staffing agency.

> **None of these vendor decisions should be made before Brenda's discovery conversation.** This matrix exists to inform the conversation, not pre-empt it.

---

## How to read this

For each use case category, vendors are sorted: **L0-L1 candidates first** (ChatGPT + existing tools) → **L2 candidates** (workflow / mid-cost) → **L3 candidates** (dedicated platforms, higher cost).

Fit assessment for B9 scale (~20-50 internal staff, ~500-2000 active 1099 talent, project-based revenue, US nationwide, WBENC+NMSDC certified):
- ✅ Good fit — vendor designed for or proven at this scale
- ⚠️ Possible fit — heavier than ideal, evaluate carefully
- ❌ Wrong fit — too enterprise-heavy or wrong-segment, skip

---

## Foundation: AI workspace + governance

| Tool | Purpose | Pricing | Fit | Notes |
|---|---|---|---|---|
| **ChatGPT Teams** | General AI workspace; data isolation; admin controls | $30/user/mo | ✅ | Default starting point. Covers most L0-L1 use cases. SOC 2, no training on data. |
| **Claude for Work** | Alternative GenAI workspace | Similar pricing | ✅ | Stronger for long-form reasoning; consider if Brenda prefers writing quality |
| **Microsoft 365 Copilot** | If B9 is on Office 365 | $30/user/mo on top | ⚠️ | Only if already deep on M365 stack |
| **Google Gemini for Workspace** | If B9 is on Google Workspace | $20-30/user/mo | ⚠️ | Reasonable if already deep on Google stack |

**Recommendation:** Start with ChatGPT Teams. Add Claude for Work for Brenda specifically if she does heavy writing/drafting work.

---

## RFP / Procurement (NEW-10, NEW-11, NEW-13)

| Tool | Purpose | Pricing | Fit | Notes |
|---|---|---|---|---|
| **ChatGPT Teams + prompts + Drive library** | L0-L1 baseline | $30/user/mo + Drive | ✅ | Best starting point for B9 scale |
| **AutoRFP.ai** | AI-native RFP platform | Not public; "fraction of Loopio cost" | ✅ | Lightest option among dedicated platforms; AI-native (vs retrofitted) |
| **Loopio** | Mid-market RFP automation | Per-user, ~$200-400/user/mo | ⚠️ | 70% efficiency, 415% ROI, 8-month payback per their data — but heavy for <50-person firm |
| **Responsive** (formerly RFPIO) | Enterprise RFP | Custom enterprise | ❌ | Too enterprise-heavy unless RFPs are 30%+ of revenue and >50/year |
| **TealBook** | Buyer-side supplier database (for B9 to appear in) | Free for suppliers | ✅ | B9 should be in TealBook regardless — 500K+ diverse supplier profiles, Fortune 500 procurement teams search here |
| **WBENCLink** | Native WBENC supplier database | Free with WBENC cert | ✅ | B9 already has cert; ensure profile is current + complete |

**Recommendation:**
- **If RFP <10% of revenue:** Stay at L0-L1 with ChatGPT + Drive library. Ensure WBENCLink + TealBook profiles are current.
- **If RFP 10-30% of revenue:** Pilot AutoRFP.ai (AI-native, lighter weight) for 90 days; measure throughput improvement vs L0-L1.
- **If RFP >30% of revenue:** Evaluate Loopio (mature, proven ROI). Budget $5-15K/year. The ROI math works at this volume.

---

## Talent Engagement / FAQ Chatbot (NEW-02 and watchlist NEW-01 to NEW-09)

| Tool | Purpose | Pricing | Fit | Notes |
|---|---|---|---|---|
| **ChatGPT + Twilio + custom build** | Lightweight chatbot | $30/user + ~$0.01/SMS + dev | ✅ | Best for testing the channel before committing to dedicated platform |
| **Whippy** | Unified SMS/email/voice/WhatsApp inbox for staffing | Per-user (~$X/mo) | ✅ | Built for staffing firms; integrates with Avionté + others |
| **Sense** | Conversational AI for staffing (chatbots, voice, omnichannel) | Custom | ✅ | Mature platform; recruitment focus but adaptable |
| **StarsHunt Emma** (via Avionté) | AI voice agent for outreach/screening/follow-ups | Via Avionté pricing | ⚠️ | Only if on Avionté; B9 likely on StaffConnect, not Avionté |
| **Fountain Cue** | Anthropic Claude-powered hiring copilot | Custom enterprise | ❌ | Built for frontline gig scale (Uber/DoorDash); wrong segment for boutique premium |
| **PSG Anna AI** | RPO-grade digital recruiter | Custom enterprise | ❌ | Heavy enterprise; wrong scale |

**Recommendation:**
- **Start:** ChatGPT + Twilio custom build for FAQ chatbot (NEW-02 L1). ~6-8 weeks dev. Validates the channel.
- **If channel proves out at month 3:** Evaluate Whippy or Sense for unified inbox + voice expansion. Likely $200-1000/month range.
- **Skip:** Fountain, PSG Anna — wrong segment, vendor sales motion will burn time even when you say no.

---

## Real-Time Dispatch / No-Show Replacement (NEW-20 and watchlist NEW-21 to NEW-23)

| Tool | Purpose | Pricing | Fit | Notes |
|---|---|---|---|---|
| **Custom build on StaffConnect API + Twilio** | Lightweight automation | Dev + $0.01/SMS | ⚠️ | Feasible if StaffConnect has API access; effort is the constraint |
| **Senegal Software** | Event-staffing-specific dispatch with auto-replace, GPS check-in | Custom (~$X/mo) | ✅ | Built explicitly for event staffing use case |
| **Skedulo** | AI scheduling + dispatch (cross-industry) | Per-user (~$X/mo) | ⚠️ | Cross-industry; may need configuration for event staffing |
| **Chromie Health Dispatch** | SMS-native shift fill (healthcare) | Custom | ❌ | Wrong segment (healthcare); reference proof point only |
| **UnityAI StaffOps** | Real-time supply/demand alignment (healthcare) | Custom | ❌ | Wrong segment |

**Recommendation:**
- **If StaffConnect has API access:** Build custom on top (effort: 6-8 wks). Maintain control of data + integration.
- **If StaffConnect lacks API or is expensive to integrate:** Evaluate Senegal Software as standalone or replacement.
- **Skip:** Cross-industry platforms (Skedulo) unless StaffConnect migration is already on the table.

---

## Cash Flow / Project Finance (ROI-11)

| Tool | Purpose | Pricing | Fit | Notes |
|---|---|---|---|---|
| **Float** | Visual cash flow forecasting | ~$60-100/mo | ✅ | Xero/QBO/FreeAgent integration; widely loved by SMBs |
| **Dryrun** | Project-level forecasting + scenario modeling | $99+/mo | ✅ | **Specifically designed for project-based / agency revenue** — direct B9 fit |
| **Pulse** | QBO-integrated cash flow | $X/mo | ✅ | Lightweight alternative to Float |
| **FlowSense** | "AI CFO" — weekly digest + anomaly detection | $179/mo | ⚠️ | Newer; less track record |
| **CashPulse** (Transformance) | Invoice-level payment probability | Custom enterprise | ❌ | Too enterprise |

**Recommendation:**
- **Phase 1 (ROI-11 L0-L1):** ChatGPT + Google Sheets workflow. Free to validate the pattern.
- **Phase 2 if Brenda likes pattern:** Add **Dryrun** for project-based forecasting. Best fit for event-by-event SOW revenue model. $99-300/month.

---

## Conversation Intelligence (Phase 3 watchlist NEW-27 to NEW-30)

| Tool | Purpose | Pricing | Fit | Notes |
|---|---|---|---|---|
| **Avoma** | SMB-friendly conversation intelligence | $19-128/user/mo | ✅ | Best fit for B9 scale; free tier exists for testing |
| **Modjo** | Mid-market sales call analysis | $60-150/user/mo | ✅ | Strong alternative to Avoma |
| **Wingman** | Mid-market + forecasting | $60-150/user/mo | ⚠️ | Solid but Avoma generally wins on SMB |
| **Gong** | Enterprise revenue intelligence | $100-200/user/mo | ❌ | Wrong segment unless B9 grows to 30+ AMs |
| **Chorus** (ZoomInfo) | Bundled with ZoomInfo | Bundle-dependent | ❌ | Only relevant if already on ZoomInfo |

**Recommendation:**
- **Defer until Phase 3 unless Brenda specifically pains on call recall.**
- **When ready:** Start with Avoma free tier on Brenda only (1 user). Validate value before rolling to team. ~$20-128/month for 1-3 users.

---

## Multimodal Recap (NEW-24, watchlist NEW-25, NEW-26)

| Tool | Purpose | Pricing | Fit | Notes |
|---|---|---|---|---|
| **ChatGPT (multimodal) + Canva Pro** | L0-L1 baseline | $30/user + $15/mo | ✅ | Best starting point; ChatGPT understands images, Canva renders branded layouts |
| **Snapsight Remix** (launched May 2026) | Live-event multimodal AI: reports, decks, social, white papers from event content | Custom | ✅ | Cutting edge but specifically built for event content; great fit if recap is a renewal lever |
| **Livestorm AI** | Post-event content from recordings | Bundle with Livestorm | ⚠️ | Only if B9 uses Livestorm for any of their events |
| **Tome / Gamma / Decktopus** | AI deck generation | $20-30/mo | ✅ | Pair with NEW-11 capability deck personalizer |
| **Groove Jones / GenVFX** | Bespoke AI experiential activations (Adobe Summit Mantra Machine pattern) | Custom (very $$$) | ❌ | Phase 3+ only; only for premium activation budgets |

**Recommendation:**
- **Phase 2 (NEW-24):** ChatGPT multimodal + Canva Pro. ~$45/mo extra. Validates the recap quality pattern.
- **Phase 3 if recap becomes a recurring premium feature:** Evaluate Snapsight Remix for live-event content (note: most B9 events may not be Snapsight-shaped; assess fit case by case).

---

## Account Expansion / Customer Success (NEW-16, NEW-17, watchlist NEW-18, NEW-19)

| Tool | Purpose | Pricing | Fit | Notes |
|---|---|---|---|---|
| **ChatGPT + Gmail/Outlook API + structured prompts** | L0-L1 baseline | $30/user + dev | ✅ | Best for B9 scale; full control over data flow |
| **Gainsight Expansion Analyst** (Staircase AI) | Enterprise CS platform with expansion signal AI | Custom enterprise (~$500-1500/user/mo) | ❌ | Wildly over-scaled for B9 |
| **ChurnZero Beacon / Harbinger** | Mid-market CS with prebuilt AI agents | ~$X/mo | ⚠️ | Lighter than Gainsight but still CS-heavy for boutique |
| **HubSpot Service Hub** | CRM-native customer success | Per-tier | ⚠️ | Only if B9 already on HubSpot |
| **Folk** | Lightweight CRM with AI | $30-100/user/mo | ✅ | Modern, founder-friendly CRM; could be foundation if no CRM today |
| **Attio** | Lightweight CRM with AI workflows | $34-119/user/mo | ✅ | Modern alternative to Folk |

**Recommendation:**
- **If B9 has no CRM:** Phase 2 starts by adding lightweight CRM (Folk or Attio). $30-100/user/mo. Foundation for NEW-16 + NEW-17.
- **If B9 has HubSpot/Salesforce:** Phase 2 builds NEW-16 + NEW-17 on top via API; native AI features may suffice.
- **Skip:** Gainsight, ChurnZero — wrong scale, will sell hard, burn evaluation time.

---

## Compliance / AEDT Bias Audit (required for ROI-08 if NYC talent)

| Vendor | Purpose | Pricing | Notes |
|---|---|---|---|
| **Holistic AI** | NYC LL 144 bias audit | $5-20K per AEDT per year | Independent auditor; common choice |
| **Babl AI** | NYC LL 144 bias audit | $5-20K per AEDT per year | Independent auditor; specialized |
| **BSI** | Compliance audit (broader) | Custom | Enterprise option |

**Recommendation:** If NYC talent ≥15% of bookings, commission bias audit BEFORE shipping ROI-08. Budget $5-15K first year. Annual renewal required.

---

## Vendor decisions to NOT make right now

- Don't sign multi-year contracts on any vendor at Phase 1 / Phase 2 entry — month-to-month or 12-month max
- Don't evaluate enterprise platforms (Gainsight, Gong, Responsive Enterprise) until B9 has clear demand signal
- Don't replace StaffConnect — too disruptive; augment with overlays
- Don't add a 4th comms channel — pick 1-2 (SMS + email; or unified inbox via Whippy) and stop
- Don't add dedicated CS platform yet (Gainsight, ChurnZero) — too heavy

---

## Cost summary scenarios

### Minimal-stack Phase 2 (Branches A, B, C, D entry-level)
| Item | Monthly |
|---|---|
| ChatGPT Teams (5 users) | $150 |
| Twilio (low volume) | $20 |
| Canva Pro (3 users) | $45 |
| Tome or Gamma | $20 |
| **Total** | **~$235/month** |

### Mid-stack Phase 2 (Branch A with RFP throughput)
| Item | Monthly |
|---|---|
| Above baseline | $235 |
| AutoRFP.ai or Loopio | $500-1500 |
| **Total** | **~$735-1735/month** |

### Mid-stack Phase 2 (Branch B with operational expansion)
| Item | Monthly |
|---|---|
| Above baseline | $235 |
| Senegal Software | $300-800 |
| Dryrun (cash flow) | $100-300 |
| **Total** | **~$635-1335/month** |

### Mid-stack Phase 2 (Branch D with talent comms)
| Item | Monthly |
|---|---|
| Above baseline | $235 |
| Whippy or Sense | $200-600 |
| Twilio (higher volume) | $100 |
| **Total** | **~$535-935/month** |

### Annual one-time (Branch A only, if NYC talent triggers bias audit)
| Item | Annual |
|---|---|
| NYC LL 144 bias audit (Holistic AI or Babl AI) | $5,000-15,000 |
| Employment counsel review (4 use cases) | $2,000-5,000 |
| **Total** | **$7,000-20,000** |

### Realistic Phase 2 total cost (Brenda's view)
| Branch | Monthly run-rate | Annual one-time | Year 1 total |
|---|---|---|---|
| A (RFP-led) | $735-1735 | $7-20K | $16-41K |
| B (Operational) | $635-1335 | $2-5K | $9-21K |
| C (Account Expansion) | $300-700 | $2-5K | $6-13K |
| D (Talent-led) | $535-935 | $2-5K | $8-16K |

**For context:** these are SMALL numbers for the value at stake. Even Branch A's high end ($41K year 1) is sub-1% of B9's revenue if Brenda's revenue is in the $5M-25M range. Cost discipline is real but should not be the gating factor — Brenda's strategic clarity is the gating factor.

---

## Vendor evaluation checklist (use when reviewing any vendor)

Before recommending any vendor to Brenda, confirm:

- [ ] Customer logos include comparable scale (boutique premium, 20-50 people) — not just enterprise reference customers
- [ ] Pricing public or transparent on request (no "schedule demo for pricing" black holes)
- [ ] Month-to-month or 12-month max contract option (no 3-year lock-in for Phase 2)
- [ ] Data residency + ownership clear (especially for talent and client data)
- [ ] No training on B9's data without explicit opt-in
- [ ] API or export available (avoid lock-in)
- [ ] SOC 2 Type II at minimum
- [ ] Specific use case fit — not "AI for staffing" generally but "this exact workflow"
- [ ] Implementation cost + timeline realistic (be skeptical of "go-live in 2 weeks" claims)
- [ ] References available from customers at B9 scale

---

## What this matrix doesn't cover

- **StaffConnect itself** — I'm assuming it's B9's system of record but haven't validated. If Brenda is open to migration, that's a much bigger conversation.
- **Accounting platform** — assumed QuickBooks; could be Xero or other.
- **CRM** — depends on whether B9 has one and which.
- **Project management** — Asana / ClickUp / Notion / Airtable — should ask Brenda
- **Document storage** — Google Drive / Dropbox / SharePoint
- **Calendar** — Google / Outlook

These are foundational and shape vendor decisions but require Brenda's input in the discovery conversation (Q6).

