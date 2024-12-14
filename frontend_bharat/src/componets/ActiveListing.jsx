import React from "react";

const ActiveListing = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      {/* Header */}
      <div className="p-6 bg-gray-800 shadow-md">
        <div className="max-w-5xl mx-auto flex items-center">
          <button
            onClick={() => window.history.back()}
            className="mr-6 text-white hover:text-gray-300 p-2"
            aria-label="Go back"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <h1 className="text-2xl font-bold text-white">Your Dashboard</h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto p-6 space-y-6">
        {/* Listings */}
        {[{
          title: "Multipurpose Toolkit",
          price: 500,
          owner: "Anushka Shukla",
          image: "./src/assets/multitoolkit.jpg",
          available: true,
        }, {
          title: "Beautiful Jewellery set",
          price: 250,
          owner: "Anushka Shukla",
          image: "./src/assets/jwellset.jpg",
          available: false,
        }, {
          title: "Red prom Gown",
          price: 750,
          owner: "Anushka Shukla",
          image: "./src/assets/gown.jpg",
          available: true,
        }].map((item, index) => (
          <div key={index} className="flex items-center bg-white p-4 shadow rounded-lg">
            <img
              src={item.image}
              alt={item.title}
              className="h-24 w-24 object-cover rounded mr-4"
            />
            <div className="flex-grow">
              <h2 className="text-lg font-bold text-gray-800">{item.title}</h2>
              <p className="text-sm text-gray-500">Price: {item.price}/Day</p>
              <p className="text-sm text-gray-500">Owner: {item.owner}</p>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="h-5 w-5 text-blue-600"
                  checked={item.available}
                  readOnly
                />
                <span className="text-sm text-gray-700">AVAILABLE</span>
              </label>
              <div className="flex space-x-4">
                <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                    View Requests
                </button>
                <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
                    Cancel Rental
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActiveListing;
