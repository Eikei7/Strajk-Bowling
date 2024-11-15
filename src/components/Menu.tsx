import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Menu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Hamburger-knappen */}
      <button className="hamburger" onClick={toggleMenu}>
        <span className="line"></span>
        <span className="line"></span>
        <span className="line"></span>
      </button>

      {/* Sidomenyn */}
      <motion.div
        className={`sidebar ${isOpen ? '' : 'sidebar-hidden'}`}
        initial={{ x: '-100%', opacity: 0 }}
        animate={{ x: isOpen ? 0 : '-100%', opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.7, ease: 'easeInOut' }}
      >
        <ul>
          <li>
            <Link to="/booking" onClick={toggleMenu}>
              Booking
            </Link>
          </li>
          <li>
            <Link to="/confirmation" onClick={toggleMenu}>
              Confirmation
            </Link>
          </li>
        </ul>
      </motion.div>
    </>
  );
};

export default Menu;
