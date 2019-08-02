import userConstants from '../constants/user.constants';
//import { alertActions } from './alert.actions';

const userActions = {
    getAllPosts,
    gotSuccess,
    gotFailure
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

