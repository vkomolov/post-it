import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    postActive: {
        id: null,
        userId: null,
        title: null,
        body: null,
        firstName: null,
        lastName: null,
        image: null,
    },
    viewed: [],
    comments: []
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
        },
        addComments: (state, { payload }) => {
            state.comments = payload;
        }
    }
});

export const { setPostActive, addViewed, addComments } = sliceActivePost.actions;
export default sliceActivePost.reducer;