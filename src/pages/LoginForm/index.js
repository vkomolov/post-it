import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useAuth, useScaleUpFromZeroAtMount } from "../../hooks";
import "./LoginForm.scss";

const LoginForm = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { isGranted, isRejected, submitLogin } = useAuth();
  const [inputs, setInputs] = useState({ login: "", password: "" });
  const [inputsChecked, setInputsChecked] = useState({ login: "", password: "" });
  const [isPassVisible, setPassVisible] = useState(false);
  const refAnimation = useScaleUpFromZeroAtMount(400);

  const fromLocation = location.state?.from?.pathname || "/";

  const isCurrentInputEmpty = useMemo(() => {
    if (!inputsChecked.login.length) {
      return !inputs.login.length;
    } else {
      return !inputs.password.length;
    }
  }, [inputs, inputsChecked]);


  //log(isLoginEmpty, "isLoginSubmitted: ");

  const submitForm = e => {
    log("submitting form:");
    log(inputs, "inputs: ");

  };

  const buttonHandle = e => {
    e.preventDefault();
    if (!isCurrentInputEmpty) {
      if (!inputsChecked.login.length) {
        log(inputs.login, "checking login: ");

        const loginText = inputs.login.trim();
        if (loginText.length) {
          setInputsChecked(state => ({
            ...state,
            login: loginText,
          }));
        } else {
          console.error("Error with login");
        }
      } else {
        log(inputs.password, "checking password: ");

        const passwordText = inputs.password.trim();
        if (passwordText.length) {
          setInputsChecked(state => ({
            ...state,
            password: passwordText,
          }));
        } else {
          console.error("Error with password");
        }
      }
    }
  };

  const inputHandle = ({ target }) => {
    const name = target.name;
    const value = target.value;
    setInputs(inputs => ({
      ...inputs,
      [name]: value,
    }));
  };

  const keyDownHandle = (e) => {
    if (e.key === "Enter") {
      inputHandle(e);
    }
  };

  const handleRadio = () => {
    setPassVisible(state => !state);
  };

  const buttonClassName = isCurrentInputEmpty ? "button button_disabled" : "button button_enabled";
  const buttonText = !inputsChecked.login ? "Further" : "Submit";

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
              onSubmit={ submitForm }
              id="login-form"
          >
            { (inputsChecked.login.length === 0) && <input
                type="text"
                tabIndex={ 0 }
                aria-label="login name"
                name="login"
                className="login__input"
                required
                value={ inputs.login }
                onKeyDown={ keyDownHandle }
                onChange={ inputHandle }
            /> }
            { (inputsChecked.login.length > 0) && <input
                type={ isPassVisible ? "text" : "password" }
                tabIndex={ 0 }
                aria-label="login password"
                name="password"
                className="login__input"
                required
                value={ inputs.password }
                onKeyDown={ keyDownHandle }
                onChange={ inputHandle }
            /> }
            <div className="check-layer">
              { (inputsChecked.login.length > 0) && <div className="check-wrapper">
                <input
                    type="checkbox"
                    tabIndex={ 0 }
                    aria-label="to show password"
                    id="check-is-pass-visible"
                    name="passVisible"
                    checked={ isPassVisible }
                    onChange={ handleRadio }
                />
                <label
                    htmlFor="check-is-pass-visible"
                    className="input-label"
                >
                  Show password
                </label>
              </div> }
              <div className="submit-wrapper">
                <button
                    className={ buttonClassName }
                    onClick={ buttonHandle }
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