const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  img: { type: String, required: true },
  name: { type: String, required: true, unique: true },
  service: { type: String, required: true },
  skills: { type: String, required: true },
  exp: { type: String, required: true },
  description: { type: String, required: true },
  rate: { type: String, required: true }
});

const serviceModel = mongoose.model('service', serviceSchema);

module.exports = serviceModel;