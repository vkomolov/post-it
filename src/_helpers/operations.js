import axios from "axios";
import { localForageGet, localForageSet } from "./localForageApi";

/**
 *
 * @param {string} url
 * @param {Object} config
 * @returns {Promise<*>}
 */
export async function initAxios(url, config = {}) {
  //if Object.keys(config).length === 0 then axios will use the default method: "get" with responseType: "json"
  const resp = await axios({
    url,
    ...config,
  });

  return resp.data;
  //!!! the error will be caught further
}

/**
 * It makes http request and stores the result in the localStorage/localforage
 * @param {string} path: url to data to be fetched
 * @param {string} storageName: the name of the localStorage
 * @param {Object} config: optional axios configuration
 * @returns {Promise} of the fetched data. Catch will be used outside
 */
export const requestAndStore = async (path, storageName, config={}) => {
  return await initAxios(path, config)
      .then(async data => {
        const storedData = await localForageSet(storageName, data);
        return storedData.data;
      });
  //!!!the error will be caught further
};

/**
 * it checks the storage for the data, validates the data by the storage timeLimit and, if the data does not
 * pass the check, it makes request for the data from the server, then it stores the refreshed data.
 * @param {string} path: url to data to be fetched
 * @param {string} storageName: the name of the localStorage
 * @param {number} timeLimit: time limits for storing in localStorage (seconds), day by default
 * @param {Object} config: optional axios configuration
 * @returns {Promise} of the fetched data. Catch will be used outside
 */
export const getFromStoreOrRequestAndStore = async (path, storageName, timeLimit = 86400, config={}) => {
  const localData = await localForageGet(storageName, timeLimit);
  if (localData) { //it returns obj or false
    return localData.data;
  }

  return requestAndStore(path, storageName, timeLimit, config);
  //!!!the error will be caught further
};

export const parseTokenJWT = (tokenJWT) => {
  return JSON.parse(atob(tokenJWT.split(".")[1])) || null;
};

export const checkIsFreshTokenJWT = (tokenJWT) => {
  const tokenData = parseTokenJWT(tokenJWT);
  return !!(tokenData && tokenData.exp > Math.floor(Date.now() / 1000));
};

export async function generateEncryptionKey() {
  return await crypto.subtle.generateKey(
      { name: "AES-GCM", length: 256 }, // or another key length
      true, // the key can be used for encryption
      ["encrypt", "decrypt"] // the key can be used for encoding and decoding
  );
}

export async function encryptText(plainText) {
  const encryptionKey = await generateEncryptionKey();
  const encoder = new TextEncoder();
  const data = encoder.encode(plainText);

  const iv = crypto.getRandomValues(new Uint8Array(16)); // Генерируем случайный вектор инициализации
  const encryptedData = await crypto.subtle.encrypt({ name: "AES-GCM", iv }, encryptionKey, data);

  return { encryptedData, encryptionKey };
}

export async function decryptText(encryptedObject, decryptionKey) {
  const { encryptedData, iv } = encryptedObject;
  const decryptedData = await crypto.subtle.decrypt(
      {
        name: "AES-GCM",
        iv
      },
      decryptionKey,
      encryptedData
  );
  const decoder = new TextDecoder();
  return decoder.decode(decryptedData);
}

/**
 *
 * @param text
 * @returns {string|*}
 */
export function prepareTextCapitalized (text) {
  if (text.length) {
    const textSeparArr = text.split(" ");
    let lastEmpty = false;

    const modifiedArr = textSeparArr.reduce((acc, word) => {
      if (word.length) {
        lastEmpty = false;
        const capitalized = word[0].toUpperCase() + word.slice(1).toLowerCase();
        return acc.concat(capitalized);
        //if onChange of the input the space symbol is given, then, if it is first space, then to omit
      } else if (!lastEmpty) {
        lastEmpty = true;
        return acc.concat("");
      } else {
        return acc;
      }
    }, []);

    return modifiedArr.join(" ");
  }
  return "";
}

export function selectPropertiesFrom(obj, propsArr) {
  const auxObj = { ...obj };
  return propsArr.reduce((acc, prop) => {
    if (prop in auxObj) {
      acc[prop] = auxObj[prop];
    }
    return acc;
  }, {});
}

/**
 * It receives the object and the array of its nested properties and returns the last nested object with
 * its last nested property, given in the array of the nested properties
 * @param {Object} obj: given object with nested properties
 * @param {string[]} keys: given array of nested keys in the given object
 * @returns {null|{(Object, string)[]}
 * @example
 * //const obj = { one: { two: { three: "some value" } } };
 * //const keys = ["one", "two", "three"];
 * //const { lastNestedObject, lastNestedProperty } = getNestedObjectAndProp(obj, keys) returns
 * the reference to obj.one.two with its last nested property "three"
 * 1. It gives possibility to get the value of the last nested property obj.one.two.three with:
 * lastNestedObject[lastNestedProperty]
 * 2. It gives possibility to change the value of the last nested property of the given object with:
 * lastNestedObject[lastNestedProperty] = "new value"; obj.one.two.three === "new value" (true)
 */
export function getLastNestedObjectAndProp(obj, keys) {
  let currentObj = obj;
  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];
    if (!(key in currentObj) || typeof currentObj[key] !== "object") {
      console.error(`no such key ${ key } found in the given object`, Object.keys(obj));
      return null;
    }
    currentObj = currentObj[key];
  }
  const lastKey = keys[keys.length - 1];
  return [currentObj, lastKey ];
}

