import { Router } from 'express';
import {
  createSession,
  getSession,
  getNextQuestion,
  submitAnswer,
  getLearning,
  saveTradeoffs,
  addTrackToSession,
} from '../services/sessionOrchestrator.js';
import { buildOutcome } from '../services/outcomeBuilder.js';
import { jsonStore, useJsonStore } from '../db/jsonStore.js';
import { answerLimiter, synthesizeLimiter } from '../config/cors.js';

const router = Router();

router.post('/sessions', async (req, res) => {
  try {
    const { role, track, tracks } = req.body;
    const createdBy = req.user?.sub || req.user?.role || 'unknown';
    const session = await createSession({
      role: role || req.user?.role,
      track,
      tracks,
      createdBy,
    });
    res.status(201).json(session);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.get('/sessions/:id', async (req, res) => {
  const session = await getSession(req.params.id);
  if (!session) return res.status(404).json({ error: 'Not found' });
  res.json(session);
});

router.get('/sessions/:id/next-question', async (req, res) => {
  const next = await getNextQuestion(req.params.id);
  if (!next) return res.status(404).json({ error: 'Not found' });
  res.json(next);
});

router.post('/sessions/:id/answers', answerLimiter, async (req, res) => {
  try {
    const { questionId, trackId, rawAnswer, questionText } = req.body;
    if (!questionId || !rawAnswer) return res.status(400).json({ error: 'Missing fields' });
    const next = await submitAnswer(req.params.id, { questionId, trackId, rawAnswer, questionText });
    res.json(next);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.get('/sessions/:id/learning', async (req, res) => {
  const notes = await getLearning(req.params.id);
  res.json({ notes });
});

router.post('/sessions/:id/tradeoffs', async (req, res) => {
  try {
    const session = await saveTradeoffs(req.params.id, req.body.prefs || {});
    res.json(session);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.post('/sessions/:id/tracks', async (req, res) => {
  try {
    const session = await addTrackToSession(req.params.id, req.body.trackId);
    res.json(session);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.post('/sessions/:id/synthesize', synthesizeLimiter, async (req, res) => {
  try {
    const session = await getSession(req.params.id);
    if (!session) return res.status(404).json({ error: 'Not found' });

    const outcomeData = buildOutcome(
      session,
      session.answers || [],
      session.tradeoffPrefs || {},
      req.body.adminNotes || ''
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
      signals: outcomeData.signals,
      connectorPlaybook: outcomeData.connectorPlaybook,
      reviewedByAdmin: false,
      adminNotes: req.body.adminNotes || null,
    };

    if (useJsonStore()) {
      await jsonStore.saveOutcome(req.params.id, outcome);
      await jsonStore.updateSession(req.params.id, { status: 'complete', branch: outcomeData.branch });
    }

    res.json({ ...outcome, sessionId: req.params.id });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.get('/sessions/:id/outcome', async (req, res) => {
  const session = await getSession(req.params.id);
  if (!session) return res.status(404).json({ error: 'Not found' });
  if (!session.outcome) return res.status(404).json({ error: 'Outcome not generated yet' });
  res.json(session.outcome);
});

router.get('/sessions/:id/outcome/markdown', async (req, res) => {
  const session = await getSession(req.params.id);
  if (!session?.outcome) return res.status(404).send('Not found');
  res.type('text/markdown').send(session.outcome.markdown);
});

router.get('/client/stack-profile', async (req, res) => {
  if (!useJsonStore()) return res.status(501).json({ error: 'Not available' });
  const profile = await jsonStore.getStackProfile();
  res.json({ profile });
});

router.put('/client/stack-profile', async (req, res) => {
  if (!useJsonStore()) return res.status(501).json({ error: 'Not available' });
  const profile = req.body.profile || req.body;
  if (!profile || typeof profile !== 'object') {
    return res.status(400).json({ error: 'Missing profile' });
  }
  const saved = await jsonStore.saveStackProfile(profile, req.user?.sub || req.user?.role);
  res.json({ profile: saved });
});

router.get('/client/workspace', async (req, res) => {
  if (!useJsonStore()) return res.status(501).json({ error: 'Not available' });
  const workspace = await jsonStore.getWorkspace();
  res.json({ workspace });
});

router.put('/client/workspace', async (req, res) => {
  if (!useJsonStore()) return res.status(501).json({ error: 'Not available' });
  const patch = req.body.workspace || req.body;
  if (!patch || typeof patch !== 'object') {
    return res.status(400).json({ error: 'Missing workspace' });
  }
  const saved = await jsonStore.saveWorkspace(patch, req.user?.sub || req.user?.role);
  res.json({ workspace: saved });
});

router.get('/client/facilitation-pack', async (req, res) => {
  if (!useJsonStore()) return res.status(501).json({ error: 'Not available' });
  const { buildFacilitationPack } = await import('../services/facilitationPack.js');
  const pack = await buildFacilitationPack();
  if (req.query.format === 'markdown') {
    return res.type('text/markdown').send(pack.markdown);
  }
  res.json(pack);
});

export default router;
