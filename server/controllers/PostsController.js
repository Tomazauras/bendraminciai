const firebaseAdmin = require("../config/firebase-config");
const Post = require("../models/Post");

class UserController {
    constructor() {
        this.getPosts = this.getPosts.bind(this); // Bind getPosts method to the class instance
    }
    async getPosts(req, res){
        try {
            const allPosts = await Post.getAllPosts();

            res.json(allPosts);
        } catch (error) {
            console.error("Error fetching posts:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    }

}

module.exports = UserController;