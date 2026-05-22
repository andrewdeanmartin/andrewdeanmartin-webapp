import { Router } from 'express';
import { jsonStore } from '../db/jsonStore.js';
import { getSession } from '../services/sessionOrchestrator.js';
import { buildOutcome } from '../services/outcomeBuilder.js';

const router = Router();

router.get('/sessions', async (req, res) => {
  const sessions = await jsonStore.listSessions();
  res.json({ sessions });
});

router.get('/sessions/:id', async (req, res) => {
  const session = await getSession(req.params.id);
  if (!session) return res.status(404).json({ error: 'Not found' });
  res.json(session);
});

router.patch('/sessions/:id/outcome', async (req, res) => {
  const session = await getSession(req.params.id);
  if (!session?.outcome) return res.status(404).json({ error: 'No outcome' });
  const updated = {
    ...session.outcome,
    adminNotes: req.body.adminNotes ?? session.outcome.adminNotes,
    reviewedByAdmin: req.body.reviewedByAdmin ?? session.outcome.reviewedByAdmin,
  };
  await jsonStore.saveOutcome(req.params.id, updated);
  res.json(updated);
});

router.post('/sessions/:id/regenerate', async (req, res) => {
  const session = await getSession(req.params.id);
  if (!session) return res.status(404).json({ error: 'Not found' });
  const outcomeData = buildOutcome(
    session,
    session.answers || [],
    session.tradeoffPrefs || {},
    req.body.adminNotes || session.outcome?.adminNotes || ''
  );
  const outcome = {
    branch: outcomeData.branch,
    branchRationale: outcomeData.branchRationale,
    threeToStart: outcomeData.threeToStart,
    phase1Checklist: outcomeData.phase1Checklist,
    complianceFlags: outcomeData.complianceFlags,
    markdown: outcomeData.markdown,
    snapshot: outcomeData.snapshot,
    notNow: outcomeData.notNow,
    reviewedByAdmin: session.outcome?.reviewedByAdmin || false,
    adminNotes: req.body.adminNotes || session.outcome?.adminNotes || null,
  };
  await jsonStore.saveOutcome(req.params.id, outcome);
  await jsonStore.updateSession(req.params.id, { status: 'complete', branch: outcomeData.branch });
  res.json(outcome);
});

router.get('/backup', async (req, res) => {
  const backup = await jsonStore.exportBackup();
  res.setHeader('Content-Disposition', 'attachment; filename="b9-store-backup.json"');
  res.json(backup);
});

export default router;
