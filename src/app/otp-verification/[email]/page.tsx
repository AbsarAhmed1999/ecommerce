"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

type OTPVerificationParams = {
  email: string;
};

type result = {
  data: { decodeEmail: string };
  message: string;
  success: boolean;
};
export default function OTPVerification({
  params,
}: {
  params: OTPVerificationParams;
}) {
  const [otp, setOtp] = useState("");
  const router = useRouter();
  const email = params.email;

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log("INSIDEHANDLE SUBMIT +");

    const response = await fetch("/api/users/verifyOTP", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, otp }),
    });

    const result: result = await response.json();
    const decodedEmail = result.data.decodeEmail;
    console.log("RESULT inside otp-verification", decodedEmail);

    if (result.success) {
      const encodeEmail = encodeURIComponent(decodedEmail);
      router.push(`/new-password-form/${encodeEmail}`); // Replace with your desired route
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
