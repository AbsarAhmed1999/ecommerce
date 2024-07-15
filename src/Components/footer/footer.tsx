import React from "react";
import { FaFacebook, FaInstagram } from "react-icons/fa"; // Importing react-icons

export default function Footer() {
  return (
    <div className="bg-gray-900 mt-2 text-white p-6">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Left section */}
        <div>
          <p className="text-lg font-semibold">XYZ Street</p>
          <p className="text-sm mt-1 text-gray-400">+922030123021</p>
        </div>

        {/* Right section */}
        <div className="flex items-center space-x-4">
          <a
            href="https://www.facebook.com"
            className="text-blue-600 hover:text-blue-400"
          >
            <FaFacebook size={24} />
          </a>
          <a
            href="https://www.instagram.com"
            className="text-pink-600 hover:text-pink-400"
          >
            <FaInstagram size={24} />
          </a>
          <div className="flex flex-col text-gray-400">
            <p className="text-sm">easymart@gmail.com</p>
            <p className="text-sm">Easy_mart101</p>
          </div>
        </div>
      </div>
    </div>
  );
}
