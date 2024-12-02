import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function RentalHistory() {
  const navigate = useNavigate();

  const rentalHistory = [
    {
      id: '1',
      name: 'Christmax decor props',
      image: './src/assets/decorprop.jpg',
      rentedFor: '2 Nights',
      owner: 'Anushka Shukla'
    },
    {
      id: '2',
      name: 'Giant Flower Props - WhiteClouds',
      image: './src/assets/flowerprops.jpg',
      rentedFor: '7 Nights',
      owner: 'Jacob Smith'
    },
    {
      id: '3',
      name: 'Adult 5-Piece Drum Set with Remo Heads - Black',
      image: './src/assets/drumset.jpg',
      rentedFor: '2 Nights',
      owner: 'Bharat Doshi'
    }
  ];
   const handleLeaveReview = (itemId, itemName) => {
    navigate(`/review/${itemId}`, { state: { itemName } });
  };


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
          <h1 className="text-2xl font-bold text-white">RENTAL HISTORY</h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto p-6 space-y-4">
        {rentalHistory.map((item) => (
          <div key={item.id} className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex flex-col md:flex-row gap-6">
              <img
                src={item.image}
                alt={item.name}
                className="w-full md:w-48 h-32 object-cover rounded-lg"
              />
              <div className="flex-grow space-y-4">
                <div className="flex flex-col md:flex-row  md:justify-between">
                  <div>
                    <h2 className="text-xl font-semibold">{item.name}</h2>
                    <p className="text-red-500 mt-1">Rented for : {item.rentedFor}</p>
                  </div>
                  <p className="text-gray-600 mt-2 md:mt-0">owner: {item.owner}</p>
                </div>
                <div className="mt-4">
                  <button 
                    onClick={() => handleLeaveReview(item.id, item.name)}
                    className="w-full py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Leave a review
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

