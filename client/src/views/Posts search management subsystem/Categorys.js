import React, { Component } from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import "../../App-styles.css"; 
import axios from "axios";

class Categorys extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allData: [],
            loading: true
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

    renderCategories = (categories, tevoId = null) => {
        return categories
            .filter(category => category.tevoId === tevoId)
            .map(category => {
                const hasChildren = categories.some(child => child.tevoId === category.id);
                return (
                    <div key={category.id} style={{ backgroundColor: "#f0f0f0", padding: "10px", marginBottom: "10px" }}>
                        <li>
                            {hasChildren ? (
                                category.pavadinimas
                            ) : (
                                <Link to={`/category/${category.id}`}>{category.pavadinimas}</Link>
                            )}
                            {hasChildren && (
                                <ul>
                                    {this.renderCategories(categories, category.id)}
                                </ul>
                            )}
                        </li>
                    </div>
                );
            });
    };
    render() {
        const { allData, loading } = this.state;

        if (loading) {
            return <div>Loading...</div>; // Render a loading indicator while loading is true
        }

        return (
            <div className="App">
                <div className="header">Kategorijos</div>
                <div>
                    <ul className="category-list">
                        {this.renderCategories(allData)}
                    </ul>
                </div>
            </div>
        );
    }
}

export default Categorys;
