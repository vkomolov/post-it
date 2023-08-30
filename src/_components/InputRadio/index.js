import React from "react";
import * as PropTypes from "prop-types";
import { nanoid } from "@reduxjs/toolkit";
import "./inputRadio.scss";

const InputRadio = React.memo(({ paramObj, profileValue, handleChange, handleUndo }) => {
  const handleRadio = ({ target }) => {
    handleChange("gender", target.value);
  };

  const handleKeyPress = e => {
    if (e.key === "Enter") {
      handleUndo(e);
    }
  };

  const radios = Object.keys(paramObj).map(innerProp => {
    const { name, label, type, title, editable } = paramObj[innerProp];
    const isChecked = innerProp === profileValue;

    return (
        <label
            className={ isChecked ? "radio-label checked" : "radio-label"}
            key={ nanoid() }
            title={ title }
        >
          <input
              type={ type }
              name={ name }
              value={ innerProp }
              checked={ isChecked }
              onChange={ handleRadio }
              disabled={ !editable }
          />
          { label }
        </label>
    );
  });

  return (
      <>
        { radios }
        <i
            className="material-icons icon icon_undo"
            data-name="gender"
            role="button"
            tabIndex={ 0 }
            aria-label="to undo changes"
            title="to undo changes"
            onClick={ handleUndo }
            onKeyPress={ handleKeyPress }
        >
          undo
        </i>
      </>
  );
});

export default InputRadio;

InputRadio.displayName = "InputRadio";

InputRadio.propTypes = {
  paramObj: PropTypes.object,
  profileValue: PropTypes.string,
  handleChange: PropTypes.func,
  handleUndo: PropTypes.func
};

///////////////// dev
// eslint-disable-next-line no-unused-vars
function log(it, comments = "value: ") {
  console.log(comments, it);
}