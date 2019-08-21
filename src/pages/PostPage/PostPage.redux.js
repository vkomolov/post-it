import userActions from '../../store/actions/user.actions';

export const mapStateToProps = ( state ) => {
    return {
        posts: state.posts,
        postData: state.postData
    }
};

export const mapActionsToProps = ( dispatch ) => {
    return {
/*        gotSuccess: ( data ) => {
            log('fetched data success...');
            log(data);
            dispatch(userActions.gotSuccess( data ))
        },*/
        gotSuccess: ( data, callBacks={} ) => {
            log('fetched data success...');
            log(data);
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
        gotFailure: ( error ) => {
            dispatch(userActions.gotFailure( error ))
        },
        putData: ( data ) => {
            dispatch(userActions.putData( data ));
        },
        getDefault: () => {
            dispatch(userActions.getDefault());
        }
    }
};

/////dev
function log(it) {
    console.log(it);
}