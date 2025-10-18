import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const location = useLocation(); // gives current route path
  const { user, logout } = useContext(AuthContext);

  return (
    <nav
      style={{
        backgroundColor: "#007bff",
        color: "white",
        padding: "0.8rem 2rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <h1 style={{ fontSize: "1.5rem", fontWeight: "bold", margin: 0 }}>
        📝 My Blog
      </h1>

      <div>
        <Link
          to="/"
          style={{
            color: "white",
            textDecoration:
              location.pathname === "/" ? "underline" : "none",
            marginRight: "1.2rem",
            fontWeight: 500,
          }}
        >
          Home
        </Link>

        {user ? (
          <>
            <Link
              to="/create"
              style={{
                color: "white",
                textDecoration:
                  location.pathname === "/create" ? "underline" : "none",
                marginRight: "1.2rem",
                fontWeight: 500,
              }}
            >
              Create Post
            </Link>
            <span style={{ marginRight: "1.2rem", color: "white" }}>
              Welcome, {user.username}
            </span>
            <button
              onClick={logout}
              style={{
                backgroundColor: "transparent",
                color: "white",
                border: "1px solid white",
                padding: "0.5rem 1rem",
                borderRadius: "4px",
                cursor: "pointer",
                fontWeight: 500,
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              style={{
                color: "white",
                textDecoration:
                  location.pathname === "/login" ? "underline" : "none",
                marginRight: "1.2rem",
                fontWeight: 500,
              }}
            >
              Login
            </Link>
            <Link
              to="/register"
              style={{
                color: "white",
                textDecoration:
                  location.pathname === "/register" ? "underline" : "none",
                fontWeight: 500,
              }}
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
