import {fork, take, select, put, delay, call} from "redux-saga/effects";
import { axiosGetAuth } from "../../../_helpers";
import { alertClear, alertError, alertLoading } from "../../features/sliceAlerts";
import { loginSuccess, loginReject, logout } from "../../features/sliceAuth";

const baseUrl = "https://dummyjson.com";

function* handleError(error) {
  console.error("error.stack: ", error.stack);
  yield put(alertError(error.message));
}


function* getAuth(credentials) {
  try {
    //initiating loading icon
    yield put(alertLoading("Loading"));

    //checking download time:
    const startTime = Date.now();

    const res = yield call(axiosGetAuth, `${ baseUrl }/auth/login`, "authUser", 1, credentials);
    log(res, "res at getAuth: ");

    yield put(loginSuccess());


    //if the download time lest than 500ms then to imitate loading with delay(1000)
    if ((Date.now() - startTime) < 500) yield delay(1000);
    //removing alert loading
    yield put(alertClear());

  } catch (e) {
    yield call(handleError, e);
  }

}

function* watchLogin() {
  while (true) {
    const { payload } = yield take("SUBMIT_LOGIN");
    yield call(getAuth, payload);

    //log(payload, "login data: ");
  }
}

export function* authWatcher() {
  yield fork(watchLogin);
}

///////////////// dev
// eslint-disable-next-line no-unused-vars
function log(it, comments = "value: ") {
  console.log(comments, it);
}