import { takeEvery, put, call, fork } from "redux-saga/effects";
import { initAxios, localForageSet, localForageGet, localForageRemove, parseTokenJWT } from "../../../_helpers";
import { handleError } from "../index";
import { alertClear, alertLoading } from "../../features/sliceAlerts";
import { actionTypes, BASE_URL, storageNames } from "../../../_constants";
import { loginSuccess, loginReset, logout } from "../../features/sliceAuth";

function* checkAndRestoreAuth() {
  const authDataStored = yield call(localForageGet, storageNames.LOGGED_USER, 86400);
  //authDataStored.data keys: username, password, token

  if (authDataStored) {
    //receiving data from the token, including user data for dispatching to sliceAuth reducer
    const tokenData = yield call(parseTokenJWT, authDataStored.data.token);
/*    {
      "id": 19,
        "username": "bleveragei",
        "email": "bleveragei@so-net.ne.jp",
        "firstName": "Gust",
        "lastName": "Purdy",
        "gender": "male",
        "image": "https://robohash.org/delenitipraesentiumvoluptatum.png",
        "iat": 1692486115,
        "exp": 1692486415
    }*/

    if (tokenData && tokenData.exp > Math.floor(Date.now() / 1000)) {
      const {iat, exp, ...loggedUserData} = tokenData;
      log(tokenData, "tokenData is fresh: ");

      //if the token is fresh then to dispatch the loggedUser data to sliceAuth reducer
      yield put(loginSuccess({
        ...loggedUserData,
        token: authDataStored.data.token
      }));
    } else {
      log("submitting login, token is not fresh...");

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
  //making blocking effect for checking and restoring authenticated user, logged before...
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