import { call, fork, put, take, all, select, delay } from "redux-saga/effects";
import { getAndStore } from "../../../api";
import { getLocalForage, setLocalForage } from "../../../api/funcs";
import { alertClear, alertError, alertLoading } from "../../features/sliceAlerts";
import { setPosts } from "../../features/slicePosts";
import { setUsers } from "../../features/sliceUsers"
import { setPostActive, addViewed, addComments } from "../../features/sliceActivePost";

const baseUrl = "https://dummyjson.com";
const patternSelectUsers = ["image", "firstName", "lastName", "username", "password"];

function* loadData() {
    try {
        //initiating loading icon
        yield put(alertLoading("Loading"));

        //checking download time:
        const startTime = Date.now();

        /**
         * For showing the post list it is necessary to have both data: the data of users and the data of posts...
         * It will fetch both data, store them to the localforage and update postReducer, usersReducer
         */
        const [ dataPosts, dataUsers ] = yield all([
            yield call(getAndStore, `${ baseUrl }/posts?limit=0`, "posts", 1),
            yield call(
                getAndStore,
                `${ baseUrl }/users?limit=0&select=${ patternSelectUsers.join(",") }`,
                "users",
                1
            )
        ]);

        yield put(setPosts(dataPosts.posts));
        yield put(setUsers(dataUsers.users));

        //if the download time lest than 500ms then to imitate loading with delay(1000)
        if ((Date.now() - startTime) < 500) yield delay(1000);
        //removing alert loading
        yield put(alertClear());

    } catch (e) {
        yield put(alertError(e.message));
        console.error(e.stack);
    }
}

function* watchPostActivate() {
    //for checking the last activation of the post
    let lastId = null;

    /**
     * Creating cash of the post ids, which were viewed before.
     * Before the while cycles of taking the action "SET_POST_ACTIVE", to initialize or create the localforage store,
     * then to update activePostReducer with the latest viewed array...
     * Turning to localforage will only be on mounting the App in order to initially update activePostReducer.
     * Further, the new data will be added to the existing localforage and synchronized with activePostReducer.
     */
    const localViewed = yield call(getLocalForage, "postsViewed", 1);
    const postsViewed = localViewed ? localViewed.data : [];

    //updating activePostReducer
    if (postsViewed.length) {
        yield put(addViewed(postsViewed));
    }

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
             * the activePostReducer state at one time, with one re-render of the components with the dependency.
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

            /**
             * fetching and storing the data of comments connected to the clicked post id;
             */
            try {
                const { comments } = yield call(
                    getAndStore,
                    `${ baseUrl }/posts/${ lastId }/comments?limit=0`,
                    `comments${ lastId }`,
                    1
                );
                yield put(addComments(comments));

            } catch(e) {
                yield put(alertError(e.message));
                console.error(e.stack);
            }
        }
    }
}

export function* postWatcher() {
    //initial fetching posts, blocking till it loads...
    yield call(loadData);
    yield fork(watchPostActivate);
}


///////////////// dev
// eslint-disable-next-line no-unused-vars
function log(it, comments="value: ") {
    console.log(comments, it);
}