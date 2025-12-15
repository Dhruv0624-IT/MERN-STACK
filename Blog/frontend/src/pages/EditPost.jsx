import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../utils/api";
import { AuthContext } from "../context/AuthContext";

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Redirect if not logged in
  useEffect(() => {
    if (!user) navigate("/login");
  }, [user, navigate]);

  // Fetch post details
  useEffect(() => {
    if (!user) return;

    const fetchPost = async () => {
      try {
        const { data } = await api.get(`/posts/${id}`);
        setTitle(data.title);
        setContent(data.content);
      } catch {
        setError("Failed to load post details.");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id, user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/posts/${id}`, { title, content });
      navigate(`/posts/${id}`);
    } catch {
      setError("Update failed. Please try again.");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="container py-5">
      <h2>Edit Post</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit} className="vstack gap-3">
        <input
          type="text"
          className="form-control"
          value={title}
          placeholder="Title"
          onChange={(e) => { setTitle(e.target.value); setError(""); }}
          required
        />
        <textarea
          rows="8"
          className="form-control"
          value={content}
          placeholder="Write your post..."
          onChange={(e) => { setContent(e.target.value); setError(""); }}
          required
        />
        <button type="submit" className="btn btn-primary">Save Changes</button>
      </form>
    </div>
  );
};

export default EditPost;
