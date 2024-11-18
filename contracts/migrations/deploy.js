const hre = require("hardhat");

async function main() {
  const RentalNFT = await hre.ethers.getContractFactory("RentalNFT");
  const rentalNFT = await RentalNFT.deploy();

  await rentalNFT.deployed();

  console.log(`RentalNFT deployed to: ${rentalNFT.address}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Error during deployment:", error);
    process.exit(1);
  });
