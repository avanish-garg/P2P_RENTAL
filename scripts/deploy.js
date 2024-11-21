async function main() {
    const [deployer] = await ethers.getSigners();

    console.log("Deploying contracts with the account:", deployer.address);

    // Get the current nonce from the provider (latest pending transaction count)
    const nonce = await deployer.getTransactionCount("latest");  // Get the latest nonce
    console.log("Current Nonce:", nonce);

    // Fetch the current gas price dynamically from the Polygon network
    const gasPrice = await ethers.provider.getGasPrice();
    console.log("Current Gas Price (Gwei):", ethers.utils.formatUnits(gasPrice, "gwei"));

    // Deploy contract with dynamic gas price and sufficient gas limit
    const Contract = await ethers.getContractFactory("RentalNFT");
    const contract = await Contract.deploy({
        nonce: nonce,               // Use the correct nonce
        gasLimit: 5000000,           // Set a reasonable gas limit (adjust if needed)
        gasPrice: gasPrice,          // Use the current gas price dynamically fetched
    });

    console.log("Contract deployed at:", contract.address);

    // Wait for the contract to be mined (optional)
    await contract.deployTransaction.wait();
    console.log("Contract successfully deployed and mined!");
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
