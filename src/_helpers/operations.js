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
 * It makes an HTTP request and stores the result in localStorage or localforage.
 * @param {string} path - URL to data to be fetched.
 * @param {string} storageName - The name of the localStorage/localforage key where the data will be stored.
 * @param {Object} [config={}] - Optional axios configuration.
 * @returns {Promise} A promise that resolves to the fetched data. Any error will be caught further in the code.
 */
export const requestAndStore = async (path, storageName, config={}) => {
  return await initAxios(path, config)
      .then(async data => {
        return await localForageSet(storageName, data);
      });
  //!!!the error will be caught further
};

/**
 * Checks if data exists in localStorage and validates it based on the specified time limit.
 * If the data is invalid or expired, it fetches fresh data from the server and stores it.
 *
 * @param {string} path - The URL from which to fetch data.
 * @param {string} storageName - The name of the key in localStorage where the data is stored.
 * @param {number} [timeLimit=86400] - Time limit (in seconds) for how long the data is stored in localStorage (default is 86400 seconds, which is 1 day).
 * @param {Object} [config={}] - Optional configuration object for the Axios request.
 * @returns {Promise} A promise that resolves with the fetched data (either from localStorage or after fetching from the server).
 * Errors will be handled outside this function.
 */
export const getFromStoreOrRequestAndStore = async (path, storageName, timeLimit = 86400, config={}) => {
  const localData = await localForageGet(storageName, timeLimit);

  return localData || await requestAndStore(path, storageName, config);

  //return localData ?? await requestAndStore(path, storageName, timeLimit, config);
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

/**
 * Receives an object and an array of nested property keys, and returns the last nested object along with
 * the last nested property key in the array of keys.
 *
 * @param {Object} obj - The object containing nested properties.
 * @param {string[]} keys - An array of keys representing the path to the nested property.
 * @returns {null|[Object, string]} - Returns an array: the last nested object and the last nested property key, or null if any key is not found.
 *
 * @example
 * // const obj = { one: { two: { three: "some value" } } };
 * // const keys = ["one", "two", "three"];
 * // const [lastNestedObject, lastNestedProperty] = getLastNestedObjectAndProp(obj, keys);
 * // lastNestedObject[lastNestedProperty] === "some value"; // true
 * // lastNestedObject[lastNestedProperty] = "new value"; // Updates obj.one.two.three to "new value"
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

/**
 * Creates a deep copy of the given object or array.
 * This function recursively clones all properties and elements, including nested objects/arrays.
 *
 * @param {Object|Array} obj - The object or array to be cloned.
 * @returns {Object|Array} - A deep copy of the input object or array.
 * If the input is a primitive value (e.g., string, number), it will return the value itself.
 *
 * @example
 * const original = { a: 1, b: { c: 2 } };
 * const copy = deepCopy(original);
 * copy.b.c = 3;
 * console.log(original.b.c); // 2 (original object remains unchanged)
 * console.log(copy.b.c); // 3 (copy is modified)
 */
export function deepCopy(obj) {
  if (obj === null || typeof obj !== "object") {
    return obj; // Return primitives or null without changes
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
 * Recursively processes a nested `profileSection` object and extracts relevant input parameters
 * based on `profileParams`, building a new object that includes only editable fields with values.
 *
 * @param {Object} profileSection - The nested object containing the profile data.
 * @param {Object} profileParams - The object containing configuration for each input, including "editable" flag.
 * @param {string|null} [parent=null] - The concatenated path of the parent properties (e.g., "company_address_postalCode").
 * If the current level is at the root, `parent` should be `null`.
 *
 * @returns {Object|null} - A new object containing the input data for editable fields, with keys formatted as the
 * concatenated paths (e.g., "company_address_postalCode"). Returns `null` if no matching fields are found.
 *
 * @example
 * const profileSection = {
 *   company: { name: "Example Corp", address: { postalCode: "12345" } }
 * };
 * const profileParams = {
 *   company: { editable: true },
 *   address: { editable: true },
 *   postalCode: { editable: true }
 * };
 * const result = getInputParams(profileSection, profileParams, "company");
 * console.log(result);
 * // { "company_address_postalCode": { inputName: "company_address_postalCode", paramObj: { editable: true }, profileValue: "12345" } }
 */
export function getInputParams(profileSection, profileParams, parent = null) {
  if (profileSection && Object.keys(profileSection).length) {
    return Object.keys(profileSection).reduce((acc, dataKey) => {
      const profileValue = profileSection[dataKey];

      // Check if key of profileSection is in profileParams
      if (dataKey in profileParams) {
        const paramObj = profileParams[dataKey];

        if (typeof profileValue === "string" || typeof profileValue === "number") {
          // If it is the lowest level of nesting and has an "editable" property
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
          // Recursive call for nested objects
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
 * @param {(string|number)} sortPrimary - first sorting of the array with objects
 * @param {(string|number)} sortSecondary - second sorting of the array runs, when
 *  * the two objects are equal with the first sorting...
 * @returns {Function} as cb for the sorting with array.sort()
 */
export function sortObjectsByTwoParams(sortPrimary, sortSecondary) {
  const getFirstWord = (str) => {
    if (typeof str !== "string") {
      str = String(str);  // Converting to string if it is not a string
    }
    return str.split(" ")[0].toLowerCase();  // getting the first word and convert it to lower case
  };

  return (obj1, obj2) => {
    const primaryProp1 = obj1[sortPrimary];
    const primaryProp2 = obj2[sortPrimary];
    //checking for the type number
    if (typeof primaryProp1 === "number" && typeof primaryProp2 === "number") {
      if (primaryProp2 > primaryProp1) return 1;
      if (primaryProp2 < primaryProp1) return -1;
    } else {
      //If these are strings, extract the first word for sorting
      const text1 = getFirstWord(primaryProp1);
      const text2 = getFirstWord(primaryProp2);
      if (text2 > text1) return -1;
      if (text2 < text1) return 1;
    }

    //Sort by secondary parameter
    const secondaryProp1 = obj1[sortSecondary];
    const secondaryProp2 = obj2[sortSecondary];

    if (typeof secondaryProp1 === "number" && typeof secondaryProp2 === "number") {
      return secondaryProp1 - secondaryProp2;
    } else {
      return secondaryProp1.localeCompare(secondaryProp2);
    }
  };
}

/**
 * Limits the input sentence to the specified number of characters while ensuring that the result ends with complete words.
 * If the sentence exceeds the given character limit, it truncates the sentence and appends "..." at the end.
 *
 * @param {string} sentence - The input sentence to be limited.
 * @param {number} maxCharCount - The maximum number of characters allowed (including spaces and ellipsis).
 * @returns {string} - A truncated sentence, ending with complete words and followed by "..." if truncated.
 *
 * @example
 * const sentence = "This is a long sentence that needs to be truncated.";
 * const result = limitSentence(sentence, 20);
 * console.log(result); // Output: "This is a long..."
 */
export function limitSentence(sentence, maxCharCount) {
  if (!sentence || maxCharCount <= 0) return "";  // Handle empty input or invalid limit

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
        // Add ellipsis to the last word and break the loop
        limitedWords[limitedWords.length - 1] += "...";
        break;
      }
    }

    return limitedWords.join(" ");
  } else {
    // If the sentence is one word, truncate it and add ellipsis if necessary
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

/**
 * Modify the reactions of a list of posts by normalizing the 'likes' count.
 * The maximum 'likes' count will be mapped to a value of maxReactions or 5, and all other
 * reactions will be normalized proportionally.
 *
 * @param {Array<Object>} posts - The list of post objects that need modification.
 * Each post should have the following structure:
 * {
 *   body: string,
 *   id: number,
 *   userId: number,
 *   reactions: { likes: number, dislikes: number },
 *   title: string,
 *   tags: string[],
 *   views: number (optional)
 * }
 * @param {number} maxReactions - The maximum value to normalize the reactions.
 * The highest 'likes' count will be scaled to this value (usually 5).
 * @returns {Array<Object>} - A new array of posts with modified reactions, where 'reactions' is a number between 1 and maxReactions.
 *
 * @throws {Error} - If `maxReactions` is less than or equal to 0, an error is thrown.
 */
export function modifyObjReactions(posts = [], maxReactions = 5) {
  // Validate the `maxReactions` parameter to ensure it's a positive value.
  if (maxReactions <= 0) {
    throw new Error(`maxReactions ${maxReactions} must be greater than 0`);
  }

  let maxLikes = -Infinity; // Initially set the maximum likes count to the lowest possible value.

  // First pass: Find the maximum 'likes' value across all posts and prepare the modified posts structure.
  const modifiedPosts = posts.map(post => {
    maxLikes = Math.max(maxLikes, post.reactions.likes); // Update the maximum 'likes' found so far.

    // Create a new object based on the post data, preserving relevant fields.
    return {
      body: post.body,
      id: post.id,
      userId: post.userId,
      title: post.title,
      tags: post.tags,
      reactions: post.reactions.likes // Save the 'likes' value temporarily for further normalization.
    };
  });

  // Calculate the normalization coefficient. The maximum 'likes' will be mapped to 'maxReactions'.
  const coefficient = maxLikes / maxReactions;

  // Second pass: Normalize the reactions by applying the coefficient and rounding to the nearest integer.
  return modifiedPosts.map(post => {
    // Normalize the 'likes' count to a value between 1 and maxReactions, rounding it for usability.
    const normalizedReactions = Math.round(post.reactions / coefficient);

    // Return the updated post object with the normalized 'reactions' value.
    return {
      ...post,
      reactions: normalizedReactions,
    };
  });
}


///////////////// dev
// eslint-disable-next-line no-unused-vars
function log(it, comments = "value: ") {
  console.log(comments, it);
}