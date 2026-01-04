import { useEffect, useState } from "react";
import { getBooks, addBook, deleteBook, updateBook } from "./services/api";

function App() {
  const [books, setBooks] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    category: "",
    publishedYear: "",
    availableCopies: ""
  });

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await getBooks();
      setBooks(response.data);
    } catch (error) {
      console.error("Error fetching books", error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      publishedYear: Number(formData.publishedYear),
      availableCopies: Number(formData.availableCopies)
    };

    try {
      if (editingId) {
        await updateBook(editingId, payload);
      } else {
        await addBook(payload);
      }

      setFormData({
        title: "",
        author: "",
        category: "",
        publishedYear: "",
        availableCopies: ""
      });
      setEditingId(null);
      fetchBooks();
    } catch (error) {
      console.error("Error saving book", error);
    }
  };

  const handleEdit = (book) => {
    setEditingId(book._id);
    setFormData({
      title: book.title,
      author: book.author,
      category: book.category,
      publishedYear: book.publishedYear,
      availableCopies: book.availableCopies
    });
  };

  const handleDelete = async (id) => {
    try {
      await deleteBook(id);
      fetchBooks();
    } catch (error) {
      console.error("Error deleting book", error);
    }
  };

  return (
    <div className="container">
      <h1>📚 Library Management System</h1>

      <h2>{editingId ? "Edit Book" : "Add Book"}</h2>

      <form onSubmit={handleSubmit}>
        <input
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          required
        />

        <input
          name="author"
          placeholder="Author"
          value={formData.author}
          onChange={handleChange}
          required
        />

        <input
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
          required
        />

        <input
          name="publishedYear"
          type="number"
          placeholder="Published Year"
          value={formData.publishedYear}
          onChange={handleChange}
          required
        />

        <input
          name="availableCopies"
          type="number"
          placeholder="Available Copies"
          value={formData.availableCopies}
          onChange={handleChange}
          required
        />

        <button type="submit">
          {editingId ? "Update Book" : "Add Book"}
        </button>
      </form>

      <hr />

      <h2>Available Books</h2>

      {books.length === 0 ? (
        <p>No books available</p>
      ) : (
        <ul>
          {books.map((book) => (
            <li key={book._id}>
              <strong>{book.title}</strong> — {book.author} (
              {book.availableCopies} copies)
              {" "}
              <button className="edit" onClick={() => handleEdit(book)}>
                Edit
              </button>
              {" "}
              <button
                className="delete"
                onClick={() => handleDelete(book._id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
