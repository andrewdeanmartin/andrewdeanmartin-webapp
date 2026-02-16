# Andrew Martin — Personal Brand Web UX: Deep Research & Recommendations

**Document purpose:** Evidence-based UX vision for your personal brand web experience, grounded in your profile, career narrative, and 2025–2026 design and executive-site best practices.

---

## Executive Summary

Your brand sits at a rare intersection: **PwC Director**, **AI delivery execution**, and **hands-on builder** (strategy + engineering in one person). The web experience should feel **premium-minimal and tech-forward** without being cold; **credible and B2B-ready** without feeling corporate; and **proof-led** (demos, metrics, methodologies) so visitors immediately understand *what you do* and *why you’re different*. The research below ties your history, audience, and goals to concrete UX, content, visual, and technical recommendations.

---

## Part 1: Your Brand DNA (What the UX Must Express)

### 1.1 Core Narrative

- **Role:** Director, Commercial Technology & Innovation (CT&I) at PwC | AI Delivery Leader  
- **Differentiator:** Strategy + engineering in one person; prototype-led leadership; “while others discuss, I ship”  
- **Proof:** 15+ years tech, 14+ at PwC; agentic pipelines, 90% time reduction on survey analysis, 4 territories in 6 months, first B2B2B data model, AI-augmented code assessments  
- **Audience:** CSX/CT&I leadership, delivery leads, finance/ops, partners, clients (FSI, retail, healthcare, energy), alliance partners (Zoom, Meta)  
- **Outcome:** Position you as the person to call when “AI ambition collides with delivery reality”—and make the next step (LinkedIn, email, briefing, collaboration) obvious and low-friction.

### 1.2 Tension the UX Must Resolve

| Tension | UX Implication |
|--------|-----------------|
| **Executive vs. builder** | Design should feel *senior* (restraint, clarity, authority) but also *technical* (precision, craft, “ships code”). Typography and layout can signal both. |
| **Enterprise vs. startup speed** | Convey “governance without bureaucracy” and “human-in-the-loop”—trust and control, not chaos. Visual order and clear structure support this. |
| **PwC brand vs. personal brand** | Your site is *you*, not PwC. Distinct visual identity (palette, type, voice) while remaining professional and aligned with how senior consultants present. |
| **B2B credibility vs. memorable** | Research suggests B2B often converts better with clarity and light-mode readability—but your current dark, tech-forward look is on-brand. Solution: either offer a **theme toggle** (light default for conversion studies) or keep **refined dark** with excellent contrast and optional light. |

---

## Part 2: Latest Design & UX Context (2025–2026)

### 2.1 Trends That Fit Your Brand

- **Premium minimal / tech-leader aesthetic**  
  Clean typography, generous whitespace, clear hierarchy. Examples: Mustafa Suleyman (mustafa-suleyman.ai), Arnaud Benard (arnaud.ai), Will Godfrey. Your current direction (Inter, mono accents, restrained color) aligns; the recommendation is to **push hierarchy and breathing room** further rather than add decoration.

- **Exaggerated typographic hierarchy**  
  Oversized headlines as anchor, smaller text for detail. Supports “confidence + nuance” and works for a single-page narrative where each section has one clear idea.

- **Scroll-driven storytelling**  
  Native CSS scroll-driven animations (e.g. `animation-timeline`, `view()`) can tie section reveals to scroll position—smooth, performant, no heavy JS. Use sparingly so the story (your journey, superpowers, impact) stays primary.

- **Micro-interactions**  
  Buttons, cards, and links that respond clearly to hover/focus. Reinforces “this person cares about craft” and improves perceived quality. Ensure all interactions are keyboard-accessible (WCAG 2.2).

- **Variable fonts**  
  One file for multiple weights/widths; smooth weight transitions on interaction or scroll. Good for performance and a subtle, modern typographic feel.

