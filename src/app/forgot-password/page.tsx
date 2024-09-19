"use client";
import { useState } from "react";
import Swal from "sweetalert2";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import "./forgot.css";
import BackButton from "@/Components/BackButton/BackButton";
const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const response = await fetch("/api/users/sendOTP", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        const result = await response.json();
        showToastMessage(result.message);
        const encodedEmail = encodeURIComponent(email);
        setTimeout(() => {
          router.push(`/otp-verification/${encodedEmail}`);
        }, 3000);
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    }
  };

  const showToastMessage = (message: string) => {
    toast.success(message, {
      position: "top-right",
    });
  };

  return (
    <div className="backgroundContainer h-lvh">
      <BackButton>Go Back</BackButton>
      <div className="form-container">
        <h2 className="text-white font-bold text-3xl text-center tracking-wide mt-5">
          Forgot Password
        </h2>
        {message && (
          <p className="text-green-500 text-center mb-4">{message}</p>
        )}
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2 mt-5">
            <input
              type="email"
              id="email"
              className="form-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Email"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 mt-4 bg-white text-purple-600 rounded-lg hover:bg-gray-300 transition duration-300"
          >
            Reset Password
          </button>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default ForgetPassword;
