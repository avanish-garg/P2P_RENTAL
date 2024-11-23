import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";


const ReviewsSection = () => {
  return (
    <div className="bg-gray-50 py-12">
      <h2 className="text-4xl font-bold text-center mb-6">What Our Users Say</h2>
      <div className="flex overflow-x-scroll space-x-4 px-4">
        {[1, 2, 3, 4].map((review, index) => (
          <div
            key={index}
            className="min-w-[300px] max-w-[300px] p-4 bg-white rounded-lg shadow-lg text-gray-800"
          >
            <p className="italic">
              This platform has completely changed how I rent and list items. It&apos;s amazing!
            </p>
            <h3 className="font-bold mt-2">- User {index + 1}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

// FAQ Section Component
const FAQSection = () => {
  return (
    <div className="bg-white py-12">
      <h2 className="text-4xl font-bold text-center mb-6">Frequently Asked Questions</h2>
      <div className="space-y-4 max-w-4xl mx-auto px-4">
        <div className="p-4 border rounded-lg">
          <h3 className="font-bold">Q: How do I list an item?</h3>
          <p>A: Simply click on &quot;List an Item&quot; and follow the on-screen instructions.</p>
        </div>
        <div className="p-4 border rounded-lg">
          <h3 className="font-bold">Q: How do I rent an item?</h3>
          <p>A: Browse available items, click &quot;Rent,&quot; and confirm your rental period.</p>
        </div>
      </div>
    </div>
  );
};


const Body = () => {
  const [walletAddress, setWalletAddress] = useState(null);
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentImageIndexNewSection, setCurrentImageIndexNewSection] = useState(0);


  const images = [
    "src/assets/Cycle.jpeg",
    "src/assets/Headset.png",
    "src/assets/Speaker.jpeg",
    "src/assets/Vehicle.jpeg",
    "src/assets/Vehicle2.jpeg",
    "src/assets/image1.jpeg"
  ];

  const newSectionImages = [
    "src/assets/image2.jpeg",
    "src/assets/Canon.jpg",
    "src/assets/camera2.jpg", // Add more images here
    "src/assets/gameswitch.jpeg",
    "src/assets/Ps5.jpeg",
    "src/assets/controller.jpeg",
  ];

  // Cycle through images for the Continuation Section
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Change every 3 seconds

    return () => clearInterval(interval); // Cleanup on component unmount
  }, [images.length]);

  // Cycle through images for the New Section
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndexNewSection(
        (prevIndex) => (prevIndex + 1) % newSectionImages.length
      );
    }, 3000); // Change every 3 seconds

    return () => clearInterval(interval);
  }, [newSectionImages.length]);


  // Function to connect to MetaMask
  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        setWalletAddress(accounts[0]); // Set the first account as the connected wallet
      } catch (error) {
        console.error("Wallet connection failed:", error);
      }
    } else {
      alert("MetaMask is not installed. Please install it to use this feature.");
    }
  };

  return (
    <div>
      {/* Main Section */}
      <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-[#0d1b2a] via-[#1e3a5f] to-[#4682b4] text-center text-white">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
          Share What You Own, Rent What You Need – Powered by Web3
        </h1>
        <div className="flex space-x-4 mt-6">
          <button className="px-6 py-3 bg-[#ffffff] text-black rounded-lg font-semibold hover:bg-[#0056b3] hover:text-[#ffffff] transition duration-200">
            List an Item
          </button>
          <button
            onClick={() => navigate("/rentitem")}
            className="bg-[#ffffff] text-black px-6 py-3 rounded-lg font-semibold hover:bg-[#0056b3] hover:text-[#ffffff]  transition duration-200"
          >
             Rent an Item
          </button>
          <button
            onClick={connectWallet}
            className="px-6 py-3 bg-[#ffffff] text-black rounded-lg font-semibold hover:bg-[#0056b3] hover:text-[#ffffff] transition duration-200"
          >
            {walletAddress ? `Connected: ${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}` : "Connect Wallet"}
          </button>
        </div>
      </div>

       {/* Continuation Section */}
      <div className="flex flex-col md:flex-row items-center py-12 justify-between bg-gray-100">
        {/* Left Side (Text) */}
        <div className="md:w-1/2 p-8">
          <h2 className="text-5xl font-bold text-left text-gray-800 mb-4">
            Got gear gathering dust? <br /> List it, let it earn for you!
          </h2>
          <p className="text-gray-600 text-2xl text-left font-semibold mb-6">
            Add breakpoints to your blank page,<br />then drop sections to have them <br /> responsive out of the box.
          </p>
          <div className="flex space-x-4">
            <button className="px-6 py-3 bg-[#000000] text-white rounded-lg font-bold hover:bg-[#0056b3] transition duration-200">
              Get Started
            </button>
            <button className="px-6 py-3 bg-[#bababa] text-[#000000] border  rounded-lg font-bold hover:bg-[#0056b3] hover:text-[#ffffff] transition duration-200">
              Learn More
            </button>
          </div>
        </div>

        {/* Right Side (Image) */}
        <div className="md:w-1/2 flex justify-center mb-6 md:mb-0">
          <img
            src={images[currentImageIndex]}
            alt={`Dynamic image ${currentImageIndex + 1}`}
            className="rounded-lg shadow-lg w-full max-w-sm md:max-w-md lg:max-w-lg"
          />
        </div>
      </div>
       {/* New Section */}
      <div className="flex flex-col md:flex-row items-center justify-between bg-white py-12">
        {/* Left Side (Image) */}
        <div className="md:w-1/2 flex justify-center mb-6 md:mb-0">
          <img
             src={newSectionImages[currentImageIndexNewSection]}
            alt={`New Section image ${currentImageIndexNewSection + 1}`}
            className="rounded-lg shadow-lg w-full max-w-sm md:max-w-md lg:max-w-lg"
          />
        </div>

        {/* Right Side (Text) */}
        <div className="md:w-1/2 p-8">
          <h2 className="text-5xl font-bold text-gray-800 mb-4">
             Looking for a quick solution? Rent what you need, when you need it.
          </h2>
          <p className="text-gray-600 text-2xl font-semibold mb-6">
           Double click the image placeholders to add images. Do the same for any text, then tweak styles and publish.
          </p>
          <div className="flex space-x-4">
            <button className="px-6 py-3 bg-[#000000] text-white rounded-lg font-bold hover:bg-[#0056b3] transition duration-200">
              Get Started
            </button>
            <button className="px-6 py-3 bg-[#bababa] text-[#000000] border rounded-lg font-bold hover:bg-[#0056b3] hover:text-[#ffffff] transition duration-200">
              Learn More
            </button>
          </div>
        </div>
      </div>
       {/* Insert Review Section */}
      <ReviewsSection />
      {/* Insert FAQ Section */}
      <FAQSection />
    </div>
  );
};

export default Body;
