"use client";
import React from "react";
import { ProductCard } from "@/Components/ProductCard/ProductCard";

export interface Product {
  name: string;
  price: string;
  sentence: string;
  image: string;
  id: number;
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
          const { name, price, image, sentence, id } = value;
          return (
            <ProductCard
              key={id} // added key prop
              id={id}
              name={name}
              price={price}
              sentence={sentence}
              image={image}
            />
          );
        })}
      </div>
    </div>
  );
}
