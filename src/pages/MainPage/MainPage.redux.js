import userActions from '../../store/actions/user.actions';
import alertActions from "../../store/actions/alert.actions";

export const mapStateToProps = (state) => {
    return {
        posts: state.posts,
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
        /**@description it resetting the Reducer 'posts'
         * to the initial state;
         * */
        getAllPosts: () => {
            dispatch(userActions.getAllPosts())
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
    }
};

/////dev
/*
function log(it) {
    console.log(it);
}*/
