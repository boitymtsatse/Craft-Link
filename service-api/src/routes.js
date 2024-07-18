const express = require('express');
const pool = require('./db');
const router = express.Router();

// Fetch all services
router.get('/services', async (req, res) => {
  try {
    const [services] = await pool.query('SELECT * FROM Service_Profile');
    res.json(services);
  } catch (error) {
    console.error(error);
    res.status(500).send('Look at me1!');
    
  }
});

// Fetch service details by ID
router.get('/services/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const [service] = await pool.query('SELECT * FROM Service_Profile WHERE Service_ID = ?', [id]);
    if (service.length === 0) {
      return res.status(404).send('Service not found');
    }
    res.json(service[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send('Memo 2');
  }
});

module.exports = router;
