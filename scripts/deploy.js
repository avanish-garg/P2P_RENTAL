const { ethers } = require("hardhat");

async function main() {
  // Get the contract factory
  const RentalNFTFactory = await ethers.getContractFactory("RentalNFT");

  console.log("Deploying contract...");
  
  // Deploy the contract
  const rentalNFT = await RentalNFTFactory.deploy();

  // Wait for the contract to be deployed
  await rentalNFT.waitForDeployment();  // This method will ensure that the contract is deployed

  console.log(`Contract deployed to: ${rentalNFT.target}`);  // Use 'target' instead of 'address' for ethers v6.
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
