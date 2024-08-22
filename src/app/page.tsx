"use client";
import "@/app/globals.css";
import AboutUs from "@/Components/AboutUs";
import CustomerReviews from "@/Components/CustomerReviews/CustomerReviews";
import Footer from "@/Components/footer/footer";
import HeroSection from "@/Components/HeroSection/HeroSection";
import ProductSection from "@/Components/ProductSection/ProductSection";
import { useEffect } from "react";
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
      <CustomerReviews />
      <Footer />
    </div>
  );
}
