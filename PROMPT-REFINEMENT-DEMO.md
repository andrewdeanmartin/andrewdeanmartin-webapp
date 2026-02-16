# Prompt Refinement Demo — Technical Documentation

**Primary:** Embedded in `site/index.html` (Demos → Prompt Engineering tab) + `site/prompt-demo.js`  
**Standalone:** `site/prompt-refinement-demo.html` (legacy page)  
**Purpose:** Interactive demo showing two-stage prompt optimization workflow  
**Created:** February 2025  
**Owner:** Andrew Dean Martin  

---

## 1. What This Demo Does

### The Workflow

This demo visually demonstrates the **meta-prompting workflow** where:

1. **Stage 1 (Prompt Optimizer):** User drags or taps a rough prompt → AI refines it into a structured, enterprise-ready prompt using **Role → Task → Context → Requirements → Output**
2. **Stage 2 (ChatGPT/Claude):** User drags or taps the refined prompt into the target chat → produces high-quality, professional output
3. **Copy to clipboard:** Refined prompt is copied when used (real clipboard API)

### Why It Matters

**Problem:** Vague prompts ("update leadership on the project") produce inconsistent, low-quality outputs across teams. No repeatability, auditability, or governance.

**Solution:** Structured prompts eliminate ambiguity and produce consistent results. The demo proves this visually in PC-style conversational panels (enterprise-focused, works on desktop and mobile).

**Target Audience:**
- **Business leaders** evaluating prompt engineering methodologies
- **Consultants** demonstrating enterprise AI governance
- **Engineers** learning structured prompt design
- **Recruiters/hiring managers** assessing Andrew's prompt engineering expertise

---

## 2. Technical Architecture

### Stack
- **Pure frontend** — HTML, CSS, vanilla JS (no build step)
- **No dependencies** — No frameworks or external APIs
- **No API calls** — All scenarios pre-scripted (proves methodology, not live AI)
- **Responsive** — Desktop (drag) and mobile (tap) support

### File Structure (Embedded Demo)

```
site/
├── index.html           # Portfolio; #demo-prompt panel contains inline demo
├── prompt-demo.js       # Scenarios, drag-and-drop, tap handlers, playDemo
├── styles.css           # .prompt-demo-inline (PC panels, drop zones, etc.)
└── prompt-refinement-demo.html  # Standalone page (legacy, different layout)
```

**Embedded demo components:**
- Draggable rough prompt source (tap/click fallback for mobile)
- Two PC-style chat panels (Stage 1: Optimizer, Stage 2: ChatGPT/Claude)
- Drop zones with visual feedback
- Play button for watch-only mode
- First-time instructional overlay (localStorage)

### Key Technologies
- **HTML5 Drag and Drop API** + click/tap for touch devices
- **navigator.clipboard** for copy-to-clipboard
- **Vanilla JavaScript** (ES6, IIFE)
- **CSS animations** for typing indicators, drop feedback

---

## 3. Current Scenarios

The demo includes **3 enterprise scenarios** with A+ quality prompts:

### Scenario 1: Stakeholder Update
- **Rough prompt:** "update leadership on the project"
- **Refined prompt:** 300+ word structured prompt defining role (delivery lead), task (sprint update), context (VP-level audience), requirements (2-3 bullets max, plain language), and output format (5 sections)
- **Final answer:** Realistic sprint update with progress, blockers, budget approval needs, and specific dates

### Scenario 2: Architecture Review
- **Rough prompt:** "check if this system is ready for production"
- **Refined prompt:** 500+ word production readiness assessment framework covering reliability, scalability, security, operational readiness with severity classification
- **Final answer:** Detailed assessment with 3 critical findings (SQL injection, circuit breakers, monitoring), remediation steps, effort estimates, and 3-week action plan

### Scenario 3: Migration Analysis
- **Rough prompt:** "analyze this for migration"
- **Refined prompt:** 800+ word migration feasibility analysis framework covering data model, customizations, integrations, compliance, with table format for risk assessment
- **Final answer:** 2,000+ word analysis with specific metrics (127 objects, 2.4M records), risk matrix, timeline, cost estimate ($280K-$340K), and go/no-go recommendation

**Quality bar:** All prompts and answers are production-grade. They would produce genuinely useful outputs if used in real enterprise scenarios.

---

## 4. How the Demo Works (User Experience)

### Interactive Flow (drag or tap)

1. **User arrives** (Demos → Prompt Engineering tab)
   - First-time: Overlay explains "Drag your prompt into the left panel…" (dismiss on tap/click)
   - Sees rough prompt card, 3 scenario buttons, two PC chat panels

