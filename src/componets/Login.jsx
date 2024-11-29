import React from 'react';

const Login = () => {
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
        <div className="w-full md:w-1/2 p-8 pt-20">
          <h2 className="text-2xl font-semibold mb-4 text-center">Login</h2>
          <p className="text-sm text-center mb-6">Don&apos;t have an account? <a href="/signup" className="text-blue-500">Sign up</a>
          </p>
          <form>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 mb-2" htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter your password"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
            >
              Login
            </button>
          </form>
        </div>

        {/* Right Section */}
        <div
          className="hidden md:block w-1/2"
          style={{
            backgroundImage: "url('./src/assets/loginfront3.jpeg')",
            backgroundSize: "cover",
            backgroundPosition: "center"
          }}
        >
        </div>
      </div>
    </div>
  );
};

export default Login;
