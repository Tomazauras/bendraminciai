import React, { Component } from "react";
import "../../styles.css";
import axios from "axios";
import firebase from "firebase/compat/app";

class Upload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allData: [],
      title: "",
      price: "",
      description: "",
      image: null,
      uploading: false,
      categoryId: null,
      deepestCategories: [],
      userID: null,
    };
  }

  componentDidMount() {
    // Fetch existing categories when the component mounts
    this.showCategoryList();

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        const userID = firebase.auth().currentUser.uid;
        this.setState({ userID });
      }
    });
  }

  startUpload() {
    const {
      allData,
      title,
      price,
      description,
      image,
      uploading,
      categoryId,
      userID,
    } = this.state;
    const formData = new FormData();
    formData.append("title", title);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("categoryId", categoryId);
    formData.append("image", image);
    formData.append("fk_userID", userID);
    this.setState({ uploading: true });

    axios
      .post("http://localhost:5000/upload", formData)
      .then((response) => {
        // Redirect to the login page or handle success response
        if (response.data && response.data.redirectTo) {
          window.location.href = response.data.redirectTo; // Redirect to login page
          window.alert("Upload successful!");
        } else if (response.data.message == 1) {
          this.setState({ message: "**Title is empty" });
        } else if (response.data.message == 2) {
          this.setState({ message: "**Description is empty" });
        } else if (response.data.message == 3) {
          this.setState({ message: "**Incorrect price" });
        } else if (response.data.message == 4) {
          this.setState({
            message: "**No image selected or it's size is incorrect.",
          });
        } else if (response.data.message == 5) {
          this.setState({ message: "**No category selected" });
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      })
      .finally(() => {
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

  showCategoryList() {
    axios
      .post("http://localhost:5000/fetchCategorys")
      .then((response) => {
        const allData = response.data.AllData;
        const deepestCategories = this.getDeepestCategories(allData);
        this.setState({ allData, deepestCategories });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  renderCategoryHierarchy(categoryId, allData) {
    const category = allData.find((cat) => cat.id === categoryId);
    if (!category) return null;

    const parentHierarchy = this.renderCategoryHierarchy(
      category.tevoId,
      allData
    );

    return (
      <div key={category.id}>
        {parentHierarchy}
        {parentHierarchy && " > "}
        {category.pavadinimas}
      </div>
    );
  }

  getDeepestCategories(categories) {
    const parentIds = new Set(categories.map((category) => category.tevoId));
    return categories.filter((category) => !parentIds.has(category.id));
  }

  handleCategorySelect = (event) => {
    const categoryId = event.target.value === "" ? null : event.target.value;

    this.setState({ categoryId });
  };

  render() {
    const {
      allData,
      title,
      price,
      description,
      message,
      uploading,
      categoryId,
      deepestCategories,
    } = this.state;

    return (
      <div className="container">
        <div className="header">Skelbimo įkėlimas</div>
        {message && (
          <div className="error-message">
            <b>{message}</b>
          </div>
        )}
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
            type="number"
            name="price"
            placeholder="Kaina"
            value={price}
            onChange={this.handlePriceChange}
            className="input-field"
          />
        </div>
        <label>Kategorija:</label>
        <select onChange={this.handleCategorySelect}>
          <option value="">-</option>
          {deepestCategories.map((category) => (
            <option key={category.id} value={category.id}>
              {this.renderCategoryHierarchy(category.id, allData)}
            </option>
          ))}
        </select>
        <div>
          <input
            type="file"
            accept="image/*" // Accept only image files
            onChange={this.handleImageChange}
            className="input-field"
          />
        </div>
        {uploading && (
          <div>
            <b>Įkeliama...</b>
          </div>
        )}
        <button className="uploadClick" onClick={this.handleUpload}>
          Išsaugoti
        </button>
      </div>
    );
  }
}

export default Upload;
