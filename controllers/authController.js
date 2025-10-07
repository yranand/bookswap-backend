const { User } = require('../models');
const { hashPassword, comparePassword } = require('../utils/password');
const { signJwt } = require('../utils/jwt');

module.exports = {
  async signup(req, res) {
    const { name, email, password } = req.body;
    if (!name || !email || !password) return res.status(400).json({ message: 'Missing fields' });
    const exists = await User.findOne({ where: { email } });
    if (exists) return res.status(409).json({ message: 'Email already registered' });
    const hashed = await hashPassword(password);
    const user = await User.create({ name, email, password: hashed });
    return res.status(201).json({ id: user.id, name: user.name, email: user.email });
  },

  async login(req, res) {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: 'Missing fields' });
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });
    const ok = await comparePassword(password, user.password);
    if (!ok) return res.status(401).json({ message: 'Invalid credentials' });
    const token = signJwt({ id: user.id, email: user.email });
    return res.json({ token });
  },

  async profile(req, res) {
    const user = await User.findByPk(req.user.id, { attributes: ['id', 'name', 'email', 'createdAt'] });
    return res.json(user);
  }
};


