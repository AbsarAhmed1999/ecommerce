// Components/CartPage.tsx
"use client";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAppSelector, useAppDispatch } from "@/app/redux/hooks";
import { selectCartItems, removeItem } from "@/app/redux/slices/Cart"; // adjust this path based on your actual file structure
import CircularIndeterminate from "@/Components/Loading";
import { useAuthCheck } from "../Auth/useAuthCheck";

const CartPage = () => {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector(selectCartItems);
  // const [loading, setLoading] = useState(true);

  const handleRemoveItem = (id: number) => {
    dispatch(removeItem({ id }));
  };
  const loading = useAuthCheck();

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <CircularIndeterminate />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-4">Your Cart</h1>
      {cartItems.length === 0 ? (
        <p className="text-lg">Your cart is empty</p>
      ) : (
        <div className="w-full max-w-4xl bg-white shadow-md rounded-lg p-4">
          <ul>
            {cartItems.map((item) => (
              <li
                key={item.id}
                className="flex items-center justify-between p-2 border-b"
              >
                <div className="flex items-center">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-16 w-16 rounded-md object-cover"
                  />
                  <div className="ml-4">
                    <h2 className="text-lg font-semibold">{item.name}</h2>
                    <p className="text-gray-600">{item.price}</p>
                  </div>
                </div>
                <div>
                  <button
                    onClick={() => handleRemoveItem(item.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-md"
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CartPage;
