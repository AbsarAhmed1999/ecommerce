import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "@/app/redux/store/store";
import mongoose from "mongoose";
interface UserState {
  id: string | null;
  fullName: string | null;
  profileImage: string | null;
  email: string | null;
}

const initialState: UserState = {
  id: null,
  fullName: null,
  profileImage: null,
  email: null,
};

export const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.fullName = action.payload.fullName;
      state.profileImage = action.payload.profileImage;
      state.email = action.payload.email;
      state.id = action.payload.id;
    },
    // clearUser: (state) => {
    //   state.user = null;
    // },
  },
});

export const { setUser } = UserSlice.actions;
export const selectUser = (state: RootState) => state.user;
export default UserSlice.reducer;
