const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const router = express.Router();

// Signup route
router.post('/signup', async (req, res) => {
    const { firstName, lastName, contactNumber, email, password, gender, walletAddress } = req.body;

    try {
        // Check if user exists
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: 'User already exists' });

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 12);

        // Create the user
        const newUser = new User({
            firstName,
            lastName,
            contactNumber,
            email,
            password: hashedPassword,
            gender,
            walletAddress,
        });

        await newUser.save();

        // Generate token
        const token = jwt.sign({ id: newUser._id, email: newUser.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(201).json({ token, user: newUser });
    } catch (err) {
        res.status(500).json({ message: 'Error creating user', error: err.message });
    }
});

module.exports = router;
