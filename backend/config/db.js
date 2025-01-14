const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const dbURI = process.env.MONGO_URI || 'mongodb+srv://Hashan:Hashan_0825_DB@cluster0.w08kw.mongodb.net/bus_booking?retryWrites=true&w=majority';
    await mongoose.connect(dbURI);

    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1); // Exit the process with failure
  }
};

module.exports = connectDB;
