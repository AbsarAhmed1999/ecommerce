"use client";
import React, { useState } from "react";
import data from "@/data/mock-data.json";
import { Product } from "@/app/dashboard/page";

export default function SearchBar({
  setQuery,
}: {
  setQuery: React.Dispatch<React.SetStateAction<string>>;
}) {
  const [localQuery, setLocalQuery] = useState("");
  const [filteredData, setFilteredData] = useState<Product[]>(data);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setLocalQuery(query);

    const result = data.filter((item) =>
      item.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredData(result);

    // If query is empty, show all products
    setQuery(query);
  };

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    setQuery(localQuery);
  };

  const handleSelectProduct = (productName: string) => {
    setLocalQuery("");
    setFilteredData([]);
    setQuery(productName);
  };

  return (
    <form onSubmit={handleSearch} className="w-full max-w-md mx-auto">
      <div className="relative">
        <input
          type="text"
          value={localQuery}
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
      {localQuery && (
        <ul className="absolute z-50 bg-white shadow-lg rounded-lg p-2 w-full max-w-md mt-2">
          {filteredData.map((product) => (
            <li
              key={product.id}
              className="cursor-pointer p-2 hover:bg-gray-200"
              onClick={() => handleSelectProduct(product.name)}
            >
              {product.name}
            </li>
          ))}
        </ul>
      )}
    </form>
  );
}
