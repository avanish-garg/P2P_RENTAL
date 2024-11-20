require("@nomiclabs/hardhat-ethers");
require("dotenv").config();

const { PRIVATE_KEY, POLYGONSCAN_API_KEY } = process.env;

module.exports = {
  solidity: "0.8.20",
  networks: {
    mumbai: {
      url: "https://polygon-mumbai.g.alchemy.com/v2/your-alchemy-api-key", // Use your Alchemy API URL here
      accounts: [`0x${PRIVATE_KEY}`],
      chainId: 80001
    },
    polygon: {
      url: "https://polygon-rpc.com", // Use the Polygon mainnet RPC URL
      accounts: [`0x${PRIVATE_KEY}`],
      chainId: 137
    }
  },
  etherscan: {
    apiKey: POLYGONSCAN_API_KEY
  }
};
