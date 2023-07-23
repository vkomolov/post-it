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

/**
 *
 * @param {(number|string)} sortPrimary: first sorting of the array with objects
 * @param {(number|string)} sortSecondary: second sorting of the array runs, when
 * the two objects are equal with the first sorting...
 * @returns {Function} as cb for the sorting with array.sort()
 */
export function sortObjectsByTwoParams (sortPrimary, sortSecondary ) {
    return (obj1, obj2) => {
        const sortString = objProp => {
            const text1 = obj1[objProp].split(" ")[0].toLowerCase();
            const text2 = obj2[objProp].split(" ")[0].toLowerCase();

            return text1.localeCompare(text2);
        };
        const sortNumber = objProp => {
            return +obj1[objProp] - +obj2[objProp];
        };

        if (+obj1[sortPrimary]) {
            if (+obj2[sortPrimary] > +obj1[sortPrimary]) return 1;
            else if (+obj2[sortPrimary] < +obj1[sortPrimary]) return -1;
            //secondary sorting runs, when the objects are equal by the first sorting
            else {
                if (typeof obj1[sortSecondary] === "string") {
                    return sortString(sortSecondary);
                }
                return sortNumber(sortSecondary);
            }
        } else {
            const text1 = obj1[sortPrimary].split(" ")[0].toLowerCase();
            const text2 = obj2[sortPrimary].split(" ")[0].toLowerCase();

            if (text2 > text1) return 1;
            else if (text2 < text1) return -1;
            //secondary sorting runs, when the objects are equal by the first sorting
            else {
                if (typeof sortSecondary === "number") {
                    return sortNumber(sortSecondary);
                }
                return sortString(sortSecondary);
            }
        }
    }
}

///////////////// dev
// eslint-disable-next-line no-unused-vars
function log(it, comments="value: ") {
    console.log(comments, it);
}