import { call, fork, put, take, all, delay } from "redux-saga/effects";
import { getAndStore } from "../../../api";
import { alertClear, alertError, alertLoading } from "../../features/sliceAlerts";
import { setPosts, setPostActive } from "../../features/slicePosts";
import { setUsers } from "../../features/sliceUsers";

const baseUrl = "https://dummyjson.com";
const patternSelectUsers = ["image", "firstName", "lastName", "username", "password"];

function* loadData() {
    try {
        //measuring time of loading: if time of loading is less than 1000ms then to simulate loading with delay(1000)
        const alertStartTime = Date.now();
        //initiating loading icon
        yield put(alertLoading("Loading"));
        //getting data of posts and users.
        // Motivation: to combine both data for showing the posts and the following users` data for each post...
        const [ dataPosts, dataUsers ] = yield all([
            yield call(getAndStore, `${ baseUrl }/posts?limit=0`, "posts", 1),
            yield call(
                getAndStore,
                `${ baseUrl }/users?limit=0&select=${ patternSelectUsers.join(",") }`,
                "users",
                1
            )
        ]);
        if (alertStartTime - Date.now() < 1000 ) {
            yield delay(1000);
        }

        //log(dataPosts, "dataPosts: ");
        //log(dataUsers, "dataUsers: ");

        yield put(setPosts(dataPosts));
        yield put(setUsers(dataUsers));

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
    yield call(loadData);
    yield fork(watchPostActivate);
}


///////////////// dev
// eslint-disable-next-line no-unused-vars
function log(it, comments="value: ") {
    console.log(comments, it);
}