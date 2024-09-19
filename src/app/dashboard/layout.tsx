"use client";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useSelector } from "react-redux";
import { selectCartItemsCount } from "@/app/redux/slices/Cart/index";
import SearchBar from "@/Components/SearchBar/SearchBar";
import CircularIndeterminate from "@/Components/Loading";
import Dashboard from "@/Components/Dashboard/Dashboard";
import data from "@/data/mock-data.json";
import { useAuthCheck } from "../Auth/useAuthCheck";
import { selectUser } from "../redux/slices/User";
import Avatar from "@/Components/Avatar";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";
import { FiUser, FiLogOut, FiShoppingCart } from "react-icons/fi"; // Importing the icons
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
  const cartItemCount = useSelector(selectCartItemsCount); // Get cart item count from Redux
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { loading, authenticated } = useAuthCheck();
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const result = data.filter((item) =>
      item.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredData(result);
  }, [query]);

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

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/users/logout", {
        credentials: "include",
        method: "POST",
      });

      if (response.ok) {
        router.push("/login");
      }
    } catch (e) {
      console.log("ERROR", e);
    }
  };

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
          <div className="flex space-x-20 relative" ref={dropdownRef}>
            {/* Cart Icon with Badge */}
            <div className="relative">
              <Link href={"/cart"}>
                <img
                  src="/trolley.png"
                  className="w-10 object-contain"
                  alt="Cart Icon"
                />
              </Link>
              {cartItemCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center w-6 h-6 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
                  {cartItemCount}
                </span>
              )}
            </div>

            <Avatar
              profileImage={user?.profileImage || "/default-avatar.png"}
              toggleDropdown={toggleDropdown}
            />

            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg py-2 z-10">
                {/* Profile Link */}
                <Link href="/profile" legacyBehavior>
                  <a className="group relative flex items-center px-4 py-2 text-gray-800 hover:bg-green-400 transition-all">
                    <FiUser className="mr-2 " /> {/* Profile icon */}
                    <span className="flex-grow  font-semibold">Profile</span>
                    <span className="absolute right-0 top-0 bottom-0 w-1 bg-transparent group-hover:bg-green-500 transition-all"></span>
                  </a>
                </Link>

                {/* Cart Link */}
                <Link href="/cart" legacyBehavior>
                  <a className="group relative flex items-center px-4 py-2 text-gray-800 hover:bg-yellow-400 transition-all">
                    <FiShoppingCart className="mr-2 " /> {/* Cart icon */}
                    <span className="flex-grow font-semibold">
                      Cart ({cartItemCount})
                    </span>
                    <span className="absolute right-0 top-0 bottom-0 w-1 bg-transparent group-hover:bg-yellow-500 transition-all"></span>
                  </a>
                </Link>

                {/* Logout Link */}
                <Link href={""} legacyBehavior>
                  <a
                    onClick={handleLogout}
                    className="group relative flex items-center px-4 py-2 text-gray-800 hover:bg-red-400 transition-all"
                  >
                    <FiLogOut className="mr-2 " /> {/* Logout icon */}
                    <span className="flex-grow  font-semibold">Logout</span>
                    <span className="absolute right-0 top-0 bottom-0 w-1 bg-transparent group-hover:bg-red-500 transition-all"></span>
                  </a>
                </Link>
              </div>
            )}
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
