const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MySQL connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Naturalscience1', 
    database: 'CraftLink'
});

connection.connect(error => {
    if (error) {
        console.error('Error connecting to MySQL:', error);
        return;
    }
    console.log('Connected to MySQL');
});

// Routes
app.post('/api', (req, res) => {
    const data = req.body;
    let sql;
    let param;

    if (data.type === 'getProfiles') {
        sql = `SELECT USER.First_Name, Last_Name, Profile_pic, SERVICE_PROFILE.*
               FROM USER 
               JOIN SERVICE_PROFILE 
               ON USER.user_id = SERVICE_PROFILE.user_id`;
    } else if (data.type === 'getInfo') {
        sql = `SELECT USER.*, SERVICE_PROFILE.* 
               FROM USER 
               JOIN SERVICE_PROFILE 
               ON USER.user_id = SERVICE_PROFILE.user_id`;
    } else if (data.type === 'searchBar' && data.search) {
        param = `%${data.search}%`;
        sql = `SELECT First_Name, Last_Name, Profile_Pic, Service_Description 
               FROM USER 
               WHERE user_id IN (
                   SELECT user_id 
                   FROM SERVICE_PROFILE 
                   WHERE Service_title LIKE ?${param}?
               )`;
    } else {
        return res.json({
            status: 'error',
            timestamp: Date.now(),
            data: 'Invalid request'
        });
    }

    connection.query(sql, (error, results) => {
        if (error) {
            return res.status(500).json({
                status: 'error',
                timestamp: Date.now(),
                data: 'Error executing query'
            });
        }

        res.json({
            status: 'success',
            timestamp: Date.now(),
            data: results
        });
    });
});

// Start server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
