import React from "react";
import * as PropTypes from "prop-types";
import "./InputRegular.scss";

const InputRegular = ({ inputData, handleChange, handleUndo }) => {
  const { dataKey, paramObj, profileValue, parent } = inputData;

  return (
      <>
        <label
            className="input-label"
            htmlFor={ dataKey }
        >
          { paramObj["label"] }:
        </label>
        <input
            id={ dataKey }
            type={ paramObj["type"] }
            name={ !parent ? dataKey : parent + "_" + dataKey }
            tabIndex={ 0 }
            aria-label={ paramObj["title"] }
            title={ paramObj["title"] }
            /*TODO: to use useState*/
            value={ profileValue || "" }
            /*if disabled, onChange will not work*/
            onChange={ handleChange }
            disabled={ !paramObj["editable"] }
            required
        />
        {
          paramObj["editable"] &&
          <i
              className="material-icons icon icon_undo"
              data-name={ !parent ? dataKey : parent + "_" + dataKey }
              role="button"
              tabIndex={ 0 }
              aria-label="to undo changes"
              title="to undo changes"
              onClick={ handleUndo }
          >
            undo
          </i>
        }
      </>
  );
};

export default InputRegular;

InputRegular.propTypes = {
  inputData: PropTypes.object,
  handleChange: PropTypes.func,
  handleUndo: PropTypes.func
};

///////////////// dev
// eslint-disable-next-line no-unused-vars
function log(it, comments = "value: ") {
  console.log(comments, it);
}