const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const serviceRoutes = require('./serviceRoutes');
const connectDB = require("./dbcon");
require("dotenv").config();

const app = express();
const port = process.env.PORT||5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api/service', serviceRoutes);

// MongoDB connection


// Example route
app.get("/", (req, res) => {
  console.log
  res.send("Hello, world!");
});


// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

connectDB();