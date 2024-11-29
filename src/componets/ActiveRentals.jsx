import React from 'react';

const ActiveRentals = () => {
  const rentals = [
    {
      image: './src/assets/Canon.jpg',
      title: 'Canon DSLR Camera',
      due: '2 days, 4 hrs',
      owner: 'Anushka Shukla',
    },
    {
      image: './src/assets/Cycle.jpeg',
      title: 'Tsunami NM100 Bike',
      due: '1 day, 4 hrs',
      owner: 'Banshika Choithani',
    },
    {
      image: './src/assets/piano.jpeg',
      title: 'Yamaha PSR Piano Keyboard',
      due: '5 days, 4 hrs',
      owner: 'Bharat Doshi',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="p-6 bg-gray-800 text-white">
        <h1 className="text-xl font-bold">Your Dashboard - Active Rentals</h1>
      </div>

      {/* Rental Items */}
      <div className="max-w-5xl mx-auto p-6">
        {rentals.map((item, index) => (
          <div
            key={index}
            className="flex items-center p-4 mb-6 bg-white shadow rounded-lg"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-24 h-24 object-cover rounded-md mr-4"
            />
            <div className="flex-1">
              <h2 className="text-lg font-bold">{item.title}</h2>
              <p className="text-red-600 font-semibold">
                Return Due: In {item.due}
              </p>
              <p className="text-gray-600">owner: {item.owner}</p>
            </div>
            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              PRE/POST-PONE THE RENTAL RETURN
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActiveRentals;
