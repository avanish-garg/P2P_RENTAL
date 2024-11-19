const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("RentalNFT", function () {
    let RentalNFT, rentalNFT, owner, addr1;

    beforeEach(async function () {
        [owner, addr1] = await ethers.getSigners();

        RentalNFT = await ethers.getContractFactory("RentalNFT");
        rentalNFT = await RentalNFT.deploy();
        await rentalNFT.waitForDeployment();

        // Mint an NFT for testing
        await rentalNFT.mintNFT(owner.address);
    });

    it("Should create a rental successfully", async function () {
        await rentalNFT.createRental(1, 3600, ethers.parseEther("0.1"));
        const rental = await rentalNFT.rentals(1);

        expect(rental.deposit).to.equal(ethers.parseEther("0.1"));
    });

    it("Should start a rental with the correct deposit", async function () {
        await rentalNFT.createRental(1, 3600, ethers.parseEther("0.1"));
        await rentalNFT.connect(addr1).startRental(1, { value: ethers.parseEther("0.1") });

        const rental = await rentalNFT.rentals(1);
        expect(rental.renter).to.equal(addr1.address);
    });

    it("Should not allow ending rental before time", async function () {
        await rentalNFT.createRental(1, 3600, ethers.parseEther("0.1"));
        await rentalNFT.connect(addr1).startRental(1, { value: ethers.parseEther("0.1") });

        await expect(rentalNFT.connect(addr1).endRental(1)).to.be.revertedWith("Rental period not over");
    });

    it("Should allow ending rental after time", async function () {
        await rentalNFT.createRental(1, 1, ethers.parseEther("0.1"));
        await rentalNFT.connect(addr1).startRental(1, { value: ethers.parseEther("0.1") });

        // Simulate time passing
        await ethers.provider.send("evm_increaseTime", [2]);
        await ethers.provider.send("evm_mine", []);

        await rentalNFT.connect(addr1).endRental(1);

        const rental = await rentalNFT.rentals(1);
        expect(rental.renter).to.equal(ethers.ZeroAddress); // Correct reference
    });
});
