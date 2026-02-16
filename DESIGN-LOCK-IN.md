# Design lock-in: what we changed, why, and how to find it

**Purpose:** Single reference for all design and narrative decisions locked in for the portfolio. Use this when you need to remember what changed, why, or where to edit later.

**Lock-in date:** February 2026.

---

## Quick reference: where things live

| If you want to… | Go to |
|-----------------|--------|
| Preview the site | `START-HERE.md` → run server from `site/` |
| Edit copy | `COPY-EDITING-BRIEF.md` (source of truth); live text in `site/index.html` |
| Understand the page story | `NARRATIVE-THROUGHLINE.md` |
| Understand the visual style | `AGENT-PROMPT-ASIAN-AESTHETICS-SENSE-OF-PLACE.md` |
| See every change we made and why | This file |

---

## 1. Asian-inspired aesthetics (sense of place)

**Why:** Apply a calm, intentional, “sense of place” style so the page feels balanced and distinct, not generic.  
**Reference:** `AGENT-PROMPT-ASIAN-AESTHETICS-SENSE-OF-PLACE.md`

### 1.1 Space and rhythm (Ma)

| Change | Why | Where |
|--------|-----|--------|
| Section padding 6rem → 7rem (tablet 5rem, mobile 3.5rem) | More breathing room; “rest zones” so the layout doesn’t feel exhausting | `site/styles.css` — `section, .section { padding }` and responsive blocks |
| Container max-width 1100px → 1040px, padding 2rem → 2.5rem | More margin and internal space | `site/styles.css` — `.container` |
| Section header margin-bottom 3.5rem → 4rem | Clearer separation between “chapter” title and content | `site/styles.css` — `.section-header` |
| Larger gaps in About grid, superpower grid, impact grid, demo section | Use space to separate ideas, not only borders | `site/styles.css` — `.about-grid`, `.superpower-grid`, `.impact-grid`, `.demo-section` |
| Demo section extra padding (8rem top/bottom desktop, less on smaller screens) | Demos feel like a distinct “chapter” with room to breathe | `site/styles.css` — `.demo-section { padding-top; padding-bottom }` and media queries |
| Thin section divider line at top of each `.section` (3rem wide, 50% opacity) | Vertical rhythm; subtle “chapter” break between sections | `site/styles.css` — `.section::before` |

### 1.2 Restraint and subtlety (Kanso, Shibui)

| Change | Why | Where |
|--------|-----|--------|
| Accent color #c2410c → #9a4a1a (muted) | Understated warmth; “suggestion over shouting” | `site/styles.css` — `:root { --color-accent }` (and accent-light, warm) |
| Softer shadows (lower opacity, smaller spread) | Less visual noise; calm, not heavy | `site/styles.css` — `:root { --shadow-sm, --shadow-md, --shadow-lg, --shadow-card-hover }` |
| Hero gradient mesh lower opacity and slightly off-center | Atmosphere without clutter | `site/styles.css` — `.hero::before` |
| Scroll progress bar: 3px → 2px, gradient → muted solid (rgba primary) | Restraint; progress indicator present but not loud | `site/styles.css` — `.scroll-progress` |
| Featured “How I Work” card: full solid gradient → softer gradient with transparency + light border | Less “shouting”; still distinct | `site/styles.css` — `.superpower-card.featured` |
| Card icons smaller (1.75rem → 1.25rem), 75% opacity (90% on featured) | Typography and content carry hierarchy; icons support, don’t dominate | `site/styles.css` — `.superpower-card .card-icon` |

### 1.3 Space not borders (Ma)

| Change | Why | Where |
|--------|-----|--------|
| Superpower and impact cards: border removed; separation by box-shadow + gap | “Use spacing to separate ideas, not only borders or boxes” | `site/styles.css` — `.superpower-card`, `.impact-card` (no border; `box-shadow: var(--shadow-sm)` ) |

### 1.4 Asymmetry (Fukinsei)

