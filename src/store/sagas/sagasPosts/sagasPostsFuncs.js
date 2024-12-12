import { call, fork, put, select } from "redux-saga/effects";
import {
  getFromStoreOrRequestAndStore,
  initAxios,
  localForageGet,
  localForageRemove,
  localForageSet
} from "../../../_helpers";
import { storageNames, BASE_URL } from "../../../_constants";
import { setPostComments } from "../../features/sliceActivePost";
import { handleError } from "../index";

/**
 * Creating the cash of the post ids, which were viewed.
 * Before taking the action "SET_POST_ACTIVE", to initialize or create the localforage store,
 * then to update activePostReducer with the latest viewed array...
 * Turning to localforage will only be on mounting the App in order to initially update activePostReducer.
 * Further, the new data will be added to the existing localforage and synchronized with activePostReducer.
 * @returns {IterableIterator<<"CALL", CallEffectDescriptor>|*|Array>}
 */
export function* initViewed() {
  const localViewed = yield call(localForageGet, storageNames.POSTSVIEWED, 86400);
  return localViewed || [];
}

/**
 * It operates with a new post data, saves it to the local storage and returns back a complete new post object;
 * As the server does not really saves the post, and just simulates the return of the added post with one
 * and the same post id, then: to make a fake request for adding a new post and returning a new post data;
 * @param {Object} postData - new post data
 * @param {boolean} isFake - if true, then to imitate request with creating the final new post without API
 * @returns {IterableIterator<any>}
 */
export function* initCreatePost(postData, isFake=false) {
  try {
    const { posts } = yield select(state => state.statePosts);

    if (isFake) {
      const maxId = posts.reduce((max, post) => {
        return max < +post.id ? +post.id : max;
      }, 0);
      const nextId = maxId + 1;

      const postDataUpdated = {
        ...postData,
        id: nextId,
        reactions: 0,
        tags: ["test"]
      };

      const postsUpdated = posts.concat(postDataUpdated);

      //saving the updated list of the posts to localforage
      yield fork(localForageSet, storageNames.POSTS, { posts: postsUpdated });

      //saving the id of the newly created post to localforage for catching the requests to the API with the
      //newly created posts, but not saved in the server (API does not save new posts)
      yield fork(addNewPostId, nextId);

      return postsUpdated;

    }  else {
      const config = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        data: postData,
      };

      //the post with a new post id will be returned from the API
      const res = yield call(initAxios, `${BASE_URL}/posts/add`, config);
      const postsUpdated = posts.concat(res);
      yield fork(localForageSet, storageNames.POSTS, { posts: postsUpdated });

      return postsUpdated;
    }
  } catch (e) {
    yield call(handleError, e);
  }
}

/**
 * As the server does not really deletes the post, and just simulates the return of the deleted post.
 * It also does not save the newly created posts.
 * then
 * - to check if the post, to be deleted, is newly created one and not saved in the server;
 * - if the post to be deleted is new and not saved in the server, then to avoid the delete request;
 * - otherwise to send the delete request and get the deleted post id on success;
 * - to re-save the updated post list to the localforage;
 * - to re-save the updated list of new posts` ids, if the deleted post was a new one;
 * - to remove the comments of the deleted post from the localforage;
 */
export function* initDeletePost(postId) {
  try {
    const { posts } = yield select(state => state.statePosts);
    const newIds = yield call(localForageGet, storageNames.NEW_POST_IDS, 86400);
    let resPostId;

    if (newIds && newIds.includes(postId)) {
      resPostId = postId;
      yield fork(deleteNewPostId, resPostId);
    } else {
      const config = {
        method: "DELETE",
      };
      const res = yield call(initAxios, `${BASE_URL}/posts/${ postId }`, config);
      resPostId = res.id;
    }

    //deleting the post from the active post list
    const postsUpdated = posts.filter(post => post.id !== resPostId);
    yield fork(localForageSet, storageNames.POSTS, { posts: postsUpdated });
    //removing comments of the deleted post
    yield fork(localForageRemove,storageNames.COMMENTS_SET_ID(resPostId));

    return postsUpdated;
  } catch (e) {
    yield call(handleError, e);
  }
}

/**
 * fetching and storing the comments of the clicked post, taken by id;
 * As the API does not really saves new posts and comments, in order to avoid the request for the data, which
 * is not saved in the API, then to save the list of newly created posts` ids and to check if the post is newly
 * created and to put the empty array of comments...
 * @param {string|number} postId: given id of the post
 */
export function* loadComments(postId) {
  try {
    const newIds = yield call(localForageGet, storageNames.NEW_POST_IDS, 86400);

    if (newIds && newIds.includes(postId)) {
      yield put(setPostComments([]));
    } else {
      const { comments } = yield call(
          getFromStoreOrRequestAndStore,
          `${BASE_URL}/posts/${postId}/comments?limit=0`,
          storageNames.COMMENTS_SET_ID(postId),
          86400
      );

      yield put(setPostComments(comments));
    }
  } catch (e) {
    yield call(handleError, e);
  }
}

/**
 * saving the list of the new posts` ids, which are not saved by the API
 * @param {string|number} newPostId: the id of the newly created post
 * @returns {IterableIterator<any>}
 */
export function* addNewPostId(newPostId) {
  const newPostIds = yield call(localForageGet, storageNames.NEW_POST_IDS, 86400);

  if (newPostIds) {
    const newPostIdsUpdated = newPostIds.concat(newPostId);

    yield fork(localForageSet, storageNames.NEW_POST_IDS, newPostIdsUpdated);
  } else {
    yield fork(localForageSet, storageNames.NEW_POST_IDS, [newPostId]);
  }
}

/**
 * to delete the id from the list of the new posts` ids, which are not saved by the API
 * @param {string|number} newPostId: the id of the newly created post
 * @returns {IterableIterator<any>}
 */
export function* deleteNewPostId(newPostId) {
  const newIds = yield call(localForageGet, storageNames.NEW_POST_IDS, 86400);

  if (newIds && newIds.includes(newPostId)) {
    const updatedIds = newIds.filter(id => id !== newPostId);

    yield fork(localForageSet, storageNames.NEW_POST_IDS, updatedIds);
  }
}


///////////////// dev
// eslint-disable-next-line no-unused-vars
function log(it, comments = "value: ") {
  console.log(comments, it);
}