import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    users: [],
};

const sliceUsers = createSlice({
    name: "reducerUsers",
    initialState,
    reducers: {
        setUsers: (state, { payload }) => {
            state.users = payload;
        },
        addUser: (state, { payload }) => {
            state.users.push(payload);
        },
        deleteUser: (state, { payload }) => {
            state.users = state.users.filter(user => user.id !== payload)
        },
        updateUser: (state, { payload }) => {
            const searchedUser = state.users.find(user => user.id === payload.id);
            //!!mutating the reference to the target user in the state array of users
            Object.assign(searchedUser, payload);
        }
    }
});

export const { setUsers, addUser, deleteUser, updateUser } = sliceUsers.actions;
export default sliceUsers.reducer;

