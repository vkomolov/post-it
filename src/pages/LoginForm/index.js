import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { regExObj, validateText } from "../../_helpers";
import { useAuth, useScaleUpFromZeroAtMount } from "../../hooks";
import "./LoginForm.scss";

const LoginForm = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { isGranted, isRejected, submitLogin } = useAuth();

  //the state of the inputs onChange event, then they will be validated (checked)
  const [inputs, setInputs] = useState({ username: "", password: "" });

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

  const [isPassVisible, setPassVisible] = useState(false);
  const refAnimation = useScaleUpFromZeroAtMount(400);

  const fromLocation = location.state?.from?.pathname || "/";

  /**
   * if username is not validated (!usernameChecked), then checking the input of username to be empty,
   * if username is validated, the checking the input of password to be empty
   */
  const isCurrentInputEmpty = !usernameChecked
      ? !inputs.username.length
      : !inputs.password.length;

  /**
   *
   * @param {EventTarget} target
   */
  const inputHandle = ({ target }) => {
    const name = target.name;
    const value = target.value;

    if (validateText(value, name, regExObj, true)) {
      setInputs(state => ({
        ...state,
        [name]: value,
      }));
    } else {
      console.error("error: ", regExObj[name].errorMessage );
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
        } else {
          console.error(regExObj[inputName].errorMessage, "error: ");
          setInputErrors(state => ({
            ...state,
            [inputName]: regExObj[inputName].errorMessage
          }));
        }
      } else {
        //checking password and, if validated, then to dispatch action
        if (validateText(inputValue, inputName, regExObj, false)) {
          submitLogin(inputs);
        } else {
          console.error(regExObj[inputName].errorMessage, "error: ");
          setInputErrors(state => ({
            ...state,
            [inputName]: regExObj[inputName].errorMessage
          }));
        }
      }
    } else {
      console.error(`${ inputName } is empty...`);
      setInputErrors(state => ({
        ...state,
        [inputName]: `${ inputName } is empty...`
      }));
    }
  };

  const handleCheckBox = () => {
    setPassVisible(state => !state);
  };

  const classNameActive = isCurrentInputEmpty ? "button button_disabled" : "button button_enabled";
  const buttonText = !usernameChecked ? "Further" : "Submit";

  useEffect(() => {
    isGranted && navigate(fromLocation, { replace: true });

  }, [isGranted, fromLocation, navigate]);


  return (
      <div className="login-wrapper" >
        <div className="login-block" ref={ refAnimation } >
          <h2 className="login-heading">Log In</h2>
          <p className="login-text">
            If logged in, You can add, delete or edit Your posts and comments
          </p>
          <form
              id="login-form"
              onSubmit={ handleSubmit }
          >
            { !usernameChecked
            && <input
                type="text"
                tabIndex={ 0 }
                aria-label="login name"
                name="username"
                className="login-form__input"
                required
                value={ inputs.username }
                onChange={ inputHandle }
            />
            }
            { usernameChecked
            && <input
                type={ isPassVisible ? "text" : "password" }
                tabIndex={ 0 }
                aria-label="login password"
                name="password"
                className="login-form__input"
                required
                value={ inputs.password }
                onChange={ inputHandle }
            />
            }
            <div className="check-layer">
              { usernameChecked
              && <div className="check-wrapper">
                <input
                    type="checkbox"
                    tabIndex={ 0 }
                    aria-label="to show password"
                    id="check-is-pass-visible"
                    name="passVisible"
                    checked={ isPassVisible }
                    onChange={ handleCheckBox }
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
                    className={ classNameActive }
                >
                  { buttonText }
                </button>
              </div>
            </div>
          </form>
          <Link
              to="/"
              replace={ true }
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