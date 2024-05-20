const firebaseAdmin = require("../../config/firebase-config");
const Post = require("../../models/Post");
const Comment = require("../../models/Comments");

class PostController {
  async open(req, res) {
    res.send({ redirectTo: "/post" });
  }

  constructor() {
    this.getPosts = this.getPosts.bind(this); // Bind getPosts method to the class instance
  }
  async getPosts(req, res) {
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
      if (posts == "") {
        res.send({
          message: "There are no posts of this category",
          categoryName,
        });
      }

      res.json({ categoryName, posts });
    } catch (error) {}
  }

  async getPostsByUId(req, res) {
    const userID = req.query.userID; // Retrieve from query parameters
    try {
      const { posts } = await Post.getPostsByUId(userID);
      if (posts.length === 0) {
        // Use posts.length to check if posts are empty
        return res.send({
          message: "User does not have listings",
        });
      }

      res.json({ posts });
    } catch (error) {
      console.error("Error fetching posts by user ID:", error);
      res.status(500).send({ message: "Server error" });
    }
  }

  async getCommentsByPostId(req, res) {
    const postID = req.query.postID; // Retrieve from query parameters
    try {
      const comments = await Comment.getCommentsByPostId(postID);
      if (comments == undefined || comments.length === 0) {
        // Use comments.length to check if comments are empty
        return res.send({
          message: "Post has no comments",
        });
      }
      res.json({ comments });
    } catch (error) {
      console.error("Error fetching comments by post ID:", error);
      res.status(500).send({ message: "Server error" });
    }
  }

  async uploadComment(req, res) {
    const { fk_userID, fk_postID, description, date } = req.body;

    console.log("Description:", description);
    console.log("autoriaus id:", fk_userID);
    console.log("post id:", fk_postID);

    try {
      const userData = {
        description,
        fk_userID,
        fk_postID,
      };

      const postId = await Post.addPost(userData);

      res.send({ message: "Success", redirectTo: "/" });
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = PostController;
