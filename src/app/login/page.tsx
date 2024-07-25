"use client";
import React, { useState } from "react";
import Link from "next/link";
import "@/app/globals.css";
import Navbar from "@/Components/Navbar/navbar";
import { useRouter } from "next/navigation";
import { JwtAuthService } from "../utils/jwt-service";

interface LoginFormProps {
  onLogin: (email: string, password: string) => void;
}
export default function Login() {
  const [initialLoading, setInitialLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.currentTarget.value);
  };
  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.currentTarget.value);
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();
      if (response.ok) {
        router.push("/dashboard");
      } else {
        console.log("Login failed");
      }
    } catch (e) {
      console.log("An Error Occurred during login ", e);
    }
  };

  return (
    <div>
      <Navbar loggedIn={false} />
      <div className="min-h-screen flex items-center justify-center bg-gray-800">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
          <form>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-700 font-bold mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={handleEmailChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="password"
                className="block text-gray-700 font-bold mb-2"
              >
                Password
              </label>
              <input
                onChange={handlePasswordChange}
                type="password"
                id="password"
                name="password"
                value={password}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <button
              type="submit"
              onClick={handleSubmit}
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200"
            >
              Login
            </button>
            <p className="text-center text-gray-600 mt-4">
              Don't have an account?{" "}
              <Link href="/register" className="text-blue-500 hover:underline">
                Register
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
