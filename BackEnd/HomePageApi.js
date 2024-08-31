const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const session = require('express-session');
const mysql = require('mysql2');
// Middleware

const app = express();
const port = 3001;
app.use(cors());
app.use(bodyParser.json()); // Make sure this is above your routes

app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: true
}));

const db = mysql.createConnection({
  host: 'wheatley.cs.up.ac.za',
  user: 'u23684365',
  password: 'WZRJBWGIQ7LVZYJTWTBHWAI7EB5ZNWRP',
  database: 'u23684365_CraftLink'
});

db.connect(error => {
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
        sql = `SELECT User.First_Name, Last_Name, User.Profile_Pic, Service_Profile.* 
        FROM User JOIN Service_Profile 
        ON User.user_id = Service_Profile.user_id`;
        param = '';
    } else if (data.type === 'getInfo' && data.id){

        param = `${data.id}`;
        sql = `SELECT User.*, Service_Profile.* 
            FROM User
            JOIN Service_Profile
            ON User.user_id = Service_Profile.user_id
            JOIN User_Address 
            ON Service_Profile.user_id = User_Address.user_id
            WHERE User.user_id = ?`;

    } else if (data.type === 'searchBar' && data.search) {

        param = `%${data.search}%`;
        sql = `SELECT User.First_Name, Last_Name, Profile_Pic, Service_Profile.*
                FROM User 
                JOIN Service_Profile 
                ON User.user_id = Service_Profile.user_id
                WHERE Service_Profile.Service_title LIKE ?
               `;
    } else if (data.type === 'getNearby' && data.location) {

        param = `%${data.location}%`;
        sql = `SELECT 
            User.First_Name, 
            User.Last_Name, 
            User.Profile_Pic, 
            Service_Profile.*, 
            User_Address.*
            FROM 
                User 
            JOIN 
                Service_Profile 
            ON 
                User.user_id = Service_Profile.user_id 
            JOIN 
                User_Address 
            ON 
                Service_Profile.user_id = User_Address.user_id
            WHERE User_Address.City LIKE ?`;
    
    } else {
        return res.json({
            status: 'error',
            timestamp: Date.now(),
            data: 'Invalid request'
        });
    }

    db.query(sql, [param], (error, results) => {
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
