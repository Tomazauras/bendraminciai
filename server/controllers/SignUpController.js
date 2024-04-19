const firebaseAdmin = require("../config/firebase-config");
const User = require("../models/User");

class UserController {
    async open(req, res) {
        res.send({ redirectTo: "/signup" });
    }

    async signUp(req, res) {
        const { name, surname, personalCode, phoneNumber, email, password, confirmPassword, userType, isBlocked, credits } = req.body;

        try {
            const userData = {
                email,
                password,
                name,
                surname,
                personalCode,
                phoneNumber,
                userType,
                isBlocked,
                credits
            };
            if (password != confirmPassword){
                if (password.length < 6) {
                    return res.status(400).json({ error: "**Password must be at least 6 characters long. Please try again" });
                }
                return res.status(400).json({ error: "**Passwords don't match. Please try again" });
            }

            const userId = await User.createUser(userData);

            res.send({ message: "User signed up successfully", redirectTo: "/login" });
        } catch (error) {
            if (error.message === 'Email address already exists') {
                return res.status(400).json({ error: '**Email address already exists. Please try again' });
            }
            console.error("Error signing up:", error);
            res.status(500).send("error");
        }
    }
}

module.exports = UserController;