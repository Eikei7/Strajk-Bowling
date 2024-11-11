// src/components/Booking.tsx
import React, { useState } from 'react';
import axios from 'axios';
import { BookingRequest, BookingResponse } from '../types';

const Booking: React.FC = () => {
  const [bookingData, setBookingData] = useState<BookingRequest>({
    when: '',
    lanes: 1,
    people: 1,
    shoes: [],
  });
  const [confirmation, setConfirmation] = useState<BookingResponse | null>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setBookingData((prevData) => ({
      ...prevData,
      [name]: name === 'people' || name === 'lanes' ? parseInt(value) : value,
    }));
  };

  const handleShoeSizeChange = (index: number, size: number) => {
    setBookingData((prevData) => {
      const newShoes = [...prevData.shoes];
      newShoes[index] = size;
      return { ...prevData, shoes: newShoes };
    });
  };

  const addShoeSizeField = () => {
    setBookingData((prevData) => ({
      ...prevData,
      shoes: [...prevData.shoes, 0],
    }));
  };

  const removeShoeSizeField = (index: number) => {
    setBookingData((prevData) => ({
      ...prevData,
      shoes: prevData.shoes.filter((_, i) => i !== index),
    }));
  };

  const handleBookingSubmit = async () => {
    try {
      const response = await axios.post<BookingResponse>(
        'https://h5jbtjv6if.execute-api.eu-north-1.amazonaws.com',
        bookingData,
        {
          headers: { 'x-api-key': '738c6b9d-24cf-47c3-b688-f4f4c5747662' },
        }
      );
      setConfirmation(response.data);
    } catch (error) {
      console.error("Error booking:", error);
    }
  };

  return (
    <div>
      <h2>Book Your Bowling Lane</h2>
      <form onSubmit={(e) => { e.preventDefault(); handleBookingSubmit(); }}>
        <label>
          Date & Time:
          <input
            type="datetime-local"
            name="when"
            value={bookingData.when}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Number of Lanes:
          <input
            type="number"
            name="lanes"
            value={bookingData.lanes}
            onChange={handleChange}
            min="1"
            required
          />
        </label>

        <label>
          Number of People:
          <input
            type="number"
            name="people"
            value={bookingData.people}
            onChange={handleChange}
            min="1"
            required
          />
        </label>

        <h3>Shoe Sizes</h3>
        {bookingData.shoes.map((size, index) => (
          <div key={index}>
            <input
              type="number"
              value={size}
              onChange={(e) => handleShoeSizeChange(index, parseInt(e.target.value))}
              required
            />
            <button type="button" onClick={() => removeShoeSizeField(index)}>Remove</button>
          </div>
        ))}
        <button type="button" onClick={addShoeSizeField}>Add Shoe Size</button>

        <button type="submit">Submit Booking</button>
      </form>

      {confirmation && (
        <div>
          <h3>Booking Confirmation</h3>
          <p>Booking ID: {confirmation.id}</p>
          <p>Total Price: {confirmation.price} SEK</p>
        </div>
      )}
    </div>
  );
};

export default Booking;
