import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    postActive: {},
    viewed: [],
    comments: []
};

const sliceActivePost = createSlice({
    name: "reducerActivePost",
    initialState,
    reducers: {
        setPostActive: (state, { payload }) => {
            state.postActive = payload;
            //clearing comments for the new active Post
            state.comments = [];
        },
        setPostComments: (state, { payload }) => {
            state.comments = payload;
        },
        addViewed: (state, { payload }) => {
            state.viewed = payload;
        },
    }
});

export const { setPostActive, setPostComments, addViewed } = sliceActivePost.actions;
export default sliceActivePost.reducer;