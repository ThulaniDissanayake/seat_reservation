import pool from '../config/db.js';
import { getAllSeats, addSeat, updateSeat, deleteSeat } from '../models/seatModel.js';
import { getAvailableSeatsByDate } from '../models/seatModel.js';

export const listSeats = async (req, res) => {
  try {
    const seats = await getAllSeats();
    res.json(seats);
  } catch (err) {
    console.error(' Fetch Seats Error:', err.message);
    res.status(500).json({ message: 'Failed to fetch seats' });
  }
};

export const createSeat = async (req, res) => {
  try {
    const { seatNumber, location, status = 'available' } = req.body;
    const id = await addSeat(seatNumber, location, status);
    res.status(201).json({ id, seatNumber, location, status });
  } catch (err) {
    console.error(' Create Seat Error:', err.message);
    res.status(500).json({ message: 'Failed to create seat' });
  }
};

export const editSeat = async (req, res) => {
  try {
    const { id } = req.params;
    const { seatNumber, location, status } = req.body;
    await updateSeat(id, seatNumber, location, status);
    res.json({ message: 'Seat updated successfully' });
  } catch (err) {
    console.error(' Edit Seat Error:', err.message);
    res.status(500).json({ message: 'Failed to update seat' });
  }
};

export const removeSeat = async (req, res) => {
  try {
    const { id } = req.params;
    await deleteSeat(id);
    res.json({ message: 'Seat removed successfully' });
  } catch (err) {
    console.error(' Delete Seat Error:', err.message);
    res.status(500).json({ message: 'Failed to delete seat' });
  }
};

export const getSeatUsageReport = async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT 
        s.id, 
        s.seatNumber, 
        s.location,
        COUNT(r.id) AS total_reservations
      FROM seats s
      LEFT JOIN reservations r ON s.id = r.seat_id
      GROUP BY s.id, s.seatNumber, s.location
    `);

    res.json(rows);
  } catch (err) {
    console.error('Report Error:', err.message);
    res.status(500).json({ message: 'Failed to generate report' });
  }
};


export const getAvailableSeats = async (req, res) => {
  try {
    const { date, timeSlot } = req.query;  // expecting frontend's camelCase

    if (!date || !timeSlot) {
      return res.status(400).json({ message: 'Date and timeSlot query parameters are required' });
    }

    const availableSeats = await getAvailableSeatsByDate(date, timeSlot);  // Pass as is
    res.json(availableSeats);
  } catch (err) {
    console.error(' Fetch Available Seats Error:', err.message);
    res.status(500).json({ message: 'Failed to fetch available seats' });
  }
};

