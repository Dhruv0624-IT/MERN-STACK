import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import api from "../utils/api";
import { AuthContext } from "../context/AuthContext";

const PostDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const { data } = await api.get(`/posts/${id}`);
        setPost(data);
      } catch (err) {
        setError("Post not found or failed to load.");
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        await api.delete(`/posts/${id}`);
        navigate("/");
      } catch (err) {
        setError("Failed to delete post.");
      }
    }
  };

  if (loading) return <p className="loading">Loading...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="container">
      <h2>{post.title}</h2>
      <p className="date">{new Date(post.createdAt).toLocaleString()}</p>
      <p className="content">{post.content}</p>

      {user && user._id === post.author?._id && (
        <div className="actions">
          <Link to={`/edit/${post._id}`} className="btn edit"> Edit</Link>
          <button onClick={handleDelete} className="btn delete"> Delete</button>
        </div>
      )}
    </div>
  );
};

export default PostDetails;
