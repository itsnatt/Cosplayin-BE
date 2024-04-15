// routes/authRoutes.js

const express = require('express');
const router = express.Router();
const authController = require('../../controllers/Funs/authController');

// Route untuk login
router.post('/login', authController.login);

// Route untuk registrasi
router.post('/register', authController.register);

// Route untuk lupa kata sandi
router.post('/forgot-password', authController.forgotPassword);

module.exports = router;
