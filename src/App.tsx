// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Booking from './components/Booking';
import Confirmation from './components/Confirmation';
import Menu from './components/Menu';
import './App.css';

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <nav>
          <Link to="/booking">Booking</Link>
          <Link to="/confirmation">Confirmation</Link>
          <Menu />
        </nav>
        <Routes>
          <Route path="/booking" element={<Booking />} />
          <Route path="/confirmation" element={<Confirmation />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
