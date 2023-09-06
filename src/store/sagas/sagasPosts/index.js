import { call, fork, put, take, all, select, delay } from "redux-saga/effects";
import { getFromStoreOrRequestAndStore, localForageSet } from "../../../_helpers";
import { alertClear, alertLoading } from "../../features/sliceAlerts";
import { setPosts } from "../../features/slicePosts";
import { setUsers } from "../../features/sliceUsers";
import { actionTypes, storageNames, BASE_URL, PATTERN_DATA_USERS } from "../../../_constants";
import { setPostActive, addViewed, resetPostActive } from "../../features/sliceActivePost";
import { initViewed, loadComments, initCreatePost, initDeletePost } from "./sagasPostsFuncs";
import { handleError } from "../index";
////////////

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

function* watchSetPostActive() {
  //for checking the last activation of the post
  let lastId = null;

  //starting while cycles to take the _constants "SET_POST_ACTIVE" which occur at clicking the post to activate
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

      //getting the comments of the active post from the server
      yield fork(loadComments, lastId);
    }
  }
}

function* watchPostDelete() {
  let isBusy = false;

  while (true) {
    const { postId } = yield take(actionTypes.DELETE_POST);
    if (!isBusy) {
      try {
        yield put(alertLoading("deleting Post"));
        isBusy = true;

        /**
         * As the server does not really deletes the post, and just simulates the return of the deleted post
         * then:
         * - to send the delete request if the deleted post is not a newly created, otherwise to avoid request;
         * - to synchronize the state of statePosts with deleting the post by id,
         * - to reset stateActivePost to initials, as the active post was deleted
         */
        const postsUpdated = yield call(initDeletePost, postId);

        yield put(setPosts(postsUpdated));
        yield put(resetPostActive());
        yield put(alertClear());
        isBusy = false;
      } catch (e) {
        yield call(handleError, e);
      }
    }
  }
}

function* watchPostCreate() {
  let isBusy = false;

  while (true) {
    const { postData } = yield take(actionTypes.CREATE_POST);
    if (!isBusy) {
      try {
        isBusy = true;
        yield put(alertLoading("saving Post"));

        /**
         * As the server does not really saves the post, and just simulates the return of the added post with
         * one and the same post id, then:
         * 1. to init a fake request with a new post data;
         * 2. to save the list of the new posts` ids to localforage in order to avoid the requests for comments
         * on not existent posts, to avoid the requests on deleting, updating of not existent posts in the API.
         * 3. to synchronize the state of statePosts with the new added post,
         * 4. to re-save the updated post list to the localforage
         * */
        const postsUpdated = yield call(initCreatePost, postData, true);
        yield put(setPosts(postsUpdated));

        isBusy = false;
        yield put(alertClear());
      } catch (e) {
        yield call(handleError, e);
      }
    }
  }
}

export function* postWatcher() {
  yield call(loadInitialData);
  yield fork(watchSetPostActive);
  yield fork(watchPostDelete);
  yield fork(watchPostCreate)
}


///////////////// dev
// eslint-disable-next-line no-unused-vars
function log(it, comments = "value: ") {
  console.log(comments, it);
}