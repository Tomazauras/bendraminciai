// Import the functions you need from the SDKs you need
import React, { Component } from "react";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore} from "firebase/firestore";
import Main from "./views/Main";
import Home from "./views/Home";
import Login from "./views/Login";
import Upload from "./views/Upload";
import SignUp from "./views/SignUp";
import Post from "./views/Post";
import User from "./views/User"
import CategoryList from "./views/Administration subsystem/CategoryList";
import CategoryView from "./views/Posts search management subsystem/Categorys";
import PostsByCategory from "./views/Posts search management subsystem/PostsByCategory";

import { Route, Routes, useParams } from "react-router-dom";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBSc1GHLesciWBHF_-SOXj5vjE5QANY8fI",
  authDomain: "nuomosklubas.firebaseapp.com",
  projectId: "nuomosklubas",
  storageBucket: "nuomosklubas.appspot.com",
  messagingSenderId: "844422552327",
  appId: "1:844422552327:web:bf6d8d0484b47d2e7443a2",
  measurementId: "G-XG3ES1DMDL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
class App extends Component {
  render() {
    return (
      <>
        <Main />
        <div className="App">
          {/* Responsible for routing user to different pages, to add a new path copy paste Route line and change 'path', 'element' values
          additional changes need to be made by adding 'Link' to buttons (see navbar.jsx) */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="/post/:postId" element={<Post />} />
            <Route path="/profile" element={<User />} />
            <Route path="/categorys" element={<CategoryList />} />
            <Route path="/categorysList" element={<CategoryView />} />
            <Route path="/category/:categoryId" element={<PostsByCategory />} />

          </Routes>
        </div>
      </>
    );
  }
}

export default App;