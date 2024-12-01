const mongoose = require('mongoose');

const rentalSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    itemId: { type: String, required: true },  // You can link this to the Item model if needed
    rentalStartDate: { type: Date, default: Date.now },
    rentalEndDate: { type: Date },
    status: { type: String, enum: ['active', 'ended'], default: 'active' },
    price: { type: Number, required: true },
});

const Rental = mongoose.model('Rental', rentalSchema);

module.exports = Rental;
