import express from 'express';
import { getSeatUsageReport } from '../controllers/seatController.js';
import { auth } from '../middleware/authMiddleware.js';
import { isAdmin } from '../middleware/roleMiddleware.js';

const router = express.Router();

router.get('/seat-usage', auth, isAdmin, getSeatUsageReport);


export default router;
