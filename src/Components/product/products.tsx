// components/ProductGrid.js
import React from "react";
import products from "../../data/product.json"; // Correct import statement
const ProductGrid = () => {
  return (
    <div>
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 p-4">
          {products.map(
            (
              product // Use 'products' array and 'product' variable
            ) => (
              <div
                // key={product.id}
                className="group relative w-auto overflow-hidden rounded-lg shadow-lg"
              >
                <div>
                  <img
                    // src={product.imageSrc}
                    alt={product.name}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <div className="font-bold text-center mt-5 text-gray-800">
                    {product.name}
                  </div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg">
                  <button className="bg-blue-500 text-white py-2 px-4 rounded-full">
                    Add to cart
                  </button>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductGrid;
