import React, { Component } from "react";
import axios from "axios";
import { signInWithCustomToken } from "firebase/auth";
import { auth } from "../App";
import "../styles.css"; // Import the CSS file

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: ""
        };
    }

    axiosPostData() {
        const { email, password } = this.state;
        const postData = {
            email: email,
            password: password
        };
        
        axios.post('http://localhost:5000/login', postData)
            .then(response => {
                if (response.data && response.data.redirectTo) {
                    signInWithCustomToken(auth, response.data.customToken)
                        .then(() => {
                            window.location.href = response.data.redirectTo;
                        })
                        .catch(error => {
                            console.error("Error signing in:", error);
                        });
                    console.log("Email and password are correct");
                } else {
                    this.setState({ message: "**Email or password is incorrect." });
                    console.log("Email or password is incorrect");
                }
            })
            .catch(error => {
                console.error("Error logging in:", error);
            });
    }

   

    handleEmailChange = (e) => {
        this.setState({ email: e.target.value });
    };

    handlePasswordChange = (e) => {
        this.setState({ password: e.target.value });
    };

    handleLogin = () => {
        this.axiosPostData();
    };

    render() {
      const {
        email,
        password,
        message
      } = this.state;

        return (
          
            <div className="container">
              <div className="header">Prisijungti</div>
              {message && <div className="error-message"><b>{message}</b></div>} {/* Render the message if it exists */}
                <div>
                <input
                    name="email"
                    type="text"
                    placeholder="El. paštas"
                    value={email}
                    onChange={this.handleEmailChange}
                    className="input-field"
                />
                </div>
                <div>
                <input
                    name="password"
                    placeholder="Slaptažodis"
                    type="password"
                    value={password}
                    onChange={this.handlePasswordChange}
                    className="input-field"
                />
                </div>
                <button className="signupClick" onClick={this.handleLogin}>Prisijungti</button>
            </div>
        );
    }
}

export default Login;