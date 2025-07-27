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

  // Helper: get color based on status
  const getStatusColor = (status) => {
    if (!status) return '#666'; // default gray
    switch (status.toLowerCase()) {
      case 'active':
        return '#006400'; // dark green
      case 'cancelled':
      case 'cancel':
        return '#b22222'; // firebrick red
      default:
        return '#666'; // gray fallback
    }
  };

  // Colors for alternating strips
  const stripColors = ['#fff7e6', '#fff0b8']; // light warm yellows

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
      borderRadius: '10px',
      padding: '12px 15px',
      marginBottom: '12px',
      fontSize: '0.95rem',
      color: '#444',
      boxShadow: '0 3px 8px rgba(240, 165, 0, 0.15)',
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      alignItems: 'center',
      transition: 'background-color 0.3s, box-shadow 0.3s',
      cursor: 'default',
      minHeight: '50px',
    },
    listItemHover: {
      backgroundColor: '#ffe29a',
      boxShadow: '0 5px 16px rgba(240, 165, 0, 0.25)',
    },
    reservationDetails: {
      flex: '1 1 65%',
      minWidth: '240px',
      wordBreak: 'break-word',
    },
    reservationStatus: {
      flex: '1 1 30%',
      minWidth: '120px',
      textAlign: 'right',
      fontWeight: '700',
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>All Reservations</h2>

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
          reservations.map((r, index) => (
            <li
              key={r.id}
              style={{
                ...styles.listItem,
                backgroundColor: stripColors[index % stripColors.length],
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = styles.listItemHover.backgroundColor;
                e.currentTarget.style.boxShadow = styles.listItemHover.boxShadow;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = stripColors[index % stripColors.length];
                e.currentTarget.style.boxShadow = styles.listItem.boxShadow;
              }}
            >
              <div style={styles.reservationDetails}>
                <strong>Seat {r.seat_id}</strong> | Date: {r.date} | Time: {r.time_slot} |{' '}
                <em>Intern: {r.username}</em>
              </div>
              <div
                style={{
                  ...styles.reservationStatus,
                  color: getStatusColor(r.status),
                }}
              >
                Status: <strong>{r.status}</strong>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default AdminReservations;
