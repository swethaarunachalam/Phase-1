import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [updateId, setUpdateId] = useState(null);

  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/users")
      .then(res => {
        setUsers(res.data);
        console.log(res.data);
      })
      .catch(err => console.error("Error fetching users:", err));
  }, []);

 
  const postUser = () => {
    if (!name.trim()) {
      alert("Please enter a name before posting.");
      return;
    }

    axios.post("https://jsonplaceholder.typicode.com/users", { name })
      .then(res => {
        const newUser = { id: users.length + 1, name }; 
        setUsers([...users, newUser]);
        setName("");
        console.log("User added:", res.data);
      })
      .catch(err => console.error("Error posting user:", err));
  };


  const startUpdate = (id, currentName) => {
    setUpdateId(id);
    setName(currentName);
  };


  const updateUser = () => {
    if (!name.trim()) {
      alert("Please enter a name before updating.");
      return;
    }

    axios.put(`https://jsonplaceholder.typicode.com/users/${updateId}`, { name })
      .then(res => {
        const updatedUsers = users.map(user =>
          user.id === updateId ? { ...user, name } : user
        );
        setUsers(updatedUsers); 
        setUpdateId(null);
        setName(""); 
        console.log("User updated:", res.data);
      })
      .catch(err => console.error("Error updating user:", err));
  };

  const deleteUser = (id) => {
    axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then(() => {
        setUsers(users.filter(user => user.id !== id)); 
        console.log(`User with ID ${id} deleted.`);
      })
      .catch(err => console.error("Error deleting user:", err));
  };

  return (
    <div>
      <h1>Hello React</h1>
      {users.map(u => (
        <div key={u.id}>
          {u.id}. {u.name}{" "}
          <button onClick={() => startUpdate(u.id, u.name)}>Edit</button>
          <button onClick={() => deleteUser(u.id)} style={{ marginLeft: "5px", color: "red" }}>Delete</button>
        </div>
      ))}
      <input 
        type="text" 
        placeholder="Enter name" 
        value={name} 
        onChange={(e) => setName(e.target.value)}
      />
      {updateId ? (
        <button onClick={updateUser}>Update</button>
      ) : (
        <button onClick={postUser}>Post</button>
      )}
    </div>
  );
}

export default App;
