async function main() {
    const [deployer] = await ethers.getSigners();

    console.log("Deploying contracts with the account:", deployer.address);

    const nonce = await deployer.getTransactionCount();
    console.log("Current Nonce:", nonce);  // Print current nonce

    // Define the gas price (you can set your gas price higher)
    const gasPrice = ethers.utils.parseUnits('25', 'gwei');  // 25 gwei is often a safe starting point

    // Deploy contract
    const Contract = await ethers.getContractFactory("RentalNFT");
    const contract = await Contract.deploy({ 
        nonce: nonce,  // Set the correct nonce here
        gasLimit: 5000000,  // Set a high enough gas limit
        gasPrice: gasPrice,  // Set a higher gas price
    });

    console.log("Contract deployed at:", contract.address);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});


  