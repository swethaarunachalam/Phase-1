const express = require('express')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const app = express()
app.use(express.json())

mongoose.connect('mongodb://localhost:27017/userHooksDB')
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err))

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  isActive: { type: Boolean, default: true }
})

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10)
  }
  next()
})

userSchema.post('save', function (doc) {
  console.log(`New user created: ${doc.email}`)
})

userSchema.pre(/^find/, function (next) {
  this.where({ isActive: true })
  next()
})

userSchema.methods.generateProfile = function () {
  return {
    name: this.name,
    email: this.email
  }
}

userSchema.statics.findByDomain = function (domain) {
  return this.find({ email: { $regex: new RegExp(`@${domain}$`) } })
}

const User = mongoose.model('User', userSchema)

app.post('/users', async (req, res) => {
  const user = await User.create(req.body)
  res.json(user)
})

app.get('/users', async (req, res) => {
  const users = await User.find()
  res.json(users)
})

app.put('/users/deactivate/:id', async (req, res) => {
  await User.findByIdAndUpdate(req.params.id, { isActive: false })
  res.send('User deactivated')
})

app.get('/users/profile/:id', async (req, res) => {
  const user = await User.findById(req.params.id)
  res.json(user.generateProfile())
})

app.get('/users/domain/:domain', async (req, res) => {
  const users = await User.findByDomain(req.params.domain)
  res.json(users)
})

app.listen(5000, () => console.log('Server running on port 5000'))
