# Portfolio Visual Testing Checklist

## How to Test

1. **Open the file directly in your browser:**
   - Navigate to: `file:///Users/andrewmartin/andrew-martin-portfolio/site/index.html`
   - OR double-click `index.html` in Finder
   - OR drag `index.html` into your browser window

## ✅ Visual Inspection Checklist

### 1. Hero Section (Top of Page)
- [ ] **Layout**: Hero content is centered and properly spaced
- [ ] **Typography**: 
  - Name "Andrew Dean Martin" is large and prominent
  - Tagline "Turning AI Ambition into Shipped Products" is visible
  - "Shipped Products" text has accent color (teal/green)
- [ ] **Fonts**: Inter font is loading (should look clean and modern, not system default)
- [ ] **Buttons**: Two CTA buttons visible ("See It In Action" and "Connect")
- [ ] **Colors**: Light theme by default (off-white background #faf9f7)

### 2. Navigation Bar
- [ ] **Logo**: "ADM" logo visible in top left
- [ ] **Links**: Six navigation links visible (About, What I Do, Demos, Impact, Journey, Connect)
- [ ] **Theme Toggle**: Sun icon (☀) visible in top right
- [ ] **Sticky Behavior**: Scroll down - nav should stick to top and get subtle background
- [ ] **Mobile**: Hamburger menu icon visible on mobile/narrow windows

### 3. About Section
- [ ] **Section Label**: "About" label visible above title
- [ ] **Title**: "The Short Version" heading
- [ ] **Layout**: Two-column layout (text on left, stats on right)
- [ ] **Stats Cards**: Three stat cards showing:
  - 15+ Years in Technology
  - 10+ Production Prototypes Shipped
  - 4 Territories Launched in 6 Months
- [ ] **Typography**: Body text is readable, proper line height

### 4. Capabilities / What Sets Me Apart Section
- [ ] **Section Label**: "What Sets Me Apart" visible
- [ ] **Title**: "How I Work" heading
- [ ] **Cards**: Four capability cards with icons
- [ ] **Featured Card**: First card should be full-width (Strategy + Engineering)
- [ ] **Icons**: SVG icons visible in each card
- [ ] **Hover Effect**: Cards should have subtle hover effect (shadow/lift)

### 5. Demo Section - Agent Pipeline Tab
- [ ] **Section Label**: "See It In Action" visible
- [ ] **Title**: "Interactive Demos" heading
- [ ] **Tab Navigation**: Three tabs visible:
  - Agent Pipeline (should be active/highlighted)
  - Prompt Engineering
  - Codebase Assessment
- [ ] **Scenario Card**: "NovaPharma" migration scenario visible with stats
- [ ] **Run Analysis Button**: Blue "Run Analysis" button visible
- [ ] **Pipeline Steps**: Five agent cards visible:
  1. Source Analyzer
  2. Mapping Recommender
  3. Risk & Compliance Assessor
  4. Test Generator
  5. Documentation Synthesizer
- [ ] **Status Indicators**: Each card shows "Waiting" status
- [ ] **Audit Trail**: Empty audit trail section at bottom

#### Test: Click "Run Analysis"
- [ ] **Animation**: Pipeline steps should animate sequentially
- [ ] **Status Changes**: Each agent status should change from "Waiting" → "Running" → "Complete"
- [ ] **Output**: Each agent should show output text when complete
- [ ] **Human Checkpoint**: A human decision checkpoint should appear after agent 2
- [ ] **Audit Trail**: Entries should appear in the audit trail log
- [ ] **Reset Button**: "Reset Pipeline" button should appear after completion

### 6. Demo Section - Other Tabs
#### Test: Click "Prompt Engineering" Tab
- [ ] **Tab Switch**: Tab becomes active/highlighted
- [ ] **Content**: SharpPrompt demo content appears
- [ ] **Category Buttons**: Five category buttons visible
- [ ] **Input Area**: Textarea for input visible
- [ ] **Transform Button**: "Transform" button visible
- [ ] **Output Area**: Placeholder text visible on right side

#### Test: Click "Codebase Assessment" Tab
- [ ] **Tab Switch**: Tab becomes active/highlighted
- [ ] **Content**: Assessment grid visible
- [ ] **Cards**: Eight workstream cards in grid:
  - Architecture
  - Code Quality
  - Security
  - Dependencies
  - Testing
  - Performance
  - Technical Debt
  - Documentation
- [ ] **Icons**: Each card has an icon
- [ ] **Executive Summary**: Summary section at bottom with metrics

### 7. Impact Section
- [ ] **Section Label**: "Impact" visible
- [ ] **Title**: "Results That Speak" heading
- [ ] **Grid Layout**: Six impact cards in grid
- [ ] **Metrics**: Each card shows a metric (e.g., "Weeks → Hours", "90%", "4 Territories")
- [ ] **Typography**: Metrics are large and prominent
- [ ] **Hover Effect**: Cards should have subtle hover effect

### 8. Journey Section
- [ ] **Section Label**: "Journey" visible
- [ ] **Title**: "How I Got Here" heading
- [ ] **Timeline**: Vertical timeline with dots and connecting line
- [ ] **Timeline Items**: Eight timeline entries from 2002 to "Now"
- [ ] **Current Item**: "Now" entry should be visually distinct (highlighted)
- [ ] **Dates**: Years visible on left of each entry
- [ ] **Content**: Title and description for each entry

### 9. Contact Section
- [ ] **Section Label**: "Connect" visible
- [ ] **Title**: "Let's Compare Notes" heading
- [ ] **Description Text**: Paragraph about connecting
- [ ] **Buttons**: Two buttons visible:
  - LinkedIn (with LinkedIn icon)
  - Email (with email icon)
- [ ] **Icons**: SVG icons visible in buttons

### 10. Footer
- [ ] **Copyright**: "© 2026 Andrew Dean Martin" visible
- [ ] **Disclaimer**: PwC disclaimer text visible
- [ ] **Tagline**: "Built with intention. No frameworks. No templates." visible
- [ ] **Styling**: Footer has distinct background color
- [ ] **Spacing**: Proper padding and spacing

## 🎨 Theme Toggle Testing

### Test: Click Theme Toggle Button
- [ ] **Icon Change**: Sun (☀) should change to Moon (☾)
- [ ] **Background**: Page background should change from light (#faf9f7) to dark (#0f0f10)
- [ ] **Text Color**: Text should change from dark to light
- [ ] **Cards**: All cards should update to dark theme
- [ ] **Borders**: Border colors should update
- [ ] **Smooth Transition**: Color changes should be smooth (not jarring)

### Test: Click Theme Toggle Again
- [ ] **Icon Change**: Moon (☾) should change back to Sun (☀)
- [ ] **Revert**: All colors should revert to light theme
- [ ] **Persistence**: Refresh page - theme preference should persist (stored in localStorage)

## 🖱️ Interaction Testing

### Navigation
- [ ] **Smooth Scroll**: Clicking nav links should smooth scroll to sections
- [ ] **Active State**: Nav links should highlight when their section is in view
- [ ] **Anchor Links**: Hero CTA buttons should scroll to correct sections

### Demo Interactions
- [ ] **Tab Switching**: All three demo tabs should switch content correctly
- [ ] **Pipeline Run**: "Run Analysis" button triggers animation
- [ ] **Pipeline Reset**: "Reset Pipeline" button resets all states
- [ ] **Assessment Cards**: Clicking assessment cards should show details
- [ ] **Prompt Categories**: Clicking category buttons should populate input

### Mobile Menu (if testing on mobile/narrow window)
- [ ] **Hamburger Click**: Opens mobile menu
- [ ] **Menu Overlay**: Menu slides in from side
- [ ] **Close**: Clicking hamburger again or link closes menu
- [ ] **Links**: All nav links work in mobile menu

## 🐛 Common Issues to Check

### Font Loading Issues
- [ ] **Check**: If fonts look like default system fonts (Arial/Helvetica), Google Fonts may not be loading
- [ ] **Fix**: Check browser console for font loading errors
- [ ] **Expected**: Inter for body text, JetBrains Mono for code/monospace elements

### Layout Issues
- [ ] **Overlapping Elements**: No text or elements overlapping
- [ ] **Alignment**: Cards and sections properly aligned
- [ ] **Spacing**: Consistent spacing between sections
- [ ] **Responsive**: Test at different window sizes (desktop, tablet, mobile)

### Color Issues
- [ ] **Contrast**: Text is readable against backgrounds
- [ ] **Accent Colors**: Primary blue (#4338ca) and teal (#0d9488) visible
- [ ] **Borders**: Subtle borders visible on cards

### JavaScript Issues
- [ ] **Console Errors**: Open browser console (F12) - check for JavaScript errors
- [ ] **Easter Egg**: Console should show styled welcome message
- [ ] **Interactions**: All buttons and tabs should respond to clicks

## 📱 Responsive Testing

### Desktop (1920px+)
- [ ] **Layout**: Multi-column layouts visible
- [ ] **Spacing**: Generous spacing and padding
- [ ] **Nav**: Full navigation visible

### Tablet (768px - 1024px)
- [ ] **Layout**: Grids adjust to 2 columns
- [ ] **Readable**: Text remains readable
- [ ] **Nav**: May show hamburger menu

### Mobile (< 768px)
- [ ] **Layout**: Single column layout
- [ ] **Touch Targets**: Buttons are large enough to tap
- [ ] **Nav**: Hamburger menu visible
- [ ] **Text**: Font sizes scale appropriately

## 🎯 Priority Issues to Report

If you find any of these, report immediately:
1. **Fonts not loading** (page looks like default Arial/Helvetica)
2. **Theme toggle doesn't work**
3. **Demo tabs don't switch**
4. **Pipeline "Run Analysis" button doesn't work**
5. **Layout is broken** (overlapping elements, misaligned sections)
6. **Navigation doesn't scroll to sections**
7. **JavaScript errors in console**
8. **Missing sections** (any of the 7 main sections not visible)

## 📸 Screenshots to Take

Please take screenshots of:
1. Hero section (top of page) - light theme
2. About section with stats
3. Capabilities cards
4. Demo section - Agent Pipeline tab (before and after clicking "Run Analysis")
5. Impact section grid
6. Journey timeline
7. Contact and footer
8. Full page in dark theme (after clicking theme toggle)
9. Any visual issues or broken layouts you find

## ✅ Expected Behavior Summary

**Overall Look:**
- Clean, modern, professional design
- Light theme by default (off-white background)
- Inter font for body text, JetBrains Mono for code elements
- Smooth animations and transitions
- Responsive layout that works on all screen sizes

**Color Scheme (Light Theme):**
- Background: #faf9f7 (warm off-white)
- Text: #1a1a1a (near black)
- Primary: #4338ca (indigo blue)
- Accent: #0d9488 (teal)
- Borders: #e2e0dd (subtle gray)

**Interactivity:**
- Theme toggle works smoothly
- Demo tabs switch content
- Pipeline animation runs sequentially
- Nav links smooth scroll to sections
- Hover effects on cards and buttons

---

## 🚀 How to Open the Page

**Option 1: Direct File URL**
```
file:///Users/andrewmartin/andrew-martin-portfolio/site/index.html
```

**Option 2: Finder**
1. Open Finder
2. Navigate to `/Users/andrewmartin/andrew-martin-portfolio/site/`
3. Double-click `index.html`

**Option 3: Drag and Drop**
1. Open Finder to the `site` folder
2. Drag `index.html` into your browser window

---

**Note:** Some features (like external font loading) work better when served over HTTP. If you encounter issues with fonts or other resources, you may need to run a local web server.
