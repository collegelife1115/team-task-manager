const express = require('express');
const { signup, login, logout, getMe } = require('../controllers/authController');
const { protect } = require('../middleware/auth');
const { validateSignup } = require('../middleware/validator');

const router = express.Router();

router.post('/signup', validateSignup, signup);
router.post('/login', login);
router.get('/logout', logout);
router.get('/me', protect, getMe);

module.exports = router;
