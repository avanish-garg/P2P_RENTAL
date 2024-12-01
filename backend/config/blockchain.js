require("dotenv").config();
const { ethers } = require("ethers");

// Set up Ethereum provider
const provider = new ethers.JsonRpcProvider(process.env.MUMBAI_RPC_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

// Contract ABI and address
const contractAddress = process.env.CONTRACT_ADDRESS;
const contractABI = require("../contracts/RentalNFT.json").abi;

// Blockchain contract instance
const rentalNFT = new ethers.Contract(contractAddress, contractABI, wallet);

module.exports = { rentalNFT };
