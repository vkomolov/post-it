import { fork } from "redux-saga/effects";

import { postWatcher } from "./sagasPosts";
import { sortWatcher } from "./sagasSort";
import { authWatcher } from "./sagasAuth";

export default function* rootSaga() {
    yield fork(postWatcher);
    yield fork(sortWatcher);
    yield fork(authWatcher);
}


///////////////// dev
// eslint-disable-next-line no-unused-vars
function log(it, comments="value: ") {
    console.log(comments, it);
}