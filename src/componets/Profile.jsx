import React from 'react';
import { useNavigate } from "react-router-dom";
const Profile = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gray-50 pt-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col items-center mb-8">
          <div className="relative w-32 h-32 mb-4">
            <img
              src="./src/assets/profile.jpeg"
              alt="Profile picture"
              className="w-full h-full rounded-full border-4 border-white shadow-lg"
            />
          </div>
          <h1 className="text-2xl font-bold">ANUSHKA SHUKLA</h1>
          <p className="text-gray-500">Indore, India</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">BASIC INFO</h2>
          </div>

          <div className="space-y-6">
            <div className="flex justify-between items-center border-b pb-4">
              <div>
                <label className="text-sm text-gray-500">NAME</label>
                <p className="font-medium">ANUSHKA SHUKLA</p>
              </div>
              <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                EDIT
              </button>
            </div>

            <div className="flex justify-between items-center border-b pb-4">
              <div>
                <label className="text-sm text-gray-500">GENDER</label>
                <p className="font-medium">FEMALE</p>
              </div>
              <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                EDIT
              </button>
            </div>

            <div className="flex justify-between items-center border-b pb-4">
              <div>
                <label className="text-sm text-gray-500">LOCATION</label>
                <p className="font-medium">INDORE, INDIA</p>
              </div>
              <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                EDIT
              </button>
            </div>

            <div className="flex justify-between items-center border-b pb-4">
              <div>
                <label className="text-sm text-gray-500">BIRTHDAY</label>
                <p className="font-medium">NOV 17, 2004</p>
              </div>
              <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                EDIT
              </button>
            </div>

            <div className="flex justify-between items-center border-b pb-4">
              <div>
                <label className="text-sm text-gray-500">PROFESSION</label>
                <p className="font-medium">AGENCY OWNER</p>
              </div>
              <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                EDIT
              </button>
            </div>

            <div className="flex justify-between items-center">
              <div>
                <label className="text-sm text-gray-500">WEBSITE</label>
                <p className="font-medium">agency.anushka.com</p>
              </div>
              <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                EDIT
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <button
            onClick={() => navigate("/account")} // Navigate to Account page
            className="flex-1 text-sm bg-blue-500 text-white py-2 rounded font-medium"
          >
            ACCOUNT
          </button>
          <button className="bg-white p-4 rounded-lg shadow-md text-center hover:bg-gray-50">
            <h3 className="font-medium">DASHBOARD</h3>
          </button>
          <button className="bg-white p-4 rounded-lg shadow-md text-center hover:bg-gray-50">
            <h3 className="font-medium">WALLET</h3>
          </button>
          <button 
          onClick={() => navigate(-1)} 
          className="mt-6 flex items-center justify-center text-blue-500 text-lg hover:underline"
        >
          ← Back
        </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;

