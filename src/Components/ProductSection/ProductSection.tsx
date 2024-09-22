import { motion } from "framer-motion";
import React from "react";
import { useInView } from "react-intersection-observer";
import "./ProductSection.css";

// Product Card Component with Hover Effect
const ProductCard = ({ image, title }: any) => (
  <motion.div
    className="bg-white sm:p-4 rounded-lg shadow-lg transition-transform transform hover:scale-105"
    whileHover={{ scale: 1.1 }} // Slightly reduced hover scale for smaller products
    transition={{ duration: 0.3 }}
  >
    <img
      src={image}
      alt={title}
      loading="lazy"
      className="w-full h-32 sm:h-40 object-cover rounded-lg mb-2"
    />
    <h3 className="text-sm sm:text-lg font-semibold text-center">{title}</h3>
  </motion.div>
);

export default function ProductSection() {
  const gradientStyle = {
    // background: "linear-gradient(to right, #000000, #003366)", // Darker blue shade
    background: "linear-gradient(to right, #000000, #005577)", // Slightly brighter dark blue
  };

  const variants = {
    hidden: { y: "-100%", opacity: 0 },
    visible: { y: "0%", opacity: 1, transition: { duration: 1 } },
  };

  const { ref: sectionRef, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div
      className="relative w-screen min-h-screen overflow-hidden flex flex-col items-center"
      style={gradientStyle}
      ref={sectionRef} // Attach ref to the section
    >
      {/* Title and Description Section */}
      <div className="flex flex-col items-center justify-center w-full text-white p-6 sm:p-12 md:p-20 lg:p-24">
        <motion.h1
          variants={variants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-center"
        >
          Our Products
        </motion.h1>
        <motion.p
          variants={variants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-base sm:text-lg md:text-xl max-w-md text-center mb-10"
        >
          Discover our range of high-quality products. Each item is crafted with
          care to ensure the best experience for you.
        </motion.p>
      </div>

      {/* Products Grid Section */}
      <div className="w-full px-4 sm:px-6 lg:px-10">
        <div className="pb-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Example product cards */}
          <ProductCard image="./product1.jpg" title="Product 1" />
          <ProductCard image="./product2.jpg" title="Product 2" />
          <ProductCard image="./product3.jpg" title="Product 3" />
          <ProductCard image="./product4.jpg" title="Product 4" />
          <ProductCard image="./product5.jpg" title="Product 5" />
          <ProductCard image="./product6.jpg" title="Product 6" />
          {/* Add more ProductCard components as needed */}
        </div>
      </div>
    </div>
  );
}
