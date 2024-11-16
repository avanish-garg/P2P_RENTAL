require('dotenv').config();
const HDWalletProvider = require('@truffle/hdwallet-provider');

const { MNEMONIC, INFURA_PROJECT_ID } = process.env;

module.exports = {
  /**
   * Networks define how you connect to your Ethereum client.
   * The 'development' network is typically used for testing on a local Ethereum instance
   * like Ganache. We will also configure the Rinkeby testnet using Infura.
   */

  networks: {
    // Local development network (Ganache)
    development: {
      host: "127.0.0.1",     // Localhost
      port: 8545,            // Standard Ethereum port (Ganache)
      network_id: "*",       // Any network
      gas: 5000000,          // Set gas limit
      gasPrice: 20000000000  // Set gas price (20 Gwei)
    },

    // Rinkeby Test Network
    rinkeby: {
      provider: () => new HDWalletProvider(MNEMONIC, `https://rinkeby.infura.io/v3/${INFURA_PROJECT_ID}`),
      network_id: 4,        // Rinkeby network ID
      confirmations: 2,     // Wait for 2 confirmations before continuing
      timeoutBlocks: 200,   // Timeout after 200 blocks
      skipDryRun: true      // Skip dry run (default: false)
    },

    // Goerli Test Network
    goerli: {
      provider: () => new HDWalletProvider(MNEMONIC, `https://goerli.infura.io/v3/${INFURA_PROJECT_ID}`),
      network_id: 5,        // Goerli network ID
      confirmations: 2,     // Wait for 2 confirmations before continuing
      timeoutBlocks: 200,   // Timeout after 200 blocks
      skipDryRun: true      // Skip dry run (default: false)
    },

    // Mainnet (Optional, use for production deployment)
    mainnet: {
      provider: () => new HDWalletProvider(MNEMONIC, `https://mainnet.infura.io/v3/${INFURA_PROJECT_ID}`),
      network_id: 1,        // Mainnet network ID
      gas: 5500000,         // Gas limit for mainnet transactions
      gasPrice: 10000000000,// 10 Gwei
      confirmations: 2,     // Wait for 2 confirmations
      timeoutBlocks: 200,   // Timeout after 200 blocks
      skipDryRun: false     // Skip dry run for production deployments
    }
  },

  /**
   * Configure your compilers here. Set the version of Solidity.
   */
  compilers: {
    solc: {
      version: "0.8.21", // Specify the version of Solidity to use
      // Settings for optimization can be added here if necessary
      // optimizer: {
      //   enabled: true,
      //   runs: 200
      // }
    }
  },

  /**
   * Mocha options for testing. You can adjust the timeout and other options for testing.
   */
  mocha: {
    timeout: 100000 // Set a higher timeout for longer-running tests
  },

  /**
   * Truffle DB configuration (disabled by default, uncomment to enable)
   */
  // db: {
  //   enabled: false,   // Set to true to enable Truffle DB (not recommended for production use)
  //   host: "127.0.0.1",
  //   adapter: {
  //     name: "indexeddb",
  //     settings: {
  //       directory: ".db"
  //     }
  //   }
  // }
};
