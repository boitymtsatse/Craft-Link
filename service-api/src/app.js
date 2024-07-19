// const express = require('express');
// const pool = require('./db');
// const router = express.Router();
//////////////////////////////////////////////////

// const express = require('express');
// const pool = require('./db');
// const routes = require('./routes');
// const app = express();
// const port = process.env.PORT || 5000;

// app.use(express.json());
// app.use('/services', routes);

// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });

const express = require('express');
const dotenv = require('dotenv');
const routes = require('./routes');

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use('/api', routes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


// Fetch all services
routes.get('/services', async (req, res) => {
  try {
    const [services] = await pool.query('SELECT * FROM Service_Profile');
    res.json(services);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

// Fetch service details by ID
routes.get('/services', async (req, res) => {
  try {
    const { id } = req.params;
    const [service] = await pool.query('SELECT * FROM Service_Profile WHERE Service_ID = ?', [id]);
    if (service.length === 0) {
      return res.status(404).send('Service not found');
    }
    res.json(service[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

module.exports = routes;
