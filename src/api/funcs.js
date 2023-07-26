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

/**
 * 
 * @param {string} url
 * @param {Object} config
 * @returns {Promise<*>}
 */
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

///////////////// dev
// eslint-disable-next-line no-unused-vars
function log(it, comments="value: ") {
    console.log(comments, it);
}