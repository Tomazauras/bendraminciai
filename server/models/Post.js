const firebaseAdmin = require("../config/firebase-config");

class Post {
  static async addPost(userData) {
    try {
      const { title, description, price, state, urlId, categoryId, fk_userID } =
        userData;
      const postId = firebaseAdmin.firestore().collection("posts").doc().id;

      const postRef = await firebaseAdmin
        .firestore()
        .collection("posts")
        .doc(postId)
        .set({
          title,
          description,
          price,
          state,
          urlId,
          categoryId,
          fk_userID,
        });

      return postId;
    } catch (error) {
      throw error;
    }
  }

  static async addImageToStorage(image) {
    const bucket = firebaseAdmin.storage().bucket();
    const fileName = `${image.originalname}`;
    const file = bucket.file(fileName);
    await file.save(image.buffer, {
      metadata: {
        contentType: image.mimetype,
      },
    });

    return fileName;
  }

  static async addImageToDatabase(url) {
    const posts_images_id = firebaseAdmin
      .firestore()
      .collection("posts_images")
      .doc().id;
    const postRef = await firebaseAdmin
      .firestore()
      .collection("posts_images")
      .doc(posts_images_id)
      .set({
        url,
      });
    return posts_images_id;
  }

  static async getAllPosts() {
    try {
      const snapshot = await firebaseAdmin
        .firestore()
        .collection("posts")
        .get();
      const posts = await Promise.all(
        snapshot.docs.map(async (doc) => {
          const postData = doc.data();
          const docSnapshot = await firebaseAdmin
            .firestore()
            .collection("posts_images")
            .doc(postData.urlId)
            .get();
          const url = docSnapshot.data().url; // Assuming 'url' is the field containing the storage file URL
          const imageUrl = await firebaseAdmin
            .storage()
            .bucket()
            .file(url)
            .getSignedUrl({ action: "read", expires: "01-01-2025" });
          return { id: doc.id, ...postData, imageUrl };
        })
      );
      return posts;
    } catch (error) {
      console.error("Error fetching all posts:", error);
      throw error; // Rethrow the error to the caller for proper error handling
    }
  }

  static async getPostById(postId) {
    try {
      const docSnapshot = await firebaseAdmin
        .firestore()
        .collection("posts")
        .doc(postId)
        .get();

      if (!docSnapshot.exists) {
        return null; // Return null if the post doesn't exist
      }

      const postData = docSnapshot.data();
      const docImageSnapshot = await firebaseAdmin
        .firestore()
        .collection("posts_images")
        .doc(postData.urlId)
        .get();

      if (!docImageSnapshot.exists) {
        return null; // Return null if the image document doesn't exist
      }

      const url = docImageSnapshot.data().url;
      const imageUrl = await firebaseAdmin
        .storage()
        .bucket()
        .file(url)
        .getSignedUrl({ action: "read", expires: "01-01-2025" });

      return { id: docSnapshot.id, ...postData, imageUrl };
    } catch (error) {
      console.error("Error fetching post:", error);
      throw error; // Rethrow the error to the caller for proper error handling
    }
  }

  static async getPostsById(categoryId) {
    try {
      const categorySnapshot = await firebaseAdmin
        .firestore()
        .collection("categorys")
        .doc(categoryId)
        .get();

      const categoryName = categorySnapshot.data().pavadinimas;

      const snapshot = await firebaseAdmin
        .firestore()
        .collection("posts")
        .where("categoryId", "==", categoryId) // Replace 'specificCategoryId' with the ID you want to filter by
        .get();

      const posts = await Promise.all(
        snapshot.docs.map(async (doc) => {
          const postData = doc.data();
          const docSnapshot = await firebaseAdmin
            .firestore()
            .collection("posts_images")
            .doc(postData.urlId)
            .get();
          const url = docSnapshot.data().url; // Assuming 'url' is the field containing the storage file URL
          const imageUrl = await firebaseAdmin
            .storage()
            .bucket()
            .file(url)
            .getSignedUrl({ action: "read", expires: "01-01-2025" });
          return { id: doc.id, ...postData, imageUrl };
        })
      );

      return { categoryName, posts };
    } catch (error) {}
  }
}

module.exports = Post;
