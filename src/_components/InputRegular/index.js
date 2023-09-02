import React, { useState } from "react";
import * as PropTypes from "prop-types";
import "./InputRegular.scss";
import { regExObj, validateText, prepareTextCapitalized } from "../../_helpers";

const InputRegular = React.memo(({ paramObj, profileValue, handleChange, handleUndo }) => {
  const { name, label, type, title, editable } = paramObj;
  const [error, setError] = useState(null);

  const handleInput = ({ target }) => {
    const { name, value } = target;
    let textPrepared = value;
    if (target.name !== "bank_iban" && target.name !== "email" ) {
      textPrepared = prepareTextCapitalized(value);
    }

    //if validated text checking the value by Symbol
    if (validateText(textPrepared, name, regExObj, true)) {
      //clearing the error
      if (error) {
        setError(null);
      }

      handleChange(name, textPrepared);
    } else {
      setError(regExObj[name]["errorMessage"]);
    }
  };

  const handleBlur = ({ target }) => {
    const { name, value } = target;

    let textPrepared = value;
    if (target.name !== "bank_iban" && target.name !== "email" ) {
      textPrepared = prepareTextCapitalized(value);
    }

    //if validated text checking the complete value
    if (validateText(textPrepared, name, regExObj, false)) {
      //clearing the error
      if (error) {
        setError(null);
      }

      handleChange(name, textPrepared);
    }
    else {
      setError(regExObj[name]["errorMessage"]);

      //it will keep input on focus till no errors
      target.focus();
    }
  };

  const handleKeyPressInput = e => {
    if (e.key === "Enter") {
      e.preventDefault();
      e.target.blur();
    }
  };

  const handleUndoInput = e => {
    if (error) {
      setError(null);
    }

    handleUndo(e);
  };

  const handleKeyPressUndo = e => {
    if (e.key === "Enter") {
      e.preventDefault();

      handleUndoInput(e);
    }
  };

  return (
      <>
        <label
            className="input-label"
            htmlFor={ name }
        >
          { label }:
        </label>
        <div className="input-wrapper">
          <input
              id={ name }
              type={ type }
              name={ name }
              tabIndex={ 0 }
              aria-label={ title }
              title={ title }
              value={ profileValue || "" }
              /*if disabled, onChange will not work*/
              onChange={ handleInput }
              onBlur={ handleBlur }
              onKeyPress={ handleKeyPressInput }
              disabled={ !editable }
              required
          />
          {
            error &&
            <p className="error-message">
              { error }
            </p>
          }
        </div>
        {
          editable &&
          <i
              className="material-icons icon icon_undo"
              data-name={ name }
              role="button"
              tabIndex={ 0 }
              aria-label="to undo changes"
              title="to undo changes"
              onClick={ handleUndoInput }
              onKeyPress={ handleKeyPressUndo }
          >
            undo
          </i>
        }
      </>
  );
});

export default InputRegular;

InputRegular.displayName = "InputRegular";

InputRegular.propTypes = {
  paramObj: PropTypes.object,
  profileValue: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.instanceOf(Date)
  ]),
  handleChange: PropTypes.func,
  handleUndo: PropTypes.func
};

///////////////// dev
// eslint-disable-next-line no-unused-vars
function log(it, comments = "value: ") {
  console.log(comments, it);
}