import { call, fork, put, take, all, select, delay } from "redux-saga/effects";
import { getFromStoreOrRequestAndStore, localForageSet } from "../../../_helpers";
import { alertClear, alertLoading } from "../../features/sliceAlerts";
import { setPosts } from "../../features/slicePosts";
import { setUsers } from "../../features/sliceUsers";
import { actionTypes, storageNames, BASE_URL, PATTERN_DATA_USERS } from "../constants";
import { setPostActive, addViewed } from "../../features/sliceActivePost";
import { initViewed, loadComments } from "./sagasPosts";
import { handleError } from "../index";


function* loadInitialData() {
  try {
    //initiating loading icon
    yield put(alertLoading("Loading"));

    //checking download time:
    const startTime = Date.now();

    /**
     * For showing the post list it is necessary to have both data: the data of users and the data of posts...
     * It will fetch both data, store them to the localforage and update postReducer, usersReducer
     * It also gets the array of the viewed posts from the localforage and synchronize activePostReducer.
     */
    const [dataPosts, dataUsers, postsViewed] = yield all([
      yield call(getFromStoreOrRequestAndStore, `${BASE_URL}/posts?limit=0`, storageNames.POSTS),
      yield call(
          getFromStoreOrRequestAndStore,
          `${BASE_URL}/users?limit=0&select=${PATTERN_DATA_USERS.join(",")}`,
          storageNames.USERS
      ),
      //initiating the cash of the posts viewed
      yield call(initViewed),
    ]);

    //dispatching posts, users and posts viewed to the slice reducer with one param
    yield put(setPosts(dataPosts.posts));
    yield put(setUsers(dataUsers.users));
    yield put(addViewed(postsViewed));

    //if the download time lest than 500ms then to imitate loading with delay(1000)
    if ((Date.now() - startTime) < 500) yield delay(1000);
    //removing alert loading
    yield put(alertClear());

  } catch (e) {
    yield call(handleError, e);
  }
}

function* watchPostActive() {
  //for checking the last activation of the post
  let lastId = null;

  //starting while cycles to take the constants "SET_POST_ACTIVE" which occur at clicking the post to activate
  while (true) {
    //taking the object data of the post to activate
    const { payload } = yield take(actionTypes.SET_POST_ACTIVE);

    //if the clicked post was clicked previously then to omit the action...
    if (payload.id !== lastId) {
      lastId = payload.id;

      /**
       * checking if the post is already viewed:
       * if not viewed then to add to localforage and to update activePostReducer
       */
      const { viewed } = yield select(state => state.stateActivePost);

      /**
       * if (!viewed.includes(lastId)), the action addViewed(auxViewed.data) will be dispatched
       * with the following dispatching action: setPostActive(payload), which makes the change of
       * the activePostReducer state at one time, with one re-render of the _components with the dependency.
       */
      if (!viewed.includes(lastId)) {
        const viewedUpdated = [
          ...viewed,
          lastId
        ];

        //updating activePostReducer with the array of ids of the posts viewed
        yield fork(localForageSet, storageNames.POSTSVIEWED, viewedUpdated);
        yield put(addViewed(viewedUpdated));
      }

      //setPostActive(payload) dispatches the data of the post to activePostReducer
      yield put(setPostActive(payload));

      yield fork(loadComments, lastId);
    }
  }
}

export function* postWatcher() {
  yield fork(loadInitialData);
  yield fork(watchPostActive);
}


///////////////// dev
// eslint-disable-next-line no-unused-vars
function log(it, comments = "value: ") {
  console.log(comments, it);
}