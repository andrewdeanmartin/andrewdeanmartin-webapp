import express from 'express';
import jwt from 'jsonwebtoken';
import { corsMiddleware } from './config/cors.js';
import { authMiddleware, adminMiddleware } from './config/auth.js';
import v1Router from './routes/v1.js';
import adminRouter from './routes/admin.js';
import { jsonStore } from './db/jsonStore.js';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(corsMiddleware());
app.use(express.json({ limit: '1mb' }));

app.get('/health', (req, res) => {
  res.json({ ok: true, service: 'b9-transform-api', ts: new Date().toISOString() });
});

if (process.env.USE_JSON_STORE === '1') {
  app.get('/dev/token', (req, res) => {
    const secret = process.env.JWT_SECRET;
    if (!secret) return res.status(503).json({ error: 'not_configured' });
    const role = req.query.role || 'pete';
    const token = jwt.sign(
      { role, sub: role, exp: Math.floor(Date.now() / 1000) + 86400 },
      secret
    );
    res.json({ token, role, localDev: true });
  });
}

app.use('/v1', authMiddleware, v1Router);
app.use('/v1/admin', authMiddleware, adminMiddleware, adminRouter);

app.use((err, req, res, next) => {
  if (err.message === 'CORS blocked') {
    return res.status(403).json({ error: 'CORS blocked' });
  }
  next(err);
});

async function boot() {
  await jsonStore.ensureClient();
  app.listen(PORT, () => {
    console.log(`B9 Transform API listening on :${PORT} (jsonStore=${process.env.USE_JSON_STORE === '1' || !process.env.DATABASE_URL})`);
  });
}

boot().catch((e) => {
  console.error(e);
  process.exit(1);
});
