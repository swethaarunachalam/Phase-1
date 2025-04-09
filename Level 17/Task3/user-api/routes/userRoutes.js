const express = require('express');
const router = express.Router();
const User = require('../models/User');


router.post('/', async (req, res) => {
  try {
    const { name, email, password } = req.body;

 
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

  
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    
    const user = new User({ name, email, password });
    const savedUser = await user.save();

    res.status(201).json(savedUser);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
