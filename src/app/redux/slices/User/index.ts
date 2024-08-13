import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "@/app/redux/store/store";
interface UserState {
  fullName: string | null;
  profileImage: string | null;
}

const initialState: UserState = {
  fullName: null,
  profileImage: null,
};

export const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.fullName = action.payload.fullName;
      state.profileImage = action.payload.profileImage;
    },
    // clearUser: (state) => {
    //   state.user = null;
    // },
  },
});

export const { setUser } = UserSlice.actions;
export const selectUser = (state: RootState) => state.user;
export default UserSlice.reducer;
