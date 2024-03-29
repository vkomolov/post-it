import React, { useEffect, useState, useRef, useCallback } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { regExObj, validateText } from "../../_helpers";
import { useAuth, useScaleUpFromZero } from "../../hooks";
import "./LoginForm.scss";
import LoginSample from "../../_components/LoginSample";

const initialStateInputs = {
  username: "",
  password: ""
};


const LoginForm = () => {
  const location = useLocation();
  const navigate = useNavigate();

  //for checking inputs on focus and styling the wrappers of inputs
  const inputRefs = useRef({});

  const { loggedUser, authError, submitLogin, clearAuthState } = useAuth();

  //the state of the inputs onChange event, then they will be validated (checked)
  const [inputs, setInputs] = useState({ ...initialStateInputs });

  /**
   * in order to avoid additional change of the state with the password validation, we use only the
   * state of the username validation, then we`ll use directly submitForm with the username and
   * the password validated
   */
  const [usernameChecked, setUsernameChecked] = useState(false);

  /**
   * if regEx test fails then to set state with error message for a particular input
   */
  const [inputErrors, setInputErrors] = useState({ username: null, password: null });

  //it sets the state of the password to visible or masked
  const [isPassVisible, setPassVisible] = useState(false);

  //it makes animation for the form wrapper
  const refAnimation = useScaleUpFromZero(450);

  const fromLocation = location.state?.from?.pathname || "/";

  /**
   * If onSubmit we get authError, then to restore defaults for the next try of filling the form
   */
  const restoreDefaults = useCallback(() => {
    //clearing inputs
    setInputs({ ...initialStateInputs });
    //resetting username checking state
    setUsernameChecked(false);
    //resetting password chars visibility
    setPassVisible(false);
  }, []);

  /**
   * if username is not validated (!usernameChecked), then checking the input of username to be empty,
   * if username is validated, the checking the input of password to be empty
   */
  const isCurrentInputEmpty = !usernameChecked
      ? !inputs.username.length
      : !inputs.password.length;

  /**
   *
   * @param {HTMLInputElement} target
   */
  const inputHandle = ({ target }) => {
    const { name, value } = target;

    if (validateText(value, name, regExObj, true)) {
      setInputs(state => ({
        ...state,
        [name]: value,
      }));

      setInputErrors(state => ({
        ...state,
        [name]: null
      }));

    } else {
      setInputErrors(state => ({
        ...state,
        [name]: regExObj[name].errorMessage
      }));
    }
  };

  /**
   * it validates the current input on submitting event.
   * if the current input is username, then, if validated, to set the state usernameChecked to be true
   * if the current input is password, then, if validated, to use custom hook for dispatching action;
   * @param {Event} e:
   */
  const handleSubmit = e => {
    e.preventDefault();
    /**
     * only one input is visible: username is first, then password...
     * if current input is not empty and if username is not validated (!usernameChecked),
     * then validating username, otherwise validating password and, if OK, to dispatch action to sagasAuth;
     */
    const inputName = !usernameChecked ? "username" : "password";
    const inputValue = inputs[inputName];

    if (!isCurrentInputEmpty) {
      if (!usernameChecked) {
        if (validateText(inputValue, inputName, regExObj, false)) {
          setUsernameChecked(true);
          setInputErrors(state => ({
            ...state,
            [inputName]: null
          }));
        } else {
          setInputErrors(state => ({
            ...state,
            [inputName]: regExObj[inputName].errorMessage
          }));
        }
      } else {
        //checking password and, if validated, then to dispatch action
        if (validateText(inputValue, inputName, regExObj, false)) {
          submitLogin(inputs);

          setInputErrors(state => ({
            ...state,
            [inputName]: null
          }));
        } else {
          setInputErrors(state => ({
            ...state,
            [inputName]: regExObj[inputName].errorMessage
          }));
        }
      }
    } else {
      setInputErrors(state => ({
        ...state,
        [inputName]: `${inputName} is empty...`
      }));
    }
  };

  //it sets the state of the password to visible or masked
  const togglePassVisible = () => {
    setPassVisible(state => !state);
  };

  const classNameActive = isCurrentInputEmpty ? "button button_disabled" : "button button_enabled";
  const buttonText = !usernameChecked ? "Further" : "Submit";

  //it will effect on logged in
  useEffect(() => {
    loggedUser && navigate(fromLocation, { replace: true });

  }, [loggedUser, fromLocation, navigate]);

  //it will effect on each reload with checking the inputs on focus or not empty for styling their wrappers
  useEffect(() => {
    const usernameWrapper = inputRefs.current.usernameWrapper;
    const passwordWrapper = inputRefs.current.passwordWrapper;

    const handleFocus = ({ target }) => {
      if (target.name === "username") {
        usernameWrapper.classList.add("focused");
      } else if (target.name === "password") {
        passwordWrapper.classList.add("focused");
      }
    };

    const handleBlur = ({ target }) => {
      //if input is on blur and it is empty
      if (target.name === "username" && !target.value.length) {
        usernameWrapper.classList.remove("focused");
      } else if (target.name === "password" && !target.value.length) {
        passwordWrapper.classList.remove("focused");
      }
    };

    document.addEventListener("focus", handleFocus, true);
    document.addEventListener("blur", handleBlur, true);

    return () => {
      document.removeEventListener("focus", handleFocus, true);
      document.removeEventListener("blur", handleBlur, true);
    }

    //deps for usernameChecked is necessary for the actual ref of passwordWrapper which will appear in DOM
    //only if usernameChecked
  }, [usernameChecked]);

  //if submit error it will temporally show the alert and restore defaults to the form
  useEffect(() => {
    if (authError) {
      restoreDefaults();
      setTimeout(() => {
        clearAuthState();
      }, 3000);
    }
  }, [authError, restoreDefaults, clearAuthState]);

  return (
      <div className="login-wrapper">
        <div className="login-block" ref={ refAnimation } >
          <LoginSample/>
          <h2 className="login-heading">Authorization</h2>
          <p className="login-text">
            If logged in, You can add, delete or edit Your posts and comments
          </p>
          <form
              id="login-form"
              name="login-form"
              action="#"
              onSubmit={handleSubmit}
          >
            {!usernameChecked
            && <div
                className="input-wrapper"
                ref={elem => inputRefs.current.usernameWrapper = elem}
                data-name="username"
            >
              <input
                  type="text"
                  tabIndex={0}
                  aria-label="to enter username"
                  name="username"
                  className="input-wrapper__input"
                  required
                  value={inputs.username}
                  onChange={inputHandle}
              />
              {inputErrors.username
              && <p className="error-text">{inputErrors.username}</p>
              }
              {authError
              && <p className="error-text">{ authError }</p>
              }
            </div>
            }
            {usernameChecked //passwordWrapper will appear in DOM if usernameChecked
            && <div
                className="input-wrapper"
                ref={elem => inputRefs.current.passwordWrapper = elem}
                data-name="password"
            >
              <input
                  type={isPassVisible ? "text" : "password"}
                  tabIndex={0}
                  aria-label="password"
                  name="password"
                  className="input-wrapper__input"
                  required
                  value={inputs.password}
                  onChange={inputHandle}
              />
              {inputErrors.password
              && <p className="error-text">{ inputErrors.password }</p>
              }
            </div>
            }
            <div className="check-layer">
              {usernameChecked
              && <div className="check-wrapper">
                <input
                    type="checkbox"
                    tabIndex={0}
                    aria-label="to show password"
                    id="check-is-pass-visible"
                    name="passVisible"
                    checked={isPassVisible}
                    onChange={togglePassVisible}
                />
                <label
                    htmlFor="check-is-pass-visible"
                    className="input-label"
                >
                  Show password
                </label>
              </div>
              }
              <div className="submit-wrapper">
                <button
                    className={classNameActive}
                >
                  {buttonText}
                </button>
              </div>
            </div>
          </form>
          <Link
              to="/"
              replace={true}
              className="link-cancel"
          >
            Cancel Authorization
          </Link>
        </div>
      </div>
  );
};

export default LoginForm;

///////////////// dev
// eslint-disable-next-line no-unused-vars
function log(it, comments = "value: ") {
  console.log(comments, it);
}