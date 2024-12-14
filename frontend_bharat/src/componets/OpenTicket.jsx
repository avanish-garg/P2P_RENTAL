import React, { useState } from "react";

const OpenTicket = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simulate a form submission process
    alert("Ticket Submitted Successfully!");

    // Clear form data (optional, if needed before reload)
    setFormData({ name: "", email: "", message: "" });

    // Refresh the page
    window.location.reload();
  };

  return (
    <div className="bg-blue-50 min-h-screen pt-16 flex flex-col items-center">
      <header className="text-center py-8">
        <h1 className="text-3xl font-bold text-gray-800">Open a Support Ticket</h1>
        <p className="text-gray-600 mt-2">
          Fill out the form below, and our support team will get back to you soon.
        </p>
      </header>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-6 w-96 flex flex-col"
      >
        <label htmlFor="name" className="text-gray-700 font-medium">
          Name
        </label>
        <input
          type="text"
          name="name"
          id="name"
          value={formData.name}
          onChange={handleChange}
          className="border border-gray-300 rounded px-3 py-2 mt-1 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <label htmlFor="email" className="text-gray-700 font-medium">
          Email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          value={formData.email}
          onChange={handleChange}
          className="border border-gray-300 rounded px-3 py-2 mt-1 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <label htmlFor="message" className="text-gray-700 font-medium">
          Message
        </label>
        <textarea
          name="message"
          id="message"
          rows="4"
          value={formData.message}
          onChange={handleChange}
          className="border border-gray-300 rounded px-3 py-2 mt-1 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        ></textarea>

        <button
          type="submit"
          className="bg-blue-500 text-white px-6 py-2 rounded-md shadow hover:bg-blue-600 transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default OpenTicket;
