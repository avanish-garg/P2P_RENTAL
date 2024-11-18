const hre = require("hardhat");

async function main() {
    const RentalNFT = await hre.ethers.getContractFactory("RentalNFT");
    const rentalNFT = await RentalNFT.deploy();

    await rentalNFT.deployed();
    console.log("RentalNFT deployed to:", rentalNFT.address);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
