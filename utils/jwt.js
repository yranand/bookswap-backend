const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret';
const EXPIRES_IN = '7d';

function signJwt(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: EXPIRES_IN });
}

function verifyJwt(token) {
  return jwt.verify(token, JWT_SECRET);
}

module.exports = { signJwt, verifyJwt };


