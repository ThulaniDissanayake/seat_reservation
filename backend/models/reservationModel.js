import pool from '../config/db.js';

export const getReservationsByIntern = async (internId) => {
  const [rows] = await pool.query(
    'SELECT * FROM reservations WHERE intern_id = ?',
    [internId]
  );
  return rows;
};

export const getReservationById = async (id) => {
  const [rows] = await pool.query(
    'SELECT * FROM reservations WHERE id = ?',
    [id]
  );
  return rows[0];
};

export const createReservation = async (internId, seatId, date, timeSlot, status) => {
  const [result] = await pool.query(
    'INSERT INTO reservations (intern_id, seat_id, date, time_slot, status) VALUES (?, ?, ?, ?, ?)',
    [internId, seatId, date, timeSlot, status]
  );
  return result.insertId;
};

export const checkSeatAvailability = async (seatId, date, timeSlot) => {
  const [rows] = await pool.query(
    'SELECT * FROM reservations WHERE seat_id = ? AND date = ? AND time_slot = ? AND status = "Active"',
    [seatId, date, timeSlot]
  );
  return rows.length === 0;
};

export const cancelReservation = async (reservationId) => {
  await pool.query(
    'UPDATE reservations SET status = "Cancelled" WHERE id = ?',
    [reservationId]
  );
};

export const updateReservation = async (reservationId, internId, seat_id, date, time_slot) => {
  await pool.query(
    'UPDATE reservations SET seat_id = ?, date = ?, time_slot = ? WHERE id = ? AND intern_id = ? AND status = "Active"',
    [seat_id, date, time_slot, reservationId, internId]
  );
};

export const getAllReservationsQuery = async (date, internId) => {
  let query = `
    SELECT r.*, u.name AS username 
    FROM reservations r
    JOIN users u ON r.intern_id = u.id
    WHERE 1=1
  `;
  const params = [];

  if (date) {
    query += ' AND r.date = ?';
    params.push(date);
  }

  if (internId) {
    query += ' AND r.intern_id = ?';
    params.push(internId);
  }

  const [rows] = await pool.query(query, params);
  return rows;  // <-- Correct: return rows, no res.json here
};

export const hasInternReservedForDate = async (internId, date) => {
  const [rows] = await pool.query(
    'SELECT * FROM reservations WHERE intern_id = ? AND date = ? AND status = "Active"',
    [internId, date]
  );
  return rows.length > 0;
};
