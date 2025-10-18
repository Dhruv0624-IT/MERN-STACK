<<<<<<< HEAD
import axios from "axios";

//  Base URL points to backend API
const API = axios.create({
  baseURL: (import.meta.env.VITE_API_URL || "http://localhost:5000") + "/api"
});

export const getBooks = (params) => API.get("/books", { params }).then(r => r.data);
export const getBook = (id) => API.get(`/books/${id}`).then(r => r.data);
export const createBook = (payload) => API.post("/books", payload).then(r => r.data);
export const updateBook = (id, payload) => API.put(`/books/${id}`, payload).then(r => r.data);
export const deleteBook = (id) => API.delete(`/books/${id}`).then(r => r.data);
=======
import axios from "axios";

//  Base URL points to backend API
const API = axios.create({
  baseURL: (import.meta.env.VITE_API_URL || "http://localhost:5000") + "/api"
});

export const getBooks = (params) => API.get("/books", { params }).then(r => r.data);
export const getBook = (id) => API.get(`/books/${id}`).then(r => r.data);
export const createBook = (payload) => API.post("/books", payload).then(r => r.data);
export const updateBook = (id, payload) => API.put(`/books/${id}`, payload).then(r => r.data);
export const deleteBook = (id) => API.delete(`/books/${id}`).then(r => r.data);
>>>>>>> 5537394c1179184fef942c783d9e1af1aeb1d7eb
