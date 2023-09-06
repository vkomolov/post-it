import localforage from "localforage";

/**
 * @description It gets async localForage by name, validating by the time limit in days;
 * If the time limit is expired, then to return false;
 * If the LocalForage does not exist then to return false;
 * Else to return data;
 * @async
 * @param { string } name of the LocalStorage data;
 * @param { number } [timeLimit=86400]: seconds with 1 day by default;
 * @returns { object | boolean } the data, stored in the LocalStorage... or false,
 * if its not found or expired by time
 * */
export async function localForageGet(name, timeLimit = 86400) {
  const storage = await localforage.getItem(name);

  if (storage) {
    const creationDate = storage.creationDate;
    const currentDate = Date.now();
    if (((currentDate - creationDate) / 1000) > timeLimit) {
      return false;
    }
    return storage.data;
  }
  return false;
}

/**@description it receives the data and update it with the current Date
 * and sets the localForage;
 * @async
 * @param {string} name The name of the LocalStorage to be set
 * @param {Object} data which is fetched
 * */
export async function localForageSet(name = "localData", data) {
  const dataWithDate = {
    data,
    creationDate: Date.now()
  };

  const res = await localforage.setItem(name, dataWithDate);
  return res.data;
}

export async function localForageRemove(name = "localData") {
  const storage = await localforage.getItem(name);
  if (storage) {
    await localforage.removeItem(name);
  }
}

///////////////// dev
// eslint-disable-next-line no-unused-vars
function log(it, comments = "value: ") {
  console.log(comments, it);
}