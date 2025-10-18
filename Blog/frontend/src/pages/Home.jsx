import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../utils/api";

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    api.get("/posts").then(res => setPosts(res.data)).catch(console.error);
  }, []);

  return (
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
    </div>
  );
};

export default Home;
