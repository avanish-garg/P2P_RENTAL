

# P2P Rental - Decentralized Rental System

## Overview

The **P2P Rental** platform is a **decentralized, blockchain-powered** solution that enables individuals to rent out valuable, underutilized items securely and transparently. Utilizing **smart contracts** and **NFTs**, this platform ensures trust between renters and owners, eliminating the need for intermediaries and providing a secure, seamless rental experience.

## Features

- **Decentralized Rentals**: Rent items directly from other users without any intermediaries.
- **Blockchain & Smart Contracts**: Ensures transparent transactions and automatic handling of deposits and rental terms.
- **NFT-based Ownership**: Each rental item is represented as an NFT, ensuring secure and traceable temporary ownership.
- **Secure Payments**: Payments are handled via smart contracts with escrow functionality to ensure both parties' security.
- **User Rating & History**: Ratings and rental history allow users to build trust within the platform.

## Problem Statement

Many valuable items, such as cameras, tools, and sports equipment, are underused and could be rented out to others for short periods. However, traditional rental systems often lack transparency, are cumbersome to use, and involve high fees. Moreover, ensuring the safety and fair payment for such rentals can be difficult.

## Solution

This platform offers a **secure, decentralized, peer-to-peer rental system** where:
- **Users can list items for rent** (such as tools, cameras, electronics, etc.).
- **Renters can browse available items**, agree to rental terms, and make payments securely using **smart contracts**.
- **NFTs** represent temporary ownership, making transactions transparent and traceable.
- **Deposits are handled** via the blockchain to ensure the safety of both parties.

## Tech Stack

- **Frontend**: React.js for the user interface, making it easy to browse, list, and manage rentals.
- **Backend**: Node.js, Express.js for handling API requests, and MongoDB for storing user profiles and rental data.
- **Blockchain**: Ethereum (or Aptos for scalability), leveraging **smart contracts** for managing rental agreements and payments.
- **NFTs**: Smart contracts mint NFTs to represent the ownership of rental items.
- **Storage**: IPFS for decentralized file storage (item descriptions and images).

## How It Works

### **User Journey**

1. **Sign Up**: Create an account and connect your wallet (e.g., MetaMask).
2. **List an Item**: Owners can list items for rent by providing a description, images, and rental terms.
3. **Browse Rentals**: Renters can browse available items, select one, and request a rental agreement.
4. **Secure Payment**: Payment and deposit are handled through the smart contract, ensuring transparency and fairness.
5. **NFT Ownership**: Renters receive an NFT representing ownership of the rented item for the duration of the rental.
6. **Return Item**: At the end of the rental period, the renter returns the item, and the security deposit is refunded via the smart contract.

### **Smart Contracts**

- **Rental Agreements**: Automatically execute agreements, set rental terms, and handle deposits.
- **Escrow**: Funds are held in escrow until the rental agreement is completed.
- **NFT Ownership**: Minting NFTs for temporary ownership, ensuring that renters have valid access to the item during the rental period.

## Installation

To set up the project locally, follow these steps:

### **Prerequisites**

- **Node.js** (v14 or later)
- **MongoDB** (or use a hosted solution)
- **Ethereum Wallet** (e.g., MetaMask) for blockchain integration
- **Truffle or Hardhat** (for Ethereum smart contract deployment)

### **Steps to Run Locally**

1. Clone the repository:
   ```bash
   git clone https://github.com/avanish-garg/P2P_RENTAL.git
   cd P2P_RENTAL
   ```

2. Install backend dependencies:
   ```bash
   cd backend
   npm install
   ```

3. Set up environment variables:
   - Create a `.env` file in the `backend` directory and add the following:
     ```
     MONGODB_URI=your-mongodb-uri
     PRIVATE_KEY=your-wallet-private-key
     AMOY_RPC_URL=your-ethereum-rpc-url
     CONTRACT_ADDRESS=your-smart-contract-address
     ```

4. Start the backend server:
   ```bash
   npm start
   ```

5. Install frontend dependencies:
   ```bash
   cd ../frontend
   npm install
   ```

6. Start the frontend server:
   ```bash
   npm start
   ```

### **Deploying to Production**

- The backend and frontend can be deployed on services like **Heroku** or **AWS** for the server and **IPFS** for decentralized storage.
- Use **Truffle** or **Hardhat** to deploy your smart contracts to a testnet or mainnet.

## Contributing

We welcome contributions to improve the platform! If you would like to contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-name`).
3. Commit your changes (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature-name`).
5. Create a new pull request.

---

### **Future Enhancements**

- **Scalability**: Integrate other blockchain networks like **Polygon** for faster and cheaper transactions.
- **Mobile App**: Develop a mobile app for easier access to the platform.
- **Advanced Smart Contract Features**: Add features like rental extensions, damage penalties, and multi-item rentals.

---

### **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

