const firebaseAdmin = require("../config/firebase-config");
const User = require("../models/User");

class LoginController {
    async open(req, res) {
        res.send({ redirectTo: "/login" });
    }

    async login(req, res) {
        const { email, password } = req.body;
        const userData = {
            email,
            password
        };

        try {
            const authenticationResult = await User.checkUser(userData);
            if (authenticationResult){
                const userRecord = await firebaseAdmin.auth().getUserByEmail(email);
                const customToken = await firebaseAdmin.auth().createCustomToken(userRecord.uid);

                
                res.send({ message: "User log in successfull", redirectTo: "/", customToken });
            }
            else {
                res.send({ message: "User log in unsuccessfull"});
            }
        } catch (error) {
            console.error(error);
            res.json({ exists: false }); // Return failure response
        }
    }

    async logOut(req, res) {

        try {
            const { uid } = req.body;
            await firebaseAdmin.auth().revokeRefreshTokens(uid);
            console.log("User's refresh tokens revoked successfully");
            res.json({ success: true, redirectTo: "/login" });
          } catch (error) {
            console.error("Error revoking refresh tokens:", error);
            return res.status(500).json({ success: false, error: "Logout failed" });
          }
    }
}

module.exports = LoginController;