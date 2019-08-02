import userActions from '../../store/actions/user.actions';

export const mapStateToProps = ( state ) => {
    return { posts: state.posts }
};

export const mapActionsToProps = ( dispatch ) => {
    return {
        gotSuccess: (data) => {
            dispatch(userActions.gotSuccess(data))
        },
        getAllPosts: () => {
            dispatch(userActions.getAllPosts())
        },
        gotFailure: (error) => {
            dispatch(userActions.gotFailure(error))
        },
    }
};