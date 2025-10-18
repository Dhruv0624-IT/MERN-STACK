import { Link, useLocation } from 'react-router-dom';

export default function Nav() {
  const location = useLocation();

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "12px 24px",
        background: "linear-gradient(90deg, #4f46e5, #3b82f6)",
        color: "white",
        fontFamily: "Segoe UI, sans-serif",
        boxShadow: "0 2px 6px rgba(0,0,0,0.15)"
      }}
    >
      <div style={{ fontWeight: "bold", fontSize: "18px" }}>
         Book Store
      </div>

     
      <div>
        <Link
          to="/"
          style={{
            marginRight: 16,
            textDecoration: "none",
            color: location.pathname === "/" ? "#ffea00" : "white",
            fontWeight: location.pathname === "/" ? "bold" : "normal"
          }}
        >
          Books
        </Link>
        <Link
          to="/books/new"
          style={{
            textDecoration: "none",
            color: location.pathname === "/books/new" ? "#ffea00" : "white",
            fontWeight: location.pathname === "/books/new" ? "bold" : "normal"
          }}
        >
          Add Book
        </Link>
      </div>
    </nav>
  );
}
