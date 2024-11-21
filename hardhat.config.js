require('@nomiclabs/hardhat-ethers');
require('dotenv').config();

module.exports = {
  solidity: "0.8.20",
  networks: {
    polygon: {
      url: `https://rpc-amoy.polygon.technology/`,  // RPC URL for Polygon, or use your own RPC URL from Infura/Alchemy
      accounts: [process.env.PRIVATE_KEY],  // Use your wallet's private key securely from .env
      gas: 5000000,  // Set a reasonable gas limit for the transaction
      gasPrice: 5000000000,  // Set gas price to 20 Gwei (adjust as necessary)
      gasMultiplier: 1.1,  // Optional multiplier to help cover gas estimation inaccuracies
    }
  }
};
