const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const serviceRoutes = require('./serviceRoutes');
const connectDB = require("./dbcon");
require("dotenv").config();
const mysql = require('mysql2/promise');

const app = express();
const port = process.env.PORT||5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api/service', serviceRoutes);

const pool = mysql.createPool({
  host: 'wheatley.cs.up.ac.za',
  user: 'u23684365',
  password: 'WZRJBWGIQ7LVZYJTWTBHWAI7EB5ZNWRP',
  database: 'u23684365_CraftLink',
  waitForConnections: true,
  connectionLimit: 10,  // Adjust this number based on your needs
  queueLimit: 0
});

app.post('/addService', async (req, res) => {
  const { img, name, service, skills, exp, description, rate,user_id } = req.body;

  if (!img || !name || !service || !skills || !exp || !description || !rate) {
    return res.status(400).json("All fields are required");
  }

  let connection;
  try {
    connection = await pool.getConnection();
    console.log('Connected to the database with connection ID', connection.threadId);

    const [rows] = await connection.execute('SELECT * FROM Service WHERE name = ?', [name]);

    if (rows.length > 0) {
      return res.status(400).json("This name is taken.");
    }

    await connection.execute(
      'INSERT INTO Service (img, name, service, skills, experience, description, rate,user_id) VALUES (?, ?, ?, ?, ?, ?, ? ,?)',
      [img, name, service, skills, exp, description, rate, user_id]
    );

    res.status(200).json({ message: 'Service added successfully!' });
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json(error);
  } finally {
    if (connection) {
      await connection.release();
    }
  }
});

app.get('/getServices/:user_id', async (req, res) => {
  const { user_id } = req.params;
  let connection;
  try {
    connection = await pool.getConnection();
    console.log('Connected to the database with connection ID', connection.threadId);

    const [rows] = await connection.execute('SELECT * FROM Service where user_id = ?',[user_id]);
    
    res.status(200).json(rows);
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json(error);
  } finally {
    if (connection) {
      await connection.release();
    }
  }
});

app.get('/getAnalysis/:user_id', async (req, res) => {
  const { user_id } = req.params;

  let connection;
  try {
    connection = await pool.getConnection();
    console.log('Connected to the database with connection ID', connection.threadId);

    const [rows] = await connection.execute('SELECT * FROM serviceModel WHERE user_id = ?', [user_id]);
    
    res.status(200).json(rows);
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json(error);
  } finally {
    if (connection) {
      await connection.release();
    }
  }
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
  
// Example route
app.get("/", (req, res) => {
  console.log
  res.send("Hello, world!");
});


// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

