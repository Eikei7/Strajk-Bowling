import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookingRequest, BookingResponse } from '../types';

const Booking: React.FC = () => {
  const [bookingData, setBookingData] = useState<BookingRequest>({
    when: '',
    lanes: 1,
    people: 1,
    shoes: [],
  });
  const [date, setDate] = useState(''); // För separat datumfält
  const [time, setTime] = useState(''); // För separat tidsfält
  const navigate = useNavigate();

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
      shoes: [...prevData.shoes, 0], // Lägg till ett nytt skostorleksfält med standardvärde 0
    }));
  };

  const removeShoeSizeField = (index: number) => {
    setBookingData((prevData) => ({
      ...prevData,
      shoes: prevData.shoes.filter((_, i) => i !== index), // Ta bort skostorlek vid angivet index
    }));
  };

  const handleBookingSubmit = async () => {
    const when = `${date}T${time}`;
    const updatedBookingData = { ...bookingData, when };
    try {
        const response = await fetch('/api', {
            method: 'POST',
            headers: {
              'x-api-key': '738c6b9d-24cf-47c3-b688-f4f4c5747662'
            },
            body: JSON.stringify(updatedBookingData)
          });
          

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data: BookingResponse = await response.json();
      console.log("Booking response:", data);
      navigate('/confirmation', { state: data });
    } catch (error) {
      console.error("Error booking:", error);
    }
  };

  return (
    <div>
      <h2 className="when-what-who">WHEN, WHAT & WHO</h2>
      <form className="form-container" onSubmit={(e) => { e.preventDefault(); handleBookingSubmit(); }}>
  {/* <div className="input-field">
    <span className="input-label">Date</span>
    <input
      type="date"
      name="when"
      value={bookingData.when}
      onChange={handleChange}
      required
    />
  </div> */}
  <div className="input-field">
        <span className="input-label">Date</span>
        <input
          type="date"
          name="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </div>

      <div className="input-field">
        <span className="input-label">Time</span>
        <input
          type="time"
          name="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          required
        />
      </div>

  <div className="input-field">
    <span className="input-label">Number of Lanes</span>
    <input
      type="number"
      name="lanes"
      value={bookingData.lanes}
      onChange={handleChange}
      min="1"
      required
    />
  </div>

  <div>
    <span className="input-label">Number of People</span>
    <input
      className='input-field'
      type="number"
      name="people"
      value={bookingData.people}
      onChange={handleChange}
      min="1"
      required
    />
  </div>
        <h2>Shoes</h2>
        {bookingData.shoes.map((size, index) => (
          <div key={index}>
            <input
              type="number"
              value={size}
              onChange={(e) => handleShoeSizeChange(index, parseInt(e.target.value))}
              required
              placeholder="Shoe Size"
            />
            <button className="btn-round" type="button" onClick={() => removeShoeSizeField(index)}>-</button>
          </div>
        ))}
        <button className="btn-round" type="button" onClick={addShoeSizeField}>+</button>

        <button type="submit">STRIIIIIIKE</button>
      </form>
      </div>
    
  );
};

export default Booking;
