import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();

  // State for editable fields
  const [fields, setFields] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "123-456-7890",
    address: "123 Main Street, Springfield",
    dob: "1990-01-01",
    profileImage: "./src/assets/profile.jpeg", // Initial profile image
  });

  const [isEditing, setIsEditing] = useState({
    name: false,
    email: false,
    phone: false,
    address: false,
    dob: false,
    profileImage: false,
  });

  // Handler for toggling edit mode
  const toggleEdit = (field) => {
    setIsEditing((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  // Handler for updating field values
  const handleFieldChange = (field, value) => {
    setFields((prev) => ({ ...prev, [field]: value }));
  };

  // Handler for updating profile image
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      handleFieldChange("profileImage", imageUrl);
      toggleEdit("profileImage");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20 px-4 flex flex-col items-center">
      <div className="max-w-2xl w-full bg-white p-8 rounded shadow">
        {/* Profile Header */}
        <div className="flex flex-col items-center mb-8">
          <div className="relative w-32 h-32 mb-4">
            {isEditing.profileImage ? (
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
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
            { label: "Name", field: "name", type: "text" },
            { label: "Email", field: "email", type: "email" },
            { label: "Phone Number", field: "phone", type: "text" },
            { label: "Address", field: "address", type: "textarea" },
            { label: "Date of Birth", field: "dob", type: "date" },
          ].map(({ label, field, type }) => (
            <div key={field} className="flex items-center justify-between">
              <div className="w-3/4">
                <label className="block text-sm font-medium text-gray-700">
                  {label} <span className="text-red-500">*</span>
                </label>
                {isEditing[field] ? (
                  type === "textarea" ? (
                    <textarea
                      value={fields[field]}
                      onChange={(e) =>
                        handleFieldChange(field, e.target.value)
                      }
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      required
                    />
                  ) : (
                    <input
                      type={type}
                      value={fields[field]}
                      onChange={(e) =>
                        handleFieldChange(field, e.target.value)
                      }
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      required
                    />
                  )
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

        {/* Back to Dashboard Button */}
        <div className="mt-8 flex justify-center">
          <button
            onClick={() => navigate("/dashboard")}
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
