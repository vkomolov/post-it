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
        alertLoading: (state, { payload }) => {
            state.alertType = "loading";
            state.alertContent.push(payload);
        },
        alertError: (state, { payload }) => {
            state.alertType = "error";
            state.alertContent.push(payload)
        }
    }
});

export const { alertClear, alertError, alertLoading } = sliceAlerts.actions;
export default sliceAlerts.reducer;