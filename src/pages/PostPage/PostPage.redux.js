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
        getAllPosts: () => {
            dispatch(userActions.getAllPosts())
        },
        putData: ( data ) => {
            dispatch(userActions.putData( data ));
        },
        getDefault: () => {
            dispatch(userActions.getDefault());
        },
        showAlert: ( message, isPositive=true, delayHide=0 ) => {
            dispatch(alertActions.showAlert( message, isPositive ));
            if ( +delayHide > 0 ) {
                setTimeout(()=> dispatch(alertActions.clear()), +delayHide);
            }
        },
        withConfirm: (message, { positive, negative } ) => {
            dispatch(alertActions.withConfirm( message, { positive, negative } ));
        },
    }
};

/////dev
/*
function log(it) {
    console.log(it);
}*/
