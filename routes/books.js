const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const { verifyToken } = require('../middlewares/authJwt');
const upload = require('../middlewares/upload');

router.post('/', verifyToken, upload.single('image'), bookController.create);
router.get('/', bookController.list);
router.get('/:id', bookController.detail);
router.post('/:id/request', verifyToken, require('../controllers/requestController').create);
router.patch('/:id', verifyToken, upload.single('image'), bookController.update);
router.delete('/:id', verifyToken, bookController.remove);

module.exports = router;


