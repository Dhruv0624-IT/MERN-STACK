import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import api from "../utils/api";
import { AuthContext } from "../context/AuthContext";
import { ToastContext } from "../context/ToastContext";

const PostDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { showToast } = useContext(ToastContext);

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
        await api.delete(`/posts/${id}`, {
          headers: user ? { Authorization: `Bearer ${user.token}` } : {}
        });
        showToast("success", "Post deleted successfully");
        navigate("/");
      } catch (err) {
        setError("Failed to delete post.");
      }
    }
  };

  if (loading) return <div className="alert alert-info text-center">Loading...</div>;
  if (error) return <div className="alert alert-danger text-center">{error}</div>;

  return (
    <div className="container py-4">
      <h2>{post.title}</h2>
      <p className="text-muted">
        {new Date(post.createdAt).toLocaleString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit"
        })}
      </p>
      <p>{post.content}</p>

      {user && user._id === post.author?._id && (
        <div className="mt-3">
          <Link to={`/edit/${post._id}`} className="btn btn-warning me-2">Edit</Link>
          <button onClick={handleDelete} className="btn btn-danger">Delete</button>
        </div>
      )}
    </div>
  );
};

export default PostDetails;
