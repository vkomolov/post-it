import { useCallback, useRef, useLayoutEffect, useMemo, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { actionTypes } from "../_constants";
import { alertError, alertClear, alertLoading } from "../store/features/sliceAlerts";
import { initOpacityAnimation, sortObjectsByTwoParams } from "../_helpers";

/**
 * Custom Hook which returns the state of the alert in redux reducer and the following _constants
 * @returns {{ stateAlerts: *, initAlertClear: *, initAlertError: *, initAlertLoading: * }}
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
      dispatch({ type: actionTypes.SET_SORTING, payload: currentTarget.dataset.name });
    } else console.error(`the following button has no property "data-name": ${ currentTarget }`);
  }, [dispatch]);

  return {
    stateSort,
    dispatchSorting
  }
}

/**
 * It gets posts and users from the reducers: statePosts and stateUsers, which are dispatched at one time;
 * It modifies the array of users to the object with the properties as ids of the users, for quick turns to
 * the users` data, without repeated searches of the users` ids in the array of users for each post...
 * It modifies the array of the posts with the additional data of the users, who created the particular post;
 */
export function usePostsCombinedUsers() {
  //posts and users are fetched and dispatched at one time with Promise.all at sagasPosts
  const { posts } = useSelector(state => state.statePosts);
  const { users } = useSelector(state => state.stateUsers);

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
  }, [users]);

  //to add the additional user`s data to the post object by the user`s id:
  const postsCombinedUsers = useMemo(() => {
    return (!posts.length || !Object.keys(usersData).length)
        ? []
        : posts.map(post => ({
          ...post,
          firstName: usersData[post.userId].firstName,
          lastName: usersData[post.userId].lastName,
          image: usersData[post.userId].image,
        }));
  }, [posts, usersData]);

  return {
    postsCombinedUsers
  }
}

/**
 * It gets the modified array of the posts with the added data of the users.
 * It gets the active sorting filters from the reducer stateSort;
 * It sorts the modified array of the posts with the active sorting filters, stored in the stateSort reducer;
 */
export function usePostsSorted() {
  const { stateSort } = useSortingData();
  const { postsCombinedUsers } = usePostsCombinedUsers();

  const { sortPrimary, sortSecondary } = stateSort;

  //to sort the array of the posts by the filters set in sortSlice reducer
  const postsSorted = useMemo(() => {
    return !postsCombinedUsers.length
        ? []
        : [...postsCombinedUsers].sort(sortObjectsByTwoParams(sortPrimary, sortSecondary));
  }, [postsCombinedUsers, sortPrimary, sortSecondary]);

  return {
    postsSorted
  };
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
   * @type { Function }
   */
  const setPostActive = useCallback((postData) => {
    dispatch({ type: actionTypes.SET_POST_ACTIVE, payload: postData });
  }, [dispatch]);

  return {
    postActive,
    viewed,
    comments,
    setPostActive
  }
}

export function useUsers() {
  const { users } = useSelector(state => state.stateUsers);

  return {
    users
  };
}

export function useAuth() {
  const dispatch = useDispatch();
  const { authError, loggedUser } = useSelector(state => state.stateAuth);

  const submitLogin = useCallback((loginData) => {
    dispatch({ type: actionTypes.SUBMIT_LOGIN, payload: loginData })
  }, [dispatch]);

  const submitLogOut = useCallback(() => {
    dispatch({ type: actionTypes.SUBMIT_LOGOUT })
  }, [dispatch]);

  const clearAuthState = useCallback(() => {
    dispatch({ type: actionTypes.LOGIN_RESET })
  }, [dispatch]);


  return {
    loggedUser,
    authError,
    submitLogin,
    submitLogOut,
    clearAuthState
  }
}

export function useUserProfile() {
  const dispatch = useDispatch();
  const { loggedUser } = useSelector(state => state.stateAuth);
  const { profile } = useSelector(state => state.stateUserProfile);

  /**
   * if loggedUser is not null in sliceAuth, then to dispatch the id of the logged user to sagasUserProfile
   * for fetching the user data or for getting the user data from the local storage...
   * if loggedUser is null (at logging out) then to dispatch the action for resetting the sliceAuth state
   */
  useEffect(() => {
    if (loggedUser) {
      //dispatching to sagasUserProfile for fetching the logged user data
      dispatch({
        type: actionTypes.GET_USER_PROFILE,
        payload: loggedUser.id
      });
    }
  }, [loggedUser, dispatch]);

  const putProfileData= useCallback(updatedObj => {
    log(updatedObj, "updatedObj ready to dispatch");
  }, []);

  return {
    profile,
    putProfileData
  }
}

/**
 * It animates the opacity of the HTMLElement from 0 to 1
 * @param {number} duration of the animation
 * @returns {React.MutableRefObject<null>}
 */
export function useOpacityTransition (duration = 1000) {
  const ref = useRef(null);

  //to change _styles before display refreshing
  useLayoutEffect(() => {
    const htmlElement = ref.current;
    const cancelOpacityAnimation = initOpacityAnimation(htmlElement, duration);

    return () => cancelOpacityAnimation();
  });

  return ref;
}

/**
 * to animate the component from transform: scale(0) with animation scaleUpZero
 * useLayoutEffect is used in order to assign transform: scale(0) before rendering the component
 * @param {number} duration: animation duration in ms
 * !!! It takes the animations from "../_styles/global_styles/_animations.scss"
 */
export function useScaleUpFromZero(duration = 300) {
  const ref = useRef(null);

  useLayoutEffect(() => {
    const htmlElement = ref.current;
    htmlElement.style.transform = "scale(0)";
    const timeOut = setTimeout(() => {
      htmlElement.style.animation = `scaleUpZero ${ duration }ms ease-in-out forwards`;
    }, 0);

    return () => clearTimeout(timeOut);
  }, [duration]);

  return ref;
}


///////////////// dev
// eslint-disable-next-line no-unused-vars
function log(it, comments = "value: ") {
  console.log(comments, it);
}