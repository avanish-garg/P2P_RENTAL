import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const DetailPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { itemData } = location.state || {};  // Assumes itemData contains the item details

  if (!itemData) {
    return (
      <div className="text-center py-20 text-gray-600">
        <p>Item not found.</p>
        <button
          onClick={() => navigate('/rentitem')}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Back to Rent Items
        </button>
      </div>
    );
  }

  // Assign a rental ID by default (e.g., 1)
  const rentalId = itemData.id || Math.floor(Math.random() * 1000); // You can replace this with an actual id from your data

  const { title, description, price, owner, specifications, image } = itemData;

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <div className="bg-white shadow-lg rounded-lg max-w-3xl w-full p-6">
        <div className="w-full flex justify-center mb-6">
          <img
            src={image}
            alt={title}
            className="rounded-md shadow-md w-full max-w-md h-64 object-cover"
          />
        </div>

        <div className="text-center mb-4">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">{title}</h1>
          <p className="text-gray-600">{description}</p>
        </div>

        {/* Rental ID Display */}
        <div className="flex justify-between items-center bg-yellow-100 p-4 rounded-lg shadow-inner mb-4">
          <h2 className="text-lg font-semibold text-yellow-900">Rental ID:</h2>
          <p className="text-xl font-bold text-yellow-800">{rentalId}</p>
        </div>

        <div className="flex justify-between items-center bg-blue-100 p-4 rounded-lg shadow-inner mb-4">
          <h2 className="text-lg font-semibold text-blue-900">Price:</h2>
          <p className="text-xl font-bold text-blue-800">{price}</p>
        </div>

        <div className="mb-4">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">Owner Information</h2>
          <div className="bg-gray-50 p-4 rounded-lg shadow-inner">
            <p className="text-gray-700">
              <strong>Name:</strong> {owner.name}
            </p>
            <p className="text-yellow-500">
              <strong>Rating:</strong> {Array(Math.round(owner.rating)).fill("⭐").join("")}
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-gray-700 mb-2">Specifications:</h2>
          <ul className="bg-gray-50 p-4 rounded-lg shadow-inner">
            {Object.entries(specifications).map(([key, value]) => (
              <li key={key} className="text-gray-700 mb-1">
                <strong className="capitalize">{key}:</strong> {value}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-6 flex justify-center gap-4">
          <button 
            onClick={() => navigate('/start-rental', { state: { itemData, rentalId } })} // Pass rentalId to the StartRental page
            className="bg-blue-600 text-white py-2 px-4 rounded-lg shadow hover:bg-blue-700 transition-colors"
            aria-label="Rent this item now"
          >
            Rent Now
          </button>
          <button 
            className="bg-gray-200 text-gray-800 py-2 px-4 rounded-lg shadow hover:bg-gray-300 transition-colors"
            aria-label="Add this item to your wishlist"
          >
            Add to Wishlist
          </button>
          <button
            onClick={() => navigate('/rentitem')}
            className="bg-gray-200 text-gray-800 py-2 px-4 rounded-lg shadow hover:bg-gray-300 transition-colors"
            aria-label="Go back to rent items page"
          >
            Back to Rent Items
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
