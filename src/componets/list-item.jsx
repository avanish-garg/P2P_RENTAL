import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ListItem = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [specifications, setSpecifications] = useState('');
  const [walletConnected, setWalletConnected] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', { title, description, price, specifications });
  };

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        setWalletConnected(true);
      } catch (error) {
        console.error('Failed to connect wallet:', error);
      }
    } else {
      alert('Please install MetaMask to use this feature');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 p-4 pt-20">
      <div className="w-full max-w-xl bg-white shadow-md rounded-lg p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
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
            <button
              type="button"
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none"
            >
              ADD PRODUCT IMAGE
            </button>
            <p className="text-sm text-gray-500 mt-1">
              Accepted formats: .png, .jpeg, .jpg (you can add a maximum of 5 product images)
            </p>
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
            <p className="text-sm text-gray-500 mt-1">MetaMask: Accepted</p>
          </div>
          <button
            type="button"
            className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 focus:outline-none"
          >
            MINT NFT
          </button>
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 focus:outline-none"
          >
            CREATE RENTAL
          </button>
        </form>
        <button 
          onClick={() => navigate(-1)} 
          className="mt-6 flex items-center justify-center text-blue-500 text-lg hover:underline"
        >
          ← Back
        </button>
      </div>
    </div>
  );
};

export default ListItem;
