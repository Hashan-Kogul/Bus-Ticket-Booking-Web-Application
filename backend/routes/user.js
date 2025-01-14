const express = require('express');
const User = require('../models/User');
const auth = require('../middlewares/auth'); // Middleware to check JWT

const router = express.Router();

// Get User Details - Protected Route
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    console.error('Error fetching user details:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update Profile Route
router.put('/update', auth, async (req, res) => {
  const { firstName, lastName, password } = req.body;

  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update name fields
    user.firstName = firstName;
    user.lastName = lastName;

    // If a new password is provided, change it
    if (password && password.length >= 6) {
      user.password = password; // Password will be hashed automatically by the pre-save hook
    }

    await user.save();
    res.status(200).json({ message: 'Profile updated successfully!' });
  } catch (err) {
    console.error('Error updating profile:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
