import './App.css';
import Booking from './components/Booking';
import MyBookings from './components/MyBookings';
import Home from './components/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React, { useEffect } from 'react';

import { getCookie, setCookie } from './helpers/cookieHelper';
import { v4 as uuidv4 } from 'uuid';

function App() {
  useEffect(() => {
    let userId = getCookie('userId');
    if(!userId) {
      userId = uuidv4();
      setCookie('userId', userId, 7);
    }
  }, []);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/book/:classId" element={<Booking />} />
        <Route path="/my-bookings" element={<MyBookings />} />
      </Routes>
    </Router>
  );
}

export default App;
