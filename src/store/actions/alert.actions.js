import alertConstants from '../constants/alert.constants';

const alertActions = {
    showAlert,
    withConfirm,
    clear
};

export default alertActions;

/**@description action of alerts to the Reducer 'alertData';
* @param {string} message: String to alert;
* @param {boolean} isPositive: positive or negative alert
* */
function showAlert( message, isPositive=true ) {
    return {
        type: alertConstants.SHOW_ALERT,
        data: {
            message,
            isPositive
        }
    };
}

/**@description action of alerts to the Reducer 'alertData';
 * @param {string} message: String to Confirm;
 * @param {function} positive: callback function to prove confirm;
 * @param {function} negative: callback function to cancel confirm;
 * @return {object} to patch to the reducer;
 * */
function withConfirm(message, { positive, negative }) {
    return {
        type: alertConstants.CONFIRM,
        data: {
            message,
            callbacks: {
                positive,
                negative
            }
        }
    }
}

/**@description action of alerts to the Reducer 'alertData';
 * resetting the initial state
 * */
function clear() {
    return {
        type: alertConstants.CLEAR,
    };
}