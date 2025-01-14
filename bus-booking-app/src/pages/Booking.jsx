import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { toast } from 'react-toastify'; // To show error notifications
import Header from '../components/Header';

const Booking = () => {
  const { busId } = useParams();
  const navigate = useNavigate();

  const [busDetails, setBusDetails] = useState(null);
  const [passengerDetails, setPassengerDetails] = useState({
    name: '',
    identityNumber: '',
    age: '',
    contact: '',
    seat: '',
  });
  const [price, setPrice] = useState('');
  const [userId, setUserId] = useState('');
  const [seatPopupVisible, setSeatPopupVisible] = useState(false);
  const [formErrors, setFormErrors] = useState({
    name: '',
    identityNumber: '',
    age: '',
    contact: '',
    seat: '',
  });

  useEffect(() => {
    // Fetch the logged-in user's ID from the token
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode(token); // Correct usage
      setUserId(decodedToken.id); // Extract and set userId from the token
    } else {
      navigate('/login'); // Redirect to login if no token is found
    }

    // Fetch bus details by bus ID from the backend
    const fetchBusDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/buses/${busId}`);
        setBusDetails(response.data);
      } catch (error) {
        console.error('Error fetching bus details:', error);
      }
    };

    fetchBusDetails();
    generateRandomPrice(); // Generate random price on component mount
  }, [busId, navigate]);

  const handleInputChange = (e) => {
    setPassengerDetails({
      ...passengerDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleBooking = async () => {
    let errors = {};
    let formValid = true;

    // Validate form fields
    if (!passengerDetails.name) {
      errors.name = 'Name is required';
      formValid = false;
    }
    if (!passengerDetails.identityNumber) {
      errors.identityNumber = 'Identity number is required';
      formValid = false;
    }
    if (!passengerDetails.age) {
      errors.age = 'Age is required';
      formValid = false;
    }
    if (!passengerDetails.contact) {
      errors.contact = 'Contact number is required';
      formValid = false;
    }
    if (!passengerDetails.seat) {
      errors.seat = 'Seat selection is required';
      formValid = false;
    }

    setFormErrors(errors); // Show error messages

    if (!formValid) {
      toast.error('Please fill in all the fields to complete your booking.', {
        position: 'bottom-right',
        autoClose: 3000,
      });
      return;
    }

    try {
      const bookingData = {
        ...passengerDetails,
        busId,
        price,
        userId, // Include the logged-in user's ID
      };

      console.log('Booking data:', bookingData);

      // Send the passenger details to the backend
      const response = await axios.post('http://localhost:5000/api/booking/book', bookingData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });

      if (response.status === 201) {
        // Redirect to the payment gateway with the generated price
        navigate('/payment-gateway', { state: { price } });
      }
    } catch (error) {
      console.error('Error booking the ticket:', error.response?.data || error.message);
    }
  };

  const generateRandomPrice = () => {
    const price = Math.floor(Math.random() * (2500 - 1000 + 1)) + 1000;
    const formattedPrice = price.toFixed(2); // Format the price to 2 decimal places
    setPrice(formattedPrice); // Store the price in the state
  };

  const handleSeatSelection = (selectedSeat) => {
    setPassengerDetails({ ...passengerDetails, seat: selectedSeat });
    setSeatPopupVisible(false); // Close the seat popup after selection
  };

  if (!busDetails) {
    return (
      <div className="min-h-screen bg-gray-100 flex justify-center items-center">
        <div className="w-16 h-16 border-4 border-t-4 border-teal-600 border-solid rounded-full animate-spin"></div>
      </div>
    );
  }

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 pt-24 flex justify-center items-center">
      <Header onLogout={handleLogout} onNavigate={handleNavigate} />
      <div className="bg-white shadow-lg rounded-lg p-6 w-3/4 md:w-2/3 flex">
        {/* Bus Info */}
        <div className="w-1/2 pr-6 border-r">
          <h2 className="text-2xl font-bold mb-4 text-teal-600">Bus Details</h2>
          <div className="bg-gray-50 p-4 rounded shadow">
            <p className="mb-2"><strong>Name:</strong> {busDetails.busName}</p>
            <p className="mb-2"><strong>Route:</strong> {busDetails.source} to {busDetails.destination}</p>
            <p className="mb-2"><strong>Date:</strong> {busDetails.date}</p>
            <p className="mb-2"><strong>Time:</strong> {busDetails.time}</p>
            <p className="mb-2"><strong>Price:</strong> LKR {price}</p>
            <p className="mb-2"><strong>Details:</strong> This is a luxury bus with AC and Wi-Fi.</p>
          </div>
        </div>

        {/* Passenger Form */}
        <div className="w-1/2 pl-6">
          <h2 className="text-2xl font-bold">Book Your Ticket</h2>
          <form className="mt-4">
            <div className="mb-4">
              <label className="block">Passenger Name</label>
              <input
                type="text"
                name="name"
                value={passengerDetails.name}
                onChange={handleInputChange}
                className="p-2 w-full border rounded"
                required
              />
              {formErrors.name && <p className="text-red-500 text-sm">{formErrors.name}</p>}
            </div>
            <div className="mb-4">
              <label className="block">Identity Number</label>
              <input
                type="text"
                name="identityNumber"
                value={passengerDetails.identityNumber}
                onChange={handleInputChange}
                className="p-2 w-full border rounded"
                required
              />
              {formErrors.identityNumber && <p className="text-red-500 text-sm">{formErrors.identityNumber}</p>}
            </div>

            <div className="mb-4">
              <label className="block">Age</label>
              <input
                type="number"
                name="age"
                value={passengerDetails.age}
                onChange={handleInputChange}
                className="p-2 w-full border rounded"
                required
              />
              {formErrors.age && <p className="text-red-500 text-sm">{formErrors.age}</p>}
            </div>
            <div className="mb-4">
              <label className="block">Contact Number</label>
              <input
                type="text"
                name="contact"
                value={passengerDetails.contact}
                onChange={handleInputChange}
                className="p-2 w-full border rounded"
                required
              />
              {formErrors.contact && <p className="text-red-500 text-sm">{formErrors.contact}</p>}
            </div>
            <div className="mb-4">
              <label className="block">Seat Selection</label>
              <input
                type="text"
                name="seat"
                value={passengerDetails.seat}
                onClick={() => setSeatPopupVisible(true)} // Show seat selection popup
                className="p-2 w-full border rounded"
                required
              />
              {formErrors.seat && <p className="text-red-500 text-sm">{formErrors.seat}</p>}
            </div>
            <button
              type="button"
              onClick={handleBooking}
              className="w-full bg-teal-500 text-white p-3 rounded"
            >
              Confirm Booking
            </button>
          </form>
        </div>
      </div>

      {/* Seat Selection Popup */}
      {seatPopupVisible && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-4 rounded-lg w-1/3">
            <h3 className="text-xl font-bold mb-4">Select a Seat</h3>
            <div className="grid grid-cols-5 gap-2">
              {[...Array(50).keys()].map((i) => (
                <button
                  key={i}
                  className="border p-2 rounded hover:bg-teal-500"
                  onClick={() => handleSeatSelection(i + 1)} // Select seat
                >
                  {i + 1}
                </button>
              ))}
            </div>
            <button
              className="mt-4 w-full bg-gray-400 text-white p-3 rounded"
              onClick={() => setSeatPopupVisible(false)} // Close popup
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Booking;