- **Performance & accessibility as table stakes**  
  Target <2s load; WCAG 2.2 AA. Accessible focus states, semantic HTML, and readable contrast (especially if you keep dark mode) are non-negotiable for a leader in “AI that works in regulated environments.”

### 2.2 Trends to Use Sparingly or Avoid

- **Maximalism / cluttercore / dopamine overload**  
  Your audience is senior B2B; clarity and trust outweigh “viral” visual noise. Avoid chaotic layouts and too many competing CTAs.

- **Retro / Y2K / dial-up**  
  Not aligned with enterprise AI delivery and PwC-adjacent credibility. Skip unless you add a very subtle nod in a single element (e.g. one retro type detail).

- **Museumcore / ornate**  
  Doesn’t match “ship working demos” and technical authority. Keep the aesthetic modern and tool-oriented.

- **Hyperreality / heavy 3D**  
  Only if it directly demonstrates your work (e.g. a small 3D or interactive demo). Don’t let it overshadow your message.

### 2.3 Executive & B2B Site Best Practices (Applied to You)

- **Immediate clarity (3–5 seconds)**  
  Visitor should get: *Who you are* (Director, PwC, AI Delivery), *what you do* (turn AI ambition into shipped, governed products), *why you’re different* (strategy + engineering, prototype-led, governance without bureaucracy).

- **Three pillars**  
  1) **Portfolio of work** (impact metrics, named programs, territories, first-of-kind); 2) **Credibility** (PwC, clients, alliances, methodologies); 3) **Positioning** (tagline, superpower pitch, “who relies on me”).

- **Proof, not noise**  
  Every claim should be backable: numbers, names, artifacts. Avoid vague “thought leadership” unless tied to a concrete outcome or piece of content.

- **One primary CTA per intent**  
  Different visitors want different next steps: LinkedIn, email, or “see how I work.” Structure so the main path is obvious (e.g. hero: “See how I work” + “Connect”); secondary paths (e.g. “Download one-pager,” “Book a briefing”) can live in nav or footer if you add them.

- **Mobile-first**  
  Senior audiences still browse on phones. Your current responsive approach is good; ensure touch targets, font size, and contrast are strong on small screens.

---

## Part 3: Information Architecture & Content Strategy

### 3.1 One-Page vs. Multi-Page

**Current:** Single-page (hero → about → superpower → process → expertise → impact → journey → contact).

**Research take:**  
- **Single-page** excels at narrative flow, scroll storytelling, and a focused “one story” for a known visitor (e.g. someone who has your link).  
- **Multi-page** helps SEO (keywords per page), scales better (e.g. /speaking, /writing, /case-studies), and can tailor CTAs by audience.

**Recommendation for you:**  
- **Short term:** Keep a **strong single-page** as the core experience. It matches “one clear story” and is easy to maintain.  
- **Evolution:** Add a small number of **secondary pages** as you grow content: e.g. `/about` (long-form bio), `/work` or `/impact` (expandable case studies), `/contact` (optional form + calendar link). Use the homepage as the “elevator pitch” and deeper pages for those who want more.  
- **SEO:** Ensure one-page has clear H1/H2 structure, section IDs, and meta description that includes “AI delivery,” “PwC,” “Director,” “Commercial Technology & Innovation.” If you add a blog or essays later, multi-page becomes more important.

### 3.2 Recommended Section Order (Single-Page)

