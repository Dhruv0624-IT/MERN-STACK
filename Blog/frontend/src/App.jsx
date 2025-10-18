import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

// Pages
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import EditPost from "./pages/EditPost";
import PostDetails from "./pages/PostDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";

import "./index.css"; // global styling

const App = () => {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <div className="page-container">
          <Routes>
            {/* Homepage - list of all blog posts */}
            <Route path="/" element={<Home />} />

            {/* Authentication routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Create new blog post */}
            <Route path="/create" element={<CreatePost />} />

            {/* View single post */}
            <Route path="/posts/:id" element={<PostDetails />} />

            {/* Edit existing post */}
            <Route path="/edit/:id" element={<EditPost />} />

            {/* Fallback route */}
            <Route
              path="*"
              element={
                <div className="container">
                  <h2>404 - Page Not Found</h2>
                  <p>The page you're looking for doesn't exist.</p>
                </div>
              }
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
