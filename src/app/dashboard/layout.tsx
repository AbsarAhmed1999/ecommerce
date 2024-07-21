"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import "@/app/globals.css";
import SearchBar from "@/Components/SearchBar/SearchBar";
import ImageAvatars from "@/Components/Avatar";

export default function Layout({ children }: any) {
  useEffect(() => {
    (async () => {
      try {
        const response = await fetch("/api/protected", {
          credentials: "include",
        });

        if (!response.ok) {
          window.location.href = "/login";
        } else {
          const content = await response.json();
          console.log("CONTENT", content);
        }
      } catch (error) {
        console.error("An error occurred:", error);
        window.location.href = "/login";
      }
    })();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Bar with Cart and Profile Icon */}
      <div className="flex justify-end items-center p-4 bg-gray-200">
        <SearchBar />
        <Link href="/cart">
          <div className="relative h-8 w-8 mr-4 cursor-pointer">
            <img src="/trolley.png" />
          </div>
        </Link>
        <Link href="/profile">
          <div className="relative h-10 w-10 cursor-pointer">
            <ImageAvatars />
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
