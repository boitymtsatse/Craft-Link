
// const serviceModel = require('./ServiceModel');

// const addService = async (req, res) => {

//     const { img, name, service, skills, exp, description, rate } = req.body;
//     //find in db
//     try {
//       let serviceName = await serviceModel.findOne({ name });
  
//       if (serviceName) return res.status(400).json("This name is taken.");
  
//       if (!img || !name || !service || !skills || !exp || !description || !rate)
//         return res.status(400).json("All fields are required");
  
      
  
//       newService = new serviceModel({ img, name, service, skills, exp, description, rate });
  
      
  
//       await newService.save();
  
  
//       res.status(200).json({ message: 'Service added successfully!' });
//     } catch (error) {
//       console.log(error);
//       res.status(500).json(error);
//     }
//   };

const mysql = require('mysql2/promise');
const connectDB = require("./dbcon");


const addService = async (req, res) => {
  
  const { img, name, service, skills, exp, description, rate , user_id } = req.body;

  if (!img || !name || !service || !skills || !exp || !description || !rate) {
    return res.status(400).json("All fields are required");
  }

  let connection;
  try {
    connection = await connectDB;

    // Check if service name exists
    const [rows] = await connection.execute('SELECT * FROM serviceModel WHERE name = ?', [name]);

    if (rows.length > 0) {
      return res.status(400).json("This name is taken.");
    }

    // Insert new service
    await connection.execute(
      'INSERT INTO serviceModel (img, name, service, skills, exp, description, rate, user_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [img, name, service, skills, exp, description, rate, user_id]
    );

    res.status(200).json({ message: 'Service added successfully!' });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

module.exports = addService;
  
  module.exports = { addService };