export function deepUpdateObj (targetObj, updateObj) {
  const updateKeys = Object.keys(updateObj);

  //if a root level of the properties
  if (updateKeys.length === 1) {
    log(updateKeys, "updateKeys.length === 1");
  }

  console.error("updated object is empty at deepUpdateObj...");
  return targetObj;
}

/**
 * It makes deep clone of the given obj
 * @param {Object} obj: given object
 * @returns {[]|*}
 */
export function deepCopy(obj) {
  if (obj === null || typeof obj !== "object") {
    return obj; // Вернуть примитивы или null без изменений
  }

  if (Array.isArray(obj)) {
    const copy = [];
    for (let i = 0; i < obj.length; i++) {
      copy[i] = deepCopy(obj[i]);
    }
    return copy;
  }

  const copy = {};
  for (const key of Object.keys(obj)) {
    copy[key] = deepCopy(obj[key]);
  }
  return copy;
}

/**
 *
 * @param {Object} profileSection: given nested object with the profile values
 * @param {Object} profileParams: params for all inputs
 * @param {string|null} parent: the position of the property, nested in the given object, concatenated with "_"
 * //parent: "company_address_postalCode"
 * @returns {{}|null}
 */
export function getInputParams(profileSection, profileParams, parent = null) {
  if (profileSection && Object.keys(profileSection).length) {

    return Object.keys(profileSection).reduce((acc, dataKey) => {
      const profileValue = profileSection[dataKey];

      //checking is key of the profile data in profile params
      if (dataKey in profileParams) {
        const paramObj = profileParams[dataKey];

        if (typeof profileValue === "string" || typeof profileValue === "number") {
          //if it is the lowest nesting of profileParams with the params of the input and "editable" property
          if ("editable" in paramObj) {
            const inputName = !parent ? dataKey : parent + "_" + dataKey;
            acc[inputName] = {
              inputName,
              paramObj,
              profileValue
            };
            return acc;
          }
          else {
            return acc;
          }
        }
        else if (typeof profileValue === "object" && Object.keys(profileValue).length) {
          const nestedParent = parent ? `${ parent }_${ dataKey }` : `${ dataKey }`;

          return Object.assign(acc, getInputParams(
              profileValue,
              paramObj,
              nestedParent
          ));
        }
        else {
          return acc;
        }
      } else {
        return acc;
      }
    }, {});
  }

  return null;
}

/**
 * @param {HTMLElement} htmlElement to animate opacity from 0 to 1
 * @param {number} duration of the animation
 * @returns {function(): void}
 */
export function initOpacityAnimation(htmlElement, duration) {
  let animeStart = null;
  htmlElement.style.opacity = "0";

  let reqId = requestAnimationFrame(function anime(timeStamp) {
    if (!animeStart) animeStart = timeStamp;
    let progress = (timeStamp - animeStart) / duration;
    if (progress > 1) progress = 1;

    htmlElement.style.opacity = `${progress}`;

    if (progress < 1) {
      reqId = requestAnimationFrame(anime);
    } else {
      cancelAnimationFrame(reqId);
    }
  });

  return () => cancelAnimationFrame(reqId);
}

/**
 * @param {(string|number)} sortPrimary: first sorting of the array with objects
 * @param {(string|number)} sortSecondary: second sorting of the array runs, when
 * the two objects are equal with the first sorting...
 * @returns {Function} as cb for the sorting with array.sort()
 */
export function sortObjectsByTwoParams(sortPrimary, sortSecondary) {
  const getFirstWord = (str) => str.split(" ")[0].toLowerCase();

  return (obj1, obj2) => {
    const primaryProp1 = obj1[sortPrimary];
    const primaryProp2 = obj2[sortPrimary];
    //checking for the type number
    if (+primaryProp1 + 1) {
      if (primaryProp2 > primaryProp1) return 1;
      if (primaryProp2 < primaryProp1) return -1;
    } else {
      const text1 = getFirstWord(primaryProp1);
      const text2 = getFirstWord(primaryProp2);
      if (text2 > text1) return -1;
      if (text2 < text1) return 1;
    }

    const secondaryProp1 = obj1[sortSecondary];
    const secondaryProp2 = obj2[sortSecondary];

    if (+secondaryProp1 + 1) {
      return secondaryProp1 - secondaryProp2;
    } else {
      return secondaryProp1.localeCompare(secondaryProp2);
    }
  };
}

/**
 * It takes the sentence and limits it with the complete words in the range of the given chars limit.
 * @param {string} sentence: given sentence
 * @param {number} maxCharCount: the chars limit
 * @returns {string}
 */
export function limitSentence(sentence, maxCharCount) {
  const words = sentence.split(" ");
  const maxWithEllipsis = maxCharCount - 3;

  if (words.length > 1) {
    const limitedWords = [];
    let totalCount = 0;

    for (let i = 0; i < words.length; i++) {
      const wordLength = words[i].length;

      if (totalCount + wordLength <= maxWithEllipsis) {
        limitedWords.push(words[i]);
        totalCount += wordLength + 1; // +1 for the space
      } else {
        limitedWords[limitedWords.length - 1] += "...";
        break;
      }
    }

    return limitedWords.join(" ");
  } else {
    return words[0].length > maxWithEllipsis ? words[0].slice(0, maxWithEllipsis) + "..." : words[0];
  }
}

/**
 *
 * @param {number} min inclusive
 * @param {number} max inclusive
 * @returns {number}
 */
export function randomizeInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}


///////////////// dev
// eslint-disable-next-line no-unused-vars
function log(it, comments = "value: ") {
  console.log(comments, it);
}