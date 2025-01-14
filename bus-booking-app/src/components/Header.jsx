import React from 'react';
import { FaBus, FaSignOutAlt, FaTachometerAlt } from 'react-icons/fa';

const Header = ({ onLogout, onNavigate }) => {
  return (
    <header className="w-full bg-teal-500 text-white flex justify-between items-center p-4 fixed top-0 left-0 z-10 shadow-md">
      {/* Left Side: Bus Icon */}
      <div className="flex items-center">
        <FaBus
          className="text-4xl cursor-pointer"
          onClick={() => onNavigate('/home')}
        />
      </div>

      {/* Center: Heading */}
      <div className="flex flex-grow justify-center">
        <h1 className="text-2xl font-bold">Bus Ticket Booking</h1>
      </div>

      {/* Right Side: Dashboard and Logout Icons */}
      <div className="flex items-center space-x-6">
        <FaTachometerAlt
          className="text-2xl cursor-pointer"
          onClick={() => onNavigate('/dashboard')}
          title="Dashboard" // Use the native title attribute for tooltip
        />
        <FaSignOutAlt
          className="text-2xl cursor-pointer"
          onClick={onLogout}
          title="Logout" // Use the native title attribute for tooltip
        />
      </div>
    </header>
  );
};

export default Header;