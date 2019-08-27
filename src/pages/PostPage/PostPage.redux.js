import userActions from '../../store/actions/user.actions';
import alertActions from '../../store/actions/alert.actions';

export const mapStateToProps = ( state ) => {
    return {
        posts: state.posts,
        postData: state.postData,
        alertData: state.alertData
    }
};

export const mapActionsToProps = ( dispatch ) => {
    return {
        /**@description it dispatches the data to the Reducer 'posts';
         * @param {object} data to dispatch to the Reducer;
         * @param {array} callBacks: the Array of funcs, which will be
         * executed after the dispatch action;
         * */
        gotSuccess: ( data, callBacks=[] ) => {
            dispatch(userActions.gotSuccess( data ));

            if( callBacks.length ) {
                callBacks.forEach( cb => {
                    if (typeof cb === 'function') {
                        cb();
                    }
                });
            }
        },
        /**@description it dispatches the error to the Reducer 'posts'
         * for possibly further work with the Error data;
         * it dispatches to the Reducer 'postData' for showing the alert;
         * @param {object} error to dispatch to the Reducer;
         * @param {array} callBacks: the Array of funcs, which will be
         * executed after the dispatch action;
         * */
        gotFailure: ( error, callBacks=[] ) => {
            dispatch(userActions.gotFailure( error ));
            dispatch(alertActions.showAlert( error.toString(), false ));

            if( callBacks.length ) {
                callBacks.forEach( cb => {
                    if (typeof cb === 'function') {
                        cb();
                    }
                });
            }
        },
        /**@description it resetting the Reducer 'posts'
         * to the initial state;
         * */
        getAllPosts: () => {
            dispatch(userActions.getAllPosts())
        },
        /**@description it patches the data to the Reducer 'postData';         *
         * */
        putData: ( data ) => {
            dispatch(userActions.putData( data ));
        },
        /**@description it resets the Reducer 'posts' with the default
         * values; loaded: false
         * */
        getDefault: () => {
            dispatch(userActions.getDefault());
        },
        /**@description it dispatches the alertData Reducer to alert
         * the message;
         * @param {string} message: to show in alert
         * @param {boolean} isPositive: to demonstrate positive and
         * negative alerts;
         * @param {number} delayHide: optional delay of closing the alert
         * Component;
         * */
        showAlert: ( message, isPositive=true, delayHide=0 ) => {
            dispatch(alertActions.showAlert( message, isPositive ));
            if ( +delayHide > 0 ) {
                setTimeout(()=> dispatch(alertActions.clear()), +delayHide);
            }
        },
        /**@description it executes one of two callback functions, which
         * will be chosen by pressing on of two buttons;
         * @param {string} message: to be shown with two buttons
         * @param {function} positive: one of two funcs;
         * @param {function} negative: one of two funcs;
         * */
        withConfirm: (message, { positive, negative } ) => {
            dispatch(alertActions.withConfirm( message, { positive, negative } ));
        },
        /**@description it clears the state of the Reducer 'alertData'
         * */
        alertsClear: () => dispatch(alertActions.clear()),
    }
};

/////dev
/*
function log(it) {
    console.log(it);
}*/
