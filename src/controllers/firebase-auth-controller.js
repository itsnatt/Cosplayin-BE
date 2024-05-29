const { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  sendEmailVerification,
  sendPasswordResetEmail
 } = require('../config/firebase');
const auth = getAuth();
const pool = require('../middleware/db');

class FirebaseAuthController {
  registerUser(req, res) {
    const { email, password, fullName, username } = req.body;
    if (!email || !password || !fullName || !username) {
      return res.status(422).json({
        error: 'All fields are required',
      });
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        sendEmailVerification(user)
          .then(() => {
            const uid = user.uid;
            const roleID = 1;
            const address = 4;

            pool.query(
              'INSERT INTO "User" ("FullName", "Username", "UID", "Email", "RoleID_fk", "AddressID_fk") VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
              [fullName, username, uid, email, roleID, address])
              .then((result) => {
                signInWithEmailAndPassword(auth, email, password)
                  .then((loginCredential) => {
                    const idToken = loginCredential._tokenResponse.idToken;
                    if (idToken) {
                      res.cookie('access_token', idToken, {
                        httpOnly: true
                      });
                      res.status(201).json({
                        message: 'Verification email sent! User created and logged in successfully!',
                        user: result.rows[0],
                        token: idToken
                      });
                    } else {
                      res.status(500).json({ error: 'Internal Server Error' });
                    }
                  })
                  .catch((loginError) => {
                    console.error(loginError);
                    res.status(500).json({ error: 'Error logging in after registration' });
                  });
              })
              .catch((dbError) => {
                console.error(dbError);
                res.status(500).json({ error: 'Error saving user to database' });
              });
          })
          .catch((emailError) => {
            console.error(emailError);
            res.status(500).json({ error: 'Error sending email verification' });
          });
      })
      .catch((authError) => {
        const errorMessage = authError.message || 'An error occurred while registering user';
        res.status(500).json({ error: errorMessage });
      });
  }
  

  loginUser(req, res) {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(422).json({
            email: "Email is required",
            password: "Password is required",
        });
    }
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => { 
          const idToken = userCredential._tokenResponse.idToken
            if (idToken) {
                res.cookie('access_token', idToken, {
                    httpOnly: true
                });
                res.status(200).json({ message: "User logged in successfully", userCredential });
            } else {
                res.status(500).json({ error: "Internal Server Error" });
            }
        })
        .catch((error) => {
            console.error(error);
            const errorMessage = error.message || "An error occurred while logging in";
            res.status(500).json({ error: errorMessage });
        });
  }

  logoutUser(req, res) {
    signOut(auth)
      .then(() => {
        res.clearCookie('access_token');
        res.status(200).json({ message: "User logged out successfully" });
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
      });
}


  resetPassword(req, res){
    const { email } = req.body;
    if (!email ) {
      return res.status(422).json({
        email: "Email is required"
      });
    }
    sendPasswordResetEmail(auth, email)
      .then(() => {
        res.status(200).json({ message: "Password reset email sent successfully!" });
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
      });
  }

}

module.exports = new FirebaseAuthController();
