const { ethers } = require("ethers");

async function main() {
    // Use the JsonRpcProvider from ethers.js
    const provider = new ethers.providers.JsonRpcProvider(process.env.AMOY_RPC_URL);

    // Create a wallet instance using the private key and provider
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

    // Get and log the wallet balance
    const balance = await provider.getBalance(wallet.address);
    console.log(`Wallet balance: ${ethers.utils.formatEther(balance)} MATIC`);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error("Error:", error);
        process.exit(1);
    });
