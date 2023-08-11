import React, { useEffect, useState, useRef, useMemo } from "react";
import * as PropTypes from "prop-types";
import "./CopyButton.scss";

const CopyButton = ({ targetCssSelector, targetText, children }) => {
  const [copyResult, setCopyResult] = useState(null);
  const copyResultSuccess = "success";
  const copyResultError = "error";

  log(copyResult, "copyResult: ");

  const innerSpan = useMemo(() => {
    return !targetCssSelector && targetText?.length
        ? <span className="inner-span">{ targetText }</span>
        : null;
  }, [targetCssSelector, targetText]);

  /**
   *
   * @type {string}
   */
  const buttonContent = useMemo(() => {
  return children
      ? children
      : copyResult === copyResultSuccess
          ? "copied!"
          : copyResult === copyResultError
              ? "error"
              : "copy";
}, [children, copyResult]);

  /**
   *
   * @type {string}
   */
  const buttonClassName = useMemo(() => {
    const baseClassName = !children ? "copy-button" : "copy-button spec";
    return copyResult === copyResultSuccess
        ? `${ baseClassName } success`
        : copyResult === copyResultError
            ? `${ baseClassName } error`
            : baseClassName;
  }, [copyResult, children]);

  log(buttonClassName, "buttonClassName: ");


  /**
   *
   * @param {string} text to be copied
   * @returns {boolean|Promise<void>}
   */
  const copyText = (text) => {
    if (navigator.clipboard) {
      return navigator.clipboard.writeText(text)
    } else {
      return document.execCommand("copy", true, text);
    }
  };

  /**
   *
   * @param {string } result: any string for setting the state setCopyResult and resulting text of the button
   * @param {boolean} returnFunc: if true, it returns the function, else it just runs
   * @returns {Function | undefined}
   */
  const handleResult = (result, returnFunc = false) => {
    const handle = result => {
      setCopyResult(result);
      setTimeout(() => {
        //returning initial state
        setCopyResult(null);
      }, 1500);
    };

    if (returnFunc) {
      return () => {
        handle(result);
      };
    } else {
      handle(result);
    }
  };

  /**
   *
   */
  const handleClick = () => {
    try {
      if (targetCssSelector) {
        const targetTextContent = document.querySelector(targetCssSelector)?.textContent || null;
        if (targetTextContent) {
          copyText(targetTextContent).then(handleResult(copyResultSuccess, true));
        } else {
          console.error("no target text found");
          handleResult(copyResultError, false);
        }
      } else if (targetText?.length) {
        copyText(targetText).then(handleResult(copyResultSuccess, true));
      } else {
        console.error("no target text given");
        handleResult(copyResultError, false);
      }
    } catch (e) {
      console.error(e.message);
      handleResult(copyResultError, false);
    }
  };

  return (
      <div id="copy-button-wrapper">
        { innerSpan }
        <button
            className={ buttonClassName }
            onClick={ handleClick }
            aria-label="click to copy"
            title="click to copy"
        >
          { buttonContent }
        </button>
      </div>
  );
};

export default CopyButton;

CopyButton.propTypes = {
  targetCssSelector: PropTypes.string,
  targetText: PropTypes.string,
  children: PropTypes.object
};

///////////////// dev
// eslint-disable-next-line no-unused-vars
function log(it, comments = "value: ") {
  console.log(comments, it);
}