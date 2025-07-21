import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';

const AdminSeats = () => {
  const [seats, setSeats] = useState([]);
  const [seatNumber, setSeatNumber] = useState('');
  const [location, setLocation] = useState('');
  const [message, setMessage] = useState('');
  const [editId, setEditId] = useState(null);
  const [editSeatNumber, setEditSeatNumber] = useState('');
  const [editLocation, setEditLocation] = useState('');

  const navigate = useNavigate();

  const fetchSeats = async () => {
    try {
      const { data } = await api.get('/seats');
      setSeats(data);
      setMessage('');
    } catch {
      setMessage('Failed to fetch seats');
    }
  };

  useEffect(() => {
    fetchSeats();
  }, []);

  const addSeat = async (e) => {
    e.preventDefault();
    try {
      await api.post('/seats', { seatNumber, location, status: 'available' });
      setMessage('Seat added successfully!');
      setSeatNumber('');
      setLocation('');
      fetchSeats();
    } catch {
      setMessage('Failed to add seat');
    }
  };

  const toggleStatus = async (id, currentStatus) => {
    try {
      const newStatus = currentStatus === 'available' ? 'unavailable' : 'available';
      await api.patch(`/seats/${id}`, { status: newStatus });
      setMessage('Status updated successfully!');
      fetchSeats();
    } catch {
      setMessage('Failed to update status');
    }
  };

  const deleteSeat = async (id) => {
    if (!window.confirm('Are you sure you want to delete this seat?')) return;
    try {
      await api.delete(`/seats/${id}`);
      setMessage('Seat deleted successfully!');
      fetchSeats();
    } catch {
      setMessage('Failed to delete seat');
    }
  };

  const startEdit = (seat) => {
    setEditId(seat.id);
    setEditSeatNumber(seat.seatNumber);
    setEditLocation(seat.location);
  };

  const cancelEdit = () => {
    setEditId(null);
    setEditSeatNumber('');
    setEditLocation('');
  };

  const submitEdit = async (id) => {
    try {
      await api.put(`/seats/${id}`, {
        seatNumber: editSeatNumber,
        location: editLocation,
        status: 'available',
      });
      setMessage('Seat updated successfully!');
      cancelEdit();
      fetchSeats();
    } catch {
      setMessage('Failed to update seat');
    }
  };

  const containerStyle = { maxWidth: '700px', margin: '40px auto', padding: '25px', backgroundColor: '#fafafa', borderRadius: '10px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)', fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" };
  const headingStyle = { textAlign: 'center', color: '#f0a500', marginBottom: '25px', fontSize: '2rem', fontWeight: '700' };
  const formStyle = { display: 'flex', justifyContent: 'center', gap: '15px', marginBottom: '20px', flexWrap: 'wrap' };
  const inputStyle = { padding: '10px', fontSize: '1rem', borderRadius: '6px', border: '1px solid #ccc', width: '200px' };
  const buttonStyle = { padding: '10px 18px', fontSize: '1rem', backgroundColor: '#f0a500', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: '600', transition: 'background-color 0.3s ease' };
  const buttonHoverStyle = { backgroundColor: '#d18e00' };
  const listStyle = { listStyle: 'none', padding: 0 };
  const listItemStyle = { backgroundColor: '#fff', borderRadius: '6px', marginBottom: '15px', padding: '15px 20px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '1.1rem' };
  const toggleButtonStyle = { padding: '6px 12px', fontSize: '0.9rem', borderRadius: '6px', border: 'none', cursor: 'pointer', backgroundColor: '#007bff', color: '#fff', fontWeight: '600', transition: 'background-color 0.3s ease' };
  const reportButtonStyle = { ...buttonStyle, marginBottom: '20px', width: 'fit-content' };

  return (
    <div style={containerStyle}>
      <h2 style={headingStyle}>Admin Seat Management</h2>

      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <button
          style={reportButtonStyle}
          onClick={() => navigate('/admin/reports')}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = buttonHoverStyle.backgroundColor)}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = buttonStyle.backgroundColor)}
          type="button"
        >
          View Seat Usage Report
        </button>

        <button
          style={reportButtonStyle}
          onClick={() => navigate('/admin/reservations')}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = buttonHoverStyle.backgroundColor)}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = buttonStyle.backgroundColor)}
          type="button"
        >
          View All Reservations
        </button>
      </div>

      <form style={formStyle} onSubmit={addSeat}>
        <input style={inputStyle} value={seatNumber} onChange={(e) => setSeatNumber(e.target.value)} placeholder="Seat Number" required type="text" />
        <input style={inputStyle} value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Location" required type="text" />
        <button style={buttonStyle} type="submit" onMouseOver={(e) => (e.currentTarget.style.backgroundColor = buttonHoverStyle.backgroundColor)} onMouseOut={(e) => (e.currentTarget.style.backgroundColor = buttonStyle.backgroundColor)}>
          Add Seat
        </button>
      </form>

      <ul style={listStyle}>
        {seats.length === 0 && <p>No seats found.</p>}
        {seats.map((seat) => (
          <li key={seat.id} style={listItemStyle}>
            {editId === seat.id ? (
              <>
                <div>
                  <input style={{ ...inputStyle, marginBottom: '5px' }} value={editSeatNumber} onChange={(e) => setEditSeatNumber(e.target.value)} placeholder="Seat Number" />
                  <input style={inputStyle} value={editLocation} onChange={(e) => setEditLocation(e.target.value)} placeholder="Location" />
                </div>
                <div style={{ display: 'flex', gap: '5px' }}>
                  <button style={toggleButtonStyle} onClick={() => submitEdit(seat.id)}>Save</button>
                  <button style={{ ...toggleButtonStyle, backgroundColor: '#6c757d' }} onClick={cancelEdit}>Cancel</button>
                </div>
              </>
            ) : (
              <>
                <span>
                  <strong>{seat.seatNumber}</strong> - {seat.location} - <em style={{ textTransform: 'capitalize' }}>{seat.status}</em>
                </span>
                <div style={{ display: 'flex', gap: '5px' }}>
                  <button style={toggleButtonStyle} onClick={() => toggleStatus(seat.id, seat.status)}>Toggle Status</button>
                  <button style={{ ...toggleButtonStyle, backgroundColor: '#28a745' }} onClick={() => startEdit(seat)}>Edit</button>
                  <button style={{ ...toggleButtonStyle, backgroundColor: '#dc3545' }} onClick={() => deleteSeat(seat.id)}>Delete</button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>

      {message && (
        <p style={{ textAlign: 'center', color: message.toLowerCase().includes('failed') ? '#e74c3c' : '#27ae60', fontWeight: '600', marginTop: '20px' }}>
          {message}
        </p>
      )}
    </div>
  );
};

export default AdminSeats;
