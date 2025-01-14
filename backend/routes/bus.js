const express = require('express');
const Bus = require('../models/Bus');
const router = express.Router();

// Add multiple buses
router.post('/add', async (req, res) => {
  const buses = req.body; // Expecting an array of bus objects

  // Check if the body is an array and contains at least one bus
  if (!Array.isArray(buses) || buses.length === 0) {
    return res.status(400).json({
      success: false,
      message: 'Request body must be a non-empty array of buses.',
    });
  }

  try {
    // Validate and save each bus
    const savedBuses = await Bus.insertMany(buses);

    res.status(201).json({
      success: true,
      message: 'Buses added successfully.',
      data: savedBuses,
    });
  } catch (error) {
    console.error('Error while adding buses:', error);
    res.status(500).json({
      success: false,
      message: 'Server error. Could not add buses.',
    });
  }
});

// Get all buses with query filters
router.get('/', async (req, res) => {
  const { source, destination, date, time } = req.query;

  try {
    const filter = {};

    if (source) filter.source = new RegExp(source, 'i'); // Case-insensitive search
    if (destination) filter.destination = new RegExp(destination, 'i'); // Case-insensitive search
    if (date) filter.date = date; // Exact match
    if (time) filter.time = time; // Exact match

    const buses = await Bus.find(filter);
    res.status(200).json({
      success: true,
      data: buses,
    });
  } catch (error) {
    console.error('Error while fetching buses:', error);
    res.status(500).json({
      success: false,
      message: 'Server error. Could not fetch buses.',
    });
  }
});

// Get bus details by ID
router.get('/:id', async (req, res) => {
    try {
      const bus = await Bus.findById(req.params.id);
      if (!bus) {
        return res.status(404).json({ message: 'Bus not found' });
      }
      res.status(200).json(bus);
    } catch (error) {
      console.error('Error fetching bus details:', error);
      res.status(500).json({ message: 'Server error' });
    }
});
  

module.exports = router;