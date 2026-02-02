import express from 'express';
import { createBooking, getUserBookings, getBookingById, updateBookingStatus, rateBooking } from '../controllers/bookingController.js';

const router = express.Router();

router.post('/', createBooking);
router.get('/detail/:id', getBookingById);
router.put('/:id/status', updateBookingStatus);
router.put('/:id/rate', rateBooking);
router.get('/:userId', getUserBookings);

export default router;
