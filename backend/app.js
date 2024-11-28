const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { ethers } = require("ethers");
const RentalNFT = require("./contracts/RentalNFT.json");
const rentalRoutes = require("./routes/rentalRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Blockchain Setup
const provider = new ethers.JsonRpcProvider(process.env.MUMBAI_RPC_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
const contract = new ethers.Contract(
    process.env.CONTRACT_ADDRESS,
    RentalNFT.abi,
    wallet
);

// API Endpoints for Blockchain
app.post("/api/mint", async (req, res) => {
    const { to } = req.body;
    try {
        const tx = await contract.mintNFT(to);
        await tx.wait();
        res.json({ message: "NFT minted successfully", txHash: tx.hash });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post("/api/create-rental", async (req, res) => {
    const { tokenId, duration, deposit } = req.body;
    try {
        const tx = await contract.createRental(
            tokenId,
            duration,
            ethers.parseEther(deposit)
        );
        await tx.wait();
        res.json({ message: "Rental created successfully", txHash: tx.hash });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post("/api/start-rental", async (req, res) => {
    const { tokenId, deposit } = req.body;
    try {
        const tx = await contract.startRental(tokenId, {
            value: ethers.parseEther(deposit),
        });
        await tx.wait();
        res.json({ message: "Rental started successfully", txHash: tx.hash });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post("/api/end-rental", async (req, res) => {
    const { tokenId } = req.body;
    try {
        const tx = await contract.endRental(tokenId);
        await tx.wait();
        res.json({ message: "Rental ended successfully", txHash: tx.hash });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// MongoDB Routes
app.use("/api/rentals", rentalRoutes); // Use routes from the rentalRoutes file

module.exports = app;
