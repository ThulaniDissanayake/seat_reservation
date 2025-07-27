import { useState } from 'react';
import api from '../api/api';

const ManualAssignSeat = () => {
  const [internId, setInternId] = useState('');
  const [seatId, setSeatId] = useState('');
  const [date, setDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!internId || !seatId || !date || !timeSlot) {
      setMessage('❌ Please fill all fields');
      return;
    }

    try {
      setLoading(true);
      await api.post('/reservations/assign', {
        internId,
        seat_id: seatId,
        date,
        time_slot: timeSlot,
      });
      setMessage('✅ Seat successfully assigned!');
      setInternId('');
      setSeatId('');
      setDate('');
      setTimeSlot('');
    } catch (err) {
      setMessage(`❌ ${err.response?.data?.message || 'Failed to assign seat'}`);
    } finally {
      setLoading(false);
    }
  };

  const pageStyle = {
    background: 'linear-gradient(to right, #fceabb, #f8b500)',
    minHeight: '100vh',
    padding: '60px 20px',
  };

  const containerStyle = {
    maxWidth: '500px',
    margin: '0 auto',
    padding: '30px',
    border: '1px solid #ddd',
    borderRadius: '10px',
    boxShadow: '0 6px 16px rgba(0,0,0,0.1)',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    backgroundColor: 'rgba(255, 255, 255, 0.75)', 
  };

  const headingStyle = {
    textAlign: 'center',
    color: '#000000ff',
    marginBottom: '25px',
    fontWeight: '700',
    fontSize: '1.6rem',
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

  const selectStyle = { ...inputStyle };

  const buttonStyle = {
    width: '100%',
    padding: '12px',
    backgroundColor: '#f06400ff',
    color: '#fff',
    fontWeight: '700',
    fontSize: '1.1rem',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  };

  const buttonDisabledStyle = {
    ...buttonStyle,
    backgroundColor: '#ccc',
    cursor: 'not-allowed',
  };

  const messageStyle = {
    marginTop: '15px',
    textAlign: 'center',
    color: message.startsWith('✅') ? 'green' : 'red',
    fontWeight: '600',
  };

  const spinner = (
    <div style={{ textAlign: 'center', marginTop: '10px' }}>
      <div className="loader"></div>
    </div>
  );

  return (
    <div style={pageStyle}>
      <div style={containerStyle}>
        <h2 style={headingStyle}>Manual Seat Assignment</h2>
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
          <select
            value={timeSlot}
            onChange={(e) => setTimeSlot(e.target.value)}
            required
            style={selectStyle}
          >
            <option value="">Select Time Slot</option>
            <option value="09:00-12:00">09:00-12:00</option>
            <option value="13:00-17:00">13:00-17:00</option>
            
          </select>

          <button
            type="submit"
            style={loading ? buttonDisabledStyle : buttonStyle}
            disabled={loading}
          >
            {loading ? 'Assigning...' : 'Assign Seat'}
          </button>
        </form>

        {loading && spinner}
        {message && <p style={messageStyle}>{message}</p>}
      </div>
    </div>
  );
};

export default ManualAssignSeat;
