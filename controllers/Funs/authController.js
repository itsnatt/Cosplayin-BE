// controllers/authController.js

const admin = require('firebase-admin');

// Fungsi untuk login
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userRecord = await admin.auth().getUserByEmail(email);
    // Lakukan validasi password di sini (Anda dapat menggunakan Firebase Authentication untuk ini)
    res.status(200).json({ message: 'Login successful', user: userRecord });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(401).json({ message: 'Login failed' });
  }
};

// Fungsi untuk registrasi
exports.register = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userRecord = await admin.auth().createUser({
      email,
      password,
    });
    res.status(200).json({ message: 'Registration successful', user: userRecord });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Registration failed' });
  }
};

// Fungsi untuk lupa kata sandi
exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    await admin.auth().generatePasswordResetLink(email);
    res.status(200).json({ message: 'Password reset email sent successfully' });
  } catch (error) {
    console.error('Error sending password reset email:', error);
    res.status(500).json({ message: 'Failed to send password reset email' });
  }
};
