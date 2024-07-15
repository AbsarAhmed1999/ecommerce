// components/Layout.js
import React from "react";
import Image from "next/image";
import Link from "next/link";
import "@/app/globals.css";
import SearchBar from "@/Components/SearchBar/SearchBar";

export default function Layout({ children }: any) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Bar with Cart and Profile Icon */}
      <div className="flex justify-end items-center p-4 bg-gray-200">
        <SearchBar />
        <Link href="/cart">
          <div className="relative h-8 w-8 mr-4 cursor-pointer">
            <Image
              src="/path/to/cart-icon.png" // Replace with the path to your cart icon
              alt="Cart"
              layout="fill"
              objectFit="cover"
            />
          </div>
        </Link>
        <Link href="/profile">
          <div className="relative h-10 w-10 cursor-pointer">
            <Image
              src="/path/to/profile-image.jpg" // Replace with the path to your profile image
              alt="Profile"
              layout="fill"
              objectFit="cover"
              className="rounded-full"
            />
          </div>
        </Link>
      </div>

      {/* Centered Content */}
      <div className="flex-grow flex flex-col items-center">
        {/* Search Bar at the Top Center */}
        <div className="w-full max-w-2xl p-4"></div>

        {/* Main Content */}
        <div className="w-full max-w-4xl p-4 flex-grow">{children}</div>
      </div>
    </div>
  );
}
