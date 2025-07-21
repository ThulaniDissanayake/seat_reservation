import {
  createReservation,
  getReservationsByIntern,
  checkSeatAvailability,
  cancelReservation,
  getReservationById,
  updateReservation,
  getAllReservationsQuery,
  hasInternReservedForDate
} from '../models/reservationModel.js';

// Helper functions
const isPastDate = (date) => {
  const selectedDate = new Date(date);
  const today = new Date();
  return selectedDate < new Date(today.toISOString().slice(0, 10));
};

const isAtLeastOneHourAhead = (date, timeSlot) => {
  const now = new Date();
  const slotStart = timeSlot.split('-')[0]; // "09:00"
  const targetTime = new Date(`${date}T${slotStart}:00`);
  return targetTime.getTime() - now.getTime() >= 60 * 60 * 1000;
};

// ✅ Reserve Seat (Intern)
export const reserveSeat = async (req, res) => {
  try {
    const { seat_id, date, time_slot } = req.body;
    const internId = req.user.id;

    if (isPastDate(date)) {
      return res.status(400).json({ message: 'Cannot reserve for past dates' });
    }

    if (!isAtLeastOneHourAhead(date, time_slot)) {
      return res.status(400).json({ message: 'Reservations must be made at least 1 hour in advance' });
    }

    if (await hasInternReservedForDate(internId, date)) {
      return res.status(400).json({ message: 'You have already reserved a seat for this date' });
    }

    if (!(await checkSeatAvailability(seat_id, date, time_slot))) {
      return res.status(400).json({ message: 'Seat already booked' });
    }

    const reservationId = await createReservation(
      internId,
      seat_id,
      date,
      time_slot,
      'Active'
    );
    res.status(201).json({ reservationId });
  } catch (err) {
    console.error('Reserve Seat Error:', err.message);
    res.status(500).json({ message: 'Failed to reserve seat' });
  }
};

// ✅ Get My Reservations
export const myReservations = async (req, res) => {
  try {
    const reservations = await getReservationsByIntern(req.user.id);
    res.json(reservations);
  } catch (err) {
    console.error(' My Reservations Error:', err.message);
    res.status(500).json({ message: 'Failed to fetch reservations' });
  }
};

// ✅ Cancel My Reservation
export const cancelMyReservation = async (req, res) => {
  try {
    const { id } = req.params;
    const internId = req.user.id;

    const reservation = await getReservationById(id);
    if (!reservation) return res.status(404).json({ message: 'Reservation not found' });

    if (reservation.intern_id !== internId) {
      return res.status(403).json({ message: 'Unauthorized to cancel this reservation' });
    }

    const today = new Date().toISOString().slice(0, 10);
    if (reservation.date < today) {
      return res.status(400).json({ message: 'Cannot cancel past reservations' });
    }

    await cancelReservation(id);
    res.json({ message: 'Reservation cancelled' });
  } catch (err) {
    console.error(' Cancel Reservation Error:', err.message);
    res.status(500).json({ message: 'Failed to cancel reservation' });
  }
};

// ✅ Modify My Reservation
export const modifyReservation = async (req, res) => {
  try {
    const { id } = req.params;
    const internId = req.user.id;
    const { seat_id, date, time_slot } = req.body;

    const reservation = await getReservationById(id);
    if (!reservation) return res.status(404).json({ message: 'Reservation not found' });

    if (reservation.intern_id !== internId) {
      return res.status(403).json({ message: 'Unauthorized to modify this reservation' });
    }

    const today = new Date().toISOString().slice(0, 10);
    if (reservation.date < today) {
      return res.status(400).json({ message: 'Cannot modify past reservations' });
    }

    if (!(await checkSeatAvailability(seat_id, date, time_slot)) &&
      !(reservation.seat_id === seat_id && reservation.date === date && reservation.time_slot === time_slot)) {
      return res.status(400).json({ message: 'Seat already booked for selected date and time slot' });
    }

    await updateReservation(id, internId, seat_id, date, time_slot);
    res.json({ message: 'Reservation updated' });
  } catch (err) {
    console.error(' Modify Reservation Error:', err.message);
    res.status(500).json({ message: 'Failed to modify reservation' });
  }
};

// ✅ Get All Reservations (Admin)
export const getAllReservations = async (req, res) => {
  try {
    const { date, internId } = req.query;
    const reservations = await getAllReservationsQuery(date, internId);
    res.json(reservations);
  } catch (err) {
    console.error('Fetch All Reservations Error:', err.message);
    res.status(500).json({ message: 'Failed to fetch reservations' });
  }
};

// ✅ Assign Seat to Intern (Admin)
export const assignSeatToIntern = async (req, res) => {
  try {
    const { internId, seat_id, date, time_slot } = req.body;

    if (isPastDate(date)) {
      return res.status(400).json({ message: 'Cannot assign for past dates' });
    }

    if (!isAtLeastOneHourAhead(date, time_slot)) {
      return res.status(400).json({ message: 'Assignments must be made at least 1 hour in advance' });
    }

    if (await hasInternReservedForDate(internId, date)) {
      return res.status(400).json({ message: 'Intern already has a reservation for this date' });
    }

    if (!(await checkSeatAvailability(seat_id, date, time_slot))) {
      return res.status(400).json({ message: 'Seat already booked' });
    }

    const reservationId = await createReservation(
      internId,
      seat_id,
      date,
      time_slot,
      'Active'
    );

    res.status(201).json({ message: 'Seat assigned', reservationId });
  } catch (err) {
    console.error(' Manual Assign Error:', err.message);
    res.status(500).json({ message: 'Failed to assign seat' });
  }
};
