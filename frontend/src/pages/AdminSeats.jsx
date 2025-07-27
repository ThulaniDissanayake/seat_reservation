import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaTrash, FaEdit } from 'react-icons/fa';
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

 
  const pageStyle = {
   background: 'linear-gradient(to right, #fceabb, #f8b500)',
    minHeight: '100vh',
    padding: '40px 10px'
  };

  const containerStyle = {
    maxWidth: '700px',
    margin: '0 auto',
    padding: '25px',
    backgroundColor: 'rgba(255, 255, 255, 0.75)',
    borderRadius: '10px',
    boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
  };

  const headingStyle = {
    textAlign: 'center',
    color: '#241a05ff',
    marginBottom: '25px',
    fontSize: '2rem',
    fontWeight: '700'
  };

  const formStyle = {
    display: 'flex',
    justifyContent: 'center',
    gap: '15px',
    marginBottom: '20px',
    flexWrap: 'wrap'
  };

  const inputStyle = {
    padding: '10px',
    fontSize: '1rem',
    borderRadius: '6px',
    border: '1px solid #ccc',
    width: '200px'
  };

  const buttonStyle = {
    padding: '10px 18px',
    fontSize: '1rem',
    backgroundColor: '#e95119ff', 
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: '600',
    transition: 'background-color 0.3s ease'
  };

  const buttonHoverStyle = { backgroundColor: '#fa7851ff' }; 
  const listContainerStyle = {
    maxHeight: '320px',
    overflowY: 'auto',
    paddingRight: '5px',
    marginTop: '10px'
  };

  const listStyle = { listStyle: 'none', padding: 0 };

  const listItemStyle = {
    backgroundColor: '#fff',
    borderRadius: '6px',
    marginBottom: '15px',
    padding: '15px 20px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '1.1rem'
  };

  const iconButtonStyle = {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: '#333',
    fontSize: '1.2rem'
  };

  const reportButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#b33600ff',
    marginBottom: '20px',
    width: 'fit-content'
  };

  const reportButtonHover = '#dd6b3bff';

  return (
    <div style={pageStyle}>
      <div style={containerStyle}>
        <h2 style={headingStyle}>Admin Seat Management</h2>

        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' }}>
          <button
            style={reportButtonStyle}
            onClick={() => navigate('/admin/reports')}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = reportButtonHover)}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = reportButtonStyle.backgroundColor)}
            type="button"
          >
            View Seat Usage Report
          </button>

          <button
            style={reportButtonStyle}
            onClick={() => navigate('/admin/reservations')}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = reportButtonHover)}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = reportButtonStyle.backgroundColor)}
            type="button"
          >
            View All Reservations
          </button>
        </div>

        <form style={formStyle} onSubmit={addSeat}>
          <input
            style={inputStyle}
            value={seatNumber}
            onChange={(e) => setSeatNumber(e.target.value)}
            placeholder="Seat Number"
            required
            type="text"
          />
          <input
            style={inputStyle}
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Location"
            required
            type="text"
          />
          <button
            style={buttonStyle}
            type="submit"
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = buttonHoverStyle.backgroundColor)}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = buttonStyle.backgroundColor)}
          >
            Add Seat
          </button>
        </form>

        <div style={listContainerStyle}>
          <ul style={listStyle}>
            {seats.length === 0 && <p>No seats found.</p>}
            {seats.map((seat) => (
              <li key={seat.id} style={listItemStyle}>
                {editId === seat.id ? (
                  <>
                    <div>
                      <input
                        style={{ ...inputStyle, marginBottom: '5px' }}
                        value={editSeatNumber}
                        onChange={(e) => setEditSeatNumber(e.target.value)}
                        placeholder="Seat Number"
                      />
                      <input
                        style={inputStyle}
                        value={editLocation}
                        onChange={(e) => setEditLocation(e.target.value)}
                        placeholder="Location"
                      />
                    </div>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button title="Save" style={iconButtonStyle} onClick={() => submitEdit(seat.id)}>
                        💾
                      </button>
                      <button title="Cancel" style={iconButtonStyle} onClick={cancelEdit}>
                        ❌
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <span>
                      <strong>{seat.seatNumber}</strong> - {seat.location} -{' '}
                      <em style={{ textTransform: 'capitalize' }}>{seat.status}</em>
                    </span>
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <button
                        title="Toggle Status"
                        style={iconButtonStyle}
                        onClick={() => toggleStatus(seat.id, seat.status)}
                      >
                        🔄
                      </button>
                      <button title="Edit" style={iconButtonStyle} onClick={() => startEdit(seat)}>
                        <FaEdit />
                      </button>
                      <button title="Delete" style={iconButtonStyle} onClick={() => deleteSeat(seat.id)}>
                        <FaTrash color="#dc3545" />
                      </button>
                    </div>
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>

        {message && (
          <p
            style={{
              textAlign: 'center',
              color: message.toLowerCase().includes('failed') ? '#e74c3c' : '#27ae60',
              fontWeight: '600',
              marginTop: '20px'
            }}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default AdminSeats;
