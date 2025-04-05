const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();

// Serve static files
app.use(express.static('public'));           // for index.html
app.use('/uploads', express.static('uploads')); // to serve uploaded images

// Set up storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // e.g. 1712301234567.jpg
  }
});

// File filter to accept only images
const fileFilter = function (req, file, cb) {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'), false);
  }
};

// Multer config
const upload = multer({
  storage: storage,
  fileFilter: fileFilter
});

// Upload route
app.post('/upload', upload.single('myImage'), (req, res) => {
  if (!req.file) {
    return res.send('<h3 style="color:red;"> Error: Please upload an image file.</h3>');
  }

  res.send(`
    <h2>Image Uploaded Successfully!</h2>
    <p><strong>File Name:</strong> ${req.file.filename}</p>
    <p><strong>Path:</strong> ${req.file.path}</p>
    <img src="/uploads/${req.file.filename}" style="max-width:300px; border: 2px solid #555;"/>
    <br><br>
    <a href="/">Upload Another</a>
  `);
});

// Error handler
app.use((err, req, res, next) => {
  res.status(400).send(`<h3 style="color:red;"> Error: ${err.message}</h3>`);
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
