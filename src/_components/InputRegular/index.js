import React from "react";
import * as PropTypes from "prop-types";
import "./InputRegular.scss";

const InputRegular = React.memo(({ paramObj, profileValue, handleChange, handleUndo }) => {
  const { name, label, type, title, editable } = paramObj;

  const handleInput = ({ target }) => {
    const { name, value } = target;
    handleChange(name, value);
  };

  const handleKeyPress = e => {
    if (e.key === "Enter") {
      handleUndo(e);
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
            disabled={ !editable }
            required
        />
        {
          editable &&
          <i
              className="material-icons icon icon_undo"
              data-name={ name }
              role="button"
              tabIndex={ 0 }
              aria-label="to undo changes"
              title="to undo changes"
              onClick={ handleUndo }
              onKeyPress={ handleKeyPress }
          >
            undo
          </i>
        }
      </>
  );
});

export default InputRegular;

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