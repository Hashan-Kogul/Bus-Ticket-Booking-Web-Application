const mongoose = require('mongoose');

const passengerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  identityNumber: { type: String, required: true },
  age: { type: Number, required: true },
  contact: { type: String, required: true },
  seat: { type: String, required: true },
  busId: { type: mongoose.Schema.Types.ObjectId, ref: 'Bus', required: true },
  price: { type: Number, required: true },
  bookingDate: { type: Date, default: Date.now },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

module.exports = mongoose.model('Passenger', passengerSchema);
