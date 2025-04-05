const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'form.html'));
});

app.post('/submit', (req, res) => {
  const { name, email, message } = req.body;

  
  if (!name || !email || !message) {
    return res.send('<h3 style="color:red;">Error: All fields are required!</h3>');
  }

  res.send(`
    <h2 style="color:green;">Form submitted successfully!</h2>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Message:</strong> ${message}</p>
  `);
});


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
