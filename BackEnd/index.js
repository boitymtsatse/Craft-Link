const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const serviceRoutes = require('./serviceRoutes');
const connectDB = require("./dbcon");
require("dotenv").config();

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MongoDB connection
connectDB();

// Routes
app.use('/api/service', serviceRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
