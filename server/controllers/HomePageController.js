const firebaseAdmin = require("../config/firebase-config");

class HomePageController {
    async navigateToHome(req, res) {
        res.send({ redirectTo: "/" });
    }
}

module.exports = HomePageController;