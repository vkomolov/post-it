const regExGroups = {
  az09_15: {
    onChange: /^(?!_)\w{0,15}$/,
    onBlur: /^(?!_)\w{3,15}$/,
    errorMessage: "only latin char, number, '_' ('_' not first), min: 3chars, max 15 chars"
  },
  Az15: {
    onChange: /^(?:[A-Z][a-z]{0,14})?$/,
    onBlur: /^[A-Z][a-z]{3,14}$/,
    errorMessage: "only latin char with the capitalized first char, min: 3chars, max 15 chars",
  },
  AzDashSpace20: {
    onChange: /^[A-Z]?[a-z-]*(?:\s?[A-Z]?[a-z-]*)*$/,
    onBlur: /^[A-Z][a-z-]*(?:\s[A-Z][a-z-]*)*$/,
    errorMessage: "first capitalized, latin char, spaces, '-', min: 3chars, max 20 chars",
  },
  emailRegular: {
    onChange: /^[\w.-]*[a-zA-Z0-9._%+-]*@[a-zA-Z0-9.-]*$/,
    onBlur: /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/,
    errorMessage: "only latin char, number, symbols '_', '.', '-'",
  },
  digits60220dec: {
    onChange: /^([1-9][0-9]?|[1-9][0-9]?[0-9])?(\.\d{0,2})?$/,
    onBlur: /^(6\d|7\d|8\d|9\d|1\d{2}|2[01]\d|220)?(\.\d{0,2})?$/,
    errorMessage: "only number from 60 to 220 with decimal without first zeros",
  },
  digits30220dec: {
    onChange: /^([1-9][0-9]?|[1-9][0-9]?[0-9])?(\.\d{0,2})?$/,
    onBlur: /^(?:[3-9]\d|1\d{2}|2[01]\d|220)?(\.\d{0,2})?$/,
    errorMessage: "only number from 30 to 220 with decimal without first zeros",
  },
  ddmmYYYY: {
    onChange: /^((19|20)\d\d)-(0?[1-9]|1[012])-(0?[1-9]|[12][0-9]|3[01])$/,
    onBlur: /^((19|20)\d\d)-(0?[1-9]|1[012])-(0?[1-9]|[12][0-9]|3[01])$/,
    errorMessage: "only numbers with format: 03.11.1968",
  },
  address09Az: {
    onChange: /^$|^(\d{0,4})?\s?([A-Z]?[a-z]*\s?)*(\d{0,4}\s?)?$/,
    onBlur: /^$|^(\d{0,4}\s?)?([A-Z]?[a-z]*\s?)+(\d{0,4}\s?)?$/,
    errorMessage: "digits, spaces, latin char with the capitalized first char",
  },
  digitMax5: {
    onChange: /^[0-9]{0,5}$/,
    onBlur: /^[0-9]{1,5}$/,
    errorMessage: "only number from 0 to 9, max 5 chars",
  },
  digitMax16: {
    onChange: /^[0-9]{0,16}$/,
    onBlur: /^[0-9]{16}$/,
    errorMessage: "only digits from 0 to 9, 16 digits",
  },
  mmSlashyy: {
    onChange: /^(0[1-9]|1[0-2])?\/?(2[3-5])?$/,
    onBlur: /^(0[1-9]|1[0-2])\/(2[3-5])$/,
    errorMessage: "2 digits of month (01-12), then '/' and 2 digits 23-25 (11/24)",
  },
  ibanAZ09: {
    onChange: /^([A-Z0-9]{0,4}\s){0,6}[A-Z0-9]{0,4}$/,
    onBlur: /^([A-Z0-9]{4}\s){6}[A-Z0-9]{3,4}$/,
    errorMessage: "Error: \"IT41 T114 5127 716J RGYB ZRUX DSJ\""
  }
};

export const regExObj = {
  username: {
    ...regExGroups.az09_15,
  },
  password: {
    ...regExGroups.az09_15,
  },
  firstName: {
    ...regExGroups.Az15,
  },
  lastName: {
    ...regExGroups.Az15,
  },
  maidenName: {
    ...regExGroups.Az15,
  },
  email: {
    ...regExGroups.emailRegular,
  },
  height: {
    ...regExGroups.digits60220dec,
  },
  weight: {
    ...regExGroups.digits30220dec,
  },
  eyeColor: {
    ...regExGroups.Az15,
  },
  hair_color: {
    ...regExGroups.Az15,
  },
  hair_type: {
    ...regExGroups.Az15,
  },
  birthDate: {
    ...regExGroups.ddmmYYYY,
  },
  address_address: {
    ...regExGroups.address09Az,
  },
  address_city: {
    ...regExGroups.AzDashSpace20,
  },
  address_postalCode: {
    ...regExGroups.digitMax5,
  },
  company_name: {
    ...regExGroups.AzDashSpace20,
  },
  company_title: {
    ...regExGroups.AzDashSpace20,
  },
  company_department: {
    ...regExGroups.AzDashSpace20,
  },
  company_address_address: {
    ...regExGroups.address09Az,
  },
  company_address_city: {
    ...regExGroups.AzDashSpace20,
  },
  company_address_postalCode: {
    ...regExGroups.digitMax5,
  },
  bank_cardNumber: {
    ...regExGroups.digitMax16,
  },
  bank_cardExpire: {
    ...regExGroups.mmSlashyy,
  },
  bank_cardType: {
    ...regExGroups.AzDashSpace20,
  },
  bank_currency: {
    ...regExGroups.AzDashSpace20,
  },
  bank_iban: {
    ...regExGroups.ibanAZ09,
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