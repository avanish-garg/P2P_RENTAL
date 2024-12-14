import React from "react";

// eslint-disable-next-line react/prop-types
const Chatbot = ({ onClose }) => {
  return (
    <div className="fixed bottom-4 right-4 bg-white shadow-lg rounded-lg w-80 h-96 flex flex-col">
      <div className="bg-blue-500 text-white px-4 py-2 rounded-t-lg flex justify-between items-center">
        <h2 className="text-lg font-bold">Live Chat</h2>
        <button
          className="text-white font-bold text-lg"
          onClick={onClose}
        >
          ×
        </button>
      </div>
      <div className="flex-1 p-4 overflow-y-auto">
        {/* Chat messages can go here */}
        <p className="text-gray-600">Welcome to our live chat! How can we help you?</p>
      </div>
      <div className="p-4">
        <input
          type="text"
          placeholder="Type a message..."
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>
  );
};

export default Chatbot;
