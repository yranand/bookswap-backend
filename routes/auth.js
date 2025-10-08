const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { verifyToken } = require('../middlewares/authJwt');

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/profile', verifyToken, authController.profile);

module.exports = router;


