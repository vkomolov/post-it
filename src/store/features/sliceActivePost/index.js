import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    postActive: {
        id: null,
        userId: null,
        title: null,
        body: null,
    },
    viewed: [],
};

const sliceActivePost = createSlice({
    name: "activePostReducer",
    initialState,
    reducers: {
        setPostActive: (state, { payload }) => {
            state.postActive = payload;
        },
        addViewed: (state, { payload }) => {
            state.viewed = payload;
        }
    }
});

export const { setPostActive, addViewed } = sliceActivePost.actions;
export default sliceActivePost.reducer;