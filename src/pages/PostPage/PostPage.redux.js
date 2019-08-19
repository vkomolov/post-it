import userActions from '../../store/actions/user.actions';

export const mapStateToProps = ( state ) => {
    return {
        posts: state.posts,
        postData: state.postData
    }
};

export const mapActionsToProps = ( dispatch ) => {
    return {
        gotSuccess: ( data ) => {
            log('fetched data success...');
            log(data);
            dispatch(userActions.gotSuccess( data ))
        },
        gotSuccessAndReload: ( data, path, history ) => {
            log('fetched data success...');
            log(data);
            dispatch(userActions.gotSuccess( data ));
            log('history push by gotSuccessAndReload...');
            history.push(path);
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