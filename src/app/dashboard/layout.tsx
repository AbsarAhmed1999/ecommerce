"use client";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import "../globals.css";
import { useSelector } from "react-redux";
import { selectCartItemsCount } from "@/app/redux/slices/Cart/index";
import SearchBar from "@/Components/SearchBar/SearchBar";
import CircularIndeterminate from "@/Components/Loading";
import Dashboard from "@/Components/Dashboard/Dashboard";
import data from "@/data/mock-data.json";
import { useAuthCheck } from "../Auth/useAuthCheck";
import { selectUser } from "../redux/slices/User";
import Avatar from "@/Components/Avatar";
import ProfileDropdown from "@/Components/ProfileDropDown";

interface filteredData {
  name: string;
  price: number;
  sentence: string;
  image: string;
  id: number;
  quantity?: number;
}

export default function Layout() {
  const [query, setQuery] = useState("");
  const user = useSelector(selectUser);
  console.log("INSIDE DAHSBORD LAYOUT USER from STORE", user);
  const [filteredData, setFilteredData] = useState<filteredData[]>(data);
  const cartItemCount = useSelector(selectCartItemsCount);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { loading, authenticated } = useAuthCheck();

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const result = data.filter((item) =>
      item.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredData(result);
  }, [query, data]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <CircularIndeterminate />
      </div>
    );
  }

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    authenticated && (
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-100 via-gray-200 to-gray-300">
        {/* Top Navigation Bar */}
        <div className="flex justify-between items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg">
          <div className="flex items-center space-x-4 w-full max-w-xl">
            <SearchBar setQuery={setQuery} />
          </div>
          <div className="flex items-center space-x-8">
            <Link href="/cart">
              <div className="relative h-10 w-10 cursor-pointer">
                <img
                  src="/trolley.png"
                  className="w-full h-full object-contain"
                />
                {cartItemCount > 0 && (
                  <div className="absolute top-0 right-0 h-5 w-5 bg-red-600 text-white text-xs flex items-center justify-center rounded-full">
                    {cartItemCount}
                  </div>
                )}
              </div>
            </Link>
            <div className="relative" ref={dropdownRef}>
              <Avatar
                profileImage={user?.profileImage || "/default-avatar.png"}
                toggleDropdown={toggleDropdown}
              />
              <ProfileDropdown
                isOpen={isDropdownOpen}
                toggleDropdown={toggleDropdown}
              />
            </div>
          </div>
        </div>

        {/* Main Dashboard Content */}
        <div className="flex-grow p-8 mt-8 w-full max-w-5xl mx-auto bg-gradient-to-r from-gray-800 via-gray-900 to-black shadow-2xl rounded-lg">
          <Dashboard filteredData={filteredData} />
        </div>
      </div>
    )
  );
}
