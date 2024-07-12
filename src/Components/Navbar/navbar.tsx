import React from "react";
import Link from "next/link";
import { Button } from "@mui/material";

interface NavbarProps {
  loggedIn: boolean;
}

export default function Navbar({ loggedIn }: NavbarProps) {
  return (
    <nav className="bg-neutral-800 bg-opacity-75 shadow-md overflow-hidden fixed top-4 left-1/2 transform -translate-x-1/2 rounded-full z-50 w-auto px-10 py-4">
      <div className="container mx-auto w-auto">
        <div className="flex justify-between items-center w-auto">
          <div>
            <img src="/cart1.png" className="w-12 mr-8" />
          </div>
          <div>
            <ul className="flex space-x-5">
              <li>
                <Link href="/">
                  <Button variant="contained" size="medium">
                    Home
                  </Button>
                </Link>
              </li>
              <li>
                <Link href="/register">
                  <Button variant="contained" size="medium">
                    Register
                  </Button>
                </Link>
              </li>
              <li>
                <Link href="/#contact">
                  <Button variant="contained" size="medium">
                    Contact
                  </Button>
                </Link>
              </li>
            </ul>
          </div>
          <div className="relative ">
            <Link href="/login" className=" ml-5">
              <Button variant="contained" size="medium">
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
