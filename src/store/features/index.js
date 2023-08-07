import { combineReducers } from "@reduxjs/toolkit";
import reducerAlerts from "./sliceAlerts";
import reducerPosts from "./slicePosts";
import reducerSort from "./sliceSort";
import reducerUsers from "./sliceUsers";
import reducerActivePost from "./sliceActivePost";
import reducerAuth from "./sliceAuth";

const rootReducer = combineReducers({
    stateAlerts: reducerAlerts,
    stateSort: reducerSort,
    statePosts: reducerPosts,
    stateUsers: reducerUsers,
    stateActivePost: reducerActivePost,
    stateAuth: reducerAuth
});

export default rootReducer;