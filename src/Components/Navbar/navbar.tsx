import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@mui/material";

interface NavbarProps {
  loggedIn: boolean;
}

export default function Navbar({ loggedIn }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-neutral-400 bg-opacity-75 shadow-md overflow-hidden fixed top-4 left-1/2 transform -translate-x-1/2  w-auto px-4 md:px-10 py-4 z-50 ">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center ">
          <img src="/cart1.png" className="w-12 mr-8" />
        </div>
        <div className="hidden md:flex space-x-5">
          <Link href="/">
            <Button variant="contained" size="medium">
              Home
            </Button>
          </Link>
          <Link href="/register">
            <Button variant="contained" size="medium">
              Register
            </Button>
          </Link>
          <Link href="/#contact">
            <Button variant="contained" size="medium">
              Contact
            </Button>
          </Link>
        </div>
        <div className="hidden md:flex lg:w-36 md:w-36">
          <Link href="/login" className="ml-5">
            <Button variant="contained" size="medium">
              Sign In
            </Button>
          </Link>
        </div>
        <div className="md:hidden">
          <button onClick={toggleMenu} className="focus:outline-none">
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden mt-4 px-4 py-2 bg-neutral-400 bg-opacity-75 rounded-lg shadow-lg">
          <ul className="space-y-4">
            <li>
              <Link href="/">
                <Button variant="contained" size="medium" fullWidth>
                  Home
                </Button>
              </Link>
            </li>
            <li>
              <Link href="/register">
                <Button variant="contained" size="medium" fullWidth>
                  Register
                </Button>
              </Link>
            </li>
            <li>
              <Link href="/#contact">
                <Button variant="contained" size="medium" fullWidth>
                  Contact
                </Button>
              </Link>
            </li>
            <li>
              <Link href="/login" className="w-full">
                <Button variant="contained" size="medium" fullWidth>
                  Sign In
                </Button>
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
