///node_modules
import axios  from "axios";
import localforage from "localforage";

/**
 * @description It gets async localForage by name, validating by the time limit in days;
 * If the time limit is expired, then to return false;
 * If the LocalForage does not exist then to return false;
 * Else to return data;
 * @async
 * @param { string } name of the LocalStorage data;
 * @param { number } [timeLimit=1]: number of days;
 * @returns { object | boolean } the data, stored in the LocalStorage... or false,
 * if its not found or expired by time
 * */
export async function getLocalForage(name, timeLimit=1) {
    const storage = await localforage.getItem( name );

    if (storage) {
        const creationDate = storage.creationDate;
        const currentDate = Date.now();
        if (((currentDate - creationDate)/1000/60/60/24) > timeLimit) {
            return false;
        }
        return storage;
    }
    return false;
}

/**@description it receives the data and update it with the current Date
 * and sets the localForage;
 * @async
 * @param {string} name The name of the LocalStorage to be set
 * @param {Object} data which is fetched
 * */
export async function setLocalForage(name="localData", data) {
    const dataWithDate = {
        data,
        creationDate: Date.now()
    };

    return await localforage.setItem(name, dataWithDate);
}

export async function initAxios(url, config={}) {
    try {
        //if Object.keys(config).length === 0 then axios will use the default method: "get" with responseType: "json"
        const resp = await axios({
            url,
            ...config,
        });

        return resp.data;

    } catch (error) {
        if (error.response) {
            console.error("The request was made and the server responded with a status code out of the range of 2xx",
                error.response);
            throw error;
        } else if (error.request) {
            console.error("The request was made but no response was received", error.request);
            throw error;
        } else {
            console.error("Something happened in setting up the request that triggered an Error", error.stack);
            throw error;
        }
    }
}

/**@description Converts the Date format to yyyy-mm-dd String
 * @param {string} date to localString
 * @param {string} delimiter '-' for joining in String
 * @returns {string} Date with the delimiter
 * */
export function dateFormat(date, delimiter) {
    let innDate = new Date(date);
    let month = ("0" + (innDate.getMonth() + 1)).slice(-2); //if 2 digits then without 0
    let day = ("0" + innDate.getDate()).slice(-2);
    return [innDate.getFullYear(), month, day].join(delimiter);
}

/**@description: Rounds the Number to the necessary precision
 * @param: {number} num number to be rounded
 * @param: {number} decimal Number of decimals (100 - (2 decimals), 1000 (3 decimals) etc..
 * @returns: {number} Number rounded with necessary precision
 * */
export function numFormat(num, decimal) {
    return Math.round(num * decimal)/decimal;
}

///////////////// dev
// eslint-disable-next-line no-unused-vars
function log(it, comments="value: ") {
    console.log(comments, it);
}