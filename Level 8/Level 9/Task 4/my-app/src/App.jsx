
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";

const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = () => setIsAuthenticated(true);
  const logout = () => setIsAuthenticated(false);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = React.useContext(AuthContext);
  return isAuthenticated ? children : <Navigate to="/login" />;
};

const Home = () => <h2>Home Page (Public)</h2>;
const Dashboard = () => <h2>Dashboard (Protected)</h2>;
const Profile = () => <h2>Profile (Protected)</h2>;

const Login = () => {
  const { login } = React.useContext(AuthContext);
  return (
    <div className="login-container">
      <h2>Login Page</h2>
      <button onClick={login}>Login</button>
    </div>
  );
};

const Navbar = () => {
  const { isAuthenticated, logout } = React.useContext(AuthContext);
  return (
    <nav className="navbar">
      <a href="/">Home</a>
      {isAuthenticated ? (
        <>
          <a href="/dashboard">Dashboard</a>
          <a href="/profile">Profile</a>
          <button onClick={logout} className="logout-button">Logout</button>
        </>
      ) : (
        <a href="/login">Login</a>
      )}
    </nav>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
