import pool from '../config/db.js';

export const getAllSeats = async () => {
  const [rows] = await pool.query('SELECT * FROM seats');
  return rows;
};

export const addSeat = async (seatNumber, location, status) => {
  const [result] = await pool.query(
    'INSERT INTO seats (seatNumber, location, status) VALUES (?, ?, ?)', 
    [seatNumber, location, status]
  );
  return result.insertId;
};

export const updateSeat = async (seatId, seatNumber, location, status) => {
  await pool.query(
    'UPDATE seats SET seatNumber = ?, location = ?, status = ? WHERE id = ?', 
    [seatNumber, location, status, seatId]
  );
};

export const deleteSeat = async (seatId) => {
  await pool.query('DELETE FROM seats WHERE id = ?', [seatId]);
};

export const getAvailableSeatsByDate = async (date, timeSlot) => {
  const query = `
    SELECT * FROM seats WHERE status = 'available' AND id NOT IN (
      SELECT seat_id FROM reservations WHERE date = ? AND time_slot = ? AND status = 'Active'
    )
  `;
  const [rows] = await pool.query(query, [date, timeSlot]);  
  return rows;
};


