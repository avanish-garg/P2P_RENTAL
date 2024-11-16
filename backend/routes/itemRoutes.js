const express = require("express");
const router = express.Router();

// Test route
router.get("/", (req, res) => {
    res.json({ message: "Welcome to the P2P Rental API!" });
});

module.exports = router;

