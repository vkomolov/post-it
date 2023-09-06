import { takeEvery, put, call, fork, all } from "redux-saga/effects";
import {
  initAxios,
  localForageSet,
  localForageGet,
  localForageRemove,
  parseTokenJWT,
  getFromStoreOrRequestAndStore,
} from "../../../_helpers";
import { handleError } from "../index";
import { alertClear, alertLoading } from "../../features/sliceAlerts";
import { actionTypes, BASE_URL, PATTERN_DATA_USER_LOGGED, storageNames } from "../../../_constants";
import { loginSuccess, loginReset } from "../../features/sliceAuth";
import { resetUserProfile, setUserProfile } from "../../features/sliceUserProfile";

function* checkAndRestoreAuth() {
  const authDataStored = yield call(localForageGet, storageNames.LOGGED_USER, 86400);
  //authDataStored.data keys: username, password, token

  if (authDataStored) {
    //receiving data from the token, including user data for dispatching to sliceAuth reducer
    const tokenData = yield call(parseTokenJWT, authDataStored.token);

    if (tokenData && tokenData.exp > Math.floor(Date.now() / 1000)) {
      const { id, image } = tokenData;

      //if the token is fresh then to dispatch the loggedUser data to sliceAuth reducer
      yield put(loginSuccess({
        id,
        image,
        token: authDataStored.token
      }));

      //with the renewal of validated and stored before user to login, to renew the user`s profile data
      yield fork(getUserProfileData, id);

    } else {
      const credentials = {
        payload: {
          username: authDataStored.username,
          password: authDataStored.password
        }
      };

      /**
       * As the server does not supply refresh token, then to resubmit credentials for getting fresh token
       * if login success, the profile data of the user logged in will be renewed inside submitLogin...
       */
      yield call(submitLogin, credentials);
    }
  }
}

function* getUserProfileData(id) {
  try {
    const loggedUserData = yield call(
        getFromStoreOrRequestAndStore,
        `${BASE_URL}/users/${id}?select=${PATTERN_DATA_USER_LOGGED.join(",")}`,
        storageNames.LOGGED_USER_DATA
    );

    yield put(setUserProfile(loggedUserData));

  } catch (e) {
    yield call(handleError, e);
  }
}

function* submitLogin({ payload }) {
  try {
    //initiating loading icon
    yield put(alertLoading("Logging in"));

    const config = {
      method: "POST",
      data: {
        ...payload,
        expiresInMins: 1,
      }
    };

    const res = yield call(initAxios, `${BASE_URL}/auth/login`, config);
    const { id, image, token } = res;

    //if login success then to get profile data of the user logged in
    yield fork(getUserProfileData, id);

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

function* resetAuth() {
  yield all([
    yield call(localForageRemove, storageNames.LOGGED_USER),
    yield call(localForageRemove, storageNames.LOGGED_USER_DATA)
  ]);

  //resetting login state
  yield put(loginReset());

  //resetting the profile of the logged user from the state of sliceUserProfile
  yield put(resetUserProfile());
}

function* putUserProfile({ payload }) {
  try {
    //initiating loading icon
    yield put(alertLoading("Updating Profile"));
    const { id, dataUpdated, profileData } = payload;

    const config = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      data: dataUpdated,
    };

    /**
     * As the API does not save the changes of the user data, just simulates the PUT success and returns
     * a partial updated user data, which is not enough for the profile data;
     * function getUserProfileData will fetch the profile data from the server, where our updates are not stored
     * that`s why we will simulate receiving the completed updated profile data...
     * - yielding initAxios with PUT method and the updated data. If error, it will be stopped and caught...
     * - if no errors then to update the stateUserProfile with the complete updated profileData,
     * avoiding updating the stateUserProfile with the success response with partial object from PUT request;
     * - to store the updated profile from stateUserProfile to the localforage
     */
    yield call(initAxios, `${BASE_URL}/users/${ id }`, config);
    //if no errors, otherwise it will be supplied to the error catcher

    yield fork(localForageSet, storageNames.LOGGED_USER_DATA, profileData);
    yield put(setUserProfile(profileData));
    yield put(alertClear());

  } catch (e) {
    yield call(handleError, e);
  }
}

export function* authWatcher() {
  //making blocking effect for checking and restoring possible authenticated user, stored in the local storage
  yield call(checkAndRestoreAuth);

  //waiting for actions...
  yield takeEvery(actionTypes.SUBMIT_LOGIN, submitLogin);
  yield takeEvery(actionTypes.LOGIN_RESET, resetAuth);
  yield takeEvery(actionTypes.PUT_USER_PROFILE, putUserProfile)
}

///////////////// dev
// eslint-disable-next-line no-unused-vars
function log(it, comments = "value: ") {
  console.log(comments, it);
}