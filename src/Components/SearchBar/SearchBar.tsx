// components/SearchBar.js
"use client";
import React, { useState } from "react";
import Data from "../../data/mock-data.json";
import { List } from "./List";
export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [hide, setHide] = useState(true);
  let isQueryEmpty = true;
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    // Implement the search logic here
    console.log("Search query:", query);
  };

  return (
    <form onSubmit={handleSearch} className="w-full max-w-md mx-auto">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Search products..."
          className="w-full px-4 py-2 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 10m8-4a8 8 0 11-16 0 8 8 0 0116 0zm-6 8l4 4"
            />
          </svg>
        </button>
      </div>
      <div className="z-50 absolute ml-2 w-96 mt-2">
        <List query={query} />
      </div>
    </form>
  );
}
