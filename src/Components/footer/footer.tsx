import React from "react";
import { FaFacebook, FaInstagram } from "react-icons/fa"; // Importing react-icons

export default function Footer() {
  return (
    <footer className="bg-[#003366] text-white p-6">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Left section */}
        <div>
          <p className="text-lg font-semibold">XYZ Street</p>
          <p className="text-sm mt-1 text-gray-300">+922030123021</p>
        </div>

        {/* Right section */}
        <div className="flex items-center space-x-6">
          <a
            href="https://www.facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-gray-300 transition-colors duration-300"
            aria-label="Facebook"
          >
            <FaFacebook size={24} />
          </a>
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-gray-300 transition-colors duration-300"
            aria-label="Instagram"
          >
            <FaInstagram size={24} />
          </a>
          <div className="flex flex-col text-gray-300">
            <p className="text-sm">easymart@gmail.com</p>
            <p className="text-sm">Easy_mart101</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
