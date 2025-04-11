import React, { useState, useEffect, createContext, useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, Link, useNavigate } from 'react-router-dom';
import './App.css';
import axios from 'axios';

const AuthContext = createContext();

const API = 'http://localhost:5000';

const App = () => {
  const [auth, setAuth] = useState(() => localStorage.getItem('token') || '');

  const logout = () => {
    setAuth('');
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      <Router>
        <nav>
          <Link to="/">Tasks</Link>
          {auth ? (
            <button onClick={logout}>Logout</button>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </nav>
        <Routes>
          <Route path="/" element={auth ? <TaskList /> : <Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </AuthContext.Provider>
  );
};

const Register = () => {
  const [form, setForm] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    await axios.post(`${API}/register`, form);
    alert('Registered successfully!');
    navigate('/login');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Register</h2>
      <input required placeholder="Username" onChange={e => setForm({ ...form, username: e.target.value })} />
      <input required type="password" placeholder="Password" onChange={e => setForm({ ...form, password: e.target.value })} />
      <button type="submit">Register</button>
    </form>
  );
};

const Login = () => {
  const [form, setForm] = useState({ username: '', password: '' });
  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    const res = await axios.post(`${API}/login`, form);
    localStorage.setItem('token', res.data.token);
    setAuth(res.data.token);
    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <input required placeholder="Username" onChange={e => setForm({ ...form, username: e.target.value })} />
      <input required type="password" placeholder="Password" onChange={e => setForm({ ...form, password: e.target.value })} />
      <button type="submit">Login</button>
    </form>
  );
};

const TaskList = () => {
  const { auth } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState({ title: '', description: '', dueDate: '' });

  const fetchTasks = async () => {
    const res = await axios.get(`${API}/tasks`, { headers: { Authorization: auth } });
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async e => {
    e.preventDefault();
    await axios.post(`${API}/tasks`, form, { headers: { Authorization: auth } });
    setForm({ title: '', description: '', dueDate: '' });
    fetchTasks();
  };

  const toggleComplete = async id => {
    await axios.put(`${API}/tasks/${id}`, {}, { headers: { Authorization: auth } });
    fetchTasks();
  };

  const deleteTask = async id => {
    await axios.delete(`${API}/tasks/${id}`, { headers: { Authorization: auth } });
    fetchTasks();
  };

  return (
    <div>
      <h2>My Tasks</h2>
      <form onSubmit={addTask}>
        <input placeholder="Title" required value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
        <input placeholder="Description" required value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
        <input type="date" required value={form.dueDate} onChange={e => setForm({ ...form, dueDate: e.target.value })} />
        <button type="submit">Add Task</button>
      </form>
      <ul>
        {tasks.map(task => (
          <li key={task._id} className={task.completed ? 'done' : ''}>
            <strong>{task.title}</strong> - {task.description} (Due: {task.dueDate})
            <button onClick={() => toggleComplete(task._id)}>{task.completed ? 'Undo' : 'Complete'}</button>
            <button onClick={() => deleteTask(task._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
