//import alertConstants from "../../utils/constants/alert.constants";

import userConstants from "../constants/user.constants";

const initialPostState = {
    loaded: false,
    error: false,
    data: {}
};

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
                data: data
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
