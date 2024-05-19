import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import DatePicker from "react-datepicker";
import Modal from "react-modal";
import "react-datepicker/dist/react-datepicker.css";
import "./Post.css";

// Set the app element for accessibility
Modal.setAppElement('#root');

const Post = () => {
    const { postId } = useParams();
    const [post, setPost] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [reservedDates, setReservedDates] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/post/${postId}`);
                setPost(response.data);
            } catch (error) {
                console.error("Error fetching post:", error);
            }
        };

        fetchPost();
    }, [postId]);

    useEffect(() => {
        const fetchReservedDates = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/reservations/post/${postId}`);
                setReservedDates(response.data);
            } catch (error) {
                console.error("Error fetching reserved dates:", error);
            }
        };

        fetchReservedDates();
    }, [postId]);

    const openModal = () => {
        console.log("Open modal");
        setShowModal(true);
    };

    const closeModal = () => {
        console.log("Close modal");
        setShowModal(false);
        setError("");
    };

    const handleDateChange = (dates) => {
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);
    };

    const handleSelect = async () => {
        // Check if any selected date overlaps with reserved dates
        const overlap = reservedDates.some((reservedDate) => {
            const reservedStart = new Date(reservedDate.startDate._seconds * 1000);
            const reservedEnd = new Date(reservedDate.endDate._seconds * 1000);
            return startDate <= reservedEnd && endDate >= reservedStart;
        });

        if (overlap) {
            setError("Pasirinktos datos yra užimtos. Pakeiskite pasirinkimą");
        } else {
            try {
                const response = await axios.post('http://localhost:5000/reserve', {
                    startDate,
                    endDate,
                    reservedCredits: post.price, // Example reserved credits value
                    fk_userID: "userID_example", // Replace with actual user ID
                    fk_postID: postId
                });
                console.log("Reservation successful:", response.data);
                closeModal();
            } catch (error) {
                console.error("Error creating reservation:", error);
            }
        }
    };

    return (
        <div className="container">
            <div className="post-details">
                {post ? (
                    <div className="post">
                        <h3 className="post-title">{post.title}</h3>
                        <div className="image-container">
                            <img 
                                className="post-image"
                                src={post.imageUrl} 
                                alt="Post Image" 
                            />
                        </div>
                        <div className="post-info">
                            <p className="price">Kaina: {post.price}</p>
                            <p className="description">Aprašymas: {post.description}</p>
                        </div>
                        <button className="reservation-button" onClick={openModal}>Rezervuoti</button>
                    </div>
                ) : (
                    <p>Kraunama..</p>
                )}
            </div>
            <Modal
                isOpen={showModal}
                onRequestClose={closeModal}
                contentLabel="Select Reservation Date"
                className="modal"
                overlayClassName="modal-overlay"
            >
                <h2>Pasirinkite datą</h2>
                {error && <p className="error-message">{error}</p>}
                <DatePicker
                    selected={startDate}
                    onChange={handleDateChange}
                    startDate={startDate}
                    endDate={endDate}
                    selectsRange
                    inline
                    dayClassName={(date) => {
                        const reserved = reservedDates.some((reservedDate) => {
                            const reservedStart = new Date(reservedDate.startDate._seconds * 1000);
                            const reservedEnd = new Date(reservedDate.endDate._seconds * 1000);
                            return date >= reservedStart && date <= reservedEnd;
                        });
                        return reserved ? 'reserved-date' : null;
                    }}
                />
                <button onClick={handleSelect}>Pasirinkti</button>
                <button onClick={closeModal}>Uždaryti</button>
            </Modal>
        </div>
    );
};

export default Post;