
# **Decentralized Peer-to-Peer Rental System for Everyday Items**

## **Project Description**

The **Decentralized Peer-to-Peer Rental System** is a Web3-based platform that allows users to rent out and borrow everyday items (e.g., tools, cameras, electronics) securely and transparently. The system leverages blockchain technology to ensure trust, transparency, and decentralized escrow management.

### **Key Features**
- **NFT-Based Ownership**: Each rental item is tokenized as an NFT, providing traceable and secure access during the rental period.
- **Smart Contracts for Rentals**: Handles rental agreements, payments, deposits, and escrow functionality.
- **IPFS Integration**: Decentralized storage of item metadata such as descriptions, images, and terms.
- **MERN Stack**: Combines React (frontend), Node.js + Express (backend), and MongoDB (database) for scalability and a user-friendly interface.

---

## **Tech Stack**
- **Frontend**: React.js
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (via MongoDB Atlas)
- **Blockchain**: Polygon Mumbai Testnet
- **Smart Contracts**: Solidity (ERC-721 standard for NFTs)
- **Storage**: IPFS (via NFT.Storage)

---

## **Setup Instructions**

### **1. Clone the Repository**
```bash
git clone https://github.com/avanish-garg/P2P_RENTAL.git
cd P2P_RENTAL
2. Install Dependencies
Install project dependencies for the blockchain environment:


npm install
3. Configure Environment Variables
Create a .env file in the root directory with the following:

plaintext
Copy code
MUMBAI_RPC_URL=https://rpc-mumbai.maticvigil.com
PRIVATE_KEY=your_wallet_private_key_here
POLYGONSCAN_API_KEY=your_polygonscan_api_key_here
4. Compile the Smart Contract
bash

npx hardhat compile
5. Deploy the Smart Contract
To deploy the smart contract to Polygon Mumbai Testnet:

bash

npx hardhat run scripts/deploy.js --network mumbai
Project Progress
Day 1-2
 Set up blockchain environment.
 Deployed minimal ERC-721 NFT contract to Polygon Mumbai Testnet.
 Verified contract on PolygonScan.
 Tested minting NFTs locally using Hardhat.
Next Steps
Day 3-4: Implement rental logic in smart contracts (escrow, deposit, rental terms).
Day 5: Integrate IPFS for metadata storage and test NFT minting with metadata.
Day 6: Set up backend and API endpoints using Node.js and Express.
Day 7-8: Build frontend components for item listing and rental interactions.
Day 9: Perform full-stack end-to-end testing.
Day 10: Deploy frontend, backend, and contracts to free hosting services.
How to Contribute
Contributions are welcome! Please follow these steps:

Fork the repository.
Create a feature branch (git checkout -b feature/your-feature-name).
Commit your changes (git commit -m "Add your message").
Push to the branch (git push origin feature/your-feature-name).
Open a pull request.
License
This project is licensed under the MIT License.

Contact
For questions or feedback, please contact Avanish Garg.

yaml


---

### **Steps to Add the README File**
1. Create the README file:
   ```bash
   touch README.md
Open the file with a text editor and paste the above content.

Save the file and commit it to your repository:

bash

git add README.md
git commit -m "Add project README file"
git push origin main
