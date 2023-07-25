import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    sortPrimary: "reactions",
    sortSecondary: "id",
};

const sliceSort = createSlice({
    name: "sortSlice",
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

export const { setSortPrimary, setSortSecondary } = sliceSort.actions;
export default sliceSort.reducer;

///////////////// dev
// eslint-disable-next-line no-unused-vars
function log(it, comments="value: ") {
    console.log(comments, it);
}