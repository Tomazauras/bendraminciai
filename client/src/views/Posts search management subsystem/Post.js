import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../Post.css";

const Post = () => {
    const { postId } = useParams();
    const [post, setPost] = useState(null);

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
                        <button className="reservation-button">Rezervuoti</button>
                    </div>
                ) : (
                    <p>Kraunama..</p>
                )}
            </div>
        </div>
    );
};

export default Post;
