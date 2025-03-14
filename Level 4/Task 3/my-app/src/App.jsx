import React, { useState } from "react";
import "./App.css"; 

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    if (!formData.email || !formData.password) {
      return "All fields are required!";
    }
    if (!formData.email.includes("@")) {
      return "Invalid email format!";
    }
    if (formData.password.length < 6) {
      return "Password must be at least 6 characters!";
    }
    return null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const error = validateForm();
    if (error) {
      setMessage({ type: "error", text: error });
    } else {
      setMessage({ type: "success", text: isLogin ? "Login Successful!" : "Signup Successful!" });
    }
  };

  return (
    <div className="auth-container">
      <h2>{isLogin ? "Login" : "Sign Up"}</h2>
      {message && <p className={`message ${message.type}`}>{message.text}</p>}

      <form onSubmit={handleSubmit}>
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} />
        <button type="submit">{isLogin ? "Login" : "Sign Up"}</button>
      </form>

      <p onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Login"}
      </p>
    </div>
  );
};

export default AuthForm;
