import express from 'express';
import {
  listSeats,
  createSeat,
  editSeat,
  removeSeat,
  getSeatUsageReport,
  getAvailableSeats
} from '../controllers/seatController.js';

import { auth } from '../middleware/authMiddleware.js';
import { isAdmin } from '../middleware/roleMiddleware.js';

const router = express.Router();

//  Available Seats - Any Authenticated User (Intern/Admin)
router.get('/available', auth, getAvailableSeats);

//  List All Seats - Any Authenticated User
router.get('/', auth, listSeats);

//  Admin-only Routes
router.post('/', auth, isAdmin, createSeat);
router.put('/:id', auth, isAdmin, editSeat);     
router.patch('/:id', auth, isAdmin, editSeat);   
router.delete('/:id', auth, isAdmin, removeSeat);
router.get('/report', auth, isAdmin, getSeatUsageReport);

export default router;
