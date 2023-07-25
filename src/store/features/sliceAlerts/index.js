import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    alertType: null,
    alertContent: []
};

const sliceAlerts = createSlice({
    name: "alertReducer",
    initialState,
    reducers: {
        alertClear: state => {
            state.alertType = initialState.alertType;
            state.alertContent = initialState.alertContent;
        },
        alertLoading: (state, action) => {
            state.alertType = "loading";
            state.alertContent.push(action.payload);
        },
        alertError: (state, action) => {
            state.alertType = "error";
            state.alertContent.push(action.payload)
        }
    }
});

export const { alertClear, alertError, alertLoading } = sliceAlerts.actions;
export default sliceAlerts.reducer;