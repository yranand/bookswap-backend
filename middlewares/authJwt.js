const { verifyJwt } = require('../utils/jwt');

function verifyToken(req, res, next) {
  const header = req.headers['authorization'];
  if (!header) return res.status(401).json({ message: 'Missing token' });
  const parts = header.split(' ');
  const token = parts.length === 2 ? parts[1] : parts[0];
  try {
    const decoded = verifyJwt(token);
    req.user = { id: decoded.id, email: decoded.email };
    next();
  } catch (e) {
    return res.status(401).json({ message: 'Invalid token' });
  }
}

module.exports = { verifyToken };


