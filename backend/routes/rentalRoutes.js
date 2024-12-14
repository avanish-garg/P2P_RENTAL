// routes/rentalRoutes.js
const express = require('express');
const router = express.Router();
const ethereumService = require('../services/ethereumService');

// Route to mint an NFT
router.post('/mint', async (req, res) => {
    try {
        const { to } = req.body; // Ensure `to` is the wallet address
        if (!to) {
            return res.status(400).json({ success: false, error: 'Missing wallet address (to)' });
        }
        const txHash = await ethereumService.mintNFT(to);
        res.json({ success: true, txHash });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Route to create rental
router.post('/createRental', async (req, res) => {
    try {
        const { tokenId, duration, deposit } = req.body;
        if (!tokenId || !duration || !deposit) {
            return res.status(400).json({ success: false, error: 'Missing required parameters' });
        }
        const txHash = await ethereumService.createRental(tokenId, duration, deposit);
        res.json({ success: true, txHash });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Route to start rental
router.post('/startRental', async (req, res) => {
    try {
        const { tokenId, deposit } = req.body;
        if (!tokenId || !deposit) {
            return res.status(400).json({ success: false, error: 'Missing required parameters' });
        }
        const txHash = await ethereumService.startRental(tokenId, deposit);
        res.json({ success: true, txHash });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Route to end rental
router.post('/endRental', async (req, res) => {
    try {
        const { tokenId } = req.body;
        if (!tokenId) {
            return res.status(400).json({ success: false, error: 'Missing tokenId' });
        }
        const txHash = await ethereumService.endRental(tokenId);
        res.json({ success: true, txHash });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

module.exports = router;
