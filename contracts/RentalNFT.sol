// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract RentalNFT is ERC721, Ownable {
    struct Rental {
        address renter;
        uint256 tokenId;
        uint256 startTime;
        uint256 endTime;
        uint256 deposit;
    }

    mapping(uint256 => Rental) public rentals;
    mapping(address => uint256) public escrow;

    uint256 private _tokenIdCounter;

    // Update to pass the initialOwner address to Ownable constructor
    constructor() ERC721("RentalNFT", "RNT") Ownable(msg.sender) {
        _tokenIdCounter = 0;
    }

    function mintNFT(address to) public onlyOwner {
        _tokenIdCounter++;
        _mint(to, _tokenIdCounter);
    }

    function createRental(uint256 tokenId, uint256 duration, uint256 deposit) public {
        require(ownerOf(tokenId) == msg.sender, "Only owner can create rentals");
        require(rentals[tokenId].renter == address(0), "Token already rented");

        rentals[tokenId] = Rental({
            renter: address(0),
            tokenId: tokenId,
            startTime: block.timestamp,
            endTime: block.timestamp + duration,
            deposit: deposit
        });
    }

    function startRental(uint256 tokenId) public payable {
        require(rentals[tokenId].renter == address(0), "Already rented");
        require(msg.value == rentals[tokenId].deposit, "Incorrect deposit");

        rentals[tokenId].renter = msg.sender;
        escrow[msg.sender] += msg.value; // Add deposit to escrow
    }

    function endRental(uint256 tokenId) public {
        require(rentals[tokenId].renter == msg.sender, "Not the renter");
        require(block.timestamp >= rentals[tokenId].endTime, "Rental period not over");

        // Release deposit
        uint256 deposit = rentals[tokenId].deposit;
        escrow[msg.sender] -= deposit;
        payable(msg.sender).transfer(deposit);

        rentals[tokenId].renter = address(0);
    }
}
