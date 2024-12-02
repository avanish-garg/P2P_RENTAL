import React, { useState } from "react";
import { ethers } from "ethers";
import RentalNFT from "./RentalNFT.json";

const RentalForm = () => {
    const [form, setForm] = useState({ tokenId: "", duration: "", deposit: "" });

    const handleSubmit = async (e) => {
        e.preventDefault();

        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(
            process.env.REACT_APP_CONTRACT_ADDRESS,
            RentalNFT.abi,
            signer
        );

        try {
            const tx = await contract.createRental(
                form.tokenId,
                form.duration,
                ethers.parseEther(form.deposit)
            );
            await tx.wait();
            alert("Rental created successfully!");
        } catch (error) {
            alert("Error: " + error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Token ID"
                value={form.tokenId}
                onChange={(e) => setForm({ ...form, tokenId: e.target.value })}
            />
            <input
                type="text"
                placeholder="Duration"
                value={form.duration}
                onChange={(e) => setForm({ ...form, duration: e.target.value })}
            />
            <input
                type="text"
                placeholder="Deposit"
                value={form.deposit}
                onChange={(e) => setForm({ ...form, deposit: e.target.value })}
            />
            <button type="submit">Create Rental</button>
        </form>
    );
};

export default RentalForm;
