// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract RentalAgreement {
    address public owner;
    address public renter;
    uint public rentalPrice;
    uint public depositAmount;
    uint public rentalStartTime;
    uint public rentalEndTime;

    bool public isActive;
    bool public isDeposited;

    event RentalCreated(address indexed owner, address indexed renter, uint rentalPrice, uint depositAmount);
    event RentalTerminated(address indexed renter, bool returned);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can perform this action.");
        _;
    }

    modifier onlyRenter() {
        require(msg.sender == renter, "Only the renter can perform this action.");
        _;
    }

    modifier rentalActive() {
        require(isActive, "Rental agreement is not active.");
        _;
    }

    modifier rentalInactive() {
        require(!isActive, "Rental agreement is still active.");
        _;
    }

    constructor(uint _rentalPrice, uint _depositAmount) {
        owner = msg.sender;
        rentalPrice = _rentalPrice;
        depositAmount = _depositAmount;
        isActive = false;
    }

    function startRental(address _renter, uint _rentalDuration) external payable onlyOwner rentalInactive {
        require(msg.value == depositAmount, "Deposit not received.");
        
        renter = _renter;
        rentalStartTime = block.timestamp;
        rentalEndTime = rentalStartTime + _rentalDuration;
        isActive = true;
        isDeposited = true;

        emit RentalCreated(owner, renter, rentalPrice, depositAmount);
    }

    function terminateRental(bool _returned) external onlyRenter rentalActive {
        require(block.timestamp >= rentalEndTime, "Rental period has not ended yet.");
        
        isActive = false;

        if (_returned) {
            payable(renter).transfer(depositAmount); // Refund deposit
        }

        emit RentalTerminated(renter, _returned);
    }

    function payRental() external payable onlyRenter rentalActive {
        require(msg.value == rentalPrice, "Incorrect rental price.");
        payable(owner).transfer(rentalPrice);
    }
}
