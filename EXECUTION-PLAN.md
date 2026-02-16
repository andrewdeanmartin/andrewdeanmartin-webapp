# Execution Plan: Portfolio Improvements

**Goal:** A portfolio that looks excellent, tells your story, and helps you land your next job.

**Reference docs:** `GOAL-CONFIRMATION-RESEARCH.md`, `DESIGN-RESEARCH-AWARD-WORTHY-PORTFOLIO.md`

---

## Overview

| Phase | Focus | Est. Effort | Dependencies |
|-------|-------|-------------|--------------|
| Phase 1 | Content & Positioning | 2–4 hrs | Input from you (audience, testimonial) |
| Phase 2 | Hero & 12-Second Clarity | 2–3 hrs | Phase 1 |
| Phase 3 | Social Proof & Footer | 1–2 hrs | Your outreach for testimonial |
| Phase 4 | Visual Polish & Motion | 3–4 hrs | Phases 1–3 |
| Phase 5 | Conversion Path & Validation | 1–2 hrs | All above |
| Phase 6 | Accessibility & Performance | 1–2 hrs | All above |

**Total:** ~10–17 hours, spread over 1–2 weeks depending on your availability for inputs.

---

## Phase 1: Content & Positioning

**Objective:** Sharpen positioning, define audience, and tighten copy so the 12-second test passes.

### 1.1 Define Target Audience (Your Input Required)

**Task:** Write down who you want to hire you. Be specific.

**Format:** 2–3 sentences. Example:
> "Partners and Directors at PwC or similar firms evaluating CT&I leaders for AI delivery roles. Recruiters filling VP/Director AI Delivery or Digital Transformation positions at enterprise software, consulting, or financial services. Executives at companies scaling AI who need someone who can bridge strategy and hands-on delivery."

**Output:** Add to `CONTENT-AUDIENCE.md` (create) or document in plan. Use this to inform all copy.

**Acceptance:** You can articulate "who hires me" in one paragraph.

---

### 1.2 Draft Explicit Value Proposition

**Task:** Write the positioning formula: *I help [target] achieve [result] through [method].*

**Current implied:** "I help organizations turn AI ambition into shipped products through rapid prototyping, governance-by-design, and hands-on engineering."

**Actions:**
- Draft 2–3 variants
- Run Uber Test: Can you say it in one sentence before reaching your destination?
- Pick one and add it to the hero (see Phase 2)

**Output:** Final value prop copy for hero/above-fold.

**Acceptance:** Positioning is explicit, not implied. Reader knows who you help and how in &lt;5 seconds.

---

### 1.3 Tighten Above-the-Fold Copy

**Task:** Reduce hero text for scan-ability. Answer Who, What, Why in minimal words.

**Current hero:**
- Badge: Director, Commercial Technology & Innovation · PwC
- Name: Andrew Dean Martin
- Tagline: Turning AI Ambition into Shipped Products
- Description: Senior Director at PwC. I bridge strategy and engineering to deliver AI systems that survive compliance, governance, and production reality.
- CTAs: See It In Action, Connect

**Proposed changes:**
- Keep badge, name, tagline
- Shorten description to one punchy line (or move longer version below fold)
- Consider adding one explicit value-prop line if it fits
- Max 2–3 lines of text above the fold before CTAs

**Acceptance:** A stranger can answer "Who is this person? What do they do? Why should I care?" in 12 seconds without scrolling.

---

### 1.4 Reduce Copy Elsewhere (Optional but Recommended)

**Task:** Cut 20–30% of body copy. Lead with outcomes, trim process detail.

**Targets:**
- About section: 2 paragraphs → keep strongest, cut filler
- Capabilities/superpower cards: Lead with outcome, shorten method
- Impact: Already good (metric + label + context); minimal changes
- Journey: Consider condensing or moving less relevant entries

**Acceptance:** No paragraph exceeds 3–4 sentences. Each section advances the story without over-explaining.

---

## Phase 2: Hero & 12-Second Clarity

**Objective:** Hero answers Who/What/Why fast. Primary CTA is visually dominant.

### 2.1 Hero Layout Optimization

**Task:** Restructure hero for scan pattern (F-pattern: top-left, across, down left).

**Actions:**
- Ensure name is largest element
- Tagline + value prop directly below
- Description: one line or remove from above-fold
- Primary CTA ("See It In Action") = second-most prominent element
- Secondary CTA ("Connect") visible but subordinate

**Acceptance:** Eye flows: Name → Tagline → CTA. No confusion about primary action.

---

### 2.2 Primary CTA Visual Hierarchy

**Task:** Make "See It In Action" the dominant CTA.

**Actions:**
- Check button contrast (should stand out from background)
- Ensure it's in primary position (left or center, above secondary)
- Consider size/weight relative to "Connect"
- Verify it's above the fold on mobile

