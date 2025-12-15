import React, { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { FaUserCircle } from "react-icons/fa";
import styles from "./Navbar.module.css";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className={styles["modern-navbar"]}>
      <div className={styles["navbar-container"]}>
        {/* Logo */}
        <Link to="/" className={styles.logo}>
          <img
            src="https://cdn-icons-png.flaticon.com/512/906/906343.png"
            alt="logo"
            className={styles["logo-img"]}
          />
          <span className={styles["logo-text"]}>
            My<span>Blog</span>
          </span>
        </Link>

        {/* Links */}
        <ul className={styles["nav-links"]}>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? "active" : undefined)}
            >
              Home
            </NavLink>
          </li>
          {user && (
            <li>
              <NavLink
                to="/create"
                className={({ isActive }) => (isActive ? "active" : undefined)}
              >
                Create
              </NavLink>
            </li>
          )}
        </ul>

        {/* Right Section */}
        <div className={styles["nav-right"]}>
          {user ? (
            <div
              className={styles["user-dropdown"]}
              onMouseLeave={() => setMenuOpen(false)}
            >
              <button
                className={styles["user-btn"]}
                onClick={() => setMenuOpen((v) => !v)}
                aria-expanded={menuOpen}
                aria-haspopup="true"
              >
                <FaUserCircle className="me-1" /> {user.username}
              </button>
              <div
                className={`${styles["dropdown-menu"]} ${
                  menuOpen ? styles.show : ""
                }`}
                role="menu"
              >
                <Link to="/create" role="menuitem">
                  ✍️ Create Post
                </Link>
                <button onClick={logout} role="menuitem">
                  🚪 Logout
                </button>
              </div>
            </div>
          ) : (
            <div className={styles["auth-buttons"]}>
              <Link to="/login" className={styles["btn-primary"]}>
                Login
              </Link>
              <Link to="/register" className={styles["btn-outline"]}>
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
