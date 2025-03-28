import React from "react";
import { BrowserRouter as Router, Route, Routes, Link, useParams, Navigate } from "react-router-dom";
import "./App.css";

// Blog post data
const blogPosts = [
  { id: "1", title: "React Basics", shortDescription: "Introduction to React.", content: "React is a JavaScript library for building UI components..." },
  { id: "2", title: "React Router Explained", shortDescription: "How to use React Router.", content: "React Router is a library for routing in React apps..." },
  { id: "3", title: "Managing State in React", shortDescription: "Understanding state and props.", content: "State and props are essential concepts in React..." },
];

// Home page displaying blog summaries
const HomePage = () => {
  return (
    <div className="container">
      <h1>Simple Blog</h1>
      <ul>
        {blogPosts.map((post) => (
          <li key={post.id}>
            <Link to={`/post/${post.id}`}>{post.title}</Link>
            <p>{post.shortDescription}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

// Individual blog post page
const BlogPostPage = () => {
  const { id } = useParams();
  const post = blogPosts.find((post) => post.id === id);

  if (!post) {
    return <Navigate to="/404" replace />;
  }

  return (
    <div className="container">
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      <Link to="/">Back to Home</Link>
    </div>
  );
};

// 404 Page for invalid routes
const NotFoundPage = () => {
  return (
    <div className="container">
      <h1>404 - Page Not Found</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
      <Link to="/">Go to Home</Link>
    </div>
  );
};

// Main App component
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/post/:id" element={<BlogPostPage />} />
        <Route path="/404" element={<NotFoundPage />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
