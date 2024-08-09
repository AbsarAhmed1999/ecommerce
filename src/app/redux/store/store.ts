import { configureStore } from "@reduxjs/toolkit";
import { CartSlice } from "../slices/Cart/index";
// import todoReducer from "./features/todo-slice";

export const store = configureStore({
  reducer: {
    cart: CartSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
