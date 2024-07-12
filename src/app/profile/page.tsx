"use client";
import Link from "next/link";
import { useAppSelector } from "../redux/hooks";
// import Layout from "../components/Layout";

const products = [
  { id: 1, name: "Product 1", description: "Description for product 1" },
  { id: 2, name: "Product 2", description: "Description for product 2" },
  { id: 3, name: "Product 3", description: "Description for product 3" },
];

export default function Profile() {
  const cart = useAppSelector((state) => state.cart);
  return (
    <div className="profile-page">
      <div className="profile-sidebar">
        <img className="profile-icon" />
        <h2>USer {cart}</h2>
      </div>
      <div className="product-list">
        <h1>Products</h1>
        <ul>
          {products.map((product) => (
            <li key={product.id}>
              <Link href={`/product/${product.id}`}>{product.name}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
