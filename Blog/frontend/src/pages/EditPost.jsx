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
  React.useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const { data } = await api.get(`/posts/${id}`);
        setTitle(data.title);
        setContent(data.content);
      } catch (err) {
        setError("Failed to load post details.");
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/posts/${id}`, { title, content });
      navigate(`/posts/${id}`);
    } catch (err) {
      setError("Update failed. Please try again.");
    }
  };

  if (loading) return <p className="loading">Loading...</p>;

  return (
    <div className="container">
      <h2>Edit Post</h2>
      {error && <p className="error">{error}</p>}
      <form className="form" onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          placeholder="Title"
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          rows="8"
          value={content}
          placeholder="Write your post..."
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <button type="submit" className="btn">Save Changes</button>
      </form>
    </div>
  );
};

export default EditPost;
