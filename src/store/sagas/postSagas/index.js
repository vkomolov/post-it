import { call, put } from "redux-saga/effects";
import { getAndStore } from "../../../api";
import { alertClear, alertError, alertLoading } from "../../features/alertSlice";
import { setData } from "../../features/dataSlice";

const baseUrl = "https://dummyjson.com/";

function* loadInitialData() {
    try {
        yield put(alertLoading("Loading"));
        const dataPosts = yield call(getAndStore, `${ baseUrl }/posts`, "posts", 1);

        yield put(setData(dataPosts));
        //removing alert loading
        yield put(alertClear());

    } catch (e) {
        yield put(alertError(e.message));
        console.error(e.stack);
    }
}

export function* postWatcher() {
    yield call(loadInitialData);
}


///////////////// dev
// eslint-disable-next-line no-unused-vars
function log(it, comments="value: ") {
    console.log(comments, it);
}