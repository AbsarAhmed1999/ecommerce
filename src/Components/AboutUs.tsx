import React, { useEffect, useRef, useState } from "react";
import "../app/globals.css";
import { motion } from "framer-motion";

export default function AboutUs() {
  const gradientStyle = {
    background: "linear-gradient(to right, #6a1b9a, #1e88e5)",
  };

  const circleStyle = {
    boxShadow: `
      0 0 20px rgba(183, 110, 121, 0.9),
      0 0 40px rgba(183, 110, 121, 0.7),
      0 0 80px rgba(183, 110, 121, 0.5)
    `,
  };

  const variants = {
    hidden: { x: "-100%", opacity: 0 },
    visible: { x: "0%", opacity: 1, transition: { duration: 1 } },
  };
  const paragraphVariants = {
    hidden: { x: "-100%", opacity: 0 },
    visible: {
      x: "0%",
      opacity: 1,
      transition: { duration: 1, ease: "easeOut" },
    },
  };

  const headingVariants = {
    hidden: { y: "-100%", opacity: 0 },
    visible: {
      y: "0%",
      opacity: 1,
      transition: { duration: 1, ease: "easeOut" },
    },
  };

  const headingRef = useRef(null);
  const paragraphRef = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (headingRef.current) observer.observe(headingRef.current);
    if (paragraphRef.current) observer.observe(paragraphRef.current);

    return () => {
      if (headingRef.current) observer.unobserve(headingRef.current);
      if (paragraphRef.current) observer.unobserve(paragraphRef.current);
    };
  }, []);

  return (
    <div
      className="relative w-screen h-screen overflow-hidden  flex items-center justify-center"
      style={gradientStyle}
    >
      <div className="text-center text-white p-10">
        <motion.h1
          ref={headingRef}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={headingVariants}
          className="text-6xl font-bold mb-6"
        >
          About Us
        </motion.h1>
        <motion.p
          ref={paragraphRef}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={paragraphVariants}
          className="text-lg max-w-lg mx-auto"
        >
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laboriosam,
          earum! Voluptatibus, a nam. Eum, necessitatibus maiores eligendi
          corporis sit doloribus veritatis quidem suscipit vero assumenda
          tempora earum hic reprehenderit magnam.
        </motion.p>
      </div>
    </div>
  );
}
