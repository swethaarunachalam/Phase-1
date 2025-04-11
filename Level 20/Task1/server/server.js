const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect("mongodb+srv://swetha_116:aswetha116116@swetha.76fg2.mongodb.net/project-0?retryWrites=true&w=majority&appName=swetha", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

const userSchema = new mongoose.Schema({
  username: String,
  password: String
});

const taskSchema = new mongoose.Schema({
  userId: String,
  title: String,
  description: String,
  dueDate: String,
  completed: { type: Boolean, default: false }
});

const User = mongoose.model('User', userSchema);
const Task = mongoose.model('Task', taskSchema);

const SECRET = 'taskmastersecret';

app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  await User.create({ username, password: hashed });
  res.sendStatus(201);
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) return res.sendStatus(401);
  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) return res.sendStatus(401);
  const token = jwt.sign({ userId: user._id }, SECRET);
  res.json({ token });
});

const auth = (req, res, next) => {
  const token = req.headers.authorization;
  try {
    const data = jwt.verify(token, SECRET);
    req.userId = data.userId;
    next();
  } catch {
    res.sendStatus(403);
  }
};

app.get('/tasks', auth, async (req, res) => {
  const tasks = await Task.find({ userId: req.userId });
  res.json(tasks);
});

app.post('/tasks', auth, async (req, res) => {
  const { title, description, dueDate } = req.body;
  const task = await Task.create({ userId: req.userId, title, description, dueDate });
  res.status(201).json(task);
});

app.put('/tasks/:id', auth, async (req, res) => {
  const task = await Task.findOne({ _id: req.params.id, userId: req.userId });
  task.completed = !task.completed;
  await task.save();
  res.json(task);
});

app.delete('/tasks/:id', auth, async (req, res) => {
  await Task.deleteOne({ _id: req.params.id, userId: req.userId });
  res.sendStatus(204);
});

app.listen(5000, () => console.log('Server running on http://localhost:5000'));