2. **User selects scenario** — Resets demo, updates rough prompt and hint

3. **User drags or taps rough prompt** into left panel
   - Rough prompt appears as user message
   - Typing indicator (2s)
   - Refined prompt appears (labeled "Structured Prompt")

4. **User drags or taps refined prompt** into right panel
   - Refined prompt copied to clipboard
   - "Copied! ✓" indicator flashes
   - Right panel shows refined prompt → typing → final answer

5. **Done** — Button changes to "↻ Reset & try again"

### Watch Mode
- Click **"▶ Or Play to watch"** — Auto-runs full flow without interaction

### Timing
- Message appearance: 300ms
- Typing indicator: ~1.8–2.2s
- Copy transition: ~1.5s
- Total: ~10–12 seconds

---

## 5. Code Architecture

### JavaScript Structure

```javascript
// Scenario data (lines 569-852)
const scenarios = {
    stakeholder: {
        roughPrompt: "...",
        refinedPrompt: "...",  // Full structured prompt
        finalAnswer: "..."      // High-quality answer
    },
    architecture: { ... },
    migration: { ... }
};

// State management
let currentScenario = 'stakeholder';  // Default
let isPlaying = false;                // Prevents double-play

// Core functions
addMessage(container, type, content, isStructured)  // Adds chat bubble
addTypingIndicator(container)                       // Shows "..."
removeTypingIndicator()                            // Removes "..."
showCopyIndicator()                                // Shows "Copied!"
playDemo()                                         // Main orchestration
resetDemo()                                        // Clears state
```

### Key Design Decisions

1. **Pre-scripted scenarios (not live AI)**
   - **Why:** Demo proves methodology, not API integration
   - **Benefit:** No API costs, instant loading, works offline
   - **Trade-off:** Limited to 3 scenarios (extensible by adding more)

2. **Single HTML file**
   - **Why:** Easy to deploy, no build step, portable
   - **Benefit:** Works anywhere (GitHub Pages, S3, local file)
   - **Trade-off:** Harder to maintain at scale (but fine for 3 scenarios)

3. **PC conversational panels (not iPhones)**
   - **Why:** Enterprise audience, desktop workflow, better content density
   - **Benefit:** Matches recruiter/business-leader context; wider readable panels
   - **Trade-off:** Less novelty than phone mockup

4. **Async/await for timing (not callbacks)**
   - **Why:** Easier to read and maintain sequential animations
   - **Benefit:** Clear control flow
   - **Trade-off:** Requires modern browser (fine, this is 2026)

---

## 6. Customization Guide

### Adding a New Scenario

**Steps:**

1. **Add scenario data** (around line 570):

```javascript
const scenarios = {
    // ... existing scenarios ...
    newScenario: {
        roughPrompt: "your rough prompt here",
        refinedPrompt: `Full structured prompt with:
        
**Role:** ...
**Task:** ...
**Context:** ...
**Requirements:** ...
**Output:** ...`,
        finalAnswer: `High-quality answer demonstrating
        the value of the structured prompt...`
    }
};
```

2. **Add scenario button** (around line 422):

```html
<button class="scenario-btn" data-scenario="newScenario">New Scenario Name</button>
```

3. **Test:** Open file in browser, click button, play demo

### Changing Timing

Edit delays in `playDemo()` function (around line 1020):

```javascript
await new Promise(r => setTimeout(r, 800));   // Delay after user message
await new Promise(r => setTimeout(r, 2000));  // Typing indicator duration
await new Promise(r => setTimeout(r, 1500));  // Delay before copy
await new Promise(r => setTimeout(r, 2000));  // Copy indicator duration
```

**Recommended timing:**
- User message delay: 300-800ms
- Typing indicator: 1500-3000ms (shorter = snappier, longer = more realistic)
- Copy transition: 1000-2000ms

### Changing Colors

Edit CSS variables (lines 8-20):

```css
:root {
    --color-primary: #4338ca;        /* Main brand color */
    --color-primary-light: #6366f1;  /* Hover state */
    --user-bubble: #0b84ff;          /* User message color */
    --ai-bubble: #2c2c2e;            /* AI message color */
}
```

### Changing Phone UI

**Stage 1 title** (line 450):
```html
<div class="chat-title">Prompt Engineer</div>
<div class="chat-subtitle">Meta-Prompt Assistant</div>
```

**Stage 2 title** (line 468):
```html
<div class="chat-title">ChatGPT</div>
<div class="chat-subtitle">GPT-4</div>
```