| Change | Why | Where |
|--------|-----|--------|
| Hero: content left-aligned with margin-left 8%, max-width 720px; gradient ellipses off-center (40%, 75%) | Off-center focal point; “one strong visual weight countered by space” | `site/styles.css` — `.hero-content`, `.hero::before`. On viewport ≤768px, hero re-centers (`.hero-content { margin-left: auto; text-align: center }`) |
| Superpower grid: two columns 0.72fr 1.28fr (narrower left, wider right); featured card still full width | “Uneven but balanced columns”; layout feels alive, not templated | `site/styles.css` — `.superpower-grid { grid-template-columns: 0.72fr 1.28fr }`. Responsive: 1 column at 768px |
| Impact grid: three columns 0.9fr 1.2fr 0.9fr (centre card slightly wider) | Same Fukinsei idea in Impact | `site/styles.css` — `.impact-grid { grid-template-columns: 0.9fr 1.2fr 0.9fr }`. Responsive: 2 cols at 768px, 1 at 640px |

### 1.5 Typography and calm

| Change | Why | Where |
|--------|-----|--------|
| Body line-height 1.7 → 1.75, letter-spacing 0.01em | Type as “carrier of rhythm and calm”; blocks feel like breath, not walls | `site/styles.css` — `body` |
| Section title letter-spacing relaxed; impact/contact intro line-height 1.7 | Consistent calm rhythm in headings and intros | `site/styles.css` — `.section-title`, `.impact-intro`, `.contact-text` |
| About paragraphs: margin-bottom 1.25 → 1.75rem, line-height 1.8 | More breath in long text | `site/styles.css` — `.about-text p` |

### 1.6 Gentler motion and CTAs

| Change | Why | Where |
|--------|-----|--------|
| Card/button hover lift -2px → -1px (featured card -3px → -2px) | Naturalness and calm; avoid “sterile perfection” or aggressive motion | `site/styles.css` — `.card:hover`, `.superpower-card:hover`, `.impact-card:hover`, `.btn-primary:hover`, `.btn-secondary:hover`, `.superpower-card.featured:hover` |
| Primary button: gradient → solid `var(--color-primary)`; active demo tab same | Understated CTAs; “suggestion over shouting” | `site/styles.css` — `.btn-primary`, `.demo-tab.active` |

### 1.7 Sense of place and elemental hint

