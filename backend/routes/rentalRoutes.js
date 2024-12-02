import { Router } from 'express';
import { startRental, endRental, getActiveRentals } from '../controllers/rentalController';
import authMiddleware from '../middlewares/authMiddleware';

const router = Router();

router.post('/start', authMiddleware, startRental);  // Start a new rental (requires authentication)
router.post('/end', authMiddleware, endRental);      // End an active rental (requires authentication)
router.get('/active', authMiddleware, getActiveRentals);  // Get active rentals for user (requires authentication)

export default router;
