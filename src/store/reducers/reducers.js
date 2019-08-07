//import alertConstants from "../../utils/constants/alert.constants";

import userConstants from "../constants/user.constants";
import { initialPost, initialPostState } from "../../utils/userService/initialData";

/**@description Reducer which keeps the state, fetched from API
 * */
export function posts(innState = initialPostState, {type, data}) {
    const state = {...innState};
    const typeObj = {
        [userConstants.GETALL_POSTS_REQUEST]: () => {
            return {
                ...state,
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
        [userConstants.GETALL_POSTS_FAILURE]: () => {
            return {
                ...state,
                loaded: false,
                error: data
            };
        }
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
                ...state,
                isUpdate: false,
            };
        },
    };

    return (type in typeObj) ? typeObj[type]() : state;
}


