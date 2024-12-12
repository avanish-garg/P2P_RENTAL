const bcrypt = require('bcryptjs');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

// Sign Up Controller
exports.signup = async (req, res) => {
    const { firstName, lastName, contactNumber, email, password, gender, walletAddress, username } = req.body;

    // Validation
    if (!email || !password || !firstName || !lastName || !contactNumber || !gender || !walletAddress || !username) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        // Check if the user already exists with the same email
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists with this email' });
        }

        // Check if the username already exists
        const usernameExists = await User.findOne({ username });
        if (usernameExists) {
            return res.status(400).json({ message: 'Username already taken' });
        }

        // Check if the wallet address already exists
        const walletExists = await User.findOne({ walletAddress });
        if (walletExists) {
            return res.status(400).json({ message: 'Wallet address already in use' });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create and save new user
        const newUser = new User({
            firstName,
            lastName,
            contactNumber,
            email,
            password: hashedPassword,
            gender,
            walletAddress,
            username // Ensure username is passed as part of the user data
        });

        await newUser.save();

        // Send response
        res.status(201).json({ 
            message: 'User created successfully',
            user: {
                id: newUser._id,
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                email: newUser.email,
                username: newUser.username,
                walletAddress: newUser.walletAddress
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error, please try again later' });
    }
};

// Login Controller
exports.login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Compare the password with the hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ message: 'Login successful', token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error, please try again later' });
    }
};
