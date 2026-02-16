# Prompt Refinement Workflow — UX Research & Demo Specification

**Research question:** How do users transform a quick, rough prompt into a better prompt that they then use in a *different* LLM conversational chat to get a good answer?

**Date:** February 2025  
**Purpose:** Document the workflow, research backing, and step-by-step flow for a clickable demo.

---

## 1. Executive Summary

Users often start with a vague or quick prompt ("summarize this," "help me write X") and get mediocre or inconsistent answers. The workflow we're documenting is:

1. **Stage 1 (Prompt Optimizer):** User enters a rough prompt → an LLM (or meta-prompt template) refines it into a structured, best-practice prompt.
2. **Stage 2 (Target Chat):** User copies that improved prompt into a *different* conversational chat (e.g., ChatGPT, Claude, Copilot) and gets a better answer.

This is known in the literature as **meta-prompting** or **prompt optimization via LLM**. Research shows:
- Meta-prompting improves outputs measurably (e.g., OpenAI cookbook: enhanced prompts outperform simple ones on evaluation criteria).
- Two-stage workflows (optimize → use) reduce user effort vs. manual iteration.
- Users benefit from a low-friction "quick prompt in, better prompt out" interface.

---

## 2. The User Journey (Clickable Demo Steps)

### High-Level Flow

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  STAGE 1: PROMPT OPTIMIZER (Your Tool)                                     │
│  "Turn my rough idea into a prompt I can copy"                              │
├─────────────────────────────────────────────────────────────────────────────┤
│  ① User types rough prompt                                                  │
│  ② System refines it (meta-prompt or template)                              │
│  ③ User sees before/after and copies the refined prompt                     │
└─────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│  STAGE 2: TARGET CHAT (External LLM — ChatGPT, Claude, etc.)                │
│  "Paste that prompt and get a good answer"                                  │
├─────────────────────────────────────────────────────────────────────────────┤
│  ④ User pastes refined prompt into target chat                              │
│  ⑤ User gets higher-quality answer                                          │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Clickable Demo Steps (for UI/UX)

| Step | Screen / Interaction | What the user sees / does |
|------|----------------------|---------------------------|
| **1** | Input field + CTA | "Paste or type your rough prompt here" — e.g., *"summarize news articles"* |
| **2** | Refine button click | User clicks "Refine my prompt" or "Build better prompt" |
| **3** | Processing (optional) | Brief loading state — "Optimizing your prompt..." |
| **4** | Before/After reveal | Side-by-side or animated transition: **Before** (rough) | **After** (structured) |
| **5** | Copy CTA | "Copy refined prompt" button — one click to clipboard |
| **6** | Handoff instruction | "Paste this into ChatGPT, Claude, or your preferred AI chat for best results" |
| **7** | Completion state | After copy: "Copied! Paste into your AI chat to see the difference." |
| **8** | Optional: Try it | Link or text: "See example in action" (preset demo) |

---

## 3. The Meta-Prompt: What Makes It Work

### Core Concept (OpenAI Cookbook)

A **meta-prompt** is a prompt that instructs an LLM to improve another prompt. The structure:

```
Improve the following prompt to [GOAL].
Adhere to prompt engineering best practices.
[SPECIFIC CONSTRAINTS — e.g., structure, format, clarity]

{user's rough prompt}

Only return the improved prompt.
```

### Research-Backed Best Practices to Encode

When the optimizer refines the user's prompt, it should implicitly apply:

| Technique | What it does | Example |
|-----------|--------------|---------|
| **Role assignment** | "Act as X" sets context and tone | "Act as a senior technical architect" |
| **Structured output** | Numbered sections, bullets, JSON | "Provide: 1. Summary 2. Tags 3. Sentiment" |
| **Constraints** | Word count, format, scope | "In 3 bullets, max 50 words each" |
| **Clarity** | Remove ambiguity; specify "what good looks like" | "Include reasoning for each recommendation" |
| **Separate data from instructions** | Use placeholders for dynamic content | `{article}` or `{your topic}` |

