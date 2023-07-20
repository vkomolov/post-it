import { getLocalForage, setLocalForage, initAxios } from "./funcs";

/**
 * @param {string} path: url to data to be fetched
 * @param {string} storeName: the name of the localStorage
 * @param {number} timeLimit: time limits for storing in localStorage (days)
 * @param {string} extension: optional type of the data received from http request
 * @returns {Promise} of the fetched data. Catch will be used outside
 */
export const getAndStore = async ( path, storeName,  timeLimit=1, extension="json" ) => {

    let localData = await getLocalForage( storeName, timeLimit );
    if ( localData ) { //it returns obj or false
        return localData.data;
    }

    const config = {};
    if (extension === "blob") {
        config.responseType = "blob";
    }

    return await initAxios(path, config)
        .then( async data => {
            const storedData = await setLocalForage( storeName, data );
            return storedData.data;
        } );
};

/**
 * @param {HTMLElement} htmlElement to animate opacity from 0 to 1
 * @param {number} duration of the animation
 * @returns {function(): void}
 */
export function initOpacityAnimation(htmlElement, duration) {
    let animeStart = null;
    htmlElement.style.opacity = "0";

    let reqId = requestAnimationFrame(function anime(timeStamp){
        if (!animeStart) animeStart = timeStamp;
        let progress = (timeStamp - animeStart) / duration;
        if (progress > 1) progress = 1;

        htmlElement.style.opacity = `${ progress }`;

        if (progress < 1) {
            reqId = requestAnimationFrame(anime);
        } else {
            cancelAnimationFrame(reqId);
        }
    });

    return () => cancelAnimationFrame(reqId);
}

///////////////// dev
// eslint-disable-next-line no-unused-vars
function log(it, comments="value: ") {
    console.log(comments, it);
}