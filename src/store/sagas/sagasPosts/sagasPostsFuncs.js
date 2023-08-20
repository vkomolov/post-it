import { call, put } from "@redux-saga/core/effects";
import { getFromStoreOrRequestAndStore, localForageGet  } from "../../../_helpers";
import { storageNames, BASE_URL } from "../../../_constants";
import { setPostComments } from "../../features/sliceActivePost";
import { handleError } from "../index";

export function* initViewed() {
  /**
   * Creating the cash of the post ids, which were viewed.
   * Before the while cycles of taking the action "SET_POST_ACTIVE", to initialize or create the localforage store,
   * then to update activePostReducer with the latest viewed array...
   * Turning to localforage will only be on mounting the App in order to initially update activePostReducer.
   * Further, the new data will be added to the existing localforage and synchronized with activePostReducer.
   */
  const localViewed = yield call(localForageGet, storageNames.POSTSVIEWED, 86400);
  return localViewed ? localViewed.data : [];
}

export function* loadComments(postId) {
  /**
   * fetching and storing the comments of the clicked post, taken by id;
   */
  try {
    const { comments } = yield call(
        getFromStoreOrRequestAndStore,
        `${BASE_URL}/posts/${postId}/comments?limit=0`,
        storageNames.COMMENTS_SET_ID(postId),
        86400
    );
    yield put(setPostComments(comments));

  } catch (e) {
    yield call(handleError, e);
  }
}



///////////////// dev
// eslint-disable-next-line no-unused-vars
function log(it, comments = "value: ") {
  console.log(comments, it);
}