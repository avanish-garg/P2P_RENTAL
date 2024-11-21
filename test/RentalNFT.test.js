import('chai-as-promised').then(() => {
    const { expect } = require("chai");
    const { ethers } = require("hardhat");
  
    describe("RentalNFT", function () {
      let rentalNFT;
      let owner;
      let renter;
      let otherUser;
  
      const tokenId = 1;
      const rentalDuration = 3600; // 1 hour
      const deposit = ethers.utils.parseEther("1"); // 1 ETH
  
      beforeEach(async function () {
        [owner, renter, otherUser] = await ethers.getSigners();
  
        // Deploy the contract
        const RentalNFT = await ethers.getContractFactory("RentalNFT");
        rentalNFT = await RentalNFT.deploy();
        await rentalNFT.deployed();
  
        // Mint an NFT for the owner
        await rentalNFT.mintNFT(owner.address);
      });
  
      it("Should mint an NFT to the owner", async function () {
        expect(await rentalNFT.ownerOf(tokenId)).to.equal(owner.address);
      });
  
      it("Should allow the owner to create a rental", async function () {
        await rentalNFT.createRental(tokenId, rentalDuration, deposit);
        const rental = await rentalNFT.rentals(tokenId);
  
        expect(rental.tokenId).to.equal(tokenId);
        expect(rental.startTime).to.be.gt(0);
        expect(rental.endTime).to.equal(rental.startTime + rentalDuration);
        expect(rental.deposit).to.equal(deposit);
      });
  
      it("Should prevent others from creating rentals", async function () {
        await expect(
          rentalNFT.connect(otherUser).createRental(tokenId, rentalDuration, deposit)
        ).to.be.revertedWith("Only owner can create rentals");
      });
  
      it("Should allow renters to start a rental", async function () {
        await rentalNFT.createRental(tokenId, rentalDuration, deposit);
  
        // Rent the NFT
        await expect(
          rentalNFT.connect(renter).startRental(tokenId, { value: deposit })
        ).to.not.be.reverted;
  
        const rental = await rentalNFT.rentals(tokenId);
        expect(rental.renter).to.equal(renter.address);
      });
  
      it("Should prevent starting rental with incorrect deposit", async function () {
        await rentalNFT.createRental(tokenId, rentalDuration, deposit);
  
        const incorrectDeposit = ethers.utils.parseEther("0.5"); // 0.5 ETH
        await expect(
          rentalNFT.connect(renter).startRental(tokenId, { value: incorrectDeposit })
        ).to.be.revertedWith("Incorrect deposit");
      });
  
      it("Should allow the renter to end the rental and receive the deposit back", async function () {
        await rentalNFT.createRental(tokenId, rentalDuration, deposit);
  
        // Start the rental
        await rentalNFT.connect(renter).startRental(tokenId, { value: deposit });
  
        // Fast forward time
        await ethers.provider.send("evm_increaseTime", [rentalDuration]);
        await ethers.provider.send("evm_mine", []);
  
        // End the rental
        await expect(() =>
          rentalNFT.connect(renter).endRental(tokenId)
        ).to.changeEtherBalance(renter, deposit);
  
        const rental = await rentalNFT.rentals(tokenId);
        expect(rental.renter).to.equal(ethers.constants.AddressZero); // Rental should end
      });
  
      it("Should prevent non-renters from ending a rental", async function () {
        await rentalNFT.createRental(tokenId, rentalDuration, deposit);
  
        // Start the rental
        await rentalNFT.connect(renter).startRental(tokenId, { value: deposit });
  
        // Try ending the rental by someone who is not the renter
        await expect(
          rentalNFT.connect(otherUser).endRental(tokenId)
        ).to.be.revertedWith("Not the renter");
      });
  
      it("Should prevent ending rental before the rental period ends", async function () {
        await rentalNFT.createRental(tokenId, rentalDuration, deposit);
  
        // Start the rental
        await rentalNFT.connect(renter).startRental(tokenId, { value: deposit });
  
        // Try ending the rental before time is up
        await expect(
          rentalNFT.connect(renter).endRental(tokenId)
        ).to.be.revertedWith("Rental period not over");
      });
  
      it("Should correctly track escrow balance", async function () {
        await rentalNFT.createRental(tokenId, rentalDuration, deposit);
  
        // Start the rental
        await rentalNFT.connect(renter).startRental(tokenId, { value: deposit });
  
        expect(await rentalNFT.escrow(renter.address)).to.equal(deposit);
  
        // End the rental and check escrow balance
        await rentalNFT.connect(renter).endRental(tokenId);
        expect(await rentalNFT.escrow(renter.address)).to.equal(0);
      });
  
      // New test case for edge case: Rental creation with invalid inputs
      it("Should revert when creating rental with 0 duration", async function () {
        await expect(
          rentalNFT.createRental(tokenId, 0, deposit) // Invalid duration
        ).to.be.revertedWith("Invalid rental duration");
      });
  
      it("Should revert when creating rental with 0 deposit", async function () {
        await expect(
          rentalNFT.createRental(tokenId, rentalDuration, 0) // Invalid deposit
        ).to.be.revertedWith("Invalid deposit amount");
      });
    });
  });
  