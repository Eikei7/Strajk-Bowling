// src/components/Confirmation.tsx
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { BookingResponse } from '../types';

const Confirmation: React.FC = () => {
  const location = useLocation();
  const bookingData = location.state as BookingResponse | null; // Typdefiniera för att vara säker på datatypen
  const navigate = useNavigate();

  if (!bookingData) {
    return (
      <div>
        <h2>No booking found</h2>
        <p>It looks like you haven't made a booking. Go back to the booking page to start again.</p>
        <button onClick={() => navigate('/booking')}>Back to Booking</button>
      </div>
    );
  }

  return (
    <div>
      <img src="logo.svg" alt="Confirmation" width="70px" />
      <h1 className="header-confirmation">See you soon!</h1>
      <h2>Booking Details</h2>
      <p><strong>Booking number:</strong> {bookingData.id}</p>
      <p><strong>Date & Time:</strong> {bookingData.when}</p>
      <p><strong>Number of Lanes:</strong> {bookingData.lanes}</p>
      <p><strong>Number of People:</strong> {bookingData.people}</p>
      <p><strong>Shoe Sizes:</strong> {bookingData.shoes.join(', ')}</p>
      <p><strong>Total Price:</strong> {bookingData.price} SEK</p>
      <button onClick={() => navigate('/booking')}>SWEET, LET'S GO!</button>
    </div>
  );
};

export default Confirmation;
