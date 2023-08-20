import { takeEvery, put, call, fork } from "redux-saga/effects";
import { initAxios, localForageSet, localForageGet, localForageRemove, parseTokenJWT } from "../../../_helpers";
import { handleError } from "../index";
import { alertClear, alertLoading } from "../../features/sliceAlerts";
import { actionTypes, BASE_URL, storageNames } from "../../../_constants";
import { loginSuccess, loginReset, logout } from "../../features/sliceAuth";
import { resetUserProfile } from "../../features/sliceUserProfile";

function* checkAndRestoreAuth() {
  const authDataStored = yield call(localForageGet, storageNames.LOGGED_USER, 86400);
  //authDataStored.data keys: username, password, token

  if (authDataStored) {
    //receiving data from the token, including user data for dispatching to sliceAuth reducer
    const tokenData = yield call(parseTokenJWT, authDataStored.data.token);

    if (tokenData && tokenData.exp > Math.floor(Date.now() / 1000)) {
      const { id, image } = tokenData;

      //if the token is fresh then to dispatch the loggedUser data to sliceAuth reducer
      yield put(loginSuccess({
        id,
        image,
        token: authDataStored.data.token
      }));
    } else {
      const credentials = {
        payload: {
          username: authDataStored.data.username,
          password: authDataStored.data.password
        }
      };

      /**
       * As the server does not supply refresh token, then to resubmit credentials for getting fresh token
       */
      yield call(submitLogin, credentials);
    }

  } else {
    return undefined;
  }
}

function* submitLogin({ payload }) {
  try {
    //initiating loading icon
    yield put(alertLoading("Loading"));

    const config = {
      method: "POST",
      data: {
        ...payload,
        expiresInMins: 1,
      }
    };

    const res = yield call(initAxios, `${BASE_URL}/auth/login`, config);
    const { id, image, token } = res;

    yield put(loginSuccess({ id, image, token }));
    //removing alert loading
    yield put(alertClear());

    /**
     * storing username and password for refetching fresh token, API does not offer refresh token: only one token
     * with the limited valid period
     */
    yield fork(localForageSet, storageNames.LOGGED_USER, {
      ...payload,
      token
    });
  } catch (e) {
    yield call(handleError, e);
  }
}

function* submitLogout() {
  yield call(localForageRemove, storageNames.LOGGED_USER);
  yield put(logout());

  //resetting the profile of the logged user from the state of sliceUserProfile
  yield put(resetUserProfile());
}

function* resetAuth() {
  yield call(localForageRemove, storageNames.LOGGED_USER);
  yield put(loginReset());
}

export function* authWatcher() {
  //making blocking effect for checking and restoring possible authenticated user, stored in the local storage
  yield call(checkAndRestoreAuth);

  //waiting for actions...
  yield takeEvery(actionTypes.SUBMIT_LOGIN, submitLogin);
  yield takeEvery(actionTypes.LOGIN_RESET, resetAuth);
  yield takeEvery(actionTypes.SUBMIT_LOGOUT, submitLogout);
}

///////////////// dev
// eslint-disable-next-line no-unused-vars
function log(it, comments = "value: ") {
  console.log(comments, it);
}