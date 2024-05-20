import React, { useState, useEffect } from "react";
import axios from "axios";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/storage";

const firebaseConfig = {
    apiKey: "AIzaSyBSc1GHLesciWBHF_-SOXj5vjE5QANY8fI",
    authDomain: "nuomosklubas.firebaseapp.com",
    projectId: "nuomosklubas",
    storageBucket: "nuomosklubas.appspot.com",
    messagingSenderId: "844422552327",
    appId: "1:844422552327:web:bf6d8d0484b47d2e7443a2",
    measurementId: "G-XG3ES1DMDL"
};

const User = () => {
    const [userId, setUserId] = useState(null);
    const [user, setUser] = useState(null);
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
                    const response = await axios.get(`http://localhost:5000/user/${userId}`);
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

    

    const handleAppendCredits = async () => {

        try {
            const response = await axios.post(`http://localhost:5000/user/${userId}/creditsAdd`, { amount: creditAmount });
            setUser(prevUser => ({ ...prevUser, credits: response.data.updatedCredits }));
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
        <div>
            <h1>Vartotojo profilis</h1>
            <p><strong>Kreditai:</strong> {user.credits}</p>
            <p><strong>El. paštas:</strong> {user.email}</p>
            <p><strong>Vardas:</strong> {user.name}</p>
            <p><strong>Telefono numeris:</strong> {user.phoneNumber}</p>
            <div>
                <button onClick={handleAppendCredits}>Pridėti kreditų</button>
            </div>
        </div>
    );
};

export default User;
