const User = require('../models/User');

// Create a new user
const createUser = async (req, res) => {
    const { walletAddress, username, email } = req.body;
    try {
        const user = new User({ walletAddress, username, email });
        await user.save();
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get user by wallet address
const getUser = async (req, res) => {
    const { walletAddress } = req.params;
    try {
        const user = await User.findOne({ walletAddress });
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { createUser, getUser };
