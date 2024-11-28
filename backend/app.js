require("dotenv").config();  // Load environment variables from .env file
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { ethers } = require("ethers");  // Library for interacting with Ethereum blockchain
const RentalNFT = require("./contracts/RentalNFT.json");  // ABI of the RentalNFT contract
const rentalRoutes = require("./routes/rentalRoutes");  // Import rental routes for CRUD operations
const itemRoutes = require("./routes/itemRoutes");  // Import item routes for managing items in MongoDB

const app = express();

// Middleware for enabling CORS (Cross-Origin Resource Sharing) and parsing JSON data
app.use(cors());  // Enables all CORS requests from any domain
app.use(bodyParser.json());  // Parse incoming JSON requests

// Blockchain Setup:
// - Initialize provider using AMOY or any other RPC URL for the blockchain
const provider = new ethers.JsonRpcProvider(process.env.AMOY_RPC_URL);  // RPC URL for AMOY testnet (can be other networks like Rinkeby)
console.log("Connected to provider at:", process.env.AMOY_RPC_URL);  // Log the RPC URL to verify the connection

// Initialize wallet with private key (stored securely in .env) and provider
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);  // Ethereum wallet to sign transactions
console.log("Connected wallet address:", wallet.address);  // Log wallet address to verify it's correctly set up

// Blockchain Contract instance:
// - Initialize the contract with ABI and contract address from environment variables
const contract = new ethers.Contract(
    process.env.CONTRACT_ADDRESS,  // Smart contract address
    RentalNFT.abi,  // ABI (Application Binary Interface) of the RentalNFT contract
    wallet  // Wallet to interact with the smart contract
);

// Blockchain Interaction Endpoints:

// Mint NFT Endpoint: This endpoint will mint an NFT to a specified address
app.post("/api/mint", async (req, res) => {
    const { to } = req.body;  // Extract the 'to' address from the request body
    console.log("Minting NFT to address:", to);  // Log the address to verify the minting process

    try {
        // Call the mintNFT function from the smart contract
        const tx = await contract.mintNFT(to);  
        await tx.wait();  // Wait for the transaction to be mined
        console.log("Minting successful, transaction hash:", tx.hash);  // Log success and transaction hash
        res.json({ message: "NFT minted successfully", txHash: tx.hash });  // Send a success response with the tx hash
    } catch (error) {
        console.error("Error minting NFT:", error.message);  // Log any errors during minting
        res.status(500).json({ error: error.message });  // Send error response with the error message
    }
});

// Create Rental Endpoint: This endpoint will create a rental for an NFT
app.post("/api/create-rental", async (req, res) => {
    const { tokenId, duration, deposit } = req.body;  // Extract details from the request body
    console.log(`Creating rental for tokenId: ${tokenId}, duration: ${duration} seconds, deposit: ${deposit} ETH`);

    try {
        // Call createRental function from the smart contract to create the rental
        const tx = await contract.createRental(
            tokenId, 
            duration, 
            ethers.utils.parseEther(deposit)  // Convert deposit from ETH to Wei using ethers.js utility function
        );
        await tx.wait();  // Wait for the transaction to be mined
        console.log("Rental created successfully, transaction hash:", tx.hash);  // Log success and txHash
        res.json({ message: "Rental created successfully", txHash: tx.hash });  // Send success response with tx hash
    } catch (error) {
        console.error("Error creating rental:", error.message);  // Log any errors during rental creation
        res.status(500).json({ error: error.message });  // Send error response with the error message
    }
});

// Start Rental Endpoint: This endpoint starts the rental and requires a deposit
app.post("/api/start-rental", async (req, res) => {
    const { tokenId, deposit } = req.body;  // Extract tokenId and deposit from the request body
    console.log(`Starting rental for tokenId: ${tokenId}, deposit: ${deposit} ETH`);

    try {
        // Call startRental function from the smart contract to start the rental
        const tx = await contract.startRental(tokenId, {
            value: ethers.utils.parseEther(deposit),  // Send ETH deposit to start the rental
        });
        await tx.wait();  // Wait for the transaction to be mined
        console.log("Rental started successfully, transaction hash:", tx.hash);  // Log success and txHash
        res.json({ message: "Rental started successfully", txHash: tx.hash });  // Send success response
    } catch (error) {
        console.error("Error starting rental:", error.message);  // Log any errors during rental start
        res.status(500).json({ error: error.message });  // Send error response with the error message
    }
});

// End Rental Endpoint: This endpoint ends a rental for the specified tokenId
app.post("/api/end-rental", async (req, res) => {
    const { tokenId } = req.body;  // Extract tokenId from the request body
    console.log(`Ending rental for tokenId: ${tokenId}`);  // Log the tokenId for which the rental is being ended

    try {
        // Call endRental function from the smart contract to end the rental
        const tx = await contract.endRental(tokenId);
        await tx.wait();  // Wait for the transaction to be mined
        console.log("Rental ended successfully, transaction hash:", tx.hash);  // Log success and txHash
        res.json({ message: "Rental ended successfully", txHash: tx.hash });  // Send success response
    } catch (error) {
        console.error("Error ending rental:", error.message);  // Log any errors during rental end
        res.status(500).json({ error: error.message });  // Send error response with the error message
    }
});

// MongoDB Routes (CRUD operations for managing rentals, items, and user-related operations)
app.use("/api/rentals", rentalRoutes);  // Mount the rental routes
app.use("/api/items", itemRoutes);  // Mount the item routes for item management

module.exports = app;  // Export app.js to use in server.js
