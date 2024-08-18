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
// import data from "@/data/product.json";
export default function Home() {
  // const images = [
  //   "/remove.png",
  //   "/remove1.png",
  //   "/remove2.png",
  //   "/remove.png",
  //   "/remove1.png",
  //   "/remove2.png",
  // ];
  return (
    // <div>
    //   <div className="w-full h-auto bg-white pt-28">
    //     <Navbar loggedIn={false} />
    //   </div>
    //   <div className="bg-gray-800 ">
    //     <SectionOne />
    //   </div>
    //   <div>
    //     <AboutUs />
    //   </div>
    //   <div>{/* <Carousel images={images} /> */}</div>
    //   <div id="contact">
    //     <Contact />
    //   </div>
    //   <Footer />
    // </div>
    <div>
      {/* <Navbar loggedIn={false} /> */}
      <HeroSection />
      <AboutUs />
      <ProductSection />
    </div>
  );
}
