const express = require('express');
const Passenger = require('../models/Passenger');
const auth = require('../middlewares/auth');
const router = express.Router();

// POST route to store passenger details
router.post('/book', async (req, res) => {
  try {
    const { name, identityNumber, age, contact, seat, busId, price, userId } = req.body;

    const newPassenger = new Passenger({
      name,
      identityNumber,
      age,
      contact,
      seat,
      busId,
      price,
      userId,
    });

    await newPassenger.save();
    res.status(201).json({ message: 'Booking confirmed', passenger: newPassenger });
  } catch (error) {
    res.status(500).json({ message: 'Error confirming booking', error });
  }
});

// GET all bookings for the logged-in user
router.get('/', auth, async (req, res) => {
  try {
    console.log('Logged-in User ID:', req.user.id);

    const bookings = await Passenger.find({ userId: req.user.id }).populate('busId');

    if (!bookings || bookings.length === 0) {
      return res.status(404).json({ message: 'No bookings found for this user' });
    }

    res.status(200).json(bookings);
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({ message: 'Error fetching bookings', error: error.message || error });
  }
});

// DELETE route to cancel a booking
router.delete('/:id', auth, async (req, res) => {
  try {
    const bookingId = req.params.id;

    // Ensure the booking exists and belongs to the logged-in user
    const booking = await Passenger.findOne({ _id: bookingId, userId: req.user.id });
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found or unauthorized' });
    }

    // Delete the booking
    await Passenger.findByIdAndDelete(bookingId);

    res.status(200).json({ message: 'Booking canceled successfully' });
  } catch (error) {
    console.error('Error canceling booking:', error);
    res.status(500).json({ message: 'Error canceling booking', error: error.message || error });
  }
});

module.exports = router;