// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract RentalNFT is ERC721, Ownable {
    uint256 private _tokenIdCounter;

    constructor() ERC721("RentalNFT", "RNT") Ownable(msg.sender) {}

    function mintNFT(address to) public onlyOwner {
        _tokenIdCounter++;
        _mint(to, _tokenIdCounter);
    }
}
