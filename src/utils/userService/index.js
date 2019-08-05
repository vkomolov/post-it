import funcs from "../funcsCollection";
import { defaultPost } from "../../utils/userService/initialData";

const userService  = {
    fetchAll,
    initDefaultPars
};
export default userService;

/**@description it packs axios or fetch realization.
 *
 * */
function fetchAll(source, actionSuccess, actionError) {
    const params = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    };

    ////SWITCHING TO AXIOS
    funcs.initAxios(source, params)
        .then(objData => {
            const { data } = objData;
            setTimeout(() => actionSuccess( data ), 1000);
        })
        .catch(error => {
            console.error(error);
            actionError(error)
        });

    ////SWITCHING TO FETCH

    /*funcs.initFetch(source, params)
        .then(data => {
            setTimeout(() => actionSuccess( data ), 1000);
        })
        .catch(error => {
            console.error(error);
            actionError(error)
        })*/
}

/**@description it add additional properties to the data
 * */
function initDefaultPars( data={}, defaultData=defaultPost) {
    return {
        ...defaultData,
        ...data,
    }
}