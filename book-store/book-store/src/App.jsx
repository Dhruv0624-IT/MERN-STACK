import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import BookList from "./pages/BookList";
import BookForm from "./pages/BookForm";
import BookDetails from "./pages/BookDetails";
import Nav from "./components/Nav";

export default function App() {
  return (
    <div>
      <Nav />
      <div style={{ padding: 20 }}>
        <Routes>
          <Route path="/" element={<Navigate to="/books" replace />} />
          <Route path="/books" element={<BookList />} />
          <Route path="/books/new" element={<BookForm />} />
          <Route path="/books/edit/:id" element={<BookForm />} />
          <Route path="/books/:id" element={<BookDetails />} />
          <Route path="*" element={<h2>Page Not Found</h2>} />
        </Routes>
      </div>
    </div>
  );
}
