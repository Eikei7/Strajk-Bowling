// src/components/Confirmation.tsx
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { BookingResponse } from '../types';
import Menu from './Menu';

const Confirmation: React.FC = () => {
  const location = useLocation();
  const bookingData = location.state as BookingResponse | null; // Typdefiniera för att vara säker på datatypen
  const navigate = useNavigate();

  if (!bookingData) {
    return (
      <div className='confirmation-container'>
        <Menu />
        <img src="logo.svg" alt="Confirmation" width="70px" />
        <h1 className='header-confirmation'>No booking found</h1>
        <p className='nobooking'>What the Sigma? It looks like you haven't made a booking, mate. Go back to the booking page to start again.</p>
        <button className="btn-strike" onClick={() => navigate('/booking')}>Back to Booking</button>
      </div>
    );
  }

  return (
    <div className='confirmation-container'>
      <Menu />
      <img src="logo.svg" alt="Confirmation" width="70px" />
      <h1 className="header-confirmation">See you soon!</h1>
      <h2 className='booking-details'>Booking Details</h2>
  
      <div className='input-field'>
        <div className='input-label'>When</div>
        <p>{bookingData.when.replace("T", ", ")}</p>
      </div>
  
      <div className='input-field'>
        <div className='input-label'>Who</div>
        <p>{`${bookingData.people} ${bookingData.people === 1 ? "person" : "people"}`}</p>
      </div>
  
      <div className='input-field'>
        <div className='input-label'>Lanes</div>
        <p>{`${bookingData.lanes} ${bookingData.lanes === 1 ? "lane" : "lanes"}`}</p>
      </div>
  
      <div className='input-field'>
        <div className='input-label'>Booking number</div>
        <p>{bookingData.id}</p>
      </div>
  
      <div className='input-total'>     
        <p><strong>Total:</strong></p>
        <p>{bookingData.price} sek</p>
      </div>
      <button className="btn-strike" onClick={() => navigate('/booking')}>Sweet, let's go!</button>
    </div>
  );
  
};

export default Confirmation;
