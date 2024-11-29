import React from "react";
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const navigate = useNavigate();
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4 pt-20">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
        {/* Profile Header */}
        <div className="text-center">
          <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden border-2 border-blue-500">
            <img
              src="./src/assets/profile.jpeg" // Replace with user's image URL
              alt="User"
              className="w-full h-full object-cover"
            />
          </div>
          <h1 className="text-xl font-bold">ANUSHKA SHUKLA</h1>
          <p className="text-sm text-gray-500">Indore, India</p>
        </div>

        {/* Navigation Menu */}
        <div className="mt-6 flex space-x-2">
          <button className="flex-1 text-sm bg-gray-200 py-2 rounded font-medium text-gray-500">
            BASIC INFO
          </button>
          <button className="flex-1 text-sm bg-blue-500 text-white py-2 rounded font-medium">
            ACCOUNT
          </button>
          <button className="flex-1 text-sm bg-gray-200 py-2 rounded font-medium text-gray-500">
            DASHBOARD
          </button>
          <button className="flex-1 text-sm bg-gray-200 py-2 rounded font-medium text-gray-500">
            WALLET
          </button>
        </div>

        {/* Account Information */}
        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-4">Account Information</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">ID</span>
              <span className="font-medium">anushka12121</span>
              <button className="text-blue-500 text-sm">EDIT</button>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">EMAIL</span>
              <span className="font-medium">anushka.shukla@gmail.com</span>
              <button className="text-blue-500 text-sm">EDIT</button>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">PHONE</span>
              <span className="font-medium">9992929292</span>
              <button className="text-blue-500 text-sm">EDIT</button>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">PASSWORD</span>
              <button className="text-blue-500 text-sm">Change Password</button>
              <button className="text-blue-500 text-sm">EDIT</button>
            </div>
          </div>
        </div>

        {/* Delete Account Button */}
        <div className="mt-6">
          <button className="w-full bg-red-500 text-white py-2 rounded font-medium">
            DELETE ACCOUNT
          </button>
        </div>
        <button 
          onClick={() => navigate(-1)} 
          className="mt-6 flex items-center justify-center text-blue-500 text-lg hover:underline"
        >
          ← Back
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
