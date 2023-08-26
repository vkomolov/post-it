import React, { useState } from "react";
import * as PropTypes from "prop-types";
import { nanoid } from "@reduxjs/toolkit";
import "./inputRadio.scss";

const InputRadio = ({ inputData, handleChange, handleUndo }) => {
  const { dataKey, paramObj, profileValue, parent } = inputData;

  const [radioChecked, setRadioChecked] = useState(profileValue);

  const handleRadio = ({ target }) => {
    setRadioChecked(target.value);
  };

  const undoRadio = () => {
    setRadioChecked(profileValue);
  };

  const radios = Object.keys(paramObj).map(innerProp => {
    return (
        <label
            className={ innerProp === radioChecked ? "radio-label checked" : "radio-label"}
            key={ nanoid() }
            title={ paramObj[innerProp].title }
        >
          <input
              type={ paramObj[innerProp].type }
              name={ !parent ? dataKey : parent + "_" + dataKey }
              value={ innerProp }
              checked={ innerProp === radioChecked }
              onChange={ handleRadio }
          />
          { paramObj[innerProp].label }
        </label>
    );
  });

  return (
      <>
        { radios }
        <i
            className="material-icons icon icon_undo"
            role="button"
            tabIndex={ 0 }
            aria-label="to undo changes"
            title="to undo changes"
            onClick={ undoRadio }
        >
          undo
        </i>
      </>
  );
};

export default InputRadio;

InputRadio.propTypes = {
  inputData: PropTypes.object,
  handleChange: PropTypes.func,
  handleUndo: PropTypes.func
};

///////////////// dev
// eslint-disable-next-line no-unused-vars
function log(it, comments = "value: ") {
  console.log(comments, it);
}