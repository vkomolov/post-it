import axios from 'axios';


const funcs = {
    dateFormat,
    numFormat,
    deepClone,
    initFetch,
    initAxios,
    equalCols,
    deepEqual,
    activateClassName
};
export default funcs;

/**@description Converts the Date format to yyyy-mm-dd String
 * @param {string} date to localString
 * @param {string} delimeter '-' for joining in String
 * @return {string} String of Date with the delimeter
 * */
function dateFormat(date, delimeter) {
    let innDate = new Date(date);
    let month = ("0" + (innDate.getMonth() + 1)).slice(-2); //if 2 digits then without 0
    let day = ("0" + innDate.getDate()).slice(-2);
    return [innDate.getFullYear(), month, day].join(delimeter);
}

/**@description: Rounds the Number to the necessary precision
 * @param: {num} Number
 * @param: {decimal} Number of decimals (100 - (2 decimals), 1000 (3 decimals) etc..
 * @return: Number rounded with necessary precision
 * */
function numFormat(num, decimal) {
    return Math.round(num * decimal)/decimal;
}

/**@description makes deep cloning of variable (any type)
 * @param {any} el; It will be identified by type and cloned;
 * @return the clone of the variable;
 * */
function deepClone(el) {
    const funcsObj = {
        "Object": () => {
            let clObj = {};
            for(let prop in el) {
                clObj[prop] = deepClone(el[prop]);
            }
            return clObj;
        },
        "Array": () => {
            return el.map((i) => {
                return deepClone(i);
            });
        }
    };
    if (el.constructor.name in funcsObj) {
        return funcsObj[el.constructor.name]();
    } else {
        return el;
    }
}

/**@description: it fetches the data with taken source and params;
 * It contains the inner funcs on passing the Fetch Promise through
 * the response status and parses the response with account to the
 * Content-Type;
 * @param {string} source: url source of the requested data;
 * @param {object} params: it contains the params of the fetch:
 * - method, headers, etc...;
 * @return {object} Promise.resolve, Promise.reject;
 * */
function initFetch( source, params ) {
    if ( source ) {
        return fetch( source, params )
            .then( status )
            .then( handle );
    }
    throw new Error("no source given to args");

    function status( response ) {
        if ( response.ok ) {
            return Promise.resolve( response );
        } else {
            return Promise.reject(new Error( response.statusText ));
        }
    }

    function handle( response ) {
        if ( response.headers.get("Content-Type").includes('application/json') ) {
            return response.json();
        } else if ( response.headers.get("Content-Type").includes('text/html') ) {
            return response.text();
        }
        else {
            return URL.createObjectURL(response.blob());
        }
    }
}
/**catch will be taken outer
 * */
function initAxios( source, params ) {
    if ( source ) {
        return axios( source, params ).then( handle )
    } throw new Error("no source given to args");

    function handle( response ) {
        //console.log('handling response...');
        //console.log(response);

        return response;
    }
}

/**@description it receives the data and update it with the creation Date
 * and sets the localStorage;
 * @param {string} name - localStorage name;
 * @param {object} data - fetched data;
 * */
export function setLocalStorage( name, data ) {
    let dataWithDate = {};
    if (Object.keys(data).length) {
        dataWithDate = {
            ...data,
            creationDate: new Date()
        };
        localStorage.setItem(name, JSON.stringify(dataWithDate));
    }
}

function equalCols(colsArr) {   //for making DOM blocks` height to be equal. Put them in array colsArr
    let highestCal = 0;
    for (let i = 0; i < colsArr.length; i++) {
        if (colsArr[i].offsetHeight >= highestCal) {
            highestCal = colsArr[i].offsetHeight;
        }
    }
    for (let i = 0; i < colsArr.length; i++) {
        colsArr[i].style.height = highestCal + "px";
    }
}

/**@description it evaluates two objects to be the same in values
 * */
function deepEqual (obj1, obj2){
    return JSON.stringify(obj1)===JSON.stringify(obj2);
}

/**@description giving condition to return activeClassName (using carring)
 * */
function activateClassName ( condition, activeClassName, className ) {
    return ( className ) => ( condition ) ? `${className} ${activeClassName}` : className;
}