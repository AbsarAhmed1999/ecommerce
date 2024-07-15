"use client";
import Link from "next/link";
import { useAppSelector } from "../redux/hooks";
import { ProductCard } from "@/Components/ProductCard/ProductCard";
// import Layout from "../components/Layout";

export default function Dashboard() {
  const cart = useAppSelector((state) => state.cart);
  return (
    <div className="dashboard-page">
      <ProductCard />
    </div>
  );
}
