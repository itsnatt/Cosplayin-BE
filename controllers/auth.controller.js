// controllers/auth.controller.js

const jwt = require('jsonwebtoken');
const secretKey = 'secret'; // Ganti dengan kunci rahasia yang kuat

// Fungsi untuk login
const loginUser = (req, res) => {
    // Lakukan proses autentikasi pengguna
    // Misalnya, Anda dapat memeriksa kredensial pengguna di database
    const { email, password } = req.body;
    
    // Contoh: Verifikasi kredensial pengguna (tidak disarankan untuk digunakan di produksi)
    if (email === 'user@example.com' && password === 'password123') {
        // Jika autentikasi berhasil, buat token JWT
        const token = jwt.sign({ email }, secretKey, { expiresIn: '1h' });
        res.json({ token });
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
};

module.exports = {
    loginUser
};
