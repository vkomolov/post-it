import { takeEvery, put, call } from "redux-saga/effects";
import { actionTypes, BASE_URL, PATTERN_DATA_USER_LOGGED, storageNames } from "../../../_constants";
import { getFromStoreOrRequestAndStore } from "../../../_helpers";
import { setUserProfile } from "../../features/sliceUserProfile";
import { handleError } from "../index";

function* getUserProfileData({ payload }) {
  if (payload) {
    try {
      const loggedUserData = yield call(
          getFromStoreOrRequestAndStore,
          `${BASE_URL}/users/${payload}?select=${PATTERN_DATA_USER_LOGGED.join(",")}`,
          storageNames.LOGGED_USER_DATA
      );

      yield put(setUserProfile(loggedUserData));
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