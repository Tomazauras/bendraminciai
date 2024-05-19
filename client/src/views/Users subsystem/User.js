import React, { useState, useEffect } from "react";
import axios from "axios";

const User = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [creditAmount, setCreditAmount] = useState(100); // Default amount to append

    useEffect(() => {
        const userId = localStorage.getItem('userId');

        const fetchUser = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/user/${userId}`);
                setUser(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching user:", error);
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    const handleAppendCredits = async () => {
        const userId = localStorage.getItem('userId');

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
