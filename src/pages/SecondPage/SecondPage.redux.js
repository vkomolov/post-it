import { userActions } from '../../store/actions/user.actions';

export const mapStateToProps = (state) => {
    return { stateProp: state.slider }
};

export const mapActionsToProps = (dispatch) => {
    return {
        getSliders: () => {
            dispatch(userActions.getSlider())
        }
    }
};