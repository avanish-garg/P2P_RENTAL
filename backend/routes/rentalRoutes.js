const express = require("express");
const router = express.Router();
const rentalController = require("../controllers/rentalController");

// Mint NFT
router.post("/mint", rentalController.mintNFT);

// Create Rental
router.post("/create-rental", rentalController.createRental);

// Start Rental
router.post("/start-rental", rentalController.startRental);

// End Rental
router.post("/end-rental", rentalController.endRental);

module.exports = router;
