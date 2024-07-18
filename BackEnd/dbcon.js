// const mongoose = require("mongoose");
// require("dotenv").config();

// const uri = process.env.ATLAS_URI;

// const connectDB = async () => {
//     try {
//         console.log("Connecting to MongoDB with URI:", uri);
//         await mongoose.connect(uri, {
//             useNewUrlParser: true,
//             useUnifiedTopology: true,
//         });
//         console.log("MongoDB connection established");
//     } catch (error) {
//         console.log("MongoDB connection failed:", error.message);
//         process.exit(1); // Exit the process with failure
//     }
// };

// module.exports = connectDB;
const mysql = require('mysql2/promise');
const db = {
    host: 'wheatley.cs.up.ac.za',
    user: 'u23684365',
    password: 'WZRJBWGIQ7LVZYJTWTBHWAI7EB5ZNWRP',
    database: 'u23684365_CraftLink'
  };

  async function connectDB() {
    try {
        console.log("here")
      // Create a connection
      const connection = await mysql.createConnection(db);
      console.log('Connected to the database with connection ID', connection.threadId);
      
      // Example query to verify the connection
      const [rows] = await connection.execute('SELECT 1 + 1 AS solution');
      console.log('Query result:', rows[0].solution);
      
      // Remember to close the connection when you're done
      await connection.end();
    } catch (error) {
      console.error('Error connecting to the database:', error.stack);
    }
  }
  
 connectDB();