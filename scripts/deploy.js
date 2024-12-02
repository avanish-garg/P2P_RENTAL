const hre = require("hardhat");

async function main() {
    // Step 1: Get the Contract Factory
    console.log("Deploying RentalNFT contract...");
    const RentalNFT = await hre.ethers.getContractFactory("RentalNFT");

    // Step 2: Deploy the Contract
    const rentalNFT = await RentalNFT.deploy();

    // Step 3: Wait for the deployment to be completed
    await rentalNFT.waitForDeployment();

    // Step 4: Log the deployed contract address
    console.log("RentalNFT deployed to:", rentalNFT.target);
}

// Execute the deployment script and handle errors
main().catch((error) => {
    console.error("Error during deployment:", error);
    process.exitCode = 1;
});