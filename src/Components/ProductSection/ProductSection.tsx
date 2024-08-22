import { motion } from "framer-motion";
import React from "react";
import { useInView } from "react-intersection-observer";

// Product Card Component with Hover Effect
const ProductCard = ({ image, title }: any) => (
  <motion.div
    className="bg-white p-4 rounded-lg shadow-lg transition-transform transform hover:scale-105"
    whileHover={{ scale: 1.2 }} // Optionally use framer-motion for more control
    transition={{ duration: 0.3 }}
  >
    <img
      src={image}
      alt={title}
      loading="lazy"
      className="w-full h-40 object-cover rounded-lg mb-4"
    />
    <h3 className="text-lg font-semibold">{title}</h3>
  </motion.div>
);

export default function ProductSection() {
  const gradientStyle = {
    background: "linear-gradient(to right, #000000, #00aaff)",
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
      className="relative w-screen min-h-screen overflow-hidden"
      style={gradientStyle}
      ref={sectionRef} // Attach ref to the section
    >
      {/* Title and Description Section */}
      <div className="flex flex-col items-center justify-center w-full h-full text-white p-20">
        <motion.h1
          variants={variants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-5xl font-bold mb-6"
        >
          Our Products
        </motion.h1>
        <motion.p
          variants={variants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-lg max-w-lg text-center"
        >
          Discover our range of high-quality products. Each item is crafted with
          care to ensure the best experience for you.
        </motion.p>
      </div>

      {/* Products Grid Section */}
      <div className="absolute inset-x-0 bottom-0 pt-20 pb-10 px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {/* Example product cards */}
          <ProductCard image="./product1.jpg" title="Product 1" />
          <ProductCard image="./product2.jpg" title="Product 2" />
          <ProductCard image="./product3.jpg" title="Product 3" />
          <ProductCard image="./product4.jpg" title="Product 4" />
          {/* Add more ProductCard components as needed */}
        </div>
      </div>
    </div>
  );
}
