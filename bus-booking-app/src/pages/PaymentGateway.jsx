import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../components/Header';

const PaymentGateway = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Get the state passed from Booking component
  const { price } = location.state || {}; // Extract the price from state
  
  const [paymentDetails, setPaymentDetails] = useState({
    cardholderName: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });
  const [cardType, setCardType] = useState('Visa'); // State for selected card type
  const [isPaymentSuccessful, setIsPaymentSuccessful] = useState(false);

  const handleInputChange = (e) => {
    setPaymentDetails({
      ...paymentDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleCardTypeChange = (e) => {
    setCardType(e.target.value); // Update card type
  };

  const handlePayment = () => {
    // Simulate payment process
    setIsPaymentSuccessful(true); // Show the modal
  };

  const handleBackToDashboard = () => {
    navigate('/dashboard'); // Redirect to dashboard
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-100 to-blue-50 p-6 pt-24 flex justify-center items-center">
      <Header onLogout={handleLogout} onNavigate={handleNavigate} />
      <div className="bg-white shadow-2xl rounded-lg p-8 w-full max-w-lg">
        <h2 className="text-3xl font-bold mb-6 text-teal-700 text-center">Secure Payment</h2>
        <form>
          {/* Cardholder Name */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Cardholder Name</label>
            <input
              type="text"
              name="cardholderName"
              value={paymentDetails.cardholderName}
              onChange={handleInputChange}
              className="p-3 w-full border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-400"
              placeholder="John Doe"
              required
            />
          </div>
          {/* Card Type Selection */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Card Type</label>
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <input
                  type="radio"
                  id="visa"
                  name="cardType"
                  value="Visa"
                  checked={cardType === 'Visa'}
                  onChange={handleCardTypeChange}
                  className="mr-2"
                />
                <label htmlFor="visa" className="text-gray-700">Visa</label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="mastercard"
                  name="cardType"
                  value="MasterCard"
                  checked={cardType === 'MasterCard'}
                  onChange={handleCardTypeChange}
                  className="mr-2"
                />
                <label htmlFor="mastercard" className="text-gray-700">MasterCard</label>
              </div>
            </div>
          </div>
          {/* Card Number */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Card Number</label>
            <input
              type="text"
              name="cardNumber"
              value={paymentDetails.cardNumber}
              onChange={handleInputChange}
              className="p-3 w-full border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-400"
              placeholder="1234 5678 9012 3456"
              required
            />
          </div>
          {/* Expiry Date */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Expiry Date</label>
            <input
              type="text"
              name="expiryDate"
              placeholder="MM/YY"
              value={paymentDetails.expiryDate}
              onChange={handleInputChange}
              className="p-3 w-full border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-400"
              required
            />
          </div>
          {/* CVV */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">CVV</label>
            <input
              type="password"
              name="cvv"
              value={paymentDetails.cvv}
              onChange={handleInputChange}
              className="p-3 w-full border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-400"
              placeholder="***"
              required
            />
          </div>
          {/* Price (readonly) */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Price</label>
            <input
              type="text"
              value={`LKR ${price}`} // Display the price passed from Booking component
              readOnly
              className="p-3 w-full border rounded-lg shadow-sm bg-gray-100"
            />
          </div>
          {/* Pay Now Button */}
          <button
            type="button"
            onClick={handlePayment}
            className="w-full bg-teal-500 text-white font-semibold p-3 rounded-lg shadow-lg hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-400"
          >
            Pay Now
          </button>
        </form>
      </div>

      {/* Payment Success Modal */}
      {isPaymentSuccessful && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg p-6 shadow-lg w-80 text-center">
            <h3 className="text-2xl font-bold text-teal-700 mb-4">Payment Successful!</h3>
            <p className="text-gray-600 mb-6">Your ticket has been booked successfully.</p>
            <button
              onClick={handleBackToDashboard}
              className="bg-teal-500 text-white font-semibold px-4 py-2 rounded-lg shadow hover:bg-teal-600"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentGateway;