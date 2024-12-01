const express = require('express');
const router = express.Router();
const { mintNFT, createRental, startRental, endRental } = require('../controllers/rentalController');

router.post('/mint', mintNFT);
router.post('/create-rental', createRental);
router.post('/start-rental', startRental);
router.post('/end-rental', endRental);

module.exports = router;
