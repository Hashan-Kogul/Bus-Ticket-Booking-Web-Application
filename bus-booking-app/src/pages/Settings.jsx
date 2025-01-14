import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';
import { FaUserCircle, FaEye, FaEyeSlash } from 'react-icons/fa';
import Header from '../components/Header';

const Settings = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({ firstName: '', lastName: '', email: '' });
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loading, setLoading] = useState(true);
  const [updated, setUpdated] = useState(false);
  
  const [showOldPassword, setShowOldPassword] = useState(false); // State to toggle old password visibility
  const [showNewPassword, setShowNewPassword] = useState(false); // State to toggle new password visibility
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // State to toggle confirm password visibility

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login', { replace: true });
      return;
    }

    const fetchUserDetails = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/users', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data); 
      } catch (error) {
        console.error('Error fetching user details:', error);
        navigate('/login', { replace: true });
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [navigate]);

  const handleProfileUpdate = async () => {
    if (newPassword.length > 0 || confirmPassword.length > 0) {
      if (newPassword.length < 6) {
        setPasswordError('Password must be at least 6 characters long.');
        return;
      }
      if (newPassword !== confirmPassword) {
        setPasswordError('Passwords do not match.');
        return;
      }
    }

    const token = localStorage.getItem('token');
    try {
      const profileData = {
        firstName: user.firstName,
        lastName: user.lastName,
        password: newPassword.length > 0 ? newPassword : undefined,
      };

      await axios.put(
        'http://localhost:5000/api/users/update',
        profileData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (newPassword.length > 0) {
        localStorage.removeItem('token');
        navigate('/login', { replace: true });
      } else {
        toast.success('Profile updated successfully!', {
          position: 'bottom-right',
          autoClose: 3000,
        });
      }

      setPasswordError('');
      setNewPassword('');
      setConfirmPassword('');
      setUpdated(true);

    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('An error occurred while updating your profile.', {
        position: 'bottom-right',
        autoClose: 3000,
      });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6 pt-24">
      <Header onLogout={handleLogout} onNavigate={handleNavigate} />
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-3xl">
        <h1 className="text-2xl font-semibold text-center mb-6">Profile Settings</h1>
        {loading ? (
          <div className="flex justify-center items-center min-h-[300px]">
            <div className="w-12 h-12 border-4 border-t-4 border-teal-500 border-solid rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex flex-col items-center mb-6">
              <FaUserCircle className="w-24 h-24 text-teal-500 mb-4" />
              <div className="w-full space-y-4">
                <div className="mb-2">
                  <label className="font-semibold text-sm">First Name</label>
                  <input
                    type="text"
                    value={user.firstName}
                    onChange={(e) => setUser({ ...user, firstName: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
                <div className="mb-2">
                  <label className="font-semibold text-sm">Last Name</label>
                  <input
                    type="text"
                    value={user.lastName}
                    onChange={(e) => setUser({ ...user, lastName: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
                <div className="mb-2">
                  <label className="font-semibold text-sm">Email</label>
                  <input
                    type="text"
                    value={user.email}
                    readOnly
                    className="w-full p-3 border border-gray-300 rounded mt-1 bg-gray-100 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Password Change Section */}
            <div className="mt-8 space-y-4">
              <h3 className="text-xl font-semibold">Change Password</h3>
              <div className="relative">
                <input
                  type={showOldPassword ? 'text' : 'password'}
                  placeholder="Old Password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
                <span
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                  onClick={() => setShowOldPassword(!showOldPassword)}
                >
                  {showOldPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>

              <div className="relative">
                <input
                  type={showNewPassword ? 'text' : 'password'}
                  placeholder="New Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
                <span
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                >
                  {showNewPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>

              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Confirm New Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
                <span
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>

              {passwordError && <p className="text-red-500 text-sm">{passwordError}</p>}
            </div>

            <div className="mt-8 space-y-4">
              <button
                onClick={handleProfileUpdate}
                className="w-full bg-teal-500 text-white py-3 rounded-lg hover:bg-teal-600 transition duration-200"
              >
                Update Profile
              </button>
            </div>
          </div>
        )}
      </div>

      <ToastContainer />
    </div>
  );
};

export default Settings;