import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  profile: null,
};

const sliceUserProfile = createSlice({
  name: "reducerUserProfile",
  initialState,
  reducers: {
    setUserProfile: (state, { payload }) => {
      state.profile = payload
    },
    resetUserProfile: state => {
      Object.assign(state, initialState);
    }
  }
});

export const { setUserProfile, resetUserProfile } = sliceUserProfile.actions;
export default sliceUserProfile.reducer;
