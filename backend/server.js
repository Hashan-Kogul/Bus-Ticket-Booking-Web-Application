const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const cors = require('cors'); // Import CORS
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const busRoutes = require('./routes/bus');
const bookingRoute = require('./routes/bookingRoute');
const userRoutes = require('./routes/user');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // To parse JSON requests

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/buses', busRoutes);
app.use('/api/booking', bookingRoute);
app.use('/api/users', userRoutes);

// Start the server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
