const express = require("express");
const { rentalNFT } = require("../config/blockchain");
const router = express.Router();

// Mint NFT
router.post("/mint", async (req, res) => {
    try {
        const { address } = req.body;
        const tx = await rentalNFT.mintNFT(address);
        await tx.wait();
        res.status(200).json({ success: true, transactionHash: tx.hash });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Create Rental
router.post("/create-rental", async (req, res) => {
    try {
        const { tokenId, duration, deposit } = req.body;
        const tx = await rentalNFT.createRental(tokenId, duration, ethers.parseEther(deposit));
        await tx.wait();
        res.status(200).json({ success: true, transactionHash: tx.hash });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Start Rental
router.post("/start-rental", async (req, res) => {
    try {
        const { tokenId, deposit } = req.body;
        const tx = await rentalNFT.startRental(tokenId, { value: ethers.parseEther(deposit) });
        await tx.wait();
        res.status(200).json({ success: true, transactionHash: tx.hash });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// End Rental
router.post("/end-rental", async (req, res) => {
    try {
        const { tokenId } = req.body;
        const tx = await rentalNFT.endRental(tokenId);
        await tx.wait();
        res.status(200).json({ success: true, transactionHash: tx.hash });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

module.exports = router;
