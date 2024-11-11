import React from 'react';
import { Link } from 'react-router-dom';

const Menu: React.FC = () => {
  return (
    <div className="menu">
      <Link to="/booking">Booking</Link>
      <Link to="/confirmation">Confirmation</Link>
    </div>
  );
};

export default Menu;