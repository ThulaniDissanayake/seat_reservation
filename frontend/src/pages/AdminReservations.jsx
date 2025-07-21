import { useState, useEffect } from 'react';
import api from '../api/api';

const AdminReservations = () => {
  const [reservations, setReservations] = useState([]);
  const [date, setDate] = useState('');
  const [internId, setInternId] = useState('');
  const [message, setMessage] = useState('');

  const fetchReservations = async () => {
    try {
      const params = {};
      if (date) params.date = date;
      if (internId) params.internId = internId;

      const { data } = await api.get('/reservations/all', { params });
      setReservations(data);
      setMessage('');
    } catch (err) {
      console.error(' Error fetching reservations:', err);
      setMessage('Failed to fetch reservations');
    }
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchReservations();
  };

  // Inline styles
  const styles = {
    container: {
      maxWidth: '800px',
      margin: '40px auto',
      padding: '25px',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      backgroundColor: '#f9f9f9',
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    },
    heading: {
      marginBottom: '20px',
      color: '#333',
      textAlign: 'center',
      fontWeight: '700',
      fontSize: '1.8rem',
    },
    form: {
      display: 'flex',
      justifyContent: 'center',
      gap: '15px',
      marginBottom: '20px',
      flexWrap: 'wrap',
    },
    input: {
      padding: '8px 12px',
      fontSize: '1rem',
      borderRadius: '4px',
      border: '1px solid #ccc',
      minWidth: '150px',
      outlineColor: '#ff6600', 
      transition: 'border-color 0.3s',
    },
    button: {
      padding: '9px 20px',
      backgroundColor: '#ff6600',
      border: 'none',
      borderRadius: '4px',
      color: 'white',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'background-color 0.3s',
      minWidth: '100px',
    },
    buttonHover: {
      backgroundColor: '#e65500',
    },
    message: {
      color: 'red',
      textAlign: 'center',
      marginBottom: '15px',
      fontWeight: '600',
    },
    list: {
      listStyleType: 'none',
      padding: 0,
      maxHeight: '400px',
      overflowY: 'auto',
      borderTop: '1px solid #ddd',
      borderBottom: '1px solid #ddd',
    },
    listItem: {
      padding: '12px 15px',
      borderBottom: '1px solid #eee',
      fontSize: '1rem',
      color: '#444',
      backgroundColor: 'white',
      borderRadius: '4px',
      marginBottom: '8px',
      boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Admin - All Reservations</h2>

      <form style={styles.form} onSubmit={handleSearch}>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          placeholder="Filter by Date"
          style={styles.input}
        />
        <input
          type="number"
          value={internId}
          onChange={(e) => setInternId(e.target.value)}
          placeholder="Filter by Intern ID"
          style={styles.input}
          min={1}
        />
        <button type="submit" style={styles.button}>
          Search
        </button>
      </form>

      {message && <p style={styles.message}>{message}</p>}

      <ul style={styles.list}>
        {reservations.length === 0 ? (
          <li style={{ textAlign: 'center', padding: '20px', color: '#888' }}>
            No reservations found.
          </li>
        ) : (
          reservations.map((r) => (
            <li key={r.id} style={styles.listItem}>
              <strong>Seat {r.seat_id}</strong> | Date: {r.date} | Time: {r.time_slot} |{' '}
              <em>Intern: {r.username}</em> | Status: <strong>{r.status}</strong>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default AdminReservations;
