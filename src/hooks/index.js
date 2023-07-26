import { useCallback, useRef, useLayoutEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { alertError, alertClear, alertLoading } from "../store/features/sliceAlerts";
import { initOpacityAnimation } from "../api";

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


export function usePosts() {
    log("usePosts...");
    const dispatch = useDispatch();
    const { posts } = useSelector((state) => state.statePosts);
    const stateUsers = useSelector(state => state.stateUsers);

    return { posts };
}

export function usePostActive() {
    //log("usePostActive...");

    const dispatch = useDispatch();
    const { postActive, viewed } = useSelector(state => state.stateActivePost);

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