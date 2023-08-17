import { takeEvery, put, call, fork } from "redux-saga/effects";
import { initAxios, localForageSet } from "../../../_helpers";
import { handleError } from "../index";
import { alertClear, alertLoading } from "../../features/sliceAlerts";
import { actionTypes, BASE_URL, storageNames } from "../constants";
import { loginSuccess } from "../../features/sliceAuth";


function* checkToken(jwtToken) {
  const tokenData = yield JSON.parse(atob(jwtToken.split(".")[1])) || null;
  if (tokenData.exp > Math.floor(Date.now()/1000)) {
    log("token is fresh");
    return true;
  }
  return false;
}

function* submitLogin({ payload }) {
  log(payload, "credentials: ");
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


    //success
    /*    {
          "id": 22,
            "username": "froachel",
            "email": "froachel@howstuffworks.com",
            "firstName": "Tressa",
            "lastName": "Weber",
            "gender": "female",
            "image": "https://robohash.org/temporarecusandaeest.png",
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjIsInVzZXJuYW1lIjoiZnJvYWNoZWwiLCJlbWFpbCI6ImZyb2FjaGVsQGhvd3N0dWZmd29ya3MuY29tIiwiZmlyc3ROYW1lIjoiVHJlc3NhIiwibGFzdE5hbWUiOiJXZWJlciIsImdlbmRlciI6ImZlbWFsZSIsImltYWdlIjoiaHR0cHM6Ly9yb2JvaGFzaC5vcmcvdGVtcG9yYXJlY3VzYW5kYWVlc3QucG5nIiwiaWF0IjoxNjkxOTMzMTMzLCJleHAiOjE2OTE5MzY3MzN9.jOqI1nHNNVbKfP-1wGnaj3LmfA7mjFIxEUcrGzvRU1U"
        }*/

    //token
/*    {
      "id": 92,
        "username": "clambol2j",
        "email": "clambol2j@bloglovin.com",
        "firstName": "Emely",
        "lastName": "Schmitt",
        "gender": "female",
        "image": "https://robohash.org/cumqueharumsunt.png",
        "iat": 1692200722,
        "exp": 1692200782
    }*/

    const isTokenFresh = yield call(checkToken, res.token);
    log(isTokenFresh.toString(), "is token fresh:");

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

export function* authWatcher() {
  yield takeEvery(actionTypes.SUBMIT_LOGIN, submitLogin);
  yield takeEvery(actionTypes.CHECK_TOKEN, checkToken);
}

///////////////// dev
// eslint-disable-next-line no-unused-vars
function log(it, comments = "value: ") {
  console.log(comments, it);
}