import React, { useState } from "react";
import { Link } from 'react-router-dom';

const Header = () => {
  const [openDropdown, setOpenDropdown] = useState(null);  // Track which dropdown is open

  const handleDropdownClick = (menu) => {
    if (openDropdown === menu) {
      setOpenDropdown(null);  // Close the dropdown if it's already open
    } else {
      setOpenDropdown(menu);  // Open the selected dropdown
    }
  };

  return (
    <header className="bg-white shadow fixed w-full top-0 z-10 h-16">
      <nav className="container mx-auto flex justify-between items-center h-full px-6">
        {/* Logo Section */}
        <div className="flex items-center space-x-2">
          <img src="./src/assets/logo2.png" alt="Logo" className="h-10 w-auto object-contain" />
        </div>

        {/* Navigation Links */}
        <ul className="flex space-x-6 text-sm font-medium text-gray-700">
          {/* Product Dropdown */}
          <li className="relative">
            <button
              className="flex items-center hover:text-blue-500"
              onClick={() => handleDropdownClick('product')}
              aria-expanded={openDropdown === 'product'}
            >
              Product <span className="ml-1">&#9662;</span>
            </button>
            {openDropdown === 'product' && (
              <ul className="absolute bg-white border mt-2 shadow rounded text-sm z-20">
                <li className="p-2 hover:bg-gray-100">Feature 1</li>
                <li className="p-2 hover:bg-gray-100">Feature 2</li>
              </ul>
            )}
          </li>

          {/* Resources Dropdown */}
          <li className="relative">
            <button
              className="flex items-center hover:text-blue-500"
              onClick={() => handleDropdownClick('resources')}
              aria-expanded={openDropdown === 'resources'}
            >
              Resources <span className="ml-1">&#9662;</span>
            </button>
            {openDropdown === 'resources' && (
              <ul className="absolute bg-white border mt-2 shadow rounded text-sm z-20">
                <li className="p-2 hover:bg-gray-100">
                  <Link to="/comingsoon">Docs</Link>
                </li>
                <li className="p-2 hover:bg-gray-100">
                  <Link to="/support">Support</Link>
                </li>
              </ul>
            )}
          </li>

          {/* Community Dropdown */}
          <li className="relative">
            <button
              className="flex items-center hover:text-blue-500"
              onClick={() => handleDropdownClick('community')}
              aria-expanded={openDropdown === 'community'}
            >
              Community <span className="ml-1">&#9662;</span>
            </button>
            {openDropdown === 'community' && (
              <ul className="absolute bg-white border mt-2 shadow rounded text-sm z-20">
                <li className="p-2 hover:bg-gray-100">Forum</li>
                <li className="p-2 hover:bg-gray-100">Events</li>
              </ul>
            )}
          </li>

          <li>
            <Link to="/Comingsoon" className="hover:text-blue-500">Changelog</Link>
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
