const express = require('express');
const router = express.Router();

router.get('/health', (req, res) => res.json({ ok: true }));

router.use('/auth', require('./auth'));
router.use('/books', require('./books'));
router.use('/requests', require('./requests'));

module.exports = router;


