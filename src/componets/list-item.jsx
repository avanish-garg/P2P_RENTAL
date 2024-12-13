import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ListItem = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [specifications, setSpecifications] = useState('');
  const [walletConnected, setWalletConnected] = useState(false);
  const [images, setImages] = useState([]); // Array to store image files

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', { title, description, price, specifications, images });
  };

  const connectWallet = async () => {
    if (window.aptos) {
      try {
        const account = await window.aptos.connect();
        console.log('Connected to Petra wallet:', account);
        setWalletConnected(true);
      } catch (error) {
        console.error('Failed to connect to Petra wallet:', error);
      }
    } else {
      alert('Please install the Petra Aptos Wallet extension to use this feature');
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages((prevImages) => [...prevImages, ...files].slice(0, 5)); // Limit to 5 images
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
            <p className="text-sm text-gray-500 mt-1">Accepted Wallet: Petra Aptos Wallet</p>
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
