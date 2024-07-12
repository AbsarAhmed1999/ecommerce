"use client";
import React from "react";
import { useRouter } from "next/navigation";

const BackButton = ({ to }: any) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(to); // Navigate to the specified route
  };

  return (
    <button
      className="bg-blue-600 text-white font-semibold rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 py-2 px-4"
      onClick={handleClick}
    >
      Back to Home page
    </button>
  );
};

export default BackButton;
