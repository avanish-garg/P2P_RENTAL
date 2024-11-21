// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract RentalNFT is ERC721, Ownable, ReentrancyGuard {
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

    // Events to track important actions
    event RentalStarted(address indexed renter, uint256 indexed tokenId, uint256 startTime, uint256 endTime);
    event RentalEnded(address indexed renter, uint256 indexed tokenId, uint256 returnTime);
    event NFTMinted(address indexed to, uint256 tokenId);
    event NFTReturned(address indexed renter, uint256 indexed tokenId);

    constructor() ERC721("RentalNFT", "RNT") Ownable() {
        _tokenIdCounter = 0;
    }

    // Minting function to create a new NFT and assign it to a specific address
    function mintNFT(address to) public onlyOwner {
        _tokenIdCounter++;
        _mint(to, _tokenIdCounter);
        emit NFTMinted(to, _tokenIdCounter);
    }

    // Create a rental agreement for a token (to be rented out)
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

    // Rent a token by sending the required deposit
    function startRental(uint256 tokenId) public payable {
        require(rentals[tokenId].renter == address(0), "Token already rented");
        require(msg.value == rentals[tokenId].deposit, "Incorrect deposit");

        rentals[tokenId].renter = msg.sender;
        escrow[msg.sender] += msg.value; // Add deposit to escrow

        emit RentalStarted(msg.sender, tokenId, rentals[tokenId].startTime, rentals[tokenId].endTime);
    }

    // End the rental and refund the deposit to the renter
    function endRental(uint256 tokenId) public nonReentrant {
        Rental storage rental = rentals[tokenId];
        require(rental.renter == msg.sender, "Not the renter");
        require(block.timestamp >= rental.endTime, "Rental period not over");

        // Release deposit back to the renter
        uint256 deposit = rental.deposit;
        escrow[msg.sender] -= deposit;
        payable(msg.sender).transfer(deposit);

        // Mark the rental as ended
        rental.renter = address(0);

        emit RentalEnded(msg.sender, tokenId, block.timestamp);

        // Optionally, revoke the NFT ownership (burn it) after rental expires
        _burn(tokenId);
        emit NFTReturned(msg.sender, tokenId);
    }

    // Allow the contract owner to reclaim ownership of an NFT if needed (e.g., early return)
    function reclaimNFT(uint256 tokenId) public onlyOwner {
        Rental storage rental = rentals[tokenId];
        require(rental.renter != address(0), "Token not rented");

        // Refund the deposit to the renter
        uint256 deposit = rental.deposit;
        escrow[rental.renter] -= deposit;
        payable(rental.renter).transfer(deposit);

        // End the rental and burn the NFT
        rental.renter = address(0);
        _burn(tokenId);

        emit NFTReturned(rental.renter, tokenId);
    }

    // Optional: A function to extend the rental period before it expires
    function extendRental(uint256 tokenId, uint256 additionalDuration) public {
        Rental storage rental = rentals[tokenId];
        require(rental.renter == msg.sender, "Not the renter");

        rental.endTime += additionalDuration;
    }
}
