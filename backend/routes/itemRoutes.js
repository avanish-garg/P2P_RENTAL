import { Router } from "express";
import { mintNFT, createRental, startRental, endRental } from "../controllers/rentalController";
import { findOne } from "../models/Item";  // Import the Item model

const router = Router();

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
        const item = await findOne({ tokenId });
        if (!item) {
            return res.status(404).json({ error: "Item not found" });
        }
        res.json({ item });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Add other routes as necessary for your app (e.g., user profile, etc.)

export default router;
