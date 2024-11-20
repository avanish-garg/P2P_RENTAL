async function getNonce() {
    const [deployer] = await ethers.getSigners();
    const nonce = await deployer.getTransactionCount();
    console.log("Current Nonce:", nonce);
}

getNonce();
