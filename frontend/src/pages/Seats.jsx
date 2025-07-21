import { useState, useEffect } from 'react';
import api from '../api/api';

const Seats = () => {
  const [seats, setSeats] = useState([]);
  const [date, setDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('');
  const [message, setMessage] = useState('');

  const fetchSeats = async () => {
    if (!date || !timeSlot) {
      setSeats([]);
      setMessage('Please select both date and time slot to view available seats.');
      return;
    }
    try {
      const { data } = await api.get(`/seats/available?date=${date}&timeSlot=${timeSlot}`);
      setSeats(data);
      setMessage(data.length === 0 ? 'No seats available for selected date and time.' : '');
    } catch {
      setMessage('Failed to fetch seats');
      setSeats([]);
    }
  };

  useEffect(() => {
    fetchSeats();
  }, [date, timeSlot]);

  const reserveSeat = async (seat_id) => {
    if (!date || !timeSlot) {
      setMessage('Please select both date and time slot');
      return;
    }
    try {
      await api.post('/reservations', { seat_id, date, time_slot: timeSlot });
      setMessage('Seat reserved successfully!');
      fetchSeats();
    } catch (err) {
      setMessage(err.response?.data?.message || 'Reservation failed');
    }
  };

  const pageStyle = {
    backgroundColor: '#e0e0e0',
    minHeight: '100vh',
    padding: '40px 0',
  };

  const containerStyle = {
    maxWidth: '700px',
    margin: '40px auto',
    padding: '20px',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    backgroundColor: '#fefefe',
    borderRadius: '10px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  };

  const headingStyle = {
    color: '#f0a500',
    textAlign: 'center',
    marginBottom: '25px',
    fontSize: '2rem',
  };

  const messageStyle = {
    color: message.toLowerCase().includes('failed') || message.toLowerCase().includes('no') ? '#e74c3c' : '#27ae60',
    textAlign: 'center',
    marginBottom: '20px',
    fontWeight: '600',
  };

  const inputStyle = {
    padding: '10px',
    marginRight: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontSize: '1rem',
  };

  const listStyle = {
    listStyleType: 'none',
    padding: 0,
  };

  const listItemStyle = {
    backgroundColor: '#fff',
    borderRadius: '6px',
    marginBottom: '15px',
    padding: '15px 20px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '1rem',
  };

  const buttonStyle = {
    backgroundColor: '#f0a500',
    border: 'none',
    padding: '8px 14px',
    borderRadius: '5px',
    cursor: 'pointer',
    color: '#333',
    fontWeight: '700',
    transition: 'background-color 0.3s ease',
  };

  const buttonHoverStyle = {
    backgroundColor: '#d18e00',
  };

  return (
    <div style={pageStyle}>
      <div style={containerStyle}>
        <h2 style={headingStyle}>Available Seats</h2>
        {message && <p style={messageStyle}>{message}</p>}
        <div style={{ marginBottom: '20px', textAlign: 'center' }}>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            style={inputStyle}
          />
          <select
            value={timeSlot}
            onChange={(e) => setTimeSlot(e.target.value)}
            style={inputStyle}
          >
            <option value="">Select Time Slot</option>
            <option value="09:00-12:00">09:00-12:00</option>
            <option value="13:00-17:00">13:00-17:00</option>
          </select>
        </div>
        <ul style={listStyle}>
          {seats.map((seat) => (
            <li key={seat.id} style={listItemStyle}>
              <span>
                <strong>{seat.seatNumber || seat.seat_number}</strong> — {seat.location} —{' '}
                <em style={{ textTransform: 'capitalize' }}>{seat.status}</em>
              </span>
              {seat.status.toLowerCase() === 'available' && (
                <button
                  style={buttonStyle}
                  onClick={() => reserveSeat(seat.id)}
                  onMouseOver={e => e.currentTarget.style.backgroundColor = buttonHoverStyle.backgroundColor}
                  onMouseOut={e => e.currentTarget.style.backgroundColor = buttonStyle.backgroundColor}
                >
                  Reserve
                </button>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Seats;
