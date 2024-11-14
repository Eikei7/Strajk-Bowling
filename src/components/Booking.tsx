import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookingRequest, BookingResponse } from '../types';
import Menu from './Menu';

const Booking: React.FC = () => {
  const [bookingData, setBookingData] = useState<BookingRequest>({
    when: '',
    lanes: 1,
    people: 1,
    shoes: [],
  });
  const [date, setDate] = useState(''); // För separat datumfält
  const [time, setTime] = useState(''); // För separat tidsfält
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // Lägg till en state-variabel för felmeddelande
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
    // Kontrollera om antalet skostorlekar matchar antalet spelare
    if (bookingData.shoes.length !== bookingData.people) {
      setErrorMessage(`Please enter ${bookingData.people} shoe sizes.`);
      return; // Avbryt om valideringen misslyckas
    }
    
    setErrorMessage(null); // Nollställ felmeddelandet om valideringen lyckas
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
    <div className='booking-container'>
      <Menu />
      <img src="logo.svg" alt="Logo" width="70px" />
      <h1 className="header-confirmation">Booking</h1>
      <h2 className="when-what-who">WHEN, WHAT & WHO</h2>

      {/* Visa felmeddelande om det finns ett */}
      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <form className="form-container" onSubmit={(e) => { e.preventDefault(); handleBookingSubmit(); }}>
        <div className='input-field-date'>
          <span className="input-label">Date</span>
          <input
            type="date"
            name="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>

        <div className='input-field-time'>
          <span className="input-label">Time</span>
          <input
            type="time"
            name="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
          />
        </div>

        <div className='input-field'>
          <span className="input-label">Number of Awesome bowlers</span>
          <input
            className='input-no'
            type="number"
            name="people"
            value={bookingData.people}
            onChange={handleChange}
            min="1"
            required
          />
          <span className="input-unit">{bookingData.people > 1 ? "people" : "person"}</span>
        </div>

        <div className="input-field">
          <span className="input-label">Number of Lanes</span>
          <input
            className='input-no'
            type="number"
            name="lanes"
            value={bookingData.lanes}
            onChange={handleChange}
            min="1"
            required
          />
          <span className="input-unit">{bookingData.lanes > 1 ? "lanes" : "lane"}</span>
        </div>

        <h2 className="shoes">Shoes</h2>
        {bookingData.shoes.map((size, index) => (
          <div className='shoe-container' key={index}>
            <div className="input-field-shoes">
              <span className="input-label">Shoe size / Person {index + 1}</span>
              <input
                type="number"
                value={size}
                onChange={(e) => handleShoeSizeChange(index, parseInt(e.target.value))}
                min="25"
                required
                placeholder="Shoe Size"
              />
            </div>
            <div>
              <button
                className="btn-minus"
                type="button"
                onClick={() => removeShoeSizeField(index)}
                aria-label={`Remove shoe size ${size}`}
              >-</button>
            </div>
          </div>
        ))}
        
        <div>
          <button className="btn-plus" type="button" onClick={addShoeSizeField} aria-label="Add shoe size">+</button>
        </div>
        <button className="btn-strike" type="submit">Striiiiike!</button>
      </form>
    </div>
  );
};

export default Booking;
