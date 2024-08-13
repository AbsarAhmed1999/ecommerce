"use client";
import React from "react";
import { ProductCard } from "@/Components/ProductCard/ProductCard";

export interface Product {
  name: string;
  price: number;
  sentence: string;
  image: string;
  id: number;
  quantity: number;
}

export default function Dashboard({
  filteredData,
}: {
  filteredData: Product[];
}) {
  return (
    <div className="dashboard-page">
      <div className="product-list">
        {filteredData.map((value: Product) => {
          const { name, price, image, sentence, id, quantity } = value;
          return (
            <ProductCard
              key={id} // added key prop
              id={id}
              name={name}
              price={price}
              sentence={sentence}
              image={image}
              quantity={quantity}
            />
          );
        })}
      </div>
    </div>
  );
}
