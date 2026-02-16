# Quick Visual Test Guide

## 🚀 How to Open

**Copy and paste this URL into your browser:**
```
file:///Users/andrewmartin/andrew-martin-portfolio/site/index.html
```

Or just double-click `index.html` in Finder.

---

## ⚡ 5-Minute Quick Test

### 1. First Impression (30 seconds)
- [ ] Page loads without errors
- [ ] Fonts look modern and clean (not default Arial/Helvetica)
- [ ] Light theme (off-white background, dark text)
- [ ] All sections visible when scrolling

### 2. Theme Toggle (30 seconds)
- [ ] Click sun icon (☀) in top right
- [ ] Page switches to dark theme (dark background, light text)
- [ ] Icon changes to moon (☾)
- [ ] Click again - switches back to light theme

### 3. Navigation (30 seconds)
- [ ] Click "About" in nav - page scrolls to About section
- [ ] Click "Demos" in nav - page scrolls to Demos section
- [ ] Scroll down - nav bar sticks to top

### 4. Demo Tabs (1 minute)
- [ ] In Demos section, click "Prompt Engineering" tab
- [ ] Content changes to show SharpPrompt demo
- [ ] Click "Codebase Assessment" tab
- [ ] Content changes to show 8 workstream cards
- [ ] Click "Agent Pipeline" tab
- [ ] Content changes back to pipeline demo

### 5. Agent Pipeline (2 minutes)
- [ ] Click blue "Run Analysis" button
- [ ] Watch agents run sequentially (5 agents)
- [ ] Each agent shows "Running..." then "Complete"
- [ ] Output text appears under each agent
- [ ] Human checkpoint appears (decision required)
- [ ] Audit trail at bottom populates with entries
- [ ] "Reset Pipeline" button appears
- [ ] Click "Reset Pipeline" - everything resets

### 6. Visual Check (1 minute)
- [ ] Scroll through entire page
- [ ] No overlapping text or elements
- [ ] All sections properly spaced
- [ ] Cards have subtle shadows
- [ ] Hover over cards - they lift slightly
- [ ] Footer at bottom with copyright

---

## 🐛 What to Look For

### ✅ Good Signs
- Fonts look clean and modern (Inter font)
- Code/technical text uses monospace font (JetBrains Mono)
- Smooth animations and transitions
- No layout breaks or overlapping elements
- Theme toggle works smoothly
- Demo interactions work

### ❌ Bad Signs (Report These!)
- Fonts look like default Arial/Helvetica → **Font loading issue**
- Theme toggle doesn't work → **JavaScript issue**
- Tabs don't switch → **JavaScript issue**
- "Run Analysis" button does nothing → **JavaScript issue**
- Elements overlapping → **CSS layout issue**
- Missing sections → **HTML rendering issue**
- Console errors (open DevTools with F12) → **JavaScript errors**

---

## 📸 Screenshots Needed

Please take screenshots of:
1. **Hero section** (top of page) - light theme
2. **Demo section** - Agent Pipeline tab with pipeline visible
3. **Demo section** - After clicking "Run Analysis" (agents running/complete)
4. **Full page** - After clicking theme toggle (dark theme)
5. **Any issues** - If you see broken layouts or visual problems

---

## 🔍 Browser Console Check

1. Press `F12` (or `Cmd+Option+I` on Mac)
2. Click "Console" tab
3. You should see:
   - Styled welcome message in purple/teal
   - No red error messages
4. If you see red errors, take a screenshot

---

## 📝 Report Template

Copy this and fill it out:

```
## Visual Test Results

**Browser:** [Chrome/Firefox/Safari] version [XX]
**Date:** [Today's date]

### Overall Appearance
- [ ] Fonts loading correctly: YES / NO
- [ ] Layout correct: YES / NO
- [ ] Light theme by default: YES / NO
- [ ] No visual issues: YES / NO

### Theme Toggle
- [ ] Works: YES / NO
- [ ] Smooth transition: YES / NO
- [ ] Theme persists after refresh: YES / NO

### Navigation
- [ ] Links scroll to sections: YES / NO
- [ ] Nav becomes sticky: YES / NO
- [ ] Active link highlights: YES / NO

### Demo Tabs
- [ ] Tabs switch content: YES / NO
- [ ] All 3 tabs work: YES / NO

### Agent Pipeline
- [ ] "Run Analysis" works: YES / NO
- [ ] Agents animate sequentially: YES / NO
- [ ] Human checkpoint appears: YES / NO
- [ ] Audit trail populates: YES / NO
- [ ] "Reset Pipeline" works: YES / NO

### Issues Found
[List any issues, broken layouts, or visual problems]

### Screenshots Attached
- [ ] Hero section (light theme)
- [ ] Agent Pipeline demo
- [ ] Dark theme
- [ ] Any issues
```

---

## 🎯 Expected Behavior

### Fonts
- **Body text:** Inter (clean, modern sans-serif)
- **Code/technical:** JetBrains Mono (monospace)
- **Fallback:** If fonts don't load, you'll see system fonts (still readable but less polished)

### Colors (Light Theme)
- Background: Warm off-white (#faf9f7)
- Text: Near black (#1a1a1a)
- Primary buttons: Indigo blue (#4338ca)
- Accent text: Teal (#0d9488)

### Colors (Dark Theme)
- Background: Near black (#0f0f10)
- Text: Off-white (#e8e6e3)
- Primary buttons: Indigo blue (same)
- Accent text: Teal (same)

### Animations
- Theme toggle: Smooth color transitions
- Agent pipeline: Sequential animation (each agent runs one after another)
- Hover effects: Cards lift slightly with shadow
- Scroll: Smooth scrolling to sections

---

## ⏱️ Timeline

**Total time:** ~5-10 minutes for complete test

1. Quick visual scan: 1 min
2. Theme toggle test: 1 min
3. Navigation test: 1 min
4. Demo tabs test: 2 min
5. Agent pipeline test: 3 min
6. Screenshot capture: 2 min

---

## 🆘 Common Issues & Fixes

### Issue: Fonts look like default Arial
**Cause:** Google Fonts not loading
**Check:** Open DevTools → Network tab → Look for fonts.googleapis.com requests
**Impact:** Visual only - page still works

### Issue: Theme toggle doesn't work
**Cause:** JavaScript error
**Check:** Open DevTools → Console tab → Look for red errors
**Impact:** Can't switch themes

### Issue: "Run Analysis" does nothing
**Cause:** JavaScript error
**Check:** Open DevTools → Console tab → Look for red errors
**Impact:** Demo not interactive

### Issue: Layout looks broken on mobile
**Cause:** Viewport or responsive CSS issue
**Check:** Try desktop view first
**Impact:** Mobile experience affected

---

## ✅ Success Criteria

The page is working correctly if:
- ✅ All sections visible and properly laid out
- ✅ Fonts load (Inter for body, JetBrains Mono for code)
- ✅ Theme toggle works (light ↔ dark)
- ✅ Navigation scrolls to sections
- ✅ Demo tabs switch content
- ✅ Agent pipeline animation runs
- ✅ No console errors
- ✅ Responsive on different screen sizes

---

**Ready to test? Open the file and go through the checklist!**
