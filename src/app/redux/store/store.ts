// import { configureStore } from "@reduxjs/toolkit";
// import { CartSlice } from "../slices/Cart/index";
// import { UserSlice } from "../slices/User/index";
// // import todoReducer from "./features/todo-slice";

// export const store = configureStore({
//   reducer: {
//     cart: CartSlice.reducer,
//     user: UserSlice.reducer,
//   },
// });

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;

import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import { persistReducer, persistStore } from "redux-persist";
import { UserSlice } from "../slices/User/index"; // Adjust path accordingly
import { CartSlice } from "../slices/Cart/index";

import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
// Create the persist config
const persistConfig = {
  key: "root",
  storage,
};

// Combine reducers
const rootReducer = combineReducers({
  user: UserSlice.reducer,
  cart: CartSlice.reducer,
  // Add other slices here
});

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Export the persistor
export const persistor = persistStore(store);
