import userActions from "../../store/actions/user.actions";

export const mapStateToProps = ( state ) => {
    return {
        postData: state.postData
    };
};

export const mapActionsToProps = ( dispatch ) => {
    return {
        putData: ( data ) => {
            dispatch(userActions.putData( data ));
        },
        /*getPrevious: () => {
            dispatch(userActions.getPrevious());
        }*/
    }
};