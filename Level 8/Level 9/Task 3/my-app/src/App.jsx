import { BrowserRouter as Router, Routes, Route, Link, Outlet } from "react-router-dom";
import "./App.css";

function Dashboard() {
  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <nav className="sidebar">
        <h2 className="title">Dashboard</h2>
        <ul>
          <li><Link to="overview" className="nav-link">Overview</Link></li>
          <li><Link to="profile" className="nav-link">Profile</Link></li>
          <li><Link to="settings" className="nav-link">Settings</Link></li>
        </ul>
      </nav>

      {/* Main Content */}
      <div className="main-content">
        <Outlet />
      </div>
    </div>
  );
}

function Overview() {
  return <h2 className="section">Overview Section</h2>;
}

function Profile() {
  return <h2 className="section">Profile Section</h2>;
}

function Settings() {
  return <h2 className="section">Settings Section</h2>;
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="dashboard" element={<Dashboard />}>
          <Route path="overview" element={<Overview />} />
          <Route path="profile" element={<Profile />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
