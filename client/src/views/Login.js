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
    
    axiosPostData = async () => {
        const { email, password } = this.state;
        const postData = {
            email: email,
            password: password
        };
        
        try {
          const response = await axios.post('http://localhost:5000/login', postData);
          if (response.data && response.data.redirectTo) {
              signInWithCustomToken(auth, response.data.customToken)
              window.location.href = response.data.redirectTo;
              
              console.log("Email and password is correct");
          } else {
              
              this.setState({ message: "**Email or password is incorrect." });
              console.log("Email or password is incorrect");
          }
        } catch (error) {
          console.error(error);
        }

       
    };

   

    handleEmailChange = (e) => {
        this.setState({ email: e.target.value });
    };

    handlePasswordChange = (e) => {
        this.setState({ password: e.target.value });
    };

    render() {
      const {
        email,
        password,
        message
      } = this.state;

        return (
          
            <div className="container">
              <div className="header">LOG IN</div>
              {message && <div className="error-message"><b>{message}</b></div>} {/* Render the message if it exists */}
                <div>
                <input
                    name="email"
                    type="text"
                    placeholder="Email..."
                    value={email}
                    onChange={this.handleEmailChange}
                    className="input-field"
                />
                </div>
                <div>
                <input
                    name="password"
                    placeholder="Password..."
                    type="password"
                    value={password}
                    onChange={this.handlePasswordChange}
                    className="input-field"
                />
                </div>
                <button className="signupClick" onClick={this.axiosPostData}>Log in</button>
            </div>
        );
    }
}

export default Login;