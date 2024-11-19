const { ethers } = require("ethers");
require("dotenv").config();

const provider = new ethers.JsonRpcProvider(process.env.AMOY_RPC_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

const contractAbi = [
    /* Your RentalNFT ABI */
];
const contractAddress = "0x2965c122e1bB4b444e4048E1f4327Cf3FB699a86";

const rentalNFT = new ethers.Contract(contractAddress, contractAbi, wallet);

module.exports = { rentalNFT };
