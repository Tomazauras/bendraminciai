import React, { Component } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/storage";
import { Link } from "react-router-dom";
import axios from "axios";
import "../../styles.css"; 

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
          loading: true,
          curentUserType: null
        };
      }

      componentDidMount() {

      // Check if the user is logged in when the component mounts
      this.checkLoggedIn();

    }

    getCurrentUserType(uid) {
      axios.post("http://localhost:5000/userType", { id: uid })
        .then(response => {
          const curentUserType = response.data.Alldata;
          this.setState({ curentUserType });
        })
        .catch(error => {
          console.error("Error:", error);
        });
    }

     checkLoggedIn() {
        // Check Firebase Authentication for user authentication status
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                const userId = firebase.auth().currentUser.uid;
                this.getCurrentUserType(userId);
                // User is signed in.
                this.setState({ loggedIn: true, loading: false });
                
            } else {
                // No user is signed in.
                this.setState({ loggedIn: false, loading: false });
            }
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
    
    openRegisterPage() {
        axios.post("http://localhost:5000/signupOpen")
        .then(response => {
            // Redirect to the signup view URL received from the server
            window.location.href = response.data.redirectTo;
        })
        .catch(error => {
            console.error("Error:", error);
        });
    };

    openLoginPage() {
      axios.post("http://localhost:5000/loginOpen")
      .then(response => {
          // Redirect to the signup view URL received from the server
          window.location.href = response.data.redirectTo;
      })
      .catch(error => {
          console.error("Error:", error);
      });
  };

  openUserUploadWindow() {
    axios.post("http://localhost:5000/uploadOpen")
    .then(response => {
        // Redirect to the signup view URL received from the server
        window.location.href = response.data.redirectTo;
    })
    .catch(error => {
        console.error("Error:", error);
    });
};

  handleLogout() {
    const data = {
        uid: firebase.auth().currentUser.uid
    }
    axios.post("http://localhost:5000/logout", data)
    .then(response => {
      // Redirect to the login page or handle success response
      
      window.location.href = response.data.redirectTo; // Redirect to login page
    })
    .catch(error => {
        
      console.error("Error:", error);
    });
  };

  openCategoryList() {
    axios.post("http://localhost:5000/openCategorys")
    .then(response => {
        
        window.location.href = response.data.redirectTo;
      })
      .catch(error => {
        console.error("Error:", error);
      });
  };

  showCategoryList() {
    axios.post("http://localhost:5000/openCategorysList")
    .then(response => {
        
        window.location.href = response.data.redirectTo;
      })
      .catch(error => {
        console.error("Error:", error);
      });
  };

  


    render() {
        const { loggedIn, loading, curentUserType  } = this.state;
      
        return (
          <div className="background">
            
              <div>
                  <button className="button home" onClick={this.goHome}>Pradžia</button>
                  <div className="buttons">
                  {curentUserType == "admin" && (
                          <button className="button login" onClick={this.openCategoryList}>
                            Kurti kategorijas
                          </button>
                          )}
                          {loggedIn && (
                            <>
                                <Link to="/profile">
                                    <button className="button profile">
                                        Profilis
                                    </button>
                                </Link>
                            </>
                        )}
                          <button className="button login" onClick={this.showCategoryList}>
                            Rodyti kategorijas
                          </button>
                      {!loggedIn && !loading && (
                          <button className="button login" onClick={this.openLoginPage}>
                            Prisijungti
                          </button>
                      )}

                      {!loggedIn && !loading && (
                          <button className="button signup" onClick={this.openRegisterPage}>
                            Registruotis
                          </button>
                      )}
                      
                      {loggedIn && (
                          <button className="button upload" onClick={this.openUserUploadWindow}>
                            Įkelti skelbimą
                          </button>
                      )}
                      {loggedIn && (
                          <button className="button logout" onClick={this.handleLogout}>
                            Atsijungti
                          </button>
                      )}
                  </div>
              </div>

          </div>
      );
      };
  
}

export default Main;