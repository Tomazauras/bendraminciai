import React, { Component } from "react";
import { Link } from "react-router-dom";
import { auth } from "../App";
import axios from "axios";
import "../styles.css"; // Import the CSS file
class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            posts: []
        };
    }

    componentDidMount() {
        axios.post('http://localhost:5000/getPosts') // Assuming the server endpoint is '/api/posts'
            .then(response => {
                this.setState({ posts: response.data });
            })
            .catch(error => {
                console.error("Error fetching p:", error);
            });
    }
    
    render() {
        const { posts } = this.state;
        return (
            <div className="container">
                <div className="header">HOME PAGE</div>
                <div className="post-list">
                    {posts.map(post => (
                        <Link to={`/post/${post.id}`} key={post.id}>
                            <div className="post-wrapper"> {/* New div to wrap each post */}
                                <div className="post"> {/* Add a border around each post */}
                                    <h3>{post.title}</h3>
                                    <img src={post.imageUrl} alt="Post Image" style={{ maxWidth: "50%", maxHeight: "auto" }}/>
                                    <p>Price: {post.price}</p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        );
    }
}

export default Home;