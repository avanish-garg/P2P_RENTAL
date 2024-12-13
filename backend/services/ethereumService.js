// services/ethereumService.js
import { ethers } from "ethers";
import dotenv from "dotenv";
dotenv.config();

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
        await tx.wait();
        return tx.hash;
    } catch (error) {
        throw new Error(`Error minting NFT: ${error.message}`);
    }
}

// Create rental
async function createRental(tokenId, duration, deposit) {
    try {
        const tx = await rentalNFT.createRental(tokenId, duration, deposit);
        await tx.wait();
        return tx.hash;
    } catch (error) {
        throw new Error(`Error creating rental: ${error.message}`);
    }
}

// Start rental (with deposit)
async function startRental(tokenId, deposit) {
    try {
        // Fix for ethers v6.x - use parseEther correctly
        const tx = await rentalNFT.startRental(tokenId, { value: ethers.parseUnits(deposit.toString(), 'ether') });
        await tx.wait();
        return tx.hash;
    } catch (error) {
        throw new Error(`Error starting rental: ${error.message}`);
    }
}

// End rental
async function endRental(tokenId) {
    try {
        const tx = await rentalNFT.endRental(tokenId);
        await tx.wait();
        return tx.hash;
    } catch (error) {
        throw new Error(`Error ending rental: ${error.message}`);
    }
}

export {
    mintNFT,
    createRental,
    startRental,
    endRental,
};
