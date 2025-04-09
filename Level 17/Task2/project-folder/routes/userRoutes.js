
const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/schema', (req, res) => {
  res.status(200).json(User.schema.obj);
});

// router.post('/', async (req, res) => {
//     try {
//       const user = new User(req.body);
//       const savedUser = await user.save();
//       res.status(201).json(savedUser);
//     } catch (err) {
//       res.status(400).json({ error: err.message });
//     }
//   });
  
module.exports = router;
