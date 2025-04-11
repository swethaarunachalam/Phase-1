import React, { useState, useEffect } from "react";
import "./App.css";

const API = "http://localhost:5000/api";

const App = () => {
  const [profile, setProfile] = useState({ name: "", skills: "", bio: "", image: "" });
  const [profiles, setProfiles] = useState([]);
  const [post, setPost] = useState({ content: "", author: "" });
  const [posts, setPosts] = useState([]);
  const [comment, setComment] = useState("");

  useEffect(() => {
    fetch(`${API}/profiles`).then(res => res.json()).then(data => setProfiles(data));
    fetch(`${API}/posts`).then(res => res.json()).then(data => setPosts(data));
  }, []);

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`${API}/profiles`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(profile)
    });
    const data = await res.json();
    setProfiles([...profiles, data]);
  };

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`${API}/posts`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(post)
    });
    const data = await res.json();
    setPosts([...posts, data]);
  };

  const likePost = async (id) => {
    const res = await fetch(`${API}/posts/${id}/like`, { method: "PUT" });
    const updated = await res.json();
    setPosts(posts.map(p => p._id === id ? updated : p));
  };

  const commentPost = async (id) => {
    const res = await fetch(`${API}/posts/${id}/comment`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: comment })
    });
    const updated = await res.json();
    setPosts(posts.map(p => p._id === id ? updated : p));
    setComment("");
  };

  return (
    <div className="container">
      <h1> DevConnect</h1>

      <form onSubmit={handleProfileSubmit} className="card">
        <h2>Create Profile</h2>
        <input placeholder="Name" onChange={(e) => setProfile({ ...profile, name: e.target.value })} />
        <input placeholder="Skills" onChange={(e) => setProfile({ ...profile, skills: e.target.value })} />
        <input placeholder="Bio" onChange={(e) => setProfile({ ...profile, bio: e.target.value })} />
        <button>Create</button>
      </form>

      <form onSubmit={handlePostSubmit} className="card">
        <h2>Create Post</h2>
        <input placeholder="Author" onChange={(e) => setPost({ ...post, author: e.target.value })} />
        <textarea placeholder="What's on your mind?" onChange={(e) => setPost({ ...post, content: e.target.value })} />
        <button>Post</button>
      </form>

      <h2> Developers</h2>
      {profiles.map(p => (
        <div key={p._id} className="card fadein">
          <h3>{p.name}</h3>
          <p>{p.skills}</p>
          <p>{p.bio}</p>
        </div>
      ))}

      <h2> Posts</h2>
      {posts.map(p => (
        <div key={p._id} className="card bouncein">
          <h3>{p.author}</h3>
          <p>{p.content}</p>
          <button onClick={() => likePost(p._id)}> {p.likes}</button>
          <div>
            <input placeholder="Add comment..." value={comment} onChange={(e) => setComment(e.target.value)} />
            <button onClick={() => commentPost(p._id)}>Send</button>
          </div>
          <ul>
            {p.comments.map((c, idx) => <li key={idx}>💬 {c.text}</li>)}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default App;
