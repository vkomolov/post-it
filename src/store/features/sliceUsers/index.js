import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    users: [],
    total: 0,
    skip: 0,
    limit: 0
};

const sliceUsers = createSlice({
    name: "usersReducer",
    initialState,
    reducers: {
        setUsers: (state, { payload }) => {
            Object.assign(state, payload)
        },
        addUser: (state, { payload }) => {
            state.users.push(payload);
        },
        deleteUser: (state, { payload }) => {
            state.users = state.users.filter(user => user.id === payload)
        },
        updateUser: (state, { payload }) => {
            const searchedUser = state.users.find(user => user.id === payload.id);
            //!!mutating object in slice reducer with Immer
            Object.assign(searchedUser, payload);


/*            state.users = state.users.reduce((newArr, user) => {
                if (user.id === payload.id) {
                    newArr.push(Object.assign(user, payload));
                } else {
                    newArr.push(user);
                }
                return newArr;
            }, []);*/
        }
    }
});

export const { setUsers, addUser, deleteUser, updateUser } = sliceUsers.actions;
export default sliceUsers.reducer;

