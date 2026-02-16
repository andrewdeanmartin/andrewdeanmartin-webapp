/* Prompt Refinement Demo - PC panels + drag-and-drop */
(function() {
    const scenarios = {
        stakeholder: {
            roughPrompt: "update leadership on the project",
            scenarioHint: "Typical vague ask from a delivery lead",
            refinedPrompt: `You are a delivery lead providing a sprint progress update to executive stakeholders (VP-level and above, non-technical audience).

Your task: Summarize the current sprint's progress, identify any blockers requiring leadership attention or escalation, and outline clear next steps with accountability.

Context and constraints:
• Audience expects outcome-focused communication, not implementation details
• Keep each section to 2-3 bullets maximum (respect executive time)
• Use plain language—avoid jargon, acronyms, or technical terms
• Highlight items that require executive decision-making or resources
• Be honest about status; don't sugarcoat blockers

Required output structure:

**1. Sprint Progress** (what was delivered)
   - List 2-3 key deliverables or outcomes completed this sprint
   - Focus on business value, not tasks

**2. Current Status** 
   - State clearly: On track / At risk / Blocked
   - Include brief explanation (one sentence)

**3. Blockers/Issues**
   - List any items requiring leadership action, budget approval, or escalation
   - For each blocker, state: what it is, why it matters, what decision is needed

**4. Next Steps** 
   - Top 3 priorities for the next sprint
   - Include expected completion dates where relevant

**5. Support Needs**
   - Any resources, approvals, or decisions required from leadership
   - Be specific about timing (e.g., "Budget approval needed by Friday to maintain timeline")

Now, provide the update based on the following project context:

Project: [Describe your project name and current sprint goals]
Current sprint dates: [Start date - End date]
Key context: [Any relevant background leadership should know]`,
            finalAnswer: `**1. Sprint Progress**
• Completed user authentication module with SSO integration (enables 500+ enterprise users to access platform)
• Deployed staging environment with automated CI/CD pipeline (reduced deployment time from 4 hours to 15 minutes)
• Resolved 12 of 15 P1 bugs identified in QA testing

**2. Current Status**
On track for production release on schedule (March 15).

**3. Blockers/Issues**
• **Legal review for data retention policy** — Currently blocking production deployment. Legal team has 2-week backlog; we need sign-off by March 8 to maintain launch date. Decision needed: Can we expedite legal review or adjust launch timeline?
• **Azure production infrastructure budget** — Requires $12K/month approval. Estimate submitted February 1, pending finance approval. Need decision by Friday (Feb 16) to provision resources in time for launch.

**4. Next Steps**
1. Complete final security penetration test (estimated 3 days, completion Feb 19)
2. Production deployment pending legal sign-off (target: March 10-12)
3. Begin user training materials development (Feb 20-28)

**5. Support Needs**
• **Expedite legal review** — Request priority review from legal team (currently 2-week backlog)
• **Budget approval by Feb 16** — $12K/month Azure production infrastructure to maintain timeline
• **Stakeholder communication** — Need exec sponsor to notify end users of March 15 launch date`
        },
        architecture: {
            roughPrompt: "check if this system is ready for production",
            scenarioHint: "Common before-deployment request",
            refinedPrompt: `You are a senior software architect conducting a production readiness assessment for a system about to be deployed to production.

Your task: Evaluate the system across four critical dimensions—reliability, scalability, security, and operational readiness. Identify any blocking issues and provide a prioritized remediation roadmap with effort estimates.

Context and constraints:
• Audience: Engineering leadership and CTO (technical but executive-level)
• Tone: Direct, evidence-based, no speculation—cite specific findings
• Scope: Full-stack assessment covering frontend, backend, infrastructure, CI/CD, monitoring, and documentation
• Classify every finding by severity: Critical (blocks production) / High (address before launch) / Medium (post-launch) / Low (technical debt)
• Include specific evidence for each finding—no vague statements like "security is weak"
• Provide realistic remediation effort estimates for Critical and High severity items

Assessment criteria:

**Reliability:**
• Error handling and recovery mechanisms
• Circuit breakers for external dependencies
• Database connection pooling and failover
• Graceful degradation strategies

**Scalability:**
• Load testing results (can it handle expected traffic?)
• Horizontal scaling capability
• Database query performance and indexing
• Caching strategy (if applicable)

**Security:**
• Authentication and authorization mechanisms
• Input validation and sanitization (SQL injection, XSS, CSRF protection)
• Secrets management (no hardcoded credentials)
• API security (rate limiting, HTTPS enforcement)
• Dependency vulnerabilities (recent CVE scan results)

**Operational Readiness:**
• Monitoring and alerting (error rates, latency, resource utilization)
• Logging strategy (structured logs, retention policy)
• Deployment automation and rollback capability
• Documentation (runbooks, architecture diagrams, API specs)

Required output structure:

**1. Executive Summary** (max 5 sentences)
   - Overall production readiness: Ready / Ready with conditions / Not ready
   - Number of Critical/High/Medium/Low findings
   - Top 3 risks to production stability
   - Estimated total remediation effort

**2. Critical Findings** (blocks production deployment)
   - For each: Title, specific evidence, business impact, remediation steps, effort estimate

**3. High Priority Findings** (must address before or immediately after launch)
   - Same format as Critical

**4. Medium and Low Findings** (summarized)
   - Brief list, can be addressed post-launch

**5. Prioritized Action Plan**
   - Week-by-week roadmap to production readiness
   - Clear ownership for each item

Now, assess the following system:

[Paste system documentation, architecture diagrams, codebase overview, or provide access to the repository]`,
            finalAnswer: `**1. Executive Summary**
System is NOT ready for production deployment. Assessment identified 3 Critical and 5 High severity findings that must be addressed. Primary risks: (1) SQL injection vulnerabilities in 3 API endpoints, (2) no circuit breakers causing cascading failures, (3) insufficient monitoring/alerting. Overall system health score: 6.8/10. Estimated remediation effort: 48-72 hours (2-3 weeks calendar time with testing).

**2. Critical Findings**

**[CRITICAL] SQL Injection Vulnerability in User Input Endpoints**
• **Evidence:** Manual testing confirmed 3 API endpoints (/api/search, /api/users/filter, /api/reports/query) accept unvalidated user input and pass it directly to SQL queries using string concatenation. Proof-of-concept exploit successful in staging environment.
• **Business Impact:** Attackers can read/modify/delete database records, extract sensitive customer data, or cause data corruption. Regulatory violation (GDPR, SOC2).
• **Remediation:** 
  1. Replace all dynamic SQL with parameterized queries/prepared statements
  2. Implement input validation middleware with whitelist-based sanitization
  3. Add automated SQL injection testing to CI/CD pipeline
  4. Conduct penetration test after fix
• **Effort:** 16 hours development + 8 hours testing = 24 hours total

**[CRITICAL] No Circuit Breakers on External Dependencies**
• **Evidence:** Load testing revealed that when the payment gateway API becomes unavailable, the entire application hangs (120s timeout per request). Under load (500 concurrent users), this caused memory exhaustion and application crash.
• **Business Impact:** Single external service failure takes down entire platform. No graceful degradation. Customer-facing outages.
• **Remediation:**
  1. Implement circuit breaker pattern for all external API calls (payment gateway, email service, analytics)
  2. Define fallback behavior (queue for retry, show cached data, or fail gracefully with user message)
  3. Add circuit breaker state to monitoring dashboards
• **Effort:** 24 hours development + 12 hours testing = 36 hours total

**3. High Priority Findings**

**[HIGH] Insufficient Monitoring and Alerting**
• **Evidence:** No alerting configured for error rates, API latency, or database connection pool exhaustion. Operations team discovers issues when customers report problems.
• **Remediation:** Configure CloudWatch alarms for error rate >1%, p95 latency >2s, DB connection pool >80%, CPU >75%. Integrate with PagerDuty for on-call escalation.
• **Effort:** 8 hours

**[HIGH] Missing Database Indexes on High-Traffic Queries**
• **Evidence:** Query profiling shows 4 frequently-used queries (user search, report generation) performing full table scans. Average query time: 3.2 seconds under load.
• **Remediation:** Add composite indexes on user.email + user.status, reports.created_at + reports.user_id. Estimated performance improvement: 3.2s → 180ms.
• **Effort:** 4 hours (includes testing and staged rollout)

**[HIGH] Secrets Hardcoded in Configuration Files**
• **Evidence:** Database connection strings, API keys, and JWT signing secrets found in plaintext in application.yml committed to git repository.
• **Remediation:** Migrate to AWS Secrets Manager. Update deployment pipeline to fetch secrets at runtime. Rotate all exposed credentials.
• **Effort:** 12 hours

**4. Medium and Low Findings** (Post-Launch)
• [MEDIUM] Test coverage at 23% (target: 60% for critical paths)
• [MEDIUM] No automated backup verification (backups run but never tested for restore)
• [LOW] API documentation outdated (6 new endpoints not documented)
• [LOW] Error messages expose stack traces in production mode

**5. Prioritized Action Plan**

**Week 1 (48 hours):**
• Fix SQL injection vulnerabilities (P0 blocker)
• Rotate hardcoded secrets and migrate to Secrets Manager
• Add database indexes

**Week 2 (32 hours):**
• Implement circuit breakers for external dependencies
• Configure monitoring and alerting (CloudWatch + PagerDuty)
• Conduct penetration test on fixed vulnerabilities

**Week 3 (16 hours):**
• Final load testing with all fixes in place
• Document runbooks for operations team
• Validation and sign-off for production deployment

**Recommendation:** Do NOT deploy to production until Critical findings are resolved and High findings have mitigation plans in place. Estimated timeline to production readiness: 3 weeks.`
        },
        migration: {
            roughPrompt: "analyze this for migration",
            scenarioHint: "Often heard when evaluating platform changes",
            refinedPrompt: `You are a platform solutions architect conducting a migration feasibility analysis for a client considering migrating from their current system/platform to a new target platform.

Your task: Assess the source system's complexity, identify migration risks, estimate effort and cost, and recommend the most appropriate migration approach (lift-and-shift, re-platform, or re-architect).

Context and constraints:
• Audience: Technical leadership (CTO, Engineering Managers) and project sponsors (VP/C-level decision-makers)
• Tone: Analytical, risk-aware, evidence-based—no sugar-coating
• Scope: Full assessment covering data model, custom code, integrations, compliance requirements, and user training
• Provide specific metrics wherever possible (e.g., "127 custom objects" not "many customizations")
• Classify complexity and risk as Low / Medium / High for each area, with specific reasoning
• Include estimated effort in person-hours or T-shirt sizes (S/M/L/XL)
• Highlight compliance, regulatory, and contractual constraints (downtime windows, data residency, audit trails)

Assessment criteria:

**Data Model:**
• Number and complexity of objects/tables/entities
• Relationships and dependencies (many-to-many, hierarchical, self-referencing)
• Data volume (number of records, storage size)
• Data quality issues (incomplete records, inconsistent formats, duplicate entries)
• Historical data retention requirements

**Customizations:**
• Custom code (triggers, workflows, business logic, scripts)
• UI customizations (layouts, components, custom pages)
• Reports and dashboards
• Email templates and communication automation

**Integrations:**
• Number and type of integrations (APIs, batch jobs, middleware, ETL)
• Integration patterns (real-time vs. batch, inbound vs. outbound)
• Third-party systems involved (CRM, ERP, marketing automation, BI tools)
• API compatibility (REST, SOAP, deprecated endpoints)

**Compliance and Governance:**
• Data privacy regulations (GDPR, CCPA, HIPAA)
• Audit trail and change tracking requirements
• Data residency and sovereignty constraints
• Role-based access control (RBAC) and permission model complexity

**User Adoption:**
• Number of users and user roles
• Geographic distribution and language requirements
• Training complexity (how different is the target platform?)
• Change management considerations

Required output structure:

**1. Current State Assessment**
Provide a quantified summary of the source system:
   • Data model: [number] objects, [number] fields, [number] relationship types, [volume] records
   • Customizations: [number] workflows, [number] custom scripts ([LOC]), [number] custom UI components
   • Integrations: [number] active integrations—list each by name and type (real-time API, batch, webhook, etc.)
   • Users: [number] active users across [number] roles/profiles

**2. Migration Considerations** (Table Format)

| Area | Complexity | Risk Level | Key Findings & Notes |
|------|------------|------------|----------------------|
| Data migration | [L/M/H] | [L/M/H] | Volume: [X] records. [any data quality issues? legacy formats requiring transformation?] |
| Custom logic | [L/M/H] | [L/M/H] | [how much code needs rewrite? equivalent features in target platform?] |
| Integrations | [L/M/H] | [L/M/H] | [how many require rebuild? API compatibility issues?] |
| Compliance | [L/M/H] | [L/M/H] | [any regulatory constraints? data residency? audit requirements?] |
| User training | [L/M/H] | [L/M/H] | [how different is target platform UX? training effort required?] |

**3. Migration Approach Recommendation**
   • **Recommended approach:** Lift-and-shift / Re-platform / Re-architect / Hybrid
   • **Rationale:** [Why this approach? What are the tradeoffs?]
   • **Alternatives considered:** [What other approaches were evaluated and why were they rejected?]

**4. Effort and Cost Estimate**
   • **Total estimated effort:** [X]-[Y] person-weeks or [X]-[Y] person-hours
   • **Breakdown by phase:**
   • **Estimated cost range:** $[X] - $[Y]

**5. Key Risks and Mitigation Strategies**

**6. Timeline and Milestones**

**7. Go/No-Go Recommendation**

Now, analyze the following system for migration:

[Paste or provide: system/platform name, documentation, data model/schema, integration architecture, user count, compliance requirements, or repository access]`,
            finalAnswer: `**1. Current State Assessment**

**Source Platform:** Salesforce Classic (custom CRM implementation for B2B SaaS company)
**Data Model:**
   • 127 custom objects, 412 custom fields, 23 relationship types
   • Data volume: 2.4M records (Accounts: 48K, Contacts: 312K)
   • Storage: 87 GB total

**Customizations:**
   • 34 workflow automations (Workflow Rules + Process Builder)
   • 8 Apex classes (2,400 lines)—commission calc, territory assignment, approval workflows
   • 12 Visualforce pages, 47 custom reports, 8 dashboards

**Integrations:** 6 active (Marketo, NetSuite, Slack, DocuSign, Zendesk, Tableau)

**Users:** 200 active across 12 roles (US/EMEA/APAC, 3 languages)

---

**2. Migration Considerations**

| Area | Complexity | Risk | Key Findings |
|------|------------|------|--------------|
| Data migration | High | Medium | 2.4M records; 28% incomplete; 3 legacy formats need transformation |
| Custom logic | Medium | High | 8 Apex classes require rewrite—HubSpot has no Apex equivalent (120-160 hrs) |
| Integrations | High | High | 4 of 6 require rebuild (Marketo, NetSuite, Zendesk, DocuSign) — 200-280 hrs |
| Compliance | Medium | Medium | GDPR, EU data residency supported by target |
| User training | Medium | Low | 4 hrs/user (800 total); sales team change-resistant |

---

**3. Migration Approach: Re-platform (not lift-and-shift)**

Lift-and-shift infeasible—HubSpot has different architecture; Apex/Visualforce have no equivalent. Re-architect rejected—core workflows map to HubSpot. Hybrid rejected—client wants consolidation.

---

**4. Effort and Cost**

**Total:** 16-20 weeks, 1,400-1,800 person-hours
**Cost:** $280K - $340K (blended $200/hr)

---

**5. Key Risks**

• **Integration API incompatibility** — Mitigate: API assessment, build stubs early, parallel run
• **Data quality delays** — Mitigate: Remediate in parallel with discovery
• **User adoption failure** — Mitigate: VP Sales sponsorship, power-user involvement
• **Downtime SLA breach** — Mitigate: Saturday cutover, rehearsal, rollback plan

---

**7. Go/No-Go: Proceed with conditions**

Conditions: Executive sponsorship, integration partner confirmation within 2 weeks, data remediation starts now, 22-24 week timeline (not 12-14).`
        }
    };

    const PROMPT_DEMO_SEEN_KEY = 'prompt-demo-overlay-seen';

    function init() {
        const panel = document.getElementById('demo-prompt');
        if (!panel) return;

        const roughSource = document.getElementById('prompt-demo-rough-source');
        const roughText = document.getElementById('prompt-demo-rough-text');
        const scenarioHintEl = document.getElementById('prompt-demo-scenario-hint');
        const messages1 = document.getElementById('prompt-demo-messages1');
        const messages2 = document.getElementById('prompt-demo-messages2');
        const dropHint1 = document.getElementById('prompt-demo-drop-hint1');
        const dropHint2 = document.getElementById('prompt-demo-drop-hint2');
        const playBtn = document.getElementById('prompt-demo-playBtn');
        const copyIndicator = document.getElementById('prompt-demo-copyIndicator');
        const overlay = document.getElementById('prompt-demo-overlay');
        const overlayDismiss = document.getElementById('prompt-demo-overlay-dismiss');
        const scenarioBtns = panel.querySelectorAll('.scenario-btn');

        if (!roughSource || !messages1 || !messages2 || !playBtn) return;

        let currentScenario = 'stakeholder';
        let isPlaying = false;
        let stage1Complete = false;
        let stage2Ready = false;

        function copyToClipboard(text) {
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(text).catch(() => {});
            }
        }

        function updateRoughText() {
            roughText.textContent = scenarios[currentScenario].roughPrompt;
            if (scenarioHintEl) scenarioHintEl.textContent = scenarios[currentScenario].scenarioHint || '';
        }

        function updateDropHints() {
            messages1.classList.toggle('has-messages', messages1.querySelectorAll('.message').length > 0);
            messages2.classList.toggle('has-messages', messages2.querySelectorAll('.message').length > 0);
        }

        scenarioBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                if (isPlaying) return;
                scenarioBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                currentScenario = btn.dataset.scenario;
                resetDemo();
            });
        });

        function addMessage(container, type, content, isStructured = false, draggableRefined = false) {
            const msg = document.createElement('div');
            msg.className = `message ${type}`;
            const bubble = document.createElement('div');
            bubble.className = 'message-bubble';
            if (draggableRefined) {
                bubble.classList.add('draggable-refined');
                bubble.draggable = true;
                bubble.dataset.refinedPrompt = content;
            }
            if (isStructured) {
                const label = document.createElement('div');
                label.className = 'structured-label';
                label.textContent = 'Structured Prompt';
                bubble.appendChild(label);
            }
            const text = document.createElement('pre');
            text.textContent = content;
            bubble.appendChild(text);
            msg.appendChild(bubble);
            container.appendChild(msg);
            container.scrollTop = container.scrollHeight;
            updateDropHints();
        }

        function addTypingIndicator(container) {
            const msg = document.createElement('div');
            msg.className = 'message ai';
            msg.id = 'prompt-demo-typing';
            const bubble = document.createElement('div');
            bubble.className = 'message-bubble typing';
            bubble.innerHTML = '<div class="typing-dot"></div><div class="typing-dot"></div><div class="typing-dot"></div>';
            msg.appendChild(bubble);
            container.appendChild(msg);
            container.scrollTop = container.scrollHeight;
            updateDropHints();
        }

        function removeTypingIndicator() {
            const ind = document.getElementById('prompt-demo-typing');
            if (ind) ind.remove();
            updateDropHints();
        }

        function showCopyIndicator(textToCopy) {
            if (textToCopy) copyToClipboard(textToCopy);
            if (copyIndicator) {
                copyIndicator.classList.add('visible');
                setTimeout(() => copyIndicator.classList.remove('visible'), 1500);
            }
        }

        function addDropLandedFeedback(zone) {
            zone.classList.add('drop-landed');
            setTimeout(() => zone.classList.remove('drop-landed'), 400);
        }

        async function onDropStage1(payload) {
            if (stage1Complete || isPlaying) return;
            isPlaying = true;
            playBtn.disabled = true;

            if (roughSource) roughSource.classList.add('hidden');

            dropHint1.style.display = 'none';
            messages1.classList.add('has-messages');
            addDropLandedFeedback(messages1);

            addMessage(messages1, 'user', payload);
            await new Promise(r => setTimeout(r, 600));
            addTypingIndicator(messages1);
            await new Promise(r => setTimeout(r, 1800));
            removeTypingIndicator();
            const scenario = scenarios[currentScenario];
            addMessage(messages1, 'ai', scenario.refinedPrompt, true, true);
            stage1Complete = true;
            stage2Ready = true;
            isPlaying = false;
            playBtn.disabled = false;

            attachRefinedDragListeners();
        }

        async function onDropStage2(payload) {
            if (!stage2Ready || !payload) return;
            isPlaying = true;
            playBtn.disabled = true;
            stage2Ready = false;

            showCopyIndicator(payload);
            addDropLandedFeedback(messages2);
            dropHint2.style.display = 'none';
            messages2.classList.add('has-messages');

            addMessage(messages2, 'user', payload);
            await new Promise(r => setTimeout(r, 600));
            addTypingIndicator(messages2);
            await new Promise(r => setTimeout(r, 2200));
            removeTypingIndicator();
            const scenario = scenarios[currentScenario];
            addMessage(messages2, 'ai', scenario.finalAnswer);

            playBtn.textContent = '↻ Reset & try again';
            isPlaying = false;
            playBtn.disabled = false;
        }

        function attachRefinedDragListeners() {
            const refinedBubbles = messages1.querySelectorAll('.draggable-refined');
            refinedBubbles.forEach(bubble => {
                const text = bubble.dataset.refinedPrompt || '';
                bubble.ondragstart = (e) => {
                    e.dataTransfer.setData('text/plain', text);
                    e.dataTransfer.effectAllowed = 'copy';
                    bubble.classList.add('dragging-lift');
                    showCopyIndicator(text);
                };
                bubble.ondragend = () => bubble.classList.remove('dragging-lift');
                bubble.onclick = () => {
                    if (stage2Ready && text) onDropStage2(text);
                };
            });
        }

        function setupDropZone(zone, handler) {
            zone.addEventListener('dragover', (e) => {
                e.preventDefault();
                e.dataTransfer.dropEffect = 'copy';
                zone.classList.add('drag-over');
            });
            zone.addEventListener('dragleave', (e) => {
                if (!zone.contains(e.relatedTarget)) zone.classList.remove('drag-over');
            });
            zone.addEventListener('drop', (e) => {
                e.preventDefault();
                zone.classList.remove('drag-over');
                const payload = e.dataTransfer.getData('text/plain');
                if (payload) handler(payload);
            });
        }

        setupDropZone(messages1, onDropStage1);
        setupDropZone(messages2, onDropStage2);

        roughSource.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', scenarios[currentScenario].roughPrompt);
            e.dataTransfer.effectAllowed = 'copy';
            roughSource.classList.add('dragging');
        });
        roughSource.addEventListener('dragend', () => roughSource.classList.remove('dragging'));

        roughSource.addEventListener('click', () => {
            if (!stage1Complete && !isPlaying) onDropStage1(scenarios[currentScenario].roughPrompt);
        });

        roughSource.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                if (!stage1Complete && !isPlaying) onDropStage1(scenarios[currentScenario].roughPrompt);
            }
        });

        async function playDemo() {
            if (isPlaying) return;
            isPlaying = true;
            playBtn.disabled = true;
            playBtn.textContent = 'Playing...';

            const scenario = scenarios[currentScenario];
            roughSource.classList.add('hidden');
            dropHint1.style.display = 'none';
            messages1.classList.add('has-messages');

            addMessage(messages1, 'user', scenario.roughPrompt);
            await new Promise(r => setTimeout(r, 600));
            addTypingIndicator(messages1);
            await new Promise(r => setTimeout(r, 1800));
            removeTypingIndicator();
            addMessage(messages1, 'ai', scenario.refinedPrompt, true, true);
            stage1Complete = true;
            stage2Ready = true;
            attachRefinedDragListeners();

            showCopyIndicator(scenario.refinedPrompt);
            await new Promise(r => setTimeout(r, 1800));

            dropHint2.style.display = 'none';
            messages2.classList.add('has-messages');
            addMessage(messages2, 'user', scenario.refinedPrompt);
            await new Promise(r => setTimeout(r, 600));
            addTypingIndicator(messages2);
            await new Promise(r => setTimeout(r, 2200));
            removeTypingIndicator();
            addMessage(messages2, 'ai', scenario.finalAnswer);

            stage2Ready = false;
            isPlaying = false;
            playBtn.textContent = '↻ Reset & try again';
            playBtn.disabled = false;
        }

        function resetDemo() {
            messages1.querySelectorAll('.message').forEach(m => m.remove());
            messages2.querySelectorAll('.message').forEach(m => m.remove());
            messages1.classList.remove('has-messages');
            messages2.classList.remove('has-messages');
            if (dropHint1) dropHint1.style.display = '';
            if (dropHint2) dropHint2.style.display = '';
            if (roughSource) {
                roughSource.classList.remove('hidden');
                updateRoughText();
            }
            stage1Complete = false;
            stage2Ready = false;
            playBtn.textContent = '▶ Or Play to watch';
            playBtn.disabled = false;
            isPlaying = false;
        }

        playBtn.addEventListener('click', () => {
            if (playBtn.textContent === '↻ Reset & try again') resetDemo();
            else playDemo();
        });

        function showOverlay() {
            if (overlay && !localStorage.getItem(PROMPT_DEMO_SEEN_KEY)) {
                overlay.classList.add('visible');
                overlay.setAttribute('aria-hidden', 'false');
            }
        }

        function hideOverlay() {
            if (overlay) {
                overlay.classList.remove('visible');
                overlay.setAttribute('aria-hidden', 'true');
                localStorage.setItem(PROMPT_DEMO_SEEN_KEY, '1');
            }
        }

        if (overlayDismiss) overlayDismiss.addEventListener('click', hideOverlay);
        panel.addEventListener('click', hideOverlay, { once: true });
        panel.addEventListener('touchstart', hideOverlay, { once: true, passive: true });

        updateRoughText();
        updateDropHints();
        showOverlay();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
