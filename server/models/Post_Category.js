const firebaseAdmin = require("../config/firebase-config");

class Post_Category {
    static async getAll (req, res) {
        try {
            const snapshot = await firebaseAdmin.firestore().collection("categorys").get();
            const posts = await Promise.all(snapshot.docs.map(async doc => {
                const postData = doc.data();
                return { id: doc.id, ...postData };
            }));
            return posts;
        } catch (error) {
            console.error("There are no categorys.", error);
            throw error; // Rethrow the error to the caller for proper error handling
        }
    }

    static async addCategory (pavadinimas, tevoId) {
        try {
            const categoryId = firebaseAdmin.firestore().collection("categorys").doc().id;

                const postRef = await firebaseAdmin.firestore().collection("categorys").doc(categoryId).set({
                    pavadinimas,
                    tevoId
                });
        } catch (error) {
            console.error("New category can't be added.", error);
        }
    }

    static async deleteCategory(selectedCategory) {
        try {
            const childCategorysList = await firebaseAdmin.firestore().collection("categorys")
            .where("tevoId", "==", selectedCategory) // Replace 'specificCategoryId' with the ID you want to filter by
            .get();

            if (childCategorysList.size > 0){
                return null;
            }
            // Delete the category document with the provided ID
            await firebaseAdmin.firestore().collection("categorys").doc(selectedCategory).delete();
            
            // Optionally, you can return a success message or perform any other actions
            return "Category deleted successfully";
        } catch (error) {

        }
    }
}

module.exports = Post_Category;