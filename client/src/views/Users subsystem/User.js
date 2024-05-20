import React, { useState, useEffect } from "react";
import axios from "axios";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/storage";
import { Link } from "react-router-dom";

const firebaseConfig = {
  apiKey: "AIzaSyBSc1GHLesciWBHF_-SOXj5vjE5QANY8fI",
  authDomain: "nuomosklubas.firebaseapp.com",
  projectId: "nuomosklubas",
  storageBucket: "nuomosklubas.appspot.com",
  messagingSenderId: "844422552327",
  appId: "1:844422552327:web:bf6d8d0484b47d2e7443a2",
  measurementId: "G-XG3ES1DMDL",
};

const User = () => {
  const [userId, setUserId] = useState(null);
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [creditAmount, setCreditAmount] = useState(100); // Default amount to append

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        const userId = firebase.auth().currentUser.uid;
        setUserId(userId);
      } else {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      if (userId) {
        try {
          const response = await axios.get(
            `http://localhost:5000/user/${userId}`
          );
          setUser(response.data);
        } catch (error) {
          console.error("Error fetching user:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchUser();
  }, [userId]);

  useEffect(() => {
    const fetchUserPosts = async () => {
      if (userId) {
        try {
          const response = await axios.get(
            `http://localhost:5000/getPostsByUID`,
            { params: { userID: userId } } // Use params to pass query parameters
          );
          setPosts(response.data.posts); // Assuming response.data contains the posts array
        } catch (error) {
          console.error("Error fetching user posts:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchUserPosts();
  }, [userId]);

  const handleAppendCredits = async () => {
    try {
      const response = await axios.post(
        `http://localhost:5000/user/${userId}/creditsAdd`,
        { amount: creditAmount }
      );
      setUser((prevUser) => ({
        ...prevUser,
        credits: response.data.updatedCredits,
      }));
    } catch (error) {
      console.error("Error appending credits:", error);
    }
  };

  if (loading) {
    return <div>Kraunama...</div>;
  }

  if (!user) {
    return <div>Klaida kraunant vartotojo duomenis.</div>;
  }

  return (
    <div
      style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "20px" }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "0px",
        }}
      >
        <h1>Vartotojo profilis</h1>
        <p>
          <strong>Kreditai:</strong> {user.credits}
        </p>
        <p>
          <strong>El. paštas:</strong> {user.email}
        </p>
        <p>
          <strong>Vardas:</strong> {user.name}
        </p>
        <p>
          <strong>Telefono numeris:</strong> {user.phoneNumber}
        </p>
        <div>
          <button onClick={handleAppendCredits}>Pridėti kreditų</button>
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
            gap: "20px",
            maxWidth: "800px",
          }}
        >
          {posts.length > 0 ? (
            posts.map((post) => (
              <Link
                to={`/post/${post.id}`}
                key={post.id}
                style={{
                  textDecoration: "none",
                  color: "inherit",
                  border: "none",
                  display: "block",
                  transition: "transform 0.2s",
                }}
              >
                <div
                  style={{
                    padding: "10px",
                    textAlign: "center",
                  }}
                >
                  <h3>{post.title}</h3>
                  <img
                    src={post.imageUrl}
                    alt="Post Image"
                    style={{
                      maxWidth: "100%",
                      height: "auto",
                      borderRadius: "5px",
                    }}
                  />
                  <p>{post.description}</p>
                  <p>Kaina: {post.price}</p>
                </div>
              </Link>
            ))
          ) : (
            <p>No posts available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default User;
