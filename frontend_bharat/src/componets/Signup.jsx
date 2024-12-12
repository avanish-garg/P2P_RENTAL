import React, { useState } from 'react';
import axios from 'axios';

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    contactNumber: '',
    email: '',
    password: '',
    gender: '',
    walletAddress: '',
    username: '', // Add username field here
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Client-side validation
    const { email, password, firstName, lastName, contactNumber, gender, walletAddress, username } = formData;
    if (!email || !password || !firstName || !lastName || !contactNumber || !gender || !walletAddress || !username) {
      return setError("All fields are required");
    }

    try {
      // Adjust the URL for your production or development API
      const response = await axios.post('http://localhost:5000/api/auth/signup', formData);

      setSuccess(true);
      setError(null);
      alert('Signup successful! Please log in.');
      window.location.href = '/login'; // Redirect to login page
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred during signup.');
    }
  };

  return (
    <div
      className="flex justify-center items-center min-h-screen"
      style={{
        backgroundImage: "url('./src/assets/loginback2.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="flex flex-col md:flex-row shadow-lg rounded-lg bg-white overflow-hidden max-w-4xl w-full m-4">
        <div
          className="hidden md:block w-1/2"
          style={{
            backgroundImage: "url('./src/assets/loginfront3.jpeg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>

        <div className="w-full md:w-1/2 p-8 pt-20">
          <h2 className="text-2xl font-semibold mb-4 text-center">Create an account</h2>
          <p className="text-sm text-center mb-6">
            Already have an account?
            <a href="/login" className="text-blue-500 hover:underline">Log in</a>
          </p>

          {error && <div className="text-red-500 mb-4">{error}</div>}
          {success && <div className="text-green-500 mb-4">Signup successful!</div>}

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="flex space-x-2">
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
                className="w-1/2 p-3 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                className="w-1/2 p-3 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              />
            </div>
            <input
              type="text"
              name="contactNumber"
              placeholder="Contact Number"
              value={formData.contactNumber}
              onChange={handleChange}
              className="w-full p-3 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            />
            <input
              type="password"
              name="password"
              placeholder="Enter the Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            />
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full p-3 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            >
              <option value="" disabled>Choose Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            <input
              type="text"
              name="walletAddress"
              placeholder="Enter the Wallet Address"
              value={formData.walletAddress}
              onChange={handleChange}
              className="w-full p-3 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            />
            <input
              type="text"
              name="username"
              placeholder="Enter a Username"
              value={formData.username}
              onChange={handleChange}
              className="w-full p-3 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            />
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
