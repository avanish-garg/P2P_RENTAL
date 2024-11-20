require('@nomiclabs/hardhat-ethers');
require('dotenv').config();

module.exports = {
  solidity: "0.8.20",
  networks: {
    polygon: {
      url: `https://rpc-amoy.polygon.technology/`, // or use your own RPC URL from Infura/Alchemy
      accounts: [process.env.PRIVATE_KEY]  // Use your wallet's private key
    }
  }
};