| Change | Why | Where |
|--------|-----|--------|
| About section: very subtle vertical gradient band (blue tint) | “Distinct place”; About = “who I am” as one calm zone | `site/styles.css` — `.about` (background linear-gradient). Dark theme variant for `[data-theme="dark"] .about` |
| About section label color → `--color-wood` (#4a6b5a light, #6b9b82 dark) | Optional “Wood” element (growth/grounding); one section tied to elemental balance | `site/styles.css` — `:root { --color-wood }`, `.about .section-label { color: var(--color-wood) }` |

### 1.8 Dark theme

| Change | Why | Where |
|--------|-----|--------|
| Dark theme shadows softened; `--color-wood` added for dark | Same calm, restrained feel in dark mode | `site/styles.css` — `[data-theme="dark"]` block |
| Nav background uses `color-mix(in srgb, var(--color-bg) ...)` | Nav stays in sync with palette in both themes | `site/styles.css` — `.nav`, `[data-theme="dark"] .nav` |

### 1.9 CSS comment at top of styles

| Change | Why | Where |
|--------|-----|--------|
| Comment referencing Asian-inspired aesthetics and `AGENT-PROMPT-ASIAN-AESTHETICS-SENSE-OF-PLACE.md` | So future edits know the design intent | `site/styles.css` — top-of-file comment |

---

## 2. Narrative throughline (one connected theme)

**Why:** The page should feel like one story: this → that → next, different but connected, all driving toward the same north star (“Turn AI ambition into what actually ships”).  
**Reference:** `NARRATIVE-THROUGHLINE.md`

### 2.1 North star

- **North star:** *Turn AI ambition into what actually ships* — making ideas real, governed, and scalable.
- **Flow:** Hero (who + promise) → About (why me) → How I Work (how) → Demos (see it) → Impact (proof) → Connect (next).

### 2.2 Bridge copy (handoffs between sections)

**Implementation note:** The live site (`site/index.html`) uses Unicode curly apostrophe (U+2019) and curly quotes (U+201C, U+201D) in the Demos intro. If you edit that paragraph in the HTML, match the file’s encoding or use a script; simple find/replace with straight quotes can miss. Prefer editing the Demos intro in **COPY-EDITING-BRIEF.md** and then syncing to `site/index.html` so the brief stays source of truth.

| Location | Bridge text | Why |
|----------|-------------|-----|
| Start of Demos intro | “Those approaches show up in the four tools below. ” | Links “How I Work” to “See it in practice.” |
| Before Impact intro | “This way of working has produced measurable results.” | Links Demos to proof. |
| Before Connect body | “If that sounds like the partnership you need, let’s talk.” | Links Impact to next step. |

**Where implemented:**

- **HTML:** `site/index.html`
  - Demos: first sentence of `<p class="demo-intro">` (note: file uses Unicode apostrophe/quotes in “Here’s” / “what actually ships”).
  - Impact: `<p class="section-bridge">` before `<p class="impact-intro">`.
  - Connect: `<p class="section-bridge">` before `<p class="contact-text">`.
- **CSS:** `site/styles.css` — `.section-bridge` (centered, max-width 560px, font-weight 500, spacing).
- **Copy source of truth:** `COPY-EDITING-BRIEF.md` — Demos intro paragraph, Impact “Bridge” line, Connect “Bridge” line. Narrative note at top of brief points to `NARRATIVE-THROUGHLINE.md`.

### 2.3 Existing handoff (unchanged)

- About ends with: “The demos below show how.” — already links About → Demos; kept as-is.

---

## 3. Documents updated for lock-in

| Document | What was added/updated |
|----------|------------------------|
| `START-HERE.md` | (To be updated: pointer to this lock-in and narrative doc.) |
| `COPY-EDITING-BRIEF.md` | Narrative throughline note at top; bridge copy in Demos, Impact, Connect. |
| `NARRATIVE-THROUGHLINE.md` | Created: north star, flow table, bridge copy list, echoes of north star. |
| `DESIGN-LOCK-IN.md` | This file: all changes, why, where, and how to find or revert. |
| `site/index.html` | Bridge sentences in Demos intro and two `<p class="section-bridge">` elements. |
| `site/styles.css` | All aesthetic and bridge styling above. |

---

## 4. How to revert or tweak later

- **Hero left-aligned:** In `site/styles.css`, `.hero-content`: set `margin-left: auto`, `text-align: center` for all viewports to re-center.
- **How I Work / Impact equal columns:** In `site/styles.css`, `.superpower-grid` → `grid-template-columns: repeat(2, 1fr)`; `.impact-grid` → `grid-template-columns: repeat(3, 1fr)`.
- **Cards with borders again:** In `site/styles.css`, add `border: 1px solid var(--color-border-light)` back to `.superpower-card` and `.impact-card`; remove or reduce reliance on `box-shadow` if desired.
- **Brighter accent / scroll bar / CTAs:** In `site/styles.css`, restore original `--color-accent` and gradient in `.btn-primary`, `.scroll-progress`, etc., from git history or this doc.
- **Remove bridge copy:** In `site/index.html`, remove the two `<p class="section-bridge">` elements and the “Those approaches show up…” prefix from the Demos intro; then sync `COPY-EDITING-BRIEF.md` and optionally `NARRATIVE-THROUGHLINE.md`.

---

## 5. Summary

- **Visual design:** Asian-inspired sense of place (Ma, Fukinsei, Kanso, etc.) applied in CSS: more space, softer accents and shadows, asymmetry in hero and grids, borders replaced by space/shadow where appropriate, calmer typography and motion. Dark theme aligned.  
- **Narrative:** One throughline (who → how → see it → proof → next) with explicit bridge sentences so each section hands off to the next; north star = “Turn AI ambition into what actually ships.”  
- **Lock-in:** All of the above is recorded here and in the referenced docs so you can revisit, revert, or extend later without losing the “why” or “how.”

*Last updated: February 2026*
