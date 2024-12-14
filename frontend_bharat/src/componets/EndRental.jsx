import React, { useState } from 'react';
import axios from 'axios';

const EndRental = () => {
  const [rentalId, setRentalId] = useState('');
  const [walletAddress, setWalletAddress] = useState('');
  const [ending, setEnding] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const endRental = async () => {
    if (!rentalId || !walletAddress) {
      setErrorMessage('Please fill in all fields');
      return;
    }

    setEnding(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const response = await axios.post('http://localhost:5000/api/rentals/endRental', {
        rentalId,
        walletAddress,
      });
      setSuccessMessage('Rental ended successfully!');
    } catch (error) {
      setErrorMessage('Failed to end rental');
    } finally {
      setEnding(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 p-4 pt-20">
      <div className="w-full max-w-xl bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold">End Rental</h2>
        <div>
          <label className="block text-gray-700 font-medium mb-2">Rental ID</label>
          <input
            type="text"
            value={rentalId}
            onChange={(e) => setRentalId(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-2"
            placeholder="Enter the rental ID"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-2">Wallet Address</label>
          <input
            type="text"
            value={walletAddress}
            onChange={(e) => setWalletAddress(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-2"
            placeholder="Enter your wallet address"
          />
        </div>

        <div className="mt-4">
          <button
            onClick={endRental}
            className="w-full bg-blue-500 text-white py-2 rounded-lg"
            disabled={ending}
          >
            {ending ? 'Ending Rental...' : 'End Rental'}
          </button>
        </div>

        {successMessage && (
          <div className="mt-4 p-2 text-center text-green-700">
            <p>{successMessage}</p>
          </div>
        )}

        {errorMessage && (
          <div className="mt-4 p-2 text-center text-red-700">
            <p>{errorMessage}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EndRental;
