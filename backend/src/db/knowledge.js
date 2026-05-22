import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const KNOWLEDGE_DIR = path.join(__dirname, '../knowledge');

const cache = {};

export function loadKnowledge(name) {
  if (cache[name]) return cache[name];
  const file = path.join(KNOWLEDGE_DIR, `${name}.json`);
  cache[name] = JSON.parse(fs.readFileSync(file, 'utf8'));
  return cache[name];
}

export function getQuestionTrack(trackId) {
  const data = loadKnowledge('question-tracks');
  return data.tracks[trackId] || null;
}

export function getAllQuestionsForSession(session) {
  const tracks = loadKnowledge('question-tracks');
  const trackIds = session.trackIds || [session.track];
  const questions = [];
  for (const tid of trackIds) {
    const t = tracks.tracks[tid];
    if (!t) continue;
    for (const q of t.questions) {
      questions.push({ ...q, trackId: tid });
    }
  }
  return questions;
}
