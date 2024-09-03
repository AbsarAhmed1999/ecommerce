"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function OTPVerification() {
  const [otp, setOtp] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("INSIDEHANDLE SUBMIT +");

    const response = await fetch("/api/users/verifyOTP", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ otp }),
    });

    const result = await response.json();

    if (result.success) {
      // OTP is correct, redirect to a secure page or show success message
      alert("OTP verified successfully!");
      router.push("/dashboard"); // Replace with your desired route
    } else {
      alert("Invalid OTP, please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Verify OTP</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="border border-gray-300 p-2 rounded-lg mb-4 w-full"
            placeholder="Enter your OTP"
            required
          />
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
          >
            Verify OTP
          </button>
        </form>
      </div>
    </div>
  );
}
