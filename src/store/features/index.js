import { combineReducers } from "redux";
import reducerAlerts from "./sliceAlerts";
import reducerPosts from "./slicePosts";
import reducerSort from "./sliceSort";
import reducerUsers from "./sliceUsers";

const rootReducer = combineReducers({
    stateAlerts: reducerAlerts,
    stateSort: reducerSort,
    statePosts: reducerPosts,
    stateUsers: reducerUsers
});

export default rootReducer;