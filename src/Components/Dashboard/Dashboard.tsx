"use client";
import React from "react";
import { ProductCard } from "@/Components/ProductCard/ProductCard";

export interface Product {
  name: string;
  price: number;
  sentence: string;
  image: string;
  id: number;
  quantity?: number;
}

export default function Dashboard({
  filteredData,
}: {
  filteredData: Product[];
}) {
  return (
    <div className="dashboard-page">
      <div
        className="
          grid 
          grid-cols-1 
          gap-6 
          sm:grid-cols-2 
          lg:grid-cols-3 
          xl:grid-cols-4 
          px-4 
          md:px-8
        "
      >
        {filteredData.map((value: Product) => {
          const { name, price, image, sentence, id, quantity } = value;
          return (
            <ProductCard
              key={id}
              id={id}
              name={name}
              price={Number(price)}
              sentence={sentence}
              image={image}
              quantity={quantity ?? 1}
            />
          );
        })}
      </div>
    </div>
  );
}
