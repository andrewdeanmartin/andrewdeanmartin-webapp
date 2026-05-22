import jwt from 'jsonwebtoken';

export function authMiddleware(req, res, next) {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  try {
    const secret = process.env.JWT_SECRET;
    if (!secret) return res.status(503).json({ error: 'not_configured' });
    req.user = jwt.verify(token, secret);
    next();
  } catch {
    return res.status(401).json({ error: 'Invalid token' });
  }
}

export function adminMiddleware(req, res, next) {
  if (req.user?.role === 'admin') return next();
  const key = req.headers['x-admin-key'];
  if (key && key === process.env.ADMIN_API_KEY) return next();
  return res.status(403).json({ error: 'Forbidden' });
}
