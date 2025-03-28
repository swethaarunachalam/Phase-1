import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import "./App.css";

const App = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(storedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const formik = useFormik({
    initialValues: { title: "", description: "" },
    onSubmit: (values, { resetForm }) => {
      const newTask = {
        id: Date.now(),
        title: values.title,
        description: values.description,
        completed: false
      };
      setTasks([...tasks, newTask]);
      resetForm();
    }
  });

  const toggleComplete = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <div className="container">
      <h1>Task Manager</h1>
      <form onSubmit={formik.handleSubmit} className="task-form">
        <input
          type="text"
          name="title"
          placeholder="Task Title"
          value={formik.values.title}
          onChange={formik.handleChange}
          required
        />
        <input
          type="text"
          name="description"
          placeholder="Task Description"
          value={formik.values.description}
          onChange={formik.handleChange}
          required
        />
        <button type="submit">Add Task</button>
      </form>

      <ul className="task-list">
        {tasks.map((task) => (
          <li key={task.id} className={task.completed ? "completed" : ""}>
            <span>{task.title}</span>
            <p>{task.description}</p>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleComplete(task.id)}
            />
            <button onClick={() => deleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
