# Mission 6 Output: The CRM Migration Problem — Deep Dive for the Hero Demo

**Research question:** What are the specific, real-world challenges of enterprise CRM migration (Salesforce, Dynamics 365, Veeva, legacy)? Anchor scenario for the Agent Pipeline Visualizer demo — it needs to feel real.

**Date:** February 2026  
**Feeds:** Agent Pipeline Visualizer hero demo — "Migration Analysis" scenario

---

## 1. CRM Migration Process Map (Stages and Decision Points)

| Stage | Activities | Key decision points |
|-------|------------|----------------------|
| **Current-state assessment** | Data audit, customization inventory, integration map, compliance (GxP, residency, audit trail) | Scope in/out; what to migrate vs. rebuild vs. retire |
| **Business process & gap analysis** | Functional gaps, process alignment, UX differences (Salesforce vs. Dynamics vs. Veeva) | Build vs. configure; which custom objects/workflows carry over |
| **Data cleansing & mapping** | Dedupe, completeness, field mapping, object mapping (e.g. _vod vs _v in Veeva), transformation rules | Cleanse in source vs. in flight; mapping ownership |
| **Integration & dependency analysis** | Finance, ops, marketing, external systems; APIs, middleware (MuleSoft, Informatica, Jitterbit, custom) | Which integrations to migrate first; break/fix priority |
| **Test environment & cutover** | Test data, UAT, performance, validation at scale | Go/no-go; cutover window; rollback criteria |
| **Change management & adoption** | Training, UX transition (Salesforce → Dynamics is a big shift), support | Success criteria; adoption metrics |
| **Post-go-live** | Stabilization, optimization, compliance sign-off | Closure of migration project; handover to BAU |

---

## 2. Specific Pain Points (with quotes/practitioner context)

1. **"Migration is far more complex than simple lift and shift"** — Hidden customizations, duplicates, incomplete records, and outdated data can poison the target if migrated without cleansing (Netwoven, CongruentX, MSDW).

2. **Legacy and forgotten customizations** — Years of one-off objects, workflows, and automations; no one may remember why they exist. Carrying them forward perpetuates technical debt (MSDW, "Lessons I've Learned Migrating Complex Salesforce Solutions to Dynamics 365").

3. **Integration webs** — Custom objects, code, and integrations with finance, operations, marketing, and partners. "Breaking these integrations during migration can disrupt operations overnight" (Netwoven).

4. **UX and navigation differences** — Salesforce and Dynamics 365 differ fundamentally; users need retraining. "Overlooking these differences frustrates sales teams precisely when adoption is critical" (Netwoven, Dynamic Consultants Group).

5. **Unrealistic timelines** — Executive pressure for "seamless, don’t disrupt, go live in six months" despite complexity (MSDW).

6. **Data mapping and transformation** — Field-level and object-level mapping; semantic differences; data quality and ownership (Xoriant pharma case study; Informatica mapping docs; IntuitionLabs Veeva Vault playbook).

7. **Compliance during migration** — GxP, data residency, audit trail, validation (Infosys Veeva roadmap; IntuitionLabs). Life sciences and pharma add validation and documentation burden.

8. **AI strategy misalignment** — Einstein vs. Copilot roadmaps; migrating without aligning AI strategy leaves teams catching up later (Netwoven).

---

## 3. Where AI/Agents Fit in Each Stage

| Stage | AI/agent opportunity | What exists today |
|-------|----------------------|-------------------|
| **Current-state assessment** | Analyze codebase, custom objects, and dependencies; generate object/field inventories; flag compliance risks | Manual or tool-assisted; some static analysis |
| **Gap analysis** | Compare source vs. target capabilities; suggest build vs. buy vs. drop | Consulting and workshops; limited automation |
| **Data mapping** | Suggest field mappings from schema and samples; detect duplicates and anomalies | Informatica, custom ETL; some ML for matching |
| **Integration analysis** | Map API and integration dependencies; impact analysis | Manual and runbooks; partial tooling |
| **Testing** | Generate test cases; synthetic data; regression checks | QA tools; some AI-assisted test gen |
| **Documentation** | Migration runbooks, compliance docs, training summaries | Heavy manual effort |
| **Ongoing validation** | Monitor data quality and compliance post-cutover | Manual and spot checks |

