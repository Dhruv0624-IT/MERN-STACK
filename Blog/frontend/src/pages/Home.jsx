import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../utils/api";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api.get("/posts")
      .then(res => setPosts(res.data))
      .catch(err => {
        console.error(err);
        setError("Failed to load posts. Please try again later.");
      })
      .finally(() => setLoading(false));
  }, []);

  const truncate = (text, n) => text.length > n ? text.slice(0, n) + "..." : text;

  if (loading) return <p className="text-center py-4">Loading posts...</p>;

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="m-0">All Blog Posts</h2>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      <div className="row g-3">
        {posts.map((post) => (
          <div className="col-12 col-md-6 col-lg-4" key={post._id}>
            <div className="card h-100 shadow-sm">
              <div className="card-body d-flex flex-column">
                <Link to={`/posts/${post._id}`} className="text-decoration-none">
                  <h5 className="card-title">{post.title}</h5>
                </Link>
                <p className="card-text flex-grow-1">{truncate(post.content, 120)}</p>
                <div className="text-muted small">
                  <strong>By:</strong> {post.author?.username || "Unknown"} •{" "}
                  {new Date(post.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric"
                  })}
                </div>
              </div>
            </div>
          </div>
        ))}

        {posts.length === 0 && !error && (
          <div className="col-12">
            <div className="alert alert-info">No posts yet. Be the first to create one!</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
