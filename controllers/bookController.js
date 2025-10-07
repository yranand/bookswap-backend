const { Book, User } = require('../models');

module.exports = {
  async create(req, res) {
    const { title, author, condition, description } = req.body;
    if (!title || !author || !condition) return res.status(400).json({ message: 'Missing fields' });
    const image = req.file ? `/uploads/${req.file.filename}` : null;
    const book = await Book.create({ userId: req.user.id, title, author, condition, description, image });
    return res.status(201).json(book);
  },

  async list(req, res) {
    const { q } = req.query;
    const where = {};
    if (q) {
      where[require('sequelize').Op.or] = [
        { title: { [require('sequelize').Op.like]: `%${q}%` } },
        { author: { [require('sequelize').Op.like]: `%${q}%` } }
      ];
    }
    const books = await Book.findAll({ where, include: [{ model: User, as: 'owner', attributes: ['id', 'name'] }], order: [['createdAt', 'DESC']] });
    return res.json(books);
  },

  async detail(req, res) {
    const book = await Book.findByPk(req.params.id, { include: [{ model: User, as: 'owner', attributes: ['id', 'name'] }] });
    if (!book) return res.status(404).json({ message: 'Not found' });
    return res.json(book);
  },

  async update(req, res) {
    const book = await Book.findByPk(req.params.id);
    if (!book) return res.status(404).json({ message: 'Not found' });
    if (book.userId !== req.user.id) return res.status(403).json({ message: 'Forbidden' });
    const { title, author, condition, description } = req.body;
    if (req.file) book.image = `/uploads/${req.file.filename}`;
    if (title) book.title = title;
    if (author) book.author = author;
    if (condition) book.condition = condition;
    if (description) book.description = description;
    await book.save();
    return res.json(book);
  },

  async remove(req, res) {
    const book = await Book.findByPk(req.params.id);
    if (!book) return res.status(404).json({ message: 'Not found' });
    if (book.userId !== req.user.id) return res.status(403).json({ message: 'Forbidden' });
    await book.destroy();
    return res.status(204).send();
  }
};


