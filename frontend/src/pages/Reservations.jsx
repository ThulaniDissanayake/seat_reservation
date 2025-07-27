import { useState, useEffect } from 'react';
import api from '../api/api';


const Reservations = () => {
  const [reservations, setReservations] = useState([]);
  const [message, setMessage] = useState('');
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

  // === STYLES ===
  const pageStyle = {
    backgroundColor: '#f5f5f5',
    minHeight: '100vh',
    padding: '40px 0',
  };

  const containerStyle = {
    maxWidth: '700px',
    margin: '50px auto',
    padding: '20px',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    backgroundColor: '#fff',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  };

  const headingStyle = {
    color: '#333',
    textAlign: 'center',
    marginBottom: '25px',
    fontSize: '2rem',
    fontWeight: '600',
  };

  const messageStyle = {
    color: message.toLowerCase().includes('failed') ? '#e74c3c' : '#27ae60',
    textAlign: 'center',
    marginBottom: '20px',
    fontWeight: '600',
  };

  const listStyle = {
    listStyleType: 'none',
    padding: 0,
  };

  const listItemStyle = {
    backgroundColor: '#fafafa',
    borderRadius: '8px',
    marginBottom: '15px',
    padding: '15px 20px',
    boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
    fontSize: '1rem',
    borderLeft: '6px solid #f0a500',
  };

  const buttonContainerStyle = {
    marginTop: '10px',
    display: 'flex',
    gap: '10px',
    flexWrap: 'wrap',
  };

  const baseButtonStyle = {
    padding: '8px 14px',
    borderRadius: '6px',
    border: 'none',
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: '0.95rem',
    color: '#fff',
    transition: 'background-color 0.3s ease',
  };

  const primaryButton = {
    ...baseButtonStyle,
    backgroundColor: '#f0a500', 
  };

  const dangerButton = {
    ...baseButtonStyle,
    backgroundColor: '#d35400', 
  };

  const cancelButton = {
    ...baseButtonStyle,
    backgroundColor: '#333', 
  };

  const inputStyle = {
    padding: '6px 10px',
    marginBottom: '8px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontSize: '1rem',
    width: '100%',
    boxSizing: 'border-box',
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '5px',
    fontWeight: '500',
  };

  const statusStyle = (status) => ({
    color: status.toLowerCase() === 'cancelled' ? '#dc3545' : '#28a745',
    fontWeight: '700',
    textTransform: 'capitalize',
  });

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
                  <label style={labelStyle}>Seat ID</label>
                  <input
                    type="number"
                    name="seat_id"
                    value={editData.seat_id}
                    onChange={handleEditChange}
                    style={inputStyle}
                  />

                  <label style={labelStyle}>Date</label>
                  <input
                    type="date"
                    name="date"
                    value={editData.date}
                    onChange={handleEditChange}
                    style={inputStyle}
                  />

                  <label style={labelStyle}>Time Slot</label>
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

                  <div style={buttonContainerStyle}>
                    <button style={primaryButton} onClick={() => submitEdit(r.id)}>
                      Save
                    </button>
                    <button style={cancelButton} onClick={cancelEdit}>
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <span>
                      <strong>Seat:</strong> {r.seat_id} |{' '}
                      <strong>Date:</strong> {r.date} |{' '}
                      <strong>Time:</strong> {r.time_slot} |{' '}
                      <strong>Status:</strong>{' '}
                      <span style={statusStyle(r.status)}>{r.status}</span>
                    </span>
                  </div>
                  {r.status.toLowerCase() !== 'cancelled' && (
                    <div style={buttonContainerStyle}>
                      <button style={dangerButton} onClick={() => cancelReservation(r.id)}>
                        Cancel
                      </button>
                      <button style={primaryButton} onClick={() => startEdit(r)}>
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
