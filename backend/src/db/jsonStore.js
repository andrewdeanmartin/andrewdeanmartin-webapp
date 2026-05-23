import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import crypto from 'crypto';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR = process.env.DATA_DIR || path.join(__dirname, 'data');
const STORE_FILE = path.join(DATA_DIR, 'store.json');

function emptyStore() {
  return {
    clients: [],
    sessions: [],
    answers: [],
    learningNotes: [],
    outcomes: [],
  };
}

function load() {
  if (!fs.existsSync(STORE_FILE)) return emptyStore();
  return JSON.parse(fs.readFileSync(STORE_FILE, 'utf8'));
}

function save(store) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
  fs.writeFileSync(STORE_FILE, JSON.stringify(store, null, 2));
}

function id() {
  return crypto.randomUUID();
}

export function useJsonStore() {
  return process.env.USE_JSON_STORE === '1' || !process.env.DATABASE_URL;
}

export const jsonStore = {
  async ensureClient() {
    const store = load();
    let client = store.clients.find((c) => c.slug === 'b9');
    if (!client) {
      client = { id: id(), name: 'B9 Models', slug: 'b9', metadata: {}, createdAt: new Date().toISOString() };
      store.clients.push(client);
      save(store);
    }
    return client;
  },

  async createSession({ role, track, tracks, createdBy }) {
    const store = load();
    const client = await this.ensureClient();
    const resolvedTracks = tracks?.length ? tracks : [track];
    const session = {
      id: id(),
      clientId: client.id,
      role,
      track: resolvedTracks[0],
      completedTracks: resolvedTracks,
      status: 'in_progress',
      branch: null,
      createdBy,
      tradeoffPrefs: null,
      auditLog: [{ ts: new Date().toISOString(), event: 'session_created', detail: { role, tracks: resolvedTracks } }],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    store.sessions.push(session);
    save(store);
    return session;
  },

  async getSession(sessionId) {
    const store = load();
    const session = store.sessions.find((s) => s.id === sessionId);
    if (!session) return null;
    return {
      ...session,
      answers: store.answers.filter((a) => a.sessionId === sessionId),
      learningNotes: store.learningNotes.filter((n) => n.sessionId === sessionId),
      outcome: store.outcomes.find((o) => o.sessionId === sessionId) || null,
    };
  },

  async updateSession(sessionId, patch) {
    const store = load();
    const idx = store.sessions.findIndex((s) => s.id === sessionId);
    if (idx === -1) return null;
    store.sessions[idx] = { ...store.sessions[idx], ...patch, updatedAt: new Date().toISOString() };
    save(store);
    return store.sessions[idx];
  },

  async appendAudit(sessionId, event, detail) {
    const store = load();
    const idx = store.sessions.findIndex((s) => s.id === sessionId);
    if (idx === -1) return;
    const log = store.sessions[idx].auditLog || [];
    log.push({ ts: new Date().toISOString(), event, detail });
    store.sessions[idx].auditLog = log;
    store.sessions[idx].updatedAt = new Date().toISOString();
    save(store);
  },

  async addAnswer(sessionId, answer) {
    const store = load();
    const existing = store.answers.find(
      (a) =>
        a.sessionId === sessionId &&
        a.trackId === answer.trackId &&
        a.questionId === answer.questionId
    );
    if (existing) return existing;

    const row = { id: id(), sessionId, ...answer, createdAt: new Date().toISOString() };
    store.answers.push(row);
    save(store);
    return row;
  },

  async addLearningNote(sessionId, note) {
    const store = load();
    const row = { id: id(), sessionId, ...note, createdAt: new Date().toISOString() };
    store.learningNotes.push(row);
    save(store);
    return row;
  },

  async saveOutcome(sessionId, outcome) {
    const store = load();
    const idx = store.outcomes.findIndex((o) => o.sessionId === sessionId);
    const row = { id: id(), sessionId, ...outcome, generatedAt: new Date().toISOString() };
    if (idx >= 0) store.outcomes[idx] = { ...store.outcomes[idx], ...row };
    else store.outcomes.push(row);
    save(store);
    return row;
  },

  async listSessions() {
    const store = load();
    return store.sessions
      .slice()
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .map((s) => ({
        ...s,
        outcome: store.outcomes.find((o) => o.sessionId === s.id) || null,
        answerCount: store.answers.filter((a) => a.sessionId === s.id).length,
      }));
  },

  async getStackProfile() {
    const client = await this.ensureClient();
    return client.metadata?.stackProfile || null;
  },

  async saveStackProfile(profile, updatedBy) {
    const store = load();
    const idx = store.clients.findIndex((c) => c.slug === 'b9');
    if (idx === -1) await this.ensureClient();
    const store2 = load();
    const i = store2.clients.findIndex((c) => c.slug === 'b9');
    const client = store2.clients[i];
    client.metadata = client.metadata || {};
    client.metadata.stackProfile = {
      ...profile,
      updatedBy: updatedBy || profile.filledBy || 'unknown',
      updatedAt: new Date().toISOString(),
    };
    store2.clients[i] = client;
    save(store2);
    return client.metadata.stackProfile;
  },

  defaultWorkspace() {
    return {
      tomTargets: {},
      processCustom: {},
      tradeoffPrefs: {},
      baselines: {},
      complianceGate: {
        counselReviewed: false,
        pilotInternalOnly: false,
        talentCommsAcknowledged: false,
      },
      lastVisited: {},
      updatedAt: null,
      updatedBy: null,
    };
  },

  async getWorkspace() {
    const client = await this.ensureClient();
    return { ...this.defaultWorkspace(), ...(client.metadata?.workspace || {}) };
  },

  async saveWorkspace(patch, updatedBy) {
    const store = load();
    let idx = store.clients.findIndex((c) => c.slug === 'b9');
    if (idx === -1) {
      await this.ensureClient();
      idx = load().clients.findIndex((c) => c.slug === 'b9');
    }
    const store2 = load();
    const client = store2.clients[idx];
    client.metadata = client.metadata || {};
    const prev = client.metadata.workspace || {};
    client.metadata.workspace = {
      ...this.defaultWorkspace(),
      ...prev,
      ...patch,
      complianceGate: { ...this.defaultWorkspace().complianceGate, ...prev.complianceGate, ...(patch.complianceGate || {}) },
      baselines: { ...prev.baselines, ...(patch.baselines || {}) },
      updatedBy: updatedBy || patch.updatedBy || 'unknown',
      updatedAt: new Date().toISOString(),
    };
    store2.clients[idx] = client;
    save(store2);
    return client.metadata.workspace;
  },

  async exportBackup() {
    return load();
  },

  async resetAll() {
    const store = load();
    const client = store.clients.find((c) => c.slug === 'b9');
    const fresh = emptyStore();
    if (client) {
      fresh.clients.push({
        id: client.id,
        name: client.name,
        slug: client.slug,
        metadata: {},
        createdAt: client.createdAt,
      });
    }
    save(fresh);
    return {
      ok: true,
      clearedAt: new Date().toISOString(),
      sessionsRemoved: store.sessions.length,
      answersRemoved: store.answers.length,
    };
  },

  async getLatestOutcome() {
    const store = load();
    const sessions = store.sessions
      .filter((s) => store.outcomes.some((o) => o.sessionId === s.id))
      .sort((a, b) => new Date(b.updatedAt || b.createdAt) - new Date(a.updatedAt || a.createdAt));
    if (!sessions.length) return null;
    const session = sessions[0];
    const outcome = store.outcomes.find((o) => o.sessionId === session.id);
    return { session, outcome };
  },
};