Change to "Claude" / "Gemini" / "Copilot" as needed.

---

## 7. Research Foundation

This demo is based on documented research in:

**Primary research doc:** `PROMPT-REFINEMENT-UX-RESEARCH.md`

**Key findings:**
- **Meta-prompting** (LLM optimizing another prompt) measurably improves outputs (OpenAI cookbook)
- **Two-stage workflows** (optimize → use) reduce user effort vs. manual iteration
- **Structured prompts** (Role → Task → Context → Requirements → Output) create repeatability and auditability
- **Enterprise pain points:** Prompt sprawl, inconsistent outputs, no audit trail, testing gaps

**Sources:**
- OpenAI Cookbook: Meta prompting
- Meta-Prompting (arxiv 2311.11482)
- DSPy (Stanford NLP)
- PromptOps playbook
- Enterprise prompt engineering research (Mission 4 output)

**Framework origin:** Role → Task → Context → Requirements → Output → Input structure comes from Andrew's SharpPrompt Enterprise methodology, validated against academic research and enterprise PromptOps practices.

---

## 8. Deployment

### Option 1: GitHub Pages (Recommended)

```bash
# Commit file
git add prompt-refinement-demo.html
git commit -m "Add prompt refinement demo"
git push

# Enable GitHub Pages
# Settings → Pages → Source: main branch → Save
```

**URL:** `https://andrewdeanmartin.github.io/prompt-refinement-demo.html`

### Option 2: Netlify Drag-and-Drop

1. Go to https://app.netlify.com/drop
2. Drag `prompt-refinement-demo.html` onto page
3. Get instant URL: `https://random-name-12345.netlify.app`

### Option 3: Local File

```bash
open prompt-refinement-demo.html
# Works immediately, no server needed
```

### Option 4: Simple HTTP Server

```bash
# Python 3
python3 -m http.server 8000
# Open http://localhost:8000/prompt-refinement-demo.html

# Node
npx http-server
# Open http://localhost:8080/prompt-refinement-demo.html
```

---

## 9. Maintenance

### When to Update

1. **Add new scenarios** — When enterprise use cases change or new patterns emerge
2. **Update prompts** — If prompt engineering best practices evolve
3. **Refresh final answers** — If example outputs feel dated or unrealistic
4. **UI refinements** — Based on user feedback (timing too fast/slow, colors, mobile layout)

### Testing Checklist

Before deploying updates:

- [ ] All 3 scenarios play without errors
- [ ] Timing feels natural (not too fast/slow)
- [ ] Copy indicator appears between phones
- [ ] Reset button works
- [ ] Scenario switching works
- [ ] Mobile responsive (test on iPhone-sized viewport)
- [ ] Text is readable in chat bubbles (no overflow)
- [ ] Typing indicators animate smoothly

### Known Limitations

1. **Fixed scenarios only** — No custom user input (by design, to avoid API costs)
2. **Desktop-optimized** — Works on mobile but best on desktop due to side-by-side layout
3. **No analytics** — Can't track which scenarios users prefer (add GA if needed)
4. **English only** — All content is English (translate if needed for global audience)

---

## 10. Integration with Portfolio Site

### Embedding in Main Site

**Option A: Separate page (current)**
```html
<!-- In main site navigation -->
<a href="prompt-refinement-demo.html">Prompt Refinement Demo</a>
```

**Option B: Iframe embed**
```html
<!-- In main site, inside a demo section -->
<iframe 
    src="prompt-refinement-demo.html" 
    width="100%" 
    height="800px" 
    frameborder="0">
</iframe>
```

**Option C: Direct integration**
- Copy HTML structure into main site's demo section
- Include CSS in main stylesheet
- Include JavaScript in main script file
- Benefit: Single page, no iframe
- Trade-off: More complex to maintain

### Linking from LinkedIn/Resume

**Demo URL formats:**
- Direct link: `https://andrewdeanmartin.com/prompt-refinement-demo.html`
- With anchor: `https://andrewdeanmartin.com/prompt-refinement-demo.html#stakeholder`
- From portfolio: `https://andrewdeanmartin.com/#demos` → "Prompt Refinement Demo"

**LinkedIn post template:**
```
Prompt engineering at enterprise scale requires structure.

I built an interactive demo showing how structured prompts 
(Role → Task → Context → Requirements → Output) transform 
vague requests into consistent, production-ready outputs.

Watch it work: [link]

No fluff. No buzzwords. Just a repeatable framework that 
works across ChatGPT, Claude, and Copilot.

#PromptEngineering #EnterpriseAI #AIGovernance
```

