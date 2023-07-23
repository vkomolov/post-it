import { fork } from "redux-saga/effects";

import { postWatcher } from "./postSagas";
import { sortWatcher } from "./sortSagas";


export default function* rootSaga() {
    //yield fork(postWatcher);
    yield fork(sortWatcher);
}


///////////////// dev
// eslint-disable-next-line no-unused-vars
function log(it, comments="value: ") {
    console.log(comments, it);
}