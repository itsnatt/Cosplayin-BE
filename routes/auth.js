// routes/auth.js

const express = require('express');
const router = express.Router();
const { loginUser } = require('../controllers/auth.controller');

// Endpoint untuk login
router.post('/login', loginUser);

// // Endpoint untuk verifikasi token
// router.post('/verify', verifyToken);

module.exports = router;
