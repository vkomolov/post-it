import { takeEvery, put, call, delay } from "redux-saga/effects";
import { actionTypes, BASE_URL, PATTERN_DATA_USER_LOGGED, storageNames } from "../../../_constants";
import { getFromStoreOrRequestAndStore } from "../../../_helpers";
import { alertClear, alertLoading } from "../../features/sliceAlerts";
import { setUserProfile } from "../../features/sliceUserProfile";
import { handleError } from "../index";

function* getUserProfileData({ payload }) {
  if (payload) {
    try {
      //initiating loading icon
      yield put(alertLoading("Loading"));

      //checking download time:
      const startTime = Date.now();

      const loggedUserData = yield call(
          getFromStoreOrRequestAndStore,
          `${BASE_URL}/users/${payload}?select=${PATTERN_DATA_USER_LOGGED.join(",")}`,
          storageNames.LOGGED_USER_DATA
      );

      yield put(setUserProfile(loggedUserData));

      //if the download time lest than 500ms then to imitate loading with delay(1000)
      if ((Date.now() - startTime) < 500) yield delay(1000);
      //removing alert loading
      yield put(alertClear());
    } catch (e) {
      yield call(handleError, e);
    }
  }
}

export function* userProfileWatcher() {
  yield takeEvery(actionTypes.GET_USER_PROFILE, getUserProfileData);
}

///////////////// dev
// eslint-disable-next-line no-unused-vars
function log(it, comments = "value: ") {
  console.log(comments, it);
}