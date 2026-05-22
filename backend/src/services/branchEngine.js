import { loadKnowledge } from '../db/knowledge.js';

function parseNumber(text) {
  if (!text) return null;
  const m = String(text).match(/(\d+(?:\.\d+)?)\s*%/);
  if (m) return parseFloat(m[1]);
  const n = String(text).match(/\b(\d{2,5})\b/);
  return n ? parseInt(n[1], 10) : null;
}

function parseAmbition(text) {
  const t = String(text || '').toLowerCase();
  if (t.includes('exit') || t.includes('sell')) return 'exit';
  if (t.includes('platform')) return 'platform';
  if (t.includes('growth') || t.includes('2-3') || t.includes('2x') || t.includes('3x')) return 'growth';
  if (t.includes('lifestyle') || t.includes('margin')) return 'lifestyle';
  return 'growth';
}

function parsePain(text) {
  const t = String(text || '').toLowerCase();
  if (t.includes('rfp') || t.includes('proposal') || t.includes('quote')) return 'rfp';
  if (t.includes('no-show') || t.includes('event day') || t.includes('event-day')) return 'ops';
  if (t.includes('retention') || t.includes('repeat') || t.includes('client')) return 'retention';
  if (t.includes('talent') || t.includes('1099') || t.includes('roster')) return 'talent';
  if (t.includes('cash') || t.includes('billing') || t.includes('invoice')) return 'finance';
  return 'ops';
}

function parseTolerance(text) {
  const t = String(text || '').toLowerCase();
  if (t.includes('off-limits') || t.includes('off limits') || t.includes('no')) return 'off-limits';
  if (t.includes('open')) return 'open';
  return 'cautious';
}

function parseIntegrationAppetite(text) {
  const t = String(text || '').toLowerCase();
  return /whatsapp|twilio|zapier|make\.com|automate|wire|integrat|webhook|whippy|sms|chatbot/.test(t);
}

function parsePreferredChannels(text) {
  const t = String(text || '').toLowerCase();
  const channels = [];
  if (/whatsapp/.test(t)) channels.push('whatsapp');
  if (/sms|text message|twilio/.test(t)) channels.push('sms');
  if (/email|gmail|outlook/.test(t)) channels.push('email');
  if (/staffconnect/.test(t)) channels.push('staffconnect');
  return channels;
}

export function extractSignalsFromAnswers(answers) {
  const signals = {
    rfp_pct: null,
    ambition: 'growth',
    retained_clients: null,
    talent_count: null,
    pain: 'ops',
    geography: '',
    talent_ai_tolerance: 'cautious',
    integration_appetite: false,
    preferred_channels: [],
  };

  for (const a of answers) {
    const qid = a.questionId || '';
    const raw = a.rawAnswer || '';
    if (qid === 'brenda-1') signals.rfp_pct = parseNumber(raw);
    if (qid === 'brenda-2') signals.ambition = parseAmbition(raw);
    if (qid === 'brenda-3') {
      const nums = raw.match(/\d+/g);
      if (nums && nums.length >= 2) {
        signals.retained_clients = parseInt(nums[0], 10);
        signals.talent_count = parseInt(nums[1], 10);
      } else if (nums && nums.length === 1) {
        signals.talent_count = parseInt(nums[0], 10);
      }
    }
    if (
      qid === 'brenda-4' ||
      qid === 'setup-5' ||
      qid === 'wf_event_day-2' ||
      qid === 'wf_proposal-2' ||
      qid === 'wf_discovery-2'
    ) {
      signals.pain = parsePain(raw) || signals.pain;
    }
    if (qid === 'brenda-5' || qid === 'wf_comms-4' || qid === 'wf_talent_sourcing-3') {
      signals.geography = signals.geography ? signals.geography + ' ' + raw : raw;
    }
    if (qid === 'brenda-7') signals.talent_ai_tolerance = parseTolerance(raw);
    if (qid === 'setup-9' || qid === 'wf_comms-2' || qid === 'wf_comms-1') {
      if (parseIntegrationAppetite(raw)) signals.integration_appetite = true;
      signals.preferred_channels = [
        ...new Set([...signals.preferred_channels, ...parsePreferredChannels(raw)]),
      ];
    }
  }

  return signals;
}

export function classifyBranch(signals) {
  const branches = loadKnowledge('branches');
  const { rfp_pct, ambition, retained_clients, talent_count, pain, talent_ai_tolerance } = signals;

  if (rfp_pct != null && rfp_pct >= 20 && ['growth', 'exit'].includes(ambition)) {
    return { branch: 'A', rationale: branches.branches.A.description };
  }
  if (talent_ai_tolerance === 'open' && talent_count != null && talent_count >= 500) {
    return { branch: 'D', rationale: branches.branches.D.description };
  }
  if (retained_clients != null && retained_clients >= 30 && ['retention', 'repeat'].includes(pain)) {
    return { branch: 'C', rationale: branches.branches.C.description };
  }
  return { branch: 'B', rationale: branches.branches.B.description };
}

export function pickThreeToStart(branch, signals, tradeoffPrefs = {}) {
  const useCases = loadKnowledge('use-cases');
  const branches = loadKnowledge('branches');
  const branchDef = branches.branches[branch];
  const sequence = branchDef?.phase2Sequence || [];

  const picks = [];
  const quickWin = useCases.useCases.find((u) => u.id === 'ROI-01') || useCases.useCases[0];
  picks.push(quickWin);

  const quote = useCases.useCases.find((u) => u.id === 'ROI-02');
  if (quote && picks.length < 3) picks.push(quote);

  for (const id of sequence) {
    if (picks.length >= 3) break;
    if (id === 'NEW-02' && signals.talent_ai_tolerance === 'off-limits') continue;
    if (tradeoffPrefs.T2 === 'A' && id === 'NEW-02') continue;
    const uc = useCases.useCases.find((u) => u.id === id);
    if (uc && !picks.find((p) => p.id === uc.id)) picks.push(uc);
  }

  while (picks.length < 3) {
    const fallback = useCases.useCases.find((u) => u.phase === 1 && !picks.find((p) => p.id === u.id));
    if (!fallback) break;
    picks.push(fallback);
  }

  return picks.slice(0, 3).map((u) => ({
    useCaseId: u.id,
    title: u.name,
    why: u.description,
    effort: `${u.effortWeeks || 1} weeks`,
    success90d: u.success90d,
  }));
}

export function buildComplianceFlags(signals, threeToStart) {
  const rules = loadKnowledge('compliance-rules');
  const flags = [];
  const geo = (signals.geography || '').toLowerCase();
  const ids = threeToStart.map((t) => t.useCaseId);

  for (const rule of rules.rules) {
    let hit = false;
    if (rule.trigger.includes('NYC') && geo.includes('nyc')) hit = true;
    if (rule.trigger.includes('Illinois') && (geo.includes('illinois') || geo.includes(' il'))) hit = true;
    if (rule.trigger.includes('California') && (geo.includes('california') || geo.includes(' ca'))) hit = true;
    if (rule.trigger.includes('talent_ai_tolerance') && signals.talent_ai_tolerance === 'open') hit = true;
    if (ids.some((id) => rule.useCaseIds.includes(id))) hit = true;
    if (hit) flags.push({ title: rule.title, message: rule.message });
  }

  if (flags.length === 0 && rules.generalCounselNote) {
    flags.push({ title: 'General counsel', message: rules.generalCounselNote });
  }

  return flags;
}