**Gap:** No single pipeline that ties analysis → mapping → validation → human checkpoints in one visible flow. The hero demo can show a multi-agent pipeline with clear stages and human-in-the-loop at approval points (e.g. sign-off on mapping, go-live).

---

## 4. Where Human-in-the-Loop Is Essential (for demo checkpoint design)

- **Scope and prioritization** — What to migrate, what to retire, what to rebuild (business and technical judgment).
- **Business rules and semantics** — Implicit rules that live in people’s heads, not in code; mapping and transformation decisions (MSDW, "business rules problem").
- **Compliance and validation** — GxP and regulated industries: human sign-off on data integrity, audit trail, and validation evidence (Infosys, IntuitionLabs).
- **Cutover go/no-go** — Final approval based on test results, business readiness, and risk.
- **Conflict resolution** — When agents or tools suggest different mappings or priorities; human arbiter.
- **Change and adoption** — Training design, resistance handling, success criteria — inherently human-led.

**Demo design:** Show explicit "human checkpoint" nodes in the pipeline (e.g. after "Customization Analysis" and after "Compliance Validation") so Sarah (CDO) and David (Partner) see governance and control points.

---

## 5. Real Terminology and Artifacts (for demo realism)

- **Object naming:** Veeva CRM (Salesforce-based) uses `_vod` suffix; Vault CRM uses `_v` (IntuitionLabs). Use these in the demo where relevant.
- **Artifacts to reference:** Object maps, field mapping matrices, integration dependency matrix, test matrix (e.g. UAT scenarios), compliance checklist (GxP, data residency, audit), cutover runbook, rollback plan.
- **Tools:** MuleSoft, Informatica (mapping designer, configuration guidelines), Jitterbit, custom ETL; Veeva Vault migration playbook (current-state, gap analysis, data cleanse, test, cutover).
- **Roles:** Migration lead, data owner, integration owner, compliance/QA, change management.
- **Metrics:** Timeline (often 6–18+ months for large enterprises), data volume, number of custom objects and integrations, test case count, defect rates.

---

## 6. Enough Detail for the Demo to Feel Real

- **Scenario name:** e.g. "CRM Migration Analysis" or "Salesforce → Dynamics 365 Migration Readiness."
- **Pipeline stages (example):** (1) Source system discovery → (2) Customization & object analysis → (3) Data quality & mapping draft → (4) Integration impact analysis → (5) Compliance & validation checklist → (6) Human checkpoint: Approve mapping & scope → (7) Migration runbook draft → (8) Human checkpoint: Go/no-go for cutover.
- **Pain points to surface in UI/copy:** Hidden customizations, integration break risk, data quality, timeline pressure, GxP/audit, UX change for users.
- **Checkpoints:** At least one after "analysis" (e.g. approve scope/mapping) and one before "go-live" (e.g. sign-off on readiness). Labels like "Compliance review" or "Business approval" make the governance angle clear for Sarah and David.

Using this structure, the demo can look and feel like it was designed by someone who has run or advised real CRM migrations (Salesforce, Dynamics, Veeva, legacy) and understands data mapping, compliance, and human-in-the-loop decision points.

---

*Sources: CongruentX; MSDW "Lessons I've Learned Migrating Complex Salesforce Solutions to Dynamics 365"; Netwoven (7 mistakes); Dynamic Consultants Group; CRM Software Blog 2025; Xoriant (Informatica CRM migration pharma); IntuitionLabs (Veeva Vault CRM migration); Infosys (Veeva roadmap); Informatica mapping/preface docs.*
