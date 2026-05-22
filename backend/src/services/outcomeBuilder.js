import { loadKnowledge } from '../db/knowledge.js';
import { classifyBranch, extractSignalsFromAnswers, pickThreeToStart, buildComplianceFlags } from './branchEngine.js';

export function buildOutcome(session, answers, tradeoffPrefs = {}, adminNotes = '') {
  const signals = extractSignalsFromAnswers(answers);
  const { branch, rationale } = classifyBranch(signals);
  const threeToStart = pickThreeToStart(branch, signals, tradeoffPrefs);
  const complianceFlags = buildComplianceFlags(signals, threeToStart);
  const useCases = loadKnowledge('use-cases');
  const branches = loadKnowledge('branches');
  const branchName = branches.branches[branch]?.name || branch;

  const phase1Checklist = useCases.phase1Checklist;

  const snapshot = buildSnapshot(signals, answers);
  const notNow = buildNotNowList(branch, threeToStart);
  const connectorPlaybook = buildConnectorPlaybook(signals, answers);

  const markdown = renderMarkdown({
    snapshot,
    branch,
    branchName,
    rationale,
    threeToStart,
    phase1Checklist,
    complianceFlags,
    tradeoffPrefs,
    notNow,
    adminNotes,
    connectorPlaybook,
  });

  return {
    branch,
    branchRationale: rationale,
    threeToStart,
    phase1Checklist,
    complianceFlags,
    markdown,
    snapshot,
    notNow,
    signals,
    connectorPlaybook,
  };
}

function buildSnapshot(signals, answers) {
  const painAnswer = answers.find(
    (a) =>
      a.questionId === 'brenda-4' ||
      a.questionId === 'setup-5' ||
      (a.questionId && a.questionId.startsWith('wf_') && a.questionId.endsWith('-2'))
  );
  const pain = painAnswer?.rawAnswer || 'Operational efficiency and scaling without adding headcount.';
  return `B9 is a premium nationwide event staffing agency. Based on your answers, the primary pressure point is: ${pain.slice(0, 300)}${pain.length > 300 ? '…' : ''}`;
}

function buildConnectorPlaybook(signals, answers) {
  let connectors;
  try {
    connectors = loadKnowledge('connectors');
  } catch {
    return null;
  }

  const blob = answers.map((a) => a.rawAnswer || '').join(' ').toLowerCase();
  const matched = [];

  if (signals.integration_appetite || /whatsapp|sms|twilio|chatbot|whippy/.test(blob)) {
    matched.push(connectors.patterns.find((p) => p.id === 'talent-faq-channel'));
  }
  if (/no-show|standby|event day|blast/.test(blob)) {
    matched.push(connectors.patterns.find((p) => p.id === 'event-day-blast'));
  }
  if (signals.integration_appetite || /zapier|make|wire|webhook|integrat|automate/.test(blob)) {
    matched.push(connectors.patterns.find((p) => p.id === 'glue-automation'));
  }
  if (/recap|post-event|follow-up|client report/.test(blob)) {
    matched.push(connectors.patterns.find((p) => p.id === 'client-recap-delivery'));
  }

  const patterns = [...new Map(matched.filter(Boolean).map((p) => [p.id, p])).values()].slice(0, 3);
  if (!patterns.length && !signals.integration_appetite) return null;

  return {
    intro: connectors.intro,
    patterns: patterns.length ? patterns : [connectors.patterns.find((p) => p.id === 'glue-automation')],
    vendors: connectors.vendors,
    channels: signals.preferred_channels || [],
  };
}

function buildNotNowList(branch, threeToStart) {
  const useCases = loadKnowledge('use-cases');
  const picked = new Set(threeToStart.map((t) => t.useCaseId));
  const phase2 = useCases.useCases.filter((u) => u.phase === 2 && !picked.has(u.id));
  return phase2.slice(0, 4).map((u) => `${u.id}: ${u.name} — defer until Phase 1 metrics are in.`);
}

function renderMarkdown(data) {
  const lines = [
    '# B9 Transformation Snapshot',
    '',
    data.snapshot,
    '',
    `## Recommended path: ${data.branchName} (Branch ${data.branch})`,
    '',
    data.rationale,
    '',
    '## Start with these 3',
    '',
  ];

  data.threeToStart.forEach((item, i) => {
    lines.push(`### ${i + 1}. ${item.title} (${item.useCaseId})`);
    lines.push('');
    lines.push(item.why);
    lines.push('');
    lines.push(`- Effort: ${item.effort}`);
    lines.push(`- 90-day success: ${item.success90d}`);
    lines.push('');
  });

  lines.push('## 90-day checklist', '');
  for (const [key, block] of Object.entries(data.phase1Checklist)) {
    lines.push(`### ${block.label}`, '');
    block.items.forEach((item) => lines.push(`- ${item}`));
    lines.push('');
  }

  if (data.complianceFlags.length) {
    lines.push('## Compliance heads-up', '');
    data.complianceFlags.forEach((f) => {
      lines.push(`- **${f.title}:** ${f.message}`);
    });
    lines.push('');
  }

  if (data.notNow.length) {
    lines.push('## What we are NOT doing yet', '');
    data.notNow.forEach((n) => lines.push(`- ${n}`));
    lines.push('');
  }

  if (data.connectorPlaybook?.patterns?.length) {
    lines.push('## Wiring & channels (WhatsApp, SMS, glue)', '');
    lines.push(data.connectorPlaybook.intro, '');
    data.connectorPlaybook.patterns.forEach((p) => {
      lines.push(`### ${p.title}`, '', p.summary, '');
      p.levels.forEach((lv) => lines.push(`- **${lv.level} (${lv.label}):** ${lv.detail}`));
      if (p.gates?.length) {
        lines.push('', 'Gates: ' + p.gates.join('; '));
      }
      lines.push('');
    });
  }

  if (data.adminNotes) {
    lines.push('## Advisor notes', '', data.adminNotes, '');
  }

  lines.push('---', '*Generated by B9 Transformation Guide. Directional recommendations — not legal or financial advice.*');
  return lines.join('\n');
}

export { extractSignalsFromAnswers, classifyBranch, pickThreeToStart };
