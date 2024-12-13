const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const profileController = require('../controllers/profileController');

// Route to get profile (protected)
router.get('/', authMiddleware, profileController.getProfile);

// Route to update profile (protected)
router.put('/', authMiddleware, profileController.updateProfile);

module.exports = router;