### Example: Before vs. After

**User's rough prompt (Stage 1 input):**
> summarize news articles

**Refined prompt (Stage 1 output — what user copies to Stage 2):**
> Please read the following news article and provide a comprehensive summary that includes:
>
> 1. **Type of News**: Specify the category (e.g., Politics, Technology, Health, Sports).
> 2. **Summary**: Write a concise, logical summary of the main points.
> 3. **Tags**: List relevant keywords or tags.
> 4. **Sentiment Analysis**: Analyze overall sentiment (positive, negative, or neutral) with brief reasoning.
>
> **Article:**
>
> {paste your article here}

---

## 4. UX Research Findings — What Users Need

### Pain points (from literature and practice)

1. **Vague first attempt** — Users don't know how to structure prompts; they type what they *want*, not what the model *needs* to hear.
2. **Trial and error fatigue** — Manual iteration is slow; users give up or accept subpar outputs.
3. **Context switching** — Users may not want to leave their target chat (ChatGPT, etc.) to "learn" prompt engineering elsewhere.
4. **Trust** — Users need to see *why* the refined prompt is better (before/after, structure, rationale).

### Design implications for the demo

| Finding | Demo implication |
|---------|------------------|
| Low friction wins | Single input → single output; minimal steps |
| Before/after builds trust | Show both prompts; optionally show sample output comparison |
| Copy is critical | One-click copy; clear "paste in ChatGPT/Claude" instruction |
| Categories reduce cognitive load | Optional: preset categories (Summarize, Analyze, Write, etc.) that pre-load constraints |
| "Different LLM" matters | Explicitly say "Use this in ChatGPT, Claude, Copilot" — reinforces the workflow |

---

## 5. Meta-Prompt Template for the Demo

### Generic refinement meta-prompt (for your optimizer logic)

```
You are a prompt engineer. Your task is to improve the following user prompt so that when pasted into a conversational AI (ChatGPT, Claude, Copilot, etc.), it produces high-quality, structured answers.

Apply these best practices:
- Assign a clear role if relevant (e.g., "Act as a...")
- Structure the output (numbered lists, sections, or format)
- Add constraints (length, format, scope) where helpful
- Use placeholders like {content} or {topic} for user-provided data
- Be specific about what "good" looks like

User's rough prompt:
---
{USER_PROMPT}
---

Return ONLY the improved prompt. No explanation. The output should be ready to copy and paste.
```

### Category-specific variations (for one-click demos)

| Category | Constraint to add |
|----------|-------------------|
| Summarize | Include: type/category, main points, tags, sentiment |
| Analyze | Include: scope, criteria, format (bullets/table), reasoning |
| Write | Include: audience, tone, length, structure |
| Compare | Include: items to compare, dimensions, output format |
| Explain | Include: audience level, depth, examples yes/no |

---

## 6. Implementation Options for the Demo

### Option A: Pure frontend (no API)

- Pre-built transformations for 5–10 common prompts
- User picks category → sees before/after
- "Refine" runs a rule-based or template-based transform
- **Pros:** No cost, instant, works offline. **Cons:** Limited to predefined cases.

### Option B: Single API call to refine

- User input → send to Claude/GPT → get refined prompt
- **Pros:** Handles any input. **Cons:** API cost, latency.

### Option C: Hybrid (recommended for demo)

- **Preset demos:** 3–5 one-click examples with pre-built before/after (pure frontend)
- **Custom input:** Optional "Refine my own prompt" that uses a meta-prompt template; could be:
  - Template-only (fill placeholders, add structure by rules), or
  - API-powered for true dynamic refinement

---

## 7. Demo Scenarios (Clickable Presets)

Suggested one-click demos that show the workflow without requiring custom input:

