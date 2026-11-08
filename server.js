const express = require('express');
const crypto = require('crypto');
const path = require('path');
const app = express();
app.disable('x-powered-by');
app.use(express.json({ limit: '16kb' }));
const PORT = Number(process.env.PORT) || 3552;
const adminKey = process.env.ADMIN_KEY;
const bootTime = Date.now();
app.get('/', (_req, res) => res.json({ project: 'HYBRID OGFN', season: 'Chapter 1 Season 8', status: 'online', dashboard: '/dashboard' }));
app.get('/health', (_req, res) => res.json({ status: 'ok' }));
app.get('/api/matchmaking/status', (_req, res) => res.json({ status: 'waiting', players: 0, gameServerConnected: false }));
function secureCompare(a, b) {
  const aa = crypto.createHash('sha256').update(a).digest();
  const bb = crypto.createHash('sha256').update(b).digest();
  return crypto.timingSafeEqual(aa, bb);
}
app.get('/api/admin/overview', (req, res) => {
  if (!adminKey) return res.status(503).json({ error: 'Admin access not configured. Set ADMIN_KEY in Render.' });
  const token = req.get('x-admin-key') || '';
  if (!secureCompare(token, adminKey)) return res.status(401).json({ error: 'Invalid admin key' });
  res.set('Cache-Control', 'no-store');
  res.json({ project: 'HYBRID OGFN', season: 'Chapter 1 Season 8', backend: 'online', uptimeSeconds: Math.floor((Date.now() - bootTime) / 1000), matchmaking: 'waiting', players: 0, gameServerConnected: false, bots: null, note: 'Game-server integration not yet configured. Counts are placeholders.' });
});
app.get('/dashboard', (_req, res) => res.sendFile(path.join(__dirname, 'dashboard.html')));
app.listen(PORT, '0.0.0.0', () => console.log(`HYBRID backend running on port ${PORT}`));
