import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  authError: null,
  loggedUser: null,
};

const sliceAuth = createSlice({
  name: "reducerAuth",
  initialState,
  reducers: {
    loginSuccess: (state, { payload }) => {
      state.authError = null;
      state.loggedUser = payload;
    },
    loginReject: (state, { payload }) => {
      state.authError = payload;
      state.loggedUser = null;
    },
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