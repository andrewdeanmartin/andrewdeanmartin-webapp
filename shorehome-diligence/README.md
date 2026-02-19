# ShoreHome due diligence — financial framework

Rough-order tool for when you have (or assume) numbers: **input revenue and expenses → get SDE, valuation range, and a simple stress scenario.**

## How to use

1. Open **`financial-framework.html`** in a browser (no server needed).
2. Fill in:
   - **Revenue** and **COGS** (materials).
   - **Labor** (wages + subs) and **Overhead** (rent, insurance, marketing, other).
   - **Owner compensation** and **Other add-backs** (interest, D&A, one-time, personal run through the business).
   - Optionally **annual debt service** (e.g. Kubota equipment payments) and a **stress %** (e.g. 20 for “revenue down 20%”).
3. Click **Calculate SDE & valuation**.

You get:

- Gross profit and margin.
- **SDE** (Seller’s Discretionary Earnings) and SDE margin.
- Debt service coverage (if you entered debt service).
- **Valuation range** via SDE multiples (low/mid/high) and revenue multiples, using roofing/outdoor-living benchmarks from the main diligence report.
- **Stress scenario**: implied SDE and mid-multiple value if revenue drops by the % you chose.

## Where the multiples come from

- **SDE:** low 1.61×, mid 3.06×, high 4.41× (roofing transaction data).
- **Revenue:** low 0.23×, mid 0.50×, high 0.86×.

Adjust in your head for quality of earnings, customer concentration, key-person risk, and Kubota payoff. The tool is for **sizing and order of magnitude**, not a formal valuation.

## When you have real financials

Pull from the P&L (and tax return):

- **Revenue** — total or by line (roofing vs outdoor living).
- **COGS** — materials and direct job costs.
- **Labor** — W-2 wages, subcontractors, payroll taxes.
- **Overhead** — rent, utilities, insurance, marketing, office, other G&A.
- **Owner comp** — salary, benefits, perks (add back for SDE).
- **Add-backs** — interest, depreciation/amortization, one-time items, personal expenses run through the business.
- **Debt service** — annual principal + interest (e.g. Kubota); confirm payoff from UCC.

Then run the same framework with those numbers for a reality check and a defensible range.
