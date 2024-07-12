"use client";
import Contact from "@/Components/Contact";
import Navbar from "@/Components/Navbar/navbar";
import Register from "@/Components/Register";
import Footer from "@/Components/footer/footer";
import Carousel from "@/Components/reactCrousel/Craousel";
import Image from "next/image";
// import data from "@/data/product.json";
export default function Home() {
  const images = [
    "/product2.jpg",
    "/product3.jpg",
    "/product2.jpg",
    "/product3.jpg",
    "/product2.jpg",
    "/product3.jpg",
  ];
  const makeApiCall = async () => {
    const result = await fetch("/api/hello", {
      method: "POST",
      body: JSON.stringify({ text: "WORLD" }),
    });
    console.log(result);
  };
  return (
    <div className="w-full min-h-full bg-blue-900">
      <Navbar loggedIn={false} />
      <Carousel images={images} />
      <section id="contact" className=" mt-20">
        <Contact />
      </section>
      {/* <section id="register">
        <Register />
      </section> */}
      <section>
        <Footer />
      </section>
    </div>
    // <div>
    //   <button onClick={makeApiCall}>Make API CALL</button>
    // </div>
  );
}
