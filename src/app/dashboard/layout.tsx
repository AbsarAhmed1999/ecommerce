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
import "./dashboard.css";
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

  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);

  // Function to toggle the hamburger menu
  const toggleHamburgerMenu = () => {
    setIsHamburgerOpen((prevState) => !prevState);
  };
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
      <div>
        {/* Navigation Section */}
        <div className="flex justify-between items-center px-8 py-4 bg-slate-900 shadow-lg">
          {/* Hamburger menu for mobile */}
          <div className="block lg:hidden">
            <button
              className="text-white focus:outline-none"
              onClick={toggleHamburgerMenu}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>

          {/* Search Bar */}
          <div className="searchBar flex-grow max-w-md mx-auto">
            <SearchBar setQuery={setQuery} />
          </div>

          {/* Cart and Avatar (Visible only on larger screens) */}
          <div
            className="hidden lg:flex space-x-10 items-center"
            ref={dropdownRef}
          >
            <Link href={"/cart"}>
              <div className="relative">
                <img
                  src="/trolley.png"
                  className="w-12 object-contain"
                  alt="Cart Icon"
                />
                {cartItemCount > 0 && (
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center w-6 h-6 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
                    {cartItemCount}
                  </span>
                )}
              </div>
            </Link>

            <Avatar
              profileImage={user?.profileImage || "/default-avatar.png"}
              toggleDropdown={toggleDropdown}
            />

            {isDropdownOpen && (
              <div className="absolute  top-16 right-5 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg py-2 z-10">
                {/* Profile Link */}
                <Link href="/profile" legacyBehavior>
                  <a className="group relative flex items-center px-4 py-2 text-gray-800 hover:bg-green-400 transition-all">
                    <FiUser className="mr-2 " />
                    <span className="flex-grow font-semibold">Profile</span>
                  </a>
                </Link>

                {/* Cart Link */}
                <Link href="/cart" legacyBehavior>
                  <a className="group relative flex items-center px-4 py-2 text-gray-800 hover:bg-yellow-400 transition-all">
                    <FiShoppingCart className="mr-2 " />
                    <span className="flex-grow font-semibold">
                      Cart ({cartItemCount})
                    </span>
                  </a>
                </Link>

                {/* Logout Link */}
                <Link href={""} legacyBehavior>
                  <a
                    onClick={handleLogout}
                    className="group relative flex items-center px-4 py-2 text-gray-800 hover:bg-red-400 transition-all"
                  >
                    <FiLogOut className="mr-2 " />
                    <span className="flex-grow font-semibold">Logout</span>
                  </a>
                </Link>
              </div>
            )}
          </div>

          {/* Hamburger dropdown (Visible only when toggled on mobile) */}
          {isHamburgerOpen && (
            <div className="lg:hidden absolute top-16 left-0 w-full bg-white shadow-lg z-20 py-4">
              <div className="px-4">
                <Link href="/profile" legacyBehavior>
                  <a className="group relative flex items-center px-4 py-2 text-gray-800 hover:bg-green-400 transition-all">
                    <FiUser className="mr-2 " />
                    <span className="flex-grow font-semibold">Profile</span>
                  </a>
                </Link>

                {/* Cart Link */}
                <Link href="/cart" legacyBehavior>
                  <a className="group relative flex items-center px-4 py-2 text-gray-800 hover:bg-yellow-400 transition-all">
                    <FiShoppingCart className="mr-2 " />
                    <span className="flex-grow font-semibold">
                      Cart ({cartItemCount})
                    </span>
                  </a>
                </Link>

                {/* Logout Link */}
                <Link href={""} legacyBehavior>
                  <a
                    onClick={handleLogout}
                    className="group relative flex items-center px-4 py-2 text-gray-800 hover:bg-red-400 transition-all"
                  >
                    <FiLogOut className="mr-2 " />
                    <span className="flex-grow font-semibold">Logout</span>
                  </a>
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Main Dashboard Content */}
        <div className="p-8 mt-8 w-full mx-auto bg-gradient-to-r from-gray-800 via-gray-900 to-black shadow-2xl rounded-lg">
          <Dashboard filteredData={filteredData} />
        </div>
      </div>
    )
  );
}
