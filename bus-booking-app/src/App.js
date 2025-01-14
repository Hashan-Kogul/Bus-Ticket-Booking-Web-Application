import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Booking from './pages/Booking';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Register from './pages/Register';
import PaymentGateway from './pages/PaymentGateway';
import Settings from './pages/Settings';
import './index.css';
import 'react-tooltip/dist/react-tooltip.css';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check if there's a token in localStorage to determine if the user is logged in
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <Router>
      <Routes>
        {/* Default route to Login */}
        <Route path="/" element={<Navigate to="/login" />} />
        
        <Route
          path="/login"
          element={<Login onLogin={() => setIsLoggedIn(true)} />} // Pass the onLogin function
        />
        
        <Route
          path="/register"
          element={<Register />}
        />
        
        {/* Protect other routes */}
        <Route
          path="/home"
          element={isLoggedIn ? <Home /> : <Navigate to="/login" />}
        />
        
        {/* Dynamic Booking Route */}
        <Route
          path="/booking/:busId"
          element={isLoggedIn ? <Booking /> : <Navigate to="/login" />}
        />
        
        <Route
          path="/dashboard"
          element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />}
        />
        
        <Route
          path="/payment-gateway"
          element={isLoggedIn ? <PaymentGateway /> : <Navigate to="/login" />}
        />
        
        {/* Protect Settings route */}
        <Route
          path="/settings"
          element={isLoggedIn ? <Settings /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
};

export default App;