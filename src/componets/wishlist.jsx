import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Wishlist() {
  const navigate = useNavigate();

  // This would typically come from your state management solution
  const wishlistItems = [
    {
      id: '1',
      name: 'Multipurpose Toolkit',
      price: 500,
      image: './src/assets/multitoolkit.jpg',
      owner: 'Anushka Shukla',
      available: true
    },
    {
      id: '2',
      name: 'Beautiful Jwellery set',
      price: 250,
      image: './src/assets/jwellset.jpg',
      owner: 'Anushka Shukla',
      available: true
    },
    {
      id: '3', 
      name: 'Red prom Gown',
      price: 750,
      image: './src/assets/gown.jpg',
      owner: 'Anushka Shukla',
      available: true
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      {/* Header */}
      <div className="p-6 bg-gray-800 shadow-md">
        <div className="max-w-5xl mx-auto flex items-center">
          <button
            onClick={() => navigate(-1)}
            className="mr-6 text-white hover:text-gray-300 p-2"
            aria-label="Go back"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-2xl font-bold text-white">Your Wishlist</h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto p-6 space-y-4">
        {wishlistItems.map((item) => (
          <div key={item.id} className="bg-white rounded-lg shadow-md p-4">
            <div className="flex items-center space-x-4">
              <img
                src={item.image}
                alt={item.name}
                className="w-48 h-32 object-cover rounded-lg"
              />
              <div className="flex-grow">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-xl font-bold">{item.name}</h2>
                    <p className="text-red-500 font-bold">Price: {item.price}/Day</p>
                  </div>
                  <p className="text-gray-600">owner: {item.owner}</p>
                </div>
                <div className="mt-4 flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <div className={`w-4 h-4 rounded ${item.available ? 'bg-blue-500' : 'bg-gray-300'}`} />
                    <span className="text-sm font-medium">
                      {item.available ? 'AVAILABLE' : 'UNAVAILABLE'}
                    </span>
                  </div>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                    View Requests
                  </button>
                  <button className="px-4 py-2 bg-pink-600 text-white rounded-md hover:bg-pink-700">
                    Add to cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

