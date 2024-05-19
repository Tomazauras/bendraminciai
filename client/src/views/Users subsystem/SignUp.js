import React, { Component } from "react";
import axios from "axios";
import "../../styles.css"; 

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            confirmPassword: "",
            name: "",
            surname: "",
            personalCode: "",
            userType: "user",
            isBlocked: false,
            phoneNumber: "",
            credits: 0
        };
    }

    handleInputChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleSignUp = async () => {
        try {
            const {
                name,
                surname,
                personalCode,
                phoneNumber,
                email,
                password,
                confirmPassword,
                userType,
                isBlocked,
                credits
            } = this.state;

            // Send user registration data to the server
            const response = await axios.post("http://localhost:5000/signup", {
                name,
                surname,
                personalCode,
                phoneNumber,
                email,
                password,
                confirmPassword,
                userType,
                isBlocked,
                credits
            });

            // Check if the response contains a redirect URL
            if (response.data && response.data.redirectTo) {
                // Redirect to the URL received from the server
                window.location.href = response.data.redirectTo;
            } else {
                console.error("Invalid redirect URL");
            }

            // Handle successful sign-up (e.g., display success message)
            console.log("User signed up successfully");
        } catch (error) {
            // Handle sign-up error
            console.error("Error signing up:", error);

            if (error.response && error.response.data && error.response.data.error) {
                this.setState({ message: error.response.data.error });
            } else {
                this.setState({ message: "**Failed to sign up. Please try again." });
            }
        }
    };

    render() {
        const {
            name,
            surname,
            personalCode,
            phoneNumber,
            email,
            password,
            confirmPassword,
            message
        } = this.state;

        return (
            <div className="container">
                <div className="header">Registracija</div>
                {message && <div className="error-message"><b>{message}</b></div>} {/* Render the message if it exists */}
                <div>
                    <input
                        type="text"
                        name="name"
                        placeholder="Vardas"
                        value={name}
                        onChange={this.handleInputChange}
                        className="input-field"
                    />
                </div>
                <div>
                    <input
                        type="text"
                        name="surname"
                        placeholder="Pavardė"
                        value={surname}
                        onChange={this.handleInputChange}
                        className="input-field"
                    />
                </div>
                <div>
                    <input
                        type="text"
                        name="personalCode"
                        placeholder="Asmens kodas"
                        value={personalCode}
                        onChange={this.handleInputChange}
                        className="input-field"
                    />
                </div>
                <div>
                    <input
                        type="text"
                        name="phoneNumber"
                        placeholder="Telefono numeris"
                        value={phoneNumber}
                        onChange={this.handleInputChange}
                        className="input-field"
                    />
                </div>
                <div>
                    <input
                        type="email"
                        name="email"
                        placeholder="El. paštas"
                        value={email}
                        onChange={this.handleInputChange}
                        className="input-field"
                    />
                </div>
                <div>
                    <input
                        type="password"
                        name="password"
                        placeholder="Slaptažodis"
                        value={password}
                        onChange={this.handleInputChange}
                        className="input-field"
                    />
                </div>
                <div>
                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Patvirtinti slaptažodį"
                        value={confirmPassword}
                        onChange={this.handleInputChange}
                        className="input-field"
                    />
                </div>
                <button className="signupClick" onClick={this.handleSignUp}>Sign Up</button>
            </div>
        );
    }
}

export default SignUp;