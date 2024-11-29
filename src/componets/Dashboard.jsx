import React from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

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
          <h1 className="text-2xl font-bold text-white">Your Dashboard</h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto p-6 md:flex md:space-x-8">
        {/* Sidebar */}
        <div className="mb-8 md:mb-0 md:w-72">
          <div className="space-y-3">
            {['ACTIVE RENTALS', 'RENTAL HISTORY', 'ACTIVE LISTINGS', 'WISHLIST', 'CONNECT WALLET'].map((item, index) => (
              <button
                key={index}
                className="w-full text-left px-5 py-3 bg-blue-100 text-blue-800 rounded-lg hover:bg-blue-200 transition duration-200 font-medium"
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {/* Main Area */}
        <div className="flex-grow flex justify-center items-center min-h-[200px]">
          <button
            onClick={() => navigate('/active-rentals')}
            className="px-10 py-4 bg-white text-black rounded-full text-xl hover:bg-[#0056b3] hover:text-[#ffffff] transition duration-200 shadow-lg"
          >
            Explore
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;