import userActions from '../../store/actions/user.actions';
import alertActions from "../../store/actions/alert.actions";

export const mapStateToProps = (state) => {
    return {
        posts: state.posts,
        alertData: state.alertData
    }
};

export const mapActionsToProps = (dispatch) => {
    return {
        gotSuccess: ( data, callBacks={} ) => {
            dispatch(userActions.gotSuccess( data ));

            if( Object.keys(callBacks).length ) {
                for ( let callBack in callBacks ) {
                    if (typeof callBacks[callBack] === 'function') {
                        callBacks[callBack]();
                    }
                }
            }
        },
        getAllPosts: () => {
            dispatch(userActions.getAllPosts())
        },
        gotFailure: (error) => {
            dispatch(userActions.gotFailure(error))
        },
        showAlert: ( message, isPositive=true, delayHide=0 ) => {
            dispatch(alertActions.showAlert( message, isPositive ));
            if ( +delayHide > 0 ) {
                log('delay with' + delayHide);

                setTimeout(()=> dispatch(alertActions.clear()), +delayHide);
            }
        },
        withConfirm: (message, { positive, negative } ) => {
            dispatch(alertActions.withConfirm( message, { positive, negative } ));
        },
    }
};

/////dev
function log(it) {
    console.log(it);
}