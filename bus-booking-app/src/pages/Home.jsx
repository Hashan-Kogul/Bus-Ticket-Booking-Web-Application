import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // For API requests
import Header from '../components/Header';

const Home = () => {
  const navigate = useNavigate();
  const [searchCriteria, setSearchCriteria] = useState({
    source: '',
    destination: '',
    date: '',
    time: '',
  });

  const [availableBuses, setAvailableBuses] = useState([]);
  const [loading, setLoading] = useState(true); // For loading state
  const [errorMessage, setErrorMessage] = useState(''); // For error messages

  // Fetch buses from the backend
  const fetchBuses = async (filters = {}) => {
    setLoading(true);
    try {
      const query = new URLSearchParams(filters).toString();
      const response = await axios.get(`http://localhost:5000/api/buses?${query}`);
      setAvailableBuses(response.data.data || []); // Handle response data
    } catch (err) {
      console.error('Failed to fetch buses:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBuses();
  }, []); // Runs only once when the component mounts

  // Handle search input changes
  const handleChange = (e) => {
    setSearchCriteria({
      ...searchCriteria,
      [e.target.name]: e.target.value,
    });
  };

  // Handle search functionality
  const handleSearch = () => {
    if (!searchCriteria.source || !searchCriteria.destination) {
      setErrorMessage('Please select source and destination');
      return;
    }

    setErrorMessage(''); // Clear any previous error messages
    fetchBuses(searchCriteria);
  };

  // Handle reset functionality
  const handleReset = () => {
    setSearchCriteria({
      source: '',
      destination: '',
      date: '',
      time: '',
    });
    setErrorMessage(''); // Clear error messages
    fetchBuses(); // Re-fetch all buses
  };

  // Handle bus click to navigate to booking page
  const handleBusClick = (busId) => {
    navigate(`/booking/${busId}`); // Navigate to booking page with the bus ID
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 pt-20">
      <Header onLogout={handleLogout} onNavigate={handleNavigate} />
      <h1 className="text-2xl sm:text-3xl font-bold text-center">Welcome to the Booking Center</h1>

      {/* Search Bar */}
      <div className="mt-6 flex flex-col sm:flex-row sm:justify-center sm:space-x-4 space-y-4 sm:space-y-0">
        <input
          type="text"
          name="source"
          placeholder="Source"
          className="p-2 border rounded w-full sm:w-auto"
          value={searchCriteria.source}
          onChange={handleChange}
        />
        <input
          type="text"
          name="destination"
          placeholder="Destination"
          className="p-2 border rounded w-full sm:w-auto"
          value={searchCriteria.destination}
          onChange={handleChange}
        />
        <input
          type="date"
          name="date"
          className="p-2 border rounded w-full sm:w-auto"
          value={searchCriteria.date}
          onChange={handleChange}
        />
        <input
          type="time"
          name="time"
          className="p-2 border rounded w-full sm:w-auto"
          value={searchCriteria.time}
          onChange={handleChange}
        />
        <button
          onClick={handleSearch}
          className="bg-teal-500 text-white p-2 rounded w-full sm:w-auto"
        >
          Search
        </button>
        <button
          onClick={handleReset}
          className="bg-gray-500 text-white p-2 rounded w-full sm:w-auto"
        >
          Reset
        </button>
      </div>

      {/* Error Message */}
      {errorMessage && (
        <p className="text-center text-red-500 mt-4">{errorMessage}</p>
      )}

      {/* Display Available Buses */}
      <div className="mt-6">
        <h2 className="text-xl sm:text-2xl font-bold">Available Buses</h2>
        <div className="space-y-4 mt-4">
          {loading ? (
            <div className="min-h-screen bg-gray-100 flex justify-center items-center">
              <div className="w-12 h-12 border-4 border-t-4 border-teal-600 border-solid rounded-full animate-spin"></div>
            </div>
          ) : availableBuses.length === 0 ? (
            <p className="text-center text-gray-500">No buses available. Try adjusting your search criteria.</p>
          ) : (
            availableBuses.map((bus) => (
              <div
                key={bus._id} // Use MongoDB's `_id` field as the unique key
                className="border p-4 rounded flex flex-col sm:flex-row sm:justify-between items-start sm:items-center"
              >
                <div className="mb-4 sm:mb-0">
                  <h3 className="font-bold">{bus.busName}</h3>
                  <p>{bus.source} to {bus.destination}</p>
                  <p>{bus.date} at {bus.time}</p>
                </div>
                <button
                  onClick={() => handleBusClick(bus._id)}
                  className="bg-teal-500 text-white p-2 rounded"
                >
                  Book Now
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;