import { call, fork, put, take, all } from "redux-saga/effects";
import { getAndStore } from "../../../api";
import { alertClear, alertError, alertLoading } from "../../features/sliceAlerts";
import { setPosts, setPostActive } from "../../features/slicePosts";
import { baseUrl } from "../index";

function* loadPosts() {
    try {
        yield put(alertLoading("Loading"));
        const dataPosts = yield call(getAndStore, `${ baseUrl }/posts?limit=0`, "posts", 1);

        //log(dataPosts, "dataPosts");

        yield put(setPosts(dataPosts));

        //removing alert loading
        yield put(alertClear());

    } catch (e) {
        yield put(alertError(e.message));
        console.error(e.stack);
    }
}

function* watchPostActivate() {
    let last = null;
    while(true) {
        const { payload } = yield take("SET_POST_ACTIVE");
        if (payload !== last) {
            last = payload;
            yield put(setPostActive(last));
        }
    }
}

export function* postWatcher() {
    //initial fetching posts, blocking till it loads...
    yield call(loadPosts);
    yield fork(watchPostActivate);
}


///////////////// dev
// eslint-disable-next-line no-unused-vars
function log(it, comments="value: ") {
    console.log(comments, it);
}