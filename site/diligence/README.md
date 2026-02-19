# Diligence page (password-protected)

This page lives at **/diligence/** and is linked from the main nav. It is intended to sit “behind” your status page (link from there as well if you use a separate status URL) and **behind a password**.

## Password

- **Default passphrase:** `shorehome2026`
- **To change:** Edit `index.html`, find `var EXPECTED_PASS = 'shorehome2026';` and set your own. For anything more secure, use server-side or env-based auth (e.g. Vercel password protection, Netlify Identity, or a small backend).

## Contents

- **Gate:** Passphrase form; success stored in `sessionStorage` for the session.
- **Summary:** ShoreHome diligence (exec summary, scorecard, risk register).
- **Calculator:** SDE and valuation with “Load example” (Small / Mid / Larger) and Calculate.
- **Market:** Who else does this (SMB Diligence, Rapid Diligence, etc.) and market size one-liner.

Uses the same UX and brand as the main site (fonts, CSS variables, nav, footer).
