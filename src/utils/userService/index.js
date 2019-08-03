import funcs from "../funcsCollection";

const userService  = {
    fetchAll,
};
export default userService;

function fetchAll(source, actionSuccess, actionError) {
    const params = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    };

    funcs.initFetch(source, params)
        .then(data => {
            setTimeout(() => actionSuccess( data ), 1000);
        })
        .catch(error => {
            console.error(error);
            actionError(error)
        })
}