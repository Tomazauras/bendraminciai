const User = require('../models/User');

class UserController {
    async getUserById(req, res) {
        try {
            const user = await User.getUserById(req.params.userId);
            res.status(200).json(user);
        } catch (error) {
            console.error("Error fetching user by id:", error);
            res.status(500).json({ success: false, error: error.message });
        }
    }

    async appendCredits(req, res) {
        try {
            const { userId } = req.params;
            const { amount } = req.body;

            if (typeof amount !== 'number' || amount <= 0) {
                return res.status(400).json({ success: false, message: "Invalid amount" });
            }

            const updatedCredits = await User.appendCredits(userId, amount);
            res.status(200).json({ success: true, updatedCredits });
        } catch (error) {
            console.error("Error appending credits:", error);
            res.status(500).json({ success: false, error: error.message });
        }
    }

    async subtractCredits(req, res) {
        try {
            const { userId } = req.params;
            const { amount } = req.body;

            if (typeof amount !== 'number' || amount <= 0) {
                return res.status(400).json({ success: false, message: "Invalid amount" });
            }

            const updatedCredits = await User.subtractCredits(userId, amount);
            res.status(200).json({ success: true, updatedCredits });
        } catch (error) {
            console.error("Error subtracting credits:", error);
            res.status(500).json({ success: false, error: error.message });
        }
    }
}

module.exports = UserController;
