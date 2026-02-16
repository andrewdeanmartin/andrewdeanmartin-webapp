# Build Plan: Portfolio Webapp

**Goal:** A portfolio that looks excellent, tells your story, and helps you land your next job.

**North star:** Your work solves actual problems for business people. That's the point of everything on this site.

**Current state:** Single-page site in `site/` with Hero, About, Capabilities, Demos (Agent Pipeline, SharpPrompt, Codebase Assessment), Impact, Journey, Connect. HTML, CSS, vanilla JS.

**Tech stack:** Vanilla HTML, CSS, JavaScript + GSAP for motion (hero entrance, scroll-driven reveals, orchestrated animations). No framework. GSAP via CDN script tag.

**Primary entry path:** Many visitors will arrive from LinkedIn (profile link, post, DM) — often on iPhone, in LinkedIn's in-app browser or Safari. Mobile-first is critical.

**Social proof:** No client testimonials (out of scope with PwC). Trust currency = Impact metrics, quantifiable results, demos, and PwC/role context.

---

## Build Phases

| Phase | Deliverable | Est. |
|-------|-------------|------|
| 1 | Content rewrite (problem-led) | 2–3 hrs |
| 2 | Hero & above-fold (12-sec clarity) | 1–2 hrs |
| 3 | Footer CTA | 0.5 hr |
| 4 | Visual polish & motion | 2–3 hrs |
| 5 | Conversion path & validation | 1 hr |
| 6 | Accessibility & performance | 1 hr |

**Total:** ~8–11 hours

---

## Phase 1: Content Rewrite (Problem-Led)

**Principle:** Every section should answer: What problem does this solve for a business person?

### 1.1 Hero Copy

**File:** `site/index.html` (hero section)

**Current → New:**

| Element | Current | New (problem-led) |
|---------|---------|-------------------|
| Tagline | Turning AI Ambition into Shipped Products | Keep or: "I solve the gap between AI strategy and delivery" |
| Description | Senior Director at PwC. I bridge strategy and engineering... | "I help business leaders turn AI investment into shipped products that work in their environment." |
| Value prop line | (none) | Add: "Strategy and code, same person — so decisions get unblocked fast." |

**Deliverable:** Hero copy that answers Who/What/Why in 12 seconds. Business outcome clear.

---

### 1.2 About Section

**File:** `site/index.html` (about section)

**Current:** "I'm the person teams call when..." (good) + methodology paragraph.

**Changes:**
- Lead with the problem: teams stuck between ambition and delivery
- Second paragraph: How you solve it (outcome-first: "I turn roadmaps into working products...") then method
- Cut to 2 short paragraphs max
- Keep stats; ensure they imply business impact

**Deliverable:** About that frames you as problem-solver first, method second.

---

### 1.3 Capabilities Cards (What I Do)

**File:** `site/index.html` (superpower-grid)

**Reframe each card:** Lead with the business problem → outcome, then how.

| Card | Problem → Outcome |
|------|-------------------|
| Strategy + Engineering | Unblock decisions → "I present to leadership and ship the demo that unblocks the investment." |
| Prototype-Led | Stop debating abstractions → "Stakeholders react to something real in days, not months." |
| AI as Method | One-off experiments don't scale → "Repeatable playbooks teams can adopt." |
| Governance | Compliance blocks shipping → "Compliance built in from day one so solutions survive production." |

**Deliverable:** Card titles or intros lead with outcome; descriptions support with method.

---

### 1.4 Impact Section

**File:** `site/index.html` (impact-grid)

**Current:** Good — metric + label + context. Already outcome-focused.

**Changes:**
- Ensure each card answers: "What problem did this solve for the business?"
- Tweak context lines if any read method-first
- Example: "90% Time Reduction" — problem = analysis took too long; outcome = compressed to hours

**Deliverable:** Impact cards explicitly tie to business problems solved.

---

### 1.5 Demo Section Intros

**File:** `site/index.html` (demo-panel paragraphs)

**Current:** Describes what the demo does.

**Changes:**
- Agent Pipeline: "See how a multi-agent pipeline solves the 'we need analysis but don't have weeks' problem..."
- SharpPrompt: "Transform vague requests into prompts that actually work — so you get useful output, not garbage."
- Codebase Assessment: "Before you acquire or integrate: know exactly what needs fixing and how long it'll take."

**Deliverable:** Demo intros frame the business problem each tool solves.

---

### 1.6 Meta & SEO

**File:** `site/index.html` (head)

**Update:**
- `meta description`: Problem-led one-liner for search/social
- `og:description`: Same
- Title: Consider "Andrew Dean Martin | Turn AI Ambition into Shipped Products" (or problem-led variant)

**Deliverable:** Meta reflects problem-solving positioning.

---

## Phase 2: Hero & 12-Second Clarity

