import { fork } from "redux-saga/effects";

import { postWatcher } from "./sagasPosts";
import { sortWatcher } from "./sagasSort";
import { usersWatcher } from "./sagasUsers";

export const baseUrl = "https://dummyjson.com";


export default function* rootSaga() {
    yield fork(postWatcher);
    yield fork(usersWatcher);
    yield fork(sortWatcher);
}


///////////////// dev
// eslint-disable-next-line no-unused-vars
function log(it, comments="value: ") {
    console.log(comments, it);
}