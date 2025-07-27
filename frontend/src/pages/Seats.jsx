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
      setMessage('✅ Seat reserved successfully!');
      fetchSeats();
    } catch (err) {
      setMessage(err.response?.data?.message || '❌ Reservation failed');
    }
  };

  // === STYLES ===
  const styles = {
    page: {
      background: '#f5f5f5',
      minHeight: '100vh',
      padding: '40px 0',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    },
    container: {
      maxWidth: '780px',
      margin: '0 auto',
      padding: '25px 30px',
      background: '#fff',
      borderRadius: '12px',
      boxShadow: '0 6px 18px rgba(0, 0, 0, 0.1)',
    },
    heading: {
      color: '#2c3e50',
      textAlign: 'center',
      marginBottom: '30px',
      fontSize: '2rem',
    },
    message: {
      textAlign: 'center',
      marginBottom: '20px',
      color: message.toLowerCase().includes('fail') || message.toLowerCase().includes('no') ? '#e74c3c' : '#27ae60',
      fontWeight: 600,
    },
    controls: {
      display: 'flex',
      justifyContent: 'center',
      flexWrap: 'wrap',
      gap: '15px',
      marginBottom: '30px',
    },
    input: {
      padding: '10px 12px',
      borderRadius: '6px',
      border: '1px solid #ccc',
      fontSize: '1rem',
      minWidth: '180px',
    },
    list: {
      listStyleType: 'none',
      padding: 0,
      margin: 0,
    },
    listItem: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: '#fafafa',
      border: '1px solid #ddd',
      borderRadius: '8px',
      padding: '16px 20px',
      marginBottom: '15px',
      transition: 'box-shadow 0.3s',
    },
    listItemHover: {
      boxShadow: '0 4px 14px rgba(0,0,0,0.08)',
    },
    button: {
      backgroundColor: '#3498db',
      color: '#fff',
      border: 'none',
      padding: '8px 16px',
      borderRadius: '6px',
      fontWeight: 'bold',
      cursor: 'pointer',
      transition: 'background-color 0.3s',
    },
    buttonHover: {
      backgroundColor: '#2980b9',
    },
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h2 style={styles.heading}>Available Seats</h2>
        {message && <p style={styles.message}>{message}</p>}

        <div style={styles.controls}>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            style={styles.input}
          />
          <select
            value={timeSlot}
            onChange={(e) => setTimeSlot(e.target.value)}
            style={styles.input}
          >
            <option value="">Select Time Slot</option>
            <option value="09:00-12:00">09:00-12:00</option>
            <option value="13:00-17:00">13:00-17:00</option>
          </select>
        </div>

        <ul style={styles.list}>
          {seats.map((seat) => (
            <li
              key={seat.id}
              style={{
                ...styles.listItem,
                ...(seat.status.toLowerCase() === 'available' ? styles.listItemHover : {}),
              }}
            >
              <span>
                <strong>{seat.seatNumber || seat.seat_number}</strong> — {seat.location}{' '}
                <em style={{
                  color: seat.status === 'available' ? '#27ae60' : '#e67e22',
                  fontStyle: 'normal',
                  marginLeft: '8px',
                }}>
                  ({seat.status})
                </em>
              </span>

              {seat.status.toLowerCase() === 'available' && (
                <button
                  style={styles.button}
                  onMouseOver={(e) => e.currentTarget.style.backgroundColor = styles.buttonHover.backgroundColor}
                  onMouseOut={(e) => e.currentTarget.style.backgroundColor = styles.button.backgroundColor}
                  onClick={() => reserveSeat(seat.id)}
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
