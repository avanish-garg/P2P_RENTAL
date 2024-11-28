const mongoose = require("mongoose");

const rentalSchema = new mongoose.Schema({
    tokenId: {
        type: String,
        required: true,
        unique: true,
    },
    owner: {
        type: String,
        required: true,
    },
    renter: {
        type: String,
        default: null, // Initially, no renter is assigned
    },
    deposit: {
        type: String, // Store deposit as a string (in wei) to avoid precision issues
        required: true,
    },
    duration: {
        type: Number, // Duration in seconds
        required: true,
    },
    active: {
        type: Boolean,
        default: true, // Mark rental as active when created
    },
    createdAt: {
        type: Date,
        default: Date.now, // Automatically set the timestamp
    },
});

module.exports = mongoose.model("Rental", rentalSchema);
