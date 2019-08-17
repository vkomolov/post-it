///node_modules
import axios from 'axios';

import funcs from "../funcsCollection";
import { commentsParams, defaultPost, getAllParams, postParams }
    from "../../utils/userService/initialData";

const userService  = {
    fetchAll,
    addDefaultPars,
    updatePost,
    updateComments,
    getRestObj
};
export default userService;

/**@description it packs axios or fetch realization.
 *
 * */
function fetchAll(source, actionSuccess, actionError) {
    const postSource = source + '/posts';

    ////SWITCHING TO AXIOS
    return funcs.initAxios(postSource, getAllParams())
        .then(({ data }) => {
            //log('fetched data...');
            //log(data);
            setTimeout(() => actionSuccess( data ), 1000);
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

function updatePost( source, post ) {
    const urlSource = ( post.id === 'default' )
        ? source + '/posts'
        : `${source}/posts/${post.id}`;

    return funcs.initAxios(urlSource, postParams( post ));
}

function updateComments( source, dataId, postCommentsArr, prevCommentsArr=[] ) {
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
            return funcs.initAxios(source + '/comments', commentsParams(dataId, comment.body));
        });
    }
    /**if we have existing comments changed , then for PUT method...
     * */
    if (restComments.toPutElems.length) {
        toPut = restComments.toPutElems.map((comment) => {
            log('comment to PUT...');
            log(comment);
            return funcs.initAxios(source + '/comments/' + comment.id, commentsParams(dataId, comment.body, false));
        });
    }
    /**if we have comments to be deleted in the API, then for DEL method...
     * */
    if (restComments.toDelElems.length) {
        //TODO API BLOCKS DEL by the server with axios
/*        toDel = restComments.missingElems.map((comment) => {
            return funcs.initAxios(source + '/comments/' + comment.id,
                commentsParams(dataId, comment.body, false)
            );
        });*/
        log('comments to delete from API list');
        log(restComments.toDelElems);
    }
    /**making promise all of axios to do, returning the arr of results
     * */
    return axios.all([
        ...toPost,
        ...toPut,
        ///...toDel,
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
                    log('founded...');
                }
            });
            if (!found) {
                log('not found...');
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