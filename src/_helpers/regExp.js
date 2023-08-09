export const regExObj = {
  username: {
    onChange: /^(?!_)[a-z0-9_]{0,15}$/i,
    onBlur: /^(?!_)[a-z0-9_]{5,15}$(?<!_)/i,
    errorMessage: "only latin char, number or underscore (not first or last), max 15 chars",
  },
  password: {
    onChange: /^(?!_)[a-z0-9_]{0,15}$/i,
    onBlur: /^(?!_)[a-z0-9_]{5,15}$(?<!_)/i,
    errorMessage: "only latin char, number or underscore (not first or last), max 15 chars",
  }
};

/**
 *
 * @param {string} targetValue: string to test
 * @param {string} inputName: the property of regExObj
 * @param {Object} regExObj: with regular expressions for the particular inputs
 * @param {boolean} bySymbol: the string can be tested by single char on input or by the total string value
 * @returns {boolean} if it passes the expressions then true, otherwise false
 */
export function validateText(targetValue, inputName, regExObj, bySymbol = false) {
  if (inputName in regExObj) {
    const regExProp = bySymbol ? regExObj[inputName]["onChange"] : regExObj[inputName]["onBlur"];

    return regExProp.test(targetValue);
  }

  console.error(`no ${inputName} in regExpObj...`);
  return false;
}

///////////////// dev
// eslint-disable-next-line no-unused-vars
function log(it, comments = "value: ") {
  console.log(comments, it);
}