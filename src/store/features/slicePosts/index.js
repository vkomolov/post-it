import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    posts: []
};

const slicePosts = createSlice({
    name: "postReducer",
    initialState,
    reducers: {
        setPosts: (state, { payload }) => {
            state.posts = payload;
        },
    }
});

export const { setPosts } = slicePosts.actions;
export default slicePosts.reducer;