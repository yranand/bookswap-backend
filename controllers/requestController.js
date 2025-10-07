const { Book, BookRequest, User } = require('../models');

module.exports = {
  async create(req, res) {
    const { bookId, id } = req.params;
    const targetId = bookId || id;
    const book = await Book.findByPk(targetId);
    if (!book) return res.status(404).json({ message: 'Book not found' });
    if (book.userId === req.user.id) return res.status(400).json({ message: 'Cannot request your own book' });
    const existing = await BookRequest.findOne({ where: { bookId: book.id, requesterId: req.user.id, status: 'pending' } });
    if (existing) return res.status(409).json({ message: 'Request already pending' });
    const br = await BookRequest.create({ bookId: book.id, requesterId: req.user.id, status: 'pending' });
    return res.status(201).json(br);
  },

  async list(req, res) {
    const userId = req.user.id;
    // incoming for my books
    const incoming = await BookRequest.findAll({
      include: [{ model: Book, as: 'book', where: { userId }, attributes: ['id', 'title'] }, { model: User, as: 'requester', attributes: ['id', 'name'] }],
      order: [['createdAt', 'DESC']]
    });

    // outgoing I made
    const outgoing = await BookRequest.findAll({
      where: { requesterId: userId },
      include: [{ model: Book, as: 'book', attributes: ['id', 'title', 'userId'] }],
      order: [['createdAt', 'DESC']]
    });

    return res.json({ incoming, outgoing });
  },

  async updateStatus(req, res) {
    const { id } = req.params;
    const { status } = req.body; // accepted | declined
    if (!['accepted', 'declined'].includes(status)) return res.status(400).json({ message: 'Invalid status' });
    const br = await BookRequest.findByPk(id, { include: [{ model: Book, as: 'book' }] });
    if (!br) return res.status(404).json({ message: 'Not found' });
    if (br.book.userId !== req.user.id) return res.status(403).json({ message: 'Forbidden' });
    br.status = status;
    await br.save();
    return res.json(br);
  },

  async remove(req, res) {
    const { id } = req.params;
    const br = await BookRequest.findByPk(id);
    if (!br) return res.status(404).json({ message: 'Not found' });
    if (br.requesterId !== req.user.id) return res.status(403).json({ message: 'Forbidden' });
    await br.destroy();
    return res.status(204).send();
  }
};


