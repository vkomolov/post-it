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
            console.error(error);
            actionError(error)
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

function updatePost( post ) {
    const urlPath = ( post.id === 'default' )
        ? urlSource + '/posts'
        : `${urlSource}/posts/${post.id}`;

    return funcs.initAxios(urlPath, postParams( post ));
}

function deletePost( postId ) {
    const urlPath = `${urlSource}/posts/${postId}`;
    log('urlPath for deleting...');
    log(urlPath);

    return funcs.initAxios(urlPath, delParams());
}

function updateComments( dataId, postCommentsArr, prevCommentsArr=[] ) {
    let restComments = getRestObj(postCommentsArr, prevCommentsArr);

    log('restComments...');
    log(restComments);

    let toPost = [];
    let toPut = [];
    let toDel = [];

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
            log('comment to PUT...');
            log(comment);
            return funcs.initAxios(urlSource + '/comments/' + comment.id, commentsParams(dataId, comment.body, false));
        });
    }
    /**if we have comments to be deleted in the API, then for DEL method...
     * */
    if (restComments.toDelElems.length) {
        //TODO API BLOCKS DEL by the server with axios
        toDel = restComments.toDelElems.map(( comment ) => {
            return funcs.initAxios(urlSource + '/comments/' + comment.id,
                delParams()
            );
        });
        log('comments to delete from API list');
        log(restComments.toDelElems);
    }
    /**making promise all of axios to do, returning the arr of results
     * */
    return axios.all([
        ...toPost,
        ...toPut,
        ...toDel,
    ]);
}

/**@description it add additional properties of defaultData to the data
 * */
function addDefaultPars( data={}, defaultData=defaultPost) {
    return {
        ...defaultData,
        ...data,
    }
}

function getRestObj(targetArr, sourceArr) {
    let restObj = {
        toPostElems: [],
        toPutElems: [],
        toDelElems: [],
    };

    restObj.toPostElems = isIn(targetArr, sourceArr);
    log('restObj.toPostElems...');
    log(restObj.toPostElems);

    restObj.toDelElems = isIn(sourceArr, targetArr);
    log('restObj.toDelElems...');
    log(restObj.toDelElems);

    restObj.toPutElems = isInAndEqual(targetArr, sourceArr);
    log('restObj.toPutElems...');
    log(restObj.toPutElems);

    return restObj;

    function isIn( targetArr, sourceArr ) {
        return targetArr.filter( el => {
            let found = false;

            sourceArr.forEach((elem) => {
                if (elem.id == el.id) {
                    found = true;
                    log('id founded in arr...');
                }
            });
            if (!found) {
                log('id not found in arr...');
                return el;
            }
        });
    }
    function isInAndEqual( targetArr, sourceArr ) {
        return targetArr.filter( el => {
            let isDiff = false;
            sourceArr.forEach((elem) => {
                if (elem.id == el.id) {
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