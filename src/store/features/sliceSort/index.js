import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    sortPrimary: "reactions",
    sortSecondary: "id",
    filterBy: null,
};

const sliceSort = createSlice({
    name: "reducerSort",
    initialState,
    reducers: {
        setSortPrimary: (state, { payload }) => {
            state.sortPrimary = payload
        },
        setSortSecondary: (state, { payload }) => {
            state.sortSecondary = payload
        },
        setFilterBy: (state, { payload }) => ({
            ...state,
            filterBy: payload
        }),
        resetFilterBy: state => ({
            ...state,
            filterBy: null,
        }),
    }
});

export const { setSortPrimary, setSortSecondary, setFilterBy, resetFilterBy } = sliceSort.actions;
export default sliceSort.reducer;

///////////////// dev
// eslint-disable-next-line no-unused-vars
function log(it, comments="value: ") {
    console.log(comments, it);
}