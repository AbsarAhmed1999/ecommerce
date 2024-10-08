import React from "react";
import { motion } from "framer-motion";
import "./HeroSection.css";
import Link from "next/link";

export default function HeroSection() {
  const variants = {
    hidden: { x: "-100vw", opacity: 0 },
    visible: {
      x: "0%",
      opacity: 1,
      transition: { duration: 1, ease: "easeOut" },
    },
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      <img
        src="./background1.jpg"
        alt="backgroundImage"
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover mix-blend-multiply"
      />
      <div className="absolute inset-0 bg-[rgba(0,0,0,0.8)] flex flex-col items-center justify-center text-white p-10">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={variants}
          className="flex flex-col items-center"
        >
          {/* Responsive text size based on screen size */}
          <motion.h1
            variants={variants}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-center"
          >
            Absar Ecommerce Website
          </motion.h1>

          <Link href="/login" legacyBehavior>
            <button className="bg-yellow-500 text-black py-2 px-4 sm:py-3 sm:px-6 rounded-lg text-base sm:text-lg font-semibold hover:bg-yellow-400 transition duration-300 mt-4 border-white hover:border-2">
              Shop Now
            </button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
