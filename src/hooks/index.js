import { useCallback, useRef, useLayoutEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { alertError, alertClear, alertLoading } from "../store/features/AlertSlice";
import { initOpacityAnimation } from "../api";

/**
 * Custom Hook which returns the state of the alert in redux reducer and the following actions
 * @returns {{initAlertClear: *, initAlertError: *, alertState: {Object}, initAlertLoading: *}}
 */
export function useAlertData() {
    const dispatch = useDispatch();
    const alertState = useSelector(state => state.alertState);
    const initAlertLoading = useCallback((...textContent) => {
        dispatch(alertLoading(...textContent));
    }, [dispatch]);
    const initAlertError = useCallback((...textContent) => {
        dispatch(alertError(...textContent));
    }, [dispatch]);
    const initAlertClear = useCallback(() => {
        dispatch(alertClear());
    }, [dispatch]);


    return {
        alertState,
        initAlertLoading,
        initAlertError,
        initAlertClear
    };
}

export function useInnData() {

}


/**
 * It animates the opacity of the HTMLElement from 0 to 1
 * @param {number} duration of the animation
 * @returns {React.MutableRefObject<null>}
 */
export const useOpacityTransition = (duration = 1000) => {
    const ref = useRef(null);

    //to change styles before display refreshing
    useLayoutEffect(() => {
        const htmlElement = ref.current;
        const cancelOpacityAnimation = initOpacityAnimation(htmlElement, duration);

        return () => cancelOpacityAnimation();
    });

    return ref;
};

///////////////// dev
// eslint-disable-next-line no-unused-vars
function log(it, comments="value: ") {
    console.log(comments, it);
}