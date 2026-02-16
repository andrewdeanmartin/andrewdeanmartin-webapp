/* ==========================================================================
   Andrew Dean Martin — Personal Brand Website
   Production JavaScript — All Interactivity
   ========================================================================== */

(function () {
  'use strict';

  // --------------------------------------------------------------------------
  //  Console Easter Egg
  // --------------------------------------------------------------------------
  console.log('%c Andrew Dean Martin', 'font-size: 20px; font-weight: bold; color: #4338ca;');
  console.log('%c AI Delivery Leader | Strategy + Engineering + Execution', 'font-size: 12px; color: #888;');
  console.log("%c View source? You get it. Let's talk: linkedin.com/in/andrewdeanmartin", 'font-size: 11px; color: #0d9488;');

  // --------------------------------------------------------------------------
  //  Utility Helpers
  // --------------------------------------------------------------------------

  function debounce(fn, wait) {
    var timer;
    return function () {
      var ctx = this, args = arguments;
      clearTimeout(timer);
      timer = setTimeout(function () { fn.apply(ctx, args); }, wait);
    };
  }

  function delay(ms) {
    return new Promise(function (resolve) { setTimeout(resolve, ms); });
  }

  function $(sel, parent) { return (parent || document).querySelector(sel); }
  function $$(sel, parent) { return Array.from((parent || document).querySelectorAll(sel)); }

  function escapeHtml(str) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

  // ======================================================================
  // 1. Theme Toggle
  // ======================================================================
  var themeToggle = $('#theme-toggle');
  var themeIcon = themeToggle ? $('.theme-toggle-icon', themeToggle) : null;

  function getPreferredTheme() {
    var stored = localStorage.getItem('theme');
    if (stored) return stored;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function applyTheme(theme) {
    if (theme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
    if (themeIcon) {
      themeIcon.textContent = theme === 'dark' ? '\u263E' : '\u2600'; // ☾ or ☀
    }
    if (themeToggle) {
      themeToggle.setAttribute('aria-label', 'Switch to ' + (theme === 'dark' ? 'light' : 'dark') + ' mode');
    }
  }

  applyTheme(getPreferredTheme());

  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      var current = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
      var next = current === 'dark' ? 'light' : 'dark';
      localStorage.setItem('theme', next);
      applyTheme(next);
    });
  }

  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function (e) {
    if (!localStorage.getItem('theme')) {
      applyTheme(e.matches ? 'dark' : 'light');
    }
  });

  // ======================================================================
  // 2. Navigation
  // ======================================================================
  var siteNav = $('.nav');
  var navHamburger = $('#nav-hamburger');
  var navLinksContainer = $('#nav-links');
  var navLinks = $$('.nav-links a');
  var sections = $$('section[id]');

  // Sticky scroll class
  var handleNavScroll = debounce(function () {
    if (!siteNav) return;
    siteNav.classList.toggle('scrolled', window.scrollY > 50);
  }, 10);

  window.addEventListener('scroll', handleNavScroll, { passive: true });
  handleNavScroll();

  // Mobile hamburger toggle
  if (navHamburger && navLinksContainer) {
    navHamburger.addEventListener('click', function () {
      var isOpen = navLinksContainer.classList.contains('open');
      navLinksContainer.classList.toggle('open');
      navHamburger.classList.toggle('open');
      navHamburger.setAttribute('aria-expanded', String(!isOpen));
      document.body.style.overflow = isOpen ? '' : 'hidden';
    });

    // Close mobile nav when link clicked
    navLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        navLinksContainer.classList.remove('open');
        navHamburger.classList.remove('open');
        navHamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  // Smooth scroll for anchor links (skip demo-panel links so :target works)
  document.addEventListener('click', function (e) {
    var link = e.target.closest('a[href^="#"]');
    if (!link) return;
    var targetId = link.getAttribute('href');
    if (targetId === '#') return;
    var target = document.querySelector(targetId);
    if (!target) return;
    if (target.classList.contains('demo-panel')) return; // let default navigate for tab switching
    e.preventDefault();
    var offset = siteNav ? siteNav.offsetHeight : 0;
    var top = target.getBoundingClientRect().top + window.pageYOffset - offset;
    window.scrollTo({ top: top, behavior: 'smooth' });
  });

  // Active nav link highlighting
  var highlightActive = debounce(function () {
    var scrollPos = window.scrollY + (siteNav ? siteNav.offsetHeight : 0) + 100;
    var currentId = '';
    sections.forEach(function (s) {
      if (s.offsetTop <= scrollPos) currentId = s.id;
    });
    navLinks.forEach(function (link) {
      link.classList.toggle('active', link.getAttribute('href') === '#' + currentId);
    });
  }, 15);

  window.addEventListener('scroll', highlightActive, { passive: true });
  highlightActive();

  // Escape to close mobile nav
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && navLinksContainer && navLinksContainer.classList.contains('open')) {
      navLinksContainer.classList.remove('open');
      if (navHamburger) {
        navHamburger.classList.remove('open');
        navHamburger.setAttribute('aria-expanded', 'false');
        navHamburger.focus();
      }
      document.body.style.overflow = '';
    }
  });

  // ======================================================================
  // 3. GSAP: Hero Entrance + Scroll Reveal + Scroll Progress
  // ======================================================================
  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function showAllContentFallback() {
    var heroContent = $('.hero-content');
    if (heroContent) {
      heroContent.querySelectorAll('.hero-badge, .hero-name, .hero-tagline, .hero-description, .hero-ctas').forEach(function (el) {
        el.style.opacity = '1';
        el.style.transform = 'none';
      });
    }
    $$('.section-header, .superpower-card, .impact-card, .about-stat, .timeline-item, .walkthrough-step').forEach(function (el) {
      el.classList.add('reveal', 'active');
    });
  }

  try {
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined' && !prefersReducedMotion) {
      gsap.registerPlugin(ScrollTrigger);

    // Hero entrance — staggered fade-up, total < 1s
    var heroContent = $('.hero-content');
    if (heroContent) {
      var heroChildren = heroContent.querySelectorAll('.hero-badge, .hero-name, .hero-tagline, .hero-description, .hero-ctas');
      gsap.fromTo(heroChildren, { opacity: 0, y: 24 }, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.08,
        ease: 'power2.out'
      });
    }

    // Section reveal — section headers, about stats, timeline, assessment cards
    // Only animate elements that are visible (skip walkthrough steps in hidden demo panels)
    var revealSelectors = [
      '.section-header', '.about-stat', '.timeline-item', '.walkthrough-step'
    ];
    revealSelectors.forEach(function (sel) {
      $$(sel).forEach(function (el) {
        if (el.offsetParent === null) return; // Skip hidden (display:none) elements
        el.classList.add('reveal');
        gsap.fromTo(el, { opacity: 0, y: 20 }, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' }
        });
      });
    });

    // Stagger for superpower and impact cards
    var superpowerCards = $$('.superpower-card');
    if (superpowerCards.length > 0) {
      gsap.fromTo(superpowerCards, { opacity: 0, y: 20 }, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.08,
        ease: 'power2.out',
        scrollTrigger: { trigger: '.superpower-grid', start: 'top 85%', toggleActions: 'play none none none' }
      });
    }
    var impactCards = $$('.impact-card');
    if (impactCards.length > 0) {
      gsap.fromTo(impactCards, { opacity: 0, y: 20 }, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.08,
        ease: 'power2.out',
        scrollTrigger: { trigger: '.impact-grid', start: 'top 85%', toggleActions: 'play none none none' }
      });
    }

    // Scroll progress bar — width = % of page scrolled
    var scrollProgress = $('#scroll-progress');
    if (scrollProgress) {
      ScrollTrigger.create({
        trigger: document.documentElement,
        start: 'top top',
        end: 'bottom bottom',
        onUpdate: function (self) {
          scrollProgress.style.width = (self.progress * 100) + '%';
        }
      });
    }
    } else {
      showAllContentFallback();
    }
  } catch (err) {
    showAllContentFallback();
  }

  // ======================================================================
  // 4. Demo Tabs — JS-driven switching; sync ARIA and reveal on hashchange
  // ======================================================================
  var demoPanels = $$('.demo-panel');
  var demoTabs = $$('.demo-tab');

  function syncDemoTabFromHash() {
    var hash = window.location.hash.slice(1);
    // Dynamically detect valid panel IDs from the DOM
    var validPanelIds = demoPanels.map(function (p) { return p.id; });
    var targetId = (hash && validPanelIds.indexOf(hash) !== -1) ? hash : 'demo-pipeline';
    // Remove active from all panels first
    demoPanels.forEach(function (panel) {
      panel.classList.remove('active');
    });
    demoTabs.forEach(function (tab) {
      var controls = tab.getAttribute('aria-controls') || tab.getAttribute('href').slice(1);
      var isActive = controls === targetId;
      tab.classList.toggle('active', isActive);
      tab.setAttribute('aria-selected', String(isActive));
    });
    var activePanel = $('#' + targetId);
    if (activePanel) {
      activePanel.classList.add('active');
      activePanel.querySelectorAll('.reveal').forEach(function (el) {
        el.classList.add('active');
      });
    }
  }

  // Handle demo tab clicks — JS-driven switching for 5+ tabs
  demoTabs.forEach(function (tab) {
    tab.addEventListener('click', function (e) {
      e.preventDefault();
      var targetId = tab.getAttribute('href').slice(1);
      history.replaceState(null, '', '#' + targetId);
      syncDemoTabFromHash();
    });
  });

  window.addEventListener('hashchange', syncDemoTabFromHash);
  syncDemoTabFromHash();

  // ======================================================================
  // DEMO 1: Agent Pipeline Visualizer
  // ======================================================================
  var humanCheckpoint = {
    context: 'Item #447 outside standard categories: 3 dependencies, 2 workflow paths.',
    question: 'How should this edge case be handled?',
    options: [
      { id: 'approve', label: 'Create Custom Path', desc: 'Define a new category and routing rule for this item type' },
      { id: 'modify', label: 'Merge Into Existing', desc: 'Map to the closest match with manual override flag' },
      { id: 'escalate', label: 'Escalate for Review', desc: 'Flag for stakeholder input before proceeding' }
    ]
  };

  var pipelineRunning = false;
  var pipelineCancelled = false;
  var runBtn = $('#pipeline-run-btn');
  var resetBtn = $('#pipeline-reset-btn');
  var auditTrailLog = $('#audit-trail-log');
  var pipelineRunResult = $('#pipeline-run-result');
  var humanCheckpointEl = $('#human-checkpoint');

  var auditLines = [
    '[18:00:00] Pipeline initiated: Workflow Analysis | 847 items | 2 sources',
    '[18:00:15] Agent: Source Analyzer | Status: Complete | Items: 847 | Sources: 2 | Quality Issues: 28%',
    '[18:01:42] Agent: Recommendation Engine | Status: Complete | Auto-categorized: 612 | Human Review: 3 edge cases',
    '[18:01:45] PIPELINE PAUSED: Human decision required (confidence < threshold): Item #447',
    '[18:02:30] HUMAN DECISION: Create Custom Path. Pipeline resuming...',
    '[18:03:15] Agent: Risk & Compliance | Status: Complete | Sensitive Items: 14 | Checklist: 47 | Risk: MEDIUM-HIGH',
    '[18:04:42] Agent: Validation Generator | Status: Complete | Rules: 202 | Effort: 48 hrs',
    '[18:05:55] Agent: Documentation Synthesizer | Status: Complete | Follow-ups: 3 | Effort: 120 hrs',
    '[18:05:58] Pipeline complete: All 5 agents finished. 1 human decision recorded.'
  ];

  function appendAudit(text) {
    if (!auditTrailLog) return;
    var line = document.createElement('div');
    line.className = 'audit-trail-line';
    line.textContent = text;
    auditTrailLog.appendChild(line);
    auditTrailLog.scrollTop = auditTrailLog.scrollHeight;
  }

  function showHumanCheckpoint() {
    if (!humanCheckpointEl) return;
    var ctx = $('#checkpoint-context');
    var q = $('#checkpoint-question');
    var decisionsEl = $('#checkpoint-decisions');
    if (ctx) ctx.textContent = humanCheckpoint.context;
    if (q) q.textContent = humanCheckpoint.question;
    if (decisionsEl) {
      decisionsEl.innerHTML = '';
      humanCheckpoint.options.forEach(function (opt) {
        var btn = document.createElement('button');
        btn.className = 'btn btn-sm';
        btn.setAttribute('data-decision', opt.id);
        btn.style.cssText = 'flex-direction:column;align-items:flex-start;padding:0.75rem 1rem;background:var(--color-bg-secondary);border:1px solid var(--color-border);border-radius:var(--radius-md);';
        btn.innerHTML = '<strong>' + escapeHtml(opt.label) + '</strong><span style="font-size:0.8125rem;color:var(--color-text-muted);font-weight:400;display:block;margin-top:0.25rem;">' + escapeHtml(opt.desc) + '</span>';
        decisionsEl.appendChild(btn);
      });
    }
    humanCheckpointEl.style.display = '';
  }

  var cancelHumanDecision = null;

  function waitForHumanDecision() {
    return new Promise(function (resolve) {
      var decisionsEl = $('#checkpoint-decisions');
      if (!decisionsEl) { resolve('approve'); return; }
      // Allow cancellation from resetPipeline
      cancelHumanDecision = function () { resolve('cancelled'); };
      function handleClick(e) {
        var btn = e.target.closest('[data-decision]');
        if (!btn) return;
        var decision = btn.getAttribute('data-decision');
        var label = btn.querySelector('strong');
        var labelText = label ? label.textContent : decision;
        $$('[data-decision]', decisionsEl).forEach(function (b) { b.disabled = true; b.style.opacity = '0.5'; });
        btn.style.opacity = '1';
        btn.style.borderColor = 'var(--color-warm)';
        appendAudit('[18:02:30] HUMAN DECISION: ' + labelText + '. Pipeline resuming...');
        decisionsEl.removeEventListener('click', handleClick);
        cancelHumanDecision = null;
        setTimeout(function () {
          if (humanCheckpointEl) humanCheckpointEl.style.display = 'none';
          resolve(decision);
        }, 800);
      }
      decisionsEl.addEventListener('click', handleClick);
    });
  }

  function showPipelineSummary() {
    if (pipelineRunResult) pipelineRunResult.style.display = 'block';
  }

  function resetPipeline() {
    pipelineCancelled = true;
    pipelineRunning = false;
    if (cancelHumanDecision) { cancelHumanDecision(); cancelHumanDecision = null; }
    if (auditTrailLog) auditTrailLog.innerHTML = '';
    if (humanCheckpointEl) { humanCheckpointEl.style.display = 'none'; var d = $('#checkpoint-decisions'); if (d) d.innerHTML = ''; }
    if (pipelineRunResult) pipelineRunResult.style.display = 'none';
    if (resetBtn) resetBtn.style.display = 'none';
    if (runBtn) { runBtn.style.display = ''; runBtn.disabled = false; runBtn.textContent = 'Play Replay'; }
  }

  async function runPipeline() {
    if (pipelineRunning) return;
    pipelineRunning = true;
    pipelineCancelled = false;
    if (runBtn) { runBtn.disabled = true; runBtn.textContent = 'Playing...'; }

    try {
      for (var i = 0; i < auditLines.length; i++) {
        if (pipelineCancelled) return;
        if (i === 3) {
          appendAudit(auditLines[i]);
          showHumanCheckpoint();
          await waitForHumanDecision();
          if (pipelineCancelled) return;
          appendAudit(auditLines[4]);
          i = 4;
        } else {
          appendAudit(auditLines[i]);
        }
        await delay(800);
      }

      if (pipelineCancelled) return;
      showPipelineSummary();
      if (runBtn) runBtn.style.display = 'none';
      if (resetBtn) resetBtn.style.display = '';
    } finally {
      pipelineRunning = false;
    }
  }

  if (runBtn) runBtn.addEventListener('click', function () { runPipeline(); });
  if (resetBtn) { resetBtn.addEventListener('click', resetPipeline); resetBtn.style.display = 'none'; }

  // DEMO 2: SharpPrompt — handled by prompt-demo.js
  // DEMO 3: Codebase Assessment — static walkthrough, no JS required
  // DEMO 4: Reliability Paradox — handled by reliability-calc.js
})();