**Objective:** Above-the-fold answers Who, What, Why. Primary CTA dominates.

### 2.1 Hero Structure

**File:** `site/index.html`, `site/styles.css`

**Tasks:**
- [ ] Badge → Name → Tagline → One-line value prop → CTAs
- [ ] Max 2–3 lines of body text before CTAs
- [ ] Move longer description below fold if needed (e.g., into About)
- [ ] Ensure F-pattern scan: top-left to right to down-left

**Deliverable:** Hero layout optimized for 12-second scan.

---

### 2.2 CTA Hierarchy

**File:** `site/styles.css`

**Tasks:**
- [ ] "See It In Action" = primary (strongest contrast, size, position)
- [ ] "Connect" = secondary (visible but subordinate)
- [ ] Both above fold on mobile
- [ ] Primary CTA is second-most prominent element after name

**Deliverable:** No ambiguity about primary action.

---

### 2.3 Hero Entrance (GSAP)

**File:** `site/index.html` (add GSAP script), `site/script.js`

**Tasks:**
- [ ] Add GSAP script (core + ScrollTrigger) via CDN before `script.js`
- [ ] Staggered fade-in on load: badge → name → tagline → description → CTAs
- [ ] Use `gsap.fromTo()` or `gsap.timeline()` for orchestrated entrance
- [ ] Total duration < 1 second
- [ ] Respect `prefers-reduced-motion` (skip or set duration to 0)
- [ ] Ensure GSAP loads before custom script

**Deliverable:** Hero "arrives" with polished timing. No jank.

---

## Phase 3: Footer CTA

**Objective:** Footer as last conversion chance. (No client testimonials — out of scope with PwC. Trust = Impact metrics, demos, quantifiable results.)

### 3.1 Footer CTA

**File:** `site/index.html`, `site/styles.css`

**Tasks:**
- [ ] Add line above copyright: "Working on AI delivery or enterprise modernization? Let's talk."
- [ ] Add button/link: "Get in Touch" → #connect
- [ ] Keep disclaimer, easter egg
- [ ] Ensure footer doesn't feel like dead end

**Deliverable:** Footer has clear conversion nudge.

---

## Phase 4: Visual Polish & Motion

**Objective:** Professional, intentional design. Motion that supports story.

### 4.1 Section Reveal (GSAP ScrollTrigger)

**File:** `site/script.js`, `site/styles.css`

**Tasks:**
- [ ] Use GSAP ScrollTrigger for scroll-driven reveals
- [ ] One consistent entrance: fade-up + slight scale (y: 20 → 0, opacity: 0 → 1) on scroll into view
- [ ] Apply to: section headers, superpower cards, impact cards, journey items
- [ ] Stagger grid children with `stagger` option (e.g., 0.08s delay between cards)
- [ ] `prefers-reduced-motion: reduce` → skip animation or duration 0
- [ ] Remove or replace existing Intersection Observer reveal if redundant

**Deliverable:** Consistent, polished scroll-triggered motion. Recognizable pattern.

---

### 4.2 Scroll Progress (Optional, GSAP)

**File:** `site/index.html`, `site/script.js`, `site/styles.css`

**Tasks:**
- [ ] Thin bar at top showing scroll progress (0–100%)
- [ ] Use GSAP ScrollTrigger to animate bar width based on scroll position
- [ ] Or: section indicators in nav
- [ ] Lightweight; no layout shift

**Deliverable:** User knows position in narrative.

---

### 4.4 iPhone / Mobile CSS

**File:** `site/styles.css`

**Tasks:**
- [ ] Touch targets ≥ 44×44px for nav links, buttons, demo tabs (min-height, padding, or min-tap-target)
- [ ] Safe area: `padding-bottom: env(safe-area-inset-bottom)` on footer/fixed elements if needed
- [ ] Prevent iOS zoom on input focus: `font-size: 16px` minimum on inputs (iOS zooms < 16px)
- [ ] `-webkit-tap-highlight-color` for touch feedback (optional)
- [ ] Test fixed nav doesn't overlap content with iOS URL bar show/hide

**Deliverable:** Mobile layout handles iPhone viewport and touch behavior.

---

### 4.5 Typography & Contrast

**File:** `site/styles.css`

**Tasks:**
- [ ] Hero name: strong size, weight
- [ ] Run contrast check (WebAIM) on text/background
- [ ] Body text ≥ 4.5:1 contrast (WCAG AA)
- [ ] Fix any failures

**Deliverable:** Typography confident. Accessibility baseline met.

---

## Phase 5: Conversion Path & Validation

**Objective:** No dead ends. Clear path to contact.

### 5.1 Conversion Audit

