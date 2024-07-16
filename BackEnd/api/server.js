const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
const port = 3001;

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
        param = '';
    } else if (data.type === 'getInfo' && data.id){

        param = `${data.id}`;
        sql = `SELECT USER.*, SERVICE_PROFILE.* 
            FROM USER 
            JOIN SERVICE_PROFILE 
            ON USER.user_id = SERVICE_PROFILE.user_id
            WHERE USER.user_id = ?`;

    } else if (data.type === 'searchBar' && data.search) {

        param = `%${data.search}%`;
        sql = `SELECT USER.First_Name, Last_Name, Profile_pic, SERVICE_PROFILE.*
                FROM USER 
                JOIN SERVICE_PROFILE 
                ON USER.user_id = SERVICE_PROFILE.user_id
                WHERE SERVICE_PROFILE.Service_title LIKE ?
               `;
    } else if (data.type === 'getNearby' && data.location) {

        param = `%${data.location}%`;
        sql = `SELECT 
            USER.First_Name, 
            USER.Last_Name, 
            USER.Profile_pic, 
            SERVICE_PROFILE.*, 
            USER_ADDRESS.*
            FROM 
                USER 
            JOIN 
                SERVICE_PROFILE 
            ON 
                USER.user_id = SERVICE_PROFILE.user_id 
            JOIN 
                USER_ADDRESS 
            ON 
                SERVICE_PROFILE.user_id = USER_ADDRESS.user_id
            WHERE USER_ADDRESS.City LIKE ?`;
    
    } else {
        return res.json({
            status: 'error',
            timestamp: Date.now(),
            data: 'Invalid request'
        });
    }

    connection.query(sql, [param], (error, results) => {
        if (error) {
            return res.status(500).json({
                status: 'error',
                timestamp: Date.now(),
                data: 'Error executing query',
                error: error,
                used: param
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
