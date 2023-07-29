import { useCallback, useRef, useLayoutEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { alertError, alertClear, alertLoading } from "../store/features/sliceAlerts";
import { initOpacityAnimation, sortObjectsByTwoParams } from "../api";

/**
 * Custom Hook which returns the state of the alert in redux reducer and the following actions
 * @returns {{stateAlerts: *, initAlertClear: *, initAlertError: *, initAlertLoading: *}}
 */
export function useAlertData() {
    const dispatch = useDispatch();
    const stateAlerts = useSelector(state => state.stateAlerts);
    const initAlertLoading = useCallback((...textContent) => {
        dispatch(alertLoading(...textContent));
    }, [dispatch]);
    const initAlertError = useCallback((...textContent) => {
        dispatch(alertError(...textContent));
    }, [dispatch]);
    const initAlertClear = useCallback(() => {
        dispatch(alertClear());
    }, [dispatch]);

    return {
        stateAlerts,
        initAlertLoading,
        initAlertError,
        initAlertClear
    }
}

/**
 * Custom Hook which returns the state of sorting the array of the posts fetched.
 * It also returns the action to sagasSort for setting the sorting params to the sliceSort
 * @returns {{stateSort: *, dispatchSorting: *}}
 */
export function useSortingData() {
    const dispatch = useDispatch();
    const stateSort = useSelector(state => state.stateSort);

    /**
     * it dispatches the filter name for sorting array to sagasSort, then to sortSlice
     * @type {Function}
     */
    const dispatchSorting = useCallback(({ currentTarget }) => {
        if (currentTarget?.dataset?.name) {
            //dispatching to sagas
            dispatch({ type: "SET_SORTING", payload: currentTarget.dataset.name });
        } else console.error(`the following button has no property "data-name": ${ currentTarget }`);
    }, [dispatch]);

    return {
        stateSort,
        dispatchSorting
    }
}

/**
 * It gets posts, users and sorting filters from the reducers statePosts, stateUsers, stateSort;
 * It modifies the array of users to the object with properties as ids of the posts, for quick turns to the posts` data;
 * It modifies the array of the posts with the data of the users for showing in the list of PostItem Components;
 * It sorts the modified array of the posts with the active sorting filters, stored in the stateSort reducer;
 * @returns {{postsSorted: (*|Object[])}}
 */
export function usePosts() {
    const { posts } = useSelector((state) => state.statePosts);
    const { users } = useSelector(state => state.stateUsers);
    const { stateSort } = useSortingData();
    const { sortPrimary, sortSecondary } = stateSort;
    /**
     * To convert the array of users to the object with the keys which equal the id of the users
     * and values which equal the user`s data for the particular id...
     * Motivation: as the array of posts have only the id of the user, who wrote it, it is necessary
     * to turn to the users` array for the more detailed data to demonstrate: firstName, lastName. image.
     * It order to avoid such expensive searches of ids in the array, the array can be converted to the object
     * with the following id values as the properties. Then we can turn to the object without repeated searches.
     */
    const usersData = useMemo(() => {
        return !users.length
            ? {}
            : users.reduce((acc, user) => {
                acc[user.id] = user;
                return acc;
            }, {});
    }, [ users ]);

    //to add the additional user`s data to the post object by the user`s id:
    const postsUsersAddedArr = useMemo(() => {
        return (!posts.length || !Object.keys(usersData).length)
            ? []
            : posts.map(post => ({
                ...post,
                firstName: usersData[post.userId].firstName,
                lastName: usersData[post.userId].lastName,
                image: usersData[post.userId].image,
            }));
    }, [posts, usersData]);

    //to sort the array of the posts by the filters set in sortSlice reducer
    const postsSorted = useMemo(() => {
        return !postsUsersAddedArr.length
            ? []
            : [...postsUsersAddedArr].sort(sortObjectsByTwoParams(sortPrimary, sortSecondary));
    }, [postsUsersAddedArr, sortPrimary, sortSecondary]);

    return { postsSorted };
}

/**
 * It gets the data of the active post which was clicked;
 * It gets the array of the post ids, which were already seen;
 * It gets the callback for dispatching the data of the post clicked to the stateActivePost reducer;
 * @returns {{viewed: [], setPostActive: function, postActive: Object}}
 */
export function usePostActive() {
    const dispatch = useDispatch();
    const { postActive, viewed, comments } = useSelector(state => state.stateActivePost);

    /** It dispatches the data of the clicked post to sagasPosts, where it stores the id of the clicked post to the
     * localStorage as the array of already viewed posts, then it dispatches the data of the active (clicked) post
     * to reducerActivePost for demonstrating the details of the active post in the ContentBar and marking the post
     * in PostItem as presently active(clicked)...
     * @param { Object } postData: the data of the current post
     * @type {Function}
     */
    const setPostActive = useCallback((postData) => {
        dispatch({ type: "SET_POST_ACTIVE", payload: postData });
    }, [dispatch]);

    return {
        postActive,
        viewed,
        comments,
        setPostActive
    };
}

/**
 * It animates the opacity of the HTMLElement from 0 to 1
 * @param {number} duration of the animation
 * @returns {React.MutableRefObject<null>}
 */
export const useOpacityTransition = (duration = 1000) => {
    const ref = useRef(null);

    //to change styles before display refreshing
    useLayoutEffect(() => {
        const htmlElement = ref.current;
        const cancelOpacityAnimation = initOpacityAnimation(htmlElement, duration);

        return () => cancelOpacityAnimation();
    });

    return ref;
};

///////////////// dev
// eslint-disable-next-line no-unused-vars
function log(it, comments="value: ") {
    console.log(comments, it);
}