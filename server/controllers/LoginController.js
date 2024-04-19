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

                req.session.loggedIn = true;
                console.log(req.session);
                res.send({ message: "User log in successfull", redirectTo: "/", customToken });
            }
            else {
                res.send({ message: "User log in unsuccessfull"});
            }
        } catch (error) {
            console.error(error);
            res.json({ exists: false }); // Return failure response
            console.log("lel");
        }
    }

    async isLoggedIn(req, res) {

        console.log("isLoggedIn called");
        console.log("req.session:", req.session);
        console.log("req.session.loggedIn:", req.session.loggedIn);
        if (req.session && req.session.loggedIn) {
            res.json({ loggedIn: true });
        } else {
            res.json({ loggedIn: false });
        }
    }
}

module.exports = LoginController;