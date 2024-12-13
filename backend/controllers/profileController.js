const User = require('../models/userModel');

// Get Profile Controller
exports.getProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select('-password'); // Exclude password from the response
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({
            user: {
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                contactNumber: user.contactNumber,
                email: user.email,
                gender: user.gender,
                walletAddress: user.walletAddress,
                username: user.username,
                createdAt: user.createdAt
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error, please try again later' });
    }
};

// Update Profile Controller
exports.updateProfile = async (req, res) => {
    const { firstName, lastName, contactNumber, email, gender, walletAddress, username } = req.body;

    // Validation
    if (!firstName || !lastName || !contactNumber || !email || !gender || !walletAddress || !username) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const userId = req.user.id;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Update the user fields
        user.firstName = firstName;
        user.lastName = lastName;
        user.contactNumber = contactNumber;
        user.email = email;
        user.gender = gender;
        user.walletAddress = walletAddress;
        user.username = username;

        await user.save();

        res.json({
            message: 'Profile updated successfully',
            user: {
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                contactNumber: user.contactNumber,
                email: user.email,
                gender: user.gender,
                walletAddress: user.walletAddress,
                username: user.username,
                createdAt: user.createdAt
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error, please try again later' });
    }
};
