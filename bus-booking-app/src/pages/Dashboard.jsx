import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [popupVisible, setPopupVisible] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState(null);

  const fetchBookings = useCallback(async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/booking', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBookings(response.data);
    } catch (error) {
      console.error('Error fetching bookings:', error.response?.data || error);
      if (error.response?.status === 401) {
        alert('Your session has expired. Please log in again.');
        localStorage.removeItem('token');
        navigate('/login', { replace: true });
      }
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login', { replace: true });
    } else {
      fetchBookings();
    }
  }, [fetchBookings, navigate]);

  const handleCancelBooking = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/booking/${selectedBookingId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBookings((prevBookings) =>
        prevBookings.filter((booking) => booking._id !== selectedBookingId)
      );
      setPopupVisible(false);
      setSelectedBookingId(null);

      // Show success toast after canceling booking
      toast.success('Booking was cancelled successfully!', {
        position: 'bottom-right',
        autoClose: 3000,
      });
    } catch (error) {
      console.error('Error cancelling booking:', error.response?.data || error);
      toast.error('An error occurred while cancelling the booking. Please try again.', {
        position: 'bottom-right',
        autoClose: 3000,
      });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login', { replace: true });
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login', { replace: true });
      return;
    }

    // Handle the case where the user presses the back button after logout
    window.history.pushState(null, '', window.location.href);
    window.onpopstate = () => {
      navigate('/login', { replace: true });
    };
    
    // This is to ensure the page can't go back if a valid token is not present
    return () => {
      window.onpopstate = null; // Clean up the event listener when the component unmounts
    };
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <div className="w-1/4 bg-teal-500 text-white p-4 flex flex-col">
        <h2 className="text-xl font-bold mb-6">Dashboard</h2>
        <div className="mb-4">
          <button
            onClick={() => navigate('/home')}
            className="w-full bg-teal-600 p-2 rounded hover:bg-teal-700"
          >
            Booking Center
          </button>
        </div>
        <div className="mb-4">
          <button
            onClick={() => navigate('/settings')}
            className="w-full bg-teal-600 p-2 rounded hover:bg-teal-700"
          >
            Profile Settings
          </button>
        </div>
        <div className="mb-4">
          <button
            onClick={handleLogout}
            className="w-full bg-red-500 p-2 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="w-3/4 p-6">
        <h1 className="text-2xl font-bold">My Bookings</h1>
        <div className="mt-4">
          {loading ? (
            <div className="flex justify-center items-center min-h-[300px]">
              <div className="w-12 h-12 border-4 border-t-4 border-teal-500 border-solid rounded-full animate-spin"></div>
            </div>
          ) : bookings.length > 0 ? (
            bookings.map((booking) => (
              <div key={booking._id} className="border p-4 rounded mb-4">
                <p><strong>Passenger Name:</strong> {booking.name}</p>
                <p><strong>Identity Number:</strong> {booking.identityNumber}</p>
                <p><strong>Age:</strong> {booking.age}</p>
                <p><strong>Seat:</strong> {booking.seat}</p>
                <p><strong>Route:</strong> {booking.busId?.source} to {booking.busId?.destination}</p>
                <p><strong>Price:</strong> LKR {booking.price}</p>
                <p><strong>Time:</strong> {booking.busId?.time}</p>
                <p><strong>Date:</strong> {booking.busId?.date}</p>
                <button
                  className="bg-red-500 text-white p-2 rounded mt-2"
                  onClick={() => {
                    setPopupVisible(true);
                    setSelectedBookingId(booking._id);
                  }}
                >
                  Cancel Booking
                </button>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center min-h-[300px]">
              <p className="text-center text-xl text-gray-500 mb-4">No bookings available. Book a bus now!</p>
              <button
                onClick={() => navigate('/home')}
                className="bg-teal-500 text-white p-3 rounded hover:bg-teal-600"
              >
                Book a Bus
              </button>
            </div>
          )}
        </div>
      </div>

     {/* Confirmation Popup */}
        {popupVisible && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded shadow-lg text-center">
              {/* Warning Icon */}
              <div className="text-yellow-500 text-4xl mb-4">
                <i className="fas fa-exclamation-triangle"></i>
              </div>
              
              <p className="text-lg font-bold mb-4">
                Are you sure you want to cancel the booking?
              </p>
              <div className="flex justify-center space-x-4">
                <button
                  onClick={handleCancelBooking}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Yes, Cancel
                </button>
                <button
                  onClick={() => setPopupVisible(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                >
                  No
                </button>
              </div>
            </div>
          </div>
        )}

      <ToastContainer />
    </div>
  );
};

export default Dashboard;