| Order | Section | Rationale |
|-------|---------|-----------|
| 1 | **Hero** | Role + name + one tagline + two CTAs. No scrolling required to “get it.” |
| 2 | **About / Short version** | One tight paragraph: who you are, what you do, why you’re different. Optional: 2–3 stats (years, territories, key metric). |
| 3 | **Superpower / What sets you apart** | 4 pillars (strategy+engineering, prototype-led, AI as method, governance). This is your differentiator; keep it above the fold on desktop. |
| 4 | **How I work / Process** | 4-step flow (assessment → prototype → governance → scale). Shows methodology, not just claims. |
| 5 | **Impact / Results** | Metrics and named outcomes (90%, 10 agents, 4 territories, B2B2B first, etc.). Proof. |
| 6 | **Expertise** | Scannable (AI/LLM, CRM, engineering, strategy). Supports “technical + strategic” and SEO. |
| 7 | **Journey** | Timeline from 2010 → Now. Builds trust and context without overwhelming. |
| 8 | **Contact / Connect** | LinkedIn + email + optional “What I can help with” short list. One clear CTA. |

Your current order is already close; consider swapping **Impact** above **Expertise** so proof comes before taxonomy (more persuasive flow).

### 3.3 Content Gaps to Consider (Not Required for v1)

- **Press / media** – If you have quotes, podcasts, or articles, a small “As seen in” or “Speaking” block adds credibility.  
- **Testimonials** – One or two short quotes from partners or delivery leads (with permission) would reinforce “who relies on me.”  
- **Thought leadership** – Blog, essays, or whitepapers (you already have whitepaper material) can live on a `/writing` or `/insights` page later; link from nav or footer.  
- **Lead magnet** – Optional: one-pager PDF (“AI Delivery: From Ambition to Shipped”) or “30/60/90 AI adoption” summary for email capture. Only if you want to grow a list.

---

## Part 4: Visual & Interaction Design

### 4.1 Typography

- **Current:** Inter (body/UI) + JetBrains Mono (accents). Good, readable, and tech-appropriate.  
- **Recommendations:**  
  - Consider a **variable font** version of Inter (or a similar grotesque) for smoother weight transitions and fewer requests.  
  - **Exaggerated hierarchy:** Make the hero name/tagline and section titles larger and bolder; keep body and captions smaller. This matches 2026 “exaggerated hierarchy” in a minimal way.  
  - **Mono:** Keep for stats, dates, and technical labels (e.g. “01”, “02” in process, journey years). Reinforces “builder” without overwhelming.  
  - **Accessibility:** Minimum 16px body (you’re there); ensure line-height and paragraph spacing stay comfortable in both themes if you add a toggle.

### 4.2 Color & Theme

- **Current:** Dark background (#0a0a0b), indigo/cyan/purple gradient accent, high contrast text. Reads as “premium tech.”  
- **Research note:** Some B2B conversion data favors light mode and maximum readability. Your audience is mixed (internal PwC, clients, partners); many will visit during work hours on desktop.  
- **Options:**  
  - **A) Keep dark as default**  
    - Improve contrast (e.g. body text #e4e4e7 or lighter) so it passes WCAG AA on dark.  
    - Optional: add a **theme toggle** (dark/light/system) and make light a warm off-white with the same accent palette for consistency.  
  - **B) Light default, dark optional**  
    - Default light for readability and conversion; dark as preference.  
- **Accent:** Your gradient (indigo → cyan → violet) is distinctive and on-brand. Keep it; use it for primary CTAs, key stats, and one or two decorative elements (e.g. hero glow). Don’t overuse so it stays premium.

### 4.3 Layout & Spacing

- **Whitespace:** Increase section padding and max-width of text blocks where possible. “Premium minimal” reads as confident when there’s room to breathe.  
- **Grid:** Keep a simple 12-column (or equivalent) grid; cards and impact blocks can stay as they are. Avoid clutter.  
- **Hero:** One clear message. Badge (role) + name + tagline + short description + 2 CTAs. No competing headlines.

### 4.4 Motion & Interactivity

- **Scroll reveal:** Use native CSS or lightweight JS to fade/slide sections in on scroll. Keeps the narrative feeling progressive.  
- **Hover:** Cards (superpower, impact) lift slightly and border/glow; buttons have clear state change.  
- **Focus:** Visible focus rings (keyboard nav) for all interactive elements; match your accent color.  
- **Avoid:** Auto-playing video, heavy parallax, or animation that delays access to content. Your brand is “ship”; the site should feel fast and purposeful.

