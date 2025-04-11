import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [books, setBooks] = useState([]);
  const [statusFilter, setStatusFilter] = useState("All");
  const [note, setNote] = useState("");
  const [rating, setRating] = useState(0);

  // Search books with debounce
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (query) {
        axios.get(`http://localhost:5000/api/search?q=${query}`).then((res) => {
          setSearchResults(res.data);
        });
      }
    }, 500);
    return () => clearTimeout(delayDebounce);
  }, [query]);

  // Get books
  const fetchBooks = () => {
    const filter = statusFilter === "All" ? "" : `?status=${statusFilter}`;
    axios.get(`http://localhost:5000/api/books${filter}`).then((res) => {
      setBooks(res.data);
    });
  };

  useEffect(() => {
    fetchBooks();
  }, [statusFilter]);

  // Add book
  const addBook = (book) => {
    const newBook = {
      title: book.title,
      authors: book.authors,
      status: "Want to Read",
      rating: 0,
      note: "",
    };
    axios.post("http://localhost:5000/api/books", newBook).then(() => fetchBooks());
  };

  // Delete book
  const deleteBook = (id) => {
    axios.delete(`http://localhost:5000/api/books/${id}`).then(() => fetchBooks());
  };

  // Update book
  const updateBook = (book) => {
    axios.put(`http://localhost:5000/api/books/${book._id}`, {
      ...book,
      rating,
      note,
    }).then(() => fetchBooks());
  };

  return (
    <div className="App">
      <h1>📚 BookShelf</h1>

      <input
        type="text"
        placeholder="🔍 Search for books..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <div className="search-results">
        {searchResults.map((book) => (
          <div key={book.id} className="card">
            <p><strong>{book.title}</strong></p>
            <p>{book.authors.join(", ")}</p>
            <button onClick={() => addBook(book)}>➕ Add</button>
          </div>
        ))}
      </div>

      <hr />
      <h2>📖 My Collection</h2>
      <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
        <option>All</option>
        <option>Read</option>
        <option>Currently Reading</option>
        <option>Want to Read</option>
      </select>

      <div className="books">
        {books.map((book) => (
          <div key={book._id} className="card">
            <p><strong>{book.title}</strong></p>
            <p>{book.authors.join(", ")}</p>
            <p>Status: {book.status}</p>
            <input
              type="number"
              placeholder="⭐ Rating"
              min="0"
              max="5"
              onChange={(e) => setRating(Number(e.target.value))}
            />
            <input
              type="text"
              placeholder="📝 Note"
              onChange={(e) => setNote(e.target.value)}
            />
            <button onClick={() => updateBook(book)}>✏️ Update</button>
            <button onClick={() => deleteBook(book._id)}>❌ Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
