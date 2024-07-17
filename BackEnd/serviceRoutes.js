const express = require('express');
const { addService } = require('./ServiceController');
const multer = require('multer');

const router = express.Router();

// Multer setup for handling file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

// Route to add service
router.post('/add',addService);

module.exports = router;

// router.post('/add', upload.single('img'), (req, res, next) => {
//   req.body.img = req.file ? req.file.path : '';
//   // next();
// }, addService);