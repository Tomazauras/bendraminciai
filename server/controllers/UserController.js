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
}

module.exports = UserController;
