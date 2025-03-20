import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css"; // Import CSS

const API_URL = "https://jsonplaceholder.typicode.com/users";

const App = () => {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [editingUser, setEditingUser] = useState(null);
  const [message, setMessage] = useState("");

  // Fetch users (READ)
  useEffect(() => {
    axios.get(API_URL)
      .then(response => setUsers(response.data))
      .catch(error => console.error("Error fetching users:", error));
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Add a new user (CREATE)
  const addUser = () => {
    if (!formData.name || !formData.email) {
      setMessage("All fields are required!");
      return;
    }

    axios.post(API_URL, formData)
      .then(response => {
        setUsers([...users, response.data]);
        setFormData({ name: "", email: "" });
        setMessage("User added successfully!");
      })
      .catch(error => console.error("Error adding user:", error));
  };

  // Edit user (UPDATE)
  const updateUser = () => {
    if (!editingUser) return;

    axios.put(`${API_URL}/${editingUser.id}`, formData)
      .then(() => {
        setUsers(users.map(user => user.id === editingUser.id ? { ...user, ...formData } : user));
        setEditingUser(null);
        setFormData({ name: "", email: "" });
        setMessage("User updated successfully!");
      })
      .catch(error => console.error("Error updating user:", error));
  };

  // Delete user (DELETE)
  const deleteUser = (id) => {
    axios.delete(`${API_URL}/${id}`)
      .then(() => {
        setUsers(users.filter(user => user.id !== id));
        setMessage("User deleted successfully!");
      })
      .catch(error => console.error("Error deleting user:", error));
  };

  return (
    <div className="crud-container">
      <h2>User Management</h2>
      {message && <p className="message">{message}</p>}

      <h3>{editingUser ? "Edit User" : "Add New User"}</h3>
      <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} />
      <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
      <button onClick={editingUser ? updateUser : addUser}>
        {editingUser ? "Save Changes" : "Add User"}
      </button>

      <h3>Users List</h3>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            {user.name} ({user.email})
            <button onClick={() => { setEditingUser(user); setFormData(user); }}>Edit</button>
            <button onClick={() => deleteUser(user.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
