const firebaseAdmin = require("../../config/firebase-config");
const Post = require("../../models/Post");

class PostController {
    async open(req, res) {
        res.send({ redirectTo: "/post" });
    }

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

    async getPost(req, res) {
        const postId = req.params.postId;
        try {
            const post = await Post.getPostById(postId); // Implement this method in your Post model
    
            if (!post) {
                return res.status(404).json({ error: "Post not found" });
            }
    
            res.json(post);
        } catch (error) {
            console.error("Error fetching post:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    }

    async getPostsById(req, res) {
        const categoryId = req.params.categoryId;
        try {
            
            const { categoryName, posts } = await Post.getPostsById(categoryId);
            if (posts == ""){

                res.send({ message: "There are no posts of this category", categoryName});
            }
            
            res.json({ categoryName, posts });
            

        } catch (error) {
            
        }
    }
}

module.exports = PostController;