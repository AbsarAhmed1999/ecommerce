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

  const loading = useAuthCheck();
  const user = useSelector(selectUser);
  console.log("USER DEFINED HERE", user);
  const profileImage = user.profileImage;
  useEffect(() => {
    const result = data.filter((item) =>
      item.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredData(result);
  }, [query]);

  useEffect(() => {}, []);

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
            {cartItemCount > 0 && (
              <div className="absolute top-0 right-0 h-4 w-4 bg-red-500 text-white text-xs flex items-center justify-center rounded-full">
                {cartItemCount}
              </div>
            )}
          </div>
        </Link>
        <Link href="/profile">
          <div className="relative h-10 w-10 cursor-pointer ">
            {/* {user.user} */}

            <img src={`${profileImage}`} width={`500px`} height={`80px`} />
            {/* <ImageAvatars profileImage={profileImage} /> */}
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
