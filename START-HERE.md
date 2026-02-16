# Portfolio — Get Going

**What:** Single-page site for andrewdeanmartin.com (alpha).  
**Where:** `site/index.html` is the whole page. Copy source of truth: `COPY-EDITING-BRIEF.md`.

---

## What’s locked in (design & narrative)

- **Design:** Asian-inspired aesthetics (space, restraint, asymmetry, calm). Style guide: `AGENT-PROMPT-ASIAN-AESTHETICS-SENSE-OF-PLACE.md`.
- **Narrative:** One story — who → how → see it → proof → next; north star: *Turn AI ambition into what actually ships*. Flow + bridge copy: `NARRATIVE-THROUGHLINE.md`.
- **Full change log (what we changed, why, where, how to revert):** `DESIGN-LOCK-IN.md`.

---

## Preview locally

```bash
cd site && python3 -m http.server 8080
```

Then open **http://localhost:8080**

---

## To get Cursor moving

Open **COPY-EDITING-BRIEF.md** and say:

> I'm back on the portfolio. COPY-EDITING-BRIEF is source of truth for copy; live site is site/index.html. What should we tackle next?

Or name a section: *"Let's work on the Impact section"* / *"Demos intro"* / *"Hero"*.

For design or narrative context, open **DESIGN-LOCK-IN.md** or **NARRATIVE-THROUGHLINE.md**.

---

## Page structure (top to bottom)

| Section              | Id / Notes                          |
|-----------------------|-------------------------------------|
| Hero                  | Badge, name, tagline, CTAs          |
| About                 | Short version, 3 stats              |
| What Sets Me Apart    | 5 cards                              |
| Demos                 | 4 tabs (Pipeline, Prompt, Assessment, Reliability) |
| Impact                | Intro + 3 cards                      |
| Connect               | LinkedIn, Email (andrewdeanmartin@gmail.com) |
| Footer                | CTA, disclaimer                      |

---

## Demos: did personas find them useful?

To get **each persona’s take on whether the demos are useful** and **whether the demos help the webapp’s overall goal** (Partners, C-Suite, Recruiter, Alliance):

1. Open **DEMO-PERSONA-FEEDBACK-PROMPT.md**.
2. Copy everything **from “INSTRUCTIONS FOR THE AI”** to the end of the file.
3. Paste into a **new chat** and send. The AI will role-play David, Sarah, Rachel, and Marcus and return: for each, “Were the demos useful?” (Yes/Partly/No + why), then overall “Are these demos helpful for the webapp’s goal?”

Optional: run the site locally first (`cd site && python3 -m http.server 8080`), click through the demos, then paste the prompt so the AI can reason from your experience or the descriptions in the prompt.

---

*Last updated: February 2026. Lock-in doc: DESIGN-LOCK-IN.md.*
