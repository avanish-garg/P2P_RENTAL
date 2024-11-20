require("dotenv").config();
const express = require("express");
const { ethers } = require("ethers");
const RentalNFT = require("./contracts/RentalNFT.json");

const app = express();
app.use(express.json());

// Initialize provider and signer
const provider = new ethers.JsonRpcProvider(process.env.MUMBAI_RPC_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
const contract = new ethers.Contract(
    process.env.CONTRACT_ADDRESS,
    RentalNFT.abi,
    wallet
);

// Mint NFT Endpoint
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

// Create Rental Endpoint
app.post("/api/create-rental", async (req, res) => {
    const { tokenId, duration, deposit } = req.body;
    try {
        const tx = await contract.createRental(tokenId, duration, ethers.parseEther(deposit));
        await tx.wait();
        res.json({ message: "Rental created successfully", txHash: tx.hash });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Start Rental Endpoint
app.post("/api/start-rental", async (req, res) => {
    const { tokenId, deposit } = req.body;
    try {
        const tx = await contract.startRental(tokenId, { value: ethers.parseEther(deposit) });
        await tx.wait();
        res.json({ message: "Rental started successfully", txHash: tx.hash });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// End Rental Endpoint
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

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
