import { call, fork, put, take, all, select, delay } from "redux-saga/effects";
import { getAndStore, getLocalForage, setLocalForage } from "../../../_helpers";
import { alertClear, alertError, alertLoading } from "../../features/sliceAlerts";
import { setPosts } from "../../features/slicePosts";
import { setUsers } from "../../features/sliceUsers"
import { setPostActive, setPostComments, addViewed } from "../../features/sliceActivePost";

const baseUrl = "https://dummyjson.com";
const patternSelectUsers = ["image", "firstName", "lastName", "username", "password"];

function* handleError(error) {
    console.error("error.stack: ", error.stack);
    yield put(alertError(error.message));
}

function* loadData() {
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
        const [ dataPosts, dataUsers, postsViewed ] = yield all([
            yield call(getAndStore, `${ baseUrl }/posts?limit=0`, "posts", 1),
            yield call(
                getAndStore,
                `${ baseUrl }/users?limit=0&select=${ patternSelectUsers.join(",") }`,
                "users",
                1
            ),
            yield call(initViewed),
        ]);

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

function* initViewed() {
    /**
     * Creating cash of the post ids, which were viewed before.
     * Before the while cycles of taking the action "SET_POST_ACTIVE", to initialize or create the localforage store,
     * then to update activePostReducer with the latest viewed array...
     * Turning to localforage will only be on mounting the App in order to initially update activePostReducer.
     * Further, the new data will be added to the existing localforage and synchronized with activePostReducer.
     */
    const localViewed = yield call(getLocalForage, "postsViewed", 1);
    return localViewed ? localViewed.data : [];
}

function* loadComments(postId) {
    /**
     * fetching and storing the data of comments connected to the clicked post by id;
     */
    try {
        const { comments } = yield call(
            getAndStore,
            `${ baseUrl }/posts/${ postId }/comments?limit=0`,
            `comments_${ postId }`,
            1
        );
        yield put(setPostComments(comments));

    } catch(e) {
        yield call(handleError, e);
    }
}

function* watchPostActive() {
    //for checking the last activation of the post
    let lastId = null;

    //starting while cycles to take the actions "SET_POST_ACTIVE" which occur at clicking the post to activate
    while(true) {
        //taking the object data of the post to activate
        const { payload } = yield take("SET_POST_ACTIVE");

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

                //locking effect for storing data, then dispatching action addViewed(auxViewed.data)
                const auxViewed = yield call(setLocalForage, "postsViewed", viewedUpdated);

                //updating activePostReducer with the array of ids of the posts viewed
                yield put(addViewed(auxViewed.data));
            }

            //setPostActive(payload) dispatches the data of the post to activePostReducer
            yield put(setPostActive(payload));

            yield fork(loadComments, lastId);
        }
    }
}

export function* postWatcher() {
    yield fork(loadData);
    yield fork(watchPostActive);
}


///////////////// dev
// eslint-disable-next-line no-unused-vars
function log(it, comments="value: ") {
    console.log(comments, it);
}