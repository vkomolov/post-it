import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    alertType: null,
    alertContent: []
};

const sliceAlerts = createSlice({
    name: "reducerAlerts",
    initialState,
    reducers: {
        alertClear: state => {
            Object.assign(state, initialState);
        },
        alertLoading: (state, { payload }) => handlePayload(state, payload, "loading"),
        alertError: (state, { payload }) => handlePayload(state, payload, "error"),
    }
});

export const { alertClear, alertError, alertLoading } = sliceAlerts.actions;
export default sliceAlerts.reducer;

function handlePayload(state, payload, alertType) {
    return state.alertType === alertType
        ? {
            ...state,
            alertContent: [
                ...state.alertContent,
                payload
            ],
        }
        : {
            ...state,
            alertType,
            alertContent: [payload],
        };
}

///////////////// dev
// eslint-disable-next-line no-unused-vars
function log(it, comments = "value: ") {
    console.log(comments, it);
}