import userConstants from '../constants/user.constants';
//import { alertActions } from './alert.actions';

const userActions = {
    getAllPosts,
    gotSuccess,
    gotFailure,
    putData,
    getDefault
};
export default userActions;

    function getAllPosts() {
        return {
            type: userConstants.GETALL_POSTS_REQUEST
        }
    }

    function gotSuccess( data ) {
        return {
            type: userConstants.GETALL_POSTS_SUCCESS,
            data
        }
    }

    function gotFailure(error) {
        return {
            type: userConstants.GETALL_PRODUCTS_FAILURE,
            error
        }
    }

    function putData( data ) {
        return {
            type: userConstants.PUT_DATA,
            data
        }
    }

    function getDefault() {
        return {
            type: userConstants.GET_DEFAULT
        }
    }
