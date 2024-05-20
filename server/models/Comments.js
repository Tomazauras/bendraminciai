const firebaseAdmin = require("../config/firebase-config");
class Comments {
  static async addComment(userData) {
    try {
      const { description, date, fk_postID, fk_userID } = userData;
      const commentID = firebaseAdmin
        .firestore()
        .collection("comments")
        .doc().id;

      const commentRef = await firebaseAdmin
        .firestore()
        .collection("comments")
        .doc(commentID)
        .set({
          description,
          date,
          fk_postID,
          fk_userID,
        });

      return commentID;
    } catch (error) {
      throw error;
    }
  }

  static async getCommentsByPostId(postId) {
    try {
      const querySnapshot = await firebaseAdmin
        .firestore()
        .collection("comments")
        .where("fk_postID", "==", postId)
        .get();

      // Initialize an empty array to store comments
      const comments = [];

      // Iterate over the documents in the query snapshot
      querySnapshot.forEach((doc) => {
        // Extract the comment data from each document
        const commentData = doc.data();
        // Add the comment data to the comments array
        comments.push({ id: doc.id, ...commentData });
      });
      // Return the array of comments
      return comments;
    } catch (error) {
      console.error("Error fetching comments:", error);
      throw error; // Rethrow the error to the caller for proper error handling
    }
  }
}

module.exports = Comments;
