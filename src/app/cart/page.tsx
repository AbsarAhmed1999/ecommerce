// Components/CartPage.tsx
"use client";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAppSelector, useAppDispatch } from "@/app/redux/hooks";
import {
  selectCartItems,
  removeItem,
  clearCart,
} from "@/app/redux/slices/Cart"; // adjust this path based on your actual file structure
import CircularIndeterminate from "@/Components/Loading";
import { useAuthCheck } from "../Auth/useAuthCheck";
import { Button } from "@mui/material";
import BackButton from "@/Components/BackButton/BackButton";
const CartPage = () => {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector(selectCartItems);
  // const [loading, setLoading] = useState(true);

  const handleRemoveItem = (id: number) => {
    dispatch(removeItem({ id }));
  };
  const loading = useAuthCheck();

  const totalAmount = cartItems.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  const clearAllItems = () => {
    dispatch(clearCart());
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <CircularIndeterminate />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-600 p-6">
      <BackButton className="mb-4 absolute top-10 left-10">Go Back</BackButton>
      <h1 className="text-4xl font-extrabold text-white mb-8">Your Cart</h1>
      {cartItems.length === 0 ? (
        <p className="text-xl text-white">Your cart is empty</p>
      ) : (
        <div className="w-full max-w-4xl bg-white shadow-2xl rounded-lg p-6">
          <ul>
            {cartItems.map((item) => (
              <li
                key={item.id}
                className="flex items-center justify-between p-4 border-b last:border-none"
              >
                <div className="flex items-center">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-20 w-20 rounded-lg object-cover"
                  />
                  <div className="ml-6">
                    <h2 className="text-xl font-bold text-gray-800">
                      {item.name}
                    </h2>
                    <p className="text-gray-600">${item.price}</p>
                    <p className="text-gray-500">Quantity: {item.quantity}</p>
                  </div>
                </div>
                <div>
                  <button
                    onClick={() => handleRemoveItem(item.id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg shadow-md transition duration-200"
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className="text-right mt-6">
            <p className="text-xl font-semibold text-gray-800">
              Total Amount:{" "}
              <span className="text-green-600">${totalAmount.toFixed(2)}</span>
            </p>
          </div>
        </div>
      )}
      <Button
        onClick={clearAllItems}
        variant="contained"
        size="medium"
        className=" bg-gray-800 hover:bg-gray-900 text-white px-6 py-3 rounded-lg shadow-md transition duration-200 relative top-5"
      >
        Clear All Items
      </Button>
    </div>
  );
};

export default CartPage;
