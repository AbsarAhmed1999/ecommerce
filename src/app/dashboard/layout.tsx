"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import "@/app/globals.css";
import SearchBar from "@/Components/SearchBar/SearchBar";
import ImageAvatars from "@/Components/Avatar";
import CircularIndeterminate from "@/Components/Loading";
import Dashboard from "@/app/dashboard/page";
import data from "@/data/mock-data.json";

export default function Layout({ children }: any) {
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [filteredData, setFilteredData] = useState(data);

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
          setLoading(false); // Set loading to false only if authenticated
        }
      } catch (error) {
        console.error("An error occurred:", error);
        window.location.href = "/login";
      }
    })();
  }, []);

  useEffect(() => {
    const result = data.filter((item) =>
      item.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredData(result);
  }, [query]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <CircularIndeterminate />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Bar with Cart and Profile Icon */}
      <div className="flex justify-end items-center p-4 bg-gray-200">
        <SearchBar setQuery={setQuery} />
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
        <div className="w-full max-w-2xl p-4"></div>
        <div className="w-full max-w-4xl p-4 flex-grow">
          <Dashboard filteredData={filteredData} />
        </div>
      </div>
    </div>
  );
}
