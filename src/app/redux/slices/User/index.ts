import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "@/app/redux/store/store";
import mongoose from "mongoose";
interface UserState {
  _id: string | null;
  fullName: string | null;
  profileImage: string | null;
  email: string | null;
  userType: string | null;
}

const initialState: UserState = {
  _id: null,
  fullName: null,
  profileImage: null,
  email: null,
  userType: null,
};

export const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.fullName = action.payload.fullName;
      state.profileImage = action.payload.profileImage;
      state.email = action.payload.email;
      state._id = action.payload._id;
      state.userType = action.payload.userType;
    },
    // clearUser: (state) => {
    //   state.user = null;
    // },
  },
});

export const { setUser } = UserSlice.actions;
export const selectUser = (state: RootState) => state.user;
export default UserSlice.reducer;
