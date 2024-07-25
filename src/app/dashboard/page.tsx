"use client";
import Link from "next/link";
import { useAppSelector } from "../redux/hooks";
import { ProductCard } from "@/Components/ProductCard/ProductCard";
import ImageAvatars from "@/Components/Avatar";
import { useEffect } from "react";
// import Layout from "../components/Layout";

export default function Dashboard() {
  useEffect(() => {});

  const cart = useAppSelector((state) => state.cart);
  return (
    <div className="dashboard-page">
      {/* // Product list */}

      <ProductCard />
    </div>
  );
}
