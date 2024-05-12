import React, { Component } from "react";
import "../styles.css"; // Import the CSS file
import axios from "axios";

class Upload extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            price: "",
            description: "",
            image: null,
            uploading: false
        };
    }

    startUpload() {
        const { title, price, description, image } = this.state;

        const formData = new FormData();
        formData.append("title", title);
        formData.append("price", price);
        formData.append("description", description);
        formData.append("image", image); 
        this.setState({ uploading: true });

        axios.post('http://localhost:5000/upload', formData)
        .then(response => {
            // Redirect to the login page or handle success response
            if (response.data && response.data.redirectTo) {
                window.location.href = response.data.redirectTo; // Redirect to login page
                window.alert("Upload successful!");
            } 
            else if (response.data.message == 1) {
                this.setState({ message: "**Title is empty" });
            }
            else if (response.data.message == 2) {
                this.setState({ message: "**Description is empty" });
            }
            else if (response.data.message == 3) {
                this.setState({ message: "**Incorrect price" });
            }
            else if (response.data.message == 4) {
                this.setState({ message: "**No image selected or it's size is incorrect." });
            }
            
          })
          .catch(error => {
              
            console.error("Error:", error);
          }).finally(() => {

            this.setState({ uploading: false });
        });
    }

    handleTitleChange = (e) => {
        this.setState({ title: e.target.value });
    };

    handleDescriptionChange = (e) => {
        this.setState({ description: e.target.value });
    };

    handlePriceChange = (e) => {
        this.setState({ price: e.target.value });
    };

    handleUpload = () => {
        this.startUpload();
    };

    handleImageChange = (e) => {
        this.setState({ image: e.target.files[0] }); // Get the first file from the selected files array
        
    };

    render() {
        const {
            title,
            price,
            description,
            message,
            uploading
          } = this.state;

        return (
            <div className="container">
                <div className="header">Skelbimo įkėlimas</div>
                {message && <div className="error-message"><b>{message}</b></div>}
                <div>
                    <input
                        type="text"
                        name="title"
                        placeholder="Pavadinimas"
                        value={title}
                        onChange={this.handleTitleChange}
                        className="input-field"
                    />
                </div>

                <div>
                    <textarea
                        type="text"
                        name="description"
                        placeholder="Aprašymas"
                        value={description}
                        onChange={this.handleDescriptionChange}
                        className="input-field"
                    />
                </div>

                <div>
                    <input
                        type="text"
                        name="price"
                        placeholder="Kaina"
                        value={price}
                        onChange={this.handlePriceChange}
                        className="input-field"
                    />
                </div>

                <div>
                    <input
                        type="file"
                        accept="image/*" // Accept only image files
                        onChange={this.handleImageChange}
                        className="input-field"
                    />
                </div>
                {uploading && <div><b>Įkeliama...</b></div>}
                <button className="uploadClick" onClick={this.handleUpload}>Išsaugoti</button>

            </div>
        );
    }
}

export default Upload;