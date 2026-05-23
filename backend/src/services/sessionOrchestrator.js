import { jsonStore, useJsonStore } from '../db/jsonStore.js';
import { getAllQuestionsForSession, getQuestionTrack } from '../db/knowledge.js';
import { extractLearning } from '../llm/provider.js';

function answerKey(trackId, questionId) {
  return `${trackId}:${questionId}`;
}

function buildAnsweredSet(answers) {
  return new Set((answers || []).map((a) => answerKey(a.trackId, a.questionId)));
}

function countAnsweredInTrack(trackId, track, answeredIds) {
  return track.questions.filter((q) => answeredIds.has(answerKey(trackId, q.id))).length;
}

function buildProgress(session, tracks, trackId, track) {
  const answeredIds = buildAnsweredSet(session.answers);
  const trackAnswered = countAnsweredInTrack(trackId, track, answeredIds);
  return {
    answered: answeredIds.size,
    total: countTotalQuestions(tracks),
    track: {
      answered: trackAnswered,
      index: trackAnswered + 1,
      total: track.questions.length,
    },
  };
}

function defaultTracksForRole(role) {
  if (role === 'brenda') return ['setup', 'strategy', 'wf_proposal', 'wf_post_event'];
  return ['setup', 'wf_discovery', 'wf_proposal', 'wf_post_event'];
}

export async function createSession({ role, track, tracks, createdBy }) {
  const resolvedTracks =
    tracks?.length ? tracks : track ? [track] : defaultTracksForRole(role || 'pete');
  if (useJsonStore()) {
    return jsonStore.createSession({ role, track: resolvedTracks[0], tracks: resolvedTracks, createdBy });
  }
  throw new Error('Prisma store not wired in dev without USE_JSON_STORE=1');
}

export async function getSession(sessionId) {
  if (useJsonStore()) return jsonStore.getSession(sessionId);
  throw new Error('Session not found');
}

export async function getNextQuestion(sessionId) {
  const session = await getSession(sessionId);
  if (!session) return null;

  const answeredIds = buildAnsweredSet(session.answers);
  const tracks = session.completedTracks || [session.track];

  for (const trackId of tracks) {
    const track = getQuestionTrack(trackId);
    if (!track) continue;
    for (const q of track.questions) {
      const key = answerKey(trackId, q.id);
      if (!answeredIds.has(key)) {
        return {
          question: q,
          trackId,
          trackLabel: track.label || trackId,
          progress: buildProgress(session, tracks, trackId, track),
        };
      }
    }
  }

  const sessionAnswered = answeredIds.size;
  return {
    complete: true,
    progress: {
      answered: sessionAnswered,
      total: sessionAnswered,
      track: { answered: sessionAnswered, index: sessionAnswered, total: sessionAnswered },
    },
  };
}

function countTotalQuestions(trackIds) {
  let n = 0;
  for (const tid of trackIds) {
    const t = getQuestionTrack(tid);
    if (t) n += t.questions.length;
  }
  return n;
}

export async function submitAnswer(sessionId, { questionId, trackId, rawAnswer, questionText }) {
  const session = await getSession(sessionId);
  if (!session) throw new Error('Session not found');

  const extracted = await extractLearning(questionText, rawAnswer);

  if (useJsonStore()) {
    await jsonStore.addAnswer(sessionId, {
      questionId,
      trackId: trackId || session.track,
      questionText,
      rawAnswer,
      structured: extracted.structured || null,
    });

    for (const note of extracted.notes || []) {
      await jsonStore.addLearningNote(sessionId, {
        category: note.category,
        content: note.content,
        sourceQ: questionId,
      });
    }

    await jsonStore.appendAudit(sessionId, 'answer_submitted', { questionId });
    return getNextQuestion(sessionId);
  }

  throw new Error('Store unavailable');
}

export async function getLearning(sessionId) {
  const session = await getSession(sessionId);
  if (!session) return [];
  return session.learningNotes || [];
}

export async function saveTradeoffs(sessionId, prefs) {
  if (useJsonStore()) {
    return jsonStore.updateSession(sessionId, { tradeoffPrefs: prefs });
  }
  throw new Error('Store unavailable');
}

export async function addTrackToSession(sessionId, trackId) {
  const session = await getSession(sessionId);
  if (!session) throw new Error('Session not found');
  const tracks = session.completedTracks || [session.track];
  if (!tracks.includes(trackId)) tracks.push(trackId);
  if (useJsonStore()) {
    return jsonStore.updateSession(sessionId, { completedTracks: tracks });
  }
  throw new Error('Store unavailable');
}

export { getAllQuestionsForSession };
