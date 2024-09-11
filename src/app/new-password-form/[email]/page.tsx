"use client";
import React, { useState } from "react";
import { useRouter, useParams } from "next/navigation";

interface ParamsType {
  email: string;
}

export default function NewPasswordForm() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();
  const params = useParams(); // Use this to get the email from the URL

  // Handle params.email being either a string or an array of strings
  const email = Array.isArray(params.email) ? params.email[0] : params.email;
  const decodedEmail = email ? decodeURIComponent(email) : "";
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const response = await fetch("/api/users/resetPassword", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, newPassword }),
    });

    const result = await response.json();

    if (result.success) {
      alert("Password reset successfully!");
      router.push("/login");
    } else {
      alert("Password reset failed!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Reset Password</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="border border-gray-300 p-2 rounded-lg mb-4 w-full"
            placeholder="Enter new password"
            required
          />
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="border border-gray-300 p-2 rounded-lg mb-4 w-full"
            placeholder="Confirm new password"
            required
          />
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
          >
            Save Password
          </button>
        </form>
      </div>
    </div>
  );
}
