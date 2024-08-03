import { createSlice } from "@reduxjs/toolkit";

export interface ICartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export interface CartState {
  items: ICartItem[];
  totalAmount: 0;
}

const initialState: CartState = { items: [], totalAmount: 0 };

export const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);
      if (!existingItem) {
        state.items.push({
          ...newItem,
          quantity: 1,
        });
      } else {
        existingItem.quantity++;
      }
      state.totalAmount += newItem.price;
    },
    removeItem: () => {},
    clearCart: () => {},
  },
});

export const { addItem } = CartSlice.actions;
export default CartSlice.reducer;
