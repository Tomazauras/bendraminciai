const User = require('../../models/User');
const firebaseAdmin = require("../../config/firebase-config");

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

    async getUserType (req, res) {
        try {
            const { id } = req.body; 
            const type = await User.getType(id);
            console.log(type);
            res.send({ Alldata: type});
        } catch (error) {

        }
    }
}  

module.exports = UserController;
