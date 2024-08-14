"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import "@/app/globals.css";
import { useSelector } from "react-redux";
import { selectCartItemsCount } from "@/app/redux/slices/Cart/index"; // adjust this path based on your actual file structure
import SearchBar from "@/Components/SearchBar/SearchBar";
import ImageAvatars from "@/Components/Avatar";
import CircularIndeterminate from "@/Components/Loading";
import Dashboard from "@/app/dashboard/page";
import data from "@/data/mock-data.json";
import { useAuthCheck } from "../Auth/useAuthCheck";
import { useRouter } from "next/navigation";
import { RootState } from "../redux/store/store";
import { selectUser } from "../redux/slices/User";
import Avatar from "@/Components/Avatar";
import ProfileDropdown from "@/Components/ProfileDropDown";

interface filteredData {
  name: string;
  price: string;
  sentence: string;
  image: string;
  id: number;
}

export default function Layout({ children }: any) {
  // const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [filteredData, setFilteredData] = useState<filteredData[]>(data);
  const cartItemCount = useSelector(selectCartItemsCount); // Get the cart item count from Redux store
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const loading = useAuthCheck();
  const user = useSelector(selectUser);
  // console.log("USER DEFINED HERE", user);
  const profileImage = user.profileImage;
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

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Top Navigation Bar */}
      <div className="flex justify-between items-center p-6 bg-white shadow-md">
        <div className="flex-1 flex justify-center">
          <SearchBar setQuery={setQuery} />
        </div>
        <div className="flex items-center space-x-6">
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
          <div className="relative">
            <Avatar
              profileImage={profileImage}
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
      <div className="flex-grow p-6 mt-6 w-full max-w-4xl mx-auto bg-white shadow-lg rounded-lg">
        <Dashboard filteredData={filteredData} />
      </div>
    </div>
  );
}
