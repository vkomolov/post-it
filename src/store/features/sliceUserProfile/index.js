import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  profile: null,
};

const sliceUserProfile = createSlice({
  name: "reducerUserProfile",
  initialState,
  reducers: {
    setUserProfile: (state, { payload }) => {
      state.profile = payload;
    },
    updateUserProfile: (state, { payload }) => Object.assign(state.profile, payload),
    resetUserProfile: state => Object.assign(state, initialState),
  }
});

export const { setUserProfile, resetUserProfile, updateUserProfile } = sliceUserProfile.actions;
export default sliceUserProfile.reducer;
