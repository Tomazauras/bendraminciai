import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "../../styles.css"; // Import the CSS file

const PostsByCategory = () => {
    const { categoryId } = useParams(); // Get categoryId from URL params
    const [posts, setPosts] = useState([]);
    const [message, setMessage] = useState(null); 
    const [categoryName, setCategoryName] = useState(null); 
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        

        const fetchPost = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/getPostsByCategory/${categoryId}`);
                if (response.data.message != null){
                    setMessage(response.data.message);
                    setCategoryName(response.data.categoryName);
                    setLoading(false);
                    
                }
                const { categoryName, posts } = response.data;
                setPosts(posts);
                setCategoryName(categoryName);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching post:", error);
            }
        };
        fetchPost();
    }, [categoryId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container">
            <div className="header">Skelbimai pagal kategoriją: {categoryName}</div>
            {message && <div className="error-message"><b>{message}</b></div>}
            <div className="post-list">
                {message == null && posts.map(post => (
                    <Link to={`/post/${post.id}`} key={post.id}>
                        <div className="post-wrapper"> {/* New div to wrap each post */}
                            <div className="posts"> {/* Add a border around each post */}
                                <h3>{post.title}</h3>
                                <img src={post.imageUrl} alt="Post Image" style={{ maxWidth: "50%", maxHeight: "auto" }}/>
                                <p>Kaina: {post.price}</p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default PostsByCategory;
