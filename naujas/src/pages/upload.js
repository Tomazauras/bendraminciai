import React, { useState } from "react";
import { db, auth, storage } from "../App";
import { useNavigate } from "react-router-dom";
import {
    getDocs,
    collection,
    addDoc,
    deleteDoc,
    updateDoc,
    doc,
  } from "firebase/firestore";

function Upload() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const skelbimuKolekcijaRef = collection(db, "skelbimai");
    const navigate = useNavigate();

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    };

    const handlePriceChange = (event) => {
        setPrice(event.target.value);
    };


    const onSubmit = async () => {
        await addDoc(skelbimuKolekcijaRef, {
            pavadinimas: title,
            aprašymas: description, 
            kaina: price
        });
        navigate("/");
    };

    return (
        <div style={{ textAlign: 'center' }}>
            <h1>UPLOAD PAGE</h1>
            <div>
                <div>
                    <label>Pavadinimas:</label>
                    <input type="text" value={title} onChange={handleTitleChange} />
                </div>
                <div>
                    <label>Aprašymas:</label>
                    <textarea value={description} onChange={handleDescriptionChange} />
                </div>
                <div>
                    <label>Kaina:</label>
                    <input type="text" value={price} onChange={handlePriceChange} />
                </div>
                <button onClick={onSubmit}>Išsaugoti</button>
            </div>
        </div>
    );
}

export default Upload;
