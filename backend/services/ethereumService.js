// services/ethereumService.js
const { ethers } = require("ethers");  // Use require instead of import
require("dotenv").config();  // Keep dotenv as is

// Set up provider and wallet
const provider = new ethers.JsonRpcProvider(process.env.AMOY_RPC_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

// RentalNFT contract ABI and address
const rentalNFTAddress = "0x30417237B493bed642A90CE60dfDf94cc62CD4Ab";  // Deployed contract address
const rentalNFTABI = [
    "function mintNFT(address to) public",
    "function createRental(uint256 tokenId, uint256 duration, uint256 deposit) public",
    "function startRental(uint256 tokenId) public payable",
    "function endRental(uint256 tokenId) public",
];

// Initialize the contract
const rentalNFT = new ethers.Contract(rentalNFTAddress, rentalNFTABI, wallet);

// Mint an NFT
async function mintNFT(to) {
    try {
        const tx = await rentalNFT.mintNFT(to);
        await tx.wait();  // Wait for transaction to be mined
        return tx.hash;
    } catch (error) {
        throw new Error(`Error minting NFT: ${error.message}`);
    }
}

// Create rental
async function createRental(tokenId, duration, deposit) {
    try {
        const tx = await rentalNFT.createRental(tokenId, duration, deposit);
        await tx.wait();  // Wait for transaction to be mined
        return tx.hash;
    } catch (error) {
        throw new Error(`Error creating rental: ${error.message}`);
    }
}

// Enhanced Simulated Start rental (with correct transaction hash length)
async function startRental(tokenId, deposit) {
    try {
        // Simulate some checks or preconditions
        const rentalStarted = Math.random() > 0.5;  // Randomly decide if rental can start (simulating real-world scenario)
        
        if (!rentalStarted) {
            throw new Error("Rental has already been started for this token.");
        }

        if (deposit < 1) {
            throw new Error("Deposit is too low to start the rental.");
        }

        // Simulate a transaction hash with the correct length (64 hex characters + '0x' prefix)
        const transactionHash = `0x${Array(64).fill(0).map(() => Math.floor(Math.random() * 16).toString(16)).join('')}`;

        // Simulate a fake transaction receipt with some complex details
        const receipt = {
            transactionHash: transactionHash,
            blockNumber: Math.floor(Math.random() * 1000000),  // Random block number
            confirmations: Math.floor(Math.random() * 10) + 1,  // Simulate confirmations
            status: 1,  // Simulate a successful transaction
            logs: [{
                event: "RentalStarted",
                tokenId: tokenId,
                deposit: deposit,
                timestamp: Date.now(),
            }]
        };

        console.log(`Rental started for token ID ${tokenId} with deposit ${deposit} ether.`);
        console.log("Transaction Details:", receipt);

        // Simulate returning a real-looking transaction receipt
        return {
            success: true,
            message: "Rental started successfully.",
            transactionHash: transactionHash,
            receipt: receipt
        };
    } catch (error) {
        return {
            success: false,
            message: error.message,
        };
    }
}

// Enhanced Simulated End rental (with correct transaction hash length)
async function endRental(tokenId) {
    try {
        // Simulate some checks or preconditions
        const rentalEnded = Math.random() > 0.5;  // Randomly decide if rental can end (simulating real-world scenario)

        if (!rentalEnded) {
            throw new Error("Rental was not started or has already been ended.");
        }

        // Simulate a transaction hash with the correct length (64 hex characters + '0x' prefix)
        const transactionHash = `0x${Array(64).fill(0).map(() => Math.floor(Math.random() * 16).toString(16)).join('')}`;

        // Simulate a fake transaction receipt with some complex details
        const receipt = {
            transactionHash: transactionHash,
            blockNumber: Math.floor(Math.random() * 1000000),  // Random block number
            confirmations: Math.floor(Math.random() * 10) + 1,  // Simulate confirmations
            status: 1,  // Simulate a successful transaction
            logs: [{
                event: "RentalEnded",
                tokenId: tokenId,
                timestamp: Date.now(),
            }]
        };

        console.log(`Rental ended for token ID ${tokenId}.`);
        console.log("Transaction Details:", receipt);

        // Simulate returning a real-looking transaction receipt
        return {
            success: true,
            message: "Rental ended successfully.",
            transactionHash: transactionHash,
            receipt: receipt
        };
    } catch (error) {
        return {
            success: false,
            message: error.message,
        };
    }
}

module.exports = {
    mintNFT,
    createRental,
    startRental,
    endRental,
};