**Checklist:**
- [ ] Hero CTAs work (See It In Action → #demos, Connect → #connect)
- [ ] Nav links correct
- [ ] Contact has LinkedIn + Email
- [ ] Footer CTA links to #connect
- [ ] No broken links
- [ ] **iPhone/LinkedIn:** Test on actual iPhone; simulate LinkedIn app open (paste URL in Safari, or share to self from LinkedIn)

**Deliverable:** Conversion path documented and verified.

---

### 5.2 12-Second Test

**Process:**
- [ ] Send to 2–3 people who don't know you
- [ ] Ask: "12 seconds, don't scroll. Who is this? What do they do? Why should I care?"
- [ ] Record answers. Fix gaps.

**Deliverable:** Test passed or issues logged and fixed.

---

### 5.3 iPhone / Mobile Validation (LinkedIn Entry Path)

**Context:** Visitors often click from LinkedIn profile or post → opens in LinkedIn in-app browser or Safari on iPhone.

**Checklist:**
- [ ] **Viewport:** Site readable at 375×667 (iPhone SE), 390×844 (iPhone 14), 430×932 (iPhone 14 Pro Max)
- [ ] **Touch targets:** Buttons, links, nav items ≥ 44×44px (Apple HIG)
- [ ] **Tap targets:** CTAs and nav links have adequate spacing; no accidental taps
- [ ] **Hamburger nav:** Opens/closes; overlay links work; closes on link tap
- [ ] **Smooth scroll:** Anchor links (#demos, #connect) scroll correctly on iOS
- [ ] **Safe area:** No content hidden behind notch/home indicator (padding or env(safe-area-inset-*))
- [ ] **LinkedIn preview:** Paste URL in LinkedIn post/profile — OG tags render correctly
- [ ] **Performance:** Page loads in < 3s on 4G; no obvious jank while scrolling

**Tools:** Real device test (iPhone) or Chrome DevTools device emulation + iOS Simulator if available.

**Deliverable:** Site works reliably when opened from LinkedIn on iPhone.

---

## Phase 6: Accessibility & Performance

**Objective:** Inclusive, fast, professional.

### 6.1 Accessibility

**Checklist:**
- [ ] Alt text on images (or aria-hidden if decorative)
- [ ] Labels on form elements
- [ ] Focus states on interactive elements
- [ ] Heading hierarchy (h1 → h2 → h3)
- [ ] Demo tabs/pipeline: ARIA roles correct
- [ ] `prefers-reduced-motion` respected

**Tool:** Lighthouse accessibility, axe, or WAVE.

**Deliverable:** No critical a11y failures.

---

### 6.2 Performance

**Checklist:**
- [ ] Lighthouse Performance ≥ 85 (desktop and mobile)
- [ ] First Contentful Paint < 2s
- [ ] No layout shift (CLS)
- [ ] Fonts: font-display: swap or similar
- [ ] Images optimized if any
- [ ] **Mobile/4G:** Run Lighthouse in mobile mode; 4G throttling if possible

**Deliverable:** Site fast on desktop and mobile. No obvious jank.

---

### 6.3 Meta & OG

**Checklist:**
- [ ] Title, description compelling for shares
- [ ] LinkedIn preview correct when pasted
- [ ] No broken OG tags

**Deliverable:** Share preview is professional.

---

## Build Order (Recommended)

```
Day 1
├── Phase 1.1–1.4: Content rewrite (hero, about, capabilities, impact)
├── Phase 1.5–1.6: Demo intros, meta
└── Phase 2.1–2.2: Hero structure, CTA hierarchy

Day 2
├── Phase 2.3: Hero entrance
├── Phase 3: Footer CTA
├── Phase 4.1: Section reveal / motion motif
└── Phase 4.2–4.5: Scroll progress (optional), iPhone CSS, typography pass

Day 3
├── Phase 5: Conversion audit, 12-sec test, iPhone validation
└── Phase 6: Accessibility, performance, meta
```

---

## Files Modified

| Phase | Files |
|-------|-------|
| 1 | `site/index.html` |
| 2 | `site/index.html`, `site/styles.css`, `site/script.js` |
| 3 | `site/index.html`, `site/styles.css` |
| 4 | `site/styles.css`, `site/script.js` |
| 5 | Review only |
| 6 | `site/index.html`, `site/styles.css` (minor) |

## GSAP Setup

Add before `script.js` in `site/index.html`:

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
<script src="script.js"></script>
<script src="space-invaders.js"></script>
```

---

## Success Criteria (Done When)

- [ ] Every section answers: What problem does this solve for a business person?
- [ ] 12-second test passes: Who, What, Why above the fold
- [ ] Primary CTA visually dominant
- [ ] Footer has conversion nudge
- [ ] Motion motif applied
- [ ] **Works on iPhone** when opened from LinkedIn (in-app browser or Safari)
- [ ] Touch targets ≥ 44px; hamburger nav works; smooth scroll works
- [ ] No critical accessibility issues
- [ ] Lighthouse Performance ≥ 85 (mobile)
- [ ] Conversion path verified