**Acceptance:** Primary CTA is unmistakably the main action. Passes "contrast check" from research.

---

### 2.3 Hero Entrance Animation (Enhancement)

**Task:** Add subtle staggered reveal on load so hero "arrives" rather than pops.

**Actions:**
- Badge fades in (0–0.3s)
- Name fades in (0.2–0.5s)
- Tagline fades in (0.4–0.7s)
- Description + CTAs fade in (0.6–1s)
- Use CSS animation or vanilla JS; keep under 1s total
- Respect `prefers-reduced-motion` (disable or simplify if set)

**Acceptance:** Hero feels intentional, not static. Animation completes in &lt;1s. No jank.

---

## Phase 3: Social Proof & Footer

**Objective:** Add trust currency. Give footer a conversion role.

### 3.1 Obtain Testimonial (Your Action Required)

**Task:** Get at least one specific testimonial from a colleague, client, or leader.

**Process:**
- Identify 2–3 people who can speak to your impact
- Send: "If someone asked about a specific result from our work together, what would you highlight?"
- Request permission to use quote + name + title (company optional if sensitive)
- Prefer: specific outcome over "great to work with"

**Example ask:** "What specific result from our work together would you highlight if a hiring manager asked about my impact?"

**Output:** 1–2 sentences, name, title. Ideally includes a number (e.g., "Andrew's prototype cut our decision cycle from 6 weeks to 3 days").

**Acceptance:** You have written permission and specific quote with attribution.

---

### 3.2 Add Testimonial Section

**Task:** Place testimonial on site. Options:
- A) New "What People Say" block in About or after Impact
- B) Pull quote in hero or superpower featured card
- C) Testimonial in footer (last-chance trust)

**Recommendation:** Option A — small section after Impact, before Journey. Or B if quote is very strong.

**Actions:**
- Add HTML for testimonial block
- Style to match site (quote marks, attribution, optional photo placeholder)
- Ensure it's visible without scrolling too far (or in hero if short)

**Acceptance:** Testimonial visible. Specific > generic. Attribution clear.

---

### 3.3 Footer CTA Enhancement

**Task:** Give footer a final conversion nudge. Current footer: copyright, disclaimer, "Built with intention."

**Actions:**
- Add line: "Interested in AI delivery, governance, or rapid prototyping? Let's talk."
- Add prominent link/button: "Connect" or "Get in Touch" → #connect
- Keep disclaimer. Optional: add LinkedIn + Email links if not redundant with Connect section

**Acceptance:** Footer has one clear CTA. Last chance to convert isn't wasted.

---

## Phase 4: Visual Polish & Motion

**Objective:** Looks excellent. Professional credibility through design craft.

### 4.1 Motion Motif

**Task:** Add one consistent section/card entrance used across the site.

**Actions:**
- Define: e.g., fade-up + slight scale (0.98 → 1) on scroll into view
- Apply to: section headers, superpower cards, impact cards, journey items, demo intro
- Use Intersection Observer or existing reveal logic
- Stagger children where appropriate (e.g., cards in grid: 0ms, 80ms, 160ms)

**Acceptance:** Consistent, subtle motion. No jarring or excessive animation. `prefers-reduced-motion` respected.

---

### 4.2 Scroll Progress Indicator (Optional)

**Task:** Thin progress bar or section indicator showing position in narrative.

**Actions:**
- Add bar at top or side that fills as user scrolls
- Or: dot/minimap showing which section is in view
- Lightweight implementation (CSS + minimal JS)

**Acceptance:** User always knows where they are in the story. Improves orientation.

---

### 4.3 Typography & Contrast Pass

**Task:** Ensure hero name and key headlines have strong presence. Check contrast ratios.

**Actions:**
- Hero name: verify size and weight for impact
- Section titles: clear hierarchy
- Run WebAIM contrast checker on text/background combinations
- Ensure body text meets WCAG AA (4.5:1 for normal text)

**Acceptance:** Typography feels confident. No contrast failures.

---

### 4.4 Signature Visual Element (Optional)

**Task:** Add one distinctive visual — gradient mesh, subtle grid, or pattern — to hero or key sections.

**Actions:**
- Current: hero has radial gradients (navy/copper)
- Option: strengthen existing gradient, or add subtle pattern/texture
- Keep it secondary; don't compete with content

**Acceptance:** Site has one "signature" visual that isn't generic. Fits editorial tech aesthetic.

---

## Phase 5: Conversion Path & Validation

**Objective:** No dead ends. Clear path from visitor → contact.

### 5.1 Audit Conversion Path

**Task:** Map every entry point to a conversion outcome.

