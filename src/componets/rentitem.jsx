import React, { useState } from 'react';

const RentItem = () => {
  const [price, setPrice] = useState(10);
  const [likedItems, setLikedItems] = useState([]);
  const handleHeartClick = (itemIndex) => {
    setLikedItems((prev) =>
      prev.includes(itemIndex)
        ? prev.filter((index) => index !== itemIndex)
        : [...prev, itemIndex]
    );
  };
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-blue-800 p-4 text-white flex items-center justify-between">
        <h1 className="text-xl font-semibold">Rent An Item</h1>
        <div className="flex space-x-4">
          <button className="text-white">Profile</button>
          <button className="text-white">Wishlist</button>
          <button className="text-white">Cart</button>
        </div>
      </div>

      {/* Search Bar */}

      <div className="bg-white p-4 shadow-md flex justify-center">
        <div className="relative w-1/2">
          <input
            type="text"
            placeholder="Search for items or categories.."
            className="w-full py-2 px-4 border rounded-full text-black focus:outline-none bg-[#EEF2FF] shadow-sm"
          />
          <button className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5 text-gray-500"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M16.65 11a5.65 5.65 0 11-11.3 0 5.65 5.65 0 0111.3 0z" />
            </svg>
          </button>
        </div>
      </div>


      <div className="p-4 flex">
        {/* Filters Section */}
        <div className="w-1/4 bg-white p-4 shadow-md rounded-md">
          <h3 className="font-semibold mb-4">Filters</h3>
          <div className="mb-4">
            <h4 className="font-medium">Categories</h4>
            <div className="space-y-2">
              <label className="block"><input type="checkbox" /> DSLR</label>
              <label className="block"><input type="checkbox" /> Film</label>
            </div>
          </div>
          <div className="mb-4">
            <h4 className="font-medium">Location</h4>
            <div className="flex space-x-2">
              <input
                type="text"
                placeholder="State"
                className="w-1/2 p-2 border rounded-md"
              />
              <input
                type="text"
                placeholder="City"
                className="w-1/2 p-2 border rounded-md"
              />
            </div>
          </div>
          <div className="mb-4">
            <h4 className="font-medium">Delivery Options</h4>
            <div className="space-y-2">
              <label className="block"><input type="checkbox" /> Home Delivery</label>
              <label className="block"><input type="checkbox" /> Self-Pickup</label>
            </div>
          </div>
          <div>
            <label>Price Range</label>
            <div className="flex items-center space-x-2">
              <span>{price}₹</span>
              <input
                type="range"
                min="10"
                max="5000"
                step="10"
                value={price}
                onChange={(e) => setPrice(e.target.value)} // Update price on change
                className="ml-2"
              />
            </div>
          </div>
          <div>
            <h4 className="font-medium">Availability Options</h4>
            <div className="space-y-2">
              <label className="block"><input type="checkbox" /> Available</label>
              <label className="block"><input type="checkbox" /> Not Available</label>
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="w-3/4 ml-4">
          <h3 className="font-semibold mb-4">Results</h3>
          <div className="grid grid-cols-3 gap-4">
            {/* Example Item */}
            {Array.from({ length: 9 }).map((_, i) => (
              <div
                key={i}
                className="bg-white shadow-md rounded-md p-4 relative"
              >
                <img
                  src="./src/assets/Canon.jpg"
                  alt="Item"
                  className="rounded-md mb-4"
                />
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <h4 className="font-bold mr-2">Canon DSLR Camera</h4>
                    {/* Heart Icon */}
                    <button
                      onClick={() => handleHeartClick(i)}
                      className="focus:outline-none"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill={likedItems.includes(i) ? "red" : "none"}
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="w-6 h-10"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3.172 5.172a4.003 4.003 0 015.656 0L12 8.344l3.172-3.172a4.003 4.003 0 015.656 0 4.003 4.003 0 010 5.656L12 18.828l-8.828-8.828a4.003 4.003 0 010-5.656z"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
                <p className="text-sm font-bold">₹500/day</p>
                <p className="text-sm text-gray-500">Rental Price</p>
                <div className="flex items-center justify-between mt-2">
                  <p className="text-green-500 font-semibold">AVAILABLE!</p>
                  <button className="bg-blue-500 text-white text-sm px-4 py-2 rounded-md shadow-md hover:bg-blue-600">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RentItem;
