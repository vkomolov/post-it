import userActions from "../../store/actions/user.actions";
import alertActions from "../../store/actions/alert.actions";

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
        showAlert: ( message, isPositive=true, delayHide=0 ) => {
            dispatch(alertActions.showAlert( message, isPositive ));
            if ( +delayHide > 0 ) {
                setTimeout(()=> dispatch(alertActions.clear()), +delayHide);
            }
        },
        withConfirm: (message, { positive, negative } ) => {
            dispatch(alertActions.withConfirm( message, { positive, negative } ));
        },
        alertsClear: () => dispatch(alertActions.clear()),
    }
};