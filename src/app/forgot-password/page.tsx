"use client";
import { useState } from "react";
import Swal from "sweetalert2";
// import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
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
      // Make API request to reset password
      const response = await fetch("/api/users/sendOTP", {
        method: "POST",
        body: JSON.stringify({ email }),
      });
      console.log("response ++", response);
      if (response.ok) {
        const result = await response.json();
        console.log("RESS", result.message);
        showToastMessage(result.message);
        const encodedEmail = encodeURIComponent(email); // Encode the email
        setTimeout(() => {
          router.push(`/otp-verification/${encodedEmail}`);
        }, 3000);
      }

      //   setMessage(response.data.message); // Display success message
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
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-center mb-4">
        Forgot Password
      </h2>
      {message && <p className="text-green-500 text-center mb-4">{message}</p>}
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition duration-300"
        >
          Reset Password
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default ForgetPassword;
