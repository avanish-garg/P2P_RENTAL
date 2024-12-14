import React from 'react'
import { useNavigate } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();
  return (
   <div className="bg-gray-900 text-white py-8 text-center">
      <div className="mb-6">
        <h2 className="text-3xl font-bold">Sign up today.</h2>
        <div className="flex justify-center space-x-4 mt-4">
          <button className="px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-500 transition">
            Learn More
          </button>
          <button
            className="px-6 py-3 bg-white text-black rounded-lg font-semibold hover:bg-gray-200 transition"
            onClick={() => navigate('/signup')}>
            Get Started
          </button>
        </div>
      </div>
      <p>&copy;Aptorent {new Date().getFullYear()} All rights reserved.</p>
    </div>
  )
}

export default Footer
