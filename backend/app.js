require("dotenv").config();  // Load environment variables from .env file
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { ethers } = require("ethers");  // Library for interacting with Ethereum blockchain
const RentalNFTABI = require("./RentalNFTABI.json");  // ABI of the RentalNFT contract
const rentalRoutes = require("./routes/rentalRoutes");  // Import rental routes for CRUD operations
const itemRoutes = require("./routes/itemRoutes");  // Import item routes for managing items in MongoDB

const app = express();

// Middleware for enabling CORS (Cross-Origin Resource Sharing) and parsing JSON data
app.use(cors({
    origin: ["https://yourfrontenddomain.com"]  // Restrict CORS to your frontend domain (update with your frontend domain)
}));  
app.use(bodyParser.json());  // Parse incoming JSON requests

// Blockchain Setup:
// Initialize provider using AMOY or any other RPC URL for the blockchain
const provider = new ethers.JsonRpcProvider(process.env.AMOY_RPC_URL);  // RPC URL for AMOY testnet
console.log("Connected to provider at:", process.env.AMOY_RPC_URL);  // Log the RPC URL to verify the connection

// Initialize wallet with private key (stored securely in .env) and provider
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);  // Ethereum wallet to sign transactions
console.log("Connected wallet address:", wallet.address);  // Log wallet address to verify it's correctly set up

// Blockchain Contract instance:
// Initialize the contract with ABI and contract address from environment variables
const contract = new ethers.Contract(
    process.env.CONTRACT_ADDRESS,  // Smart contract address
    RentalNFTABI.abi,  // ABI (Application Binary Interface) of the RentalNFT contract
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
        const receipt = await tx.wait();  // Wait for the transaction to be mined
        console.log("Minting successful, transaction hash:", tx.hash);  // Log success and transaction hash
        console.log(`Transaction mined in block: ${receipt.blockNumber}`);
        res.json({ message: "NFT minted successfully", txHash: tx.hash, blockNumber: receipt.blockNumber });  // Send a success response with the tx hash
    } catch (error) {
        console.error("Error minting NFT:", error.message);  // Log any errors during minting
        res.status(500).json({ error: error.message });  // Send error response with the error message
    }
});

// Create Rental Endpoint: This endpoint will create a rental for an NFT
app.post("/api/create-rental", async (req, res) => {
    const { tokenId, duration, deposit, senderAddress } = req.body;  // Extract details from the request body
    console.log(`Creating rental for tokenId: ${tokenId}, duration: ${duration} seconds, deposit: ${deposit} ETH, senderAddress: ${senderAddress}`);

    // Validate input data
    if (!tokenId || !duration || !deposit || !senderAddress) {
        return res.status(400).json({ error: "Missing required fields" });
    }
    if (isNaN(deposit)) {
        return res.status(400).json({ error: "Invalid deposit value" });
    }

    try {
        // Check if sender is the owner of the NFT (tokenId)
        const owner = await contract.ownerOf(tokenId);
        console.log("NFT Owner:", owner);

        // Ensure that the sender is the owner of the token
        if (owner.toLowerCase() !== senderAddress.toLowerCase()) {
            return res.status(403).json({ error: "Sender is not the owner of the token" });
        }

        // Correct way to parse Ether in ethers 6.x
        const depositInWei = ethers.parseEther(deposit.toString());  // In ethers 6.x, it's directly accessible as ethers.parseEther
        console.log("Parsed deposit (in Wei):", depositInWei.toString());

        // Call the createRental function from the smart contract
        const tx = await contract.createRental(
            tokenId, 
            duration, 
            depositInWei,  // Pass deposit in Wei
            {
                gasLimit: 2000000  // Set the gas limit to 2 million (adjust as necessary)
            }
        );
        const receipt = await tx.wait();  // Wait for the transaction to be mined
        console.log("Rental created successfully, transaction hash:", tx.hash);
        console.log(`Transaction mined in block: ${receipt.blockNumber}`);
        res.json({ message: "Rental created successfully", txHash: tx.hash, blockNumber: receipt.blockNumber });  // Send success response
    } catch (error) {
        console.error("Error creating rental:", error.message);  // Log any errors during rental creation
        res.status(500).json({ error: error.message });  // Send error response with the error message
    }
});

// Start Rental Endpoint: This endpoint starts the rental and requires a deposit
app.post("/api/start-rental", async (req, res) => {
    const { tokenId, deposit } = req.body;  // Extract tokenId and deposit from the request body
    console.log(`Starting rental for tokenId: ${tokenId}, deposit: ${deposit} ETH`);

    // Validate deposit value
    if (!deposit || isNaN(deposit)) {
        return res.status(400).json({ error: "Invalid deposit value" });
    }

    try {
        // Call startRental function from the smart contract to start the rental
        const tx = await contract.startRental(tokenId, {
            value: ethers.parseEther(deposit.toString()),  // Send ETH deposit to start the rental
            gasLimit: 2000000  // Set the gas limit to 2 million (adjust as necessary)
        });
        const receipt = await tx.wait();  // Wait for the transaction to be mined
        console.log("Rental started successfully, transaction hash:", tx.hash);  // Log success and txHash
        console.log(`Transaction mined in block: ${receipt.blockNumber}`);
        res.json({ message: "Rental started successfully", txHash: tx.hash, blockNumber: receipt.blockNumber });  // Send success response
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
        const tx = await contract.endRental(tokenId, {
            gasLimit: 2000000  // Set the gas limit to 2 million (adjust as necessary)
        });
        const receipt = await tx.wait();  // Wait for the transaction to be mined
        console.log("Rental ended successfully, transaction hash:", tx.hash);  // Log success and txHash
        console.log(`Transaction mined in block: ${receipt.blockNumber}`);
        res.json({ message: "Rental ended successfully", txHash: tx.hash, blockNumber: receipt.blockNumber });  // Send success response
    } catch (error) {
        console.error("Error ending rental:", error.message);  // Log any errors during rental end
        res.status(500).json({ error: error.message });  // Send error response with the error message
    }
});

// MongoDB Routes (CRUD operations for managing rentals, items, and user-related operations)
app.use("/api/rentals", rentalRoutes);  // Mount the rental routes
app.use("/api/items", itemRoutes);  // Mount the item routes for item management

module.exports = app;  // Export app.js to use in server.js
