///node_modules
import axios from 'axios';

import funcs from "../funcsCollection";
import { commentsParams,
    defaultPost,
    getAllParams,
    postParams,
    urlSource,
    delParams }
    from "../../utils/userService/initialData";

const userService  = {
    fetchAllPosts,
    addDefaultPars,
    updatePost,
    updateComments,
    deletePost,
    getRestObj
};
export default userService;

/**@description it packs axios or fetch realization.
 *
 * */
function fetchAllPosts( actionSuccess, actionError ) {
    const postSource = urlSource + '/posts';

    ////SWITCHING TO AXIOS
    return funcs.initAxios(postSource, getAllParams())
        .then(({ data }) => {
            return setTimeout(() => actionSuccess( data ), 1000);
        })
        .catch(error => {
            actionError( error )
        });

    ////SWITCHING TO FETCH

    /*funcs.initFetch(source, getAllParams)
        .then(data => {
            setTimeout(() => actionSuccess( data ), 1000);
        })
        .catch(error => {
            console.error(error);
            actionError(error)
        })*/
}

/**@description it makes the request to API depending on the Post data
 * */
function updatePost( post ) {
    const urlPath = ( post.id === 'default' )
        ? urlSource + '/posts'
        : `${urlSource}/posts/${post.id}`;

    return funcs.initAxios(urlPath, postParams( post ));
}

/**@description it makes the request to API with DELETE method
 * */
function deletePost( postId, callBacks=[] ) {
    const urlPath = `${urlSource}/posts/${postId}`;

    funcs.initAxios(urlPath, delParams())
        .then( res => {
            if( callBacks.length ) {
                callBacks.forEach( cb => {
                    if (typeof cb === 'function') {
                        log('cb is func');
                        log(cb);
                        cb();
                    } else {
                        log('cb is not func');
                    }
                });
            }
            return res;
        } );
}

/**@description
 * */
function updateComments( dataId, postCommentsArr, prevCommentsArr=[] ) {
    let restComments = getRestObj(postCommentsArr, prevCommentsArr);
    let toPost = [];
    let toPut = [];
    let toDel = [];

    log('updating Comments...');

    /**if we have new comments for POST method...
     * */
    if ( restComments.toPostElems.length ) {
        toPost = restComments.toPostElems.map((comment) => {
            return funcs.initAxios(urlSource + '/comments', commentsParams(dataId, comment.body));
        });
    }
    /**if we have existing comments changed , then for PUT method...
     * */
    if (restComments.toPutElems.length) {
        toPut = restComments.toPutElems.map((comment) => {

            return funcs.initAxios(urlSource + '/comments/' + comment.id, commentsParams(dataId, comment.body, false));
        });
    }
    /**if we have comments to be deleted by API, then using DELETE method...
     * */
    if (restComments.toDelElems.length) {
        //TODO API BLOCKS DEL by the server with axios
        toDel = restComments.toDelElems.map(( comment ) => {
            return funcs.initAxios(urlSource + '/comments/' + comment.id,
                delParams()
            );
        });
    }
    /**making promise all of axios to do, returning the Array of results
     * */
    return axios.all([
        ...toPost,
        ...toPut,
        ...toDel,
    ]);
}

/**@description it adds additional properties of defaultData to the data
 * */
function addDefaultPars( data={}, defaultData=defaultPost) {
    return {
        ...defaultData,
        ...data,
    }
}

/**@description it adds additional properties of defaultData to the data
 * */
function getRestObj(targetArr, sourceArr) {
    let restObj = {
        toPostElems: [],
        toPutElems: [],
        toDelElems: [],
    };
    restObj.toPostElems = isIn(targetArr, sourceArr);
    restObj.toDelElems = isIn(sourceArr, targetArr);
    restObj.toPutElems = isInAndEqual(targetArr, sourceArr);

    return restObj;

    function isIn( targetArr, sourceArr ) {
        return targetArr.filter( el => {
            let found = false;

            sourceArr.forEach((elem) => {
                if (String(elem.id) === String(el.id)) {
                    found = true;
                }
            });

            return (!found) && el;
        });
    }
    function isInAndEqual( targetArr, sourceArr ) {
        return targetArr.filter( el => {
            let isDiff = false;
            sourceArr.forEach((elem) => {
                if (String(elem.id) === String(el.id)) {
                    log('equal comments by id...');
                    log('elem.body');
                    log(elem.body);
                    log('el.body');
                    log(el.body);
                    if(elem.body !== el.body) {
                        log('comments bodies are different...');
                        isDiff = true;
                    } else {
                        log(`${elem.body} is equal ${el.body}`);
                    }
                }
            });
            return isDiff && el;
        });
    }
}

/////dev
function log(it) {
    console.log(it);
}