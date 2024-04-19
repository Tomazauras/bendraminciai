import React, { Component } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/storage";
import { Link } from "react-router-dom";
import axios from "axios";
import "../styles.css"; // Import the CSS file

const firebaseConfig = {
    apiKey: "AIzaSyBSc1GHLesciWBHF_-SOXj5vjE5QANY8fI",
    authDomain: "nuomosklubas.firebaseapp.com",
    projectId: "nuomosklubas",
    storageBucket: "nuomosklubas.appspot.com",
    messagingSenderId: "844422552327",
    appId: "1:844422552327:web:bf6d8d0484b47d2e7443a2",
    measurementId: "G-XG3ES1DMDL"
};

firebase.initializeApp(firebaseConfig);


class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
          loggedIn: false,
        };
      }

      componentDidMount() {
        // Check if the user is logged in when the component mounts
        this.checkLoggedIn();
    }

    checkLoggedIn() {
      
        axios.get("http://localhost:5000/checkLoggedIn")
            .then(response => {
              console.log(response.data);
                const { loggedIn } = response.data;
                this.setState({ loggedIn });
            })
            .catch(error => {
                console.error("Error checking login status:", error);
                console.log("NACHUI");
            });
    }
      


    goHome() { 
        axios.post("http://localhost:5000/toHome")
        .then(response => {
            // Redirect to the signup view URL received from the server
            window.location.href = response.data.redirectTo;
        })
        .catch(error => {
            console.error("Error:", error);
        });
    };
    
    openUserSignUpWindow() {
        axios.post("http://localhost:5000/signupOpen")
        .then(response => {
            // Redirect to the signup view URL received from the server
            window.location.href = response.data.redirectTo;
        })
        .catch(error => {
            console.error("Error:", error);
        });
    };

    openUserLoginpWindow() {
      axios.post("http://localhost:5000/loginOpen")
      .then(response => {
          // Redirect to the signup view URL received from the server
          window.location.href = response.data.redirectTo;
      })
      .catch(error => {
          console.error("Error:", error);
      });
  };

  handleLogout() {
    firebase.auth().signOut()
        .then(() => {
            // Sign-out successful.
            console.log('User signed out successfully');
        })
        .catch((error) => {
            // An error happened.
            console.error('Error signing out:', error);
        });
  };



    render() {
        const { loggedIn } = this.state;

        return (
          <div className="background">
            
              <div>
                  <button className="button home" onClick={this.goHome}>Home</button>
                  <div className="buttons">
                      {!loggedIn && (
                          <button className="button login" onClick={this.openUserLoginpWindow}>
                            LogIn
                          </button>
                      )}
                      {!loggedIn && (
                          <button className="button signup" onClick={this.openUserSignUpWindow}>
                            SignUp
                          </button>
                      )}
                      {loggedIn && (
                          <button className="button logout" onClick={this.handleLogout}>
                            LogOut
                          </button>
                      )}
                  </div>
              </div>

          </div>
      );
      };
  
}

export default Main;