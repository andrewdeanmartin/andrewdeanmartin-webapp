# Market context + webapp plan

## Who else does this (and how they’re positioned)

| Player | What they do | Pricing / model | Angle |
|--------|--------------|------------------|--------|
| **SMB Diligence** | Legal + financial DD for small-business buyers; QoE, employment, purchase agreement review | Fixed-rate, 30–50% below “market” | Cost-effective DD packages |
| **Rapid Diligence** | Full DD: operational, financial, market, strategic, technical | Pre-LOI vetting ~$750; full QoE $8,900+ | Staged (pre-LOI → post-LOI) |
| **DealValid8** | DD platform for **online** businesses | Free (5 evals) to $19/mo (AI) | Self-serve, checklist + AI |
| **Acquidex** | AI deal analysis for small-business buyers; risk flags, price comparison | — | “Deal Snapshot,” quick go/no-go |
| **Axial** | Valuation calculator (DCF), deal flow, network | Calculator free; platform for dealmakers | Data-driven valuation + marketplace |
| **ValuAdder** | Valuation software for buyers (multiples, DCF, comparables) | Software/license | Buyer-focused valuation |

**Gap:** Most are either (a) **full-service DD** (human-led, $750–$9k+) or (b) **valuation/analysis tools** (calculators, software). There’s room for a **lightweight, PwC-style commercial DD + back-of-napkin valuation in one place** for small investors / search fund types who want to do their own first pass before calling SMB Diligence or Rapid Diligence.

---

## Market size (order of magnitude)

- **U.S. small business M&A:** ~9,500–10,700+ transactions/year (2024); **~$7.6–8B** enterprise value. Sub-$1M segment: **~2,400** deals in a quarter, **~$2B** value (Q4 2024). Median sale price **~$350k**, median cash flow **~$159k**. (Sources: BizBuySell, Axial.)
- **Implication:** Lots of sub-$1M and low-mid market deals where a “first-pass diligence + calculator” product could sit: before LOI, before hiring a firm. TAM for “DD + valuation support” is a slice of that (e.g. % of buyers who’d pay for a template/tool or a light report).

---

## What the webapp could be

**Core idea:** One place for (1) **this deal’s diligence** (findings, risk, conditions to close) and (2) **your napkin math** (SDE, valuation range, stress test). Optional: (3) **market context** (why this space, who else does DD, how we’re different).

### Suggested structure

1. **Landing / home**  
   - One-line value prop: e.g. “PwC-style commercial diligence + valuation for small investors.”  
   - Short “what’s inside” (diligence summary, calculator, how to use it).  
   - Optional: “Market test” CTA (e.g. “See how we compare” or “Who else does this”).

2. **Diligence summary (this deal)**  
   - Executive summary (2–3 paragraphs from the main report).  
   - Section scorecard (table: section, finding, confidence, risk flag).  
   - Risk register (top 5 risks, mitigation).  
   - Conditions to close (checklist).  
   - Link or PDF to full report if you want to keep the long doc separate.

3. **Calculator**  
   - Embed or link to the existing `financial-framework.html` (SDE, valuation range, stress).  
   - Short “what this tells you” (same bullets we wrote for the small investor).  
   - Optional: “Example numbers” prefilled or in a collapsible “Try with sample data.”

4. **Market / “Why this exists”**  
   - Short “Who else does this” (table or cards): SMB Diligence, Rapid Diligence, DealValid8, Acquidex, Axial, ValuAdder — one line each + “Our angle: first-pass diligence + valuation in one place, before you hire a firm.”  
   - Optional: “Market size” one-liner (e.g. “~10k small business transactions/year in the U.S.; we help you size and vet one deal at a time.”).

5. **Next steps / CTA**  
   - For you: “Request full report,” “Run your own numbers,” “Book a review.”  
   - For a market test: “Get notified when we add more industries” or “Tell us what you’re looking at” (email or typeform).

---

## Market test options

- **Demand:** Put the webapp in front of 10–20 small investors / search fund searchers / ETA folks. Ask: “Would you use this before LOI? Would you pay for a one-off report like this?”  
- **Product:** Offer a “one free report” (e.g. one more business, same framework) in exchange for a 15-min call or written feedback.  
- **Positioning:** A/B or just test two framings: “Do your own first-pass diligence” vs “Get a PwC-style report without the PwC price.”

---

## Suggested build order

1. **Single-page webapp** (or 2–3 pages):  
   - Nav: Home | Diligence summary | Calculator | Market / Who else.  
   - Reuse existing `financial-framework.html` (embed iframe or copy into a route).  
   - Content: pull from `SHOREHOME-DUE-DILIGENCE-REPORT.md`, `ShoreHome-conditions-to-close.md`, and the new market table above.  
2. **Add “Market” section** with the competitor table and one paragraph on market size.  
3. **Optional:** Simple “Get updates” or “Request a report” form (e.g. Formspree, Netlify Forms) for market test.  
4. **Optional:** Second case study (another business, same framework) to show repeatability.

If you tell me your stack (static site, React, etc.) and where you want to host it, I can outline or generate the actual pages (e.g. HTML + CSS or React components) next.
