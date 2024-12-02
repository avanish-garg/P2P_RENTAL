import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

const RentItem = () => {
  const navigate = useNavigate();

  const mockItemData = [
    {
      id: 1,
      title: "Canon DSLR Camera",
      description: "A high-quality DSLR camera ideal for photography and videography. Comes with an 18-55mm lens, battery, and charger. Perfect for weddings, events, and travel.",
      price: "₹500 / night",
      owner: {
        name: "Anushka Shukla",
        rating: 5,
      },
      specifications: {
        brand: "Canon",
        model: "EOS 1500D",
        lens: "18-55mm",
        weight: "475g",
        battery: "Rechargeable (included)",
      },
      image: "/src/assets/Canon.jpg",
      category: "DSLR",
    },
    {
      id: 2,
      title: "Vintage Film Camera",
      description: "Capture timeless moments with this vintage film camera. Perfect for photography enthusiasts and collectors. Comes with a strap and a leather carry case.",
      price: "₹300 / night",
      owner: {
        name: "Ravi Patel",
        rating: 4,
      },
      specifications: {
        brand: "Nikon",
        model: "F3HP",
        lens: "50mm f/1.8",
        weight: "750g",
        battery: "Not required",
      },
      image: "/src/assets/vintagecamera.jpeg",
      category: "Film",
    },
    {
      id: 3,
      title: "GoPro Hero",
      description: "A compact and versatile action camera. Ideal for capturing your adventures, from extreme sports to underwater explorations. Comes with a waterproof case.",
      price: "₹400 / night",
      owner: {
        name: "Sneha Mehta",
        rating: 4.5,
      },
      specifications: {
        brand: "GoPro",
        model: "Hero 9 Black",
        lens: "Fixed Wide-Angle",
        weight: "158g",
        battery: "Rechargeable (included)",
      },
      image: "/src/assets/GoProHero.jpeg",
      category: "Action",
    },
  ];

  const [price, setPrice] = useState(10);
  const [likedItems, setLikedItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const handleHeartClick = (itemId) => {
    setLikedItems((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId]
    );
  };

  const handleViewDetails = (item) => {
    navigate('/details', { state: { itemData: item } });
  };

  // Filter items based on selected category
  const filteredItems =
    selectedCategory === "All"
      ? mockItemData
      : mockItemData.filter((item) => item.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-blue-800 p-4 text-white flex items-center justify-between">
        <h1 className="text-xl font-semibold">Rent An Item</h1>
        <div className="flex space-x-4">
          <button className="text-white">Profile</button>
          <button className="text-white">Wishlist</button>
          <button className="text-white">Cart</button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-4 shadow-md flex justify-center">
        <div className="relative w-1/2">
          <input
            type="text"
            placeholder="Search for items or categories.."
            className="w-full py-2 px-4 border rounded-full text-black focus:outline-none bg-[#EEF2FF] shadow-sm"
          />
          <button className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5 text-gray-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-4.35-4.35M16.65 11a5.65 5.65 0 11-11.3 0 5.65 5.65 0 0111.3 0z"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4 flex">
        {/* Filters Section */}
        <div className="w-1/4 bg-white p-4 shadow-md rounded-md">
          <h3 className="font-semibold mb-4">Filters</h3>
          {/* Categories Filter */}
          <div className="mb-4">
            <h4 className="font-medium">Categories</h4>
            {["All", "DSLR", "Film", "Action"].map((category) => (
              <label key={category} className="block">
                <input
                  type="radio"
                  name="category"
                  value={category}
                  checked={selectedCategory === category}
                  onChange={() => setSelectedCategory(category)}
                  className="mr-2"
                />
                {category}
              </label>
            ))}
          </div>
          <div className="mb-4">
            <h4 className="font-medium">Location</h4>
            <div className="flex space-x-2">
              <input
                type="text"
                placeholder="State"
                className="w-1/2 p-2 border rounded-md"
              />
              <input
                type="text"
                placeholder="City"
                className="w-1/2 p-2 border rounded-md"
              />
            </div>
          </div>
          <div className="mb-4">
            <h4 className="font-medium">Delivery Options</h4>
            <div className="space-y-2">
              <label className="block">
                <input type="checkbox" /> Home Delivery
              </label>
              <label className="block">
                <input type="checkbox" /> Self-Pickup
              </label>
            </div>
          </div>
          <div className="mb-4">
            <label>Price Range</label>
            <div className="flex items-center space-x-2">
              <span>{price}₹</span>
              <input
                type="range"
                min="10"
                max="5000"
                step="10"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="ml-2"
              />
            </div>
          </div>
          <div>
            <h4 className="font-medium">Availability Options</h4>
            <div className="space-y-2">
              <label className="block">
                <input type="checkbox" /> Available
              </label>
              <label className="block">
                <input type="checkbox" /> Not Available
              </label>
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="w-3/4 ml-4">
          <h3 className="font-semibold mb-4">Results</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="bg-white shadow-md rounded-md p-4 relative flex flex-col"
              >
                <div className="relative pb-[56.25%] mb-4">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="absolute top-0 left-0 w-full h-full object-cover rounded-md"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <h4 className="font-bold truncate">{item.title}</h4>
                  <button
                    onClick={() => handleHeartClick(item.id)}
                    className="focus:outline-none"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill={likedItems.includes(item.id) ? "red" : "none"}
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.172 5.172a4.003 4.003 0 015.656 0L12 8.344l3.172-3.172a4.003 4.003 0 015.656 0 4.003 4.003 0 010 5.656L12 18.828l-8.828-8.828a4.003 4.003 0 010-5.656z"
                      />
                    </svg>
                  </button>
                </div>
                <p className="text-sm font-bold">{item.price}</p>
                <p className="text-xs text-gray-500">Rental Price</p>
                <div className="flex items-center justify-between mt-2">
                  <p className="text-green-500 font-semibold">AVAILABLE!</p>
                  <button
                    onClick={() => handleViewDetails(item)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RentItem;

