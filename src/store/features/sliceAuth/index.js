import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isGranted: false,
  isRejected: false,
  accessToken: null,
};

const sliceAuth = createSlice({
  name: "reducerAuth",
  initialState,
  reducers: {
    loginSuccess: (state, { payload }) => {
      state.isGranted = true;
      state.isRejected = false;
      state.accessToken = payload;
    },
    loginReject: state => ({
      ...state,
      isRejected: true,
    }),
    logout: state => {
      Object.assign(state, initialState);
    }
  }
});

export const { loginSuccess, loginReject, logout } = sliceAuth.actions;
export default sliceAuth.reducer;

///////////////// dev
// eslint-disable-next-line no-unused-vars
function log(it, comments = "value: ") {
  console.log(comments, it);
}