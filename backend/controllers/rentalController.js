const { rentalNFT } = require('../config/blockchain');
const { ethers } = require('ethers');
const Item = require('../models/Item');  // Import the Item model

// Mint NFT
const mintNFT = async (req, res) => {
    const { to } = req.body;  // Extract the 'to' address from the request body
    console.log(`Minting NFT to address: ${to}`);  // Log the target address for minting the NFT

    try {
        // Call the mintNFT function in the rentalNFT contract
        const tx = await rentalNFT.mintNFT(to);
        await tx.wait();  // Wait for the transaction to be mined
        console.log("NFT minted successfully, transaction hash:", tx.hash);  // Log the transaction hash
        res.json({ message: "NFT minted successfully", txHash: tx.hash });  // Send response with success message and txHash
    } catch (error) {
        console.error("Error minting NFT:", error.message);  // Log the error message
        res.status(500).json({ error: error.message });  // Return error response with the error message
    }
};

// Create Rental (and save item to MongoDB)
const createRental = async (req, res) => {
    const { tokenId, duration, deposit, name, description, imageUrl, owner } = req.body;
    console.log(`Creating rental for tokenId: ${tokenId}, Duration: ${duration}, Deposit: ${deposit} ETH`);

    try {
        // Create rental record in the blockchain (Ethereum smart contract)
        const tx = await rentalNFT.createRental(tokenId, duration, ethers.utils.parseEther(deposit));
        await tx.wait();

        // After the rental is created, save the item to MongoDB
        const newItem = new Item({
            tokenId,
            owner,
            name,
            description,
            imageUrl,
        });
        await newItem.save();  // Save item details to MongoDB

        console.log("Rental created successfully and item saved to MongoDB, transaction hash:", tx.hash);
        res.json({ message: "Rental created successfully", txHash: tx.hash, item: newItem });
    } catch (error) {
        console.error("Error creating rental:", error.message);
        res.status(500).json({ error: error.message });
    }
};

// Fetch Item Details (for viewing rental information)
const getItemDetails = async (req, res) => {
    const { tokenId } = req.params;  // Get tokenId from request params

    try {
        // Find the item by tokenId in MongoDB
        const item = await Item.findOne({ tokenId });
        if (!item) {
            return res.status(404).json({ error: "Item not found" });
        }
        res.json({ item });  // Return the item details as JSON
    } catch (error) {
        console.error("Error fetching item details:", error.message);
        res.status(500).json({ error: error.message });
    }
};

// Start Rental
const startRental = async (req, res) => {
    const { tokenId, deposit } = req.body;  // Extract tokenId and deposit from the request body
    console.log(`Starting rental for tokenId: ${tokenId}, Deposit: ${deposit} ETH`);

    try {
        // Call the smart contract to start the rental
        const tx = await rentalNFT.startRental(tokenId, {
            value: ethers.utils.parseEther(deposit),
        });
        await tx.wait();

        // Optionally, update MongoDB rental status
        await Item.updateOne({ tokenId }, { $set: { rentalStatus: 'rented' } });

        console.log("Rental started successfully, transaction hash:", tx.hash);
        res.json({ message: "Rental started successfully", txHash: tx.hash });
    } catch (error) {
        console.error("Error starting rental:", error.message);
        res.status(500).json({ error: error.message });
    }
};

// End Rental
const endRental = async (req, res) => {
    const { tokenId } = req.body;  // Extract tokenId from the request body
    console.log(`Ending rental for tokenId: ${tokenId}`);

    try {
        // Call the smart contract to end the rental
        const tx = await rentalNFT.endRental(tokenId);
        await tx.wait();

        // Optionally, update MongoDB rental status
        await Item.updateOne({ tokenId }, { $set: { rentalStatus: 'available' } });

        console.log("Rental ended successfully, transaction hash:", tx.hash);
        res.json({ message: "Rental ended successfully", txHash: tx.hash });
    } catch (error) {
        console.error("Error ending rental:", error.message);
        res.status(500).json({ error: error.message });
    }
};

// Export the controller methods
module.exports = { mintNFT, createRental, getItemDetails, startRental, endRental };
