import { all, call, fork, put } from "redux-saga/effects";
import { alertClear, alertError, alertLoading } from "../../features/sliceAlerts";
import { getAndStore } from "../../../api";
import { setUsers } from "../../features/sliceUsers";
import { baseUrl } from "../index";

//const patternSelectUsers = "image, firstName, lastName, email, age, gender, username, password";
const patternSelectUsers = ["image", "firstName", "lastName", "email", "age", "gender", "username", "password"];

function* loadUsers() {
    try {
        yield put(alertLoading("Loading"));
        const dataUsers = yield call(
            getAndStore,
            `${ baseUrl }/users?limit=0&select=${ patternSelectUsers.join(",") }`,
            "users",
            1
        );

        //log(dataUsers, "dataUsers: ");

        yield put(setUsers(dataUsers));

        //removing alert loading
        yield put(alertClear());

    } catch (e) {
        yield put(alertError(e.message));
        console.error(e.stack);
    }
}

export function* usersWatcher() {
    //initial fetching users, blocking till it loads...
    yield call(loadUsers);
}


///////////////// dev
// eslint-disable-next-line no-unused-vars
function log(it, comments="value: ") {
    console.log(comments, it);
}