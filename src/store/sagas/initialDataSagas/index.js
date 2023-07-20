import { call } from "redux-saga/effects";
import { getAndStore } from "../../../api";

export function* getInitialData(jsonUrl, storeName) {
    const innData = yield call(getAndStore, jsonUrl, storeName, 1);

    return innData;
}


///////////////// dev
// eslint-disable-next-line no-unused-vars
function log(it, comments="value: ") {
    console.log(comments, it);
}