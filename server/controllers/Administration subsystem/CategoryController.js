const Post_category = require("../../models/Post_Category");

class CategoryController {
    async open (req, res){
        res.send({ redirectTo: "/categorys" });
    }

    async openList (req, res){
        res.send({ redirectTo: "/categorysList" });
    }


    async findCategorys (req, res) {
        try {
            const allCategorys = await Post_category.getAll();   
            
            res.send({ AllData: allCategorys });

        } catch (error) {
            //res.send({ redirectTo: "/categorys" });
            //res.status(500).json({ error: "There are no categorys." });
            
        }
    }

    async create (req, res) {
        try {
            const { pavadinimas, tevoId } = req.body;
            if (pavadinimas == "")
                {
                    res.status(400).json({ error: "**Empty category can't be added." });
                    return;
                }
            await Post_category.addCategory(pavadinimas, tevoId); 
            res.send("Category added");
        } catch (error){

        }
    }

    async delete (req, res) {
        const { id } = req.body;
        console.log(id);
        try {
            
            const rez = await Post_category.deleteCategory(id); 
            if (rez == null){
                res.send({ message: "A category with sub-categories can't be deleted!"});
            }
            res.send("Category deleted");
        } catch (error) {

        }
    }
}

module.exports = CategoryController;