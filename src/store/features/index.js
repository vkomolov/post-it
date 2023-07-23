import { combineReducers } from "redux";
import alertReducer from "./alertSlice";
import dataReducer from "./dataSlice";
import sortReducer from "./sortReducer";

const rootReducer = combineReducers({
    alertState: alertReducer,
    sortState: sortReducer,
    dataState: dataReducer
});

export default rootReducer;