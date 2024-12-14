import React from 'react';
import comingImage from '../assets/newcoming.jpeg'; // Import the image properly

const ComingSoon = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center">
        {/* Image Section */}
        <div className="flex justify-center items-center mb-6">
          <img
            src={comingImage}
            alt="A new feature is coming soon"
            className="max-w-full h-64 object-contain" // Restrict the height for responsiveness
          />
        </div>
        
        {/* Text Section */}
        <p className="mt-4 text-2xl text-gray-700 font-semibold">
          Get notified when it’s ready!
        </p>
        
        {/* Email Notification Form */}
        <div className="mt-6">
          <form className="flex">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-4 py-2 rounded-l-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              required
            />
            <button
              type="submit"
              className="bg-yellow-500 text-white px-6 py-2 rounded-r-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            >
              Notify Me
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ComingSoon;
