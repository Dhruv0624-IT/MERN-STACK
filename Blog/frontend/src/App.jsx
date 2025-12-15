import React, { Suspense, useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import { AuthContext } from "./context/AuthContext";
import "./index.css";

// Lazy-loaded pages
const Home = React.lazy(() => import("./pages/Home"));
const CreatePost = React.lazy(() => import("./pages/CreatePost"));
const EditPost = React.lazy(() => import("./pages/EditPost"));
const PostDetails = React.lazy(() => import("./pages/PostDetails"));
const Login = React.lazy(() => import("./pages/Login"));
const Register = React.lazy(() => import("./pages/Register"));
const VerifyOTP = React.lazy(() => import("./pages/VerifyOTP"));

// Loader component
const Loader = () => (
  <div className="container py-5 text-center">
    <div className="spinner-border text-primary" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  </div>
);

// Protected Route wrapper
const PrivateRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  return user ? children : <Navigate to="/login" replace />;
};

const App = () => {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <div className="page-container">
          <Suspense fallback={<Loader />}>
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/verify-otp" element={<VerifyOTP />} />
              <Route path="/posts/:id" element={<PostDetails />} />

              {/* Protected routes */}
              <Route
                path="/create"
                element={
                  <PrivateRoute>
                    <CreatePost />
                  </PrivateRoute>
                }
              />
              <Route
                path="/edit/:id"
                element={
                  <PrivateRoute>
                    <EditPost />
                  </PrivateRoute>
                }
              />

              {/* Fallback 404 route */}
              <Route
                path="*"
                element={
                  <div className="container py-5">
                    <h2>404 - Page Not Found</h2>
                    <p>The page you're looking for doesn't exist.</p>
                  </div>
                }
              />
            </Routes>
          </Suspense>
        </div>
      </div>
    </Router>
  );
};

export default App;
