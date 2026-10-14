'use strict';

const express = require('express');
const authController = require('../controllers/authController');
const { requireLogin } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/logout', authController.logout);
router.get('/me', requireLogin, authController.me);

module.exports = router;
