import React from "react";
import { Link } from 'react-router-dom';
const Header = () => {
  return (
    <header className="bg-white shadow fixed w-full top-0 z-10">
      <nav className="container mx-auto flex justify-between items-center py-4 px-6">
        {/* Logo Section */}
        <div className="font-bold text-lg text-black">Logo</div>
        
        {/* Navigation Links */}
        <ul className="flex space-x-6 text-sm font-medium text-gray-700">
          <li className="group relative">
            <button className="hover:text-blue-500 flex items-center">
              Product <span className="ml-1">&#9662;</span>
            </button>
            {/* Dropdown */}
            <ul className="absolute hidden group-hover:block bg-white border mt-2 shadow rounded text-sm">
              <li className="p-2 hover:bg-gray-100">Feature 1</li>
              <li className="p-2 hover:bg-gray-100">Feature 2</li>
            </ul>
          </li>
          <li className="group relative">
            <button className="hover:text-blue-500 flex items-center">
              Resources <span className="ml-1">&#9662;</span>
            </button>
            {/* Dropdown */}
            <ul className="absolute hidden group-hover:block bg-white border mt-2 shadow rounded text-sm">
              <li className="p-2 hover:bg-gray-100">Docs</li>
              <li className="p-2 hover:bg-gray-100">Support</li>
            </ul>
          </li>
          <li className="group relative">
            <button className="hover:text-blue-500 flex items-center">
              Community <span className="ml-1">&#9662;</span>
            </button>
            {/* Dropdown */}
            <ul className="absolute hidden group-hover:block bg-white border mt-2 shadow rounded text-sm">
              <li className="p-2 hover:bg-gray-100">Forum</li>
              <li className="p-2 hover:bg-gray-100">Events</li>
            </ul>
          </li>
          <li>
            <button className="hover:text-blue-500">Changelog</button>
          </li>
         <li>
            <Link to="/profile" className="hover:text-blue-500">Profile</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;

