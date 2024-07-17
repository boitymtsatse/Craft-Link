
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const mysql = require('mysql');
const cors = require('cors'); // Uncomment this line if you need CORS



const app = express();
const port = 3000;
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

db.connect((err) => {
  if (err) {
    console.error('Connection failed:' + err.stack);
    return;
  }
  console.log('Connected to database');
});

app.post('/api',cors(), (req, res) => {
  
  
  const { type } = req.body;

  if (!type) {
    return res.status(400).json({ status: "Error", timestamp: Date.now(), data: "No type specified" });
  }

  switch (type) {
    case 'getUser':
      getUser(req, res);
      break;
    case 'updateUser':
      updateUser(req, res);
      break;
    case 'updatePassword':
      updatePassword(req, res);
      break;
    case 'deleteUser':
      deleteUser(req, res);
      break;
    case 'getReview':
      getReview(req, res);
      break;
    case 'setReview':
      setReview(req, res);
      break;
    case 'logout':
      logout(req, res);
      break;
    case 'login':
      login(req, res);
      break;
    case 'history':
      history(req, res);
      break;
    case 'signUp':
      signUp(req, res);
      break;
    default:
      res.status(400).json({ status: "Error", timestamp: Date.now(), data: "Invalid type specified" });
  }


function getUser(req, res) {
  // Assuming the user_id is hardcoded for now
  const user_id = 13;

  db.query('SELECT * FROM User INNER JOIN User_Address ON User.User_ID=User_Address.User_ID WHERE User.User_ID = ?', [user_id], (error, results) => {
    if (error) {
      return res.status(500).json({ status: "failure", timestamp: Date.now(), data: error.message });
    }
    if (results.length > 0) {
      res.json({ status: "success", timestamp: Date.now(), data: results[0] });
    } else {
      res.json({ status: "failure", timestamp: Date.now(), data: "user not found" });
    }
  });
}

function deleteUser(req, res) {
  const user_id = 11;
  db.query('DELETE FROM User_Address WHERE User_ID = ?', [user_id], (error, results) => {
    if (error) {
      return res.status(500).json({ status: "failure", timestamp: Date.now(), data: error.message });
    }
    res.json({ status: "success", timestamp: Date.now(), data: "user deleted from database" });
  });
  db.query('DELETE FROM User WHERE User_ID = ?', [user_id], (error, results) => {
    if (error) {
      return res.status(500).json({ status: "failure", timestamp: Date.now(), data: error.message });
    }
    res.json({ status: "success", timestamp: Date.now(), data: "user deleted from database" });
  });
  req.session.destroy();
}

function logout(req, res) {
  req.session.destroy();
  res.json({ status: "success", timestamp: Date.now(), data: "user logged out" });
}

function setReview(req, res) {
  const user_id = 5; // Assuming user_id is hardcoded for now
  const { service_id, rating, review } = req.body;
  const date_time = new Date().toISOString().slice(0, 10);

  db.query('INSERT INTO Review (User_ID, Service_ID, Review_Date, Review_Content, Star_Rating) VALUES (?, ?, ?, ?, ?)', 
  [user_id, service_id, date_time, review, rating], (error, results) => {
    if (error) {
      return res.status(500).json({ status: "failure", timestamp: Date.now(), data: error.message });
    }
    res.json({ status: "success", timestamp: Date.now(), data: "Review added successfully" });
  });
}

function getReview(req, res) {
  const { service_id } = req.body;

  const sql = `SELECT * FROM Review 
               INNER JOIN Service_Profile ON Review.Service_ID = Service_Profile.Service_ID 
               INNER JOIN User ON Review.User_ID = User.User_ID 
               WHERE Review.Service_ID = Service_Profile.Service_ID 
               AND Service_Profile.Service_ID = ?`;

  db.query(sql, [service_id], (error, results) => {
    if (error) {
      return res.status(500).json({ status: "failure", timestamp: Date.now(), data: error.message });
    }
    if (results.length > 0) {
      const reviews = results.map(row => ({
        date: row.Review_Date,
        review: row.Review_Content,
        rating: row.Star_Rating,
        user_id: row.User_ID,
        service: row.Service_title,
        name: row.First_Name
      }));
      res.json({ status: "success", timestamp: Date.now(), data: reviews });
    } else {
      db.query('SELECT Service_title FROM Service_Profile WHERE Service_ID = ?', [service_id], (error, results) => {
        if (error) {
          return res.status(500).json({ status: "failure", timestamp: Date.now(), data: error.message });
        }
        const reviews = results.map(row => ({ title: row.Service_title }));
        res.json({ status: "failure", timestamp: Date.now(), data: reviews });
      });
    }
  });
}

function updateUser(req, res) {
  const user_id = 13; // Assuming user_id is hardcoded for now
  const { phone, email, street_name, street_no, suburb, city, province, postal_code } = req.body;

  if (phone.length > 10 || !/^\d+$/.test(phone)) {
    return res.status(400).json({ status: "error", timestamp: Date.now(), data: "phone number is not all digits" });
  }

  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailPattern.test(email)) {
    return res.status(400).json({ status: "error", timestamp: Date.now(), data: "invalid email address" });
  }

  db.query('SELECT COUNT(*) AS count, User_ID FROM User WHERE email = ?', [email], (error, results) => {
    if (error) {
      return res.status(500).json({ status: "failure", timestamp: Date.now(), data: error.message });
    }
    const count = results[0].count;
    const id = results[0].User_ID;
    if (count > 0 && id != user_id) {
      return res.status(400).json({ status: "error", timestamp: Date.now(), data: "email already in use" });
    }

    db.query('UPDATE User SET Phone_no = ?, Email = ? WHERE User_ID = ?', [phone, email, user_id], (error) => {
      if (error) {
        return res.status(500).json({ status: "failure", timestamp: Date.now(), data: error.message });
      }

      db.query('UPDATE User_Address SET Street_no = ?, Street_name = ?, Suburb = ?, City = ?, Postal_code = ?, Province = ? WHERE User_ID = ?', 
      [street_no, street_name, suburb, city, postal_code, province, user_id], (error) => {
        if (error) {
          return res.status(500).json({ status: "failure", timestamp: Date.now(), data: error.message });
        }
        res.json({ status: "success", timestamp: Date.now(), data: "user details updated" });
      });
    });
  });
}

function updatePassword(req, res) {
  const user_id = 13; // Assuming user_id is hardcoded for now
  const { oldPassword, newPassword } = req.body;
  const hashedOldPassword = require('crypto').createHash('sha256').update(oldPassword).digest('hex');

  db.query('SELECT User_password FROM User WHERE User_ID = ?', [user_id], (error, results) => {
    if (error) {
      return res.status(500).json({ status: "failure", timestamp: Date.now(), data: error.message });
    }
    const password = results[0].User_password;
    if (hashedOldPassword !== password) {
      return res.status(400).json({ status: "error", timestamp: Date.now(), data: "incorrect old password" });
    }

    const hashedNewPassword = require('crypto').createHash('sha256').update(newPassword).digest('hex');

    db.query('UPDATE User SET User_password = ? WHERE User_ID = ?', [hashedNewPassword, user_id], (error) => {
      if (error) {
        return res.status(500).json({ status: "failure", timestamp: Date.now(), data: error.message });
      }
      res.json({ status: "success", timestamp: Date.now(), data: "password updated" });
    });
  });
}

function login(req, res) {
  const { email, password } = req.body;
  const hashedPassword = require('crypto').createHash('sha256').update(password).digest('hex');

  db.query('SELECT * FROM User WHERE Email = ?', [email], (error, results) => {
    if (error) {
      return res.status(500).json({ status: "failure", timestamp: Date.now(), data: error.message });
    }
    if (results.length === 0) {
      return res.status(400).json({ status: "error", timestamp: Date.now(), data: "user does not exist" });
    }

    const user = results[0];
    if (user.User_password !== hashedPassword) {
      return res.status(400).json({ status: "error", timestamp: Date.now(), data: "incorrect password" });
    }

    req.session.userId = user.User_ID;
    res.json({ status: "success", timestamp: Date.now(), data: "login successful" });
  });
}

function history(req, res) {
  const user_id = 2;

  db.query('SELECT * FROM Activity WHERE User_ID = ?', [user_id], (error, results) => {
    if (error) {
      return res.status(500).json({ status: "failure", timestamp: Date.now(), data: error.message });
    }
    res.json({ status: "success", timestamp: Date.now(), data: results });
  });
}

// function signUp(req, res) {
//   const { fname, surname, id_number,dob, phone, email, password, street_name, street_no, suburb, city, province, postal_code } = req.body;

//   const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
//   if (!emailPattern.test(email)) {
//     return res.status(400).json({ status: "error", timestamp: Date.now(), data: "invalid email address" });
//   }
//   db.query('SELECT COUNT(*) AS count FROM User WHERE ID_no = ?', [id_number], (error, results)  => {
//     if (error) {
//       return res.status(500).json({ status: "failure", timestamp: Date.now(), data: error.message });
//     }
//     if (results[0].count > 0) {
//       return res.status(400).json({ status: "error", timestamp: Date.now(), data: "ID number already in use" });
//     }
// });

//   db.query('SELECT COUNT(*) AS count FROM User WHERE Email = ?', [email], (error, results) => {
//     if (error) {
//       return res.status(500).json({ status: "failure", timestamp: Date.now(), data: error.message });
//     }
//     if (results[0].count > 0) {
//       return res.status(400).json({ status: "error", timestamp: Date.now(), data: "email already in use" });
//     }
//     db.query('SELECT COUNT(*) AS count FROM User WHERE Phone_no = ?', [phone], (error, results)  => {
//       if (error) {
//         return res.status(500).json({ status: "failure", timestamp: Date.now(), data: error.message });
//       }
//       if (results[0].count > 0) {
//         return res.status(400).json({ status: "error", timestamp: Date.now(), data: "phone number already in use" });
//       }
//     });
    
    

    

//     const hashedPassword = require('crypto').createHash('sha256').update(password).digest('hex');

//     const sqlUser = 'INSERT INTO User (ID_no, First_Name, Last_Name, Date_of_Birth,Phone_no, Email, User_password) VALUES (?, ?, ?, ?, ?,?,?)';
//     const userValues = [id_number, fname, surname, dob, phone, email, hashedPassword];

//     db.query(sqlUser, userValues, (error, results) => {
//       if (error) {
//         return res.status(500).json({ status: "failure", timestamp: Date.now(), data: error.message });
//       }

//       const userId = results.insertId;
//       const sqlAddress = 'INSERT INTO User_Address (User_ID, Street_no, Street_name, Suburb, City, Postal_code, Province) VALUES (?, ?, ?, ?, ?, ?, ?)';
//       const addressValues = [userId, street_no, street_name, suburb, city, postal_code, province];

//       db.query(sqlAddress, addressValues, (error) => {
//         if (error) {
//           return res.status(500).json({ status: "failure", timestamp: Date.now(), data: error.message });
//         }
//         res.json({ status: "success", timestamp: Date.now(), data: "user signed up successfully" });
//       });
//     });
//   });
// }
function signUp(req, res) {
  const { fname, surname, id_number, dob, phone, email, password, street_name, street_no, suburb, city, province, postal_code,pp } = req.body;

  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailPattern.test(email)) {
    return res.status(400).json({ status: "error", timestamp: Date.now(), data: "invalid email address" });
  }

  // Check if ID number is already in use////valid???
  db.query('SELECT COUNT(*) AS count FROM User WHERE ID_no =?', [id_number], (error, results) => {
    if (error) {
      return res.status(500).json({ status: "failure", timestamp: Date.now(), data: error.message });
    }
    if (results[0].count > 0) {
      return res.status(400).json({ status: "error", timestamp: Date.now(), data: "ID number already in use" });
    }

    // Check if email is already in use
    db.query('SELECT COUNT(*) AS count FROM User WHERE Email =?', [email], (error, results) => {
      if (error) {
        return res.status(500).json({ status: "failure", timestamp: Date.now(), data: error.message });
      }
      if (results[0].count > 0) {
        return res.status(400).json({ status: "error", timestamp: Date.now(), data: "email already in use" });
      }

      // Check if phone number is already in use
      db.query('SELECT COUNT(*) AS count FROM User WHERE Phone_no =?', [phone], (error, results) => {
        if (error) {
          return res.status(500).json({ status: "failure", timestamp: Date.now(), data: error.message });
        }
        if (results[0].count > 0) {
          return res.status(400).json({ status: "error", timestamp: Date.now(), data: "phone number already in use" });
        }

        // Proceed with user creation
        const hashedPassword = require('crypto').createHash('sha256').update(password).digest('hex');

        const sqlUser = 'INSERT INTO User (ID_no, First_Name, Last_Name, Date_of_Birth, Phone_no, Email, User_password,Profile_Pic) VALUES (?,?,?,?,?,?,?,?)';
        const userValues = [id_number, fname, surname, dob, phone, email, hashedPassword,pp];

        db.query(sqlUser, userValues, (error, results) => {
          if (error) {
            return res.status(500).json({ status: "failure", timestamp: Date.now(), data: error.message });
          }

          const userId = results.insertId;
          const sqlAddress = 'INSERT INTO User_Address (User_ID, Street_no, Street_name, Suburb, City, Postal_code, Province) VALUES (?,?,?,?,?,?,?)';
          const addressValues = [userId, street_no, street_name, suburb, city, postal_code, province];

          db.query(sqlAddress, addressValues, (error) => {
            if (error) {
              return res.status(500).json({ status: "failure", timestamp: Date.now(), data: error.message });
            }
            res.json({ status: "success", timestamp: Date.now(), data: "user signed up successfully" });
          });
        });
      });
    });
  });
}


});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
