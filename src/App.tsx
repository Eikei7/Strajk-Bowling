import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Booking from './components/Booking';
import Confirmation from './components/Confirmation';
import Home from './components/Home';
import './App.css';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/confirmation" element={<Confirmation />} />
      </Routes>
    </Router>
  );
};

export default App;
