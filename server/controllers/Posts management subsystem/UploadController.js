const firebaseAdmin = require("../../config/firebase-config");
const admin = require("firebase-admin");
const multer = require("multer");
const Post = require("../../models/Post");

class UploadController {
  async navigateToUpload(req, res) {
    const { fk_userId } = req.body;
    res.send({ redirectTo: "/upload", Alldata: fk_userId });
  }

  async upload(req, res) {
    const { title, price, description, categoryId, fk_userID } = req.body;

    const image = req.file ? req.file : null;
    console.log("Title:", title);
    console.log("Description:", description);
    console.log("Price:", price);
    console.log("Image:", image);
    console.log("Kategorija:", categoryId);
    console.log("autoriaus id:", fk_userID);

    try {
      if (!title.trim()) {
        res.send({ message: 1 });
      } else if (!description.trim()) {
        res.send({ message: 2 });
      } else if (isNaN(price) || price <= 0 || price > 999999) {
        res.send({ message: 3 });
      } else if (image == null || image.size > 1 * 1024 * 1024) {
        res.send({ message: 4 });
      } else if (categoryId == "null") {
        res.send({ message: 5 });
      } else {
        const url = await Post.addImageToStorage(image);

        const urlId = await Post.addImageToDatabase(url);

        const userData = {
          title,
          price,
          description,
          state: "active",
          urlId,
          categoryId,
          fk_userID,
        };

        const postId = await Post.addPost(userData);

        res.send({ message: "Success", redirectTo: "/" });
      }
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = UploadController;
