const mongoose = require('mongoose');

const BusSchema = new mongoose.Schema({
  source: { type: String, required: true },
  destination: { type: String, required: true },
  busName: { type: String, required: true },
  time: { type: String, required: true },
  date: { type: String, required: true },
});

module.exports = mongoose.model('Bus', BusSchema);