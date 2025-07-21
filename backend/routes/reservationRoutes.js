import express from 'express';
import {
  reserveSeat,
  myReservations,
  cancelMyReservation,
  modifyReservation,
  getAllReservations,
  assignSeatToIntern
} from '../controllers/reservationController.js';
import { auth } from '../middleware/authMiddleware.js';
import { isAdmin } from '../middleware/roleMiddleware.js';

const router = express.Router();

router.post('/', auth, reserveSeat);
router.get('/my', auth, myReservations);
router.delete('/:id', auth, cancelMyReservation);
router.put('/:id', auth, modifyReservation);

// ✅ Admin route
router.get('/all', auth, isAdmin, getAllReservations);
router.post('/assign', auth, isAdmin, assignSeatToIntern);

export default router;
