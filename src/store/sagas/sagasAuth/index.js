import { takeEvery, put, call, fork } from "redux-saga/effects";
import { initAxios, localForageSet, localForageRemove } from "../../../_helpers";
import { handleError } from "../index";
import { alertClear, alertLoading } from "../../features/sliceAlerts";
import { actionTypes, BASE_URL, storageNames } from "../../../_constants";
import { loginSuccess, loginReset, logout } from "../../features/sliceAuth";


function* checkToken(jwtToken) {
  const tokenData = yield JSON.parse(atob(jwtToken.split(".")[1])) || null;
  if (tokenData.exp > Math.floor(Date.now()/1000)) {
    log("token is fresh");
    return true;
  }
  return false;
}

function* submitLogin({ payload }) {
  try {
    //initiating loading icon
    yield put(alertLoading("Loading"));

    const config = {
      method: "POST",
      data: {
        ...payload,
        expiresInMins: 5,
      }
    };

    const res = yield call(initAxios, `${BASE_URL}/auth/login`, config);

    const isTokenFresh = yield call(checkToken, res.token);
    log(isTokenFresh.toString(), "is token fresh:");

    //storing usename and password for refetching fresh token, API does not offer refresh token: one token with
    //limited valid period
    yield fork(localForageSet, storageNames.LOGGED_USER, {
      ...payload,
      token: res.token
    });

    yield put(loginSuccess(res));
    //removing alert loading
    yield put(alertClear());
  } catch (e) {
    yield call(handleError, e);
  }
}

function* submitLogout() {
  yield call(localForageRemove, storageNames.LOGGED_USER);
  yield put(logout());
}

function* resetAuth() {
  yield call(localForageRemove, storageNames.LOGGED_USER);
  yield put(loginReset());
}

export function* authWatcher() {
  yield takeEvery(actionTypes.SUBMIT_LOGIN, submitLogin);
  yield takeEvery(actionTypes.LOGIN_RESET, resetAuth);
  yield takeEvery(actionTypes.SUBMIT_LOGOUT, submitLogout);
}

///////////////// dev
// eslint-disable-next-line no-unused-vars
function log(it, comments = "value: ") {
  console.log(comments, it);
}