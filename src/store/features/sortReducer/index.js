import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    sortPrimary: "reactions",
    sortSecondary: "userName",
};

const sortSlice = createSlice({
    name: "sortReducer",
    initialState,
    reducers: {
        setSortPrimary: (state, { payload }) => {
            state.sortPrimary = payload
        },
        setSortSecondary: (state, { payload }) => {
            state.sortSecondary = payload
        },
    }
});

export const { setSortPrimary, setSortSecondary } = sortSlice.actions;
export default sortSlice.reducer;

///////////////// dev
// eslint-disable-next-line no-unused-vars
function log(it, comments="value: ") {
    console.log(comments, it);
}