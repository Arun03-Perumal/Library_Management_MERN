import axios from "axios";

const API = axios.create({
  baseURL: "https://library-backend-qzqr.onrender.com/api"
});

// Get all books
export const getBooks = () => API.get("/books");

// Add book
export const addBook = (book) => API.post("/books", book);

// Update book
export const updateBook = (id, book) => API.put(`/books/${id}`, book);

// Delete book
export const deleteBook = (id) => API.delete(`/books/${id}`);
