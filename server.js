const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const cors = require('cors');

// Create an instance of Express app
const app = express();

// Set up middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Set up MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', // your MySQL username
  password: 'Tony@2004', // your MySQL password
  database: 'userDB'
});

// Connect to MySQL database
db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err.stack);
    return;
  }
  console.log('Connected to the database.');
});

// Sign Up Route
app.post('/signup', async (req, res) => {
  const { username, email, password, confirmPassword } = req.body;

  // Basic validation
  if (!username || !email || !password || !confirmPassword) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ error: 'Passwords do not match' });
  }

  try {
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user into database
    const query = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
    db.query(query, [username, email, hashedPassword], (err, result) => {
      if (err) {
        console.error('Database error:', err); // Log the error
        return res.status(500).json({ error: 'Database error' });
      }
      res.status(200).json({ message: 'Signup successful!' });
    });
  } catch (err) {
    console.error('Error hashing password:', err); // Log the error
    return res.status(500).json({ error: 'Error hashing password' });
  }
});

// Login Route
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Validate
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  // Check if user exists
  const query = 'SELECT * FROM users WHERE email = ?';
  db.query(query, [email], (err, result) => {
    if (err) {
      console.error('Database error:', err); // Log the error
      return res.status(500).json({ error: 'Database error' });
    }

    if (result.length === 0) {
      return res.status(400).json({ error: 'No user found with this email' });
    }

    const user = result[0];

    // Compare password with hash stored in the database
    bcrypt.compare(password, user.password, (err, match) => {
      if (err) {
        console.error('Error comparing passwords:', err); // Log the error
        return res.status(500).json({ error: 'Error comparing passwords' });
      }

      if (!match) {
        return res.status(400).json({ error: 'Incorrect password' });
      }

      res.status(200).json({ message: 'Login successful!', userId: user.id });
    });
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
