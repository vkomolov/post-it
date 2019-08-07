import userConstants from '../constants/user.constants';
//import { alertActions } from './alert.actions';

const userActions = {
    getAllPosts,
    gotSuccess,
    gotFailure,
    putData,
    getDefault,
    giveAlert,
    giveConfirm
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
/**@description action of alerts to alertData Reducer
 * to show the Alert Component with the message
 * @param {string} message: will show the message of the alert
 * @param {boolean} what: true - positive alert, false - negative alert;
 * @return {object}
 * */
    function giveAlert({ message, what }) {
        return {
            type: userConstants.ALERT,
            data: {
                message,
                what
            }
        }
    }

/**@description action of confirms to alertData Reducer
 * to show the confirm component with the message
 * @param {string} message: will show the message of the confirmation;
 * @param {string} what: puts the title of the confirmation to the Reducer;
 * When 'toConfirm' is true, the Confirm block will popup. If the confirmation
 * is confirmed, then 'toConfirm' sets to false, but 'confirmWhat' stays in the
 * reducer. When condition ('toConfirm': false, 'confirmWhat': 'something')is fired
 * then to make operation and to set 'confirmWhat' to null;
 * @return {object}
 * */
    function giveConfirm({ message, what }) {
        return {
            type: userConstants.CONFIRM,
            data: {
                message,
                what
            }
        }
    }