**Checklist:**
- [ ] Hero CTAs both work (See It In Action → #demos, Connect → #connect)
- [ ] Nav links go to correct sections
- [ ] Contact section has LinkedIn + Email; both work
- [ ] Footer CTA links to #connect or contact method
- [ ] No broken links, no orphan pages
- [ ] Mobile: CTAs accessible, no overlap

**Acceptance:** Every path leads somewhere useful. Primary CTA is never more than one click away.

---

### 5.2 12-Second Test (Validation)

**Task:** Run the test with real people.

**Process:**
- Send site link to 2–3 people who don't know you well
- Ask: "Spend 12 seconds on the homepage. Don't scroll. Then tell me: Who is this person? What do they do? Why should I care?"
- Record answers. Identify gaps.

**Acceptance:** All three questions answered correctly by at least 2/3 testers. Fix copy/layout if not.

---

### 5.3 The Mom Test (Optional)

**Task:** Have someone (e.g., parent, non-industry friend) find "your best work" and "how to contact you" in 10 seconds.

**Acceptance:** Both found within 10 seconds. No detective work required.

---

## Phase 6: Accessibility & Performance

**Objective:** Inclusive, fast, professional.

### 6.1 Accessibility Pass

**Task:** Ensure basic accessibility.

**Checklist:**
- [ ] All images have alt text (or decorative and aria-hidden)
- [ ] Form elements (if any) have labels
- [ ] Focus states visible on all interactive elements
- [ ] Heading hierarchy logical (h1 → h2 → h3)
- [ ] Color contrast passes WCAG AA
- [ ] `prefers-reduced-motion` respected (animations reduced or off)
- [ ] Keyboard navigable
- [ ] Screen reader: demo tabs and pipeline have proper ARIA

**Tools:** axe DevTools, WAVE, or Lighthouse accessibility audit.

**Acceptance:** No critical accessibility failures. Site usable with keyboard and screen reader.

---

### 6.2 Performance Check

**Task:** Ensure fast load and smooth scroll.

**Actions:**
- Run Lighthouse (Performance, Best Practices)
- Target: Performance 90+, First Contentful Paint &lt; 2s
- Optimize images if any (compress, appropriate format)
- Check font loading (avoid FOIT; use font-display: swap if needed)
- Ensure no layout shift (CLS)

**Acceptance:** Lighthouse Performance ≥ 85. No obvious jank on scroll.

---

### 6.3 Meta & Sharing

**Task:** Verify Open Graph and meta descriptions for LinkedIn/email shares.

**Current:** OG tags exist. Verify:
- [ ] Preview looks correct when pasted in LinkedIn
- [ ] Title and description compelling
- [ ] Image if set (optional but helpful)

**Acceptance:** Shared link preview is professional and accurate.

---

## Execution Order (Recommended)

```
Week 1
├── Day 1–2: Phase 1 (Content & Positioning)
│   ├── 1.1 Define audience [YOU]
│   ├── 1.2 Draft value prop [YOU]
│   ├── 1.3 Tighten hero copy [IMPLEMENT]
│   └── 1.4 Reduce body copy [IMPLEMENT]
├── Day 3: Phase 2 (Hero & Clarity)
│   ├── 2.1 Hero layout [IMPLEMENT]
│   ├── 2.2 CTA hierarchy [IMPLEMENT]
│   └── 2.3 Hero animation [IMPLEMENT]
├── Day 4: Phase 3 prep
│   └── 3.1 Send testimonial requests [YOU]
└── Day 5: Phase 4 start (Motion, scroll progress)

Week 2
├── Day 1: Phase 3 (when testimonial received)
│   ├── 3.2 Add testimonial [IMPLEMENT]
│   └── 3.3 Footer CTA [IMPLEMENT]
├── Day 2: Phase 4 complete (Visual polish)
├── Day 3: Phase 5 (Conversion audit, 12-sec test)
└── Day 4–5: Phase 6 (Accessibility, performance)
```

---

## Quick Reference: Files to Modify

| Phase | Files |
|-------|------|
| 1 | `site/index.html` (copy), optionally `CONTENT-AUDIENCE.md` (new) |
| 2 | `site/index.html` (hero structure), `site/styles.css` (hero, CTA) |
| 3 | `site/index.html` (testimonial block, footer) |
| 4 | `site/styles.css`, `site/script.js` |
| 5 | Review only |
| 6 | `site/index.html` (meta, ARIA), `site/styles.css` (focus, reduced-motion) |

---

## Success Criteria (Final)

- [ ] 12-second test passes: Who, What, Why answered above the fold
- [ ] Explicit value proposition visible
- [ ] At least one specific testimonial with attribution
- [ ] Primary CTA is visually dominant and obvious
- [ ] Footer has clear conversion nudge
- [ ] Hero has subtle entrance (respects reduced motion)
- [ ] Consistent motion motif on scroll
- [ ] No accessibility critical issues
- [ ] Performance 85+ on Lighthouse
- [ ] Conversion path audited; no dead ends
