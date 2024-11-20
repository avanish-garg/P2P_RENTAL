async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);
  
    const RentalNFT = await ethers.getContractFactory("RentalNFT");
    const rentalNFT = await RentalNFT.deploy();
    console.log("RentalNFT contract deployed to:", rentalNFT.address);
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
  