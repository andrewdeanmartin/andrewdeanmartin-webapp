/* ==========================================================================
   Reliability Paradox Calculator
   Interactive demo: add agents, watch reliability degrade, toggle mitigations
   ========================================================================== */
(function () {
  'use strict';

  // --------------------------------------------------------------------------
  //  Agent Data (from Implementation Brief)
  // --------------------------------------------------------------------------
  var AGENT_NAMES = [
    'Data Ingestion Agent',
    'Classification Agent',
    'Enrichment Agent',
    'Validation Agent',
    'Routing Agent',
    'Compliance Agent',
    'Summarization Agent',
    'Quality Check Agent',
    'Delivery Agent',
    'Monitoring Agent'
  ];

  var AGENT_COSTS = [5, 5, 8, 8, 12, 12, 15, 15, 20, 20]; // $/run
  var AGENT_LATENCIES = [2, 3, 2.5, 4, 3, 3.5, 2, 4, 3, 5]; // seconds
  var MAX_AGENTS = 10;
  var DAILY_RUNS = 10000;

  // --------------------------------------------------------------------------
  //  State
  // --------------------------------------------------------------------------
  var state = {
    agentCount: 1,
    perAgentReliability: 0.95,
    mitigationsOn: false
  };

  // --------------------------------------------------------------------------
  //  DOM References
  // --------------------------------------------------------------------------
  var slider, sliderValueEl, agentChainEl, addBtn, resetBtn;
  var metricReliabilityEl, metricCostEl, metricLatencyEl, metricFailuresEl, metricMonthlyEl;
  var metricReliabilityCard, metricCostCard, metricLatencyCard, metricFailuresCard, metricMonthlyCard;
  var warningEl, mitigationToggle, mitigationDetails;

  function $(sel, parent) {
    return (parent || document).querySelector(sel);
  }

  // --------------------------------------------------------------------------
  //  Calculation Logic
  // --------------------------------------------------------------------------
  function calcMetrics() {
    var p = state.perAgentReliability;
    var n = state.agentCount;

    // Base metrics
    var reliability = Math.pow(p, n);
    var totalCost = 0;
    var totalLatency = 0;
    for (var i = 0; i < n; i++) {
      totalCost += AGENT_COSTS[i];
      totalLatency += AGENT_LATENCIES[i];
    }
    var dailyFailures = Math.round(DAILY_RUNS * (1 - reliability));
    var monthlyCost = totalCost * DAILY_RUNS * 30;

    // Mitigated metrics
    if (state.mitigationsOn) {
      // Circuit breakers: retry once — effective reliability improves
      reliability = 1 - Math.pow(1 - reliability, 2);
      // Single-agent fallback: floor at 90%
      reliability = Math.max(reliability, 0.90);
      // Caching: reduce cost by 40%
      totalCost = totalCost * 0.6;
      // Parallel execution: reduce latency by 35%
      totalLatency = totalLatency * 0.65;
      // Recalculate derived
      dailyFailures = Math.round(DAILY_RUNS * (1 - reliability));
      monthlyCost = totalCost * DAILY_RUNS * 30;
    }

    return {
      reliability: reliability,
      totalCost: totalCost,
      totalLatency: totalLatency,
      dailyFailures: dailyFailures,
      monthlyCost: monthlyCost
    };
  }

  // --------------------------------------------------------------------------
  //  Formatting Helpers
  // --------------------------------------------------------------------------
  function formatPercent(val) {
    return (val * 100).toFixed(1) + '%';
  }

  function formatCurrency(val) {
    if (val >= 1000000) {
      return '$' + (val / 1000000).toFixed(1) + 'M';
    }
    if (val >= 1000) {
      return '$' + Math.round(val).toLocaleString('en-US');
    }
    return '$' + val.toFixed(0);
  }

  function formatNumber(val) {
    return Math.round(val).toLocaleString('en-US');
  }

  function formatLatency(val) {
    return val.toFixed(1) + 's';
  }

  // --------------------------------------------------------------------------
  //  Render Agent Chain
  // --------------------------------------------------------------------------
  function renderAgentChain() {
    if (!agentChainEl) return;
    agentChainEl.innerHTML = '';
    for (var i = 0; i < state.agentCount; i++) {
      // Arrow between agents
      if (i > 0) {
        var arrow = document.createElement('span');
        arrow.className = 'reliability-agent-arrow';
        arrow.setAttribute('aria-hidden', 'true');
        arrow.textContent = '\u2192'; // →
        agentChainEl.appendChild(arrow);
      }
      var card = document.createElement('div');
      card.className = 'reliability-agent-card';
      card.setAttribute('role', 'listitem');
      card.innerHTML =
        '<span class="agent-number">Agent ' + (i + 1) + '</span>' +
        '<span class="agent-name">' + escapeHtml(AGENT_NAMES[i]) + '</span>' +
        '<span class="agent-stats">$' + AGENT_COSTS[i] + ' · ' + AGENT_LATENCIES[i] + 's</span>';
      agentChainEl.appendChild(card);
    }

    // Scroll to end to show newest agent
    agentChainEl.scrollLeft = agentChainEl.scrollWidth;

    // Update add button state
    if (addBtn) {
      addBtn.disabled = state.agentCount >= MAX_AGENTS;
      if (state.agentCount >= MAX_AGENTS) {
        addBtn.textContent = 'Max 10 Agents';
      } else {
        addBtn.textContent = '+ Add Agent';
      }
    }
  }

  // --------------------------------------------------------------------------
  //  Render Dashboard Metrics
  // --------------------------------------------------------------------------
  function renderDashboard() {
    var m = calcMetrics();

    // Values
    if (metricReliabilityEl) metricReliabilityEl.textContent = formatPercent(m.reliability);
    if (metricCostEl) metricCostEl.textContent = '$' + m.totalCost.toFixed(0);
    if (metricLatencyEl) metricLatencyEl.textContent = formatLatency(m.totalLatency);
    if (metricFailuresEl) metricFailuresEl.textContent = formatNumber(m.dailyFailures);
    if (metricMonthlyEl) metricMonthlyEl.textContent = formatCurrency(m.monthlyCost);

    // Warning thresholds & styling
    var reliabilityPct = m.reliability * 100;
    var n = state.agentCount;

    // Reset all metric card classes
    [metricReliabilityCard, metricCostCard, metricLatencyCard, metricFailuresCard, metricMonthlyCard].forEach(function (card) {
      if (card) card.className = 'reliability-metric';
    });

    if (state.mitigationsOn) {
      // Improved state
      [metricReliabilityCard, metricCostCard, metricLatencyCard, metricFailuresCard, metricMonthlyCard].forEach(function (card) {
        if (card) card.classList.add('improved');
      });
    } else {
      // Warning states based on agent count
      if (reliabilityPct < 80) {
        if (metricReliabilityCard) metricReliabilityCard.classList.add('danger');
      } else if (reliabilityPct < 90) {
        if (metricReliabilityCard) metricReliabilityCard.classList.add('warning');
      }

      if (m.dailyFailures > 2000) {
        if (metricFailuresCard) metricFailuresCard.classList.add('danger');
      } else if (m.dailyFailures > 500) {
        if (metricFailuresCard) metricFailuresCard.classList.add('warning');
      }

      if (m.monthlyCost > 3000000) {
        if (metricMonthlyCard) metricMonthlyCard.classList.add('danger');
      } else if (m.monthlyCost > 1500000) {
        if (metricMonthlyCard) metricMonthlyCard.classList.add('warning');
      }
    }

    // Warning messages
    renderWarnings(m, n);
  }

  // --------------------------------------------------------------------------
  //  Warning Messages
  // --------------------------------------------------------------------------
  function renderWarnings(m, n) {
    if (!warningEl) return;
    var warnings = [];

    if (!state.mitigationsOn) {
      if (n >= 3 && m.reliability < 0.90) {
        warnings.push('Reliability below 90%. At enterprise scale, this means unpredictable failures across the pipeline.');
      }
      if (n >= 5) {
        warnings.push('At 10,000 daily requests, <strong>' + formatNumber(m.dailyFailures) + ' fail per day</strong>. That\u2019s ' + formatNumber(m.dailyFailures * 30) + ' failed requests per month.');
      }
      if (n >= 7) {
        warnings.push('Monthly cost exceeds <strong>' + formatCurrency(m.monthlyCost) + '</strong> at scale. Production mitigations can reduce this significantly.');
      }
    }

    if (warnings.length > 0) {
      warningEl.innerHTML = warnings.join('<br>');
      warningEl.style.display = 'block';
    } else {
      warningEl.innerHTML = '';
      warningEl.style.display = 'none';
    }
  }

  // --------------------------------------------------------------------------
  //  Escape HTML (prevent XSS)
  // --------------------------------------------------------------------------
  function escapeHtml(str) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

  // --------------------------------------------------------------------------
  //  Event Handlers
  // --------------------------------------------------------------------------
  function onSliderChange() {
    state.perAgentReliability = parseInt(slider.value, 10) / 100;
    if (sliderValueEl) sliderValueEl.textContent = slider.value + '%';
    renderDashboard();
  }

  function onAddAgent() {
    if (state.agentCount >= MAX_AGENTS) return;
    state.agentCount++;
    renderAgentChain();
    renderDashboard();
  }

  function onReset() {
    state.agentCount = 1;
    state.perAgentReliability = 0.95;
    state.mitigationsOn = false;

    if (slider) {
      slider.value = 95;
    }
    if (sliderValueEl) sliderValueEl.textContent = '95%';
    if (mitigationToggle) mitigationToggle.checked = false;
    if (mitigationDetails) mitigationDetails.style.display = 'none';

    renderAgentChain();
    renderDashboard();
  }

  function onMitigationToggle() {
    state.mitigationsOn = mitigationToggle.checked;
    if (mitigationDetails) {
      mitigationDetails.style.display = state.mitigationsOn ? '' : 'none';
    }
    renderDashboard();
  }

  // --------------------------------------------------------------------------
  //  Init
  // --------------------------------------------------------------------------
  function init() {
    var panel = document.getElementById('demo-reliability');
    if (!panel) return;

    slider = document.getElementById('reliability-slider');
    sliderValueEl = document.getElementById('reliability-slider-value');
    agentChainEl = document.getElementById('reliability-agent-chain');
    addBtn = document.getElementById('reliability-add-btn');
    resetBtn = document.getElementById('reliability-reset-btn');
    warningEl = document.getElementById('reliability-warning');
    mitigationToggle = document.getElementById('reliability-mitigation-toggle');
    mitigationDetails = document.getElementById('reliability-mitigation-details');

    metricReliabilityEl = document.getElementById('metric-reliability-value');
    metricCostEl = document.getElementById('metric-cost-value');
    metricLatencyEl = document.getElementById('metric-latency-value');
    metricFailuresEl = document.getElementById('metric-failures-value');
    metricMonthlyEl = document.getElementById('metric-monthly-value');

    metricReliabilityCard = document.getElementById('metric-reliability');
    metricCostCard = document.getElementById('metric-cost');
    metricLatencyCard = document.getElementById('metric-latency');
    metricFailuresCard = document.getElementById('metric-failures');
    metricMonthlyCard = document.getElementById('metric-monthly');

    // Wire events
    if (slider) {
      slider.addEventListener('input', onSliderChange);
    }
    if (addBtn) {
      addBtn.addEventListener('click', onAddAgent);
    }
    if (resetBtn) {
      resetBtn.addEventListener('click', onReset);
    }
    if (mitigationToggle) {
      mitigationToggle.addEventListener('change', onMitigationToggle);
    }

    // Initial render
    renderAgentChain();
    renderDashboard();
  }

  // --------------------------------------------------------------------------
  //  Bootstrap
  // --------------------------------------------------------------------------
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