| Scenario | Rough prompt | Refined prompt (abbreviated) |
|----------|--------------|------------------------------|
| News summarization | "summarize this article" | Structured: type, summary, tags, sentiment + placeholder |
| Stakeholder update | "update leadership on the project" | Role: delivery lead. Task: sprint progress, blockers, next steps. Format: bullets. |
| Code review | "review this code" | Role: senior dev. Task: security, readability, maintainability. Output: sections by severity. |
| Migration analysis | "analyze this for migration" | Role: platform analyst. Task: data model, customizations, integrations. Format: table + recommendations. |

---

## 8. Success Metrics (for the demo)

The demo succeeds if a visitor can:

1. **Understand the workflow** — "I type something rough, get something better, paste it elsewhere"
2. **See the value** — Before/after feels meaningfully different
3. **Act** — Copy and (theoretically) use the refined prompt
4. **Remember** — "Prompt refinement" or "meta-prompting" as a concept they can apply

---

## 9. Key Sources

- [OpenAI Cookbook: Meta prompting](https://developers.openai.com/cookbook/examples/enhance_your_prompts_with_meta_prompting) — Measurable improvement (e.g., categorization, tags, sentiment).
- [Meta-Prompting (arxiv 2311.11482)](https://arxiv.org/abs/2311.11482) — LLMs optimizing their own prompts.
- [Latitude: Iterative Prompt Refinement](https://latitude.so/blog/iterative-prompt-refinement-step-by-step-guide) — Draft → assess → refine → test.

---

## 10. Suggested Copy for the Demo UI

| Element | Suggested copy |
|---------|----------------|
| Page title | "Prompt Refinement" or "Turn a rough prompt into a better one" |
| Subtitle | "Get prompts you can paste into ChatGPT, Claude, or any AI chat for better answers" |
| Input placeholder | "Paste or type your rough prompt (e.g., 'summarize this' or 'help me write a status update')" |
| Primary CTA | "Refine my prompt" or "Build better prompt" |
| Before label | "Your prompt" or "Rough prompt" |
| After label | "Refined prompt (copy and paste into your AI chat)" |
| Copy button | "Copy to clipboard" |
| Handoff text | "Paste this into ChatGPT, Claude, or Copilot for best results" |
| Success (after copy) | "Copied! Paste into your AI chat to see the difference." |
| Preset label | "Try an example" or "See it in action" |

---

## 11. Why "Different LLM"? — Copy for the Demo

Add one line to explain the two-stage design:

> **This tool optimizes your prompt.** Paste the result into ChatGPT, Claude, or Copilot — wherever you already work — to get better answers without changing your usual chat.

---

## 12. When This Helps (and When It Doesn't)

**Works best when:**
- The rough prompt is vague or underspecified ("summarize this," "help me write...")
- The user wants structure (bullets, sections, format) but doesn't know how to ask
- The user is new to prompt engineering

**Less useful when:**
- The prompt is already precise; refinement may add unnecessary bulk
- Over-refinement can make prompts rigid — users can (and should) edit the output

**Demo implication:** Frame the tool as a starting point, not a replacement for judgment.

---

## 13. Completion State & Error Handling

| State | What to show |
|-------|--------------|
| **Success (after copy)** | "Copied! Paste this into your AI chat to see the difference." — gives a clear "done" moment |
| **Empty input** | "Enter a rough prompt to refine" or disable the CTA until input exists |
| **Very long input** | Optional: character limit with message "Prompt is long — refining may take a moment" |

---

*Use Sections 2, 6, and 7 to drive the clickable demo flow.*

---

## 14. Implementation Status (Feb 2025)

**Live in portfolio:** `site/index.html` → Demos → Prompt Engineering tab

**Implemented:**
- PC conversational panels (not iPhones)
- Drag-and-drop: rough prompt → Stage 1, refined prompt → Stage 2
- Tap/click fallback for iPhone and touch devices
- Real copy-to-clipboard when refined prompt is used
- First-time instructional overlay (localStorage)
- Scenario-specific hints under rough prompt
- Step indicators ("Step 1: Refine", "Step 2: Use in ChatGPT")
- Play-to-watch fallback for passive viewing

**Files:** `site/prompt-demo.js`, `site/styles.css` (`.prompt-demo-inline`), `site/index.html`