### 4.5 Components to Refine

- **Nav:** Sticky, minimal. Consider a single “Contact” or “Connect” in the nav as primary CTA.  
- **Cards (superpower, impact):** Keep; ensure they’re consistent (padding, radius, border). The featured “Strategy + Engineering” card can stay visually dominant.  
- **Process timeline:** The 01 → 04 flow is clear. Optional: subtle scroll-driven progress (line or step highlight) as user scrolls.  
- **Journey:** Timeline is strong. “Now” as current state is good; keep it concise.  
- **Footer:** Minimal. Copyright + optional secondary links (e.g. LinkedIn, PwC disclaimer if needed).  

---

## Part 5: Technical & Performance

- **Performance:** Target LCP <2.5s, FID/INP minimal. You’re static HTML/CSS/JS; preconnect to Google Fonts, consider self-hosting or variable font subset.  
- **Accessibility:**  
  - Semantic HTML (sections, headings, nav, main).  
  - Alt text for any images you add.  
  - WCAG 2.2 AA: contrast, focus, keyboard nav, no drag-only interactions.  
- **SEO:**  
  - Title: “Andrew Dean Martin | AI Delivery Leader | PwC” (or similar).  
  - Meta description: one sentence with role, differentiator, and CTA.  
  - Canonical URL; Open Graph for LinkedIn/social sharing.  
- **Analytics:** Lightweight (e.g. Plausible, Fathom, or GA4 with minimal scripts) to see which sections get attention and where users drop off.  

---

## Part 6: Summary — “Your Personal Brand UX in One Page”

| Dimension | Recommendation |
|-----------|----------------|
| **Positioning** | First 3 seconds: Director, PwC, AI Delivery; “Turning AI ambition into shipped products”; strategy + engineering in one person. |
| **Structure** | Single-page core; optional /about, /work, /contact later. Section order: Hero → About → Superpower → Process → Impact → Expertise → Journey → Contact. |
| **Visual** | Premium minimal: strong typographic hierarchy, your existing palette (dark + indigo/cyan/violet), generous whitespace. Consider theme toggle (light/dark) for accessibility and B2B conversion. |
| **Motion** | Subtle scroll reveal; clear hover/focus states; no heavy animation. |
| **Content** | Proof-led: metrics, named programs, methodologies. Optional: press, testimonials, one lead magnet. |
| **CTAs** | Primary: “See how I work” + “Connect” (LinkedIn + email). Keep secondary CTAs minimal. |
| **Tech** | Fast load, WCAG 2.2 AA, semantic HTML, variable fonts if beneficial, light analytics. |

---

## Part 7: What Your History Specifically Adds to the UX

- **Fraternity leadership consultant (30+ chapters)** → You’re used to **adapting message to audience**. The site can speak to multiple visitor types (leadership, delivery, clients) through one narrative with clear sections.  
- **HP → PwC, sales then consulting** → You understand **relationship and trust**. The UX should feel credible and “proof-y,” not salesy.  
- **Workplace GTM, product P&L, platform lead** → You think in **go-to-market and scale**. The “How I work” and “Impact” sections mirror that: methodology + outcomes.  
- **AI Champions, Cursor, prompt libraries** → You’re **hands-on with tools**. The site can subtly signal craft (code-like details, mono font, clean structure) without looking like a dev portfolio.  
- **Governance, compliance, human-in-the-loop** → The design should feel **controlled and intentional**—no chaotic layouts or dark patterns.  
- **Tampa, WSU, Vancouver, Shanghai stint** → Optional “About” expansion: one line on roots or place to add warmth without shifting focus from professional value.

---

*This document is a research artifact. Use it to guide design decisions, content updates, and future iterations of andrew-martin-portfolio (or any successor site). Last updated: February 2026.*
