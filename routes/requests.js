const express = require('express');
const router = express.Router();
const requestController = require('../controllers/requestController');
const { verifyToken } = require('../middlewares/authJwt');

router.post('/:bookId/request', verifyToken, requestController.create);
router.get('/', verifyToken, requestController.list);
router.patch('/:id', verifyToken, requestController.updateStatus);
router.delete('/:id', verifyToken, requestController.remove);

module.exports = router;


