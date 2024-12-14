import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Profile = () => {
  const navigate = useNavigate();
  const [fields, setFields] = useState({
    firstName: "",
    lastName: "",
    contactNumber: "",
    email: "",
    gender: "",
    walletAddress: "",
    username: "",
    profileImage: "./src/assets/profile.jpeg", // Default profile image
  });
  const [isEditing, setIsEditing] = useState({
    firstName: false,
    lastName: false,
    contactNumber: false,
    email: false,
    gender: false,
    walletAddress: false,
    username: false,
    profileImage: false,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch user data on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) {
          navigate("/login");
          return;
        }

        const response = await axios.get("http://localhost:5000/api/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Log the response to check the structure
        console.log("API Response Data: ", response.data);

        // Access data from the nested `user` object
        const userData = response.data.user;
        
        // Update the state using values from the `user` object
        setFields({
          firstName: userData.firstName || "",
          lastName: userData.lastName || "",
          contactNumber: userData.contactNumber || "",
          email: userData.email || "",
          gender: userData.gender || "",
          walletAddress: userData.walletAddress || "",
          username: userData.username || "",
          profileImage: userData.profileImage || "./src/assets/profile.jpeg", // Default profile image if not available
        });
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch user data.");
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  // Toggle edit mode for fields
  const toggleEdit = (field) => {
    setIsEditing((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  // Update field values
  const handleFieldChange = (field, value) => {
    setFields((prev) => ({ ...prev, [field]: value }));
  };

  // Update profile image
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      handleFieldChange("profileImage", imageUrl);
      toggleEdit("profileImage");
    }
  };

  // Display loading or error states
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div>Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div>{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20 px-4 flex flex-col items-center">
      <div className="max-w-2xl w-full bg-white p-8 rounded shadow">
        {/* Profile Image */}
        <div className="flex flex-col items-center mb-8">
          <div className="relative w-32 h-32 mb-4">
            {isEditing.profileImage ? (
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="block w-full text-sm text-gray-500 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
              />
            ) : (
              <img
                src={fields.profileImage}
                alt="Profile"
                className="w-full h-full rounded-full object-cover"
              />
            )}
          </div>
          <button
            onClick={() => toggleEdit("profileImage")}
            className="text-blue-500 hover:text-blue-700 text-sm"
          >
            {isEditing.profileImage ? "Save" : "Edit"}
          </button>
        </div>

        {/* Editable Fields */}
        <div className="space-y-6">
          {[
            { label: "First Name", field: "firstName", type: "text" },
            { label: "Last Name", field: "lastName", type: "text" },
            { label: "Contact Number", field: "contactNumber", type: "text" },
            { label: "Email", field: "email", type: "email" },
            { label: "Gender", field: "gender", type: "text" },
            { label: "Wallet Address", field: "walletAddress", type: "text" },
            { label: "Username", field: "username", type: "text" },
          ].map(({ label, field, type }) => (
            <div key={field} className="flex items-center justify-between">
              <div className="w-3/4">
                <label className="block text-sm font-medium text-gray-700">
                  {label} <span className="text-red-500">*</span>
                </label>
                {isEditing[field] ? (
                  <input
                    type={type}
                    value={fields[field]}
                    onChange={(e) => handleFieldChange(field, e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    required
                  />
                ) : (
                  <p className="mt-1 text-gray-900">{fields[field]}</p>
                )}
              </div>
              <button
                onClick={() => toggleEdit(field)}
                className="text-blue-500 hover:text-blue-700 text-sm"
              >
                {isEditing[field] ? "Save" : "Edit"}
              </button>
            </div>
          ))}
        </div>

        {/* Dashboard Button */}
        <div className="mt-8 flex justify-center">
          <button
            onClick={() => navigate("/")}
            className="px-4 py-2 bg-indigo-600 text-white rounded shadow hover:bg-indigo-700"
          >
            Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
