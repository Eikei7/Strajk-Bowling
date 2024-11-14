// import React from 'react';
// import { Link } from 'react-router-dom';

// const Menu: React.FC = () => {
//   return (
//     <div className="menu">
//       <Link to="/booking">Booking</Link>
//       <Link to="/confirmation">Confirmation</Link>
//     </div>
//   );
// };

// export default Menu;
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Menu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      {/* Hamburger-knapp */}
      <button className="hamburger" onClick={toggleMenu}>
        {/* En enkel hamburger-ikon med tre linjer */}
        <span className="line"></span>
        <span className="line"></span>
        <span className="line"></span>
      </button>

      {/* Menylänkar */}
      {isOpen && (
        <div className="menu">
          <Link to="/booking" onClick={toggleMenu}>Booking</Link>
          <Link to="/confirmation" onClick={toggleMenu}>Confirmation</Link>
        </div>
      )}
    </div>
  );
};

export default Menu;