---

## 11. Personas & Value Proposition

### For David (Partner selling AI consulting)
**What he sees:** "This is exactly what I'd show a client. Proves structured prompts create consistency—no more 'every consultant writes prompts differently' problem."

### For Sarah (Chief Data Officer)
**What she sees:** "Governance built in. Structure = auditability. I can show my board we have a methodology, not just people typing into ChatGPT."

### For Priya (Tech Lead evaluating candidates)
**What she sees:** "He didn't just talk about prompt engineering—he built a working demo. Code is clean. UX is thoughtful. This isn't a toy."

### For Rachel (Recruiter at AI-forward company)
**What she sees:** "Most Directors have slides. This guy has a working demo. He can explain complex concepts visually. Differentiator."

---

## 12. Future Enhancements (Optional)

### Phase 2 Ideas

1. **Custom input mode**
   - Add "Try your own prompt" input field
   - Use client-side pattern matching to apply framework
   - No API needed (template-based transformation)

2. **Scenario comparison**
   - Show "bad answer" vs "good answer" side-by-side
   - Proves value of structured prompts more explicitly

3. **Framework explainer**
   - Expandable section explaining Role/Task/Context/Requirements/Output
   - Educational content for users new to prompt engineering

4. **Shareable links**
   - URL parameters to load specific scenario: `?scenario=architecture`
   - Share direct links to specific examples

5. **Analytics**
   - Track which scenarios are most popular
   - Measure completion rate (how many people play full demo)

6. **Accessibility improvements**
   - Screen reader support for chat messages
   - Keyboard navigation for scenario selection
   - ARIA labels for all interactive elements

### Phase 3 (API-Powered)

If budget and maintenance commitment exist:

1. **Live refinement** — User inputs custom prompt → API call to Claude/GPT → real-time refinement
2. **A/B comparison** — Show same prompt in Stage 2 twice (rough vs refined) → compare outputs
3. **Feedback loop** — Users rate refined prompts → improve templates over time

**Trade-offs:**
- Cost: $0.10-$0.50 per demo play
- Latency: 2-5 seconds for API response
- Maintenance: Error handling, rate limiting, API key management

**Recommendation:** Stay with pre-scripted version unless user demand is very high.

---

## 13. File Manifest

**Core demo file:**
- `prompt-refinement-demo.html` (1,103 lines) — Self-contained demo

**Documentation files:**
- `PROMPT-REFINEMENT-DEMO.md` (this file) — Technical documentation
- `PROMPT-REFINEMENT-DEMO-README.md` — Quick reference for next agent
- `PROMPT-REFINEMENT-UX-RESEARCH.md` — Research foundation (271 lines)

**Related files:**
- `RESEARCH-OUTPUT-MISSION-4-ENTERPRISE-PROMPT-ENGINEERING.md` — SharpPrompt framework research
- `DEMO-CONCEPTS.md` — Original demo concepts (includes SharpPrompt as Demo 2)

---

## 14. Success Metrics

### Qualitative Goals
- [ ] Visitors understand the two-stage workflow (optimize → use)
- [ ] Visitors see the value of structured prompts vs. vague prompts
- [ ] Recruiters/hiring managers see this as evidence of prompt engineering expertise
- [ ] Consulting clients see this as a methodology they can adopt

### Quantitative Metrics (if analytics added)
- **Engagement:** % of visitors who play demo
- **Completion:** % who watch full demo vs. exit early
- **Scenario preference:** Which scenario is most popular
- **Referral source:** LinkedIn vs. direct vs. portfolio

### Feedback Channels
- LinkedIn comments (if posted)
- Direct messages from recruiters/clients
- Email feedback: andrewdeanmartin@gmail.com

---

## 15. Ownership & Contact

**Owner:** Andrew Dean Martin  
**Role:** Director, Commercial Technology & Innovation @ PwC  
**LinkedIn:** https://linkedin.com/in/andrewdeanmartin  
**Email (portfolio):** andrewdeanmartin@gmail.com  

**Usage rights:** This demo is portfolio work (not PwC IP). Free to use, modify, and share with attribution.

**Questions for the next Cursor agent:**
- See `PROMPT-REFINEMENT-DEMO-README.md` for quick onboarding guide
- All code is inline-commented for clarity
- Test locally before deploying: `open prompt-refinement-demo.html`

---

**Last updated:** February 15, 2026  
**Version:** 1.0
