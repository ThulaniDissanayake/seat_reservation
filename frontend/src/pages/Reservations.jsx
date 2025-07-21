import { useState, useEffect } from 'react';
import api from '../api/api';

const Reservations = () => {
  const [reservations, setReservations] = useState([]);
  const [message, setMessage] = useState('');
  const [hoveredButtonId, setHoveredButtonId] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({ seat_id: '', date: '', time_slot: '' });

  const fetchReservations = async () => {
    try {
      const { data } = await api.get('/reservations/my');
      setReservations(data);
      setMessage('');
    } catch {
      setMessage('Failed to fetch reservations');
    }
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  const cancelReservation = async (id) => {
    if (!window.confirm('Are you sure you want to cancel this reservation?')) return;

    try {
      await api.delete(`/reservations/${id}`);
      setMessage('Reservation cancelled');
      fetchReservations();
    } catch {
      setMessage('Failed to cancel reservation');
    }
  };

  const startEdit = (reservation) => {
    setEditingId(reservation.id);
    setEditData({
      seat_id: reservation.seat_id,
      date: reservation.date ? reservation.date.slice(0, 10) : '',
      time_slot: reservation.time_slot,
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditData({ seat_id: '', date: '', time_slot: '' });
    setMessage('');
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  const submitEdit = async (id) => {
    try {
      await api.put(`/reservations/${id}`, editData);
      setMessage('Reservation updated');
      setEditingId(null);
      fetchReservations();
    } catch (err) {
      setMessage(err.response?.data?.message || 'Failed to update reservation');
    }
  };

  const pageStyle = {
    backgroundColor: '#e0e0e0',
    minHeight: '100vh',
    padding: '40px 0',
  };

  const containerStyle = {
    maxWidth: '700px',
    margin: '50px auto',
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
    color: message.toLowerCase().includes('failed') ? '#e74c3c' : '#27ae60',
    textAlign: 'center',
    marginBottom: '15px',
    fontWeight: '600',
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
    flexDirection: 'column',
    fontSize: '1rem',
  };

  const buttonContainerStyle = {
    marginTop: '10px',
    display: 'flex',
    gap: '10px',
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

  const inputStyle = {
    padding: '6px 10px',
    marginRight: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontSize: '1rem',
    marginBottom: '5px',
  };

  return (
    <div style={pageStyle}>
      <div style={containerStyle}>
        <h2 style={headingStyle}>My Reservations</h2>
        {message && <p style={messageStyle}>{message}</p>}
        <ul style={listStyle}>
          {reservations.length === 0 && <p>No reservations found.</p>}
          {reservations.map((r) => (
            <li key={r.id} style={listItemStyle}>
              {editingId === r.id ? (
                <>
                  <div>
                    <label>
                      Seat ID:{' '}
                      <input
                        type="number"
                        name="seat_id"
                        value={editData.seat_id}
                        onChange={handleEditChange}
                        style={inputStyle}
                      />
                    </label>
                  </div>
                  <div>
                    <label>
                      Date:{' '}
                      <input
                        type="date"
                        name="date"
                        value={editData.date}
                        onChange={handleEditChange}
                        style={inputStyle}
                      />
                    </label>
                  </div>
                  <div>
                    <label>
                      Time Slot:{' '}
                      <select
                        name="time_slot"
                        value={editData.time_slot}
                        onChange={handleEditChange}
                        style={inputStyle}
                      >
                        <option value="">Select Time Slot</option>
                        <option value="09:00-12:00">09:00-12:00</option>
                        <option value="13:00-17:00">13:00-17:00</option>
                      </select>
                    </label>
                  </div>
                  <div style={buttonContainerStyle}>
                    <button
                      style={buttonStyle}
                      onClick={() => submitEdit(r.id)}
                      onMouseOver={(e) => (e.currentTarget.style.backgroundColor = buttonHoverStyle.backgroundColor)}
                      onMouseOut={(e) => (e.currentTarget.style.backgroundColor = buttonStyle.backgroundColor)}
                    >
                      Save
                    </button>
                    <button
                      style={{ ...buttonStyle, backgroundColor: '#ccc', color: '#555' }}
                      onClick={cancelEdit}
                    >
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <span>
                    Seat <strong>{r.seat_id}</strong> | Date: <strong>{r.date}</strong> | Time:{' '}
                    <strong>{r.time_slot}</strong> | Status: <strong>{r.status}</strong>
                  </span>
                  {r.status.toLowerCase() !== 'cancelled' && (
                    <div style={buttonContainerStyle}>
                      <button
                        style={hoveredButtonId === r.id ? { ...buttonStyle, ...buttonHoverStyle } : buttonStyle}
                        onClick={() => cancelReservation(r.id)}
                        onMouseEnter={() => setHoveredButtonId(r.id)}
                        onMouseLeave={() => setHoveredButtonId(null)}
                      >
                        Cancel
                      </button>
                      <button
                        style={hoveredButtonId === r.id ? { ...buttonStyle, ...buttonHoverStyle } : buttonStyle}
                        onClick={() => startEdit(r)}
                        onMouseEnter={() => setHoveredButtonId(r.id)}
                        onMouseLeave={() => setHoveredButtonId(null)}
                      >
                        Modify
                      </button>
                    </div>
                  )}
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Reservations;
