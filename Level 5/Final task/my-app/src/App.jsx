import React, { useState, useContext, createContext } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./App.css";

const TaskContext = createContext();

const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [user, setUser] = useState(null);

  const addTask = (task) => setTasks([...tasks, { id: Date.now(), ...task }]);
  const updateTask = (id, updatedTask) => setTasks(tasks.map((task) => (task.id === id ? { ...task, ...updatedTask } : task)));
  const deleteTask = (id) => setTasks(tasks.filter((task) => task.id !== id));

  return (
    <TaskContext.Provider value={{ tasks, addTask, updateTask, deleteTask, user, setUser }}>
      {children}
    </TaskContext.Provider>
  );
};

const Login = () => {
  const { setUser } = useContext(TaskContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    if (email === "admin@example.com" && password === "password123") {
      setUser({ email });
      setError("");
    } else {
      setError("Invalid Credentials!");
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleLogin}>
        <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

const TaskForm = ({ task, setEditing }) => {
  const { addTask, updateTask } = useContext(TaskContext);

  const formik = useFormik({
    initialValues: { title: task ? task.title : "", description: task ? task.description : "" },
    validationSchema: Yup.object({
      title: Yup.string().required("Title is required"),
      description: Yup.string().required("Description is required"),
    }),
    onSubmit: (values) => {
      task ? updateTask(task.id, values) : addTask(values);
      setEditing && setEditing(false);
      formik.resetForm();
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="container">
      <input type="text" name="title" placeholder="Title" {...formik.getFieldProps("title")} />
      <textarea name="description" placeholder="Description" {...formik.getFieldProps("description")} />
      <button type="submit">{task ? "Update" : "Add"} Task</button>
    </form>
  );
};

const TaskList = () => {
  const { tasks, deleteTask } = useContext(TaskContext);
  const [editingTask, setEditingTask] = useState(null);

  return (
    <div className="container">
      <h2>Task List</h2>
      {editingTask ? <TaskForm task={editingTask} setEditing={setEditingTask} /> : <TaskForm />}
      {tasks.map((task) => (
        <div key={task.id} className="task">
          <h3>{task.title}</h3>
          <p>{task.description}</p>
          <button onClick={() => setEditingTask(task)}>Edit</button>
          <button onClick={() => deleteTask(task.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

const App = () => {
  return (
    <TaskProvider>
      <div className="app-container">
        <TaskManager />
      </div>
    </TaskProvider>
  );
};

const TaskManager = () => {
  const { user } = useContext(TaskContext);
  return user ? <TaskList /> : <Login />;
};

export default App;