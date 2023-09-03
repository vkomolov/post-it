import { take, put } from "redux-saga/effects";
import { setSortPrimary, setSortSecondary, setFilterBy, resetFilterBy } from "../../features/sliceSort";
import { actionTypes } from "../../../_constants";

const sortObj = {
    firstName: () => setSortPrimary("firstName"),
    reactions: () => setSortPrimary("reactions"),
    title: () => setSortSecondary("title"),
    id: () => setSortSecondary("id"),
};

export function* sortWatcher() {
    //the last taken sortName for avoiding repeats at click events (any way the reducer will not change with the
    //same data)
    let lastTaken = null;

    while (true) {
        const { payload } = yield take(actionTypes.SET_SORTING);

        if (lastTaken !== payload) {
            lastTaken = payload;

            if (payload in sortObj) {
                yield put(sortObj[payload]());
            } else {
                if (payload === "filterReset") {
                    yield put(resetFilterBy());
                } else {
                    yield put(setFilterBy(payload));
                }
            }
        }

    }
}

///////////////// dev
// eslint-disable-next-line no-unused-vars
function log(it, comments="value: ") {
    console.log(comments, it);
}