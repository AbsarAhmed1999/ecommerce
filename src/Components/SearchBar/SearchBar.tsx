"use client";
import React, { useState } from "react";
import data from "@/data/mock-data.json";
import { Product } from "@/Components/Dashboard/Dashboard";
import "./searchbar.css";
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
    <form onSubmit={handleSearch} className="max-w-md mx-auto">
      <label
        htmlFor="default-search"
        className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
      >
        Search
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg
            className="w-4 h-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <input
          type="text"
          id="default-search"
          value={localQuery}
          onChange={handleInputChange}
          placeholder="Search Products"
          className="search block w-96 p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required
        />
        <button
          type="submit"
          className="text-white searchBar absolute mr-20 end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Search
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
