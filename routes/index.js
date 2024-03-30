// routes/index.js

const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/authenticate');
const { getUsers, createUser, getUserById, deleteUser, updateUser } = require('../controllers/index.controller');

// Rute yang dilindungi oleh autentikasi JWT
router.get('/users', authenticateToken, getUsers);
router.get('/users/:id', authenticateToken, getUserById);
router.post('/users', authenticateToken, createUser);
router.delete('/users/:id', authenticateToken, deleteUser);
router.put('/users/:id', authenticateToken, updateUser);

module.exports = router;
