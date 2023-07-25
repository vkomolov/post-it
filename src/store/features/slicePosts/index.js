import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    posts: [],
    total: null,
    skip: 0,
    limit: 0,
    postActive: null
};

const slicePosts = createSlice({
    name: "postReducer",
    initialState,
    reducers: {
        setPosts: (state, { payload }) => {
            Object.assign(state, payload)
        },
        setPostActive: (state, { payload }) => {
            state.postActive = payload;
        }
    }
});

export const { setPosts, setPostActive } = slicePosts.actions;
export default slicePosts.reducer;