import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ListItem = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [specifications, setSpecifications] = useState('');
  const [walletConnected, setWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState(null);
  const [images, setImages] = useState([]);
  const [minting, setMinting] = useState(false); // Track minting progress
  const [transactionHash, setTransactionHash] = useState(null); // Store transaction hash
  const [mintingError, setMintingError] = useState(null); // Track minting errors

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', { title, description, price, specifications, images });
  };

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const address = window.ethereum.selectedAddress; // Get the connected wallet address
        setWalletAddress(address);
        setWalletConnected(true);
      } catch (error) {
        console.error('Failed to connect wallet:', error);
      }
    } else {
      alert('Please install MetaMask to use this feature');
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages((prevImages) => [...prevImages, ...files].slice(0, 5)); // Limit to 5 images
  };

  // Mint NFT function that triggers the backend API
  const mintNFT = async () => {
    if (!walletAddress) {
      alert('Please connect your wallet first!');
      return;
    }

    setMinting(true); // Start minting process
    setMintingError(null); // Reset any previous errors

    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      formData.append('price', price);
      formData.append('specifications', specifications);
      formData.append('walletAddress', walletAddress); // Include wallet address in form data
      images.forEach((image) => formData.append('images', image));

      // Send the wallet address and the form data to the backend for minting
      const response = await axios.post(
        'http://localhost:5000/api/rentals/mint', // Corrected API endpoint
        { to: walletAddress }, // Send the wallet address to backend
        {
          headers: {
            'Content-Type': 'application/json',
            'x-auth-token': localStorage.getItem('token'),
          },
        }
      );

      // Assuming the response contains a transaction hash
      const { transactionHash } = response.data;
      setTransactionHash(transactionHash);
      alert('NFT minted successfully!');
      console.log('Mint response:', response.data);
    } catch (error) {
      console.error('Minting failed:', error);
      setMintingError('Minting failed. Please try again.');
    } finally {
      setMinting(false); // End minting process
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 p-4 pt-20">
      <div className="w-full max-w-xl bg-white shadow-md rounded-lg p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Form Fields */}
          <div>
            <label className="block text-gray-900 font-medium mb-2">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter the title of the product (max: 150 ch)"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter the description of the product (max: 500 ch)"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">Rental price</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter the per night price of the product"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">Add Specifications</label>
            <input
              type="text"
              value={specifications}
              onChange={(e) => setSpecifications(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Add specifications of the product"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">Product images:</label>
            <input
              type="file"
              accept="image/png, image/jpeg, image/jpg"
              multiple
              onChange={handleImageChange}
              className="hidden"
              id="imageInput"
            />
            <label
              htmlFor="imageInput"
              className="w-full bg-blue-500 text-white py-1 px-3 rounded-lg hover:bg-blue-600 focus:outline-none text-center cursor-pointer"
            >
              ADD PRODUCT IMAGE
            </label>
            <p className="text-sm text-gray-500 mt-1">
              Accepted formats: .png, .jpeg, .jpg (you can add a maximum of 5 product images)
            </p>
            {images.length > 0 && (
              <ul className="mt-2 space-y-1 text-sm text-gray-600">
                {images.map((image, index) => (
                  <li key={index}>- {image.name}</li>
                ))}
              </ul>
            )}
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">Wallet connections:</label>
            <button
              type="button"
              onClick={connectWallet}
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none"
            >
              {walletConnected ? 'WALLET CONNECTED' : 'CONNECT WALLET'}
            </button>
            <p className="text-sm text-gray-500 mt-1">Accepted Wallet: MetaMask</p>
          </div>

          {/* Display the wallet address if connected */}
          {walletConnected && walletAddress && (
            <div className="mt-4 p-3 bg-green-100 text-green-800 rounded-lg">
              <strong>Wallet Address:</strong> {walletAddress}
            </div>
          )}

          {/* Mint NFT Button */}
          <div className="mt-4">
            <button
              type="button"
              onClick={mintNFT}
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none"
            >
              {minting ? 'Minting in Progress...' : 'Mint NFT'}
            </button>
          </div>
        </form>

        {/* Minting Status */}
        {minting && (
          <div className="mt-4 p-2 text-center text-gray-700">
            <p>Minting your NFT, please wait...</p>
          </div>
        )}

        {/* Transaction Hash */}
        {transactionHash && (
          <div className="mt-4 p-2 text-center text-green-700">
            <p>Minting successful! Transaction Hash:</p>
            <a
              href={`https://etherscan.io/tx/${transactionHash}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline"
            >
              View on Etherscan
            </a>
          </div>
        )}

        {/* Minting Error */}
        {mintingError && (
          <div className="mt-4 p-2 text-center text-red-700">
            <p>{mintingError}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ListItem;
