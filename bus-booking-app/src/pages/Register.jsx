import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false); // State for password visibility
  const [showModal, setShowModal] = useState(false); // State for showing modal
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (data.success) {
        // Show modal instead of toast
        setShowModal(true);
      } else {
        toast.error(data.message, {
          position: 'bottom-right',
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('An error occurred. Please try again.', {
        position: 'bottom-right',
        autoClose: 3000,
      });
    }
  };

  const handleNavigateToLogin = () => {
    navigate('/'); // Redirect to login page
    setShowModal(false); // Close modal
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-400 to-cyan-500">
      <div className="bg-white bg-opacity-90 shadow-xl rounded-lg p-4 w-full max-w-lg transform transition-all hover:scale-105">
        <h1 className="text-4xl font-bold text-gray-800 text-center mb-4">Register</h1>
        <p className="text-center text-gray-600 mb-4">Create a new account.</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              id="firstName"
              placeholder="Enter your first name"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              id="lastName"
              placeholder="Enter your last name"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter your email"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
              onChange={handleChange}
              required
            />
          </div>
          <div className="relative">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              id="password"
              placeholder="Enter your password"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
              onChange={handleChange}
              required
            />
            <span
              className="absolute right-3 cursor-pointer bottom-3"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          <button
            type="submit"
            className="w-full bg-teal-500 text-white py-2 px-4 rounded-lg font-medium text-lg shadow-md hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-offset-2 transition-all"
          >
            Register
          </button>
        </form>
        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <a href="/" className="text-teal-600 font-medium hover:underline">
              Login
            </a>
          </p>
        </div>
      </div>

      {/* ToastContainer component */}
      <ToastContainer />

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-xl text-center max-w-md w-full">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Registration Successful!</h2>
            <p className="text-gray-600 mb-4">Your account has been created successfully.</p>
            <button
              onClick={handleNavigateToLogin}
              className="bg-teal-500 text-white py-2 px-4 rounded-lg font-medium text-lg shadow-md hover:bg-teal-600 focus:outline-none"
            >
              Back to Login
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Register;