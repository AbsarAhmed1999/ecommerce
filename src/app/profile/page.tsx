"use client"; // Make sure to use the "use client" directive for client-side code

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser, selectUser } from "@/app/redux/slices/User";
import BackButton from "@/Components/BackButton/BackButton";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
export default function Profile() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  console.log("USER FROM STORE", user._id);
  const [fullName, setFullName] = useState(user?.fullName || "");
  const router = useRouter();
  // const [name, setName] = useState(fullName);
  const [email, setEmail] = useState(user?.email || "");
  const [profileImage, setProfileImage] = useState<string | null>(
    user?.profileImage || ""
  );
  const [password, setPassword] = useState("");
  const [id, setId] = useState(user?._id);
  console.log("ID IS HERE", id);
  useEffect(() => {
    console.log("INSIDE USE EFFECT");
    if (user && user._id) {
      setId(user._id);
    }
  }, [[user]]);

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

  const showProfileUpdate = () => {
    Swal.fire({
      icon: "success",
      title: "Profile Updated Successfully",
      toast: true, // Use toast-style alert for non-blocking notifications
      position: "top-end",
      timer: 3500,
      showConfirmButton: false,
      background: "#e0f5ec", // Light green background
      iconColor: "#28a745", // Icon color for success (green)
      showClass: {
        popup: "swal2-grow-row", // Grow animation from left to right
      },
    }).then(() => {
      setTimeout(() => {
        router.push("/dashboard");
      }, 1000); // Short delay to show loader
    });
  };

  const handleSaveChanges = async () => {
    console.log("INSIDE HANDLE SAVE CHANGES");
    try {
      const response = await fetch("/api/users/updateProfile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: id,
          fullName: fullName,
          email: email,
          profileImage: profileImage,
          password: password,
        }),
      });
      const result = await response.json();
      console.log("RESULT inside profilePage", result);
      console.log("response.ok", response.ok);
      if (response.ok) {
        dispatch(setUser(result?.user));
        showProfileUpdate();
      } else {
        alert("Failed to update profile");
      }
    } catch (e) {
      console.log("ERROR ");
      alert("An erorr while updating profile");
    }
  };

  // const showToastMessage = (message: string) => {
  //   toast.success(message, {
  //     position: "top-right",
  //     style: {
  //       backgroundColor: "green", // Custom success background color
  //       color: "white", // Custom text color
  //       width: "100px",
  //     },
  //   });
  // };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-10">
      <BackButton>Go Back</BackButton>
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <div className="text-center mb-6">
          {/* <ToastContainer /> */}
          <div className="relative">
            <img
              className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
              src={profileImage || ""}
              alt="Profile"
            />
            <input
              type="file"
              accept="image/*"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              onChange={handleImageUpload}
            />
            <span className="absolute bottom-0 right-0 bg-gray-700 text-white rounded-full p-2">
              &#9998;
            </span>
          </div>
          <h2 className="text-2xl font-semibold text-gray-800">{""}</h2>
          <p className="text-gray-600">Software Engineer</p>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-gray-600">Name</label>
            <input
              type="text"
              className="border border-gray-300 rounded-lg px-4 py-2 w-2/3"
              value={fullName || ""}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-between">
            <label className="text-gray-600">Email</label>
            <input
              type="email"
              className="border border-gray-300 rounded-lg px-4 py-2 w-2/3"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-between">
            <label className="text-gray-600">Password</label>
            <input
              type="password"
              className="border border-gray-300 rounded-lg px-4 py-2 w-2/3"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>
          <div className="text-center">
            <button
              className="bg-blue-600 text-white font-semibold px-6 py-2 rounded-lg hover:bg-blue-700"
              onClick={() => {
                console.log("BUTTON CLICKED");
                handleSaveChanges();
              }}
            >
              Save Changes
            </button>
          </div>
        </div>{" "}
      </div>
    </div>
  );
}
