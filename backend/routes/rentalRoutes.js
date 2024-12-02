const express = require('express');
const { startRental, endRental, getActiveRentals } = require('../controllers/rentalController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/start', authMiddleware, startRental);  // Start a new rental (requires authentication)
router.post('/end', authMiddleware, endRental);      // End an active rental (requires authentication)
router.get('/active', authMiddleware, getActiveRentals);  // Get active rentals for user (requires authentication)

module.exports = router;
