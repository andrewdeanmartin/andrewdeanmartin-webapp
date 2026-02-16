# Ship checklist — andrewdeanmartin.com

Use this before calling the site "done and shipped."

---

## Must-have before go-live

### 1. OG / social image
- **What:** `site/og-image.png` (1200×630 px) for LinkedIn, Twitter, etc.
- **Why:** `index.html` references `https://andrewdeanmartin.com/og-image.png`. If the file is missing, shares show no image or a broken preview.
- **Do:** Create an image (name + tagline or key visual), save as `site/og-image.png`. No code change needed if the path stays the same.

### 2. Deploy and domain
- **What:** Deploy the `site/` folder (or repo with `site` as publish directory). Point andrewdeanmartin.com to that host.
- **Options:** Vercel (`site/vercel.json` already present), Netlify, GitHub Pages, or your current host.
- **Do:** Connect repo, set root/output to `site` if needed, add custom domain in the host’s dashboard.

### 3. Quick proof
- **Links:** Click **LinkedIn** and **Email** in Connect; confirm URLs and address.
- **Nav:** About, What I Do, Demos, Impact, Connect — all scroll to the right section.
- **One demo:** Play Agent Pipeline or drag in Prompt Engineering; confirm no console errors.
- **Mobile:** Resize or use DevTools; check hero, stats, and demos are readable and tappable.

---

## Nice-to-have

- **README:** Update "Customization" if you changed contact/links (already correct for andrewdeanmartin / andrewdeanmartin@gmail.com).
- **Analytics:** If you want traffic (e.g. Plausible, Fathom), add script once and document in README.
- **HTTPS:** Hosts like Vercel/Netlify provide it; if you use your own server, enable SSL.

---

## Already in good shape

- Copy and narrative aligned with COPY-EDITING-BRIEF and NARRATIVE-THROUGHLINE.
- No TODO/FIXME in `site/`.
- Favicon present (`site/favicon.svg`).
- Vercel config present (`site/vercel.json` with cleanUrls).
- PwC disclaimer in footer.
- All recent copy edits (About, Impact, demos, Cursor removal, tone) applied and brief updated.

---

*Last updated: February 2026*
