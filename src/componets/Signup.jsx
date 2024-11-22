import React from 'react';

const Signup = () => {
  return (
    <div
      className="flex justify-center items-center min-h-screen"
      style={{
        backgroundImage: "url('./src/assets/loginback2.png')",
        backgroundSize: "cover",
        backgroundPosition: "center"
      }}
    >
      <div className="flex flex-col md:flex-row shadow-lg rounded-lg bg-white overflow-hidden max-w-4xl w-full m-4">
        {/* Left Section */}
        <div
          className="hidden md:block w-1/2"
          style={{
            backgroundImage: "url('./src/assets/loginfront3.jpeg')",
            backgroundSize: "cover",
            backgroundPosition: "center"
          }}
        ></div>
        
        {/* Right Section */}
        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-2xl font-semibold mb-4 text-center">Create an account</h2>
          <p className="text-sm text-center mb-6">
            Already have an account? <a href="/login" className="text-blue-500 hover:underline">Log in</a>
          </p>
          <form className="space-y-4">
            <div className="flex space-x-2">
              <input
                type="text"
                placeholder="First Name"
                className="w-1/2 p-3 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              />
              <input
                type="text"
                placeholder="Last Name"
                className="w-1/2 p-3 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              />
            </div>
            <input
              type="text"
              placeholder="Contact Number"
              className="w-full p-3 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            />
            <input
              type="text"
              placeholder="Country of Residence"
              className="w-full p-3 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            />
            <select
              className="w-full p-3 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            >
              <option value="" disabled selected>Choose Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600"
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
