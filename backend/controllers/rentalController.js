const Rental = require("../models/Rental");
const { rentalNFT } = require("../config/blockchain");
const ethers = require("ethers");

exports.mintNFT = async (req, res) => {
    try {
        const { address } = req.body;
        const tx = await rentalNFT.mintNFT(address);
        await tx.wait();
        res.status(200).json({ success: true, transactionHash: tx.hash });
    } catch (error) {
        console.error("Error in mintNFT:", error.message);
        res.status(500).json({ success: false, error: error.message });
    }
};

exports.createRental = async (req, res) => {
    try {
        const { tokenId, duration, deposit, owner } = req.body;

        // Interact with the smart contract
        const tx = await rentalNFT.createRental(tokenId, duration, ethers.parseEther(deposit));
        await tx.wait();

        // Save rental in MongoDB
        const rental = new Rental({ tokenId, duration, deposit, owner });
        await rental.save();

        res.status(200).json({ success: true, transactionHash: tx.hash, rental });
    } catch (error) {
        console.error("Error in createRental:", error.message);
        res.status(500).json({ success: false, error: error.message });
    }
};

exports.startRental = async (req, res) => {
    try {
        const { tokenId, deposit, renter } = req.body;

        // Interact with the smart contract
        const tx = await rentalNFT.startRental(tokenId, { value: ethers.parseEther(deposit) });
        await tx.wait();

        // Update rental in MongoDB
        const rental = await Rental.findOne({ tokenId, active: true });
        if (!rental) {
            return res.status(404).json({ success: false, message: "Rental not found" });
        }
        rental.renter = renter;
        await rental.save();

        res.status(200).json({ success: true, transactionHash: tx.hash, rental });
    } catch (error) {
        console.error("Error in startRental:", error.message);
        res.status(500).json({ success: false, error: error.message });
    }
};

exports.endRental = async (req, res) => {
    try {
        const { tokenId } = req.body;

        // Interact with the smart contract
        const tx = await rentalNFT.endRental(tokenId);
        await tx.wait();

        // Update rental in MongoDB
        const rental = await Rental.findOne({ tokenId, active: true });
        if (!rental) {
            return res.status(404).json({ success: false, message: "Rental not found" });
        }
        rental.active = false;
        await rental.save();

        res.status(200).json({ success: true, transactionHash: tx.hash, rental });
    } catch (error) {
        console.error("Error in endRental:", error.message);
        res.status(500).json({ success: false, error: error.message });
    }
};
