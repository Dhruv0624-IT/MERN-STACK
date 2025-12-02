import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../utils/api";

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    api.get("/posts").then(res => setPosts(res.data)).catch(console.error);
  }, []);

  return (
<<<<<<< HEAD
    <div className="container">
      <h2>All Blog Posts</h2>
      {posts.map((post) => (
        <div key={post._id} className="post-card">
          <Link to={`/posts/${post._id}`}><h3>{post.title}</h3></Link>
          <p>{post.content.substring(0, 100)}...</p>
          <div className="post-meta">
            <b>By:</b> {post.author?.username || "Unknown"} • {new Date(post.createdAt).toLocaleDateString()}
          </div>
        </div>
      ))}
=======
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="m-0">All Blog Posts</h2>
      </div>
      <div className="row g-3">
        {posts.map((post) => (
          <div className="col-12 col-md-6 col-lg-4" key={post._id}>
            <div className="card h-100 shadow-sm">
              <div className="card-body d-flex flex-column">
                <Link to={`/posts/${post._id}`} className="text-decoration-none"><h5 className="card-title">{post.title}</h5></Link>
                <p className="card-text flex-grow-1">{post.content.substring(0, 120)}...</p>
                <div className="text-muted small">
                  <strong>By:</strong> {post.author?.username || "Unknown"} • {new Date(post.createdAt).toLocaleDateString()}
                </div>
              </div>
            </div>
          </div>
        ))}
        {posts.length === 0 && (
          <div className="col-12">
            <div className="alert alert-info">No posts yet. Be the first to create one!</div>
          </div>
        )}
      </div>
>>>>>>> bf97954 (updated Back-End Projects)
    </div>
  );
};

export default Home;
