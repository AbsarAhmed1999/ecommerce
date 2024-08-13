"use client"; // Make sure to use the "use client" directive for client-side code

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser, selectUser } from "@/app/redux/slices/User";
import Avatar from "@/Components/Avatar"; // Adjust the path according to your project structure

export default function Profile() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [fullName, setFullName] = useState(user?.fullName || "");
  const [profileImage, setProfileImage] = useState<string | null>(
    user?.profileImage || ""
  );
  const [password, setPassword] = useState("");

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    // Save the updated user data, ideally, this should also update the backend
    dispatch(setUser({ fullName, profileImage }));

    // Handle password update logic (e.g., make an API request)
    if (password) {
      // Call API to update the password
    }
    alert("Profile updated successfully!");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-800">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Edit Profile</h2>

        <div className="flex justify-center mb-4">
          <Avatar profileImage={profileImage || "/default-avatar.png"} />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            Profile Picture
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="block w-full"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="fullName"
            className="block text-gray-700 font-bold mb-2"
          >
            Full Name
          </label>
          <input
            type="text"
            id="fullName"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-gray-700 font-bold mb-2"
          >
            New Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          onClick={handleSave}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200"
        >
          Save
        </button>
      </div>
    </div>
  );
}
