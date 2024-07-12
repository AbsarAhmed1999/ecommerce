import { createSlice } from "@reduxjs/toolkit";

export const CartSlice = createSlice({
  initialState: 0,
  name: "cart",
  reducers: {
    increment: (state) => state + 1,
    decrement: (state) => state - 1,
  },
});

export const { increment, decrement } = CartSlice.actions;
export default CartSlice.reducer;
