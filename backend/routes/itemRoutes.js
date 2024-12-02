const express = require("express");
const { mintNFT, createRental, startRental, endRental } = require("../controllers/rentalController");
const Item = require("../models/Item");  // Import the Item model

const router = express.Router();

// Mint NFT
router.post("/mint", mintNFT);

// Create Rental
router.post("/create-rental", createRental);

// Start Rental
router.post("/start-rental", startRental);

// End Rental
router.post("/end-rental", endRental);

// Get Item Details
router.get("/item/:tokenId", async (req, res) => {
    const { tokenId } = req.params;
    try {
        const item = await Item.findOne({ tokenId });
        if (!item) {
            return res.status(404).json({ error: "Item not found" });
        }
        res.json({ item });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Add other routes as necessary for your app (e.g., user profile, etc.)

module.exports = router;
