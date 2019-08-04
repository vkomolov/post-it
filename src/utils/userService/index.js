import funcs from "../funcsCollection";

const userService  = {
    fetchAll,
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