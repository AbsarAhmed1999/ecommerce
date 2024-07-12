// components/Carousel.tsx
"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import "@/app/globals.css";

interface CarouselProps {
  images: string[];
}

const Carousel: React.FC<CarouselProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(
      () =>
        setCurrentIndex((prevIndex) =>
          prevIndex === images.length - 1 ? 0 : prevIndex + 1
        ),
      3000
    );

    return () => {
      resetTimeout();
    };
  }, [currentIndex, images.length]);

  return (
    <div className="relative w-full overflow-hidden bg-blue-200 top-32">
      <div className="flex items-center justify-center font-bold text-4xl pb-5 mt-5">
        <h1>PRODUCTS</h1>
      </div>
      <div
        className="flex items-center transition-transform duration-1000 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((image, index) => (
          // Center images from here
          <div
            className="min-w-full flex items-center justify-center flex-shrink-0"
            key={index}
          >
            <Image
              src={image}
              alt={`Slide ${index}`}
              //   objectFit="cover"
              width={600}
              height={400}
            />
          </div>
        ))}
      </div>
      <div className="absolute bottom-0 left-0 right-0 flex justify-center pb-4">
        {images.map((_, idx) => (
          <div
            key={idx}
            className={`h-2 w-2 rounded-full mx-1 transition-all duration-300 ${
              idx === currentIndex ? "bg-purple-500" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
