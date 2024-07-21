"use client";
import Link from "next/link";
import { useAppSelector } from "../redux/hooks";
import { ProductCard } from "@/Components/ProductCard/ProductCard";
import ImageAvatars from "@/Components/Avatar";
import { useEffect } from "react";
// import Layout from "../components/Layout";

export default function Dashboard() {
  // useEffect(() => {
  //   async function getData() {
  //     try {
  //       const response = await fetch("/api/protected", {
  //         credentials: "include",
  //       });
  //       console.log("FRONTEND RESPOSNE", response);
  //       if (!response.ok) {
  //         console.log("TOKEN NOT FOUND");
  //       }

  //       const data = await response.json();
  //       console.log(data.message);
  //     } catch (e) {
  //       console.log("ERROR", e);
  //     }
  //   }
  //   getData();
  // }, []);
  const cart = useAppSelector((state) => state.cart);
  return (
    <div className="dashboard-page">
      <ProductCard />
    </div>
  );
}
