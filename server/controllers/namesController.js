const firebaseAdmin = require("../config/firebase-config");

const Names = (req, res) => {
    res.json({"users": ["Nojus", "Tomas", "Vytenis"] })
}

module.exports = {
    Names
}