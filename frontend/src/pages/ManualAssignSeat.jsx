import { useState } from 'react';
import api from '../api/api';

const ManualAssignSeat = () => {
  const [internId, setInternId] = useState('');
  const [seatId, setSeatId] = useState('');
  const [date, setDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/reservations/assign', {
        internId,
        seat_id: seatId,
        date,
        time_slot: timeSlot,
      });
      setMessage(' Seat successfully assigned!');
    } catch (err) {
      setMessage(`❌ ${err.response?.data?.message || 'Failed to assign seat'}`);
    }
  };

  const pageStyle = {
    backgroundColor: '#e0e0e0',
    minHeight: '100vh',
    padding: '60px 20px',
  };

  const containerStyle = {
    maxWidth: '500px',
    margin: '0 auto',
    padding: '30px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    backgroundColor: '#fff',
  };

  const headingStyle = {
    textAlign: 'center',
    color: '#f0a500',
    marginBottom: '25px',
    fontWeight: '700',
  };

  const inputStyle = {
    width: '100%',
    padding: '12px 15px',
    marginBottom: '15px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontSize: '1rem',
    boxSizing: 'border-box',
  };

  const buttonStyle = {
    width: '100%',
    padding: '12px',
    backgroundColor: '#f0a500',
    color: '#333',
    fontWeight: '700',
    fontSize: '1.1rem',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  };

  const messageStyle = {
    marginTop: '15px',
    textAlign: 'center',
    color: message.startsWith('✅') ? 'green' : 'red',
    fontWeight: '600',
  };

  return (
    <div style={pageStyle}>
      <div style={containerStyle}>
        <h2 style={headingStyle}>Manual Seat Assignment (Admin)</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="number"
            value={internId}
            onChange={(e) => setInternId(e.target.value)}
            placeholder="Intern ID"
            required
            style={inputStyle}
          />
          <input
            type="number"
            value={seatId}
            onChange={(e) => setSeatId(e.target.value)}
            placeholder="Seat ID"
            required
            style={inputStyle}
          />
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            style={inputStyle}
          />
          <input
            type="text"
            value={timeSlot}
            onChange={(e) => setTimeSlot(e.target.value)}
            placeholder="Time Slot (e.g. 9AM-12PM)"
            required
            style={inputStyle}
          />
          <button type="submit" style={buttonStyle}>Assign Seat</button>
        </form>
        {message && <p style={messageStyle}>{message}</p>}
      </div>
    </div>
  );
};

export default ManualAssignSeat;
