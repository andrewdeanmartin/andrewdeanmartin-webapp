import { jsonStore, useJsonStore } from '../db/jsonStore.js';

export async function buildFacilitationPack() {
  const workspace = await jsonStore.getWorkspace();
  const stackProfile = await jsonStore.getStackProfile();
  const latest = await jsonStore.getLatestOutcome();
  const sessions = await jsonStore.listSessions();

  const lines = [
    '# B9 Transformation — Facilitation Pack',
    '',
    '_Generated ' + new Date().toISOString().slice(0, 10) + ' · Private client materials_',
    '',
    '## Purpose',
    '',
    'Pre-integrator discovery: map current operations, target maturity, tool reality, and a phased plan.',
    'Use this pack to align Pete, Brenda, and staff before hiring WhatsApp/automation vendors.',
    '',
  ];

  if (stackProfile && Object.keys(stackProfile).length) {
    lines.push('## Current stack survey', '');
    Object.keys(stackProfile).forEach(function (key) {
      if (key === 'updatedAt' || key === 'updatedBy') return;
      lines.push('- **' + key + ':** ' + (stackProfile[key] || '—'));
    });
    lines.push('');
  }

  if (workspace.baselines && Object.keys(workspace.baselines).length) {
    lines.push('## Baseline metrics (today)', '');
    var bl = workspace.baselines;
    if (bl.quoteTurnaround) lines.push('- **Quote turnaround:** ' + bl.quoteTurnaround);
    if (bl.inboxResponse) lines.push('- **Inbox response time:** ' + bl.inboxResponse);
    if (bl.coordinatorHours) lines.push('- **Coordinator hours on comms/roster:** ' + bl.coordinatorHours);
    if (bl.notes) lines.push('- **Notes:** ' + bl.notes);
    lines.push('');
  }

  const tomCount = Object.keys(workspace.tomTargets || {}).length;
  if (tomCount) {
    lines.push('## Target Operating Model (summary)', '');
    lines.push('Processes with maturity targets: **' + tomCount + '**');
    Object.keys(workspace.tomTargets).forEach(function (pid) {
      lines.push('- `' + pid + '` → **' + workspace.tomTargets[pid] + '**');
    });
    lines.push('');
    lines.push('_Full TOM detail with costs: export from Process Map in the portal._');
    lines.push('');
  }

  const customCount = Object.keys(workspace.processCustom || {}).length;
  if (customCount) {
    lines.push('## Process map customizations', '');
    lines.push(customCount + ' process(es) edited with B9-specific notes.');
    lines.push('');
  }

  if (workspace.complianceGate) {
    const g = workspace.complianceGate;
    lines.push('## Compliance gates', '');
    lines.push('- Counsel reviewed: **' + (g.counselReviewed ? 'Yes' : 'No') + '**');
    lines.push('- Pilot internal-only: **' + (g.pilotInternalOnly ? 'Yes' : 'No') + '**');
    lines.push('- Talent comms risk acknowledged: **' + (g.talentCommsAcknowledged ? 'Yes' : 'No') + '**');
    lines.push('');
  }

  lines.push('## Discover sessions', '');
  lines.push('Total sessions: **' + sessions.length + '**');
  if (latest?.session) {
    lines.push('');
    lines.push('Latest completed plan: session `' + latest.session.id.slice(0, 8) + '…` · role **' + latest.session.role + '** · branch **' + (latest.outcome?.branch || '—') + '**');
  }
  lines.push('');

  if (latest?.outcome?.markdown) {
    lines.push('---', '', latest.outcome.markdown);
  } else {
    lines.push('---', '', '_No generated plan yet — complete Discover to add roadmap._');
  }

  lines.push('');
  lines.push('---');
  lines.push('*Directional recommendations — not legal or financial advice. Consult counsel before talent-facing pilots.*');

  return {
    markdown: lines.join('\n'),
    workspace,
    stackProfile,
    latestSessionId: latest?.session?.id || null,
    sessionCount: sessions.length,
  };
}

export function useWorkspaceStore() {
  return useJsonStore();
}
