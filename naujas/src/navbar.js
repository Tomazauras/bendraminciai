import { auth } from "./App";
import React, { useState, useEffect } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/storage";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";

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


function Navbar() {
    const [loggedIn, setLoggedIn] = useState(false);
    const location = useLocation();
    const isLoginPage = location.pathname === "/login";
    const isUploadPage = location.pathname === "/upload";
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                setLoggedIn(user);
            } else {
                setLoggedIn(null);
            }
          });
      
          // Cleanup subscription on unmount
          return () => unsubscribe();
    }, []);


    const logout = async () => {
        try {
          await signOut(auth);
          navigate("/");
        } catch (err) {
          console.error(err);
        }
    };

    const goHome = async () => { 
        navigate("/");
    };
    
    return (
        
        <div>
            <button onClick={goHome}>Home</button>

            {!loggedIn && !isLoginPage && (
            <Link className="nav-item nav-link" to="/login">
                Login
            </Link>
        )}
        
        {loggedIn && (
                <button onClick={logout}>Logout</button>
        )}

        {loggedIn && !isUploadPage && (
                <Link className="nav-item nav-link" to="/upload">
                    Upload
                </Link>
            )}
        </div>

      );
  
}

export default Navbar;