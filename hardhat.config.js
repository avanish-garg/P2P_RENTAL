require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

module.exports = {
    solidity: "0.8.20",
    networks: {
        amoy: {
            url: process.env.AMOY_RPC_URL,  // Make sure this URL is correct
            accounts: [process.env.PRIVATE_KEY],  // Ensure this is your wallet's private key
        },
    },
    etherscan: {
        apiKey: process.env.POLYGONSCAN_API_KEY,  // Optional, used for contract verification on PolygonScan
    },
};
