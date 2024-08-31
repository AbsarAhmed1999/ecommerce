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

// used to define basic types
export interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  sentence: string;
  quantity: number;
}

// used to define types
export interface CartState {
  items: CartItem[];
  totalAmount: number;
}

// Used to initalize first time
const initialState: CartState = {
  items: [],
  totalAmount: 0,
};

export const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<CartItem>) => {
      const newItem = action.payload;
      console.log("ACTION.payload", action.payload);
      const existingItem = state.items.find((item) => item.id === newItem.id);
      if (!existingItem) {
        state.items.push({
          ...newItem,
          quantity: 1,
        });
      } else {
        existingItem.quantity++;
      }

      state.totalAmount += newItem.price; // Directly add price without conversion
    },
    removeItem: (state, action: PayloadAction<{ id: number }>) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );

      if (existingItem) {
        state.totalAmount -= existingItem.price; // Directly subtract price without conversion
        if (existingItem.quantity === 1) {
          state.items = state.items.filter(
            (item) => item.id !== action.payload.id
          );
        } else {
          existingItem.quantity--;
        }
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.totalAmount = 0;
    },
  },
});

export const { addItem, removeItem, clearCart } = CartSlice.actions;

// Selector to get cart items
export const selectCartItems = (state: RootState) => state.cart.items;
export const selectCartItemsCount = (state: RootState) =>
  state.cart.items.length;
export const selectTotalAmount = (state: RootState) => state.cart.totalAmount;

export default CartSlice.reducer;
