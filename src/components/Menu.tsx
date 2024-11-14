// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';

// const Menu: React.FC = () => {
//   const [isOpen, setIsOpen] = useState(false);

//   const toggleMenu = () => {
//     setIsOpen(!isOpen);
//   };

//   return (
//     <div>
//       {/* Hamburger-knapp */}
//       <button className="hamburger" onClick={toggleMenu}>
//         {/* En enkel hamburger-ikon med tre linjer */}
//         <span className="line"></span>
//         <span className="line"></span>
//         <span className="line"></span>
//       </button>

//       {/* Menylänkar */}
//       {isOpen && (
//         <div className="menu">
//           <Link to="/booking" onClick={toggleMenu}>Booking</Link>
//           <Link to="/confirmation" onClick={toggleMenu}>Confirmation</Link>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Menu;
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
      {/* Logo som öppnar sidomenyn */}
      <button className="hamburger" onClick={toggleMenu}>
      <span className="line"></span>
      <span className="line"></span>
      <span className="line"></span>
      </button>

      {/* Sidomenyn, animerad med Framer Motion */}
      <motion.div 
        className="sidebar"
        initial={{ x: '-100%', opacity: 0 }} // Startläge: utanför skärmen och osynlig
        animate={{ x: isOpen ? 0 : '-100%', opacity: isOpen ? 1 : 0 }} // När öppen: x = 0 och tonas in
        transition={{ duration: 0.7, ease: "easeInOut" }} // Använder ease-in-out för mjukare rörelse
      >
        <ul>
          <li>
            <Link to="/booking" onClick={toggleMenu}>Booking</Link>
          </li>
          <li>
            <Link to="/confirmation" onClick={toggleMenu}>Confirmation</Link>
          </li>
        </ul>
      </motion.div>
    </>
  );
};

export default Menu;
