import alertConstants from "../constants/alert.constants";
import userConstants from "../constants/user.constants";
import {
    initialPost,
    initialPostsState,
    initialAlertState
    } from "../../utils/userService/initialData";

/**@description Reducer which keeps the state, fetched from API
 * */
export function posts(innState = initialPostsState, {type, data}) {
    const state = {...innState};
    const typeObj = {
        [userConstants.GETALL_POSTS_REQUEST]: () => {
            return {
                data: [],
                loaded: false,
                error: false,
            };
        },
        [userConstants.GETALL_POSTS_SUCCESS]: () => {
            return {
                loaded: true,
                error: false,
                data
            };
        },
    };

    return (type in typeObj) ? typeObj[type]() : state;
}

/**@description PostReducer
 * */
export function postData(innState = initialPost, {type, data}) {
    const state = {...innState};

    const typeObj = {
        [userConstants.PUT_DATA]: () => {
            return {
                ...state,
                isUpdate: true,
                data: {
                    ...data
                }
            };
        },
        [userConstants.GET_DEFAULT]: () => {
            return {
                isUpdate: false,
                data: {}
            };
        },
    };

    return (type in typeObj) ? typeObj[type]() : state;
}

/**@description AlertReducer
 * */
export function alertData(innState = initialAlertState, { type, data }) {
    const state = {...innState};
    const typeObj = {
        [alertConstants.SHOW_ALERT]: () => {
            return {
                isAlert: true,
                isConfirm: false,
                data
            };
        },
        [alertConstants.CONFIRM]: () => {
            return {
                isAlert: false,
                isConfirm: true,
                data
            };
        },
        [alertConstants.CLEAR]: () => {
            return {
                isAlert: false,
                isConfirm: false,
                data: {},
            };
        },
    };

    return (type in typeObj) ? typeObj[type]() : state;
}


