import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate('/booking');
  };

  return (
    <div className="home-container" onClick={handleLogoClick}>
      <img src="/logo.svg" alt="Strajk Logo" className="logo" />
      <h1>STRAJK</h1>
      <h3>BOWLING</h3>
    </div>
  );
};

export default Home;