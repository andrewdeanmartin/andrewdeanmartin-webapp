# Agent Pipeline Demo — Reference

> Source of truth for the multi-agent workflow analysis demo. Use for content updates, copy, and webapp consistency.

---

## Positioning

**Tagline:** Complex analysis without the wait. Watch a multi-agent pipeline work through a task in sequence — 5 agents, human checkpoints where it matters, full audit trail.

**Multi-domain:** Same agent roles; pluggable across CRM migration, data catalog rationalization, integration audits.

---

## Scenario

**Title:** Workflow Analysis (Domain-Agnostic)

**Before:** Schema A, Schema B, Schema C → **After:** Item #447 outside standard categories, 3 dependencies

**Stats:** 847 items • 12 sources • 3 edge cases • Complexity: 7.2/10

---

## Flow

```
Source Analyzer → Recommendation Engine → [Human Checkpoint] → Risk & Compliance → Validation Generator → Documentation Synthesizer
```

---

## Agents

### 1. Source Analyzer
- **Role:** Scans structure, volume, schema dependencies, referential integrity, external systems
- **Sample output:**
  - 847 items discovered across 12 sources
  - 234 items flagged with data quality issues
  - 8 dependency chains (schema, referential, external)
  - Estimated complexity: 7.2/10

### 2. Recommendation Engine
- **Role:** Generates categorized recommendations with confidence scores
- **Sample output:**
  - 612 items auto-categorized (95% confidence)
  - 142 items mapped with 75–90% confidence
  - 3 edge cases flagged for human review
  - Automation paths proposed for 89% of workflow

### 3. Human Checkpoint *(after Recommendation Engine)*
- **Trigger:** Confidence < threshold or items fall outside standard categories
- **Context:** Item #447 outside standard categories — 3 dependencies, 2 workflow paths.
- **Question:** How should this edge case be handled?

**Options:**

| ID       | Label               | Description                                                 |
|----------|---------------------|-------------------------------------------------------------|
| approve  | Create Custom Path  | Define a new category and routing rule for this item type   |
| modify   | Merge Into Existing | Map to the closest match with manual override flag          |
| escalate | Escalate for Review | Flag for stakeholder input before proceeding               |

### 4. Risk & Compliance Assessor
- **Role:** Evaluates regulatory impact, data residency, and compliance gaps
- **Sample output:**
  - 14 items containing sensitive data identified
  - 3 items flagged for additional validation
  - Compliance checklist generated (47 items)
  - Overall risk score: MEDIUM-HIGH

### 5. Validation Generator
- **Role:** Produces validation rules, edge-case coverage, and fallback procedures
- **Sample output:**
  - 156 validation rules generated
  - 34 edge-case scenarios documented
  - 12 integration checks defined
  - Estimated validation effort: 48 person-hours

### 6. Documentation Synthesizer
- **Role:** Compiles runbook, executive summary, and decision log
- **Sample output:**
  - Executive summary generated (1 page)
  - Full analysis document compiled
  - 3 items requiring follow-up highlighted
  - Estimated timeline: 2–3 weeks
  - Estimated effort: 120 person-hours

---

## Summary Metrics (Post-Run)

| Metric        | Value  |
|---------------|--------|
| Items         | 847    |
| Auto-Processed| 612    |
| Validations   | 202    |
| Checkpoints   | 1      |
| Timeline      | 2–3 wk |
| Effort        | 120 hrs|

**Footer:** Checkpoint triggered: 1 item below confidence threshold. 5 agents in sequence. Full audit trail above.

---

## Audit Trail (Sample)

```
[09:00:00] Pipeline initiated — Workflow Analysis | 847 items | 12 sources
[09:00:01] Agent: Source Analyzer | Status: Complete | Items: 847 | Sources: 12 | Quality Issues: 28%
[09:03:32] Agent: Recommendation Engine | Status: Complete | Auto-categorized: 612 | Human Review: 3 edge cases
[09:03:35] PIPELINE PAUSED — Human decision required (confidence < threshold): Item #447
[09:04:12] HUMAN DECISION: [Create Custom Path | Merge Into Existing | Escalate for Review] — Pipeline resuming...
[09:07:15] Agent: Risk & Compliance | Status: Complete | Sensitive Items: 14 | Checklist: 47 | Risk: MEDIUM-HIGH
[09:10:42] Agent: Validation Generator | Status: Complete | Rules: 202 | Effort: 48 hrs
[09:12:55] Agent: Documentation Synthesizer | Status: Complete | Follow-ups: 3 | Effort: 120 hrs
[09:12:58] Pipeline complete — All 5 agents finished. 1 human decision recorded.
```

---

## Implementation Notes

- **Demo location:** `site/index.html` (demo-pipeline panel), `site/script.js` (pipelineAgents, humanCheckpoint)
- **Run button:** `#pipeline-run-btn` — Resets: `#pipeline-reset-btn`
- **Human checkpoint:** Renders in `#checkpoint-decisions`; awaits user choice before continuing
- **Agent IDs:** `source-analyzer`, `mapping-recommender`, `risk-compliance`, `test-generator`, `doc-synthesizer`
