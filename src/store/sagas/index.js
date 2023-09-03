import { call, fork, put } from "redux-saga/effects";

import { postWatcher } from "./sagasPosts";
import { sortWatcher } from "./sagasSort";
import { authWatcher } from "./sagasAuth";
import { localForageRemove } from "../../_helpers";
import { storageNames } from "../../_constants";
import { loginReject } from "../features/sliceAuth";
import { alertError, alertClear } from "../features/sliceAlerts";

export default function* rootSaga() {
  yield fork(postWatcher);
  yield fork(sortWatcher);
  yield fork(authWatcher);
}

export function* handleError(error) {
  if (error.response) {
    if (error.response.status === 400) {
      //removing logged user data and token from localforage...
      yield call(localForageRemove, storageNames.LOGGED_USER);
      yield put(loginReject("Given username or password are not correct"));
      yield put(alertClear());
    } else {
      yield put(alertError(error.message));
      console.error("The request was made and the server responded with a status code out of the range of 2xx",
          error.response);
    }
  } else if (error.request) {
    yield put(alertError(error.message));
    console.error("The request was made but no response was received", error.request);
  } else {
    yield put(alertError(error.message));
    console.error("Something happened in setting up the request that triggered an Error", error.stack);
  }
}


///////////////// dev
// eslint-disable-next-line no-unused-vars
function log(it, comments = "value: ") {
  console.log(comments, it);
}