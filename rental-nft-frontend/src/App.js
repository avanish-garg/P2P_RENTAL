import React, { useState } from "react";
import { ethers } from "ethers";
import { contractABI, contractAddress } from "./constants";

function App() {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState(null);

  // Connect Wallet
  const connectWallet = async () => {
    if (window.ethereum) {
      const web3Provider = new ethers.providers.Web3Provider(window.ethereum);
      const web3Signer = web3Provider.getSigner();
      const nftContract = new ethers.Contract(contractAddress, contractABI, web3Signer);

      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      setProvider(web3Provider);
      setSigner(web3Signer);
      setContract(nftContract);
      setAccount(accounts[0]);

      console.log("Wallet connected:", accounts[0]);
    } else {
      alert("Please install MetaMask!");
    }
  };

  // Mint NFT
  const mintNFT = async () => {
    if (!contract) return alert("Connect to the contract first!");
    const recipient = prompt("Enter recipient's address:");
    try {
      const tx = await contract.mintNFT(recipient);
      await tx.wait();
      alert(`NFT minted successfully to ${recipient}`);
    } catch (err) {
      console.error("Minting failed:", err);
    }
  };

  // Create Rental
  const createRental = async () => {
    if (!contract) return alert("Connect to the contract first!");
    const tokenId = prompt("Enter token ID:");
    const duration = prompt("Enter duration (in seconds):");
    const deposit = prompt("Enter deposit (in ETH):");
    try {
      const tx = await contract.createRental(
        tokenId,
        duration,
        ethers.utils.parseEther(deposit)
      );
      await tx.wait();
      alert("Rental created successfully!");
    } catch (err) {
      console.error("Rental creation failed:", err);
    }
  };

  // Start Rental
  const startRental = async () => {
    if (!contract) return alert("Connect to the contract first!");
    const tokenId = prompt("Enter token ID:");
    try {
      const rental = await contract.rentals(tokenId);
      const tx = await contract.startRental(tokenId, { value: rental.deposit });
      await tx.wait();
      alert("Rental started successfully!");
    } catch (err) {
      console.error("Starting rental failed:", err);
    }
  };

  // End Rental
  const endRental = async () => {
    if (!contract) return alert("Connect to the contract first!");
    const tokenId = prompt("Enter token ID:");
    try {
      const tx = await contract.endRental(tokenId);
      await tx.wait();
      alert("Rental ended successfully!");
    } catch (err) {
      console.error("Ending rental failed:", err);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Rental NFT Marketplace</h1>
      {!account && <button onClick={connectWallet}>Connect Wallet</button>}
      {account && <p>Connected Account: {account}</p>}
      <div>
        <button onClick={mintNFT}>Mint NFT</button>
        <button onClick={createRental}>Create Rental</button>
        <button onClick={startRental}>Start Rental</button>
        <button onClick={endRental}>End Rental</button>
      </div>
    </div>
  );
}

export default App;
