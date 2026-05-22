import cors from 'cors';
import rateLimit from 'express-rate-limit';

export function corsMiddleware() {
  const origins = (process.env.ALLOWED_ORIGINS || 'http://localhost:8080')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
  return cors({
    origin(origin, cb) {
      if (!origin || origins.includes(origin)) cb(null, true);
      else cb(new Error('CORS blocked'));
    },
    credentials: true,
  });
}

export const answerLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 60,
  standardHeaders: true,
  legacyHeaders: false,
});

export const synthesizeLimiter = rateLimit({
  windowMs: 24 * 60 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
});
