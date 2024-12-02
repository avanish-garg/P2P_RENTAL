const Rental = require('../models/rentalModel');
const User = require('../models/userModel');

// Start Rental Controller
exports.startRental = async (req, res) => {
    const { itemId, price } = req.body;

    // Get the logged-in user
    const user = await User.findById(req.user.id);
    if (!user) {
        return res.status(400).json({ message: 'User not found' });
    }

    try {
        const rental = new Rental({
            userId: req.user.id,
            itemId,
            price,
            status: 'active',
        });

        await rental.save();

        res.status(201).json({ message: 'Rental started successfully', rental });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// End Rental Controller
exports.endRental = async (req, res) => {
    const { rentalId } = req.body;

    // Find the rental record
    try {
        const rental = await Rental.findById(rentalId);
        if (!rental) {
            return res.status(404).json({ message: 'Rental not found' });
        }

        rental.status = 'ended';
        rental.rentalEndDate = Date.now();
        await rental.save();

        res.json({ message: 'Rental ended successfully', rental });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get Active Rentals Controller
exports.getActiveRentals = async (req, res) => {
    try {
        const rentals = await Rental.find({ userId: req.user.id, status: 'active' });
        res.json({ rentals });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
