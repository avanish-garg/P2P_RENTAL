// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract RentalMarketplace {
    address public owner;
    uint public rentalPrice;
    uint public depositAmount;

    mapping(address => bool) public renters;
    mapping(address => uint) public rentedItems;

    event ItemRented(address indexed renter, uint rentalPrice, uint deposit);
    event ItemReturned(address indexed renter);

    constructor() {
        owner = msg.sender;
        rentalPrice = 0.1 ether;  // Example rental price
        depositAmount = 0.2 ether; // Example deposit amount
    }

    // Function for renting an item
    function rentItem() external payable {
        require(msg.value == rentalPrice + depositAmount, "Incorrect payment amount");
        renters[msg.sender] = true;
        rentedItems[msg.sender] = block.timestamp;
        emit ItemRented(msg.sender, rentalPrice, depositAmount);
    }

    // Function to return rented item
    function returnItem() external {
        require(renters[msg.sender], "You haven't rented an item");
        uint rentalDuration = block.timestamp - rentedItems[msg.sender];
        renters[msg.sender] = false;
        rentedItems[msg.sender] = 0;
        payable(msg.sender).transfer(depositAmount); // Refund deposit
        emit ItemReturned(msg.sender);
    }

    // Function to withdraw funds (for the owner)
    function withdraw() external {
        require(msg.sender == owner, "Only the owner can withdraw");
        payable(owner).transfer(address(this).balance);
    }
}
