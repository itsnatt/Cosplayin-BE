// middleware/authenticate.js

const jwt = require('jsonwebtoken');
const secretKey = 'secret'; // Ganti dengan kunci rahasia yang kuat

// Middleware untuk mengotentikasi token JWT
const authenticateToken = (req, res, next) => {
    // Ambil token dari header Authorization
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

    // Jika token tidak tersedia, kembalikan status 401 (Unauthorized)
    if (!token) {
        return res.status(401).json({ message: 'Token not found' });
    }

    // Verifikasi token
    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid token' });
        }
        // Jika token valid, lanjutkan ke middleware berikutnya
        req.user = decoded; // Tambahkan informasi pengguna ke objek permintaan
        next();
    });
};

module.exports = {
    authenticateToken
};
