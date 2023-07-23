import { take, put } from "redux-saga/effects";
import { setSortPrimary, setSortSecondary } from "../../features/sortReducer";

const sortObj = {
    reactions: () => setSortPrimary("reactions"),
    id: () => setSortPrimary("id"),
    userName: () => setSortSecondary("userName"),
    title: () => setSortSecondary("title")
};

export function* sortWatcher() {
    //the last taken sortName for avoiding repeats
    let lastTaken = null;

    while (true) {
        const { payload } = yield take("SET_SORTING");

        if (lastTaken !== payload && payload in sortObj) {
            yield put(sortObj[payload]());
        }
    }
}

///////////////// dev
// eslint-disable-next-line no-unused-vars
function log(it, comments="value: ") {
    console.log(comments, it);
}