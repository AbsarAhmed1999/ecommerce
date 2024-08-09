// import { createSlice } from "@reduxjs/toolkit";

// export interface ICartItem {
//   id: string;
//   name: string;
//   price: number;
//   quantity: number;
// }

// export interface CartState {
//   items: ICartItem[];
//   totalAmount: 0;
// }

// const initialState: CartState = { items: [], totalAmount: 0 };

// export const CartSlice = createSlice({
//   name: "cart",
//   initialState,
//   reducers: {
//     addItem: (state, action) => {
//       const newItem = action.payload;
//       const existingItem = state.items.find((item) => item.id === newItem.id);
//       if (!existingItem) {
//         state.items.push({
//           ...newItem,
//           quantity: 1,
//         });
//       } else {
//         existingItem.quantity++;
//       }
//       state.totalAmount += newItem.price;
//     },
//     removeItem: () => {},
//     clearCart: () => {},
//   },
// });

// export const { addItem } = CartSlice.actions;
// export const selectCartItemsCount = (state: any) => state.cart.items.length;
// export default CartSlice.reducer;
// redux/slices/Cart/index.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/app/redux/store/store";

export interface CartItem {
  id: number;
  name: string;
  price: string;
  // image: string;
  image: string;
  sentence: string;
}

export interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

export const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<Omit<CartItem, "quantity">>) => {
      state.items.push(action.payload);
      // if (itemIndex >= 0) {
      //   state.items[itemIndex].quantity += 1;
      // } else {
      //   const newItem = { ...action.payload, quantity: 1 };
      //   state.items.push(newItem);
      // }
    },
    removeItem: (state, action: PayloadAction<{ id: number }>) => {
      // state.items = state.items.filter((item) => item.id !== action.payload.id);
      state.items = state.items.filter((item) => item.id !== action.payload.id);
    },
  },
});

export const { addItem, removeItem } = CartSlice.actions;

// Selector to get cart items
export const selectCartItems = (state: RootState) => state.cart.items;
export const selectCartItemsCount = (state: { cart: CartState }) =>
  state.cart.items.length;

export default CartSlice.reducer;
