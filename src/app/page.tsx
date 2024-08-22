"use client";
import Contact from "@/Components/Contact";
import Navbar from "@/Components/Navbar/navbar";
import SectionOne from "@/Components/SectionOne";
import Footer from "@/Components/footer/footer";
import Carousel from "@/Components/reactCrousel/Craousel";
import Image from "next/image";
import "@/app/globals.css";
import AboutUs from "@/Components/AboutUs";
import HeroSection from "@/Components/HeroSection/HeroSection";
import ProductSection from "@/Components/ProductSection/ProductSection";
import { useEffect } from "react";
// import data from "@/data/product.json";
export default function Home() {
  useEffect(() => {
    const progressBar = document.querySelector(
      ".progress"
    ) as HTMLDivElement | null;

    const updateProgress = () => {
      if (!progressBar) return; // Check if progressBar is not null

      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight;
      const winHeight = window.innerHeight;
      const scrollPercent = (scrollTop / (docHeight - winHeight)) * 100;

      progressBar.style.width = `${scrollPercent}%`;
    };

    window.addEventListener("scroll", updateProgress);

    // Initial update in case the page is loaded with some scroll
    updateProgress();

    return () => {
      window.removeEventListener("scroll", updateProgress);
    };
  }, []);
  return (
    <div>
      <div className="progress"></div>
      <HeroSection />
      <AboutUs />
      <ProductSection />
    </div>
  );
}
