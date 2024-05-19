import React, { Component } from "react";
import axios from "axios";
import "../../App-styles.css";
import { reload } from "firebase/auth";

class CategoryList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allData: [],
            loading: true,
            newCategoryName: "",
            selectedParentId: null,
            deleteCategory: null
        };
    }

    componentDidMount() {
        // Fetch existing categories when the component mounts
        this.showCategoryList();
    }

    showCategoryList() {
        axios.post("http://localhost:5000/fetchCategorys")
            .then(response => {
                const allData = response.data.AllData;
                this.setState({ allData, loading: false });
            })
            .catch(error => {
                console.error("Error:", error);
            });
    }

    handleInputChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    handleCategorySelect = event => {
        const selectedParentId = event.target.value === "" ? null : event.target.value;
        this.setState({ selectedParentId });
    };

    initiateCategory = event => {
        event.preventDefault();
        const { newCategoryName, selectedParentId } = this.state;
    
        // Display a confirmation dialog
        const isConfirmed = window.confirm("Are you sure you want to create this category?");
    
        if (isConfirmed) {
            this.createCategory(newCategoryName, selectedParentId);
          
        }
    };

    createCategory(newCategoryName, selectedParentId){
        //console.log(selectedParentId);
        axios.post("http://localhost:5000/addCategory", {
                pavadinimas: newCategoryName,
                tevoId: selectedParentId
            })
            .then(response => {
                // Refresh the category list after adding a new category
                this.setState({ message: "" });
                this.showCategoryList();
                window.location.reload();
            })
            .catch(error => {
                this.setState({ message: error.response.data.error });
            });
            
            // Reset the form fields
            this.setState({ newCategoryName: "", selectedParentId: null });

            
    }

    renderCategories = (categories, tevoId = null) => {
        return categories
            .filter(category => category.tevoId === tevoId)
            .map(category => (
                <li key={category.id}>
                    {category.pavadinimas}
                    <ul>
                        {this.renderCategories(categories, category.id)}
                    </ul>
                </li>
            ));
    };

    handleCategoryDelete = event => {
        const deleteCategory = event.target.value === "" ? null : event.target.value;
        this.setState({ deleteCategory });
        
    };

    initiateDeleteCategory = event => {
        event.preventDefault();
        const { deleteCategory } = this.state;
        // Display a confirmation dialog
        const isConfirmed = window.confirm("Are you sure you want to delete this category?");
    
        if (isConfirmed) {
            this.startDeleteCategory(deleteCategory);
          
        }
    };

    startDeleteCategory (deleteCategory){
        axios.post("http://localhost:5000/deleteCategory", {
            id: deleteCategory
        })
        .then(response => {
            if (response.data.message != null)
            {
                    this.setState({ message: response.data.message });
            }
            else {
                this.showCategoryList();
                window.location.reload();
            }
            
        })
        .catch(error => {
            console.error("Error:", error);
        });
    }


    

    render() {
        const { allData, loading, newCategoryName, selectedParentId, message, deleteCategory } = this.state;
    
        if (loading) {
            return <div>Loading...</div>; // Render a loading indicator while loading is true
        }
    
        return (
            <div className="App">
                {message && <div className="error-message"><b>{message}</b></div>} {/* Render the message if it exists */}
                <div className="header">Kategorijų kūrimas</div>
                <div className="form-container">
                    <div className="form-and-categories-container">
                        <form onSubmit={this.initiateCategory}>
                            <label>Pavadinimas:</label>
                            <input
                                type="text"
                                name="newCategoryName"
                                value={newCategoryName}
                                onChange={this.handleInputChange}
                            />
                            <label>Tėvinė kategorija:</label>
                            <select onChange={this.handleCategorySelect}>
                                <option value="">-</option>
                                {allData.map(category => (
                                    <option key={category.id} value={category.id}>{category.pavadinimas}</option>
                                ))}
                            </select>
                            <div>
                                <button type="submit">Create Category</button>
                            </div>
                        </form>
                    </div>
                    
                    <div className="form-and-categories-container">
                        <form onSubmit={this.initiateDeleteCategory}>
                            <label>Ištrinti kategoriją:</label>
                            <select onChange={this.handleCategoryDelete}>
                                {allData.map(category => (
                                    <option key={category.id} value={category.id}>{category.pavadinimas}</option>
                                ))}
                            </select>
                            <div>
                                <button type="submit">Delete Category</button>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="categorys-left">
                    <h2>Categories</h2>
                    <ul className="category-list">
                        {this.renderCategories(allData)}
                    </ul>
                </div>
            </div>
        );
    }
    
}

export default CategoryList;
